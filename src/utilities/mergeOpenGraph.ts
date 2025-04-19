import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  url: 'https://agksangeet.com',
  title: 'AGK Sangeet - Your Gateway to Indian Classical Music',
  description:
    'Discover the beauty of Indian classical music through expert-led lessons, raag explorations, and curated Bollywood song collections.',
  images: [
    {
      url: process.env.S3_CDN_URL + '/agks-og-image.png',
      width: 1200,
      height: 630,
      alt: 'AGK Sangeet - Your Gateway to Indian Classical Music',
    },
  ],
  siteName: 'AGK Sangeet',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
