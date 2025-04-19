interface ScrollableSectionProps {
  title: string
  children: React.ReactNode
}

function ScrollableSection({ title, children }: ScrollableSectionProps) {
  return (
    <div className="relative">
      <h2 className="text-[#201A09] text-[22px] font-bold leading-tight tracking-[-0.015em] px-2 sm:px-4 pb-2 sm:pb-3 pt-3 sm:pt-5">
        {title}
      </h2>
      {/* <div className="overflow-x-auto max-w-screen"> */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 p-2 sm:p-4 gap-2 sm:gap-3">
        {children}
      </div>
      {/* </div> */}
    </div>
  )
}

export default ScrollableSection
