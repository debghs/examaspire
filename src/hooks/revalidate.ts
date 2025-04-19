import { getServerSideURL } from '@/utilities/getURL'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

type RevalidateHookArgs = {
  doc: any
  previousDoc?: any
  paths: string[]
  context: any
}

/**
 * Safely calls the revalidation API without using direct cache functions
 */
const callRevalidationAPI = async (paths: string[] = [], tags: string[] = []) => {
  if (!paths.length && !tags.length) return

  try {
    const secret = process.env.REVALIDATE_SECRET
    if (!secret) {
      console.warn('REVALIDATE_SECRET environment variable is not set')
      return
    }

    // Use fetch to call our API route
    const response = await fetch(`${getServerSideURL()}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paths,
        tags,
        secret,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Revalidation API error:', error)
    } else {
      const result = await response.json()
      console.log('Revalidation result:', result)
    }
  } catch (error) {
    console.error('Failed to call revalidation API:', error)
  }
}

export const createGlobalRevalidateHook: GlobalAfterChangeHook = () => {
  // Queue the tag revalidation for after commit
  setTimeout(() => {
    callRevalidationAPI([], ['global_nav'])
  }, 0)

  return {}
}

const revalidateRoutes = async ({ doc, previousDoc, paths, context }: RevalidateHookArgs) => {
  if (!context.disableRevalidate) {
    // Queue revalidation for after render completes
    setTimeout(() => {
      const allPaths = [...paths]

      // Add previous paths if slug changed
      if (previousDoc && doc.slug !== previousDoc.slug) {
        const previousPaths = paths.map((path) => path.replace(doc.slug, previousDoc.slug))
        allPaths.push(...previousPaths)
      }

      callRevalidationAPI(allPaths, ['sitemap'])
    }, 0)
  }
}

export const createRevalidateHook = (paths: (doc: any) => string[]): CollectionAfterChangeHook => {
  return ({ doc, previousDoc, req }) => {
    revalidateRoutes({ doc, previousDoc, paths: paths(doc), context: req.context })
    return doc
  }
}

export const createRevalidateDeleteHook = (
  paths: (doc: any) => string[],
): CollectionAfterDeleteHook => {
  return ({ doc, req }) => {
    revalidateRoutes({ doc, paths: paths(doc), context: req.context })
    return doc
  }
}
