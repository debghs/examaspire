import React from 'react'
import Image from 'next/image'
import type { FeaturesSectionBlock, Media } from '@/payload-types'

export const FeaturesSection: React.FC<{ block: FeaturesSectionBlock }> = ({ block }) => {
  const { header, features } = block

  // Handle media object with type guard
  const isMedia = (media: unknown): media is Media & { url: string; alt?: string } => {
    return (
      media !== null &&
      typeof media === 'object' &&
      'url' in media &&
      typeof (media as { url: unknown }).url === 'string'
    )
  }

  return (
    <div className="flex flex-col gap-16 px-5 md:px-12 py-12 md:py-24 @container">
      <div className="flex flex-col gap-6">
        {header.label && (
          <span className="text-bianca-700 text-base font-medium">{header.label}</span>
        )}
        <h1 className="text-gray-900 text-2xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
          {header.title}
        </h1>
        {header.description && (
          <p className="text-gray-700 text-small font-normal leading-normal max-w-[720px]">
            {header.description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {features.map((feature, index) => {
          const icon = feature.icon
          const hasValidIcon = isMedia(icon)
          return (
            <div key={index} className="flex flex-col gap-8">
              {hasValidIcon && (
                <div className="text-gray-900 w-10 h-10">
                  <Image
                    src={icon.url}
                    alt={icon.alt || feature.title}
                    width={40}
                    height={40}
                    className="w-full h-full"
                  />
                </div>
              )}
              <div className="flex flex-col gap-4">
                <h2 className="text-gray-900 text-xl font-bold leading-tight">{feature.title}</h2>
                <p className="text-gray-600 text-base font-normal leading-normal">
                  {feature.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FeaturesSection
