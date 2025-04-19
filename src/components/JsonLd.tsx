import Script from 'next/script'

interface Organization {
  '@type': 'Organization'
  name: string
  url: string
  logo?: string
}

interface WebSite {
  '@type': 'WebSite'
  name: string
  url: string
  potentialAction?: {
    '@type': 'SearchAction'
    target: string
    'query-input': string
  }
}

interface MusicRecording {
  '@type': 'MusicRecording'
  name: string
  byArtist: Person[]
  inAlbum?: {
    '@type': 'MusicAlbum'
    name: string
  }
  composer?: Person[]
  lyricist?: Person[]
}

interface Person {
  '@type': 'Person'
  name: string
}

interface VideoObject {
  '@type': 'VideoObject'
  name: string
  description: string
  thumbnailUrl?: string
  uploadDate: string
  contentUrl: string
  embedUrl: string
  duration?: string
  genre?: string
  performer?: string[]
  about?: string[]
}

type SchemaType =
  | 'WebPage'
  | 'CollectionPage'
  | 'Article'
  | 'BlogPosting'
  | 'MusicRecording'
  | 'VideoObject'

interface BreadcrumbList {
  '@type': 'BreadcrumbList'
  itemListElement: {
    '@type': 'ListItem'
    position: number
    name: string
    item: string
  }[]
}

interface MusicGroup {
  '@type': 'MusicGroup'
  name: string
  url: string
  image?: string
}

export interface JsonLdProps {
  title: string
  description?: string
  type: SchemaType
  organization?: Partial<Organization>
  website?: Partial<WebSite>
  images?: string[]
  datePublished?: string
  dateModified?: string
  authors?: string[]
  // Music specific props
  inAlbum?: string
  composers?: string[]
  lyricists?: string[]
  performers?: string[]
  // Video specific props
  video?: {
    name: string
    description: string
    thumbnailUrl?: string
    uploadDate: string
    contentUrl: string
    embedUrl: string
    duration?: string
    genre?: string
    performer?: string[]
    about?: string[]
  }
  // Additional props for collection pages
  breadcrumb?: {
    items: Array<{
      name: string
      url: string
    }>
  }
  itemList?: Array<{
    name: string
    url: string
    description?: string
    image?: string
    performer?: string[]
    datePublished?: string
  }>
  mainEntityOfPage?: boolean
}

const defaultOrg: Organization = {
  '@type': 'Organization',
  name: 'AGK Sangeet',
  url: 'https://agksangeet.com',
  logo: 'https://agksangeet.com/logo.png',
}

const defaultWebsite: WebSite = {
  '@type': 'WebSite',
  name: 'AGK Sangeet',
  url: 'https://agksangeet.com',
}

export function JsonLd({
  title,
  description,
  type = 'WebPage',
  organization = defaultOrg,
  website = defaultWebsite,
  images = [],
  datePublished,
  dateModified,
  authors = [],
  inAlbum,
  composers = [],
  lyricists = [],
  performers = [],
  breadcrumb,
  itemList,
  mainEntityOfPage = false,
  video,
}: JsonLdProps) {
  let jsonLd: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': type,
    name: title,
    url: `https://agksangeet.com/`,
    organization: {
      '@type': 'Organization',
      name: 'AGK Sangeet',
      url: 'https://agksangeet.com',
      logo: 'https://agksangeet.com/logo.png',
    },
  }

  if (description) {
    jsonLd.description = description
  }

  if (type === 'MusicRecording') {
    if (performers.length > 0) {
      jsonLd.byArtist = performers.map((name) => ({
        '@type': 'Person',
        name,
      }))
    }

    if (composers.length > 0) {
      jsonLd.composer = composers.map((name) => ({
        '@type': 'Person',
        name,
      }))
    }

    if (lyricists.length > 0) {
      jsonLd.lyricist = lyricists.map((name) => ({
        '@type': 'Person',
        name,
      }))
    }

    if (inAlbum) {
      jsonLd.inAlbum = {
        '@type': 'MusicAlbum',
        name: inAlbum,
      }
    }
  } else {
    // For other types (WebPage, Article, BlogPosting, etc.)
    jsonLd.isPartOf = {
      ...website,
    }
    jsonLd.publisher = {
      ...organization,
    }

    if (authors.length > 0) {
      jsonLd.author = authors.map((name) => ({
        '@type': 'Person',
        name,
      }))
    }
  }

  if (images.length > 0) {
    jsonLd.image = images
  }

  if (datePublished) {
    jsonLd.datePublished = datePublished
  }

  if (dateModified) {
    jsonLd.dateModified = dateModified
  }

  if (mainEntityOfPage) {
    jsonLd.mainEntityOfPage = {
      '@type': 'WebPage',
      '@id': jsonLd.url,
    }
  }

  if (breadcrumb) {
    jsonLd.breadcrumb = {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumb.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    }
  }

  if (itemList && type === 'CollectionPage') {
    jsonLd.hasPart = itemList.map((item) => ({
      '@type': 'MusicRecording',
      name: item.name,
      url: item.url,
      description: item.description,
      image: item.image,
      datePublished: item.datePublished,
      ...(item.performer && {
        byArtist: item.performer.map((name) => ({
          '@type': 'Person',
          name,
        })),
      }),
    }))
  }

  if (type === 'VideoObject' && video) {
    jsonLd = {
      ...jsonLd,
      ...video,
      '@type': 'VideoObject',
    }
  }

  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
