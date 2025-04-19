import type { Block } from 'payload'

export const TimelineBlock: Block = {
  slug: 'timeline',
  interfaceName: 'TimelineBlock',
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description: 'Add timeline items',
      },
      fields: [
        {
          name: 'date',
          type: 'text',
          required: true,
          admin: {
            description: 'Date or time period (e.g. "2023", "Q4 2023", "Jan 2023")',
          },
        },
        {
          name: 'content',
          type: 'group',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'richText',
              required: true,
            },
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Optional image or icon',
              },
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
          name: 'style',
          type: 'select',
          defaultValue: 'vertical',
          options: [
            { label: 'Vertical', value: 'vertical' },
            { label: 'Horizontal', value: 'horizontal' },
          ],
        },
        {
          name: 'density',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'Compact', value: 'compact' },
            { label: 'Default', value: 'default' },
            { label: 'Comfortable', value: 'comfortable' },
          ],
        },
        {
          name: 'connector',
          type: 'select',
          defaultValue: 'solid',
          options: [
            { label: 'Solid Line', value: 'solid' },
            { label: 'Dashed Line', value: 'dashed' },
            { label: 'Dotted Line', value: 'dotted' },
          ],
        },
      ],
    },
  ],
}
