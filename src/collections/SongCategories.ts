import { createdByField } from '@/fields/createdBy'
import { slugField } from '@/fields/slug'
import { isBollywoodContentCreator } from '@/hooks/payload/accessControl'
import { preventDeletionFactory } from '@/hooks/payload/preventDeletion'
import { createRevalidateHook, createRevalidateDeleteHook } from '@/hooks/revalidate'
import { CollectionConfig } from 'payload'

const preventSongCategoryDeletion = preventDeletionFactory(
  [{ collection: 'bollywoodSongs', name: 'Bollywood Songs', field: 'category' }],
  'This Category is referenced in one or more Bollywood songs and cannot be deleted.',
)

export const SongCategories: CollectionConfig = {
  slug: 'songCategories',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: isBollywoodContentCreator,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    ...slugField('name'),
    createdByField,
  ],
  hooks: {
    beforeDelete: [preventSongCategoryDeletion],
    afterChange: [
      createRevalidateHook((doc) => [
        `/bollywood-songs`,
        `/bollywood-songs/category`,
        `/bollywood-songs/category/${doc.slug}`,
      ]),
    ],
    afterDelete: [
      createRevalidateDeleteHook((doc) => [
        `/bollywood-songs`,
        `/bollywood-songs/category`,
        `/bollywood-songs/category/${doc.slug}`,
      ]),
    ],
  },
}
