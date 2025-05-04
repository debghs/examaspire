import type { Metadata } from 'next'
import type {
  Media,
  Page,
  Config,
  Exam,
  Question,
  Result,
  Submission,
  User
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
  | Exam
  | Result
  | Submission
  | Question

interface GenerateMetaArgs {
  doc: MetaDoc | null
  type?:
    | 'exam'
    | 'result'
    | 'submission'
    | 'question'
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

// Type guards for exam-related types
const isExam = (doc: MetaDoc): doc is Exam => {
  return 'questions' in doc && 'duration' in doc && 'totalMarks' in doc
}

const isResult = (doc: MetaDoc): doc is Result => {
  return 'score' in doc && 'percentage' in doc && 'correctAnswers' in doc
}

const isSubmission = (doc: MetaDoc): doc is Submission => {
  return 'answers' in doc && 'startTime' in doc && 'student' in doc
}

const isPage = (doc: MetaDoc): doc is Page => {
  return 'meta' in doc && !('questions' in doc) && !('score' in doc) && !('answers' in doc)
}

// Helper function to safely get image URL
const getDocImage = (doc: MetaDoc): Media | number | null | undefined => {
  if ('image' in doc && doc.image) {
    return doc.image
  }
  if ('coverImage' in doc && doc.coverImage) {
    return doc.coverImage as Media | number | null | undefined
  }
  return null
}

export const generateMeta = async (args: GenerateMetaArgs): Promise<Metadata> => {
  const { doc, type = 'page' } = args

  if (!doc) {
    return {}
  }

  const ogImage = getImageURL(getDocImage(doc))
  const baseTitle = 'ExamAspire'
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
            : descriptionText || 'Prepare for your exams with confidence'
      const metaImage = getImageURL(doc.meta?.image || getDocImage(doc))

      return createMetadata({
        title: metaTitle,
        description: metaDescription,
        ogImage: metaImage,
        urlPath: `/${slug}`,
      })
    }

    case 'exam': {
      if (!isExam(doc)) return {}
      const title = doc.title ? `${doc.title} | ${baseTitle}` : baseTitle
      const description =
        descriptionText ||
        `Prepare for ${doc.title} - ${doc.duration} minutes exam with ${doc.totalMarks} total marks.`
      const keywords = [
        'online exam',
        'exam preparation',
        doc.title,
        'practice test',
        'mock exam',
        'exam portal',
        ...(doc.tags || []),
      ].filter(Boolean).join(', ')

      return createMetadata({
        title,
        description,
        keywords,
        ogImage,
        urlPath: `/exams/${slug}`,
      })
    }

    case 'result': {
      if (!isResult(doc)) return {}
      const title = `Exam Result | ${baseTitle}`
      const description = descriptionText || `View your exam results and performance analysis.`
      const keywords = [
        'exam results',
        'score analysis',
        'performance report',
        'exam feedback',
      ].join(', ')

      return createMetadata({
        title,
        description,
        keywords,
        ogImage,
        urlPath: `/results/${slug}`,
      })
    }

    case 'submission': {
      if (!isSubmission(doc)) return {}
      const title = `Exam Submission | ${baseTitle}`
      const description = descriptionText || `Review your exam submission and answers.`
      const keywords = [
        'exam submission',
        'answer review',
        'submitted answers',
        'exam responses',
      ].join(', ')

      return createMetadata({
        title,
        description,
        keywords,
        ogImage,
        urlPath: `/submissions/${slug}`,
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
