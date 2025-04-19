'use client'

import React from 'react'
import Image from 'next/image'
import RichTextParser from '@/components/RichTextParser'
import type { TimelineBlock as TimelineBlockType, Media } from '@/payload-types'
import { cn } from '@/utilities/utils'

const densityClasses = {
  compact: 'space-y-4 md:space-y-6',
  default: 'space-y-6 md:space-y-8',
  comfortable: 'space-y-8 md:space-y-12',
} as const

const connectorClasses = {
  solid: 'border-bianca-200',
  dashed: 'border-dashed border-bianca-200',
  dotted: 'border-dotted border-bianca-200',
} as const

// Type guard for Media objects
const isMedia = (
  media: unknown,
): media is Media & { url: string; width: number; height: number } => {
  return (
    media !== null &&
    typeof media === 'object' &&
    'url' in media &&
    typeof (media as { url: unknown }).url === 'string' &&
    'width' in media &&
    typeof (media as { width: unknown }).width === 'number' &&
    'height' in media &&
    typeof (media as { height: unknown }).height === 'number'
  )
}

const TimelineContent: React.FC<{
  content: NonNullable<TimelineBlockType['items']>[0]['content']
}> = ({ content }) => {
  return (
    <div className="rounded-lg shadow-sm p-3 md:p-4 border border-bianca-400/70 hover:shadow-md transition-shadow max-w-xl">
      <h3 className="text-base md:text-lg font-bold text-[#201A09] mb-1.5">{content.title}</h3>
      <div className="prose prose-sm text-[#201A09]">
        <RichTextParser data={content.description} useDefaultStyles={false} />
      </div>
      {content.media && isMedia(content.media) && (
        <div className="mt-3">
          <Image
            src={content.media.url}
            alt={content.media.alt || ''}
            width={content.media.width}
            height={content.media.height}
            className="rounded-lg h-auto max-w-48"
          />
        </div>
      )}
    </div>
  )
}

const VerticalTimelineItem: React.FC<{
  item: NonNullable<TimelineBlockType['items']>[0]
  index: number
}> = ({ item, index }) => {
  return (
    <div className="relative flex items-start gap-4 md:gap-6">
      <div className="w-20 md:w-24 text-right">
        <span className="text-[#201A09] font-medium text-sm md:text-base">{item.date}</span>
      </div>

      <div className="absolute left-[4.5rem] md:left-[5.5rem] transform -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#FAC638]" />

      <div className="flex-1 gap-5">
        <TimelineContent content={item.content} />
      </div>
    </div>
  )
}

const HorizontalTimelineItem: React.FC<{
  item: NonNullable<TimelineBlockType['items']>[0]
  index: number
  totalItems: number
}> = ({ item, index, totalItems }) => {
  return (
    <div
      className={cn(
        'flex-none w-72 px-3 snap-center',
        index === 0 && 'pl-0',
        index === totalItems - 1 && 'pr-0',
      )}
    >
      <div className="relative mb-4 text-center">
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#FAC638]" />
        <div className="pt-3">
          <span className="text-[#201A09] font-medium text-sm md:text-base">{item.date}</span>
        </div>
      </div>

      <TimelineContent content={item.content} />
    </div>
  )
}

export const TimelineBlock: React.FC<{ block: TimelineBlockType }> = ({ block }) => {
  const defaultLayout = {
    style: 'vertical' as const,
    density: 'default' as const,
    connector: 'solid' as const,
  } satisfies NonNullable<TimelineBlockType['layout']>

  const { items, layout = defaultLayout } = block

  const containerClasses = cn('py-6 md:py-12')

  const contentClasses = cn('w-full max-w-4xl mx-auto px-3 md:px-6')

  return (
    <div className={containerClasses}>
      <div className={contentClasses}>
        <div
          className={cn(
            'relative',
            layout.style === 'vertical' &&
              densityClasses[layout.density as keyof typeof densityClasses],
          )}
        >
          {layout.style === 'vertical' ? (
            <div className="relative">
              <div
                className={cn(
                  'absolute left-[4.5rem] md:left-[5.5rem] transform -translate-x-1/2 h-full border-l-2',
                  connectorClasses[layout.connector as keyof typeof connectorClasses],
                )}
              />

              {items.map((item, index) => (
                <VerticalTimelineItem key={index} item={item} index={index} />
              ))}
            </div>
          ) : (
            <div className="relative">
              <div
                className={cn(
                  'absolute top-4 left-0 w-full border-t-2',
                  connectorClasses[layout.connector as keyof typeof connectorClasses],
                )}
              />

              <div className="flex overflow-x-auto pb-6 pt-1 gap-3 snap-x snap-mandatory scrollbar-hide">
                {items.map((item, index) => (
                  <HorizontalTimelineItem
                    key={index}
                    item={item}
                    index={index}
                    totalItems={items.length}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TimelineBlock
