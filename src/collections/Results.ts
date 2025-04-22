import { Access, CollectionConfig } from 'payload'
import { hasRole } from '@/hooks/payload/accessControl'

const isTeacherOrAdmin: Access = ({ req: { user } }) => {
  if (hasRole(user, 'admin') || hasRole(user, 'teacher')) return true
  return false
}

const canViewResult: Access = ({ req: { user } }) => {
  if (hasRole(user, 'admin') || hasRole(user, 'teacher')) return true
  if (hasRole(user, 'student')) {
    return {
      'student.id': {
        equals: user.id,
      },
    }
  }
  return false
}

export const Results: CollectionConfig = {
  slug: 'results',
  admin: {
    useAsTitle: 'displayTitle',
  },
  access: {
    create: isTeacherOrAdmin,
    read: canViewResult,
    update: isTeacherOrAdmin,
    delete: isTeacherOrAdmin,
  },
  fields: [
    {
      name: 'exam',
      type: 'relationship',
      relationTo: 'exams',
      required: true,
    },
    {
      name: 'student',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'submission',
      type: 'relationship',
      relationTo: 'submissions',
      required: true,
    },
    {
      name: 'score',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'percentage',
      type: 'number',
      required: true,
      min: 0,
      max: 100,
    },
    {
      name: 'correctAnswers',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'incorrectAnswers',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'feedback',
      type: 'textarea',
    },
    {
      name: 'gradedAt',
      type: 'date',
      required: true,
    },
    {
      name: 'displayTitle',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [({ data }) => {
          if (data.exam && data.student) {
            return `${data.exam.title} - ${data.student.name}`
          }
          return 'Untitled Result'
        }],
      },
    },
  ],
}
