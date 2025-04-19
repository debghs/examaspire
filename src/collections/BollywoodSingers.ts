import { createdByField } from '@/fields/createdBy'
import { slugField } from '@/fields/slug'
import { isBollywoodContentCreator } from '@/hooks/payload/accessControl'
import { CollectionConfig, CollectionBeforeDeleteHook, FieldHook, CollectionSlug } from 'payload'
import { preventDeletionFactory } from '@/hooks/payload/preventDeletion'
import { createRevalidateHook } from '@/hooks/revalidate'
import { createRevalidateDeleteHook } from '@/hooks/revalidate'

const preventSingersDeletion = preventDeletionFactory(
  [{ collection: 'bollywoodSongs', name: 'Bollywood Songs', field: 'singer' }],
  'This Singer is referenced in one or more Bollywood songs and cannot be deleted.',
)

export const BollywoodSingers: CollectionConfig = {
  slug: 'bollywoodSingers',
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
    {
      name: 'gender',
      type: 'select',
      options: ['Male', 'Female'],
    },
    ...slugField('name'),
    createdByField,
  ],
  hooks: {
    beforeDelete: [preventSingersDeletion],
    afterChange: [
      createRevalidateHook((doc) => [
        `/bollywood-songs`,
        `/bollywood-songs/singer`,
        `/bollywood-songs/singer/${doc.slug}`,
      ]),
    ],
    afterDelete: [
      createRevalidateDeleteHook((doc) => [
        `/bollywood-songs`,
        `/bollywood-songs/singer`,
        `/bollywood-songs/singer/${doc.slug}`,
      ]),
    ],
  },
}
