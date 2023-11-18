import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/app/ui/header'
import Footer from '@/app/ui/footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Demo App',
    default: 'Ethan Carter Demo App',
  },
  description: 'A Demo App on NextJS by Ethan Carter'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
      
    </html>
  )
}
