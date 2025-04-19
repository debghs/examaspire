'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import RichText from '@/components/RichTextParser'
import BlockRenderer from '@/components/BlockRenderer'
import type { TabsBlock as TabsBlockType, Media } from '@/payload-types'
import { cn } from '@/utilities/utils'
import RichTextParser from '@/components/RichTextParser'

// Style Constants
const widthClasses = {
  default: 'max-w-4xl',
  wide: 'max-w-6xl',
  full: 'max-w-none',
  narrow: 'max-w-2xl',
} as const

const spacingClasses = {
  small: 'py-6',
  default: 'py-12',
  large: 'py-16',
} as const

const backgroundClasses = {
  none: '',
  white: 'bg-white',
  'gray-50': 'bg-gray-50',
  'gray-100': 'bg-gray-100',
} as const

const tabSizeClasses = {
  small: 'text-sm py-2 px-3',
  default: 'text-base py-2.5 px-4',
  large: 'text-lg py-3 px-5',
} as const

type TabAlignment = 'left' | 'center' | 'right' | 'full'

const tabAlignmentClasses: Record<TabAlignment, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
  full: 'justify-between',
} as const

const tabVariantClasses = {
  default: {
    list: 'border-b border-bianca-200',
    tab: (isActive: boolean) =>
      cn(
        isActive
          ? 'border-[#FAC638] text-[#201A09]'
          : 'border-transparent text-bianca-600 hover:text-bianca-800 hover:border-bianca-300',
        'border-b-2 font-medium transition-colors duration-200',
      ),
  },
  pills: {
    list: 'gap-x-2',
    tab: (isActive: boolean) =>
      cn(
        isActive
          ? 'bg-[#FAC638] text-[#AB2217] shadow-sm'
          : 'text-bianca-600 hover:text-bianca-800 hover:bg-bianca-50',
        'rounded-xl font-medium transition-all duration-200',
      ),
  },
  underline: {
    list: 'gap-x-8',
    tab: (isActive: boolean) =>
      cn(
        isActive
          ? 'text-[#201A09] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-[#FAC638]'
          : 'text-bianca-600 hover:text-bianca-800',
        'relative font-medium transition-colors duration-200',
      ),
  },
} as const

const colorSchemeClasses = {
  default: {
    active: 'text-primary-600 border-primary-600',
    inactive: 'text-gray-500 hover:text-gray-700',
  },
  gray: {
    active: 'text-gray-900 border-gray-900',
    inactive: 'text-gray-500 hover:text-gray-700',
  },
  brand: {
    active: 'text-brand-600 border-brand-600',
    inactive: 'text-gray-500 hover:text-brand-600',
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

const isFullWidth = (alignment: string): alignment is 'full' => {
  return alignment === 'full'
}

// Sub-components
const Icon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
  // This is a placeholder for your icon component
  // Replace with your actual icon implementation
  return <span className={className}>{name}</span>
}

const TabIcon: React.FC<{
  icon?: NonNullable<TabsBlockType['tabs']>[0]['icon']
  isActive: boolean
}> = ({ icon, isActive }) => {
  if (!icon || icon.type === 'none') return null

  if (icon.type === 'icon' && icon.iconName) {
    return <Icon name={icon.iconName} className={isActive ? 'text-[#201A09]' : 'text-bianca-600'} />
  }

  if (icon.type === 'image' && icon.image && isMedia(icon.image)) {
    return (
      <Image
        src={icon.image.url}
        alt={icon.image.alt || ''}
        width={24}
        height={24}
        className="object-contain"
      />
    )
  }

  return null
}

interface TabContentProps {
  content: NonNullable<TabsBlockType['tabs']>[0]['content']
}

const TabContent: React.FC<TabContentProps> = ({ content }) => {
  if (!content || !content.type) return null

  if (content.type === 'richText' && content.richText) {
    return (
      <div className="prose prose-lg max-w-none prose-headings:text-[#201A09] prose-p:text-bianca-800">
        <RichTextParser data={content.richText} useDefaultStyles={false} />
      </div>
    )
  }

  if (content.type === 'blocks' && Array.isArray(content.blocks)) {
    return (
      <div className="space-y-8">
        <BlockRenderer blocks={content.blocks} />
      </div>
    )
  }

  return null
}

// Default values
const defaultStyle = {
  variant: 'default' as const,
  size: 'default' as const,
  tabAlignment: 'left' as TabAlignment,
}

const defaultAppearance = {
  width: 'default' as const,
  spacing: 'default' as const,
  background: 'none' as const,
}

type StyleKeys = keyof typeof defaultStyle
type AppearanceKeys = keyof typeof defaultAppearance

// Main Component
export const TabsBlock: React.FC<{ block: TabsBlockType }> = ({ block }) => {
  const [activeTab, setActiveTab] = useState(0)
  const { tabs, style = defaultStyle } = block

  // Ensure style values are valid
  const safeStyle = {
    variant: (style.variant || defaultStyle.variant) as typeof defaultStyle.variant,
    size: (style.size || defaultStyle.size) as typeof defaultStyle.size,
    tabAlignment: (style.tabAlignment || defaultStyle.tabAlignment) as TabAlignment,
  }

  const tabListClasses = cn(
    'flex flex-wrap',
    tabAlignmentClasses[safeStyle.tabAlignment],
    tabVariantClasses[safeStyle.variant].list,
    'mb-8 md:mb-12',
  )

  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16 lg:py-20">
          {/* Tabs Navigation */}
          <div className={tabListClasses} role="tablist">
            {tabs.map((tab, index) => {
              const shouldUseFullWidth = isFullWidth(safeStyle.tabAlignment)
              return (
                <button
                  key={index}
                  role="tab"
                  aria-selected={activeTab === index}
                  aria-controls={`tab-panel-${index}`}
                  id={`tab-${index}`}
                  className={cn(
                    'flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#FAC638] focus:ring-offset-2',
                    tabSizeClasses[safeStyle.size],
                    tabVariantClasses[safeStyle.variant].tab(activeTab === index),
                    shouldUseFullWidth && 'flex-1 justify-center',
                  )}
                  onClick={() => setActiveTab(index)}
                >
                  <TabIcon icon={tab.icon} isActive={activeTab === index} />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Tab Panels */}
          <div className="mt-8 md:mt-12">
            {tabs.map((tab, index) => (
              <div
                key={index}
                role="tabpanel"
                aria-labelledby={`tab-${index}`}
                id={`tab-panel-${index}`}
                className={cn(
                  'focus:outline-none',
                  activeTab === index ? 'block animate-fade-in' : 'hidden',
                )}
              >
                <TabContent content={tab.content} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TabsBlock
