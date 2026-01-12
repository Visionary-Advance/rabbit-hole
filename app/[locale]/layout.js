import { useTranslation } from '@/app/i18n';

export async function generateMetadata({ params }) {
  const { locale } = await params;

  // Load translations for metadata
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale);

  const baseUrl = 'https://therabbitholeteabar.com';
  const currentUrl = locale === 'en' ? baseUrl : `${baseUrl}/${locale}`;

  // Locale mapping for OpenGraph
  const localeMap = {
    'en': 'en_US',
    'zh': 'zh_CN'
  };

  // Alt text mapping for OG images
  const altTextMap = {
    'en': 'The Rabbit Hole Tea Bar - Eugene Bubble Tea',
    'zh': '兔子洞茶吧 - 尤金珍珠奶茶'
  };

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: t('meta.keywords'),
    authors: [{ name: "The Rabbit Hole Tea Bar" }],
    alternates: {
      canonical: currentUrl,
      languages: {
        'en': baseUrl,
        'zh': `${baseUrl}/zh`,
        'x-default': baseUrl,
      },
    },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      url: currentUrl,
      siteName: 'The Rabbit Hole Tea Bar',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: altTextMap[locale] || altTextMap['en']
        },
      ],
      locale: localeMap[locale] || localeMap['en'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.description'),
      images: ['/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
    },
  };
}

// Export generateStaticParams for static generation of all locales
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'zh' }
  ];
}

export default async function LocaleLayout({ children, params }) {
  // This layout generates the metadata above
  // Children are rendered with proper i18n context
  return children;
}
