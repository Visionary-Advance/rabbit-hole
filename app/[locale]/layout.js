export async function generateMetadata({ params }) {
  const { locale } = params;

  const baseUrl = 'https://therabbitholeteabar.com';

  // Metadata for English (default)
  const enMetadata = {
    title: "The Rabbit Hole Tea Bar | Eugene's Best Bubble Tea",
    description: "Eugene's premier bubble tea shop on 17th Ave. Fresh boba, milk teas, fruit teas, and more. Order online for pickup. 8+ years serving Eugene, OR.",
    keywords: "bubble tea Eugene, boba tea Eugene Oregon, milk tea, fruit tea, The Rabbit Hole, 17th Avenue",
  };

  // Metadata for Mandarin
  const zhMetadata = {
    title: "兔子洞茶吧 | 尤金市最好的珍珠奶茶",
    description: "尤金市17大道上的优质珍珠奶茶店。新鲜珍珠、奶茶、果茶等。在线订购取货。服务尤金市8年以上。",
    keywords: "尤金珍珠奶茶, 俄勒冈州珍珠奶茶, 奶茶, 果茶, 兔子洞, 17大道",
  };

  const isZh = locale === 'zh';
  const metadata = isZh ? zhMetadata : enMetadata;
  const currentUrl = isZh ? `${baseUrl}/zh` : baseUrl;

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
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
      title: metadata.title,
      description: metadata.description,
      url: currentUrl,
      siteName: 'The Rabbit Hole Tea Bar',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: isZh ? '兔子洞茶吧 - 尤金珍珠奶茶' : 'The Rabbit Hole Tea Bar - Eugene Bubble Tea'
        },
      ],
      locale: isZh ? 'zh_CN' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
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

import { Inter, Quicksand } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export default function LocaleLayout({ children, params }) {
  const { locale } = params;

  return (
    <html lang={locale === 'zh' ? 'zh' : 'en'} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${quicksand.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
