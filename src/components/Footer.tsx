'use client'

import Link from 'next/link'
import { useApp } from '@/context/AppContext'
import { Github, MessageCircle } from 'lucide-react'

export default function Footer() {
    const { t } = useApp()

    return (
    <footer className="bg-gray-100 dark:bg-[#1A1D23] border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">{t('footer.company')}</h3>
            <ul className="mt-4 space-y-4">
                <li>
                <Link href="/about" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    {t('footer.about')}
                </Link>
                </li>
                <li>
                <Link href="/careers" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    {t('footer.careers')}
                </Link>
                </li>
            </ul>
            </div>
            <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">{t('footer.support')}</h3>
            <ul className="mt-4 space-y-4">
                <li>
                <Link href="/contact" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    {t('footer.contact')}
                </Link>
                </li>
                <li>
                <Link href="/faq" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    {t('footer.faq')}
                </Link>
                </li>
            </ul>
            </div>
            <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">{t('footer.legal')}</h3>
            <ul className="mt-4 space-y-4">
                <li>
                <Link href="/privacy" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    {t('footer.privacy')}
                </Link>
                </li>
                <li>
                <Link href="/terms" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    {t('footer.terms')}
                </Link>
                </li>
            </ul>
            </div>
            <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">{t('footer.social')}</h3>
            <ul className="mt-4 space-y-4">
                <li>
                <a href="https://github.com/liassasel" target="_blank" rel="noopener noreferrer" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white flex items-center">
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                </a>
                </li>
                <li>
                <a href="https://wa.me/584122041596" target="_blank" rel="noopener noreferrer" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp
                </a>
                </li>
            </ul>
            </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
            <a href="https://github.com/liassasel" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
            </a>
            <a href="https://wa.me/584122041596" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="sr-only">WhatsApp</span>
                <MessageCircle className="h-6 w-6" />
            </a>
            </div>
            <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; 2024 {t('footer.companyName')}. {t('footer.rightsReserved')} {t('footer.madeBy')} liassasel.
            </p>
        </div>
        </div>
    </footer>
    )
}