import React from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/utils'
import { Star } from 'lucide-react'
import type { TestimonialBlock as TestimonialBlockType, Media } from '@/payload-types'

type TestimonialStyle = NonNullable<TestimonialBlockType['style']>

const styles = {
  variant: {
    card: 'bg-bianca-50/50 backdrop-blur-sm border border-bianca-400/30 rounded-xl p-4 md:p-6 hover:border-bianca-400/70 transition-all duration-200 relative before:content-["\u201C"] before:absolute before:text-[120px] before:-top-8 before:left-4 before:text-bianca-200/30 before:font-serif before:pointer-events-none before:select-none',
    quote:
      'relative pl-8 before:content-["\u201C"] before:absolute before:left-0 before:top-0 before:text-4xl before:text-[#A07D1C] before:font-serif',
    minimal: 'border-l-4 border-bianca-200 pl-6 py-2',
  } as const,

  spacing: {
    none: 'gap-0',
    small: 'gap-3 md:gap-4',
    medium: 'gap-4 md:gap-6',
    large: 'gap-6 md:gap-8',
  } as const,

  gridColumns: {
    '1': 'grid-cols-1 max-w-2xl mx-auto',
    '2': 'grid-cols-1 sm:grid-cols-2 gap-x-8',
    '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8',
    '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8',
  } as const,
}

const defaultStyle: TestimonialStyle = {
  columns: '3',
  variant: 'card',
  spacing: 'medium',
}

const isMedia = (value: unknown): value is Media => {
  return typeof value === 'object' && value !== null && 'url' in value
}

interface TestimonialItemProps {
  item: TestimonialBlockType['items'][0]
  variant: keyof typeof styles.variant
}

const TestimonialItem: React.FC<TestimonialItemProps> = ({ item, variant }) => {
  const renderRating = (rating?: string | null) => {
    if (!rating) return null
    const stars = parseInt(rating)
    return (
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              'h-5 w-5',
              i < stars ? 'text-[#FAC638] fill-[#FAC638]' : 'text-bianca-300',
            )}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col', styles.variant[variant])}>
      {renderRating(item.rating)}
      <blockquote className="flex-1 relative">
        <p className="text-[#201A09] italic text-base md:text-lg mb-6 leading-relaxed tracking-[-0.015em] relative z-10">
          {'"' + item.quote + '"'}
        </p>
        <footer className="flex items-center gap-4 relative z-10">
          {isMedia(item.image) && item.image.url && (
            <div className="relative h-12 w-12 flex-shrink-0">
              <Image
                src={item.image.url}
                alt={item.image.alt || ''}
                fill
                className="object-cover rounded-full ring-2 ring-bianca-200/50"
              />
            </div>
          )}
          <div>
            <cite className="not-italic font-bold text-[#201A09] tracking-[-0.015em]">
              {item.author.name}
            </cite>
            {(item.author.title || item.author.company) && (
              <div className="text-sm text-bianca-700 mt-0.5">
                {item.author.title}
                {item.author.title && item.author.company && ' at '}
                {item.author.company}
              </div>
            )}
          </div>
        </footer>
      </blockquote>
    </div>
  )
}

interface TestimonialBlockProps {
  block: TestimonialBlockType
}

export const TestimonialBlock: React.FC<TestimonialBlockProps> = ({ block }) => {
  const { items, style = defaultStyle } = block
  const columns = (style.columns || '3') as keyof typeof styles.gridColumns
  const spacing = (style.spacing || 'medium') as keyof typeof styles.spacing
  const variant = (style.variant || 'card') as keyof typeof styles.variant

  return (
    <div className="w-full px-4 md:px-12">
      <div className={cn('grid', styles.gridColumns[columns], styles.spacing[spacing])}>
        {items?.map((item, index) => <TestimonialItem key={index} item={item} variant={variant} />)}
      </div>
    </div>
  )
}
