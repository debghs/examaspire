import { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'

export const beforeSyncWithSearch: BeforeSync = async ({ originalDoc, searchDoc }) => {
  const {
    doc: { relationTo: collection },
  } = searchDoc

  // Extract all possible fields that could contain searchable content
  const {
    id,
    slug = '',
    title = '',
    name = '', // For collections that use name instead of title
    description = '',
    excerpt = '', // For rich text content
    // Additional fields for Raags
    thaat = '',
    swarParichay = '',
    jaati = '',
    // Additional fields for Bollywood Songs
    movieName = '',
    year = '',
    lyrics = '',
    // Relationship fields for Bollywood Songs
    singer = [],
    actor = [],
    lyricist = [],
    musicDirector = [],
    raag = null,
    taal = null,
  } = originalDoc

  // Determine the document title based on collection type
  let docTitle = title || name || ''
  let searchableContent = ''

  // Generate the href for each document type
  let href = ''

  // Convert rich text to searchable text
  const richTextToPlainText = (richText: any): string => {
    if (!richText?.root?.children) return ''
    return richText.root.children
      .map((node: any) => node.text || '')
      .join(' ')
      .trim()
  }

  // Helper to safely get name from relationship
  const getRelationshipName = (rel: any): string => {
    if (!rel) return ''
    // Handle array of relationships
    if (Array.isArray(rel)) {
      return rel
        .map((item) => {
          if (typeof item === 'object') {
            // Handle polymorphic relationships
            if ('value' in item && typeof item.value === 'object') {
              return item.value.name || ''
            }
            // Handle direct relationships
            return item.name || ''
          }
          return ''
        })
        .filter(Boolean)
        .join(' ')
    }
    // Handle single polymorphic relationship
    if (typeof rel === 'object' && 'value' in rel && typeof rel.value === 'object') {
      return rel.value.name || ''
    }
    // Handle single direct relationship
    if (typeof rel === 'object') {
      return rel.name || ''
    }
    return ''
  }

  // Handle collection-specific fields
  switch (collection) {
    case 'videos':
      docTitle = title || ''
      href = `/videos/${slug}`
      searchableContent = [title, richTextToPlainText(description)].filter(Boolean).join(' | ')
      break
    case 'blogs':
      docTitle = title || ''
      href = `/blog/${slug}`
      searchableContent = [title, richTextToPlainText(excerpt)].filter(Boolean).join(' | ')
      break
    case 'raags':
      docTitle = name || ''
      href = `/raag/${slug}`
      searchableContent = [
        thaat,
        richTextToPlainText(swarParichay),
        richTextToPlainText(description),
        jaati,
      ]
        .filter(Boolean)
        .join(' | ')
      break
    case 'bollywoodSongs':
      docTitle = name || ''
      href = `/bollywood-songs/${slug}`

      const singerNames = getRelationshipName(singer)
        ? `Singers: ${getRelationshipName(singer)}`
        : ''
      const actorNames = getRelationshipName(actor) ? `Actors: ${getRelationshipName(actor)}` : ''
      const lyricistNames = getRelationshipName(lyricist)
        ? `Lyricist: ${getRelationshipName(lyricist)}`
        : ''
      const directorNames = getRelationshipName(musicDirector)
        ? `Directors: ${getRelationshipName(musicDirector)}`
        : ''
      const raagName = getRelationshipName(raag) ? `Raag ${getRelationshipName(raag)}` : ''
      const taalName = getRelationshipName(taal) ? `Taal: ${getRelationshipName(taal)}` : ''

      searchableContent = [
        movieName,
        year,
        richTextToPlainText(lyrics),
        richTextToPlainText(description),
        singerNames,
        actorNames,
        lyricistNames,
        directorNames,
        raagName,
        taalName,
      ]
        .filter(Boolean)
        .join(' | ')
      break
    case 'bollywoodSingers':
      docTitle = name || ''
      href = `/bollywood-songs/singer/${slug}`
      break
    case 'raagSingers':
      docTitle = name || ''
      href = `singer/${slug}`
      break
    case 'lyricists':
      docTitle = name || ''
      href = `/bollywood-songs/lyricist/${slug}`
      break
    case 'actors':
      docTitle = name || ''
      href = `/bollywood-songs/actor/${slug}`
      break
    case 'songCategories':
      docTitle = name || ''
      href = `/bollywood-songs/category/${slug}`
      break
    case 'musicDirector':
      docTitle = name || ''
      href = `/bollywood-songs/music-director/${slug}`
      break
    case 'taals':
      docTitle = name || ''
      href = `/taal/${slug}`
      break
    case 'pages':
      docTitle = title || ''
      href = `/${slug}`
      break
    default:
      href = `/${collection}/${slug}`
  }

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    title: docTitle,
    slug,
    href,
    searchableContent,
  }

  return modifiedDoc
}
