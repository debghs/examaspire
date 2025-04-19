import type { Block } from 'payload'

export const HeroSectionBlock: Block = {
  slug: 'heroSection',
  interfaceName: 'HeroSectionBlock',
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Choose a background image for the hero section',
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
          admin: {
            placeholder: 'Enter main heading',
          },
        },
        {
          name: 'subtitle',
          type: 'text',
          admin: {
            placeholder: 'Enter subheading',
          },
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'Enter button text',
          },
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'Enter button link',
          },
        },
      ],
    },
  ],
}
