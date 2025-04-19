import { Access, CollectionConfig, Field } from 'payload'
import { createRevalidateHook, createRevalidateDeleteHook } from '@/hooks/revalidate'
import { hasRole, isAdmin, isAdminFieldLevel } from '@/hooks/payload/accessControl'
import { createdByField } from '@/fields/createdBy'
import { slugField } from '@/fields/slug'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { allBlocksList } from '@/config/blocks'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
        })
        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  access: {
    create: isAdmin,
    read: isAdmin,
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
      type: 'tabs',
      tabs: [
        {
          label: 'Layout',
          fields: [
            {
              name: 'blocks',
              type: 'blocks',
              required: true,
              blocks: [],
              blockReferences: allBlocksList,
              admin: {
                initCollapsed: true,
              },
            },
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField('title'),
    createdByField,
  ],
  hooks: {
    afterChange: [
      createRevalidateHook((doc) => {
        if (doc._status !== 'draft' && doc.slug) {
          return [`/${doc.slug}`]
        }
        return []
      }),
    ],
    afterDelete: [createRevalidateDeleteHook((doc) => (doc.slug ? [`/${doc.slug}`] : []))],
  },
}
