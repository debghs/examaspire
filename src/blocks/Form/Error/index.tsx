import * as React from 'react'

export const Error: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <div className="mt-2 text-[#AB2217] text-sm flex items-center">
      <svg
        className="w-4 h-4 mr-1.5"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 14A6 6 0 108 2a6 6 0 000 12zM8 5v3M8 11h.01"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {message || 'This field is required'}
    </div>
  )
}
