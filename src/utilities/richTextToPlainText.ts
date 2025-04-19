export type RichText = {
  root: {
    type: string
    children: {
      type: string
      version: number
      [k: string]: unknown
    }[]
    direction: ('ltr' | 'rtl') | null
    format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
    indent: number
    version: number
  }
  [k: string]: unknown
}

// Helper function to convert rich text to plain text
export const richTextToPlainText = (richText: RichText): string => {
  if (!richText?.root?.children) return ''
  return richText.root.children
    .map((node: any) => node.text || '')
    .join(' ')
    .trim()
}
