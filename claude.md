# SEO Implementation Guide - The Rabbit Hole Tea Bar

This guide outlines SEO improvements for your single-page Next.js website.

## Current Site Structure
- **Home Page**: `app/page.js` (route: `/`)
- **Checkout Page**: `app/checkout/page.jsx` (route: `/checkout`)
- **Type**: Single-page application with anchor link sections

---

## 1. Improve Metadata (PRIORITY #1)

### Update `app/layout.js`:

```javascript
export const metadata = {
  title: "The Rabbit Hole Tea Bar | Eugene's Best Bubble Tea",
  description: "Eugene's premier bubble tea shop on 17th Ave. Fresh boba, milk teas, fruit teas, and more. Order online for pickup. 8+ years serving Eugene, OR.",
  keywords: "bubble tea Eugene, boba tea Eugene Oregon, milk tea, fruit tea, The Rabbit Hole, 17th Avenue",
  authors: [{ name: "The Rabbit Hole Tea Bar" }],
  openGraph: {
    title: "The Rabbit Hole Tea Bar | Eugene's Best Bubble Tea",
    description: "Fresh bubble tea made with love in Eugene, OR",
    url: 'https://yourdomain.com',
    siteName: 'The Rabbit Hole Tea Bar',
    images: [
      {
        url: '/og-image.jpg', // Create this image (1200x630px)
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
    title: "The Rabbit Hole Tea Bar | Eugene's Best Bubble Tea",
    description: "Fresh bubble tea made with love in Eugene, OR",
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
    google: 'your-google-verification-code', // Add after setting up Google Search Console
  },
};
```

---

## 2. Add Structured Data (Schema.org)

### Create `app/components/StructuredData.jsx`:

```javascript
export default function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'The Rabbit Hole Tea Bar',
    image: 'https://yourdomain.com/logo.jpg',
    '@id': 'https://yourdomain.com',
    url: 'https://yourdomain.com',
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
    menu: 'https://yourdomain.com/#menu',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '21000', // Update with actual review count
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

### Add to `app/page.js`:

```javascript
import StructuredData from '@/Components/StructuredData';

export default function Home() {
  return (
    <>
      <StructuredData />
      {/* Rest of your page content */}
    </>
  );
}
```

---

## 3. Create Sitemap

### Create `app/sitemap.js`:

```javascript
// Next.js will automatically generate sitemap.xml from this file

export default function sitemap() {
  const baseUrl = 'https://yourdomain.com'; // Replace with actual domain

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/checkout`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
```

---

## 4. Create robots.txt

### Create `public/robots.txt`:

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /checkout

Sitemap: https://yourdomain.com/sitemap.xml
```

---

## 5. Image Optimization

### Best Practices:
- Use descriptive `alt` tags for all images
- Optimize image file sizes (compress before uploading)
- Use WebP format when possible
- Ensure all images use Next.js `<Image>` component (already done ✅)

### Example Alt Tag Improvements:

```javascript
// Current (generic):
<Image src="/img/tea.jpg" alt="Tea" />

// Better (descriptive):
<Image 
  src="/img/tea.jpg" 
  alt="Fresh bubble tea with boba pearls at The Rabbit Hole Eugene"
/>
```

---

## 6. Content Improvements

### Add More Local Keywords:
In your copy, naturally include:
- "bubble tea Eugene"
- "boba tea Eugene Oregon"
- "best bubble tea near UO"
- "Eugene Oregon tea shop"
- "17th Avenue Eugene"
- "Lane County bubble tea"

### Update Existing Content:
```javascript
// Example in Hero section:
<h1>Eugene's Best Bubble Tea Shop</h1>
<p>Freshly brewed bubble tea and boba in the heart of Eugene, Oregon. 
   Serving Lane County for 8+ years from our 17th Avenue location.</p>
```

---

## 7. Technical SEO Checklist

### Required Files:
- [x] `app/sitemap.js` - Automatic sitemap generation
- [x] `public/robots.txt` - Search engine instructions
- [ ] `public/og-image.jpg` - Social media preview image (1200x630px)
- [ ] `public/favicon.ico` - Browser icon

### Meta Tags Review:
- [x] Update `app/layout.js` with improved metadata
- [x] Add Open Graph tags for social sharing
- [x] Add Twitter card tags
- [x] Add canonical URL

### Performance:
- [x] Using Next.js Image optimization
- [ ] Minimize JavaScript bundle (review unused imports)
- [ ] Enable Vercel Speed Insights
- [ ] Test with Google PageSpeed Insights

---

## 8. Local SEO Actions (Outside Code)

### Google Business Profile:
1. **Claim** your Google Business Profile
2. **Verify** ownership
3. **Complete** all sections:
   - Business hours
   - Photos (at least 10 high-quality images)
   - Menu
   - Services
   - Attributes (outdoor seating, etc.)
4. **Post** regularly (weekly updates, offers)
5. **Respond** to all reviews

### Local Citations:
Create consistent listings on:
- Yelp
- Yellow Pages
- Foursquare
- TripAdvisor
- Local Eugene directories

### Reviews Strategy:
- Add QR code at checkout linking to Google review page
- Send follow-up email after purchase requesting review
- Respond to ALL reviews (positive and negative)

---

## 9. Analytics Setup

### Google Analytics 4:
1. Create GA4 property
2. Add tracking code to `app/layout.js`:

```javascript
// Add to layout.js <head>
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

### Google Search Console:
1. Add and verify your property
2. Submit sitemap (`https://yourdomain.com/sitemap.xml`)
3. Monitor search performance

---

## 10. Quick Wins (Do These First!)

Priority order for immediate impact:

1. **Update `app/layout.js` metadata** (30 minutes)
2. **Create and add StructuredData component** (20 minutes)
3. **Create `app/sitemap.js`** (5 minutes)
4. **Create `public/robots.txt`** (5 minutes)
5. **Claim Google Business Profile** (1 hour)
6. **Create and upload Open Graph image** (30 minutes)
7. **Review and improve image alt tags** (30 minutes)
8. **Add more local keywords to content** (1 hour)

**Total Time for Quick Wins: ~4 hours**

---

## 11. Ongoing SEO Maintenance

### Weekly:
- Post on Google Business Profile
- Respond to new reviews
- Check Google Search Console for errors

### Monthly:
- Review Google Analytics data
- Update content with seasonal offerings
- Add new photos to Google Business Profile
- Monitor keyword rankings

### Quarterly:
- Audit site speed
- Update metadata if services change
- Review and update structured data
- Check for broken links

---

## 12. Testing Your Implementation

### Before Launch:
1. **Google Rich Results Test**: Test your structured data
   - https://search.google.com/test/rich-results
2. **PageSpeed Insights**: Test performance
   - https://pagespeed.web.dev/
3. **Mobile-Friendly Test**: Ensure mobile optimization
   - https://search.google.com/test/mobile-friendly
4. **Open Graph Preview**: Test social sharing
   - https://www.opengraph.xyz/

### After Launch:
1. Submit sitemap to Google Search Console
2. Request indexing for homepage
3. Monitor Search Console for crawl errors
4. Set up Google Analytics alerts

---

## Resources

- [Next.js Metadata Docs](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org Restaurant](https://schema.org/Restaurant)
- [Google Search Central](https://developers.google.com/search)
- [Moz Local SEO Guide](https://moz.com/learn/seo/local)

---

## Need Help?

For SEO questions or implementation help, contact your development team or SEO consultant.

**Last Updated**: January 2025