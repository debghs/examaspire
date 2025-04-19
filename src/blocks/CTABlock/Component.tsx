import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { CTABlock as CTABlockType, Media } from '@/payload-types'

export const CTABlock: React.FC<{ block: CTABlockType }> = ({ block }) => {
  const { content, image } = block

  // Handle media object with type guard
  const isMedia = (media: Media | number | null | undefined): media is Media => {
    return media !== null && typeof media !== 'number' && typeof (media as Media)?.url === 'string'
  }

  const hasValidMedia = isMedia(image)

  return (
    <div className="w-full bg-bianca-100 rounded-2xl overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 relative">
        <div className="flex flex-col gap-3 md:gap-4 text-center md:text-left md:max-w-2xl relative z-10 p-8 md:px-6 md:py-12">
          <h2 className="text-bianca-950 text-xl md:text-2xl font-bold leading-tight @[480px]:text-4xl @[480px]:tracking-[-0.02em]">
            {content.title}
          </h2>
          {content.description && (
            <p className="text-bianca-700 text-sm md:text-base @[480px]:text-lg">
              {content.description}
            </p>
          )}
          <Link
            href={content.button.link}
            className="inline-flex items-center justify-center px-4 py-2 md:px-6 md:py-3 @[480px]:px-8 @[480px]:py-4 
                     bg-bianca-600 hover:bg-bianca-700 transition-colors
                     text-bianca-50 font-semibold rounded-xl
                     text-sm @[480px]:text-base mt-2 md:mt-4"
          >
            {content.button.text}
          </Link>
        </div>
        {hasValidMedia && image.url && (
          <div className="w-full h-48 md:h-auto md:w-1/2 md:absolute md:right-0 md:top-0 md:bottom-0">
            <Image
              src={image.url}
              alt={image.alt || ''}
              width={800}
              height={600}
              className="w-full h-full object-cover"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default CTABlock
