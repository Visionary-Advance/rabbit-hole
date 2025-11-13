'use client'

import { useEffect } from 'react'
import i18next from 'i18next'
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { getOptions, languages } from './settings'
import { useParams } from 'next/navigation'

const runsOnServerSide = typeof window === 'undefined'

// Initialize i18next for client side
if (!i18next.isInitialized) {
  i18next
    .use(initReactI18next)
    .use(resourcesToBackend((language, namespace) => import(`./locales/${language}/${namespace}.json`)))
    .init({
      ...getOptions(),
      lng: 'en', // Default language
      preload: runsOnServerSide ? languages : [],
      react: {
        useSuspense: false
      }
    })
}

export function useTranslation(ns = 'translation', options = {}) {
  const params = useParams()
  const locale = params?.locale || 'en'

  const ret = useTranslationOrg(ns, options)
  const { i18n } = ret

  useEffect(() => {
    // Change language when locale from URL changes
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale)
    }
  }, [locale, i18n])

  return ret
}
