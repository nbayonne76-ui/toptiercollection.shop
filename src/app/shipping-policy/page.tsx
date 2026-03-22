'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

export default function ShippingPolicyPage() {
  const { t } = useLanguage()

  const shippingOptions = [
    {
      name: 'Standard Shipping',
      time: '5 to 7 Business Days',
      cost: '$5.99 (Free over $50)',
      desc: 'Our most popular option. Orders are processed within 1 to 2 business days and delivered via USPS or UPS.',
      badge: 'Most Popular',
      badgeColor: 'bg-primary-100 text-primary-700',
    },
    {
      name: 'Express Shipping',
      time: '2 to 3 Business Days',
      cost: '$12.99',
      desc: 'Need it faster? Express shipping guarantees delivery within 2 to 3 business days after order processing.',
      badge: 'Faster',
      badgeColor: 'bg-amber-100 text-amber-700',
    },
    {
      name: 'Overnight Shipping',
      time: 'Next Business Day',
      cost: '$24.99',
      desc: 'Order before 12 PM EST for next-business-day delivery. Subject to carrier availability in your area.',
      badge: 'Fastest',
      badgeColor: 'bg-green-100 text-green-700',
    },
  ]

  const internationalCountries = [
    'Canada', 'United Kingdom', 'France', 'Germany', 'Australia',
    'Netherlands', 'Belgium', 'Spain', 'Italy', 'Japan',
    'And 20+ more countries...',
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-700 to-indigo-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">🚚</div>
          <h1 className="text-4xl font-extrabold mb-3">{t('shipping.title')}</h1>
          <p className="text-primary-200 text-lg">
            Free standard shipping on all US orders over $50. Fast, reliable delivery to your door.
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
            <h2 className="text-lg font-bold text-green-900 mb-1">{t('shipping.free')}</h2>
            <p className="text-green-800 text-sm">{t('shipping.freeText')}</p>
          </div>
        </div>

        {/* Shipping options */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Options (United States)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {shippingOptions.map(option => (
              <div key={option.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-900">{option.name}</h3>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${option.badgeColor}`}>
                    {option.badge}
                  </span>
                </div>
                <div className="text-2xl font-extrabold text-primary-600 mb-1">{option.time}</div>
                <div className="text-sm text-gray-500 mb-3">{option.cost}</div>
                <p className="text-sm text-gray-600 leading-relaxed">{option.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Processing times */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Processing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Processing Time</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 mt-0.5">•</span>
                  Orders placed before 2 PM EST are processed the same business day.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 mt-0.5">•</span>
                  Orders placed after 2 PM EST or on weekends/holidays are processed the next business day.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 mt-0.5">•</span>
                  You will receive a shipping confirmation email with tracking information once your order ships.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Tracking Your Order</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 mt-0.5">•</span>
                  All orders include tracking. Check your email for your tracking number.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 mt-0.5">•</span>
                  It may take up to 24 hours for tracking information to update after shipping.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 mt-0.5">•</span>
                  Contact our support team if you haven't received your order within the estimated timeframe.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* International */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🌍 {t('shipping.international')}</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">{t('shipping.internationalText')}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">International Delivery Times</h3>
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
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">We Ship To:</h3>
              <div className="flex flex-wrap gap-2">
                {internationalCountries.map(country => (
                  <span key={country} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                    {country}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3">
                * Customs duties and import taxes may apply and are the customer's responsibility.
              </p>
            </div>
          </div>
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
            className="inline-flex items-center gap-2 bg-primary-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-700 transition-colors text-sm"
          >
            Contact Support
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Last updated */}
        <p className="text-xs text-gray-400 text-center">Last updated: March 2025. Policy subject to change without notice.</p>
      </div>
    </div>
  )
}
