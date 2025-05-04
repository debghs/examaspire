import { User } from '@/payload-types'
import { Access, FieldAccess } from 'payload'

export type UserTypes =
  | 'admin'
  | 'teacher'
  | 'student'

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

export const isTeacher: Access<User> = ({ req: { user } }) => {
  return hasRole(user, 'teacher') || hasRole(user, 'admin')
}

export const isStudent: Access<User> = ({ req: { user } }) => {
  return hasRole(user, 'student') || hasRole(user, 'admin')
}


export const isTeacherOrSelf: Access<User> = ({ req: { user } }) => {
  if (hasRole(user, 'admin')) {
    return true
  }

  // Regular users can only read their own orders
  if (hasRole(user, 'teacher')) {
    return {
      createdBy: {
        equals: user?.id,
      },
    }
  }
  return false
}

export const isStudentOrSelf: Access<User> = ({ req: { user } }) => {
  if (hasRole(user, 'admin')) {
    return true
  }

  // Regular users can only read their own orders
  if (hasRole(user, 'student')) {
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

export const isTeacherFieldLevel: FieldAccess = ({ req: { user } }) => {
  return hasRole(user, 'teacher') || hasRole(user, 'admin')
}

export const isStudentFieldLevel: FieldAccess = ({ req: { user } }) => {
  return hasRole(user, 'student') || hasRole(user, 'admin')
}
