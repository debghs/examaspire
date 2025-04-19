import { isActive, isAdmin } from '@/hooks/payload/accessControl'
import { preventDeletionFactory } from '@/hooks/payload/preventDeletion'
import { CollectionConfig } from 'payload'

const preventMediaDeletion = preventDeletionFactory(
  [
    { collection: 'raags', name: 'Raags', field: 'media' },
    { collection: 'taals', name: 'Taals', field: 'media' },
  ],
  'This Media is referenced in one or more Videos or Bollywood Songs and cannot be deleted.',
)

export const ClassicalMedia: CollectionConfig = {
  slug: 'classicalMedia',
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
