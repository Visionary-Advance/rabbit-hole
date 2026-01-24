'use client'

import { useEffect, useState } from 'react'
import i18next from 'i18next'

export default function TranslationProvider({ children }) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Wait for i18next to initialize and load resources
    if (i18next.isInitialized) {
      setIsReady(true)
    } else {
      i18next.on('initialized', () => {
        setIsReady(true)
      })
    }

    // Fallback timeout to show content even if translations fail
    const timeout = setTimeout(() => {
      setIsReady(true)
    }, 1000)

    return () => {
      clearTimeout(timeout)
      i18next.off('initialized')
    }
  }, [])

  if (!isReady) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-green border-t-transparent"></div>
          <p className="text-white mt-4 font-quicksand">Loading...</p>
        </div>
      </div>
    )
  }

  return children
}
