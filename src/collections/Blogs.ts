import { createdByField } from '@/fields/createdBy'
import { slugField } from '@/fields/slug'
import { isVideoContentCreator } from '@/hooks/payload/accessControl'
import { isVideoContentCreatorOrSelf } from '@/hooks/payload/accessControl'
import { isAdmin } from '@/hooks/payload/accessControl'
import { CollectionConfig } from 'payload'
import { createRevalidateHook, createRevalidateDeleteHook } from '@/hooks/revalidate'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 20,
  },
  admin: {
    useAsTitle: 'title',
  },
  access: {
    create: isVideoContentCreator,
    read: isVideoContentCreatorOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'tags',
      type: 'text',
      required: true,
      hasMany: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'text',
    },
    ...slugField('title'),
    createdByField,
  ],
  hooks: {
    afterChange: [createRevalidateHook((doc) => [`/blogs`, `/blogs/${doc.slug}`])],
    afterDelete: [createRevalidateDeleteHook((doc) => [`/blogs`, `/blogs/${doc.slug}`])],
  },
}
