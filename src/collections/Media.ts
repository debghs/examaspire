import { isActive, isAdmin } from '@/hooks/payload/accessControl'
import { preventDeletionFactory } from '@/hooks/payload/preventDeletion'
import { CollectionConfig } from 'payload'

const preventMediaDeletion = preventDeletionFactory(
  [
    // { collection: 'videos', name: 'Videos', field: 'media' },
    // { collection: 'bollywoodSongs', name: 'Bollywood Songs', field: 'media' },
    // { collection: 'raags', name: 'Raags', field: 'media' },
    // { collection: 'taals', name: 'Taals', field: 'media' },
    { collection: 'pages', name: 'Pages', field: 'media' },
    // { collection: 'blogs', name: 'Blogs', field: 'media' },
    // { collection: 'raagSingers', name: 'Raag Singers', field: 'media' },
  ],
  'This Media is referenced in one or more places and hence cannot be deleted.',
)

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    mimeTypes: ['image/*', 'audio/*'],
  },
  access: {
    read: () => true,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  hooks: {
    beforeDelete: [preventMediaDeletion],
  },
}
