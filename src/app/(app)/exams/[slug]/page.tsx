import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { queryCollectionBySlug } from '@/utilities/queryCollectionBySlug'
import { queryCollectionForStaticParams } from '@/utilities/queryCollection'
import RichText from '@/components/RichTextParser'
import { Exam, Question } from '@/payload-types'
import { formatDate } from '@/utilities/formatDateTime'
import Image from 'next/image'
import Link from 'next/link'
import { IdCard } from 'lucide-react'

export default async function ExamPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const payload = await getPayload({ config: configPromise })

    const exam = await payload.find({
      collection: 'exams',
      where: {
        id: {
          equals: slug,
        },
        status: {
          equals: 'published',
        },
      },
    })

    if (!exam ) {
      // console.log("hi")
      return notFound()
    }
    console.log(exam)
    const examData = exam.docs[0] as Exam
    const questions = examData.questions as Question[]

    return (
      <div className="container mx-auto px-4 py-8">
        {/* Exam Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{examData.title}</h1>
              <div className="prose max-w-none mt-4">
                <RichText data={examData.description} />
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg min-w-[300px]">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Questions:</span>
                  <span className="font-medium">{questions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Marks:</span>
                  <span className="font-medium">{examData.totalMarks}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{examData.duration} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Start Date:</span>
                  <span className="font-medium">{formatDate(examData.startDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">End Date:</span>
                  <span className="font-medium">{formatDate(examData.endDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${
                    examData.status === 'published' 
                      ? 'text-green-600' 
                      : examData.status === 'archived' 
                        ? 'text-red-600' 
                        : 'text-yellow-600'
                  }`}>
                    {examData.status}
                  </span>
                </div>
              </div>
              
              <Link 
                href={`/exams/${examData.slug}/take`}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition-colors gap-2"
              >
                <IdCard className="w-5 h-5" />
                Start Exam
              </Link>
            </div>
          </div>

          {/* Tags */}
          {examData.tags && examData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {examData.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
                >
                  {typeof tag === 'object' ? tag.name : tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Exam Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Instructions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 mt-2"></span>
                <span>Read all questions carefully before answering.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 mt-2"></span>
                <span>Ensure you have a stable internet connection throughout the exam.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 mt-2"></span>
                <span>Do not refresh the page during the exam.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 mt-2"></span>
                <span>Submit your answers before the timer runs out.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 mt-2"></span>
                <span>You cannot return to previous questions once submitted.</span>
              </li>
            </ul>
          </div>

          {/* Preparation Checklist */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Preparation Checklist</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                <input type="checkbox" className="w-5 h-5 rounded text-blue-600" />
                <span className="text-gray-700">Review course materials</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                <input type="checkbox" className="w-5 h-5 rounded text-blue-600" />
                <span className="text-gray-700">Check system requirements</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                <input type="checkbox" className="w-5 h-5 rounded text-blue-600" />
                <span className="text-gray-700">Test internet connection</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                <input type="checkbox" className="w-5 h-5 rounded text-blue-600" />
                <span className="text-gray-700">Prepare required materials</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                <input type="checkbox" className="w-5 h-5 rounded text-blue-600" />
                <span className="text-gray-700">Set up quiet examination space</span>
              </div>
            </div>
          </div>

          {/* System Requirements */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">System Requirements</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Browser</h3>
                <p className="text-gray-700">Latest version of Chrome, Firefox, or Edge</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Internet Connection</h3>
                <p className="text-gray-700">Minimum 1 Mbps upload and download speed</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Device</h3>
                <p className="text-gray-700">Desktop or laptop with minimum 4GB RAM</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Screen Resolution</h3>
                <p className="text-gray-700">Minimum 1024x768 resolution</p>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-md hover:border-blue-500 transition-colors">
                <h3 className="font-medium text-gray-900 mb-2">Study Materials</h3>
                <p className="text-gray-700">Access recommended reading materials and practice questions</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-md hover:border-blue-500 transition-colors">
                <h3 className="font-medium text-gray-900 mb-2">FAQs</h3>
                <p className="text-gray-700">Find answers to common questions about the exam</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-md hover:border-blue-500 transition-colors">
                <h3 className="font-medium text-gray-900 mb-2">Support</h3>
                <p className="text-gray-700">Contact information for technical assistance during the exam</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

// Generate static paths for SSG
export async function generateStaticParams() {
  // const payload = await getPayload({ config: configPromise })
  const exams = await queryCollectionForStaticParams('exams', false)

  return exams.filter(exam => exam.status === 'published').map(exam => ({
    slug: exam.slug,
  }))
}
