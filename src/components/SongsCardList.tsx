'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import usePagination from '@/hooks/usePagination'

interface Data {
  name: string
  slug: string
  songCount: number
  type: string
  yearsActive: string
}

interface SongsCardListProps {
  datas: Data[]
}

const SongsCardList: React.FC<SongsCardListProps> = ({ datas }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const limit = 10

  const { currentPageItems, currentPage, totalPages, goToPage } = usePagination(
    datas.filter((data) => data.name.toLowerCase().includes(searchQuery.toLowerCase())),
    limit,
  )

  const filteredSongs = useMemo(() => {
    return datas.filter((data) => data.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [datas, searchQuery])

  return (
    <div className="flex flex-col gap-4 mb-8">
      {/* Search Bar */}
      <div className="relative">
        <label className="flex flex-col min-w-40 !h-10">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
            <div className="text-[#A07D1C] flex border-none bg-bianca-150 items-center justify-center pl-4 rounded-l-xl border-r-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
              </svg>
            </div>
            <input
              placeholder="Search"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#201A09] focus:outline-0 focus:ring-0 border-none bg-[#F5EFDB] focus:border-none h-full placeholder:text-[#A07D1C] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </label>
      </div>

      {/* Data Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {currentPageItems.length === 0 ? (
          <p>No results found.</p>
        ) : (
          currentPageItems.map((data) => (
            <Link key={data.slug} href={`/bollywood-songs/${data.type}/${data.slug}`} passHref>
              <div className="aspect-[4/3] border border-bianca-400/70 rounded-xl p-6 hover:shadow-md transition-shadow flex flex-col">
                <h3 className="text-base font-bold">{data.name}</h3>
                <p className="text-bianca-600 text-sm">
                  {data.songCount} {data.songCount === 1 ? 'song' : 'songs'}
                  {data.yearsActive ? ` | ${data.yearsActive}` : ''}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center p-4 space-x-2">
          {currentPage > 0 && (
            <button
              onClick={() => goToPage(currentPage - 1)}
              className="p-2 bg-[#F5EFDB] rounded-md"
            >
              Prev
            </button>
          )}
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`p-2 ${currentPage === index ? 'bg-[#F5EFDB] font-bold' : 'bg-transparent'}`}
            >
              {index + 1}
            </button>
          ))}
          {currentPage < totalPages - 1 && (
            <button
              onClick={() => goToPage(currentPage + 1)}
              className="p-2 bg-[#F5EFDB] rounded-md"
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default SongsCardList
