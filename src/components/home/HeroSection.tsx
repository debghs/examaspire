import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface HeroSectionProps {
  backgroundImage: string
  title: string
  subtitle: string
  linkHref: string
  linkText: string
}

const HeroSection = ({
  backgroundImage,
  title,
  subtitle,
  linkHref,
  linkText,
}: HeroSectionProps) => {
  return (
    <div className="relative flex rounded-2xl w-full min-h-[400px] md:min-h-[600px] flex-col gap-4 md:gap-8 bg-cover bg-center bg-no-repeat items-start justify-end p-4 md:px-20 md:pb-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60 z-10" />
      {backgroundImage && backgroundImage.trim() !== "" && (
        <Image
          src={backgroundImage}
          alt="Hero background"
          fill
          priority
          className="object-cover z-0"
        />
      )}
      <div className="flex flex-col gap-2 md:gap-4 text-left relative z-20 w-full max-w-[90%] md:max-w-[70%]">
        <h1 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
          {title}
        </h1>
        <h2 className="text-white text-sm md:text-base font-normal leading-normal">
          {subtitle}
        </h2>
      </div>
      {linkHref && typeof linkHref === "string" && linkHref.trim() !== "" && (
        <Link
          href={linkHref}
          className="relative z-20 w-full md:w-auto flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 md:h-12 md:px-5 bg-[#FAC638] text-[#AB2217] text-sm md:text-base font-bold leading-normal tracking-[0.015em]"
        >
          <span className="truncate">{linkText}</span>
        </Link>
      )}
    </div>
  )
}

export default HeroSection
