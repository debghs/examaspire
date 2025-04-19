import { CollectionSlug, CollectionBeforeDeleteHook } from 'payload'

type CollectionReference = {
  collection: CollectionSlug
  field?: string
  name: string // Human-readable name for error messages
}

export const preventDeletionFactory = (references: CollectionReference[], errorMessage: string) => {
  const hook: CollectionBeforeDeleteHook = async ({ req, id }) => {
    try {
      const results = await Promise.all(
        references.map(async ({ collection, field }) => {
          try {
            const fieldName = field || collection
            const res = await req.payload.find({
              collection,
              depth: 0,
              where: {
                [fieldName]: {
                  equals: id,
                },
              },
            })
            return res.docs.length
          } catch (err) {
            throw err
          }
        }),
      )

      if (results.some((count) => count > 0)) {
        const referencedCollections = references
          .filter((_, index) => results[index] > 0)
          .map((ref) => ref.name)
          .join(', ')

        throw new Error(`${errorMessage} ${referencedCollections}`)
      }
    } catch (err) {
      throw err
    }
  }

  return hook
}
