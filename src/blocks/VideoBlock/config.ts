import type { Block } from 'payload'

export const VideoBlock: Block = {
  slug: 'video',
  interfaceName: 'VideoBlock',
  fields: [
    {
      name: 'source',
      type: 'select',
      required: true,
      defaultValue: 'upload',
      options: [
        { label: 'Upload Video', value: 'upload' },
        { label: 'YouTube', value: 'youtube' },
      ],
    },
    {
      name: 'uploadedVideo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload or select a video file',
        condition: (data, siblingData) => siblingData?.source === 'upload',
      },
    },
    {
      name: 'embedUrl',
      type: 'text',
      admin: {
        placeholder: 'Enter video URL (e.g., YouTube or Vimeo link)',
        description: 'Paste the full video URL',
        condition: (data, siblingData) => siblingData?.source === 'youtube',
      },
    },
    {
      name: 'content',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: {
            placeholder: 'Enter video title',
          },
        },
        {
          name: 'caption',
          type: 'text',
          admin: {
            placeholder: 'Enter video caption (optional)',
          },
        },
      ],
    },
    {
      name: 'appearance',
      type: 'group',
      fields: [
        {
          name: 'width',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'Default (Container)', value: 'default' },
            { label: 'Wide', value: 'wide' },
            { label: 'Full Width', value: 'full' },
          ],
        },
        {
          name: 'aspectRatio',
          type: 'select',
          defaultValue: '16/9',
          options: [
            { label: '16:9', value: '16/9' },
            { label: '4:3', value: '4/3' },
            { label: '1:1', value: '1/1' },
          ],
        },
        {
          name: 'roundedCorners',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Default', value: 'default' },
            { label: 'Large', value: 'large' },
          ],
        },
      ],
    },
    {
      name: 'playback',
      type: 'group',
      fields: [
        {
          name: 'autoplay',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Autoplay video on load (may be blocked by browsers)',
          },
        },
        {
          name: 'muted',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Start video muted',
          },
        },
        {
          name: 'loop',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Loop video playback',
          },
        },
        {
          name: 'controls',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show video controls',
          },
        },
        {
          name: 'preload',
          type: 'select',
          defaultValue: 'metadata',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Metadata', value: 'metadata' },
            { label: 'Auto', value: 'auto' },
          ],
          admin: {
            description: 'Video preload behavior',
            condition: (data, siblingData) => siblingData?.source === 'upload',
          },
        },
      ],
    },
  ],
}
