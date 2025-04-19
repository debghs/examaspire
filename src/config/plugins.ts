import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { s3Storage } from '@payloadcms/storage-s3'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { getServerSideURL } from '@/utilities/getURL'
import {
  GenerateDescription,
  GenerateImage,
  GenerateTitle,
  GenerateURL,
} from '@payloadcms/plugin-seo/types'
import { Page } from '@/payload-types'
import { searchPlugin } from '@payloadcms/plugin-search'
import { beforeSyncWithSearch } from '@/search/beforeSync'

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | AGK Sangeet` : 'AGK Sangeet'
}

const generateURL: GenerateURL<Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

const generateDescription: GenerateDescription<Page> = ({ doc }) => {
  return doc?.title
    ? `${doc.title} - AGK Sangeet`
    : 'AGK Sangeet - Indian Classical and Bollywood Music'
}

const generateImage: GenerateImage<Page> = ({ doc }) => {
  return process.env.S3_CDN_URL + '/agks-og-image.png'
}

export const pluginsList = [
  searchPlugin({
    collections: [
      'pages',
      // 'blogs',
      // 'raags',
      // 'videos',
      // 'bollywoodSongs',
      // 'bollywoodSingers',
      // 'raagSingers',
      // 'lyricists',
      // 'actors',
      // 'taals',
      // 'songCategories',
      // 'musicDirector',
    ],
    beforeSync: beforeSyncWithSearch,
    // Adjust priorities to emphasize main content collections
    defaultPriorities: {
      pages: 8,
      // blogs: 7,
      // // Increase priority for raags and bollywoodSongs as they're core content
      // raags: 10,
      // videos: 9,
      // bollywoodSongs: 10,
      // bollywoodSingers: 6,
      // raagSingers: 6,
      // lyricists: 6,
      // actors: 6,
      // taals: 7, // Increase taal priority as it's a core musical concept
      // subheadings: 4,
      // songCategories: 5,
      // musicDirectors: 6,
    },
    // Add searchableContent field to search collection
    searchOverrides: {
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: 'searchableContent',
          type: 'text',
          admin: {
            readOnly: true,
            hidden: true, // Hide in admin UI since we use description
          },
        },
        {
          name: 'href',
          type: 'text',
          admin: {
            readOnly: true,
          },
        },
      ],
    },
  }),
  seoPlugin({
    collections: ['pages'],
    tabbedUI: true,
    uploadsCollection: 'media',
    generateTitle,
    generateDescription,
    generateImage,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      text: true,
      textarea: true,
      select: true,
      email: true,
      state: true,
      country: true,
      checkbox: true,
      number: true,
      message: true,
      payment: false,
    },
    //defaultToEmail: 'a default email address to send the form data to',
    formOverrides: {
      admin: {
        group: 'Forms',
      },
    },
    formSubmissionOverrides: {
      admin: {
        group: 'Forms',
      },
    },
  }),
  s3Storage({
    collections: {
      media: {
        prefix: 'media',
        generateFileURL: ({ prefix, filename }) =>
          `${process.env.S3_CDN_URL}/${prefix}/${filename}`,
      },
      classicalMedia: {
        prefix: 'classical',
        generateFileURL: ({ prefix, filename }) =>
          `${process.env.S3_CDN_URL}/${prefix}/${filename}`,
      },
      bollywoodMedia: {
        prefix: 'bollywood',
        generateFileURL: ({ prefix, filename }) =>
          `${process.env.S3_CDN_URL}/${prefix}/${filename}`,
      },
    },
    config: {
      endpoint: process.env.S3_ENDPOINT,
      region: process.env.S3_REGION,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY as string,
        secretAccessKey: process.env.S3_SECRET_KEY as string,
      },
    },
    bucket: process.env.S3_BUCKET_NAME as string,
  }),
]
