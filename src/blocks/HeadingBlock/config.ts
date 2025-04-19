import type { Block } from 'payload'

export const HeadingBlock: Block = {
  slug: 'heading',
  interfaceName: 'HeadingBlock',
  fields: [
    {
      name: 'text',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'Enter heading text',
      },
    },
    {
      name: 'level',
      type: 'select',
      defaultValue: 'h2',
      required: true,
      options: [
        { label: 'H1', value: 'h1' },
        { label: 'H2', value: 'h2' },
        { label: 'H3', value: 'h3' },
        { label: 'H4', value: 'h4' },
        { label: 'H5', value: 'h5' },
        { label: 'H6', value: 'h6' },
      ],
      admin: {
        description: 'Select heading level',
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
      admin: {
        description: 'Choose text alignment',
      },
    },
    {
      name: 'color',
      type: 'select',
      defaultValue: 'text-black',
      options: [
        { label: 'Black (Default)', value: 'text-black' },
        { label: 'Dark Gray', value: 'text-gray-800' },
        { label: 'Primary Brown', value: 'text-[#201A09]' },
        { label: 'Primary Red', value: 'text-[#AB2217]' },
        { label: 'Accent Brown', value: 'text-[#A07D1C]' },
        { label: 'Light (Bianca 50)', value: 'text-[#F5EFDB]' },
      ],
      admin: {
        description: 'Select text color from design system',
      },
    },
  ],
}
