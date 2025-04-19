import { createdByField } from '@/fields/createdBy'
import { slugField } from '@/fields/slug'
import { isVideoContentCreator, isVideoContentCreatorOrSelf } from '@/hooks/payload/accessControl'
import { CollectionConfig, CollectionSlug, FieldHook } from 'payload'
import { createRevalidateHook, createRevalidateDeleteHook } from '@/hooks/revalidate'

export const Videos: CollectionConfig = {
  slug: 'videos',
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 30,
  },
  admin: {
    useAsTitle: 'title',
  },
  access: {
    create: isVideoContentCreator,
    read: isVideoContentCreatorOrSelf,
    // delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'time',
      type: 'text',
    },
    {
      name: 'excerpt',
      type: 'richText',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'raag',
      type: 'relationship',
      relationTo: 'raags' as CollectionSlug,
    },
    {
      name: 'videoLink',
      type: 'text',
      required: true,
    },
    {
      name: 'subheading',
      type: 'relationship',
      relationTo: 'subheadings' as CollectionSlug,
      required: true,
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
      required: true,
    },
    {
      name: 'singer',
      type: 'relationship',
      relationTo: 'raagSingers' as CollectionSlug,
      required: true,
      hasMany: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    ...slugField('title'),
    createdByField,
  ],
  hooks: {
    afterChange: [
      async (args) => {
        const { doc, req } = args

        let singerSlugs: string[] = []
        if (Array.isArray(doc.singer)) {
          const singerPromises = doc.singer.map((singerId: number) =>
            req.payload.findByID({
              collection: 'raagSingers',
              id: singerId,
            }),
          )
          const singers = await Promise.all(singerPromises)
          singerSlugs = singers.map((singer) => singer?.slug).filter(Boolean)
        }

        return createRevalidateHook((doc) => [
          `/video`,
          `/video/${doc.slug}`,
          `/singer`,
          ...singerSlugs.map((slug) => `/singer/${slug}`),
        ])(args)
      },
    ],
    afterDelete: [
      async (args) => {
        const { doc, req } = args

        let singerSlugs: string[] = []
        if (Array.isArray(doc.singer)) {
          const singerPromises = doc.singer.map((singerId: number) =>
            req.payload.findByID({
              collection: 'raagSingers',
              id: singerId,
            }),
          )
          const singers = await Promise.all(singerPromises)
          singerSlugs = singers.map((singer) => singer?.slug).filter(Boolean)
        }

        return createRevalidateDeleteHook((doc) => [
          `/video`,
          `/video/${doc.slug}`,
          `/singer`,
          ...singerSlugs.map((slug) => `/singer/${slug}`),
        ])(args)
      },
    ],
  },
}
