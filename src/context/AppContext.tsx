'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import translations, { Lang, getTranslation } from '../utils/translations'

type Theme = 'dark' | 'light'

interface AppContextType {
    theme: Theme
    toggleTheme: () => void
    lang: Lang
    setLang: (lang: Lang) => void
    t: (key: string, params?: Record<string, string | number>) => string
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('dark')
    const [lang, setLang] = useState<Lang>('es')
    const router = useRouter()

    useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null
    const savedLang = localStorage.getItem('lang') as Lang | null
    if (savedTheme) setTheme(savedTheme)
    if (savedLang && savedLang in translations) setLang(savedLang)
    }, [])

    useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
    }, [theme])

    useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
    router.refresh()
    }, [lang, router])

    const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
    }

    const t = (key: string, params?: Record<string, string | number>) => {
    return getTranslation(lang, key, params)
    }

    return (
    <AppContext.Provider value={{ theme, toggleTheme, lang, setLang, t }}>
        {children}
    </AppContext.Provider>
    )
}

export const useApp = () => {
    const context = useContext(AppContext)
    if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
    }
    return context
}