import React from 'react'
import Link from 'next/link'
import type { ButtonBlock as ButtonBlockType } from '@/payload-types'

const styleClasses = {
  primary: 'bg-[#FAC638] text-[#AB2217] hover:bg-[#fbd05c] transition-all duration-200',
  secondary:
    'bg-bianca-600 hover:bg-bianca-700 transition-colors text-bianca-50 font-semibold transition-all duration-200',
  outline:
    'border border-[#201A09]  text-[#201A09] hover:bg-[#F5EFDB] transition-colors bg-tranparent transition-all duration-200',
  text: 'text-[#201A09]  hover:opacity-80 transition-opacity',
} as const

const sizeClasses = {
  xs: 'h-7 px-3 text-sm font-medium',
  small: 'h-8 px-4 text-sm font-medium',
  default: 'h-10 px-5 text-base font-bold md:h-12 md:px-6',
  large: 'h-12 px-6 text-base font-bold md:h-14 md:px-8 md:text-lg',
} as const

const positionClasses = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
} as const

const ArrowIcon = () => (
  <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
      clipRule="evenodd"
    />
  </svg>
)

export const ButtonBlock: React.FC<{ block: ButtonBlockType }> = ({ block }) => {
  const { label, link, appearance } = block

  return (
    <div className={`flex ${positionClasses[appearance?.position || 'center']}`}>
      <Link
        href={link}
        className={`
          flex min-w-[84px] max-w-[480px] cursor-pointer items-center
          overflow-hidden rounded-xl leading-normal tracking-[0.015em]
          focus:outline-none focus:ring-2 focus:ring-bianca-200 focus:ring-offset-2
          ${styleClasses[appearance?.style || 'primary']}
          ${sizeClasses[appearance?.size || 'default']}
          ${appearance?.icon?.enabled ? 'gap-2' : ''}
        `}
      >
        {appearance?.icon?.enabled && appearance.icon.position === 'left' && <ArrowIcon />}
        <span className="truncate">{label}</span>
        {appearance?.icon?.enabled && appearance.icon.position === 'right' && <ArrowIcon />}
      </Link>
    </div>
  )
}

export default ButtonBlock
