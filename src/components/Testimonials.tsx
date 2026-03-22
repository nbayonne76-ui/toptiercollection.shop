'use client'

import { useLanguage } from '@/context/LanguageContext'
import { Testimonial } from '@/types'

const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah M.',
    rating: 5,
    text: 'I ordered the ceramic vase set and the scented candle, and both arrived beautifully packaged. The vases look exactly like the photos: minimal, elegant, perfect for my living room. Fast shipping too!',
    date: 'February 2025',
    product: 'Minimalist Geometric Vase Set',
  },
  {
    id: 't2',
    name: 'James R.',
    rating: 5,
    text: "The cast iron skillet is a game changer. I've been cooking with it daily for 3 months and it just keeps getting better seasoned. Way more affordable than brand name options with the same quality.",
    date: 'January 2025',
    product: 'Cast Iron Skillet 10"',
  },
  {
    id: 't3',
    name: 'Amara L.',
    rating: 5,
    text: 'My cat absolutely loves the water fountain. She was barely drinking water before, and now she uses it constantly. The triple filtration really works, no weird taste or smell. 100% recommend.',
    date: 'March 2025',
    product: 'Automatic Cat Water Fountain',
  },
  {
    id: 't4',
    name: 'Daniel K.',
    rating: 4,
    text: 'The jade roller and gua sha set is exactly what I was looking for. Feels very premium for the price. I use it every morning and notice less puffiness. The velvet pouch is a nice touch.',
    date: 'February 2025',
    product: 'Jade Roller & Gua Sha Set',
  },
  {
    id: 't5',
    name: 'Nora F.',
    rating: 5,
    text: "I was skeptical about floating shelves but the installation was genuinely easy. They're sturdy, they look great, and my plants are thriving on them. Customer service was also super helpful when I had a question.",
    date: 'January 2025',
    product: 'Floating Wooden Shelf Set',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const { t } = useLanguage()

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('about.testimonials')}</h2>
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <StarRating rating={5} />
            <span className="text-sm font-medium">4.8 average · 1,200+ reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={t.id}
              className={`bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300 ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Quote icon */}
              <div className="text-primary-200 mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <StarRating rating={t.rating} />

              <p className="mt-3 text-gray-700 text-sm leading-relaxed">{t.text}</p>

              <div className="mt-5 pt-4 border-t border-gray-200 flex items-start justify-between">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Verified Purchase · {t.date}</p>
                </div>
                <span className="text-xs text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full font-medium max-w-[130px] text-right leading-tight">
                  {t.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
