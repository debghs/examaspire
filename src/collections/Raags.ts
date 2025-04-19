import { createdByField } from '@/fields/createdBy'
import { slugField } from '@/fields/slug'
import {
  isAdmin,
  isAdminFieldLevel,
  isClassicalContentCreatorFieldLevel,
  isClassicalContentCreatorOrSelf,
} from '@/hooks/payload/accessControl'
import { CollectionConfig } from 'payload'
import { createRevalidateHook, createRevalidateDeleteHook } from '@/hooks/revalidate'
import { preventDeletionFactory } from '@/hooks/payload/preventDeletion'

const preventRaagDeletion = preventDeletionFactory(
  [
    { collection: 'bollywoodSongs', name: 'Bollywood Songs', field: 'raag' },
    { collection: 'videos', name: 'Videos', field: 'raag' },
  ],
  'This Raag cannot be deleted as it is referenced in',
)

const komalTeevraSwar = [
  {
    label: 'Komal Re',
    value: 'komalRe',
  },
  {
    label: 'Komal Ga',
    value: 'komalGa',
  },
  {
    label: 'Teevra Ma',
    value: 'teevraMa',
  },
  {
    label: 'Komal Dha',
    value: 'komalDha',
  },
  {
    label: 'Komal Ni',
    value: 'komalNi',
  },
]

const allSwars = [
  {
    label: 'Mandra Komal Dha',
    value: 'mandraKomalDha',
  },
  {
    label: 'Mandra Dha',
    value: 'mandraDha',
  },
  {
    label: 'Mandra Komal Ni',
    value: 'mandraKomalNi',
  },
  {
    label: 'Mandra Ni',
    value: 'mandraNi',
  },
  {
    label: 'Sa',
    value: 'sa',
  },
  {
    label: 'Komal Re',
    value: 'komalRe',
  },
  {
    label: 'Re',
    value: 're',
  },
  {
    label: 'Komal Ga',
    value: 'komalGa',
  },
  {
    label: 'Ga',
    value: 'ga',
  },
  {
    label: 'Ma',
    value: 'ma',
  },
  {
    label: 'Teevra Ma',
    value: 'teevraMa',
  },
  {
    label: 'Pa',
    value: 'pa',
  },
  {
    label: 'Komal Dha',
    value: 'komalDha',
  },
  {
    label: 'Dha',
    value: 'dha',
  },
  {
    label: 'Komal Ni',
    value: 'komalNi',
  },
  {
    label: 'Ni',
    value: 'ni',
  },
  {
    label: 'Taar Sa',
    value: 'taarSa',
  },
  {
    label: 'Taar Komal Re',
    value: 'taarKomalRe',
  },
  {
    label: 'Taar Re',
    value: 'taarRe',
  },
  {
    label: 'Taar Komal Ga',
    value: 'taarKomalGa',
  },
  {
    label: 'Taar Ga',
    value: 'taarGa',
  },
  {
    label: ',',
    value: 'comma',
  },
]

type RaagTime = {
  label: string
  value: string
  description: string
}

export const raagTimes: RaagTime[] = [
  {
    label: '04:00 AM to 07:00 AM (Raat ka 4th Prahar)',
    value: '4AM_TO_7AM',
    description:
      '4th Prahar of the night - 04:00 AM to 07:00 AM. Early Dawn; Dawn (before sunrise)',
  },
  {
    label: '07:00 AM to 10:00 AM (Din ka 1st Prahar)',
    value: '7AM_TO_10AM',
    description: 'First Prahar of the day - 07:00 AM to 10:00 AM. Daybreak; Early Morning; Morning',
  },
  {
    label: '10:00 AM to 01:00 PM (Din ka 2nd Prahar)',
    value: '10AM_TO_1PM',
    description:
      '2nd Prahar of the day - 10:00 AM to 01:00 PM. Late Morning; Noon; Early Afternoon',
  },
  {
    label: '01:00 PM to 04:00 PM (Din ka 3rd Prahar)',
    value: '1PM_TO_4PM',
    description: '3rd Prahar of the day - 01:00 PM to 04:00 PM. Afternoon; Late Afternoon',
  },
  {
    label: '04:00 PM to 07:00 PM (Din ka 4th Prahar)',
    value: '4PM_TO_7PM',
    description: '4th Prahar of the day - 04:00 PM to 07:00 PM. Evening Twilight; Dusk (sunset)',
  },
  {
    label: '07:00 PM to 10:00 PM (Raat ka 1st Prahar)',
    value: '7PM_TO_10PM',
    description: '1st Prahar of the night - 07:00 PM to 10:00 PM. Evening; Late Evening',
  },
  {
    label: '10:00 PM to 01:00 AM (Raat ka 2nd Prahar)',
    value: '10PM_TO_1AM',
    description: '2nd Prahar of the night - 10:00 PM to 01:00 AM. Night; Midnight',
  },
  {
    label: '01:00 AM to 04:00 AM (Raat ka 3rd Prahar)',
    value: '1AM_TO_4AM',
    description: '3rd Prahar of the night - 01:00 AM to 04:00 AM. Late Night',
  },
]

export const Raags: CollectionConfig = {
  slug: 'raags',
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 30,
  },
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: isClassicalContentCreatorOrSelf,
    update: isClassicalContentCreatorOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'thaat',
          type: 'select',
          options: [
            'Kalyan',
            'Bhairav',
            'Marwa',
            'Kafi',
            'Asavari',
            'Bhairavi',
            'Poorvi',
            'Todi',
            'Bilawal',
            'Khamaj',
          ],
          required: true,
        },
        {
          name: 'time',
          type: 'select',
          options: raagTimes,
        },
      ],
    },

    // Swar Parichay
    {
      type: 'collapsible',
      label: 'Swar Parichay',
      access: {
        read: isClassicalContentCreatorFieldLevel,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'aarohKomalteevraSwar',
              label: 'Aaroh Komal & Teevra Swar',
              type: 'select',
              options: komalTeevraSwar,
              hasMany: true,
            },
            {
              name: 'aarohVarjitSwar',
              type: 'select',
              options: [
                { label: 'Re', value: 'Re' },
                { label: 'Ga', value: 'Ga' },
                { label: 'Ma', value: 'Ma' },
                { label: 'Pa', value: 'Pa' },
                { label: 'Dha', value: 'Dha' },
                { label: 'Ni', value: 'Ni' },
              ],
              hasMany: true,
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'avrohKomalteevraSwar',
              label: 'Avroh Komal & Teevra Swar',
              type: 'select',
              options: komalTeevraSwar,
              hasMany: true,
            },
            {
              name: 'avrohVarjitSwar',
              type: 'select',
              options: [
                { label: 'Re', value: 'Re' },
                { label: 'Ga', value: 'Ga' },
                { label: 'Ma', value: 'Ma' },
                { label: 'Pa', value: 'Pa' },
                { label: 'Dha', value: 'Dha' },
                { label: 'Ni', value: 'Ni' },
              ],
              hasMany: true,
            },
          ],
        },
        {
          name: 'swarParichay',
          type: 'richText',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'jaati',
              type: 'select',
              options: [
                'Sampoorna-Sampoorna',
                'Sampoorna-Shaadava',
                'Sampoorna-Audava',
                'Shaadava-Sampoorna',
                'Shaadava-Shaadava',
                'Shaadava-Audava',
                'Audava-Sampoorna',
                'Audava-Shaadava',
                'Audava-Audava',
              ],
            },
            {
              name: 'isJaatiVakra',
              type: 'radio',
              options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ],
              defaultValue: 'no',
            },
            {
              name: 'vaadi',
              type: 'select',
              options: allSwars,
            },
            {
              name: 'samvaadi',
              type: 'select',
              options: allSwars,
            },
          ],
        },
      ],
    },

    // Aaroh & Avroh
    {
      type: 'collapsible',
      label: 'Aaroh & Avroh',
      access: {
        read: isClassicalContentCreatorFieldLevel,
      },
      fields: [
        {
          name: 'aaroh',
          type: 'array',
          fields: [
            {
              name: 'swar',
              type: 'select',
              options: allSwars,
            },
          ],
        },
        {
          name: 'avroh',
          type: 'array',
          fields: [
            {
              name: 'swar',
              type: 'select',
              options: allSwars,
            },
          ],
        },
        {
          name: 'pakad',
          type: 'array',
          fields: [
            {
              name: 'swar',
              type: 'select',
              options: allSwars,
            },
          ],
        },
      ],
    },

    // Raag Notations
    {
      type: 'collapsible',
      label: 'Notation',
      access: {
        read: isClassicalContentCreatorFieldLevel,
      },
      fields: [
        {
          name: 'sargamNotations',
          type: 'array',
          fields: [
            {
              name: 'sargamContent',
              type: 'richText',
            },
            {
              name: 'sargamNotation',
              type: 'upload',
              relationTo: 'classicalMedia',
            },
            {
              name: 'sargamAudio',
              type: 'upload',
              relationTo: 'classicalMedia',
            },
            {
              name: 'sargamExcel',
              type: 'upload',
              relationTo: 'classicalMedia',
            },
          ],
          label: 'Sargam Notations',
        },
        {
          name: 'chhotaKhayalNotations',
          label: 'Chhota Khayal Notations',
          type: 'array',
          fields: [
            {
              name: 'chhotaKhayalName',
              type: 'text',
            },
            {
              name: 'chhotaKhayalContent',
              type: 'richText',
            },
            {
              name: 'chhotaKhayalNotation',
              type: 'upload',
              relationTo: 'classicalMedia',
            },
            {
              name: 'chhotaKhayalAudio',
              type: 'upload',
              relationTo: 'classicalMedia',
            },
            {
              name: 'chhotaKhayalExcel',
              type: 'upload',
              relationTo: 'classicalMedia',
            },
          ],
        },
        {
          name: 'otherBandishNotations',
          label: 'Other Bandishes Notations',
          type: 'array',
          fields: [
            {
              name: 'otherBandishName',
              type: 'text',
            },
            {
              name: 'otherBandishContent',
              type: 'richText',
            },
            {
              name: 'otherBandishNotation',
              type: 'upload',
              relationTo: 'classicalMedia',
            },
            {
              name: 'otherBandishAudio',
              type: 'upload',
              relationTo: 'classicalMedia',
            },
            {
              name: 'otherBandishExcel',
              type: 'upload',
              relationTo: 'classicalMedia',
            },
          ],
        },
        {
          name: 'taanNotation',
          type: 'upload',
          relationTo: 'classicalMedia',
        },
      ],
    },

    {
      name: 'description',
      type: 'richText',
      access: {
        read: isClassicalContentCreatorFieldLevel,
      },
    },
    // Join with Bollywood Songs
    {
      name: 'relatedBollywoodSongs',
      type: 'join',
      collection: 'bollywoodSongs',
      on: 'raag',
      defaultLimit: 0,
      maxDepth: 3,
      admin: {
        position: 'sidebar',
      },
    },
    // Join with Videos
    {
      name: 'relatedVideos',
      type: 'join',
      collection: 'videos',
      on: 'raag',
      defaultLimit: 0,
      maxDepth: 3,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'comments',
      access: {
        create: isAdminFieldLevel,
        read: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      type: 'richText',
    },
    ...slugField('name'),
    createdByField,
  ],
  hooks: {
    beforeDelete: [preventRaagDeletion],
    afterChange: [createRevalidateHook((doc) => [`/raag`, `/raag/${doc.slug}`])],
    afterDelete: [createRevalidateDeleteHook((doc) => [`/raag`, `/raag/${doc.slug}`])],
  },
}
