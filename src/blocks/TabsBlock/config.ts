import type { Block } from 'payload'
import { HeadingBlock } from '../HeadingBlock/config'
import { ParagraphBlock } from '../ParagraphBlock/config'
import { ImageBlock } from '../ImageBlock/config'
import { ButtonBlock } from '../ButtonBlock/config'
import { VideoBlock } from '../VideoBlock/config'
import { AccordionBlock } from '../AccordionBlock/config'
import { CarouselBlock } from '../CarouselBlock/config'
import { FormBlock } from '../Form/config'
import { TestimonialBlock } from '../TestimonialBlock/config'
import { UnifiedCardBlock } from '../UnifiedCardBlock/config'
import { GapBlock } from '../GapBlock/config'

export const TabsBlock: Block = {
  slug: 'tabs',
  interfaceName: 'TabsBlock',
  fields: [
    {
      name: 'tabs',
      type: 'array',
      required: true,
      minRows: 2,
      admin: {
        description: 'Add at least two tabs',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'Tab label shown in the navigation',
          },
        },
        {
          name: 'icon',
          type: 'group',
          fields: [
            {
              name: 'type',
              type: 'select',
              defaultValue: 'none',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Icon', value: 'icon' },
                { label: 'Image', value: 'image' },
              ],
            },
            {
              name: 'iconName',
              type: 'text',
              admin: {
                description: 'Icon component name from your icon library',
                condition: (data, siblingData) => siblingData?.type === 'icon',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'image',
              },
            },
          ],
        },
        {
          name: 'content',
          type: 'group',
          fields: [
            {
              name: 'type',
              type: 'select',
              defaultValue: 'richText',
              options: [
                { label: 'Rich Text', value: 'richText' },
                { label: 'Blocks', value: 'blocks' },
              ],
            },
            {
              name: 'richText',
              type: 'richText',
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'richText',
              },
            },
            {
              name: 'blocks',
              type: 'blocks',
              blocks: [
                HeadingBlock,
                ParagraphBlock,
                ImageBlock,
                ButtonBlock,
                GapBlock,
                VideoBlock,
                UnifiedCardBlock,
                FormBlock,
                AccordionBlock,
                CarouselBlock,
                TestimonialBlock,
              ],
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'blocks',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'style',
      type: 'group',
      fields: [
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Pills', value: 'pills' },
            { label: 'Underline', value: 'underline' },
          ],
        },
        {
          name: 'size',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'Small', value: 'small' },
            { label: 'Default', value: 'default' },
            { label: 'Large', value: 'large' },
          ],
        },
        {
          name: 'tabAlignment',
          type: 'select',
          defaultValue: 'left',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
            { label: 'Full Width', value: 'full' },
          ],
        },
      ],
    },
  ],
}
