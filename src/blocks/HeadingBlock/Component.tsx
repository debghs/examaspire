import React from 'react'
import { cn } from '@/utilities/utils'
import type { HeadingBlock as HeadingBlockType } from '@/payload-types'

const headingStyles = {
  h1: 'text-4xl md:text-5xl tracking-[-0.033em] font-black', // Display Large
  h2: 'text-3xl md:text-4xl tracking-[-0.033em] font-black', // Display Medium
  h3: 'text-2xl md:text-3xl tracking-[-0.033em] font-bold', // Display Small
  h4: 'text-xl md:text-2xl tracking-[-0.033em] font-bold', // Heading Large
  h5: 'text-lg md:text-xl tracking-[-0.033em] font-medium', // Heading Medium
  h6: 'text-base md:text-lg tracking-[-0.033em] font-medium', // Body Large
} as const

const alignmentStyles = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const

const visibilityStyles = {
  always: '',
  'desktop-only': 'hidden md:block',
  'mobile-only': 'md:hidden',
  hidden: 'hidden',
} as const

const HeadingTags = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
} as const

export const HeadingBlock: React.FC<{ block: HeadingBlockType }> = ({ block }) => {
  const { text, level = 'h2', alignment = 'left', color } = block
  const Tag = HeadingTags[level]

  const styles = cn(
    'text-black', // Black from design system (default)
    'leading-tight', // Tight line height for headings
    headingStyles[level],
    alignmentStyles[alignment || 'left'],
    color && (color.startsWith('#') ? `text-[${color}]` : color),
  )

  return React.createElement(Tag, { className: styles }, text)
}

export default HeadingBlock
