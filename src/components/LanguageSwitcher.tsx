'use client'

import { useLanguage } from '@/context/LanguageContext'
import { Language } from '@/types'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'EN', flag: '🇺🇸' },
    { code: 'fr', label: 'FR', flag: '🇫🇷' },
  ]

  return (
    <div className="flex items-center gap-1 border border-gray-200 rounded-full px-2 py-1">
      {languages.map((lang, idx) => (
        <span key={lang.code} className="flex items-center">
          <button
            onClick={() => setLanguage(lang.code)}
            className={`text-xs font-semibold px-1.5 py-0.5 rounded-full transition-all ${
              language === lang.code
                ? 'bg-black text-white'
                : 'text-gray-500 hover:text-gray-800'
            }`}
            aria-label={`Switch to ${lang.label}`}
          >
            {lang.flag} {lang.label}
          </button>
          {idx < languages.length - 1 && (
            <span className="text-gray-300 text-xs mx-0.5">|</span>
          )}
        </span>
      ))}
    </div>
  )
}
