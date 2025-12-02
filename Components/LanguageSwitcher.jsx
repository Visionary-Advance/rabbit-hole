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
    const isZh = pathname.startsWith('/zh')
    setCurrentLocale(isZh ? 'zh' : 'en')

    // Get current hash for preserving anchors
    setHash(window.location.hash)
  }, [pathname])

  // Get the path without locale prefix
  const getLocalizedPath = (locale) => {
    let path = pathname

    // Remove /zh prefix if it exists
    if (path.startsWith('/zh')) {
      path = path.slice(3) || '/'
    }

    // Add locale prefix for zh, keep root for en
    const newPath = locale === 'zh' ? `/zh${path === '/' ? '' : path}` : path

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
