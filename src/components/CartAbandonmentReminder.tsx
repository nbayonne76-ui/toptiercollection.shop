'use client'

import { useEffect, useState, useRef } from 'react'
import { useCartStore } from '@/store/useCartStore'
import { useLanguage } from '@/context/LanguageContext'
import Link from 'next/link'

const IDLE_TIMEOUT = 30_000 // 30 seconds

export default function CartAbandonmentReminder() {
  const { t } = useLanguage()
  const items = useCartStore(state => state.items)
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hasItems = items.length > 0

  const dismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
  }

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (!hasItems || isDismissed) return
    timerRef.current = setTimeout(() => {
      setIsVisible(true)
    }, IDLE_TIMEOUT)
  }

  // Watch visibility changes (tab switching)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && hasItems && !isDismissed) {
        setIsVisible(true)
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [hasItems, isDismissed])

  // Idle timer
  useEffect(() => {
    if (!hasItems || isDismissed) {
      if (timerRef.current) clearTimeout(timerRef.current)
      setIsVisible(false)
      return
    }

    const events = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart']
    const handleActivity = () => resetTimer()
    events.forEach(e => window.addEventListener(e, handleActivity, { passive: true }))
    resetTimer()

    return () => {
      events.forEach(e => window.removeEventListener(e, handleActivity))
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasItems, isDismissed])

  // Reset dismissed state when cart is cleared
  useEffect(() => {
    if (!hasItems) setIsDismissed(false)
  }, [hasItems])

  if (!isVisible) return null

  return (
    <div
      role="alert"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm mx-4 animate-bounce-in"
    >
      <div className="bg-gray-900 text-white rounded-2xl shadow-2xl px-5 py-4 flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm">{t('cart.abandonment')}</p>
          <Link
            href="/cart"
            onClick={dismiss}
            className="inline-block mt-2 text-xs bg-primary-500 hover:bg-primary-400 text-white px-4 py-1.5 rounded-lg font-medium transition-colors"
          >
            {t('cart.abandonmentBtn')}
          </Link>
        </div>
        <button
          onClick={dismiss}
          className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
          aria-label="Dismiss"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
