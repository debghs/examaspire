import { CollectionSlug, getPayload, Where } from 'payload'
import configPromise from '@payload-config'
import { Config } from '../payload-types'
import { cache } from 'react'

type CollectionResponse<TSlug extends CollectionSlug> = Config['collections'][TSlug]

interface QueryCollectionArgs<TSlug extends CollectionSlug> {
  collection: TSlug
  limit?: number
  depth?: number
  draft?: boolean
  pagination?: boolean
  select?: Record<string, boolean> | null
  where?: Where
}

export const queryCollectionForStaticParams = <TSlug extends CollectionSlug>(
  collection: TSlug,
  draft?: boolean,
) => queryCollection({ collection, limit: 100000, select: { slug: true }, draft })

export const queryCollection = cache(
  async <TSlug extends CollectionSlug>({
    collection,
    limit = 100000,
    depth = 1,
    draft = false,
    pagination = false,
    select = null,
    where,
  }: QueryCollectionArgs<TSlug>): Promise<CollectionResponse<TSlug>[]> => {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: collection as CollectionSlug,
      draft,
      depth,
      limit,
      overrideAccess: true,
      pagination,
      select: select ?? undefined,
      where,
    })

    return docs as CollectionResponse<TSlug>[]
  },
)
