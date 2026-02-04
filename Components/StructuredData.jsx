'use client'

export default function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'The Rabbit Hole Tea Bar',
    description: "Eugene's premier bubble tea shop on 17th Ave",
    image: 'https://therabbitholeteabar.com/logo.jpg',
    '@id': 'https://therabbitholeteabar.com',
    url: 'https://therabbitholeteabar.com',
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
    servesCuisine: 'Bubble Tea',
    acceptsReservations: false,
    menu: 'https://therabbitholeteabar.com/#menu',
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
