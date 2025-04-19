import type { Block, Field } from 'payload'
import { HeadingBlock } from '../HeadingBlock/config'
import { ParagraphBlock } from '../ParagraphBlock/config'
import { ImageBlock } from '../ImageBlock/config'
import { ButtonBlock } from '../ButtonBlock/config'
import { VideoBlock } from '../VideoBlock/config'
import { UnifiedCardBlock } from '../UnifiedCardBlock/config'
import { FormBlock } from '../Form/config'
import { AccordionBlock } from '../AccordionBlock/config'
import { CarouselBlock } from '../CarouselBlock/config'
import { TestimonialBlock } from '../TestimonialBlock/config'
import { GapBlock } from '../GapBlock/config'

// Define shared interfaces for reusability
const sharedPaddingFields: Field[] = [
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
  },
]

export const GridBlock: Block = {
  slug: 'grid',
  interfaceName: 'GridBlock',
  labels: {
    singular: 'Grid Block',
    plural: 'Grid Blocks',
  },
  graphQL: {
    singularName: 'GridBlock',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 12,
      admin: {
        description: 'Add content blocks to the grid',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Internal title for this grid item (for admin reference)',
          },
        },
        {
          name: 'blocks',
          type: 'blocks',
          required: true,
          blocks: [],
          blockReferences: [
            HeadingBlock,
            ParagraphBlock,
            ImageBlock,
            ButtonBlock,
            VideoBlock,
            GapBlock,
            UnifiedCardBlock,
            FormBlock,
            AccordionBlock,
            CarouselBlock,
            TestimonialBlock,
          ],
          admin: {
            description: 'Add content blocks to this grid item',
          },
        },
        {
          name: 'appearance',
          type: 'group',
          fields: [
            {
              name: 'padding',
              type: 'group',
              fields: sharedPaddingFields,
            },
            {
              name: 'spacing',
              type: 'select',
              defaultValue: 'default',
              admin: {
                description: 'Space between components within this grid item',
              },
              options: [
                { label: 'None', value: 'none' },
                { label: 'Small', value: 'small' },
                { label: 'Default', value: 'default' },
                { label: 'Large', value: 'large' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'layout',
      type: 'group',
      fields: [
        {
          name: 'containerPosition',
          type: 'select',
          defaultValue: 'center',
          admin: {
            description: 'Position of the grid container',
          },
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
        {
          name: 'columns',
          type: 'group',
          fields: [
            {
              name: 'desktop',
              type: 'select',
              defaultValue: '3',
              options: [
                { label: 'One', value: '1' },
                { label: 'Two', value: '2' },
                { label: 'Three', value: '3' },
                { label: 'Four', value: '4' },
                { label: 'Six', value: '6' },
              ],
              admin: {
                description: 'Number of columns on desktop (≥1024px)',
              },
            },
            {
              name: 'tablet',
              type: 'select',
              defaultValue: '2',
              options: [
                { label: 'One', value: '1' },
                { label: 'Two', value: '2' },
                { label: 'Three', value: '3' },
              ],
              admin: {
                description: 'Number of columns on tablet (≥768px)',
              },
            },
            {
              name: 'mobile',
              type: 'select',
              defaultValue: '1',
              options: [
                { label: 'One', value: '1' },
                { label: 'Two', value: '2' },
              ],
              admin: {
                description: 'Number of columns on mobile (<768px)',
              },
            },
          ],
        },
        {
          name: 'gap',
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
                description: 'Horizontal spacing between grid items',
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
                description: 'Vertical spacing between grid items',
              },
            },
          ],
        },
        {
          name: 'alignment',
          type: 'select',
          defaultValue: 'start',
          options: [
            { label: 'Top', value: 'start' },
            { label: 'Center', value: 'center' },
            { label: 'Bottom', value: 'end' },
            { label: 'Stretch', value: 'stretch' },
          ],
          admin: {
            description: 'Vertical alignment of grid items',
          },
        },
      ],
    },
  ],
}
