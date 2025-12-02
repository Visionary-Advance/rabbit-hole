import { Inter, Quicksand } from "next/font/google";
import "./globals.css";
import TranslationProvider from "./i18n/TranslationProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata = {
  title: "The Rabbit Hole Tea Bar | Eugene's Best Bubble Tea",
  description: "Eugene's premier bubble tea shop on 17th Ave. Fresh boba, milk teas, fruit teas, and more. Order online for pickup. 8+ years serving Eugene, OR.",
  keywords: "bubble tea Eugene, boba tea Eugene Oregon, milk tea, fruit tea, The Rabbit Hole, 17th Avenue",
  authors: [{ name: "The Rabbit Hole Tea Bar" }],
  openGraph: {
    title: "The Rabbit Hole Tea Bar | Eugene's Best Bubble Tea",
    description: "Fresh bubble tea made with love in Eugene, OR",
    url: 'https://therabbitholeteabar.com',
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
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${quicksand.variable} antialiased`}>
        <TranslationProvider>
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}
