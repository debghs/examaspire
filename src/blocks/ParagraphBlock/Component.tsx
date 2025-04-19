import React from 'react'
import { cn } from '@/utilities/utils'
import type { ParagraphBlock as ParagraphBlockType } from '@/payload-types'
import RichTextParser from '@/components/RichTextParser'

const alignmentStyles = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
} as const

const weightStyles = {
  normal: 'font-normal',
  medium: 'font-medium',
  bold: 'font-bold',
} as const

export const ParagraphBlock: React.FC<{ block: ParagraphBlockType }> = ({ block }) => {
  const { text, alignment = 'left', appearance } = block

  const styles = cn(
    'leading-relaxed',
    alignmentStyles[alignment || 'left'],
    weightStyles[appearance?.weight || 'normal'],
    appearance?.color || 'text-black',
  )

  return (
    <div className={styles}>
      <RichTextParser
        data={text}
        enableProse={false}
        useDefaultStyles={false}
        className="max-w-none"
      />
    </div>
  )
}

export default ParagraphBlock
