import { useTranslation } from '@/app/i18n';

export async function generateMetadata({ params }) {
  const { locale } = await params;

  // Load translations for metadata
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale);

  const baseUrl = 'https://therabbitholeteabar.com';

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: t('meta.keywords'),
    authors: [{ name: "The Rabbit Hole Tea Bar" }],
    alternates: {
      canonical: baseUrl,
    },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      url: baseUrl,
      siteName: 'The Rabbit Hole Tea Bar',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'The Rabbit Hole Tea Bar - Eugene Bubble Tea'
        },
      ],
      locale: 'en_US',
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

// Export generateStaticParams for static generation
export async function generateStaticParams() {
  return [
    { locale: 'en' }
  ];
}

export default async function LocaleLayout({ children, params }) {
  // This layout generates the metadata above
  // Children are rendered with proper i18n context
  return children;
}
