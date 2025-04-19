'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { raagTimes } from '@/collections/Raags'

interface RaagTableProps {
  thaatOptions: string[]
  timeOptions: string[]
  initialThaat: string
  initialTime: string
  raags: any[]
}

const RaagTable: React.FC<RaagTableProps> = ({
  thaatOptions,
  timeOptions,
  initialThaat,
  initialTime,
  raags,
}) => {
  const [filteredRaags, setFilteredRaags] = useState(raags)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedThaat, setSelectedThaat] = useState(initialThaat)
  const [selectedTime, setSelectedTime] = useState(initialTime)
  const [gradients, setGradients] = useState<string[]>([])

  useEffect(() => {
    // generate random gradients only after component mounts
    const getRandomGradient = () => {
      const gradients = [
        // Radial gradients with multiple color stops
        'bg-[radial-gradient(circle_at_top_right,theme(colors.bianca.100)_0%,theme(colors.bianca.300)_50%,theme(colors.bianca.400)_100%)]',
        'bg-[radial-gradient(circle_at_bottom_left,theme(colors.bianca.50)_0%,theme(colors.bianca.200)_50%,theme(colors.bianca.500/80)_100%)]',

        // Complex linear gradients
        'bg-gradient-to-br from-bianca-100 via-bianca-300 to-bianca-500/70',
        'bg-gradient-to-tr from-bianca-200 via-bianca-400/80 to-bianca-600/60',

        // Conic gradients for unique patterns
        'bg-[conic-gradient(at_top_right,theme(colors.bianca.100),theme(colors.bianca.300),theme(colors.bianca.400),theme(colors.bianca.200))]',
        'bg-[conic-gradient(from_45deg_at_center,theme(colors.bianca.200),theme(colors.bianca.400),theme(colors.bianca.300),theme(colors.bianca.200))]',

        // Multi-stop linear gradients
        'bg-gradient-to-r from-bianca-100 via-bianca-300/90 to-bianca-500/70',
        'bg-gradient-to-bl from-bianca-200/90 via-bianca-400/80 to-bianca-600/60',

        // Diagonal gradients with multiple stops
        'bg-[linear-gradient(135deg,theme(colors.bianca.100)_0%,theme(colors.bianca.300)_40%,theme(colors.bianca.500)_100%)]',
        'bg-[linear-gradient(225deg,theme(colors.bianca.50)_0%,theme(colors.bianca.200)_50%,theme(colors.bianca.400)_100%)]',

        // Mesh-like gradients
        'bg-[linear-gradient(45deg,theme(colors.bianca.200)_25%,theme(colors.bianca.400)_50%,theme(colors.bianca.300)_75%)]',
        'bg-[linear-gradient(to_right_bottom,theme(colors.bianca.100)_20%,theme(colors.bianca.300)_40%,theme(colors.bianca.500)_80%)]',
      ]
      return gradients[Math.floor(Math.random() * gradients.length)]
    }

    setGradients(raags.map(() => getRandomGradient()))
  }, [raags])

  useEffect(() => {
    // Filter based on search, thaat, and time
    const filtered = raags.filter((raag) => {
      const matchesSearch =
        raag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        raag.thaat.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesThaat = selectedThaat === 'All Thaat' || raag.thaat === selectedThaat
      const matchesTime = selectedTime === 'All Timing' || raag.time === selectedTime
      return matchesSearch && matchesThaat && matchesTime
    })

    setFilteredRaags(filtered)
  }, [raags, searchQuery, selectedThaat, selectedTime])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleThaatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedThaat(e.target.value)
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(e.target.value)
  }

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
              onChange={handleSearchChange}
            />
          </div>
        </label>
      </div>
      <div className="flex flex-wrap gap-4">
        {/* Thaat Filter */}
        <div className="relative min-w-[200px]">
          <label className="absolute -top-2.5 left-3 px-2 text-xs bg-bianca-50 font-medium text-bianca-600">
            Select Thaat
          </label>
          <select
            id="thaatSelect"
            className="w-full rounded-lg border border-bianca-300  px-4 py-3 text-sm text-bianca-800 shadow-sm focus:border-bianca-500 focus:outline-none focus:ring-1 focus:ring-bianca-500"
            value={selectedThaat}
            onChange={handleThaatChange}
          >
            <option value="All Thaat">All Thaat</option>
            {thaatOptions.map((thaat, index) => (
              <option key={index} value={thaat}>
                {thaat}
              </option>
            ))}
          </select>
        </div>

        {/* Time Filter */}
        <div className="relative min-w-[200px]">
          <label className="absolute -top-2.5 left-3 px-2 text-xs bg-bianca-50 font-medium text-bianca-600">
            Select Timing
          </label>
          <select
            id="timeSelect"
            className="w-full rounded-lg border border-bianca-300 px-4 py-3 text-sm text-bianca-800 shadow-sm focus:border-bianca-500 focus:outline-none focus:ring-1 focus:ring-bianca-500"
            value={selectedTime}
            onChange={handleTimeChange}
          >
            <option value="All Timing">All Timing</option>
            {timeOptions.map((timeValue, index) => {
              const timeObject = raagTimes.find((time) => time.value === timeValue)
              return (
                <option key={index} value={timeValue}>
                  {timeObject?.label || timeValue}
                </option>
              )
            })}
          </select>
        </div>
      </div>
      {/* Raag Cards Grid */}
      <div
        id="raagCards"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        {filteredRaags.length === 0 ? (
          <p>No results found.</p>
        ) : (
          filteredRaags.map((card, index) => (
            <Link key={card.id} href={`/raag/${card.slug}`} passHref>
              <div className="aspect-[4/3] border border-bianca-400/70 rounded-xl p-6 hover:shadow-md transition-shadow flex flex-col">
                <div
                  className={`w-10 h-10 mb-4 rounded-lg ${gradients[index]}`}
                  aria-hidden="true"
                />
                <h3 className="text-base font-bold">{card.name}</h3>
                <p className="text-bianca-600 text-sm">{card.thaat}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default RaagTable
