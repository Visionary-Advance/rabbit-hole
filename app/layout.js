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

export default function RootLayout({ children }) {
  return (
    <TranslationProvider>
      {children}
    </TranslationProvider>
  );
}
