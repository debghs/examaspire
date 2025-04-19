import React from 'react'
import Image from 'next/image'

const CallToAction = () => {
  return (
    <div className="w-full bg-bianca-100 rounded-2xl overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 relative">
        <div className="flex flex-col gap-3 md:gap-4 text-center md:text-left md:max-w-2xl relative z-10 p-8 md:px-6 md:py-12">
          <h2 className="text-bianca-950 text-xl md:text-2xl font-bold leading-tight @[480px]:text-4xl @[480px]:tracking-[-0.02em]">
            Ready to explore your musical journey?
          </h2>
          <p className="text-bianca-700 text-sm md:text-base @[480px]:text-lg">
            Join our community and start learning Indian classical music today
          </p>

          <button
            className="inline-flex items-center justify-center px-4 py-2 md:px-6 md:py-3 @[480px]:px-8 @[480px]:py-4 
                       bg-bianca-600 hover:bg-bianca-700 transition-colors
                       text-bianca-50 font-semibold rounded-xl
                       text-sm @[480px]:text-base mt-2 md:mt-4"
          >
            Get Started Now
          </button>
        </div>
        <div className="w-full h-48 md:h-auto md:w-1/2 md:absolute md:right-0 md:top-0 md:bottom-0">
          <Image
            src="https://cdn.usegalileo.ai/sdxl10/b025ce74-c615-4ff5-b8d8-b7eef360e10c.png"
            alt=""
            width={192}
            height={192}
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  )
}

export default CallToAction
