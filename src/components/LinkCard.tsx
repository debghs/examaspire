import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface CardProps {
  title: string
  type?: 'square' | 'rectangle'
  subtitle?: string
  imageSrc?: string
  href: string
  lessons?: number
  className?: string
}

export function LinkCard({ type = 'rectangle', ...props }: CardProps) {
  if (type === 'square') {
    return <SquareCard {...props} />
  }
  return <RectangleCard {...props} />
}

function RectangleCard({ title, subtitle, imageSrc, href, lessons, className = '' }: CardProps) {
  return (
    <Link href={href} className={`${className}`}>
      <div className="flex flex-col gap-3 pb-3">
        <div className="w-full hover:shadow-xl transition-shadow aspect-video rounded-xl overflow-hidden">
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={title}
              width={400}
              height={225}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div>
          <p className="text-[#201A09] text-base font-medium leading-normal">{title}</p>
          {subtitle && (
            <p className="text-[#A07D1C] text-sm font-normal leading-normal">{subtitle}</p>
          )}
          {typeof lessons === 'number' && (
            <p className="mt-4 text-sm font-medium text-primary-600">{lessons} lessons</p>
          )}
        </div>
      </div>
    </Link>
  )
}

function SquareCard({ title, subtitle, imageSrc, href, lessons, className = '' }: CardProps) {
  return (
    <Link href={href} className={`${className}`}>
      <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
        <div className="w-full hover:shadow-xl transition-shadow aspect-square rounded-xl overflow-hidden">
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={title}
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div>
          <p className="text-[#201A09] text-base font-medium leading-normal">{title}</p>
          {subtitle && (
            <p className="text-[#A07D1C] text-sm font-normal leading-normal">{subtitle}</p>
          )}
          {typeof lessons === 'number' && (
            <p className="mt-4 text-sm font-medium text-primary-600">{lessons} lessons</p>
          )}
        </div>
      </div>
    </Link>
  )
}
