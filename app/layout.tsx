import type { Metadata } from "next";
import "./globals.scss";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import StoreProvider from "./_context/context";
import Toast from "./components/Toast";

import { cookies } from "next/headers";

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
    <html lang="en">
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
