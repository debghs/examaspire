import { ExamCard } from '@/components/ExamCard'
import { getPayload, PaginatedDocs } from 'payload'
import configPromise from '@payload-config'
import { Exam } from '@/payload-types'
import React from 'react'

export default async function ExamsPage() {
  let publishedExams: PaginatedDocs<Exam> | null = null
  let error: string | null = null

  try {
    const payload = await getPayload({ config: configPromise })
    
    publishedExams = await payload.find({
      collection: 'exams',
    //   where: {
    //     status: {
    //       equals: 'published'
    //     }
    //   },
      limit: 100,
      sort: '-createdAt'
    })
  } catch (err) {
    console.error('Failed to fetch exams:', err)
    error = 'Failed to load exams. Please try again later.'
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Exams</h1>
      
      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      ) : null}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {publishedExams?.docs && publishedExams.docs.length > 0 ? (
          publishedExams.docs.map((exam) => (
            <ExamCard key={exam.id} exam={exam} className="mb-4" />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No published exams available at the moment.</p>
            <p className="text-gray-400 mt-2">Please check back later.</p>
          </div>
        )}
      </div>
    </main>
  )
}
