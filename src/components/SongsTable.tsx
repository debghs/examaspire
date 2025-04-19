'use client'

import React, { useState, ReactElement } from 'react'
import Link from 'next/link'
import usePagination from '@/hooks/usePagination'

interface Taal {
  name: string
  slug?: string | null
  matra?: number | null
}

interface Raag {
  name: string
  slug?: string | null
}

interface BollywoodSinger {
  name: string
  slug?: string | null
}

interface Actor {
  name: string
  slug?: string | null
}

interface Song {
  name: string
  slug?: string | null | undefined
  taal: number | Taal
  raag: number | Raag
  singer: (number | BollywoodSinger)[]
  actor?: (number | Actor)[] | null | undefined
}

interface SongsTableProps {
  songs: Song[]
  singers: string[]
  raags: string[]
}

export default function SongsTable({ songs, singers, raags }: SongsTableProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSinger, setSelectedSinger] = useState('')
  const [selectedRaag, setSelectedRaag] = useState('')

  const limit = 10

  const filteredSongs = songs.filter((song) => {
    const matchesSearch = searchQuery
      ? song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.singer?.some(
          (s) =>
            s && typeof s !== 'number' && s.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : true

    const matchesSinger = selectedSinger
      ? song.singer?.some((s) => s && typeof s !== 'number' && s.name === selectedSinger)
      : true
    const matchesRaag = selectedRaag
      ? song.raag && typeof song.raag !== 'number' && song.raag.name === selectedRaag
      : true

    return matchesSearch && matchesSinger && matchesRaag
  })

  const { currentPageItems, currentPage, totalPages, goToPage } = usePagination(
    filteredSongs,
    limit,
  )

  return (
    <>
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
              onChange={(e) => {
                setSearchQuery(e.target.value)
              }}
            />
          </div>
        </label>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mt-5">
        <div className="relative min-w-[200px]">
          <label className="absolute -top-2.5 left-3 px-2 text-xs bg-bianca-50 font-medium text-bianca-600">
            Select Singer
          </label>
          <select
            className="w-full rounded-lg border border-bianca-300 px-4 py-3 text-sm text-bianca-800 shadow-sm focus:border-bianca-500 focus:outline-none focus:ring-1 focus:ring-bianca-500"
            onChange={(e) => {
              setSelectedSinger(e.target.value)
            }}
            value={selectedSinger}
          >
            <option value="">All Singers</option>
            {singers.map((singer, index) => (
              <option key={index} value={singer}>
                {singer}
              </option>
            ))}
          </select>
        </div>

        <div className="relative min-w-[200px]">
          <label className="absolute -top-2.5 left-3 px-2 text-xs bg-bianca-50 font-medium text-bianca-600">
            Select Raag
          </label>
          <select
            className="w-full rounded-lg border border-bianca-300 px-4 py-3 text-sm text-bianca-800 shadow-sm focus:border-bianca-500 focus:outline-none focus:ring-1 focus:ring-bianca-500"
            onChange={(e) => {
              setSelectedRaag(e.target.value)
            }}
            value={selectedRaag}
          >
            <option value="">All Raags</option>
            {raags.map((raag, index) => (
              <option key={index} value={raag}>
                {raag}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="py-8">
        <div className="overflow-x-auto">
          <div className="min-w-[400px] flex rounded-xl border border-[#EFE3C3] bg-[#FBF8EF]">
            <table className="flex-1">
              <thead>
                <tr className="bg-[#FBF8EF]">
                  <th className="px-4 py-3 text-left text-[#201A09] w-[400px] text-sm font-medium">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-[#201A09] w-[400px] text-sm font-medium">
                    Singer
                  </th>
                  <th className="px-4 py-3 text-left text-[#201A09] w-[400px] text-sm font-medium">
                    Raag
                  </th>
                  <th className="px-4 py-3 text-left text-[#201A09] w-[400px] text-sm font-medium">
                    Taal
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPageItems.length > 0 ? (
                  currentPageItems.map((song, index) => (
                    <tr key={index} className="border-t border-t-[#EFE3C3]">
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#A07D1C] text-sm font-normal leading-normal">
                        <Link href={`/bollywood-songs/${song.slug}`}>{song.name}</Link>
                      </td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#201A09] text-sm font-normal leading-normal">
                        {song.singer
                          ? song.singer
                              .map((s: number | BollywoodSinger) =>
                                typeof s !== 'number' ? (
                                  <Link key={s.slug} href={`/bollywood-songs/singer/${s.slug}`}>
                                    {s.name}
                                  </Link>
                                ) : (
                                  ''
                                ),
                              )
                              .filter(Boolean)
                              .reduce((prev: ReactElement, curr: ReactElement, i: number) => (
                                <>
                                  {prev}
                                  {i > 0 && ', '}
                                  {curr}
                                </>
                              ))
                          : 'Not Available'}
                      </td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#201A09] text-sm font-normal leading-normal">
                        {song.raag && typeof song.raag !== 'number' ? (
                          <Link href={`/bollywood-songs/raag/${song.raag.slug}`}>
                            {song.raag.name}
                          </Link>
                        ) : (
                          'Not Available'
                        )}
                      </td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#201A09] text-sm font-normal leading-normal">
                        {song.taal && typeof song.taal !== 'number' ? (
                          <Link href={`/bollywood-songs/taal/${song.taal.slug}`}>
                            {song.taal.name}
                          </Link>
                        ) : (
                          'Not Available'
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-500">
                      No matching songs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

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
    </>
  )
}
