import type { Block } from 'payload'

export const ButtonBlock: Block = {
  slug: 'button',
  interfaceName: 'ButtonBlock',
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
    {
      name: 'appearance',
      type: 'group',
      fields: [
        {
          name: 'style',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary (Yellow)', value: 'primary' },
            { label: 'Secondary (Brown)', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
            { label: 'Text', value: 'text' },
          ],
        },
        {
          name: 'size',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'Extra Small', value: 'xs' },
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'default' },
            { label: 'Large', value: 'large' },
          ],
        },
        {
          name: 'position',
          type: 'select',
          defaultValue: 'left',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
        {
          name: 'icon',
          type: 'group',
          fields: [
            {
              name: 'enabled',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Add an arrow icon to the button',
              },
            },
            {
              name: 'position',
              type: 'select',
              defaultValue: 'right',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' },
              ],
              admin: {
                condition: (data, siblingData) => siblingData?.enabled,
              },
            },
          ],
        },
      ],
    },
  ],
}
