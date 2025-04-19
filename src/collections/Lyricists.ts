import { createdByField } from '@/fields/createdBy'
import { slugField } from '@/fields/slug'
import { isBollywoodContentCreator } from '@/hooks/payload/accessControl'
import { preventDeletionFactory } from '@/hooks/payload/preventDeletion'
import { createRevalidateHook } from '@/hooks/revalidate'
import { createRevalidateDeleteHook } from '@/hooks/revalidate'
import { CollectionConfig } from 'payload'

const preventLyricistsDeletion = preventDeletionFactory(
  [{ collection: 'bollywoodSongs', name: 'Bollywood Songs', field: 'lyricist' }],
  'This Lyricist is referenced in one or more Bollywood songs and cannot be deleted.',
)

export const Lyricists: CollectionConfig = {
  slug: 'lyricists',
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
      unique: true,
    },
    ...slugField('name'),
    createdByField,
  ],
  hooks: {
    beforeDelete: [preventLyricistsDeletion],
    afterChange: [
      createRevalidateHook((doc) => [
        `/bollywood-songs`,
        `/bollywood-songs/lyricist`,
        `/bollywood-songs/lyricist/${doc.slug}`,
      ]),
    ],
    afterDelete: [
      createRevalidateDeleteHook((doc) => [
        `/bollywood-songs`,
        `/bollywood-songs/lyricist`,
        `/bollywood-songs/lyricist/${doc.slug}`,
      ]),
    ],
  },
}
