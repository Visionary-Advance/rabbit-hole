'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const [currentLocale, setCurrentLocale] = useState('en')
  const [hash, setHash] = useState('')

  useEffect(() => {
    // Detect current locale from pathname
    if (pathname.startsWith('/zh')) {
      setCurrentLocale('zh')
    } else if (pathname.startsWith('/en')) {
      setCurrentLocale('en')
    } else {
      setCurrentLocale('en') // Default
    }

    // Get current hash for preserving anchors
    setHash(window.location.hash)
  }, [pathname])

  // Get the path without locale prefix
  const getLocalizedPath = (locale) => {
    let path = pathname

    // Remove current locale prefix (/en or /zh)
    if (path.startsWith('/zh')) {
      path = path.slice(3) || '/'
    } else if (path.startsWith('/en')) {
      path = path.slice(3) || '/'
    }

    // Add new locale prefix
    const newPath = `/${locale}${path === '/' ? '' : path}`

    return `${newPath}${hash}`
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      {currentLocale === 'en' ? (
        <>
          <span className="font-bold text-black-900">EN</span>
          <span className="text-black-400">/</span>
          <Link
            href={getLocalizedPath('zh')}
            className="text-black-600 hover:text-black-900 transition-colors"
          >
            中文
          </Link>
        </>
      ) : (
        <>
          <Link
            href={getLocalizedPath('en')}
            className="text-black-600 hover:text-black-900 transition-colors"
          >
            EN
          </Link>
          <span className="text-black-400">/</span>
          <span className="font-bold text-black-900">中文</span>
        </>
      )}
    </div>
  )
}
