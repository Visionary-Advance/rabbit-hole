'use client'

import { useParams } from 'next/navigation'

export default function StructuredData() {
  const params = useParams()
  const locale = params?.locale || 'en'
  const isZh = locale === 'zh'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: isZh ? '兔子洞茶吧' : 'The Rabbit Hole Tea Bar',
    description: isZh
      ? '尤金市17大道上的优质珍珠奶茶店'
      : "Eugene's premier bubble tea shop on 17th Ave",
    image: 'https://therabbitholeteabar.com/logo.jpg',
    '@id': 'https://therabbitholeteabar.com',
    url: isZh ? 'https://therabbitholeteabar.com/zh' : 'https://therabbitholeteabar.com',
    telephone: '(541) 654-0425',
    email: 'TheRabbitHoletc@gmail.com',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '240 E 17th Ave',
      addressLocality: 'Eugene',
      addressRegion: 'OR',
      postalCode: '97401',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 44.0421,
      longitude: -123.0867,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '11:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '11:00',
        closes: '20:00',
      },
    ],
    servesCuisine: isZh ? '珍珠奶茶' : 'Bubble Tea',
    acceptsReservations: false,
    menu: isZh ? 'https://therabbitholeteabar.com/zh#menu' : 'https://therabbitholeteabar.com/#menu',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '21000',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
