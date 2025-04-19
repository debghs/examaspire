import type { Metadata } from 'next'
import type {
  Media,
  Page,
  Blog,
  Config,
  Raag,
  BollywoodSong,
  Video,
  Taal,
  RaagSinger,
  Actor,
  Lyricist,
  MusicDirector,
  BollywoodSinger,
  SongCategory,
} from '../payload-types'
import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { richTextToPlainText } from './richTextToPlainText'

export const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()
  let url = process.env.S3_CDN_URL + '/agks-og-image.png'

  if (image && typeof image === 'object' && 'url' in image) {
    url = serverUrl + image.url
  }

  return url
}

type MetaDoc =
  | Page
  | Blog
  | BollywoodSong
  | BollywoodSinger
  | Raag
  | Taal
  | RaagSinger
  | Video
  | Actor
  | Lyricist
  | MusicDirector
  | SongCategory

interface GenerateMetaArgs {
  doc: MetaDoc | null
  type?:
    | 'blog'
    | 'bollywood-songs'
    | 'b-actor'
    | 'b-category'
    | 'b-lyricist'
    | 'b-music-director'
    | 'b-raag'
    | 'b-singer'
    | 'b-taal'
    | 'raag'
    | 'singer'
    | 'taal'
    | 'video'
    | 'page'
}

// Helper function to get both www and non-www URLs
const getCanonicalUrls = (serverUrl: string, path: string) => {
  const baseUrl = serverUrl.replace('https://www.', 'https://')
  const wwwUrl = baseUrl.replace('https://', 'https://www.')
  return {
    alternates: {
      canonical: baseUrl + path,
      languages: {
        'x-default': wwwUrl + path,
      },
    },
  }
}

// Helper function to create standardized metadata
const createMetadata = ({
  title,
  description,
  keywords,
  ogImage,
  urlPath,
}: {
  title: string
  description: string
  keywords?: string
  ogImage: string
  urlPath: string
}): Metadata => {
  const serverUrl = getServerSideURL()

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    openGraph: mergeOpenGraph({
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : undefined,
      url: serverUrl + urlPath,
    }),
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    ...getCanonicalUrls(serverUrl, urlPath),
  }
}

// Keep only the necessary type guards
const isBollywoodSong = (doc: MetaDoc): doc is BollywoodSong => {
  return 'movieName' in doc && 'year' in doc && 'singer' in doc
}

const isRaag = (doc: MetaDoc): doc is Raag => {
  return 'thaat' in doc && 'time' in doc && 'vaadi' in doc
}

const isTaal = (doc: MetaDoc): doc is Taal => {
  return 'matra' in doc && 'taali' in doc && 'khaali' in doc
}

const isPage = (doc: MetaDoc): doc is Page => {
  return 'meta' in doc && !('movieName' in doc) && !('thaat' in doc) && !('matra' in doc)
}

const isBlog = (doc: MetaDoc): doc is Blog => {
  return 'content' in doc && 'coverImage' in doc && 'excerpt' in doc
}

const isVideo = (doc: MetaDoc): doc is Video => {
  return 'videoLink' in doc && 'singer' in doc && !('movieName' in doc)
}

const isBollywoodIndividual = (doc: MetaDoc): doc is BollywoodSinger => {
  return 'gender' in doc && 'name' in doc && !('movieName' in doc)
}

const isSongCategory = (doc: MetaDoc): doc is SongCategory => {
  return 'name' in doc && !('gender' in doc) && !('movieName' in doc) && !('thaat' in doc)
}

// Helper function to safely get image URL
const getDocImage = (doc: MetaDoc): Media | number | null | undefined => {
  if ('image' in doc && doc.image) {
    return doc.image
  }
  if ('coverImage' in doc && doc.coverImage) {
    return doc.coverImage
  }
  return null
}

export const generateMeta = async (args: GenerateMetaArgs): Promise<Metadata> => {
  const { doc, type = 'page' } = args

  if (!doc) {
    return {}
  }

  const ogImage = getImageURL(getDocImage(doc))
  const baseTitle = 'AGK Sangeet'
  const slug = doc?.slug || ''

  // Helper function to get names from array of objects or numbers
  const getNames = (items: Array<{ name: string } | number> | null | undefined): string[] => {
    if (!items) return []
    return items
      .filter(
        (item): item is { name: string } =>
          typeof item === 'object' && item !== null && 'name' in item,
      )
      .map((item) => item.name)
  }

  // Get the description text from either string or rich text
  const descriptionText =
    'description' in doc
      ? typeof doc.description === 'string'
        ? doc.description
        : doc.description
          ? richTextToPlainText(doc.description)
          : ''
      : ''

  // Type-specific meta properties
  switch (type) {
    case 'page': {
      if (!isPage(doc)) return {}
      const metaTitle = doc.meta?.title || ('title' in doc ? doc.title : '') || baseTitle
      const metaDescription =
        typeof doc.meta?.description === 'string'
          ? doc.meta.description
          : doc.meta?.description
            ? richTextToPlainText(doc.meta.description)
            : descriptionText || 'Learn Indian Classical Music Online'
      const metaImage = getImageURL(doc.meta?.image || getDocImage(doc))

      return createMetadata({
        title: metaTitle,
        description: metaDescription,
        ogImage: metaImage,
        urlPath: `/${slug}`,
      })
    }

    case 'b-actor':
    case 'b-lyricist':
    case 'b-music-director':
    case 'b-singer': {
      if (!isBollywoodIndividual(doc)) return {}
      const title = doc.name ? `Bollywood Songs by ${doc.name} | ${baseTitle}` : baseTitle
      const description =
        descriptionText ||
        `Learn the notation, lyrics, raag, taal, and more of songs by ${doc.name.toLowerCase()} related content.`
      const keywords = [
        'indian classical music',
        doc.name,
        'bollywood songs',
        'bollywood music',
        'bollywood singers',
        'bollywood song notation',
        'bollywood song lyrics',
        'bollywood song raag',
        'bollywood song taal',
        `bollywood songs by ${doc.name}`,
      ].join(', ')

      return createMetadata({
        title,
        description,
        keywords,
        ogImage,
        urlPath: `/bollywood-songs/${type.replace('b-', '')}/${slug}`,
      })
    }

    case 'b-category': {
      if (!isSongCategory(doc)) return {}
      const title = doc.name ? `${doc.name} Bollywood Songs | ${baseTitle}` : baseTitle
      const description =
        descriptionText ||
        `Comprehensive list of ${doc.name.toLowerCase() || 'music'} songs in Bollywood with their notation, raag, taal and lyrics!`
      const keywords = [
        'indian classical music',
        doc.name,
        `${doc.name} bollywood songs`,
        `${doc.name} bollywood songs list`,
        `${doc.name} type of bollywood songs`,
      ].join(', ')

      return createMetadata({
        title,
        description,
        keywords,
        ogImage,
        urlPath: `/bollywood-songs/category/${slug}`,
      })
    }

    case 'b-raag':
    case 'b-taal': {
      if (type === 'b-raag') {
        if (!isRaag(doc)) return {}
        const name = doc.name
        const title = name ? `Bollywood Songs in Raag ${name} | ${baseTitle}` : baseTitle
        const description =
          descriptionText ||
          `Comprehensive list of Bollywood songs in ${name.toLowerCase() || 'music'} with their notation, raag, taal and lyrics!`
        const keywords = [
          'indian classical music',
          name,
          `raag ${name} bollywood songs`,
          `Bollywood songs in raag ${name}`,
          `raag ${name} bollywood songs list`,
        ].join(', ')

        return createMetadata({
          title,
          description,
          keywords,
          ogImage,
          urlPath: `/bollywood-songs/raag/${slug}`,
        })
      } else {
        if (!isTaal(doc)) return {}
        const name = doc.name
        const title = name ? `Bollywood Songs in ${name} Taal | ${baseTitle}` : baseTitle
        const description =
          descriptionText ||
          `Comprehensive list of Bollywood songs in ${name.toLowerCase() || 'music'} with their notation, raag, taal and lyrics!`
        const keywords = [
          'indian classical music',
          name,
          `taal ${name} bollywood songs`,
          `Bollywood songs in taal ${name}`,
          `taal ${name} bollywood songs list`,
        ].join(', ')

        return createMetadata({
          title,
          description,
          keywords,
          ogImage,
          urlPath: `/bollywood-songs/taal/${slug}`,
        })
      }
    }

    case 'raag': {
      if (!isRaag(doc)) return {}
      const title = doc.name ? `Raag ${doc.name} | ${baseTitle}` : baseTitle
      const description =
        descriptionText ||
        `Learn about Raag ${doc.name}, its characteristics, and musical compositions along with a list of bollywood songs in raag ${doc.name}.`
      const keywords = [
        'indian classical music',
        'raag',
        `Raag ${doc.name}`,
        `Thaat ${doc.thaat}`,
        doc.time,
        `${doc.jaati} Raag`,
        `Vaadi ${doc.vaadi}`,
        `Samvaadi ${doc.samvaadi}`,
        `Bollywood songs in raag ${doc.name}`,
        `Bandish in raag ${doc.name}`,
        `Taan in raag ${doc.name}`,
        `Vilambit in raag ${doc.name}`,
        `Chhota Khayal in raag ${doc.name}`,
      ]
        .filter(Boolean)
        .join(', ')

      return createMetadata({
        title,
        description,
        keywords,
        ogImage,
        urlPath: `/raag/${slug}`,
      })
    }

    case 'taal': {
      if (!isTaal(doc)) return {}
      const title = doc.name ? `Taal ${doc.name} | ${baseTitle}` : baseTitle
      const description =
        descriptionText ||
        `Learn about Taal ${doc.name}, its characteristics, and musical compositions in this taal.`
      const keywords = ['indian classical music', 'taal', `${doc.name} Taal`]
        .filter(Boolean)
        .join(', ')

      return createMetadata({
        title,
        description,
        keywords,
        ogImage,
        urlPath: `/taal/${slug}`,
      })
    }

    case 'bollywood-songs': {
      if (!isBollywoodSong(doc)) return {}
      const title = doc.name
        ? `${doc.name} | ${doc.movieName} (${doc.year}) | ${baseTitle}`
        : baseTitle
      const description =
        descriptionText ||
        `Learn the notation, lyrics, raag, taal, and more of ${doc.name} from ${doc.movieName} (${doc.year}) by ${getNames(doc.singer).join(', ')}.`
      const keywords = [
        'bollywood songs',
        'music notation',
        doc.name,
        `${doc.name} notation`,
        `${doc.name} lyrics`,
        `${doc.name} raag`,
        `${doc.name} taal`,
        doc.movieName,
        doc.year,
        ...getNames(doc.singer),
        ...getNames(doc.musicDirector),
        ...getNames(doc.lyricist),
        typeof doc.raag === 'object' && 'name' in doc.raag ? doc.raag.name : '',
        typeof doc.taal === 'object' && 'name' in doc.taal ? doc.taal.name : '',
      ]
        .filter(Boolean)
        .join(', ')

      return createMetadata({
        title,
        description,
        keywords,
        ogImage,
        urlPath: `/bollywood-songs/${slug}`,
      })
    }

    case 'singer': {
      const singer = doc as RaagSinger
      const title = singer.name ? `${singer.name} | ${baseTitle}` : baseTitle
      const description =
        descriptionText ||
        `Learn more about Singer - ${singer.name}, her/his contributions to Indian classical music and a list of their videos.`
      const keywords = ['indian classical music', 'singer', `${singer.name}`]
        .filter(Boolean)
        .join(', ')

      return createMetadata({
        title,
        description,
        keywords,
        ogImage,
        urlPath: `/singer/${slug}`,
      })
    }

    case 'video': {
      if (!isVideo(doc)) return {}
      const title = doc.title ? `${doc.title} | ${baseTitle}` : baseTitle
      const description =
        descriptionText ||
        `Watch ${doc.title} - A musical performance & training video by ${getNames(doc.singer).join(', ')}.`
      const keywords = [
        'learn indian classical music',
        'music video',
        doc.title,
        ...getNames(doc.singer),
        doc.raag && typeof doc.raag === 'object' && 'name' in doc.raag ? doc.raag.name : '',
        ...(doc.tags || []),
      ]
        .filter(Boolean)
        .join(', ')

      return createMetadata({
        title,
        description,
        keywords,
        ogImage,
        urlPath: `/videos/${slug}`,
      })
    }

    default: {
      if (!('title' in doc)) return {}
      const title = doc?.title ? `${doc.title} | ${baseTitle}` : baseTitle

      return createMetadata({
        title,
        description: descriptionText,
        ogImage,
        urlPath: `/${type}/${slug}`,
      })
    }
  }
}
