import { GapBlock as GapBlockType } from '@/payload-types'
import { cn } from '@/utilities/ui'
import React from 'react'

const desktopSizeMap = {
  xs: 'md:my-2 md:mx-2',
  sm: 'md:my-4 md:mx-4',
  md: 'md:my-8 md:mx-8',
  lg: 'md:my-16 md:mx-16',
  xl: 'md:my-32 md:mx-32',
} as const

const mobileSizeMap = {
  xs: 'my-1 mx-1',
  sm: 'my-2 mx-2',
  md: 'my-4 mx-4',
  lg: 'my-8 mx-8',
  xl: 'my-16 mx-16',
} as const

const GapBlock: React.FC<{ block: GapBlockType }> = ({ block }) => {
  const { gapType, size } = block

  const gapClass = cn('bg-transparent flex-shrink-0', mobileSizeMap[size], desktopSizeMap[size], {
    'block w-full': gapType === 'vertical',
    'inline-block h-full': gapType === 'horizontal',
  })

  return <div className={gapClass} />
}

export { GapBlock }
