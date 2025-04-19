import type { Block } from 'payload'

export const FeaturesSectionBlock: Block = {
  slug: 'featuresSection',
  interfaceName: 'FeaturesSectionBlock',
  fields: [
    {
      name: 'header',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          admin: {
            placeholder: 'Enter section label (e.g. "Explore", "Features", "What We Offer")',
            description: 'A short text that appears above the main title',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'Enter section title',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            placeholder: 'Enter section description',
          },
        },
      ],
    },
    {
      name: 'features',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 6,
      admin: {
        description: 'Add up to 6 features to showcase',
      },
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Upload an icon (SVG recommended)',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'Enter feature title',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          admin: {
            placeholder: 'Enter feature description',
          },
        },
      ],
    },
  ],
}
