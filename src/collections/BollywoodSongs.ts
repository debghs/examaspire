import React from 'react'
import { createdByField } from '@/fields/createdBy'
import { slugField } from '@/fields/slug'
import {
  isAdmin,
  isAdminFieldLevel,
  isBollywoodContentCreatorOrSelf,
} from '@/hooks/payload/accessControl'
import { CollectionConfig, CollectionSlug } from 'payload'
import SongPlayer from '@/fields/SongPlayer'
import { createRevalidateHook, createRevalidateDeleteHook } from '@/hooks/revalidate'
import { BollywoodSong } from '@/payload-types'

export const BollywoodSongs: CollectionConfig = {
  slug: 'bollywoodSongs',
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 30,
  },
  access: {
    create: isBollywoodContentCreatorOrSelf,
    read: isBollywoodContentCreatorOrSelf,
    update: isBollywoodContentCreatorOrSelf,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    ...slugField('name'),
    createdByField,
    {
      name: 'songImageCover',
      type: 'upload',
      relationTo: 'bollywoodMedia',
    },
    {
      name: 'taal',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      relationTo: 'taals' as CollectionSlug,
      required: true,
      maxDepth: 1,
    },
    {
      name: 'raag',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      relationTo: 'raags' as CollectionSlug,
      required: true,
      maxDepth: 1,
    },
    {
      name: 'isMishra',
      type: 'radio',
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
      ],
      defaultValue: 'no',
      label: 'Is Raag in Mishra Form?',
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      relationTo: 'songCategories' as CollectionSlug,
      required: true,
      hasMany: true,
    },
    {
      name: 'songVoice',
      admin: {
        position: 'sidebar',
      },
      type: 'select',
      options: [
        'Male',
        'Female',
        'Male-Male Duet',
        'Female-Female Duet',
        'Male-Female Duet',
        'Chorus',
      ],
      required: true,
    },
    {
      name: 'youtubeLink',
      admin: {
        position: 'sidebar',
      },
      type: 'text',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'movieName',
          type: 'text',
          required: true,
        },
        {
          name: 'year',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'singer',
      type: 'relationship',
      relationTo: 'bollywoodSingers' as CollectionSlug,
      hasMany: true,
      required: true,
      maxDepth: 1,
    },
    {
      name: 'actor',
      type: 'relationship',
      relationTo: 'actors' as CollectionSlug,
      hasMany: true,
      maxDepth: 1,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'lyricist',
          type: 'relationship',
          relationTo: 'lyricists' as CollectionSlug,
          hasMany: true,
          maxDepth: 1,
        },
        {
          name: 'musicDirector',
          type: 'relationship',
          relationTo: 'musicDirector' as CollectionSlug,
          hasMany: true,
          maxDepth: 1,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'sthaayiNotation',
          type: 'upload',
          relationTo: 'bollywoodMedia',
        },
        {
          name: 'sthaayiAudio',
          type: 'upload',
          relationTo: 'bollywoodMedia',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'antaraNotation',
          type: 'upload',
          relationTo: 'bollywoodMedia',
        },
        {
          name: 'antaraAudio',
          type: 'upload',
          relationTo: 'bollywoodMedia',
        },
      ],
    },
    {
      name: 'songExcelFile',
      type: 'upload',
      hasMany: true,
      relationTo: 'bollywoodMedia',
    },
    {
      name: 'lyrics',
      type: 'richText',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
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
  ],
  hooks: {
    afterChange: [
      createRevalidateHook((doc: BollywoodSong) => {
        const paths = [
          `/bollywood-songs`,
          `/bollywood-songs/${doc.slug}`,
          `/bollywood-songs/actor`,
          `/bollywood-songs/singer`,
          `/bollywood-songs/category`,
          `/bollywood-songs/taal`,
          `/bollywood-songs/raag`,
          `/bollywood-songs/lyricist`,
          `/bollywood-songs/music-director`,
        ]

        // Add relationship paths for ALL actors
        if (doc.actor?.length) {
          doc.actor.forEach((actor) => {
            if (actor && typeof actor !== 'number') {
              paths.push(`/bollywood-songs/actor/${actor.slug}`)
            }
          })
        }

        // Add relationship paths for ALL singers
        if (doc.singer?.length) {
          doc.singer.forEach((singer) => {
            if (singer && typeof singer !== 'number') {
              paths.push(`/bollywood-songs/singer/${singer.slug}`)
            }
          })
        }

        // Taal is not an array, keep as is
        if (doc.taal && typeof doc.taal !== 'number') {
          paths.push(`/bollywood-songs/taal/${doc.taal.slug}`)
        }

        // Raag is not an array, keep as is
        if (doc.raag && typeof doc.raag !== 'number') {
          paths.push(`/bollywood-songs/raag/${doc.raag.slug}`)
        }

        // Add relationship paths for ALL lyricists
        if (doc.lyricist?.length) {
          doc.lyricist.forEach((lyricist) => {
            if (lyricist && typeof lyricist !== 'number') {
              paths.push(`/bollywood-songs/lyricist/${lyricist.slug}`)
            }
          })
        }

        // Add relationship paths for ALL music directors
        if (doc.musicDirector?.length) {
          doc.musicDirector.forEach((director) => {
            if (director && typeof director !== 'number') {
              paths.push(`/bollywood-songs/music-director/${director.slug}`)
            }
          })
        }

        // Add relationship paths for ALL categories
        if (doc.category?.length) {
          doc.category.forEach((category) => {
            if (category && typeof category !== 'number') {
              paths.push(`/bollywood-songs/category/${category.slug}`)
            }
          })
        }

        return paths
      }),
    ],
    afterDelete: [
      createRevalidateDeleteHook((doc) => {
        const paths = [
          `/bollywood-songs`,
          `/bollywood-songs/${doc.slug}`,
          `/bollywood-songs/actor`,
          `/bollywood-songs/singer`,
          `/bollywood-songs/songCategory`,
        ]

        // Add relationship paths only if they exist
        if (doc.actor?.length && doc.actor[0] && typeof doc.actor[0] !== 'number') {
          paths.push(`/bollywood-songs/actor/${doc.actor[0].slug}`)
        }

        if (doc.singer?.length && doc.singer[0] && typeof doc.singer[0] !== 'number') {
          paths.push(`/bollywood-songs/singer/${doc.singer[0].slug}`)
        }

        if (doc.taal && typeof doc.taal !== 'number') {
          paths.push(`/bollywood-songs/taal/${doc.taal.slug}`)
        }

        if (doc.raag && typeof doc.raag !== 'number') {
          paths.push(`/bollywood-songs/raag/${doc.raag.slug}`)
        }

        if (doc.lyricist?.length && doc.lyricist[0] && typeof doc.lyricist[0] !== 'number') {
          paths.push(`/bollywood-songs/lyricist/${doc.lyricist[0].slug}`)
        }

        if (
          doc.musicDirector?.length &&
          doc.musicDirector[0] &&
          typeof doc.musicDirector[0] !== 'number'
        ) {
          paths.push(`/bollywood-songs/music-director/${doc.musicDirector[0].slug}`)
        }

        if (doc.category?.length && doc.category[0] && typeof doc.category[0] !== 'number') {
          paths.push(`/bollywood-songs/category/${doc.category[0].slug}`)
        }

        return paths
      }),
    ],
  },
}
