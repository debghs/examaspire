import { createdByField } from '@/fields/createdBy'
import { slugField } from '@/fields/slug'
import { isAdmin } from '@/hooks/payload/accessControl'
import { CollectionConfig } from 'payload'
import { createRevalidateHook, createRevalidateDeleteHook } from '@/hooks/revalidate'

export const Questions: CollectionConfig = {
  slug: 'questions',
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 20,
  },
  admin: {
    useAsTitle: 'questionText',
    defaultColumns: ['questionText', 'type', 'difficulty', 'marks'],
  },
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'questionText',
      type: 'richText',
      required: true,
    },
    {
        name: 'media',
        type: 'array',
        label: 'Media Attachments',
        admin: {
          description: 'Add images or videos to your question',
        },
        fields: [
          {
            name: 'type',
            type: 'select',
            required: true,
            options: [
              { label: 'Image', value: 'image' },
              { label: 'Video', value: 'video' },
            ],
          },
          {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
            admin: {
              condition: (data, siblingData) => siblingData?.type === 'image',
            },
          },
          {
            name: 'video',
            type: 'text',
            required: true,
            admin: {
              description: 'Enter a video URL (e.g., YouTube, Vimeo)',
              condition: (data, siblingData) => siblingData?.type === 'video',
            },
          },
        ],
      },  
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Multiple Choice', value: 'mcq' },
        { label: 'Subjective', value: 'subjective' },
      ],
    },
    {
      name: 'options',
      type: 'array',
      required: true,
      admin: {
        condition: (data) => data.type === 'mcq',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        {
          name: 'isCorrect',
          type: 'checkbox',
          required: true,
        },
      ],
    },
    {
      name: 'correctAnswer',
      type: 'textarea',
      required: true,
      admin: {
        condition: (data) => data.type === 'subjective',
      },
    },
    {
      name: 'marks',
      type: 'number',
      required: true,
      min: 1,
    },
    {
      name: 'hasNegativeMarking',
      type: 'checkbox',
      label: 'Enable Negative Marking',
      defaultValue: false,
    },
    {
      name: 'negativeMarks',
      type: 'number',
      admin: {
        description: 'Marks to be deducted for wrong answers',
        condition: (data) => data.hasNegativeMarking === true,
      },
      min: 0,
      defaultValue: 0,
    },
    {
      name: 'difficulty',
      type: 'select',
      required: true,
      options: [
        { label: 'Easy', value: 'easy' },
        { label: 'Medium', value: 'medium' },
        { label: 'Hard', value: 'hard' },
      ],
    },
    {
      name: 'explanation',
      type: 'richText',
      admin: {
        description: 'Explanation of the correct answer',
      },
    },
    createdByField,
  ],
  hooks: {
    afterChange: [createRevalidateHook((doc) => [`/questions`, `/questions/${doc.id}`])],
    afterDelete: [createRevalidateDeleteHook((doc) => [`/questions`, `/questions/${doc.id}`])],
  },
}
