import { Inter, Quicksand } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

// Note: Metadata is now generated in [locale]/layout.js for proper i18n SEO
// This layout provides the base HTML structure and fonts

// The lang attribute will be set server-side by middleware based on locale
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${quicksand.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
