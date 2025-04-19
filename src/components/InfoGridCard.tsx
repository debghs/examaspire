import React from 'react'

interface InfoGridCardProps {
  icon?: React.ReactNode
  title: string
  description: string
}

export default function InfoGridCard({ icon, title, description }: InfoGridCardProps) {
  return (
    <div className="flex items-center gap-4 bg-[#FBF8EF] min-h-[72px] py-2">
      {icon && (
        <div
          className="text-[#201A09] flex items-center justify-center rounded-lg bg-[#F5EFDB] shrink-0 size-12"
          data-icon="Clock"
          data-size="24px"
          data-weight="regular"
        >
          {icon}
        </div>
      )}
      <div className="flex flex-col justify-center">
        <p className="text-[#A07D1C] text-sm font-normal leading-normal line-clamp-2">{title}</p>
        <p className="text-[#201A09] text-base font-medium leading-normal ">{description}</p>
      </div>
    </div>
  )
}
