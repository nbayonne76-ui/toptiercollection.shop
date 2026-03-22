'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { Language, LanguageContextType } from '@/types'
import { translations } from '@/data/translations'

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const t = useCallback(
    (key: string): string => {
      const dict = translations[language] as Record<string, string>
      return dict[key] ?? translations.en[key as keyof typeof translations.en] ?? key
    },
    [language]
  )

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return ctx
}
