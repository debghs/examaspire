'use client'

import React, { useState, useRef, useEffect } from 'react'
import type { AccordionBlock as AccordionBlockType } from '@/payload-types'
import { cn } from '@/utilities/utils'
import RichTextParser from '@/components/RichTextParser'
import { ChevronDown } from 'lucide-react'

// Style Constants
const positionClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const

const defaultAppearance = {
  position: 'left',
  showBorder: true,
} satisfies NonNullable<AccordionBlockType['appearance']>

const defaultBehavior = {
  allowMultiple: true,
  collapseOthers: false,
  animated: true,
} satisfies NonNullable<AccordionBlockType['behavior']>

// Type for rich text content
type RichTextContent = {
  root: {
    type: string
    children: Array<{
      type: string
      [key: string]: unknown
    }>
    [key: string]: unknown
  }
}

// Type guard for rich text content
const isRichText = (content: unknown): content is RichTextContent => {
  return (
    typeof content === 'object' &&
    content !== null &&
    'root' in content &&
    typeof (content as { root?: unknown }).root === 'object'
  )
}

// Helper Components
const AccordionItem: React.FC<{
  item: NonNullable<AccordionBlockType['items']>[0]
  isOpen: boolean
  onToggle: () => void
  appearance: NonNullable<AccordionBlockType['appearance']>
  animated: boolean
}> = ({ item, isOpen, onToggle, appearance, animated }) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | undefined>(undefined)

  useEffect(() => {
    if (!contentRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHeight(entry.contentRect.height)
      }
    })

    resizeObserver.observe(contentRef.current)
    return () => resizeObserver.disconnect()
  }, [])

  const position = appearance.position || defaultAppearance.position

  return (
    <div className="px-4 border-b border-bianca-200 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          'w-full flex justify-between items-center font-medium text-[#201A09] py-4 px-0',
          'focus:outline-none focus:ring-0 cursor-pointer',
          'hover:text-[#A07D1C] transition-colors duration-200',
        )}
        aria-expanded={isOpen}
      >
        <span className={positionClasses[position]}>{item.title}</span>
        <ChevronDown
          className={cn(
            'w-5 h-5 text-[#201A09] transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      <div
        className={cn(
          'overflow-hidden transition-[height]',
          animated ? 'duration-300 ease-in-out' : 'duration-0',
          !isOpen && 'hidden',
        )}
      >
        <div
          ref={contentRef}
          className="pb-3 prose prose-p:text-sm max-w-none prose-p:text-gray-800"
        >
          <RichTextParser data={item.content} useDefaultStyles={false} />
        </div>
      </div>
    </div>
  )
}

// Main Component
export const AccordionBlock: React.FC<{ block: AccordionBlockType }> = ({ block }) => {
  const { items, behavior = defaultBehavior, appearance = defaultAppearance } = block

  const [openItems, setOpenItems] = useState<boolean[]>(() =>
    items.map((item) => !!item.defaultOpen),
  )

  const handleToggle = (index: number) => {
    setOpenItems((prev) => {
      const newState = [...prev]

      if (behavior.allowMultiple) {
        newState[index] = !newState[index]
      } else {
        const wasOpen = newState[index]
        newState.fill(false)
        newState[index] = !wasOpen
      }

      return newState
    })
  }

  const position = appearance.position || defaultAppearance.position
  const showBorder = appearance.showBorder ?? defaultAppearance.showBorder

  return (
    <div className="py-12">
      <div
        className={cn(
          'max-w-4xl px-4',
          position === 'center'
            ? 'mx-auto text-center'
            : position === 'right'
              ? 'text-right'
              : 'text-left',
        )}
      >
        <div
          role="tablist"
          aria-multiselectable={!!behavior.allowMultiple}
          className={cn('', showBorder && 'rounded-xl shadow-sm border border-bianca-400/70')}
        >
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              isOpen={openItems[index]}
              onToggle={() => handleToggle(index)}
              appearance={appearance}
              animated={!!behavior.animated}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AccordionBlock
