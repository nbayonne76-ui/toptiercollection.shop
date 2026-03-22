'use client'

import { useLanguage } from '@/context/LanguageContext'
import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  const { t } = useLanguage()

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: t('contact.emailLabel'),
      value: 'support@abdallahstore.com',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: t('contact.phone'),
      value: '+1 (888) 555-0192',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: t('contact.hours'),
      value: t('contact.hoursText'),
    },
  ]

  const faqs = [
    {
      q: 'How long does shipping take?',
      a: 'Standard shipping takes 5 to 7 business days. Express shipping is available for 2 to 3 business days.',
    },
    {
      q: 'What is your return policy?',
      a: 'We offer a 30-day hassle-free return policy. Items must be unused and in original packaging.',
    },
    {
      q: 'Do you ship internationally?',
      a: 'Yes! We ship to over 30 countries. International shipping rates and times vary by destination.',
    },
    {
      q: 'How can I track my order?',
      a: 'Once your order ships, you will receive a tracking number via email. Use it on our carrier\'s website.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-black text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold mb-3">{t('contact.title')}</h1>
          <p className="text-zinc-300 text-lg max-w-xl mx-auto">{t('contact.subtitle')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact info */}
          <div className="space-y-6">
            {contactInfo.map(info => (
              <div key={info.label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-4">
                <div className="w-12 h-12 bg-gray-100 text-gray-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  {info.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{info.label}</h3>
                  <p className="text-sm text-gray-600 whitespace-pre-line">{info.value}</p>
                </div>
              </div>
            ))}

            {/* Social links */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">Follow Us</h3>
              <div className="flex gap-3">
                {[
                  { label: 'Instagram', href: '#' },
                  { label: 'Facebook', href: '#' },
                  { label: 'Pinterest', href: '#' },
                ].map(social => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black px-3 py-1.5 rounded-full transition-colors"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map(faq => (
              <div key={faq.q} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">Q.</span>
                  {faq.q}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed pl-5">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
