import { PayloadRequest, CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  pages: '',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug, req }: Props) => {
  if (!process.env.PREVIEW_SECRET) {
    throw new Error('PREVIEW_SECRET environment variable is not set')
  }

  // Construct the full path including the collection prefix
  const path = collectionPrefixMap[collection]
    ? `${collectionPrefixMap[collection]}/${slug}`
    : `/${slug}`

  const params = {
    slug,
    collection,
    path,
    previewSecret: process.env.PREVIEW_SECRET,
  }

  const encodedParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    encodedParams.append(key, value)
  })

  const isProduction =
    process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL_PROJECT_PRODUCTION_URL)
  const protocol = isProduction ? 'https:' : req.protocol

  const url = `${protocol}//${req.host}/next/preview?${encodedParams.toString()}`

  return url
}
