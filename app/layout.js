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

export const metadata = {
  title: "Eugene's Bubble Tea Spot",
  description: "Freshly brewed bubble tea made with love. Experience our number-one bubble tea picks and favorites.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${quicksand.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
