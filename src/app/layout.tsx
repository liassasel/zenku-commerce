import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AppProvider } from '@/context/AppContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zenku',
  description: 'Tienda en línea con los mejores productos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} min-h-screen bg-white dark:bg-[#0A0C10] text-gray-900 dark:text-white`}>
        <AppProvider>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  )
}