import { createdByField } from '@/fields/createdBy'
import { slugField } from '@/fields/slug'
import { isAdmin } from '@/hooks/payload/accessControl'
import { CollectionConfig } from 'payload'
import { createRevalidateHook, createRevalidateDeleteHook } from '@/hooks/revalidate'

export const Exams: CollectionConfig = {
  slug: 'exams',
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 20,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'duration', 'totalMarks', 'status'],
  },
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'questions',
      type: 'relationship',
      relationTo: 'questions',
      hasMany: true,
      required: true,
    },
    {
      name: 'duration',
      type: 'number',
      required: true,
      min: 1,
      admin: {
        description: 'Duration in minutes',
      },
    },
    {
      name: 'totalMarks',
      type: 'number',
      required: true,
      min: 1,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
        { label: 'Virtual', value: 'virtual' },
      ],
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    ...slugField('title'),
    createdByField,
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
  ],
  hooks: {
    afterChange: [createRevalidateHook((doc) => [`/exams`, `/exams/${doc.id}`])],
    afterDelete: [createRevalidateDeleteHook((doc) => [`/exams`, `/exams/${doc.id}`])],
  },
}
