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
  title: "Puzzle Plaza - Jigsaw Puzzles for All Ages",
  description: "Created by Jcube 2024",
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
