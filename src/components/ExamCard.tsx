import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Exam } from '@/payload-types'

interface ExamCardProps {
  exam: Exam
  className?: string
}

// Helper function to handle rich text or string descriptions
const renderDescription = (description: any) => {
  if (typeof description === 'string') {
    return description
  }
  if (description?.root?.children) {
    // Simple text extraction from rich text (you might want to use a proper rich text renderer)
    return description.root.children
      .map((child: any) => child.children?.map((text: any) => text.text).join(''))
      .join(' ')
  }
  return ''
}

export function ExamCard({ exam, className = '' }: ExamCardProps) {
  return (
    <Link 
      href={`/exams/${exam.slug}`} 
      className={`${className} block hover:shadow-md transition-shadow`}
    >
      <div className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 rounded-lg">
        {/* Left side - Image */}
        {exam.image && typeof exam.image === 'object' && (
          <div className="w-full md:w-1/4 aspect-video md:aspect-square rounded-md overflow-hidden">
            <Image
              src={exam.image.url as string}
              alt={exam.title}
              width={300}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Right side - Content */}
        <div className="flex-1 flex flex-col">
          {/* Title and basic info */}
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{exam.title}</h3>
            {exam.description && (
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {renderDescription(exam.description)}
              </p>
            )}
          </div>

          {/* Metadata row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-auto">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Total Marks</span>
              <span className="font-medium">{exam.totalMarks || 'N/A'}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Duration</span>
              <span className="font-medium">
                {exam.duration ? `${exam.duration} mins` : 'N/A'}
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">End Date</span>
              <span className="font-medium">
                {exam.endDate ? new Date(exam.endDate as string).toLocaleDateString() : 'No deadline'}
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Status</span>
              <span className={`font-medium ${
                exam.status === 'published' ? 'text-green-600' : 'text-yellow-600'
              }`}>
                {exam.status || 'draft'}
              </span>
            </div>
          </div>

          {/* Tags */}
          {exam.tags && exam.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {(exam.tags as any[]).map((tag, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full"
                >
                  {typeof tag === 'object' ? tag.name || tag.id : tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
