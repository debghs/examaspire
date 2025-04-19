import { isAdmin } from '@/hooks/payload/accessControl'
import { createGlobalRevalidateHook } from '@/hooks/revalidate'
import { GlobalConfig } from 'payload'

export const Nav: GlobalConfig = {
  slug: 'nav',
  label: 'Nav',
  admin: {
    group: 'Navigation',
    description: 'Navigation items for the site',
  },
  access: {
    read: isAdmin,
    update: isAdmin,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'navItems',
      type: 'array',
      labels: {
        singular: 'Nav Item',
        plural: 'Nav Items',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          required: true,
        },
        {
          name: 'newTab',
          label: 'Open in new tab?',
          type: 'checkbox',
        },
        {
          name: 'subNavItems',
          type: 'array',
          labels: {
            singular: 'Sub Nav Item',
            plural: 'Sub Nav Items',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'link',
              type: 'text',
              required: true,
            },
            {
              name: 'newTab',
              label: 'Open in new tab?',
              type: 'checkbox',
            },
          ],
          minRows: 0,
        },
      ],
      minRows: 1,
    },
  ],
  hooks: {
    afterChange: [createGlobalRevalidateHook],
  },
}
