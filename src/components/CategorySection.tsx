'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

const categories = [
  {
    slug: 'home-decor',
    labelKey: 'category.homeDecor' as const,
    emoji: '🏠',
    description: 'Lamps, art, candles & more',
    color: 'from-gray-700 to-black',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
  },
  {
    slug: 'kitchenware',
    labelKey: 'category.kitchenware' as const,
    emoji: '🍳',
    description: 'Cookware, prep & storage',
    color: 'from-gray-700 to-black',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
  },
  {
    slug: 'pet-products',
    labelKey: 'category.petProducts' as const,
    emoji: '🐾',
    description: 'Beds, feeders & accessories',
    color: 'from-gray-700 to-black',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
  },
  {
    slug: 'beauty-self-care',
    labelKey: 'category.beauty' as const,
    emoji: '✨',
    description: 'Skincare, wellness & relaxation',
    color: 'from-gray-700 to-black',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
  },
]

export default function CategorySection() {
  const { t } = useLanguage()

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Shop by Category</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Everything you need for a comfortable, well-organized everyday life, all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              href={`/products/${cat.slug}`}
              className={`group relative overflow-hidden rounded-2xl border ${cat.border} ${cat.bg} p-6 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

              {/* Emoji icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4 text-3xl shadow-md group-hover:scale-110 transition-transform duration-300`}>
                {cat.emoji}
              </div>

              <h3 className="font-bold text-gray-900 mb-1 text-base">{t(cat.labelKey)}</h3>
              <p className="text-sm text-gray-500 mb-4">{cat.description}</p>

              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold bg-gradient-to-r ${cat.color} text-white px-4 py-1.5 rounded-full group-hover:shadow-md transition-shadow`}>
                {t('category.shopNow')}
                <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
