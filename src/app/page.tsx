'use client'

import Link from 'next/link'
import Hero from '@/components/Hero'
import CategorySection from '@/components/CategorySection'
import ProductGrid from '@/components/ProductGrid'
import Testimonials from '@/components/Testimonials'
import { getFeaturedProducts } from '@/data/products'
import { useLanguage } from '@/context/LanguageContext'

export default function HomePage() {
  const { t } = useLanguage()
  const featured = getFeaturedProducts()

  return (
    <div>
      {/* Hero */}
      <Hero />

      {/* Categories */}
      <CategorySection />

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('category.featured')}</h2>
              <p className="text-gray-500">Hand-picked by our team for quality and value.</p>
            </div>
            <Link
              href="/products"
              className="text-sm font-semibold text-black hover:text-zinc-700 flex items-center gap-1 transition-colors"
            >
              {t('category.browseAll')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <ProductGrid products={featured} />
        </div>
      </section>

      {/* Value Props Banner */}
      <section className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ),
                title: 'Quality Guaranteed',
                desc: 'Every product is vetted for durability',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                ),
                title: 'Free Shipping',
                desc: 'On all orders over $150',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ),
                title: '14-Day Returns',
                desc: 'Easy, no-hassle return process',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
                title: '24/7 Support',
                desc: 'Our team is here to help you',
              },
            ].map(item => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-zinc-300 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Stay in the Loop
          </h2>
          <p className="text-gray-500 mb-8">
            Get exclusive deals, new arrivals, and lifestyle tips delivered to your inbox.
          </p>
          <form
            onSubmit={e => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black bg-white"
            />
            <button
              type="submit"
              className="bg-black text-white font-semibold px-6 py-3 rounded-xl hover:bg-zinc-800 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-3">No spam, unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  )
}
