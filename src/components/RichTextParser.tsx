import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as PayloadRichText,
  BlockquoteJSXConverter,
  HeadingJSXConverter,
  ListJSXConverter,
  ParagraphJSXConverter,
  TextJSXConverter,
} from '@payloadcms/richtext-lexical/react'
import { cn } from '@/utilities/utils'

type NodeTypes = DefaultNodeTypes

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...BlockquoteJSXConverter,
  ...HeadingJSXConverter,
  ...ListJSXConverter,
  ...ParagraphJSXConverter,
  ...TextJSXConverter,
  ...LinkJSXConverter({ internalDocToHref }),
})

const DEFAULT_EDITOR_STATE: SerializedEditorState = {
  root: {
    type: 'root',
    children: [],
    direction: null,
    format: '',
    indent: 0,
    version: 1,
  },
}

const defaultProseStyles = {
  // Base prose styles
  'prose prose-lg max-w-none': true,
  // Headings
  'prose-h1:text-4xl prose-h1:font-black prose-h1:tracking-tight': true,
  'prose-h2:text-3xl prose-h2:font-bold prose-h2:tracking-tight': true,
  'prose-h3:text-2xl prose-h3:font-semibold prose-h3:tracking-tight': true,
  'prose-h4:text-xl prose-h4:font-medium prose-h4:tracking-tight': true,
  // Paragraphs and text
  'prose-p:leading-relaxed': true,
  'prose-a:no-underline hover:prose-a:underline': true,
  'prose-strong:font-semibold': true,
  // Lists
  'prose-ul:list-disc prose-ul:pl-6': true,
  'prose-ol:list-decimal prose-ol:pl-6': true,
  // Code blocks
  'prose-code:bg-bianca-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm':
    true,
  'prose-pre:bg-bianca-100 prose-pre:p-4 prose-pre:rounded-lg': true,
  // Blockquotes
  'prose-blockquote:border-l-4 prose-blockquote:border-bianca-300 prose-blockquote:pl-4 prose-blockquote:italic':
    true,
  // Images
  'prose-img:rounded-lg prose-img:shadow-md': true,
  // Tables
  'prose-table:border-collapse prose-table:w-full': true,
  'prose-thead:border-b prose-thead:border-bianca-200': true,
  'prose-th:py-3 prose-th:px-4 prose-th:text-left prose-th:font-semibold': true,
  'prose-td:py-3 prose-td:px-4 prose-td:border-b prose-td:border-bianca-100': true,
}

const minimalProseStyles = {
  // Base prose styles - minimal defaults
  'prose max-w-none': true,
  // Links
  'prose-a:no-underline hover:prose-a:underline': true,
  // Bold
  'prose-strong:font-semibold': true,
}

type Props = {
  data?: SerializedEditorState | null
  enableGutter?: boolean
  enableProse?: boolean
  useDefaultStyles?: boolean
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

export default function RichTextParser(props: Props) {
  const {
    className,
    enableProse = true,
    enableGutter = true,
    useDefaultStyles = true,
    data = DEFAULT_EDITOR_STATE,
    ...rest
  } = props

  // If data is null or undefined, use default state
  const editorState = data ?? DEFAULT_EDITOR_STATE

  const proseStyles = enableProse
    ? useDefaultStyles
      ? defaultProseStyles
      : minimalProseStyles
    : {}

  return (
    <PayloadRichText
      data={editorState}
      converters={jsxConverters}
      className={cn(
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          ...proseStyles,
        },
        className,
      )}
      {...rest}
    />
  )
}
