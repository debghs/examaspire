import type { Block } from 'payload'

export const TestimonialBlock: Block = {
  slug: 'testimonial',
  interfaceName: 'TestimonialBlock',
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
        },
        {
          name: 'author',
          type: 'group',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'company',
              type: 'text',
            },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'rating',
          type: 'select',
          options: [
            { label: '1 Star', value: '1' },
            { label: '2 Stars', value: '2' },
            { label: '3 Stars', value: '3' },
            { label: '4 Stars', value: '4' },
            { label: '5 Stars', value: '5' },
          ],
        },
      ],
    },
    {
      name: 'style',
      type: 'group',
      fields: [
        {
          name: 'columns',
          type: 'select',
          options: [
            { label: '1 Column', value: '1' },
            { label: '2 Columns', value: '2' },
            { label: '3 Columns', value: '3' },
            { label: '4 Columns', value: '4' },
          ],
          defaultValue: '3',
          admin: {
            condition: (data) => data.style?.layout === 'grid',
          },
        },
        {
          name: 'variant',
          type: 'select',
          options: [
            { label: 'Card', value: 'card' },
            { label: 'Quote', value: 'quote' },
            { label: 'Minimal', value: 'minimal' },
          ],
          defaultValue: 'card',
        },
        {
          name: 'spacing',
          type: 'select',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
          ],
          defaultValue: 'medium',
        },
      ],
    },
  ],
}
