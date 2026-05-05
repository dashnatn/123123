import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { BookingProvider } from '@/components/booking-provider'
import { ScrollAnimate } from '@/components/scroll-animate'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-sans"
})

export const metadata: Metadata = {
  title: 'Гармония & Оазис | Премиальный отдых на Каспии',
  description: 'Уютные домики на берегу Каспийского моря в Избербаше. Эко-стиль комплекса «Гармония» и VIP-отдых на первой линии в «Оазисе».',
  keywords: ['отдых на каспии', 'домики у моря', 'избербаш', 'база отдыха', 'гармония', 'оазис'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="bg-background">
      <head>
        <link rel="preload" href="/images/hero-bg.png" as="image" />
        <link rel="preload" href="/images/cta-bg.webp" as="image" />
        <link rel="preload" href="/images/harmony1.png" as="image" />
        <link rel="preload" href="/images/oasis1.png" as="image" />
      </head>
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <BookingProvider>
          <ScrollAnimate />
          {children}
        </BookingProvider>
      </body>
    </html>
  )
}
