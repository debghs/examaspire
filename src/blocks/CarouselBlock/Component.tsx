'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaOptionsType } from 'embla-carousel'
import RichTextParser from '@/components/RichTextParser'
import type { CarouselBlock as CarouselBlockType, Media } from '@/payload-types'
import { cn } from '@/utilities/utils'

type AppearanceType = {
  width?: 'default' | 'wide' | 'full' | 'narrow'
  aspectRatio?: '16/9' | '4/3' | '1/1' | 'auto'
  alignment?: 'left' | 'center' | 'right'
}

const widthClasses = {
  default: 'max-w-4xl',
  wide: 'max-w-6xl',
  full: 'max-w-none',
  narrow: 'max-w-2xl',
} as const

const aspectRatioClasses = {
  '16/9': 'aspect-video',
  '4/3': 'aspect-4/3',
  '1/1': 'aspect-square',
  auto: '',
} as const

const alignmentClasses = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
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

const ImageSlide: React.FC<{ image: CarouselBlockType['slides'][0]['image'] }> = ({ image }) => {
  if (!isMedia(image)) return null
  return (
    <div className="relative w-full h-full">
      <Image
        src={image.url}
        alt={image.alt || ''}
        width={typeof image.width === 'number' ? image.width : 0}
        height={typeof image.height === 'number' ? image.height : 0}
        className="object-cover w-full h-full rounded-xl"
        priority={false}
      />
    </div>
  )
}

const TestimonialSlide: React.FC<{
  testimonial: CarouselBlockType['slides'][0]['testimonial']
}> = ({ testimonial }) => {
  if (!testimonial) return null

  const avatar = testimonial.author.avatar
  const hasAvatar = avatar && isMedia(avatar)

  return (
    <div className="flex flex-col items-center text-center px-6 py-8 bg-bianca-50 rounded-xl">
      <blockquote className="text-xl font-medium italic mb-6 text-[#201A09]">
        {testimonial.quote}
      </blockquote>
      <div className="flex items-center">
        {hasAvatar && (
          <div className="mr-4">
            <Image
              src={avatar.url}
              alt={avatar.alt || testimonial.author.name}
              width={typeof avatar.width === 'number' ? avatar.width : 48}
              height={typeof avatar.height === 'number' ? avatar.height : 48}
              className="rounded-full"
            />
          </div>
        )}
        <div className="text-left">
          <div className="font-semibold text-[#201A09]">{testimonial.author.name}</div>
          {testimonial.author.title && (
            <div className="text-sm text-[#A07D1C]">{testimonial.author.title}</div>
          )}
        </div>
      </div>
    </div>
  )
}

const ContentSlide: React.FC<{ content: CarouselBlockType['slides'][0]['content'] }> = ({
  content,
}) => {
  if (!content) return null

  const media = content.media
  const hasMedia = media && isMedia(media)

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 p-6 bg-bianca-50 rounded-xl">
      {hasMedia && (
        <div className="w-full md:w-1/2">
          <Image
            src={media.url}
            alt={media.alt || content.title}
            width={typeof media.width === 'number' ? media.width : 0}
            height={typeof media.height === 'number' ? media.height : 0}
            className="rounded-lg"
          />
        </div>
      )}
      <div className={hasMedia ? 'w-full md:w-1/2' : 'w-full'}>
        <h3 className="text-2xl font-bold mb-4 text-[#201A09] tracking-[-0.033em]">
          {content.title}
        </h3>
        {content.description && (
          <div className="prose prose-sm mb-6 text-[#201A09]">
            <RichTextParser data={content.description} useDefaultStyles={false} />
          </div>
        )}
        {content.link?.url && (
          <Link
            href={content.link.url}
            className="inline-flex items-center text-bianca-600 hover:text-bianca-800 font-medium"
          >
            {content.link.text}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  )
}

export const CarouselBlock: React.FC<{ block: CarouselBlockType }> = ({ block }) => {
  const { slides, settings = {}, appearance = {} as AppearanceType } = block
  const {
    autoplay = { enabled: false, interval: 5000, pauseOnHover: true },
    navigation = { arrows: true, dots: true },
  } = settings

  const autoplayInterval = typeof autoplay.interval === 'number' ? autoplay.interval : 5000

  const options: EmblaOptionsType = {
    loop: true,
    align: 'start',
    skipSnaps: false,
    containScroll: 'trimSnaps',
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (!emblaApi || !autoplay.enabled) return

    const autoplayFn = () => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext()
      } else {
        emblaApi.scrollTo(0)
      }
    }

    const interval = window.setInterval(autoplayFn, autoplayInterval)

    if (autoplay.pauseOnHover) {
      const root = emblaApi.rootNode()
      const onMouseEnter = () => window.clearInterval(interval)
      const onMouseLeave = () => {
        window.clearInterval(interval)
        window.setInterval(autoplayFn, autoplayInterval)
      }

      root.addEventListener('mouseenter', onMouseEnter)
      root.addEventListener('mouseleave', onMouseLeave)

      return () => {
        window.clearInterval(interval)
        root.removeEventListener('mouseenter', onMouseEnter)
        root.removeEventListener('mouseleave', onMouseLeave)
      }
    }

    return () => window.clearInterval(interval)
  }, [emblaApi, autoplay, autoplayInterval])

  const containerClasses = cn(
    widthClasses[appearance.width || 'default'],
    'mx-auto relative',
    alignmentClasses[appearance.alignment || 'center'],
  )

  const slideClasses = cn(
    'relative flex-[0_0_100%] min-w-0',
    aspectRatioClasses[appearance.aspectRatio || '16/9'],
  )

  const navigationButtonClasses = cn(
    'absolute top-1/2 -translate-y-1/2 z-10 rounded-full p-2 transition-all',
    'bg-[#FAC638] text-[#AB2217] hover:bg-[#A07D1C] hover:text-white',
  )

  return (
    <div className={containerClasses}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={index} className={slideClasses}>
              {slide.type === 'image' && <ImageSlide image={slide.image} />}
              {slide.type === 'testimonial' && <TestimonialSlide testimonial={slide.testimonial} />}
              {slide.type === 'content' && <ContentSlide content={slide.content} />}
            </div>
          ))}
        </div>
      </div>

      {navigation.arrows && (
        <>
          <button
            className={cn(navigationButtonClasses, 'left-4')}
            onClick={() => emblaApi?.scrollPrev()}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            className={cn(navigationButtonClasses, 'right-4')}
            onClick={() => emblaApi?.scrollNext()}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {navigation.dots && (
        <div className="flex justify-center gap-2 mt-4">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                index === selectedIndex
                  ? 'bg-[#FAC638]'
                  : 'bg-[#A07D1C] opacity-50 hover:opacity-100',
              )}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CarouselBlock
