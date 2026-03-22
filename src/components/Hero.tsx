'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative bg-black text-white overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6 text-sm font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            New arrivals every week
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            {t('hero.headline')}
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-zinc-300 mb-8 leading-relaxed max-w-2xl">
            {t('hero.subheadline')}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-xl text-base hover:bg-zinc-100 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {t('hero.cta')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-xl text-base hover:bg-white/10 transition-all duration-200"
            >
              {t('hero.secondary')}
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/20">
            {[
              { value: '10,000+', label: 'Happy Customers' },
              { value: '24 Products', label: 'Curated Items' },
              { value: '4.8★', label: 'Average Rating' },
              { value: '30-Day', label: 'Easy Returns' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-zinc-400 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
