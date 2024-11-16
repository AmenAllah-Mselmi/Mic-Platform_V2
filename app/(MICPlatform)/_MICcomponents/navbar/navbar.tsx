'use client'

import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import { Inter } from 'next/font/google'

import { useAuthStore } from '@/./app/store/MyStore/AuthStore'

// Import the Inter font from Google Fonts
const inter = Inter({ subsets: ['latin-ext'], weight: '400' })

export default function Navbar() {
  const logout = useAuthStore(state => state.logout)
  const user = useAuthStore(state => state.user)
  console.log('User:', user)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false) // State to manage dropdown visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false) // State to manage mobile menu visibility

  const handleLogOut = async () => {
    console.log('Logging out')
    try {
      await logout()
      window.location.href = '/login'
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }
  return (
    <nav className='fixed left-0 top-0 z-10 w-full bg-navbar py-3 text-white'>
      <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4'>
        {/* Logo Section with custom logo */}
        <Link
          href='/'
          className='flex items-center space-x-3 rtl:space-x-reverse'
        >
          <Image
            src='/images/main-logo.png' // Updated logo source
            width={37}
            height={37}
            className='object-fit h-8 cursor-pointer object-cover'
            alt='Microsoft Issatso Logo' // Alt text for accessibility
          />
          <span
            className={`${inter.className} hidden self-center whitespace-nowrap text-2xl font-semibold md:block`}
          >
            Microsoft Issatso
          </span>
        </Link>

        {/* Right Section with Profile Dropdown */}
        <div className='flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse'>
          {/* Profile Dropdown Toggle */}
          <button
            type='button'
            className='flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
            aria-expanded={isDropdownOpen ? 'true' : 'false'}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown on click
          >
            <span className='sr-only'>Open user menu</span>
            <Image
              src='/images/big-logo.png' // Updated user image source
              alt='user photo'
              width={32}
              height={32}
              className='h-8 w-8 rounded-full'
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              className='absolute right-10 top-16 z-50 my-4 list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700'
              id='user-dropdown'
            >
              <div className='px-4 py-3'>
                <span className='block text-sm text-gray-900'>
                  {user?.nomPrenom}
                </span>
                <span className='block truncate text-sm text-gray-500'>
                  {user?.email}
                </span>
              </div>
              <ul className='py-2' aria-labelledby='user-menu-button'>
                <li>
                  <Link
                    href='/profile'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white'
                  >
                    Profile
                  </Link>
                </li>

                <button
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white'
                  onClick={handleLogOut}
                >
                  Logout
                </button>
              </ul>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            type='button'
            className='inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden'
            aria-controls='navbar-user'
            aria-expanded={isMenuOpen ? 'true' : 'false'}
            onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle mobile menu
          >
            <span className='sr-only'>Open main menu</span>
            <svg
              className='h-5 w-5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 17 14'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M1 1h15M1 7h15M1 13h15'
              />
            </svg>
          </button>
        </div>

        {/* Main Navigation Links for Desktop and Mobile */}
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } w-full items-center justify-between md:order-1 md:flex md:w-auto`}
          id='navbar-user'
        >
          <ul className='mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-navbar md:p-0 md:dark:bg-gray-900 rtl:space-x-reverse'>
            <li>
              <Link
                href='/'
                className='block rounded px-3 py-2 text-black hover:bg-gray-100 dark:text-white md:p-0 md:text-gray-300 md:hover:bg-transparent md:hover:text-primary md:dark:hover:text-primary'
              >
                Home
              </Link>
            </li>
            <li>
              {user.role === 'member' ? (
                <Link
                  href='/Member/'
                  className='block rounded px-3 py-2 text-black hover:bg-gray-100 dark:text-white md:p-0 md:text-gray-300 md:hover:bg-transparent md:hover:text-primary md:dark:hover:text-primary'
                >
                  Departments
                </Link>
              ) : (
                ''
              )}
            </li>
            <li>
              {user.role === 'superAdmin' ? (
                <Link
                  href='SuperAdmin/members'
                  className='block rounded px-3 py-2 text-black hover:bg-gray-100 dark:text-white md:p-0 md:text-gray-300 md:hover:bg-transparent md:hover:text-primary md:dark:hover:text-primary'
                >
                  Members
                </Link>
              ) : (
                <Link
                  href={
                    user.role === 'member'
                      ? '/Member/sessions'
                      : '/Instructor/sessions'
                  }
                  className='block rounded px-3 py-2 text-black hover:bg-gray-100 dark:text-white md:p-0 md:text-gray-300 md:hover:bg-transparent md:hover:text-primary md:dark:hover:text-primary'
                >
                  
                  Sessions
                </Link>
              )}
            </li>
            <li>
              <Link
                href={
                  user.role === 'member'
                    ? '/Member/assignments'
                    : '/Instructor/assignments'
                }
                className='block rounded px-3 py-2 text-black hover:bg-gray-100 dark:text-white md:p-0 md:text-gray-300 md:hover:bg-transparent md:hover:text-primary md:dark:hover:text-primary'
              >
                Assignments
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
