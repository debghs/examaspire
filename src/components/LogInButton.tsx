import React from 'react'

function Button() {
  return (
    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#F5EFDB] text-[#201A09] text-sm font-bold leading-normal tracking-[0.015em]">
      <span className="truncate">Log in</span>
    </button>
  )
}

export default Button

function AnotherButton() {
  return (
    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#F5EFDB] text-[#201A09] text-sm font-bold leading-normal tracking-[0.015em]">
      <span className="truncate">Sign in</span>
    </button>
  )
}
