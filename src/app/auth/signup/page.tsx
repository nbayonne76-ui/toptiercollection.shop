'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

export default function SignupPage() {
  const { t } = useLanguage()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!form.name.trim()) newErrors.name = 'Full name is required.'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Valid email is required.'
    if (form.password.length < 8) newErrors.password = 'Password must be at least 8 characters.'
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.'
    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitted(true)
  }

  const inputClass = (name: string) =>
    `w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all ${
      errors[name] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
    }`

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">{t('auth.signupTitle')}</h1>
            <p className="text-gray-500 text-sm mt-1">{t('auth.signupSubtitle')}</p>
          </div>

          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Account Created!</h2>
              <p className="text-gray-500 text-sm mb-6">Welcome to Abdallah Store, {form.name.split(' ')[0]}!</p>
              <Link href="/" className="bg-black text-white font-semibold px-6 py-3 rounded-xl hover:bg-zinc-800 transition-colors">
                Start Shopping
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('auth.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className={inputClass('name')}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('auth.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  className={inputClass('email')}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('auth.password')}
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                  className={inputClass('password')}
                />
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('auth.confirmPassword')}
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  className={inputClass('confirmPassword')}
                />
                {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white font-semibold py-3.5 rounded-xl hover:bg-zinc-800 transition-colors mt-2 text-base"
              >
                {t('auth.signupBtn')}
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                {t('auth.haveAccount')}{' '}
                <Link href="/auth/login" className="text-black font-semibold hover:text-zinc-700">
                  {t('nav.login')}
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
