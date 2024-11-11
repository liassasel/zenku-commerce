'use client'

import { useApp } from '@/context/AppContext'
import ProductList from '@/components/ProductList'

export default function Home() {
  const { t } = useApp()

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0C10]">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-black dark:text-white sm:text-5xl md:text-6xl">
            {t('common.welcome')}
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-400">
            {t('home.description')}
          </p>
        </div>

        <div className="space-y-24">
          <ProductList title={t('product.featured')} category="featured" />
          <ProductList title={t('product.new')} category="new" />
          <ProductList title={t('product.best')} category="best" />
        </div>
      </div>
    </div>
  )
}