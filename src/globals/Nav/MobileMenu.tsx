'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { NavItem } from './Component'
import { Search } from '@/search/Component'
export function MobileMenu({ navItems }: { navItems: NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="lg:hidden z-40">
      {/* Toggle Button */}
      <button
        type="button"
        className="inline-flex items-center justify-center p-2 rounded-lg text-bianca-600 hover:text-bianca-900 hover:bg-bianca-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">Open main menu</span>
        {isOpen ? (
          <X className="block h-5 w-5" aria-hidden="true" />
        ) : (
          <Menu className="block h-5 w-5" aria-hidden="true" />
        )}
      </button>

      {/* Mobile menu panel */}
      {isOpen && (
        <div className="absolute top-16 inset-x-0 z-20 bg-white border-b border-bianca-200">
          <div className="px-4 pt-4 pb-6">
            {/* Mobile Search */}
            <div className="relative mb-6">
              <Search />
            </div>

            {/* Mobile Navigation */}
            <div className="space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.link}
                    className="block px-3 py-2.5 text-sm font-medium text-bianca-700 hover:text-bianca-900 hover:bg-bianca-50 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.subNavItems && item.subNavItems.length > 0 && (
                    <div className="pl-4">
                      {item.subNavItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.link}
                          className="block px-3 py-2 text-sm text-bianca-600 hover:text-bianca-900 hover:bg-bianca-50 rounded-lg transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Action Button */}
            {/* <div className="mt-6 pt-6 border-t border-bianca-200">
              <Link
                href="/notations/new"
                className="block w-full px-4 py-2.5 text-center bg-bianca-500 hover:bg-bianca-600 text-sm font-semibold text-white rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Join now
              </Link>
            </div> */}
          </div>
        </div>
      )}
    </div>
  )
}
