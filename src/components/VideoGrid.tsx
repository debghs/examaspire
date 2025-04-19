import Link from 'next/link'
import React from 'react'

interface Video {
  title: string
  time: string
  image: string
  href: string
}

interface VideoGridProps {
  title: string
  videos: Video[]
}

const VideoGrid = ({ title, videos }: VideoGridProps) => {
  return (
    <>
      <h2 className="text-[#201A09] text-[22px] font-bold leading-tight tracking-[-0.015em] px-1 pb-3 pt-5">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-1">
        {videos.map((video, index) => (
          <Link href={video.href} key={index} className="flex flex-col gap-3 pb-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
              style={{ backgroundImage: `url("${video.image}")` }}
            />
            <div>
              <p className="text-[#201A09] text-base font-medium leading-normal">{video.title}</p>
              <p className="text-[#A07D1C] text-sm font-normal leading-normal">{video.time}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default VideoGrid
