'use client'

import React from 'react'
import Link from 'next/link'
import type { PricingBlock as PricingBlockType } from '@/payload-types'
import { cn } from '@/utilities/utils'
import { CheckIcon, X } from 'lucide-react'

const variantStyles = {
  cards: 'bg-bianca-50 rounded-xl p-6 border border-bianca-200',
  minimal: 'bg-white p-6',
} as const

const gridColumns = {
  '2': 'grid-cols-1 sm:grid-cols-2',
  '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
} as const

const buttonVariants = {
  primary: 'bg-[#FAC638] text-[#AB2217] hover:bg-[#fbd05c] transition-all duration-200',
  secondary:
    'bg-bianca-600 hover:bg-bianca-700 transition-colors text-bianca-50 font-semibold transition-all duration-200',
  outline:
    'border border-[#201A09]  text-[#201A09] hover:bg-[#F5EFDB] transition-colors bg-tranparent transition-all duration-200',
} as const

const defaultLayout = {
  columns: '3',
  style: 'cards',
} satisfies NonNullable<PricingBlockType['layout']>

const currencySymbols: Record<string, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
}

// Helper Components
const PricingCard: React.FC<{
  plan: NonNullable<PricingBlockType['plans']>[0]
}> = ({ plan }) => {
  const formatPrice = (amount: number, currency: string = 'INR', period?: string | null) => {
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    })
    const formattedAmount = formatter.format(amount)
    const displayAmount = formattedAmount.replace(
      currencySymbols[currency],
      currencySymbols[currency] + ' ',
    )
    return `${displayAmount}${period ? ` ${period}` : ''}`
  }

  return (
    <div
      className={cn(
        'flex flex-col',
        variantStyles[defaultLayout.style],
        plan.highlighted && 'ring-2 ring-[#FAC638]',
      )}
    >
      <div className="mb-6">
        <h3 className="text-[#201A09] text-2xl font-bold mb-2 tracking-[-0.033em]">{plan.name}</h3>
        {plan.description && <p className="text-bianca-700">{plan.description}</p>}
      </div>

      <div className="mb-6">
        <div className="text-[#201A09] text-4xl font-black mb-1 tracking-[-0.033em]">
          {formatPrice(
            plan.price.amount,
            plan.price.currency || 'INR',
            plan.price.period || undefined,
          )}
        </div>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features?.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-center gap-2">
            {feature.included ? (
              <CheckIcon className="h-5 w-5 text-[#A07D1C] flex-shrink-0" />
            ) : (
              <X className="h-5 w-5 text-bianca-600 flex-shrink-0" />
            )}
            <span
              className={cn(
                'text-sm leading-relaxed',
                feature.included ? 'text-[#201A09]' : 'text-bianca-600',
              )}
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href={plan.cta.link || '#'}
        className={cn(
          'text-center py-3 px-6 rounded-xl font-bold text-base transition-colors',
          buttonVariants[plan.cta.variant || 'primary'],
        )}
      >
        {plan.cta.text}
      </Link>
    </div>
  )
}

// Main Component
export const PricingBlock: React.FC<{ block: PricingBlockType }> = ({ block }) => {
  const { plans, layout = defaultLayout } = block
  const contentClasses = cn('grid gap-4', gridColumns[layout.columns || '3'])

  return (
    <div className="w-full py-12">
      <div className={cn(contentClasses, 'mx-auto')}>
        {plans.map((plan, index) => (
          <PricingCard key={index} plan={plan} />
        ))}
      </div>
    </div>
  )
}

export default PricingBlock
