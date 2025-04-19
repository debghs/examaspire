'use client'

import React from 'react'
import Image from 'next/image'
import type { PageLayoutBlock as PageLayoutBlockType, Media } from '@/payload-types'
import { cn } from '@/utilities/utils'
import BlockRenderer from '@/components/BlockRenderer'

// Style Constants
const widthClasses = {
  default: 'w-full max-w-4xl mx-auto',
  wide: 'w-full max-w-6xl mx-auto',
  full: 'w-full',
  narrow: 'w-full max-w-2xl mx-auto',
} as const

const paddingClasses = {
  none: { x: '0', y: '0' },
  small: { x: '4', y: '6' },
  default: { x: '6', y: '12' },
  large: { x: '8', y: '16' },
} as const

const spacingClasses = {
  none: 'space-y-0',
  small: 'space-y-4',
  default: 'space-y-8',
  large: 'space-y-12',
} as const

const backgroundClasses = {
  none: '',
  white: 'bg-white',
  'gray-50': 'bg-gray-50',
  'gray-100': 'bg-gray-100',
} as const

type BorderPosition = 'all' | 'top' | 'bottom'

const borderClasses: Record<BorderPosition, string> = {
  all: 'border',
  top: 'border-t',
  bottom: 'border-b',
} as const

type OverlayColor = 'black' | 'white'
type OverlayOpacity = '0' | '25' | '50' | '75'

const overlayClasses: Record<OverlayColor, Record<OverlayOpacity, string>> = {
  black: {
    '0': 'bg-black/0',
    '25': 'bg-black/25',
    '50': 'bg-black/50',
    '75': 'bg-black/75',
  },
  white: {
    '0': 'bg-white/0',
    '25': 'bg-white/25',
    '50': 'bg-white/50',
    '75': 'bg-white/75',
  },
} as const

// Type Guards
const isMedia = (media: unknown): media is Media & { url: string } => {
  return (
    media !== null &&
    typeof media === 'object' &&
    'url' in media &&
    typeof (media as { url: unknown }).url === 'string'
  )
}

const isValidOverlay = (
  overlay: NonNullable<PageLayoutBlockType['bg']>['overlay'],
): overlay is { type: OverlayColor; opacity: OverlayOpacity } => {
  return (
    !!overlay &&
    'type' in overlay &&
    'opacity' in overlay &&
    typeof overlay.type === 'string' &&
    typeof overlay.opacity === 'string' &&
    (overlay.type === 'black' || overlay.type === 'white') &&
    ['0', '25', '50', '75'].includes(overlay.opacity)
  )
}

// Sub-components
interface BackgroundImageProps {
  image: NonNullable<PageLayoutBlockType['bg']>['image']
  overlay?: NonNullable<PageLayoutBlockType['bg']>['overlay']
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ image, overlay }) => {
  if (!image || !isMedia(image)) return null

  return (
    <>
      <div className="absolute inset-0 z-0">
        <Image src={image.url} alt="" fill className="object-cover" priority={false} />
      </div>
      {isValidOverlay(overlay) && (
        <div
          className={cn('absolute inset-0 z-0', overlayClasses[overlay.type][overlay.opacity])}
        />
      )}
    </>
  )
}

type PaddingValue = 'none' | 'small' | 'default' | 'large'
type WidthValue = 'default' | 'wide' | 'full' | 'narrow'
type SpacingValue = 'none' | 'small' | 'default' | 'large'

interface ContentContainerProps {
  container: NonNullable<PageLayoutBlockType['container']>
  blocks: PageLayoutBlockType['blocks']
}

const ContentContainer: React.FC<ContentContainerProps> = ({ container, blocks }) => {
  const width = (container.width || 'default') as WidthValue
  const paddingX = (container.padding?.x || 'default') as PaddingValue
  const paddingY = (container.padding?.y || 'default') as PaddingValue
  const spacing = (container.spacing || 'default') as SpacingValue

  return (
    <div
      className={cn(
        'relative z-10',
        widthClasses[width],
        `px-${paddingClasses[paddingX].x}`,
        `py-${paddingClasses[paddingY].y}`,
      )}
    >
      <div className={spacingClasses[spacing]}>
        <BlockRenderer blocks={blocks} />
      </div>
    </div>
  )
}

// Default values
const defaultContainer = {
  width: 'default' as const,
  padding: {
    x: 'default' as const,
    y: 'default' as const,
  },
  spacing: 'default' as const,
}

const defaultBackground = {
  color: 'none' as const,
  image: undefined,
  overlay: undefined,
}

// Main Component
export const PageLayout: React.FC<{ block: PageLayoutBlockType }> = ({ block }) => {
  const { container = defaultContainer, bg = defaultBackground, border, blocks } = block

  const containerClasses = cn(
    'relative',
    backgroundClasses[bg.color || 'none'],
    border?.enabled && border.position && cn(borderClasses[border.position], 'border-gray-200'),
  )

  return (
    <div className={containerClasses}>
      <BackgroundImage image={bg.image} overlay={bg.overlay} />
      <ContentContainer container={container} blocks={blocks} />
    </div>
  )
}

export default PageLayout
