import { postgresAdapter } from '@payloadcms/db-postgres'
import path from 'path'
import { buildConfig, /* PayloadRequest */ } from 'payload'
import { fileURLToPath } from 'url'
// import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import sharp from 'sharp'

import { collectionsList } from './config/collections'
import Users from './collections/Users'
import { allBlocksList } from './config/blocks'
import { pluginsList } from './config/plugins'
import { editorConfig } from './config/editor'
import { Nav } from './globals/Nav/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      collections: ['pages'],
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  blocks: allBlocksList,
  globals: [Nav],
  collections: collectionsList,
  editor: editorConfig,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
//   email: nodemailerAdapter({
//     defaultFromAddress: 'prannaykedia4@gmail.com',
//     defaultFromName: 'AGK Sangeet',
//     // Nodemailer transportOptions
//     transportOptions: {
//       host: process.env.SMTP_HOST,
//       port: 587,
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     },
//   }),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: pluginsList,
  jobs: {
    autoRun: [
      {
        cron: '*/1 * * * *', //change this to whatever interval you would like, this now checks every minute
        limit: 10,
        queue: 'default',
      },
    ],
    tasks: [],
    shouldAutoRun: async () => true,
  },
})
