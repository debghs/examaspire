import type { Block } from 'payload'

export const CarouselBlock: Block = {
  slug: 'carousel',
  interfaceName: 'CarouselBlock',
  fields: [
    {
      name: 'header',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: {
            description: 'Main title for the carousel section',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Optional description text',
          },
        },
        {
          name: 'alignment',
          type: 'select',
          defaultValue: 'left',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
      ],
    },
    {
      name: 'slides',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description: 'Add carousel slides',
      },
      fields: [
        {
          name: 'type',
          type: 'select',
          defaultValue: 'image',
          options: [
            { label: 'Image', value: 'image' },
            { label: 'Testimonial', value: 'testimonial' },
            { label: 'Content', value: 'content' },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'image',
          },
        },
        {
          name: 'testimonial',
          type: 'group',
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'testimonial',
          },
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
                  name: 'avatar',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
        {
          name: 'content',
          type: 'group',
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'content',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'richText',
            },
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'link',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                },
                {
                  name: 'url',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'settings',
      type: 'group',
      fields: [
        {
          name: 'autoplay',
          type: 'group',
          fields: [
            {
              name: 'enabled',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'interval',
              type: 'number',
              defaultValue: 5000,
              admin: {
                description: 'Time in milliseconds between slides',
                condition: (data, siblingData) => siblingData?.enabled,
              },
            },
            {
              name: 'pauseOnHover',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                condition: (data, siblingData) => siblingData?.enabled,
              },
            },
          ],
        },
        {
          name: 'navigation',
          type: 'group',
          fields: [
            {
              name: 'arrows',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'dots',
              type: 'checkbox',
              defaultValue: true,
            },
          ],
        },
      ],
    },
    {
      name: 'appearance',
      type: 'group',
      fields: [
        {
          name: 'width',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Wide', value: 'wide' },
            { label: 'Full Width', value: 'full' },
            { label: 'Narrow', value: 'narrow' },
          ],
        },
        {
          name: 'aspectRatio',
          type: 'select',
          defaultValue: '16/9',
          options: [
            { label: '16:9', value: '16/9' },
            { label: '4:3', value: '4/3' },
            { label: '1:1', value: '1/1' },
            { label: 'Auto', value: 'auto' },
          ],
        },
        {
          name: 'alignment',
          type: 'select',
          defaultValue: 'center',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
      ],
    },
  ],
}
