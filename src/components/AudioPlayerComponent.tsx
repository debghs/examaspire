'use client'

import React from 'react'

interface AudioPlayerComponentProps {
  src: string
  title: string
  subtitle?: string
  image?: string
}

export function AudioPlayerComponent({ src, title, subtitle, image }: AudioPlayerComponentProps) {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [currentTime, setCurrentTime] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const audioRef = React.useRef<HTMLAudioElement>(null)

  React.useEffect(() => {
    const audioElement = audioRef.current

    handleLoadedMetadata()
    handleTimeUpdate()
    if (audioElement) {
      audioElement.pause()
      audioElement.currentTime = 0
    }
  }, [])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const progressBar = e.currentTarget
      const rect = progressBar.getBoundingClientRect()
      const clickPosition = e.clientX - rect.left
      const percentageClicked = clickPosition / rect.width
      // Use the audio element's duration instead of state
      audioRef.current.currentTime = percentageClicked * audioRef.current.duration
    }
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="py-3">
      <div className="flex flex-col gap-3 rounded-xl bg-[#F5EFDB] px-4 py-3">
        <div className="flex items-center gap-4 overflow-hidden">
          {image && (
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14 shrink-0"
              style={{
                backgroundImage: `url(${image})`,
              }}
            ></div>
          )}
          <div className="flex-1">
            <p className="text-[#201A09] text-base font-bold leading-tight truncate">{title}</p>
            <p className="text-[#A07D1C] text-sm font-normal leading-normal truncate">{subtitle}</p>
          </div>
          <button
            onClick={togglePlay}
            className="flex shrink-0 items-center justify-center rounded-full size-10 bg-[#FAC638] text-[#AB2217] hover:bg-[#f9bd1f] transition-colors"
          >
            <div className="text-inherit" data-icon="Play" data-size="20px" data-weight="fill">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                {isPlaying ? (
                  <path d="M216,48V208a16,16,0,0,1-16,16H160a16,16,0,0,1-16-16V48a16,16,0,0,1,16-16h40A16,16,0,0,1,216,48ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Z"></path>
                ) : (
                  <path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"></path>
                )}
              </svg>
            </div>
          </button>
        </div>

        {/* Custom Audio Progress Bar */}
        <div className="flex flex-col gap-1">
          <div
            className="h-1 w-full bg-[#E5D7B4] rounded-full cursor-pointer overflow-hidden"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-[#FAC638] transition-all duration-100"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-[#A07D1C]">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <audio
            ref={audioRef}
            src={src}
            onEnded={() => setIsPlaying(false)}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            preload="metadata"
          />
        </div>
      </div>
    </div>
  )
}

// Helper function to format time in MM:SS
function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}
