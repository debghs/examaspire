import React from 'react'
import { LinkCard } from '../LinkCard'

interface FeaturedItem {
  id: string
  title: string
  subtitle?: string
  imageSrc: string
  href: string
  lessons?: number
}

interface FeaturedSectionProps {
  title: string
  description?: string
  items: FeaturedItem[]
  className?: string
}

export function FeaturedSection({
  title,
  description,
  items,
  className = '',
}: FeaturedSectionProps) {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-display font-bold text-neutral-900">{title}</h2>
          {description && <p className="mt-4 text-lg text-neutral-600">{description}</p>}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {items.map((item) => (
            <LinkCard
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              imageSrc={item.imageSrc}
              href={item.href}
              lessons={item.lessons}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
