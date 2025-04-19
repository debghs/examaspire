import { BlockquoteFeature, BoldFeature, ChecklistFeature, EXPERIMENTAL_TableFeature, HeadingFeature, InlineCodeFeature, InlineToolbarFeature, ItalicFeature, lexicalEditor, LinkFeature, OrderedListFeature, StrikethroughFeature, UnderlineFeature, UnorderedListFeature, UploadFeature } from "@payloadcms/richtext-lexical";

import { FixedToolbarFeature } from "@payloadcms/richtext-lexical";

export const editorConfig = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures,
    HeadingFeature(),
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    StrikethroughFeature(),
    InlineCodeFeature(),
    BlockquoteFeature(),
    UnorderedListFeature(),
    OrderedListFeature(),
    ChecklistFeature(),
    LinkFeature({
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: 'rel',
          label: 'Rel Attribute',
          type: 'select',
          hasMany: true,
          options: ['noopener', 'noreferrer', 'nofollow'],
        },
      ],
    }),
    UploadFeature({
      collections: {
        media: {
          fields: [],
        },
      },
    }),
    EXPERIMENTAL_TableFeature(),
    InlineToolbarFeature(),
    FixedToolbarFeature(),
  ],
})
