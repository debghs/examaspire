import type { Block } from 'payload'

export const AccordionBlock: Block = {
  slug: 'accordion',
  interfaceName: 'AccordionBlock',
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description: 'Add accordion items',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Title of the accordion item',
          },
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
          admin: {
            description: 'Content of the accordion item',
          },
        },
        {
          name: 'defaultOpen',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Whether this item should be open by default',
          },
        },
      ],
    },
    {
      name: 'behavior',
      type: 'group',
      fields: [
        {
          name: 'allowMultiple',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Allow multiple items to be open simultaneously',
          },
        },
        {
          name: 'collapseOthers',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Collapse other items when opening a new one',
            condition: (data, siblingData) => !siblingData?.allowMultiple,
          },
        },
        {
          name: 'animated',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Enable smooth animations',
          },
        },
      ],
    },
    {
      name: 'appearance',
      type: 'group',
      fields: [
        {
          name: 'position',
          type: 'select',
          defaultValue: 'left',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
          admin: {
            description: 'Alignment of the accordion content',
          },
        },
        {
          name: 'showBorder',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show border around the accordion',
          },
        },
      ],
    },
  ],
}
