import {Seymour_One, Merriweather_Sans, Poppins} from 'next/font/google'

import type { Metadata } from "next";
import "./globals.scss";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import StoreProvider from "./_context/context";
import Toast from "./components/Toast";

import { cookies } from "next/headers";

const seymour = Seymour_One({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-seymour'
})

const merri = Merriweather_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merri'
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASEURL!),
  keywords: [
    "Buy jigsaw puzzles online",
    "Best jigsaw puzzles for sale",
    "Puzzle shop near me",
    "High-quality puzzles",
    "Custom jigsaw puzzles",
    "1000-piece jigsaw puzzles for adults",
    "Unique jigsaw puzzles for children",
    "Best custom jigsaw puzzles online",
    "Where to buy affordable puzzles",
    "Buy jigsaw puzzles in Amsterdam",
    "Jigsaw puzzle shop Netherlands",
  ],
  title: "Puzzle Plaza - Jigsaw Puzzles for All Ages",
  description: "Discover high-quality jigsaw puzzles for all ages at Puzzle Plaza. Shop thousands of puzzles and challenge your mind with our best-selling collections. Plenty of discounts are available!",
  openGraph: {
    title: "Puzzle Plaza - Jigsaw Puzzles for All Ages",
    description: "Discover high-quality jigsaw puzzles for all ages at Puzzle Plaza. Shop thousands of puzzles and challenge your mind with our best-selling collections. Plenty of discounts are available!",
    siteName: 'Puzzle Plaza',
    type: 'website',
    url: process.env.BASEURL
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // Retrieve cart if abandoned / saved
  const currentCookies = cookies().getAll()
  
  return (
    <html lang="en" className={`${seymour.variable} ${merri.variable} ${poppins.variable}`}>
      <body className=''>
        <StoreProvider currentCookies={currentCookies}>
          <NavBar />
          <Toast />         
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
