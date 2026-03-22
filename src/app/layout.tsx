import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CartAbandonmentReminder from '@/components/CartAbandonmentReminder'

export const metadata: Metadata = {
  title: 'Top Tier Collection: Simplifying Everyday Life',
  description: 'Discover practical, high-quality products for your home, kitchen, pets, and self-care. Top Tier Collection simplifies the life of the everyday consumer.',
  keywords: ['home decor', 'kitchenware', 'pet products', 'beauty', 'self-care', 'online shopping'],
  openGraph: {
    title: 'Top Tier Collection',
    description: 'Simplifying the life of the everyday consumer.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <CartAbandonmentReminder />
        </LanguageProvider>
      </body>
    </html>
  )
}
