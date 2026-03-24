'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

export default function ShippingPolicyPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">🚚</div>
          <h1 className="text-4xl font-extrabold mb-3">{t('shipping.title')}</h1>
          <p className="text-zinc-300 text-lg">
            Free shipping on all orders over $150. Fast, reliable delivery worldwide.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Free shipping callout */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex items-start gap-4">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">
            🎉
          </div>
          <div>
            <h2 className="text-lg font-bold text-green-900 mb-1">Free Shipping on All Orders Over $150</h2>
            <p className="text-green-800 text-sm">No code needed — free shipping is automatically applied at checkout on all qualifying orders worldwide.</p>
          </div>
        </div>

        {/* Processing times */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Processing</h2>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              Orders are processed the same business day or next business day.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              Orders placed after business hours or weekends/holidays are processed the next business day.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              Shipping confirmation email with tracking information is sent upon order completion.
            </li>
          </ul>
        </div>

        {/* International */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🌍 {t('shipping.international')}</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">{t('shipping.internationalText')}</p>
          <div className="space-y-2 text-sm">
            {[
              { region: 'Canada', time: '7 to 12 business days' },
              { region: 'Europe (EU)', time: '10 to 18 business days' },
              { region: 'Australia / NZ', time: '12 to 20 business days' },
              { region: 'Asia', time: '14 to 21 business days' },
              { region: 'Rest of World', time: '14 to 30 business days' },
            ].map(row => (
              <div key={row.region} className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-700">{row.region}</span>
                <span className="text-gray-500">{row.time}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">
            * Customs duties and import taxes may apply and are the customer's responsibility.
          </p>
        </div>

        {/* Issues */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Issues with Your Shipment?</h2>
          <p className="text-gray-600 text-sm mb-4">
            If your package is lost, damaged, or significantly delayed, please contact our customer service team right away.
            We will work with the carrier to resolve the issue as quickly as possible.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-black text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-zinc-800 transition-colors text-sm"
          >
            Contact Support
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <p className="text-xs text-gray-400 text-center">Last updated: March 2026. Policy subject to change without notice.</p>
      </div>
    </div>
  )
}
