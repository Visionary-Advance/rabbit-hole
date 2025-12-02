'use client'

import { useEffect } from 'react'
import i18next from 'i18next'
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { getOptions, languages } from './settings'
import { useParams } from 'next/navigation'

const runsOnServerSide = typeof window === 'undefined'

// Detect browser language - only return 'zh' if browser is set to Chinese
function getBrowserLanguage() {
  if (runsOnServerSide) return 'en'

  const browserLang = navigator.language || navigator.userLanguage
  // Only return 'zh' if browser language is Chinese (zh, zh-CN, zh-TW, etc.)
  if (browserLang.toLowerCase().startsWith('zh')) {
    return 'zh'
  }
  // Default to English for all other languages
  return 'en'
}

// Initialize i18next for client side
if (!i18next.isInitialized) {
  const initialLang = getBrowserLanguage()

  i18next
    .use(initReactI18next)
    .use(resourcesToBackend((language, namespace) => import(`./locales/${language}/${namespace}.json`)))
    .init({
      ...getOptions(),
      lng: initialLang, // Use detected language
      fallbackLng: 'en', // Always fallback to English
      preload: runsOnServerSide ? languages : [initialLang, 'en'], // Preload both to prevent flash
      react: {
        useSuspense: false // Disable Suspense to allow immediate rendering
      },
      interpolation: {
        escapeValue: false
      },
      // Load translations synchronously to prevent FOUC
      initImmediate: false
    })
}

export function useTranslation(ns = 'translation', options = {}) {
  const params = useParams()
  const locale = params?.locale || getBrowserLanguage()

  const ret = useTranslationOrg(ns, options)
  const { i18n } = ret

  useEffect(() => {
    // Change language when locale from URL changes or browser language
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale)
    }
  }, [locale, i18n])

  return ret
}
