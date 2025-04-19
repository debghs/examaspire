import { Block } from 'payload'

export const UnifiedCardBlock: Block = {
  slug: 'card',
  interfaceName: 'UnifiedCardBlock',
  fields: [
    {
      name: 'cards',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description: 'Add one or more cards to display',
      },
      fields: [
        {
          name: 'media',
          type: 'group',
          fields: [
            {
              name: 'type',
              type: 'select',
              required: true,
              defaultValue: 'image',
              options: [
                { label: 'Image', value: 'image' },
                { label: 'Video', value: 'video' },
                { label: 'Icon', value: 'icon' },
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
              name: 'video',
              type: 'group',
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'video',
              },
              fields: [
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'thumbnail',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'autoPlay',
                  type: 'checkbox',
                  defaultValue: false,
                },
                {
                  name: 'muted',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'loop',
                  type: 'checkbox',
                  defaultValue: true,
                },
              ],
            },
            {
              name: 'icon',
              type: 'group',
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'icon',
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Icon component name from your icon library',
                  },
                },
                {
                  name: 'color',
                  type: 'select',
                  defaultValue: 'default',
                  options: [
                    { label: 'Default', value: 'default' },
                    { label: 'Primary', value: 'primary' },
                    { label: 'Secondary', value: 'secondary' },
                    { label: 'Brand', value: 'brand' },
                  ],
                },
              ],
            },
          ],
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
              type: 'textarea',
            },
            {
              name: 'tags',
              type: 'array',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'color',
                  type: 'select',
                  defaultValue: 'default',
                  options: [
                    { label: 'Default', value: 'default' },
                    { label: 'Primary', value: 'primary' },
                    { label: 'Success', value: 'success' },
                    { label: 'Warning', value: 'warning' },
                    { label: 'Error', value: 'error' },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'link',
          type: 'group',
          fields: [
            {
              name: 'type',
              type: 'select',
              defaultValue: 'none',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Internal Page', value: 'internal' },
                { label: 'External URL', value: 'external' },
              ],
            },
            {
              name: 'url',
              type: 'text',
              admin: {
                condition: (data, siblingData) => siblingData?.type !== 'none',
              },
            },
            {
              name: 'text',
              type: 'text',
              admin: {
                condition: (data, siblingData) => siblingData?.type !== 'none',
              },
            },
            {
              name: 'newTab',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'external',
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
          name: 'variant',
          type: 'select',
          required: true,
          defaultValue: 'rectangular',
          options: [
            { label: 'Rectangular', value: 'rectangular' },
            { label: 'Square', value: 'square' },
            { label: 'Horizontal', value: 'horizontal' },
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
                { label: '1 Column', value: '1' },
                { label: '2 Columns', value: '2' },
                { label: '3 Columns', value: '3' },
                { label: '4 Columns', value: '4' },
                { label: '5 Columns', value: '5' },
                { label: '6 Columns', value: '6' },
              ],
            },
            {
              name: 'tablet',
              type: 'select',
              defaultValue: '2',
              options: [
                { label: '1 Column', value: '1' },
                { label: '2 Columns', value: '2' },
                { label: '3 Columns', value: '3' },
                { label: '4 Columns', value: '4' },
              ],
            },
            {
              name: 'mobile',
              type: 'select',
              defaultValue: '1',
              options: [
                { label: '1 Column', value: '1' },
                { label: '2 Columns', value: '2' },
              ],
            },
          ],
        },
        {
          name: 'gap',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'Small', value: 'small' },
            { label: 'Default', value: 'default' },
            { label: 'Large', value: 'large' },
          ],
        },
      ],
    },
  ],
}
