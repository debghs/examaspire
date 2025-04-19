import type { Block } from 'payload'
import { HeadingBlock } from '../HeadingBlock/config'
import { ParagraphBlock } from '../ParagraphBlock/config'
import { ButtonBlock } from '../ButtonBlock/config'
import { FormBlock } from '../Form/config'
import { HeroSectionBlock } from '../HeroSection/config'
import { FeaturesSectionBlock } from '../FeaturesSection/config'
import { AccordionBlock } from '../AccordionBlock/config'
import { TabsBlock } from '../TabsBlock/config'
import { TestimonialBlock } from '../TestimonialBlock/config'
import { PricingBlock } from '../PricingBlock/config'
import { VideoBlock } from '../VideoBlock/config'
import { ImageBlock } from '../ImageBlock/config'
import { GridBlock } from '../GridBlock/config'
import { TimelineBlock } from '../TimelineBlock/config'
import { CTABlock } from '../CTABlock/config'
import { CarouselBlock } from '../CarouselBlock/config'
import { UnifiedCardBlock } from '../UnifiedCardBlock/config'
import { GapBlock } from '../GapBlock/config'

const pageLayoutBlocks = [
  HeadingBlock,
  ParagraphBlock,
  ButtonBlock,
  FormBlock,
  HeroSectionBlock,
  FeaturesSectionBlock,
  AccordionBlock,
  TabsBlock,
  TestimonialBlock,
  PricingBlock,
  VideoBlock,
  ImageBlock,
  GridBlock,
  GapBlock,
  TimelineBlock,
  CTABlock,
  CarouselBlock,
  UnifiedCardBlock,
  FormBlock,
]

export const PageLayoutBlock: Block = {
  slug: 'pageLayout',
  interfaceName: 'PageLayoutBlock',
  fields: [
    {
      name: 'container',
      type: 'group',
      fields: [
        {
          name: 'width',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'Default (Container)', value: 'default' },
            { label: 'Wide', value: 'wide' },
            { label: 'Full Width', value: 'full' },
            { label: 'Narrow', value: 'narrow' },
          ],
          admin: {
            description: 'Select the container width',
          },
        },
        {
          name: 'padding',
          type: 'group',
          fields: [
            {
              name: 'x',
              type: 'select',
              defaultValue: 'default',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Small', value: 'small' },
                { label: 'Default', value: 'default' },
                { label: 'Large', value: 'large' },
              ],
              admin: {
                description: 'Horizontal padding',
              },
            },
            {
              name: 'y',
              type: 'select',
              defaultValue: 'default',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Small', value: 'small' },
                { label: 'Default', value: 'default' },
                { label: 'Large', value: 'large' },
              ],
              admin: {
                description: 'Vertical padding',
              },
            },
          ],
        },
        {
          name: 'spacing',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Small', value: 'small' },
            { label: 'Default', value: 'default' },
            { label: 'Large', value: 'large' },
          ],
          admin: {
            description: 'Space between child blocks',
          },
        },
      ],
    },
    {
      name: 'bg',
      type: 'group',
      fields: [
        {
          name: 'color',
          type: 'select',
          defaultValue: 'none',
          options: [
            { label: 'None', value: 'none' },
            { label: 'White', value: 'white' },
            { label: 'Light Gray', value: 'gray-50' },
            { label: 'Gray', value: 'gray-100' },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Optional background image',
          },
        },
        {
          name: 'overlay',
          type: 'group',
          admin: {
            condition: (data, siblingData) => siblingData?.image,
          },
          fields: [
            {
              name: 'type',
              type: 'select',
              defaultValue: 'black',
              options: [
                { label: 'Black', value: 'black' },
                { label: 'White', value: 'white' },
              ],
            },
            {
              name: 'opacity',
              type: 'select',
              defaultValue: '50',
              options: [
                { label: 'None', value: '0' },
                { label: 'Light', value: '25' },
                { label: 'Medium', value: '50' },
                { label: 'Heavy', value: '75' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'border',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'position',
          type: 'select',
          defaultValue: 'all',
          options: [
            { label: 'All Sides', value: 'all' },
            { label: 'Top', value: 'top' },
            { label: 'Bottom', value: 'bottom' },
          ],
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
          },
        },
      ],
    },
    {
      name: 'blocks',
      type: 'blocks',
      required: true,
      blocks: pageLayoutBlocks,
    },
  ],
}
