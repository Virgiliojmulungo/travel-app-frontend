'use client'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import HeaderComponet from '@/components/header/HeaderComponet'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Your Aravel Assistance',
  description: 'By Virgilio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <HeaderComponet />
        {children}
      </body>
    </html>
  )
}
