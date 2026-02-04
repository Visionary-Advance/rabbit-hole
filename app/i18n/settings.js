export const fallbackLng = 'en'
export const languages = ['en']
export const defaultNS = 'translation'

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    debug: false,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  }
}
