'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

export default function ReturnsPolicyPage() {
  const { t } = useLanguage()

  const returnSteps = [
    {
      step: '01',
      title: 'Contact Us',
      desc: 'Email support@toptiercollection.com or use the Contact form. Include your order number and reason for return.',
    },
    {
      step: '02',
      title: 'Get Return Label',
      desc: 'We\'ll email you a prepaid return shipping label within 1 business day of approving your request.',
    },
    {
      step: '03',
      title: 'Pack & Ship',
      desc: 'Pack the item(s) securely in their original packaging. Attach the label and drop it at any USPS location.',
    },
    {
      step: '04',
      title: 'Refund Issued',
      desc: 'Once we receive and inspect the return, your refund is processed within 3 to 5 business days to your original payment method.',
    },
  ]

  const conditions = [
    'Item must be in its original, unused condition',
    'Must include all original packaging and accessories',
    'Must be returned within 30 days of the delivery date',
    'Proof of purchase (order number or receipt) is required',
  ]

  const exceptions = [
    { item: 'Digital products or gift cards', reason: 'Non-returnable by nature' },
    { item: 'Perishable goods', reason: 'Health and safety reasons' },
    { item: 'Opened beauty/personal care items', reason: 'Hygiene reasons' },
    { item: 'Items marked "Final Sale"', reason: 'Clearly indicated at purchase' },
    { item: 'Custom or personalized orders', reason: 'Made specifically for you' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">↩️</div>
          <h1 className="text-4xl font-extrabold mb-3">{t('returns.title')}</h1>
          <p className="text-zinc-300 text-lg max-w-2xl mx-auto">
            We want you to love every purchase. If you're not completely satisfied, we make returns easy.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Main policy highlight */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
          <div className="text-6xl font-black text-black mb-2">30</div>
          <div className="text-2xl font-bold text-gray-900 mb-2">Day Return Window</div>
          <p className="text-gray-700 text-sm max-w-lg mx-auto">{t('returns.policyText')}</p>
        </div>

        {/* Return process */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('returns.process')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {returnSteps.map((step, idx) => (
              <div key={step.step} className="relative">
                {idx < returnSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-200 z-0 -translate-y-1/2" />
                )}
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conditions */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Return Conditions</h2>
          <p className="text-gray-600 text-sm mb-5">
            To be eligible for a full refund, items must meet all of the following conditions:
          </p>
          <ul className="space-y-3">
            {conditions.map(cond => (
              <li key={cond} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="flex-shrink-0 w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {cond}
              </li>
            ))}
          </ul>
        </div>

        {/* Exchanges */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('returns.exchange')}</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            We offer product exchanges for items of equal or lesser value within the 30-day return window.
            To initiate an exchange:
          </p>
          <ol className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="font-bold text-black">1.</span>
              Contact our support team with your order number and the item you want to exchange.
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-black">2.</span>
              We'll confirm item availability and send you return instructions.
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-black">3.</span>
              Ship the original item back, and we'll send your replacement immediately.
            </li>
          </ol>
          <p className="text-xs text-gray-400 mt-4">
            If the exchange item costs more, you'll be charged the difference. If it costs less, we'll refund the difference.
          </p>
        </div>

        {/* Exceptions */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('returns.exceptions')}</h2>
          <p className="text-gray-600 text-sm mb-5">
            The following items are non-returnable:
          </p>
          <div className="overflow-hidden rounded-xl border border-gray-100">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold text-gray-700">Item Type</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-700">Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {exceptions.map(exc => (
                  <tr key={exc.item} className="hover:bg-gray-50/50">
                    <td className="px-5 py-3 text-gray-800">{exc.item}</td>
                    <td className="px-5 py-3 text-gray-500">{exc.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Refund timeline */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Timeline</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { phase: 'Return Received', time: '1 to 2 days', icon: '📦' },
              { phase: 'Inspection Complete', time: '1 to 2 days', icon: '🔍' },
              { phase: 'Refund Processed', time: '3 to 5 business days', icon: '💳' },
            ].map(phase => (
              <div key={phase.phase} className="text-center bg-gray-50 rounded-xl p-5">
                <div className="text-3xl mb-2">{phase.icon}</div>
                <div className="font-semibold text-gray-900 text-sm mb-1">{phase.phase}</div>
                <div className="text-xs text-gray-500">{phase.time}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-5">
            * Refunds are returned to the original payment method. Bank processing times may add 2 to 5 additional days.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-black text-white rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Need to Start a Return?</h2>
          <p className="text-zinc-300 text-sm mb-6">Our team is here to make it as easy as possible.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-xl hover:bg-zinc-100 transition-colors"
          >
            Contact Support
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <p className="text-xs text-gray-400 text-center">Last updated: March 2025. Policy subject to change without notice.</p>
      </div>
    </div>
  )
}
