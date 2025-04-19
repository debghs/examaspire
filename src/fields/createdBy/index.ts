import { Field } from 'payload'
import { isAdminFieldLevel } from '@/hooks/payload/accessControl'

export const createdByField: Field = {
  name: 'createdBy',
  type: 'relationship',
  relationTo: 'users',
  hasMany: true,
  admin: {
    position: 'sidebar',
  },
  hooks: {
    beforeChange: [
      ({ req, value }) => {
        if (!value || !value.length) {
          if (!req.user) return value
          return [req.user.id]
        }
        return value
      },
    ],
  },
  access: {
    read: isAdminFieldLevel,
    update: isAdminFieldLevel,
  },
}
