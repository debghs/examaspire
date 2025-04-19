import type { Field, GroupField } from 'payload'

export const commonFields: Field[] = [
  {
    name: 'id',
    type: 'text',
    admin: {
      description: 'Custom HTML ID for this block',
    },
  },
  {
    name: 'visibility',
    type: 'select',
    defaultValue: 'always',
    options: [
      { label: 'Always', value: 'always' },
      { label: 'Desktop Only', value: 'desktop-only' },
      { label: 'Mobile Only', value: 'mobile-only' },
      { label: 'Hidden', value: 'hidden' },
    ],
    admin: {
      description: 'Control block visibility',
    },
  },
  {
    name: 'customClasses',
    type: 'text',
    admin: {
      description: 'Add custom Tailwind classes',
    },
  },
]

export const commonGroup: GroupField = {
  name: 'common',
  type: 'group',
  interfaceName: 'CommonFields',
  fields: commonFields,
}
