'use client'

import Link from 'next/link'
import { ShoppingCart, User, Moon, Sun, Globe } from 'lucide-react'
import { useState } from 'react'
import { useApp } from '@/context/AppContext'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { theme, toggleTheme, lang, setLang, t } = useApp()

    return (
    <nav className="bg-white dark:bg-[#1A1D23] border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                Zenku
            </Link>
            </div>
            <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                {t('common.home')}
                </Link>
                <Link href="/products" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                {t('common.products')}
                </Link>
                <Link href="/cart" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                <ShoppingCart className="inline-block w-5 h-5 mr-1" />
                {t('common.cart')}
                </Link>
                <Link href="/profile" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                <User className="inline-block w-5 h-5 mr-1" />
                {t('common.profile')}
                </Link>
                <button
                onClick={toggleTheme}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                aria-label={theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
                >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button
                onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                aria-label={t('common.language')}
                >
                    <Globe className="w-5 h-5" />
                </button>
            </div>
            </div>
            <div className="-mr-2 flex md:hidden">
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-controls="mobile-menu"
                aria-expanded="false"
            >
                <span className="sr-only">{t('nav.toggleMenu')}</span>
                {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                )}
            </button>
            </div>
        </div>
        </div>

        {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                {t('common.home')}
            </Link>
            <Link href="/products" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                {t('common.products')}
            </Link>
            <Link href="/cart" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                <ShoppingCart className="inline-block w-5 h-5 mr-1" />
                {t('common.cart')}
            </Link>
            <Link href="/profile" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                <User className="inline-block w-5 h-5 mr-1" />
                {t('common.profile')}
            </Link>
            <button
                onClick={toggleTheme}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                aria-label={theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
            >
                {theme === 'dark' ? <Sun className="inline-block w-5 h-5 mr-2" /> : <Moon className="inline-block w-5 h-5 mr-2" />}
                {theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
            </button>
            <button
                onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                aria-label={t('common.language')}
            >
                <Globe className="inline-block w-5 h-5 mr-2" />
                {t('common.language')}
            </button>
            </div>
        </div>
        )}
    </nav>
    )
}