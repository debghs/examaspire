'use client'

import React from 'react'
import type { GridBlock as GridBlockType } from '@/payload-types'
import { cn } from '@/utilities/utils'
import BlockRenderer from '@/components/BlockRenderer'

const columnClasses = {
  desktop: {
    '1': 'lg:grid-cols-1',
    '2': 'lg:grid-cols-2',
    '3': 'lg:grid-cols-3',
    '4': 'lg:grid-cols-4',
    '6': 'lg:grid-cols-6',
  },
  tablet: {
    '1': 'md:grid-cols-1',
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-3',
  },
  mobile: {
    '1': 'grid-cols-1',
    '2': 'grid-cols-2',
  },
} as const

const gapClasses = {
  none: 'gap-0',
  small: 'gap-4',
  default: 'gap-6',
  large: 'gap-8',
  inherit: '',
} as const

const paddingClasses = {
  none: 'p-0',
  small: 'p-4',
  default: 'p-6',
  large: 'p-8',
} as const

const alignmentClasses = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
} as const

const spacingClasses = {
  none: 'space-y-0',
  small: 'space-y-4',
  default: 'space-y-6',
  large: 'space-y-8',
} as const

const containerPositionClasses = {
  left: 'ml-0',
  center: 'mx-auto',
  right: 'ml-auto',
} as const

const defaultLayout = {
  columns: {
    desktop: '3',
    tablet: '2',
    mobile: '1',
  },
  gap: {
    x: 'default',
    y: 'default',
  },
  alignment: 'start',
  containerPosition: 'center',
} satisfies NonNullable<GridBlockType['layout']>

// Helper Components
const GridItem: React.FC<{
  blocks: NonNullable<GridBlockType['items']>[0]['blocks']
  appearance?: {
    padding?: {
      x?: 'none' | 'small' | 'default' | 'large' | null
      y?: 'none' | 'small' | 'default' | 'large' | null
    } | null
    spacing?: 'none' | 'small' | 'default' | 'large' | null
  } | null
}> = ({ blocks, appearance }) => {
  const itemClasses = cn(
    'relative',
    appearance?.padding?.x && paddingClasses[appearance.padding.x],
    appearance?.padding?.y && paddingClasses[appearance.padding.y],
  )

  const rendererClasses = cn(
    'flex flex-col',
    appearance?.spacing && spacingClasses[appearance.spacing],
  )

  return (
    <div className={itemClasses}>
      <BlockRenderer blocks={blocks} className={rendererClasses} />
    </div>
  )
}

// Main Component
export const GridBlock: React.FC<{ block: GridBlockType }> = ({ block }) => {
  const { items, layout = defaultLayout } = block

  const mobileColumns = layout.columns?.mobile || defaultLayout.columns.mobile
  const tabletColumns = layout.columns?.tablet || defaultLayout.columns.tablet
  const desktopColumns = layout.columns?.desktop || defaultLayout.columns.desktop
  const gapX = layout.gap?.x || defaultLayout.gap.x
  const gapY = layout.gap?.y || defaultLayout.gap.y
  const alignment = layout.alignment || defaultLayout.alignment
  const containerPosition = layout.containerPosition || defaultLayout.containerPosition

  const containerClasses = cn(containerPositionClasses[containerPosition], '')

  const gridClasses = cn(
    'grid',
    columnClasses.mobile[mobileColumns],
    columnClasses.tablet[tabletColumns],
    columnClasses.desktop[desktopColumns],
    gapClasses[gapX],
    gapClasses[gapY],
    alignmentClasses[alignment],
  )

  return (
    <div className={containerClasses}>
      <div className={gridClasses}>
        {items.map((item, index) => (
          <GridItem key={index} blocks={item.blocks} appearance={item.appearance} />
        ))}
      </div>
    </div>
  )
}

export default GridBlock
