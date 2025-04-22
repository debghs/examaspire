import { createdByField } from '@/fields/createdBy'
import { slugField } from '@/fields/slug'
import { isAdmin } from '@/hooks/payload/accessControl'
import { CollectionConfig } from 'payload'
import { createRevalidateHook, createRevalidateDeleteHook } from '@/hooks/revalidate'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'description', 'createdAt'],
  },
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    ...slugField('name'),
    {
      name: 'description',
      type: 'textarea',
    },
    createdByField,
  ],
  timestamps: true,
  hooks: {
    afterChange: [createRevalidateHook((doc) => [`/tags`, `/tags/${doc.id}`])],
    afterDelete: [createRevalidateDeleteHook((doc) => [`/tags`, `/tags/${doc.id}`])],
  },
}
