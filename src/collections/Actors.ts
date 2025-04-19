import { createdByField } from '@/fields/createdBy'
import { slugField } from '@/fields/slug'
import { isAdmin, isBollywoodContentCreator } from '@/hooks/payload/accessControl'
import { CollectionConfig, CollectionBeforeDeleteHook, FieldHook, CollectionSlug } from 'payload'
import { preventDeletionFactory } from '@/hooks/payload/preventDeletion'
import { createRevalidateDeleteHook, createRevalidateHook } from '@/hooks/revalidate'

const preventActorsDeletion = preventDeletionFactory(
  [{ collection: 'bollywoodSongs', name: 'Bollywood Songs', field: 'actor' }],
  'This Actor is referenced in one or more Bollywood songs and cannot be deleted.',
)

export const Actors: CollectionConfig = {
  slug: 'actors',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: isBollywoodContentCreator,
    // TODO: Should we allow the bollywood content creator to update or create actors?
    // Replicate the same access for singers, lyricists, music directors, song categories
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
      options: ['Male', 'Female', 'N/A'],
      defaultValue: 'N/A',
    },
    ...slugField('name'),
    createdByField,
  ],
  hooks: {
    beforeDelete: [preventActorsDeletion],
    afterChange: [
      createRevalidateHook((doc) => [
        `/bollywood-songs`,
        `/bollywood-songs/actor/${doc.slug}`,
        `/bollywood-songs/actor`,
      ]),
    ],
    afterDelete: [
      createRevalidateDeleteHook((doc) => [
        `/bollywood-songs`,
        `/bollywood-songs/actor/${doc.slug}`,
        `/bollywood-songs/actor`,
      ]),
    ],
  },
}
