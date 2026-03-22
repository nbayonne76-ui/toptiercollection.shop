'use client'

import Link from 'next/link'
import Testimonials from '@/components/Testimonials'
import { useLanguage } from '@/context/LanguageContext'

export default function AboutPage() {
  const { t } = useLanguage()

  const values = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t('about.quality'),
      text: t('about.qualityText'),
      color: 'bg-gray-100 text-gray-700',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: t('about.convenience'),
      text: t('about.convenienceText'),
      color: 'bg-amber-100 text-amber-600',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: t('about.satisfaction'),
      text: t('about.satisfactionText'),
      color: 'bg-rose-100 text-rose-600',
    },
  ]

  const team = [
    { name: 'Abdallah K.', role: 'Founder & CEO', initial: 'AK' },
    { name: 'Sophie L.', role: 'Head of Curation', initial: 'SL' },
    { name: 'Marcus T.', role: 'Customer Experience', initial: 'MT' },
    { name: 'Aisha M.', role: 'Operations Manager', initial: 'AM' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-black text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">{t('about.title')}</h1>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
            {t('about.missionText')}
          </p>
        </div>
      </section>

      {/* Mission & Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('about.story')}</h2>
              <p className="text-gray-600 leading-relaxed text-base mb-6">
                {t('about.storyText')}
              </p>
              <p className="text-gray-600 leading-relaxed text-base">
                Today, Abdallah Store serves thousands of customers across North America, offering
                over 24 carefully selected products across four core categories: Home Decor,
                Kitchenware, Pet Products, and Beauty & Self-Care.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: '10,000+', label: 'Happy Customers' },
                { value: '4.8 ★', label: 'Average Rating' },
                { value: '24', label: 'Curated Products' },
                { value: '30 days', label: 'Return Policy' },
              ].map(stat => (
                <div key={stat.label} className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100">
                  <div className="text-3xl font-extrabold text-black mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t('about.values')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map(value => (
              <div key={value.title} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className={`w-14 h-14 rounded-2xl ${value.color} flex items-center justify-center mx-auto mb-5`}>
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Meet the Team</h2>
          <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
            We are a small, passionate team dedicated to making your everyday life simpler and more enjoyable.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {team.map(member => (
              <div key={member.name} className="text-center">
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-3 text-white text-xl font-bold shadow-lg">
                  {member.initial}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{member.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA */}
      <section className="bg-black text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to simplify your everyday?</h2>
          <p className="text-zinc-300 mb-8">Browse our curated selection of practical, high-quality products.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-xl hover:bg-zinc-100 transition-colors"
          >
            Shop All Products
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
