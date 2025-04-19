import { createdByField } from '@/fields/createdBy'
import { slugField } from '@/fields/slug'
import {
  isAdminFieldLevel,
  isClassicalContentCreatorFieldLevel,
  isClassicalContentCreatorOrSelf,
} from '@/hooks/payload/accessControl'
import { isAdmin } from '@/hooks/payload/accessControl'
import { CollectionConfig, CollectionBeforeDeleteHook, FieldHook, CollectionSlug } from 'payload'
import { createRevalidateHook, createRevalidateDeleteHook } from '@/hooks/revalidate'
import { preventDeletionFactory } from '@/hooks/payload/preventDeletion'

const preventTaalDeletion = preventDeletionFactory(
  [{ collection: 'bollywoodSongs', name: 'Bollywood Songs', field: 'taal' }],
  'This Taal cannot be deleted as it is referenced in',
)

export const Taal: CollectionConfig = {
  slug: 'taals',
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 30,
  },
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: isClassicalContentCreatorOrSelf,
    update: isClassicalContentCreatorOrSelf,
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
      type: 'row',
      access: {
        read: isClassicalContentCreatorFieldLevel,
      },
      fields: [
        {
          name: 'matra',
          label: 'Number of Matra',
          type: 'number',
          required: true,
        },
        {
          name: 'taali',
          label: 'Number of Taali',
          type: 'number',
          required: true,
        },
        {
          name: 'khaali',
          label: 'Number of Khaali',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      name: 'divisions',
      type: 'array',
      access: {
        read: isClassicalContentCreatorFieldLevel,
      },
      fields: [
        {
          name: 'numMatra',
          label: 'Number of Matra',
          type: 'number',
        },
        {
          name: 'isTaaliOrKhaali',
          label: 'Taali or Khaali',
          type: 'radio',
          options: [
            { label: 'Taali', value: 'taali' },
            { label: 'Khaali', value: 'khaali' },
          ],
        },
      ],
      label: 'Divisions of Theka, like 3-2-2',
    },
    {
      name: 'thekaImage',
      access: {
        read: isClassicalContentCreatorFieldLevel,
      },
      type: 'upload',
      relationTo: 'classicalMedia',
    },
    {
      name: 'theka',
      access: {
        read: isClassicalContentCreatorFieldLevel,
      },
      type: 'richText',
    },
    {
      name: 'description',
      access: {
        read: isClassicalContentCreatorFieldLevel,
      },
      type: 'richText',
    },
    {
      name: 'comments',
      access: {
        create: isAdminFieldLevel,
        read: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      type: 'richText',
    },
    ...slugField('name'),
    createdByField,
  ],
  hooks: {
    beforeDelete: [preventTaalDeletion],
    afterChange: [
      createRevalidateHook((doc) => [
        `/taal`,
        `/taal/${doc.slug}`,
        `/bollywood-songs/taal`,
        `/bollywood-songs/taal/${doc.slug}`,
      ]),
    ],
    afterDelete: [
      createRevalidateDeleteHook((doc) => [
        `/taal`,
        `/taal/${doc.slug}`,
        `/bollywood-songs/taal`,
        `/bollywood-songs/taal/${doc.slug}`,
      ]),
    ],
  },
}
