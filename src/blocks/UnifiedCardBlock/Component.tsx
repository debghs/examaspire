'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { UnifiedCardBlock as UnifiedCardBlockType, Media } from '@/payload-types'
import { cn } from '@/utilities/utils'
import * as LucideIcons from 'lucide-react'

const gapClasses = {
  small: 'gap-3',
  default: 'gap-6',
  large: 'gap-8',
} as const

const tagColorClasses = {
  default: 'bg-bianca-50 text-[#201A09]',
  primary: 'bg-[#FAC638] text-[#AB2217]',
  success: 'bg-bianca-100 text-[#201A09]',
  warning: 'bg-[#F5EFDB] text-[#A07D1C]',
  error: 'bg-bianca-50 text-[#AB2217]',
} as const

// Type guard for Media objects
const isMedia = (media: unknown): media is Media & { url: string } => {
  return (
    media !== null &&
    typeof media === 'object' &&
    'url' in media &&
    typeof (media as { url: unknown }).url === 'string'
  )
}

// Type guard for video media
const isVideoMedia = (
  media: unknown,
): media is Media & {
  url: string
  thumbnailURL?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
} => {
  return (
    isMedia(media) &&
    typeof (media as any).url === 'string' &&
    (typeof (media as any).thumbnailURL === 'string' ||
      typeof (media as any).thumbnailURL === 'undefined') &&
    (typeof (media as any).autoPlay === 'boolean' ||
      typeof (media as any).autoPlay === 'undefined') &&
    (typeof (media as any).muted === 'boolean' || typeof (media as any).muted === 'undefined') &&
    (typeof (media as any).loop === 'boolean' || typeof (media as any).loop === 'undefined')
  )
}

const Icon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
  const IconComponent = (LucideIcons as any)[name]
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in Lucide React`)
    return null
  }
  return <IconComponent className={className} />
}

const CardMedia: React.FC<{
  media: NonNullable<UnifiedCardBlockType['cards']>[0]['media']
  variant: NonNullable<UnifiedCardBlockType['layout']>['variant']
}> = ({ media, variant }) => {
  const aspectRatioClass = variant === 'square' ? 'aspect-square' : 'aspect-video'

  return (
    <div
      className={cn(
        'w-full hover:shadow-xl transition-shadow rounded-xl overflow-hidden',
        aspectRatioClass,
      )}
    >
      {media.type === 'image' && media.image && isMedia(media.image) && (
        <Image
          src={media.image.url}
          alt={media.image.alt || ''}
          width={400}
          height={variant === 'square' ? 400 : 225}
          className="w-full h-full object-cover"
        />
      )}
      {media.type === 'video' && media.video && isVideoMedia(media.video) && (
        <>
          <video
            src={media.video.url}
            poster={media.video.thumbnailURL}
            autoPlay={media.video.autoPlay ?? false}
            muted={media.video.muted ?? true}
            loop={media.video.loop ?? true}
            playsInline
            className="w-full h-full object-cover"
          />
          {media.video.thumbnailURL && !media.video.autoPlay && (
            <button
              className="absolute inset-0 flex items-center justify-center bg-black/30 group hover:bg-black/40 transition-colors"
              onClick={(e) => {
                const video = e.currentTarget.previousElementSibling as HTMLVideoElement
                if (video) {
                  video.setAttribute('controls', 'true')
                  e.currentTarget.style.display = 'none'
                }
              }}
            >
              <svg
                className="w-16 h-16 text-white opacity-90 group-hover:opacity-100 transition-opacity"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          )}
        </>
      )}
      {media.type === 'icon' && media.icon && (
        <div className="flex items-center justify-center w-full h-full bg-[#F5EFDB]">
          <Icon
            name={media.icon.name}
            className={cn(
              'w-12 h-12',
              media.icon.color === 'primary' && 'text-primary-600',
              media.icon.color === 'secondary' && 'text-secondary-600',
              media.icon.color === 'brand' && 'text-brand-600',
              (!media.icon.color || media.icon.color === 'default') && 'text-[#201A09]',
            )}
          />
        </div>
      )}
    </div>
  )
}

const CardContent: React.FC<{
  card: NonNullable<UnifiedCardBlockType['cards']>[0]
  variant: NonNullable<UnifiedCardBlockType['layout']>['variant']
}> = ({ card, variant }) => {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-[#201A09] text-base font-medium leading-normal">{card.content.title}</p>
        {card.content.description && (
          <p className="text-[#A07D1C] text-sm font-normal leading-normal">
            {card.content.description}
          </p>
        )}
      </div>
      {card.content.tags && card.content.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {card.content.tags.map((tag, index) => (
            <span
              key={index}
              className={cn(
                'px-2 py-1 text-sm rounded-full font-medium',
                tagColorClasses[tag.color as keyof typeof tagColorClasses],
              )}
            >
              {tag.text}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

const Card: React.FC<{
  card: NonNullable<UnifiedCardBlockType['cards']>[0]
  variant: NonNullable<UnifiedCardBlockType['layout']>['variant']
}> = ({ card, variant }) => {
  const cardContent = (
    <div className="flex flex-col gap-3 pb-3">
      <CardMedia media={card.media} variant={variant} />
      <CardContent card={card} variant={variant} />
    </div>
  )

  if (card.link && card.link.type !== 'none' && card.link.url) {
    return (
      <Link
        href={card.link.url}
        target={card.link.newTab ? '_blank' : undefined}
        rel={card.link.newTab ? 'noopener noreferrer' : undefined}
        className="cursor-pointer"
      >
        {cardContent}
      </Link>
    )
  }

  return cardContent
}

export const UnifiedCardBlock: React.FC<{ block: UnifiedCardBlockType }> = ({ block }) => {
  const { cards, layout } = block
  const desktopCols = layout.columns?.desktop || '3'
  const tabletCols = layout.columns?.tablet || '2'
  const mobileCols = layout.columns?.mobile || '1'

  return (
    <div
      className={cn(
        'max-w-lg mx-auto md:mx-0 md:max-w-none lg:w-full',
        'py-4', // Default spacing
      )}
    >
      <div
        className={cn(
          'grid',
          desktopCols && `lg:grid-cols-${desktopCols}`,
          mobileCols && `grid-cols-${mobileCols}`,
          tabletCols && `md:grid-cols-${tabletCols}`,
          gapClasses[layout.gap || 'default'],
        )}
      >
        {cards.map((card, index) => (
          <Card key={index} card={card} variant={layout.variant || 'rectangular'} />
        ))}
      </div>
    </div>
  )
}

export default UnifiedCardBlock
