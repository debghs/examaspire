import { createdByField } from '@/fields/createdBy'
import { hasRole, isAdmin, isAdminFieldLevel } from '@/hooks/payload/accessControl'
import type { Access, CollectionConfig } from 'payload'
import { APIError } from 'payload'

// Access Control for Users Collection
const isAdminOrActiveSelf: Access = ({ req: { user } }) => {
  // If user is 'admin', they have access to everything
  if (hasRole(user, 'admin')) return true

  // If any other type of user, only provide access if they're active and accessing themselves
  if (user?.active) {
    return {
      id: {
        equals: user?.id,
      },
    }
  }

  // Inactive users have no access
  return false
}

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: isAdmin,
    read: isAdminOrActiveSelf,
    update: isAdminOrActiveSelf,
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
      name: 'roles',
      saveToJWT: true,
      type: 'select',
      hasMany: true,
      defaultValue: ['admin'],
      access: {
        read: isAdminFieldLevel,
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Teacher',
          value: 'teacher',
        },
        {
          label: 'Student',
          value: 'student',
        },
        // Commented out content creator roles
        // {
        //   label: 'Bollywood Content Creator',
        //   value: 'bollywoodContentCreator',
        // },
        // {
        //   label: 'Classical Content Creator',
        //   value: 'classicalContentCreator',
        // },
        // {
        //   label: 'Video Content Creator',
        //   value: 'videoContentCreator',
        // },
      ],
    },
    {
      name: 'active',
      label: 'Is User Active?',
      type: 'checkbox',
      defaultValue: true,
      access: {
        read: isAdminFieldLevel,
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
  ],
  hooks: {
    afterLogin: [
      async ({ req, user }) => {
        if (!user.active) {
          throw new APIError(
            'Your account has been deactivated. Please contact an administrator.',
            403,
          )
        }
      },
    ],
  },
}

export default Users
