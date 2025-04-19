import { createdByField } from '@/fields/createdBy'
import { slugField } from '@/fields/slug'
import { isBollywoodContentCreator } from '@/hooks/payload/accessControl'
import { preventDeletionFactory } from '@/hooks/payload/preventDeletion'
import { createRevalidateHook, createRevalidateDeleteHook } from '@/hooks/revalidate'
import { CollectionConfig } from 'payload'

const preventMusicDirectorsDeletion = preventDeletionFactory(
  [{ collection: 'bollywoodSongs', name: 'Bollywood Songs', field: 'musicDirector' }],
  'This Music Director is referenced in one or more Bollywood songs and cannot be deleted.',
)

export const MusicDirector: CollectionConfig = {
  slug: 'musicDirector',
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
    beforeDelete: [preventMusicDirectorsDeletion],
    afterChange: [createRevalidateHook((doc) => [
      `/bollywood-songs`,
      `/bollywood-songs/music-director`,
      `/bollywood-songs/music-director/${doc.slug}`,
    ]),
    ],
    afterDelete: [createRevalidateDeleteHook((doc) => [
      `/bollywood-songs`,
      `/bollywood-songs/music-director`,
      `/bollywood-songs/music-director/${doc.slug}`,
    ]),
    ],    
  },
}
