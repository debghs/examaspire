import React from 'react'
import dynamic from 'next/dynamic'
import { Form } from '@payloadcms/plugin-form-builder/types'
import {
  PageLayoutBlock as PageLayoutBlockType,
  HeadingBlock as HeadingBlockType,
  ParagraphBlock as ParagraphBlockType,
  ButtonBlock as ButtonBlockType,
  FormBlock as FormBlockType,
  VideoBlock as VideoBlockType,
  PricingBlock as PricingBlockType,
  TestimonialBlock as TestimonialBlockType,
  TabsBlock as TabsBlockType,
  AccordionBlock as AccordionBlockType,
  HeroSectionBlock as HeroSectionBlockType,
  FeaturesSectionBlock as FeaturesSectionBlockType,
  ImageBlock as ImageBlockType,
  GridBlock as GridBlockType,
  TimelineBlock as TimelineBlockType,
  CTABlock as CTABlockType,
  CarouselBlock as CarouselBlockType,
  UnifiedCardBlock as UnifiedCardBlockType,
  GapBlock as GapBlockType,
} from '@/payload-types'

const isValidForm = (form: unknown): form is Form => {
  return typeof form === 'object' && form !== null && 'id' in form
}

type BlockType =
  | PageLayoutBlockType
  | HeadingBlockType
  | ParagraphBlockType
  | ButtonBlockType
  | FormBlockType
  | VideoBlockType
  | PricingBlockType
  | TestimonialBlockType
  | TabsBlockType
  | AccordionBlockType
  | HeroSectionBlockType
  | FeaturesSectionBlockType
  | ImageBlockType
  | GridBlockType
  | TimelineBlockType
  | CTABlockType
  | CarouselBlockType
  | UnifiedCardBlockType
  | GapBlockType
const blockComponents = {
  pageLayout: dynamic(() => import('@/blocks/PageLayout/Component').then((mod) => mod.PageLayout)),
  heading: dynamic(() => import('@/blocks/HeadingBlock/Component').then((mod) => mod.HeadingBlock)),
  paragraph: dynamic(() =>
    import('@/blocks/ParagraphBlock/Component').then((mod) => mod.ParagraphBlock),
  ),
  button: dynamic(() => import('@/blocks/ButtonBlock/Component').then((mod) => mod.ButtonBlock)),
  video: dynamic(() => import('@/blocks/VideoBlock/Component').then((mod) => mod.VideoBlock)),
  pricing: dynamic(() => import('@/blocks/PricingBlock/Component').then((mod) => mod.PricingBlock)),
  testimonial: dynamic(() =>
    import('@/blocks/TestimonialBlock/Component').then((mod) => mod.TestimonialBlock),
  ),
  tabs: dynamic(() => import('@/blocks/TabsBlock/Component').then((mod) => mod.TabsBlock)),
  accordion: dynamic(() =>
    import('@/blocks/AccordionBlock/Component').then((mod) => mod.AccordionBlock),
  ),
  heroSection: dynamic(() =>
    import('@/blocks/HeroSection/Component').then((mod) => mod.HeroSection),
  ),
  featuresSection: dynamic(() =>
    import('@/blocks/FeaturesSection/Component').then((mod) => mod.FeaturesSection),
  ),
  image: dynamic(() => import('@/blocks/ImageBlock/Component').then((mod) => mod.ImageBlock)),
  grid: dynamic(() => import('@/blocks/GridBlock/Component').then((mod) => mod.GridBlock)),
  timeline: dynamic(() =>
    import('@/blocks/TimelineBlock/Component').then((mod) => mod.TimelineBlock),
  ),
  cta: dynamic(() => import('@/blocks/CTABlock/Component').then((mod) => mod.CTABlock)),
  carousel: dynamic(() =>
    import('@/blocks/CarouselBlock/Component').then((mod) => mod.CarouselBlock),
  ),
  card: dynamic(() =>
    import('@/blocks/UnifiedCardBlock/Component').then((mod) => mod.UnifiedCardBlock),
  ),
  gap: dynamic(() => import('@/blocks/GapBlock/Component').then((mod) => mod.GapBlock)),
} as const

export const BlockRenderer: React.FC<{
  blocks?: BlockType[]
  className?: string
}> = ({ blocks = [], className = '' }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) return null

  return (
    <div className={className}>
      {blocks.map((block, index) => {
        const { blockType } = block

        if (blockType === 'formBlock') {
          const formData = isValidForm(block.form) ? block.form : null
          if (!formData) return null
          const FormBlock = dynamic(() =>
            import('@/blocks/Form/Component').then((mod) => mod.FormBlock),
          )
          return <FormBlock key={index} form={formData} enableIntro={false} />
        }

        const Component = blockComponents[blockType as keyof typeof blockComponents]
        // @ts-expect-error Block types are handled by type unions
        return Component ? <Component key={index} block={block} /> : null
      })}
    </div>
  )
}

export default BlockRenderer
