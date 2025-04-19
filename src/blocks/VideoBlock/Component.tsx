import React from 'react'
import Image from 'next/image'
import type { VideoBlock as VideoBlockType, Media } from '@/payload-types'

const widthClasses = {
  default: 'w-full max-w-4xl mx-auto',
  wide: 'w-full max-w-6xl mx-auto',
  full: 'w-full',
} as const

const aspectRatioClasses = {
  '16/9': 'aspect-video',
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
} as const

const roundedClasses = {
  none: '',
  default: 'rounded-xl',
  large: 'rounded-3xl',
} as const

export const VideoBlock: React.FC<{ block: VideoBlockType }> = ({ block }) => {
  const { source, uploadedVideo, embedUrl, content, appearance, playback } = block

  // Handle media object with type guard
  const isMedia = (media: unknown): media is Media & { url: string } => {
    return (
      media !== null &&
      typeof media === 'object' &&
      'url' in media &&
      typeof (media as { url: unknown }).url === 'string'
    )
  }

  const hasValidUploadedVideo = isMedia(uploadedVideo)

  // Function to extract video ID from YouTube/Vimeo URLs
  const getEmbedUrl = (url: string): string => {
    if (source === 'youtube') {
      const match = url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/,
      )
      return match ? `https://www.youtube.com/embed/${match[1]}` : url
    }
    return url
  }

  const VideoComponent = () => {
    if (source === 'upload' && hasValidUploadedVideo) {
      const videoProps = {
        className: 'w-full h-full object-cover',
        src: uploadedVideo.url,
        autoPlay: Boolean(playback?.autoplay),
        muted: Boolean(playback?.muted),
        loop: Boolean(playback?.loop),
        controls: Boolean(playback?.controls),
        preload: playback?.preload || undefined,
        playsInline: true,
      } as const

      return <video {...videoProps} />
    }

    if (source === 'youtube' && embedUrl) {
      const embedSrc = getEmbedUrl(embedUrl)
      const params = new URLSearchParams({
        autoplay: Boolean(playback?.autoplay) ? '1' : '0',
        mute: Boolean(playback?.muted) ? '1' : '0',
        loop: Boolean(playback?.loop) ? '1' : '0',
        controls: Boolean(playback?.controls) ? '1' : '0',
        ...(source === 'youtube' && {
          rel: '0',
          modestbranding: '1',
        }),
      })

      return (
        <iframe
          className="w-full h-full"
          src={`${embedSrc}?${params.toString()}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )
    }

    return null
  }

  return (
    <div
      className={`
        ${widthClasses[appearance?.width || 'default']}
      `}
    >
      <div
        className={`
          relative overflow-hidden
          ${aspectRatioClasses[appearance?.aspectRatio || '16/9']}
          ${roundedClasses[appearance?.roundedCorners || 'default']}
        `}
      >
        <VideoComponent />
      </div>

      {(content?.title || content?.caption) && (
        <div className="mt-4 space-y-2">
          {content.title && (
            <h3 className="text-lg font-semibold text-gray-900">{content.title}</h3>
          )}
          {content.caption && <p className="text-sm text-gray-600">{content.caption}</p>}
        </div>
      )}
    </div>
  )
}

export default VideoBlock
