import React from 'react'
import Link from 'next/link'

type ButtonProps = {
  text: string
  variant: 'primary' | 'secondary' | 'outline' | 'text' | 'submit'
  link?: string
  form?: string
  size?: 'xs' | 'small' | 'default' | 'large'
  position?: 'left' | 'center' | 'right'
  icon?: {
    enabled: boolean
    position: 'left' | 'right'
  }
  disabled?: boolean
}

const styleClasses = {
  primary: `
    bg-[#FAC638] text-[#AB2217] font-bold
    hover:bg-[#f5bb20] active:bg-[#edb01c]
    disabled:bg-[#fde4a6] disabled:text-[#d67676] disabled:cursor-not-allowed
    transition-all duration-200
  `,
  secondary: `
    bg-[#201A09] text-white font-bold
    hover:bg-[#362d15] active:bg-[#4a3d1d]
    disabled:bg-[#a99d86] disabled:cursor-not-allowed
    transition-all duration-200
  `,
  outline: `
    bg-transparent text-[#201A09] font-bold
    border-2 border-[#201A09]
    hover:bg-[#F5EFDB] active:bg-[#ebe5d1]
    disabled:border-[#a99d86] disabled:text-[#a99d86] disabled:hover:bg-transparent disabled:cursor-not-allowed
    transition-all duration-200
  `,
  text: `
    bg-transparent text-[#201A09] font-bold
    hover:text-[#4a3d1d] active:text-[#362d15]
    disabled:text-[#a99d86] disabled:cursor-not-allowed
    transition-all duration-200 px-2
  `,
  submit: `
    bg-[#FAC638] text-[#AB2217] font-bold
    hover:bg-[#f5bb20] active:bg-[#edb01c]
    disabled:bg-[#fde4a6] disabled:text-[#d67676] disabled:cursor-not-allowed
    transition-all duration-200
    py-2 px-7
    justify-center
  `,
} as const

const sizeClasses = {
  xs: `
    h-7 px-3 text-sm font-medium
    min-w-[64px] max-w-[320px]
  `,
  small: `
    h-8 px-4 text-sm font-medium
    min-w-[72px] max-w-[360px]
  `,
  default: `
    h-10 px-5 text-base font-bold
    md:h-12 md:px-6
    min-w-[84px] max-w-[480px]
  `,
  large: `
    h-12 px-6 text-base font-bold
    md:h-14 md:px-8 md:text-lg
    min-w-[96px] max-w-[560px]
  `,
} as const

const positionClasses = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
} as const

const ArrowIcon = () => (
  <svg
    className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
      clipRule="evenodd"
    />
  </svg>
)

const Button: React.FC<ButtonProps> = ({
  text,
  variant,
  link,
  form,
  size = 'default',
  position = 'center',
  icon = { enabled: false, position: 'right' },
  disabled = false,
}) => {
  const buttonContent = (
    <>
      {icon.enabled && icon.position === 'left' && <ArrowIcon />}
      <span className="truncate">{text}</span>
      {icon.enabled && icon.position === 'right' && <ArrowIcon />}
    </>
  )

  const baseClasses = `
    inline-flex items-center justify-center
    rounded-xl leading-normal tracking-[0.015em]
    cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-[#F5EFDB] focus:ring-offset-2
    disabled:ring-0 disabled:ring-offset-0
    ${styleClasses[variant]}
    ${variant !== 'submit' ? sizeClasses[size] : ''}
    ${icon.enabled ? 'gap-2' : ''}
  `.trim()

  if (link) {
    return (
      <div className={positionClasses[position]}>
        <Link
          href={link}
          className={baseClasses}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : undefined}
        >
          {buttonContent}
        </Link>
      </div>
    )
  }

  return (
    <div className={positionClasses[position]}>
      <button form={form} className={baseClasses} disabled={disabled}>
        {buttonContent}
      </button>
    </div>
  )
}

export { Button }
