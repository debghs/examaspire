// this is to extract the server side functionality from the take page
// gotta fix this and connect it to the take page

'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Exam, Question, Submission } from '@/payload-types'

export async function fetchExam(slug: string) {
  const payload = await getPayload({ config: configPromise })
  const examResponse = await payload.find({
    collection: 'exams',
    where: {
      slug: {
        equals: slug,
      },
      status: {
        equals: 'published',
      },
    },
    depth: 2,
  })

  if (!examResponse || examResponse.docs.length === 0) {
    return null
  }

  return examResponse.docs[0] as Exam
}

export async function fetchSubmission(submissionId: string) {
  const payload = await getPayload({ config: configPromise })
  const submissionResponse = await payload.findByID({
    collection: 'submissions',
    id: submissionId,
  })

  return submissionResponse as Submission
}

export async function submitExam(data: {
  examId: string
  studentId: string
  answers: { questionIndex: number; selectedOption: number }[]
  startTime: string
  submittedAt: string
  status: 'submitted' | 'timed-out'
  submissionId?: string
}) {
  const payload = await getPayload({ config: configPromise })
  
  const submissionData = {
    exam: data.examId,
    student: data.studentId,
    answers: data.answers,
    startTime: data.startTime,
    submittedAt: data.submittedAt,
    status: data.status,
  }

  if (data.submissionId) {
    return await payload.update({
      collection: 'submissions',
      id: data.submissionId,
      data: submissionData,
    })
  } else {
    return await payload.create({
      collection: 'submissions',
      data: submissionData,
    })
  }
} 
