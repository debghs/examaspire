import { isActive, isAdmin } from '@/hooks/payload/accessControl'
import { preventDeletionFactory } from '@/hooks/payload/preventDeletion'
import { CollectionConfig } from 'payload'

const preventMediaDeletion = preventDeletionFactory(
  [{ collection: 'bollywoodSongs', name: 'Bollywood Songs', field: 'media' }],
  'This Media is referenced in one or more Videos or Bollywood Songs and cannot be deleted.',
)

export const BollywoodMedia: CollectionConfig = {
  slug: 'bollywoodMedia',
  upload: {},
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
