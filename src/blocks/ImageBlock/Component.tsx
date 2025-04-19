'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { ImageBlock as ImageBlockType, Media } from '@/payload-types'

const widthClasses = {
  default: 'w-full max-w-4xl mx-auto',
  wide: 'w-full max-w-6xl mx-auto',
  full: 'w-full',
  small: 'w-full max-w-2xl mx-auto',
} as const

const aspectRatioClasses = {
  auto: 'relative w-full',
  '16/9': 'aspect-video',
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
  '3/4': 'aspect-[3/4]',
} as const

const roundedClasses = {
  none: '',
  default: 'rounded-xl',
  large: 'rounded-3xl',
  full: 'rounded-full',
} as const

const shadowClasses = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
} as const

// Default sizes based on width setting
const imageSizes = {
  default: { width: 896, height: 504 }, // 16:9 ratio at max-w-4xl (896px)
  wide: { width: 1152, height: 648 }, // 16:9 ratio at max-w-6xl (1152px)
  full: { width: 1920, height: 1080 }, // Full HD
  small: { width: 672, height: 378 }, // 16:9 ratio at max-w-2xl (672px)
} as const

export const ImageBlock: React.FC<{ block: ImageBlockType }> = ({ block }) => {
  const { image, content, appearance, link } = block

  // Handle media object with type guard
  const media = image as Media | null | undefined
  const hasValidMedia = media && typeof media.url === 'string'

  // Handle link with type guard
  const hasValidLink = link?.enabled && typeof link.url === 'string'

  const ImageComponent = () => {
    if (!hasValidMedia || !media?.url) return null

    const widthSetting = appearance?.width || 'default'
    const defaultSizes = imageSizes[widthSetting]

    // For auto aspect ratio, use width/height based layout
    if (appearance?.aspectRatio === 'auto') {
      return (
        <div
          className={`
          relative w-full overflow-hidden transition-all duration-300
          ${roundedClasses[appearance?.roundedCorners || 'default']}
          ${shadowClasses[appearance?.shadow || 'md']}
          ${appearance?.border ? 'border border-bianca-300' : ''}
          hover:opacity-95
        `}
        >
          <Image
            src={media.url}
            alt={media.alt || 'Image'}
            width={defaultSizes.width}
            height={defaultSizes.height}
            className="w-full h-auto object-contain max-h-[80vh]"
            priority={true}
            quality={85}
          />
        </div>
      )
    }

    // For fixed aspect ratios, use fill
    return (
      <div
        className={`
        relative overflow-hidden transition-all duration-300
        ${aspectRatioClasses[appearance?.aspectRatio || 'auto']}
        ${roundedClasses[appearance?.roundedCorners || 'none']}
        ${shadowClasses[appearance?.shadow || 'none']}
        ${appearance?.border ? 'border border-bianca-300' : ''}
        hover:opacity-95
        max-h-[80vh]
      `}
      >
        <Image
          src={media.url}
          alt={media.alt || 'Image'}
          fill
          sizes={`(max-width: 640px) 100vw, 
                  (max-width: 768px) 80vw,
                  (max-width: 1024px) ${widthSetting === 'full' ? '100vw' : '70vw'},
                  ${defaultSizes.width}px`}
          className="object-cover"
          priority={true}
          quality={85}
        />
      </div>
    )
  }

  return (
    <div
      className={`
      ${widthClasses[appearance?.width || 'default']}
      p-4
    `}
    >
      {hasValidLink && link?.url ? (
        <Link
          href={link.url}
          target={link.openInNewTab ? '_blank' : undefined}
          rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
          className="block transition-opacity hover:opacity-90"
        >
          <ImageComponent />
        </Link>
      ) : (
        <ImageComponent />
      )}

      {content?.caption && (
        <p className="mt-4 text-sm text-bianca-600 text-center">{content.caption}</p>
      )}
    </div>
  )
}

export default ImageBlock
