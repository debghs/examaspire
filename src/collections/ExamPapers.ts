import { Access, CollectionConfig } from 'payload'
import { hasRole } from '@/hooks/payload/accessControl'

const isTeacherOrAdmin: Access = ({ req: { user } }) => {
  if (hasRole(user, 'admin') || hasRole(user, 'teacher')) return true
  return false
}

export const ExamPapers: CollectionConfig = {
  slug: 'exam-papers',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    create: isTeacherOrAdmin,
    read: isTeacherOrAdmin,
    update: isTeacherOrAdmin,
    delete: isTeacherOrAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'duration',
      type: 'number',
      required: true,
      min: 1,
      max: 180,
      defaultValue: 60,
      label: 'Duration (in minutes)',
    },
    {
      name: 'totalMarks',
      type: 'number',
      required: true,
      min: 1,
      label: 'Total Marks',
    },
    {
      name: 'startTime',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endTime',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'questions',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'questionText',
          type: 'textarea',
          required: true,
        },
        {
          name: 'options',
          type: 'array',
          required: true,
          minRows: 2,
          maxRows: 6,
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
          name: 'marks',
          type: 'number',
          required: true,
          min: 1,
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: false,
      label: 'Make exam active for students',
    },
  ],
}

