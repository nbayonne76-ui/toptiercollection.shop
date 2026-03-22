'use client'

import { useLanguage } from '@/context/LanguageContext'
import { Language } from '@/types'

const languages: { code: Language; flag: string; label: string }[] = [
  { code: 'en', flag: '🇺🇸', label: 'English' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
  { code: 'it', flag: '🇮🇹', label: 'Italiano' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
  { code: 'sv', flag: '🇸🇪', label: 'Svenska' },
]

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="relative">
      <select
        value={language}
        onChange={e => setLanguage(e.target.value as Language)}
        className="appearance-none bg-transparent border border-gray-200 rounded-lg pl-2 pr-6 py-1 text-xs font-semibold text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-black cursor-pointer"
        aria-label="Select language"
      >
        {languages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</span>
    </div>
  )
}
