import { Access, CollectionConfig } from 'payload'
import { hasRole } from '@/hooks/payload/accessControl'

const isTeacherOrAdmin: Access = ({ req: { user } }) => {
  if (hasRole(user, 'admin') || hasRole(user, 'teacher')) return true
  return false
}

const canSubmitOrView: Access = ({ req: { user } }) => {
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

export const Submissions: CollectionConfig = {
  slug: 'submissions',
  admin: {
    useAsTitle: 'id',
  },
  access: {
    create: canSubmitOrView,
    read: canSubmitOrView,
    update: canSubmitOrView,
    delete: isTeacherOrAdmin,
  },
  fields: [
    {
      name: 'examPaper',
      type: 'relationship',
      relationTo: 'exam-papers',
      required: true,
    },
    {
      name: 'student',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'answers',
      type: 'array',
      fields: [
        {
          name: 'questionIndex',
          type: 'number',
          required: true,
        },
        {
          name: 'selectedOption',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      name: 'startTime',
      type: 'date',
      required: true,
    },
    {
      name: 'submittedAt',
      type: 'date',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'in-progress',
      options: [
        {
          label: 'In Progress',
          value: 'in-progress',
        },
        {
          label: 'Submitted',
          value: 'submitted',
        },
        {
          label: 'Timed Out',
          value: 'timed-out',
        },
      ],
    },
  ],
}
