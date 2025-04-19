import type { Block } from 'payload'

export const ImageBlock: Block = {
  slug: 'image',
  interfaceName: 'ImageBlock',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Upload or select an image',
      },
    },
    {
      name: 'content',
      type: 'group',
      fields: [
        {
          name: 'caption',
          type: 'text',
          admin: {
            placeholder: 'Enter image caption (optional)',
          },
        },
        {
          name: 'altText',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'Enter alternative text for accessibility',
            description: 'Describe the image for screen readers and SEO',
          },
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
            { label: 'Default (Container)', value: 'default' },
            { label: 'Wide', value: 'wide' },
            { label: 'Full Width', value: 'full' },
            { label: 'Small', value: 'small' },
          ],
        },
        {
          name: 'aspectRatio',
          type: 'select',
          defaultValue: 'auto',
          options: [
            { label: 'Original', value: 'auto' },
            { label: '16:9', value: '16/9' },
            { label: '4:3', value: '4/3' },
            { label: '1:1', value: '1/1' },
            { label: '3:4', value: '3/4' },
          ],
        },
        {
          name: 'roundedCorners',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Default', value: 'default' },
            { label: 'Large', value: 'large' },
            { label: 'Full', value: 'full' },
          ],
        },
        {
          name: 'border',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Add a border around the image',
          },
        },
        {
          name: 'shadow',
          type: 'select',
          defaultValue: 'none',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
          ],
        },
      ],
    },
    {
      name: 'link',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Make the image clickable',
          },
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            placeholder: 'Enter URL',
            condition: (data, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Open link in new tab',
            condition: (data, siblingData) => siblingData?.enabled,
          },
        },
      ],
    },
  ],
}
