import { createdByField } from '@/fields/createdBy'
import { slugField } from '@/fields/slug'
import {
  isAdmin,
  isVideoContentCreator,
  isVideoContentCreatorOrSelf,
} from '@/hooks/payload/accessControl'
import { CollectionConfig, CollectionBeforeDeleteHook, FieldHook, CollectionSlug } from 'payload'
import { preventDeletionFactory } from '@/hooks/payload/preventDeletion'
import { createRevalidateHook, createRevalidateDeleteHook } from '@/hooks/revalidate'

const preventSingersDeletion = preventDeletionFactory(
  [{ collection: 'videos', name: 'Videos', field: 'singer' }],
  'This Singer is referenced in one or more Videos and cannot be deleted.',
)

export const RaagSingers: CollectionConfig = {
  slug: 'raagSingers',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: isVideoContentCreator,
    read: isVideoContentCreatorOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'about',
      type: 'textarea',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    ...slugField('name'),
    createdByField,
  ],
  hooks: {
    beforeDelete: [preventSingersDeletion],
    afterChange: [
      async (args) => {
        const { doc, req } = args

        let videoSlugs: string[] = []
        // Find all videos that reference this singer
        try {
          const videos = await req.payload.find({
            collection: 'videos',
            where: {
              singer: {
                equals: doc.id,
              },
            },
          })

          videoSlugs = videos.docs.map((video) => video?.slug).filter(Boolean) as string[]
        } catch (error) {
          console.error('Error fetching related videos:', error)
        }

        return createRevalidateHook((doc) => [
          `/videos`,
          `/singer/${doc.slug}`,
          ...videoSlugs.map((slug) => `/videos/${slug}`),
        ])(args)
      },
    ],
    afterDelete: [
      async (args) => {
        const { doc, req } = args

        let videoSlugs: string[] = []
        // Find all videos that reference this singer
        try {
          const videos = await req.payload.find({
            collection: 'videos',
            where: {
              singer: {
                equals: doc.id,
              },
            },
          })

          videoSlugs = videos.docs.map((video) => video?.slug).filter(Boolean) as string[]
        } catch (error) {
          console.error('Error fetching related videos:', error)
        }

        return createRevalidateDeleteHook((doc) => [
          `/videos`,
          `/singer/${doc.slug}`,
          ...videoSlugs.map((slug) => `/videos/${slug}`),
        ])(args)
      },
    ],
  },
}
