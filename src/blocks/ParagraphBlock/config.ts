import type { Block } from 'payload'

export const ParagraphBlock: Block = {
  slug: 'paragraph',
  interfaceName: 'ParagraphBlock',
  fields: [
    {
      name: 'text',
      type: 'richText',
      required: true,
    },
    {
      name: 'alignment',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
        { label: 'Justify', value: 'justify' },
      ],
      admin: {
        description: 'Choose text alignment',
      },
    },
    {
      name: 'appearance',
      type: 'group',
      fields: [
        {
          name: 'weight',
          type: 'select',
          defaultValue: 'normal',
          options: [
            { label: 'Normal', value: 'normal' },
            { label: 'Medium', value: 'medium' },
            { label: 'Bold', value: 'bold' },
          ],
          admin: {
            description: 'Select font weight based on design system',
          },
        },
        {
          name: 'color',
          type: 'select',
          defaultValue: 'text-black',
          options: [
            { label: 'Primary Text (Black)', value: 'text-black' },
            { label: 'Secondary Text (Golden)', value: 'text-bianca-600' },
            { label: 'Brown Text', value: 'text-bianca-700' },
            { label: 'Accent Text (Brown)', value: 'text-[#A07D1C]' },
            { label: 'Primary Red', value: 'text-[#AB2217]' },
            { label: 'Light Text', value: 'text-bianca-200' },
          ],
          admin: {
            description: 'Select text color based on design system',
          },
        },
      ],
    },
  ],
}
