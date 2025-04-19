import { createdByField } from '@/fields/createdBy'
import { slugField } from '@/fields/slug'
import {
  isAdmin,
  isVideoContentCreator,
  isVideoContentCreatorOrSelf,
} from '@/hooks/payload/accessControl'
import { preventDeletionFactory } from '@/hooks/payload/preventDeletion'
import { createRevalidateHook, createRevalidateDeleteHook } from '@/hooks/revalidate'
import { CollectionConfig } from 'payload'

const preventSubheadingDeletion = preventDeletionFactory(
  [{ collection: 'videos', name: 'Videos', field: 'subheading' }],
  'This Subheading cannot be deleted as it is referenced in',
)

export const Subheading: CollectionConfig = {
  slug: 'subheadings',
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
    ...slugField('name'),
    createdByField,
  ],
  hooks: {
    beforeDelete: [preventSubheadingDeletion],
    afterChange: [createRevalidateHook((doc) => [`/videos`])],
    afterDelete: [createRevalidateDeleteHook((doc) => [`/videos`])],
  },
}
