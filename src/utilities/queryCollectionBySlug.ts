import { CollectionSlug, getPayload } from 'payload'
import configPromise from '@payload-config'
import { cache } from 'react'
import { Config } from '../payload-types'

type CollectionResponse<TSlug extends CollectionSlug> = Config['collections'][TSlug]

export const queryCollectionBySlug = cache(
  async <TSlug extends CollectionSlug>({
    slug,
    collection,
    depth = 1,
    pagination = false,
    overrideAccess = true,
    draft = false,
  }: {
    slug: string
    collection: TSlug
    depth?: number
    pagination?: boolean
    overrideAccess?: boolean
    draft?: boolean
  }): Promise<CollectionResponse<TSlug> | null> => {
    const payload = await getPayload({ config: configPromise })

    const { docs } = await payload.find({
      collection,
      depth,
      where: {
        slug: {
          equals: slug,
        },
      },
      overrideAccess,
      pagination,
      draft,
    })

    return (docs?.[0] as CollectionResponse<TSlug>) || null
  },
)
