import React from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { Search } from '@/search/Component'
import { MobileMenu } from './MobileMenu'
import Image from 'next/image'

interface SubNavItem {
  id?: string | null
  label: string
  link: string
  newTab?: boolean | null
}

export interface NavItem {
  id?: string | null
  label: string
  link: string
  newTab?: boolean | null
  subNavItems?: SubNavItem[] | null
}

interface NavProps {
  logo: string | null
  navItems: NavItem[]
}

const Nav: React.FC<NavProps> = ({ navItems, logo }) => {
  return (
    <header className="flex items-center justify-between border-b border-solid border-[#F5EFDB] px-4 sm:px-10 py-3">
      <div className="flex items-center gap-4 sm:gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 text-[#201A09]">
          <div className="size-4">
            {logo ? <Image src={logo} alt="Logo" width={16} height={16} /> : <LogoIcon />}
          </div>
          <h2 className="text-lg font-bold">examaspire</h2>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((navItem) => (
            <div key={navItem.id} className="relative group">
              {/* Main Nav Item */}
              <Link
                href={navItem.link}
                target={navItem.newTab ? '_blank' : '_self'}
                className="text-[#201A09] text-sm font-medium hover:text-[#A07D1C] flex items-center gap-1 transition-all"
              >
                {navItem.label}
                {navItem.subNavItems && navItem.subNavItems.length > 0 && (
                  <ChevronDown className="size-4 text-[#A07D1C] transition-transform group-hover:rotate-180" />
                )}
              </Link>

              {/* Dropdown Menu */}
              {navItem.subNavItems && navItem.subNavItems.length > 0 && (
                <ul
                  className="absolute left-0 mt-2 w-56 bg-white shadow-xl rounded-lg border border-[#E2DCC8] 
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                  transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 
                  z-50"
                >
                  {navItem.subNavItems.map((subNavItem) => (
                    <li key={subNavItem.id}>
                      <Link
                        href={subNavItem.link}
                        target={subNavItem.newTab ? '_blank' : '_self'}
                        className="block px-5 py-3 text-sm text-[#201A09] hover:bg-[#E2DCC8] transition-all rounded-md"
                      >
                        {subNavItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Right Section: Search & Mobile Menu */}
      <div className="flex items-center gap-4 sm:gap-8">
        <div className="hidden md:block">
          <Search />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden z-40">
          <MobileMenu navItems={navItems} />
        </div>
      </div>
    </header>
  )
}

export default Nav

// Logo Icon Component
function LogoIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
        fill="currentColor"
      />
    </svg>
  )
}
