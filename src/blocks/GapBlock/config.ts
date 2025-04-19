import type { Block } from 'payload'

export const GapBlock: Block = {
  slug: 'gap',
  interfaceName: 'GapBlock',
  fields: [
    {
      name: 'gapType',
      type: 'select',
      defaultValue: 'horizontal',
      required: true,
      options: [
        { label: 'Horizontal Gap', value: 'horizontal' },
        { label: 'Vertical Gap', value: 'vertical' },
      ],
    },
    {
      name: 'size',
      type: 'select',
      defaultValue: 'sm',
      required: true,
      options: [
        { label: 'Extra Small (xs)', value: 'xs' },
        { label: 'Small (sm)', value: 'sm' },
        { label: 'Medium (md)', value: 'md' },
        { label: 'Large (lg)', value: 'lg' },
        { label: 'Extra Large (xl)', value: 'xl' },
      ],
      admin: {
        description: 'Select the size of gap',
      },
    },
  ],
}
