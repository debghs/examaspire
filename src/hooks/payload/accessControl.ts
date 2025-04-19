import { User } from '@/payload-types'
import { Access, FieldAccess } from 'payload'

export type UserTypes =
  | 'admin'
  | 'bollywoodContentCreator'
  | 'classicalContentCreator'
  | 'videoContentCreator'

// Generic function that works for both collection and field level
export const hasRole = (user: User | null, role: UserTypes): boolean => {
  let isRole = false

  if (user && Array.isArray(user.roles)) {
    isRole = user.roles.includes(role)
  }

  let isActive = false
  if (user?.active) {
    isActive = true
  }

  return isRole && isActive
}

// Collection Level Access
export const isActive: Access<User> = ({ req: { user } }) => {
  if (!user) return false

  if (user?.active) {
    return true
  }
  return false
}

export const isAdmin: Access<User> = ({ req: { user } }) => {
  return hasRole(user, 'admin')
}

export const isBollywoodContentCreator: Access<User> = ({ req: { user } }) => {
  return hasRole(user, 'bollywoodContentCreator') || hasRole(user, 'admin')
}

export const isClassicalContentCreator: Access<User> = ({ req: { user } }) => {
  return hasRole(user, 'classicalContentCreator') || hasRole(user, 'admin')
}

export const isVideoContentCreator: Access<User> = ({ req: { user } }) => {
  return hasRole(user, 'videoContentCreator') || hasRole(user, 'admin')
}

export const isBollywoodContentCreatorOrSelf: Access<User> = ({ req: { user } }) => {
  if (hasRole(user, 'admin')) {
    return true
  }

  // Regular users can only read their own orders
  if (hasRole(user, 'bollywoodContentCreator')) {
    return {
      createdBy: {
        equals: user?.id,
      },
    }
  }
  return false
}

export const isClassicalContentCreatorOrSelf: Access<User> = ({ req: { user } }) => {
  if (hasRole(user, 'admin')) {
    return true
  }

  // Regular users can only read their own orders
  if (hasRole(user, 'classicalContentCreator')) {
    return {
      createdBy: {
        equals: user?.id,
      },
    }
  }
  return false
}

export const isVideoContentCreatorOrSelf: Access<User> = ({ req: { user } }) => {
  if (hasRole(user, 'admin')) {
    return true
  }

  if (hasRole(user, 'videoContentCreator')) {
    return {
      createdBy: {
        equals: user?.id,
      },
    }
  }
  return false
}

// Field Level Access versions
export const isAdminFieldLevel: FieldAccess = ({ req: { user } }) => {
  return hasRole(user, 'admin')
}

export const isBollywoodContentCreatorFieldLevel: FieldAccess = ({ req: { user } }) => {
  return hasRole(user, 'bollywoodContentCreator') || hasRole(user, 'admin')
}

export const isClassicalContentCreatorFieldLevel: FieldAccess = ({ req: { user } }) => {
  return hasRole(user, 'classicalContentCreator') || hasRole(user, 'admin')
}
