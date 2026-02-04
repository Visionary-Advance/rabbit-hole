'use client'

import { useEffect } from 'react'
import i18next from 'i18next'
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next'
import { getOptions } from './settings'
import { useParams } from 'next/navigation'
import enTranslation from './locales/en/translation.json'

// Initialize i18next for client side
if (!i18next.isInitialized) {
  i18next
    .use(initReactI18next)
    .init({
      ...getOptions(),
      lng: 'en',
      fallbackLng: 'en',
      resources: {
        en: {
          translation: enTranslation
        }
      },
      react: {
        useSuspense: false
      },
      interpolation: {
        escapeValue: false
      },
      initImmediate: false
    })
}

export function useTranslation(ns = 'translation', options = {}) {
  const params = useParams()
  const locale = params?.locale || 'en' // Default to 'en' if no locale in URL

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
