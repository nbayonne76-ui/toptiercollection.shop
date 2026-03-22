'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCartStore } from '@/store/useCartStore'
import { useLanguage } from '@/context/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'
import CartDrawer from './CartDrawer'

export default function Navbar() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const totalItems = useCartStore(state => state.totalItems())
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const categoryLinks = [
    { href: '/products/home-decor', label: t('nav.homeDecor') },
    { href: '/products/kitchenware', label: t('nav.kitchenware') },
    { href: '/products/pet-products', label: t('nav.petProducts') },
    { href: '/products/beauty-self-care', label: t('nav.beauty') },
    { href: '/products', label: t('nav.products') },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-md'
            : 'bg-white/95 backdrop-blur-sm border-b border-gray-100'
        }`}
      >
        {/* Top bar */}
        <div className="bg-black text-white text-xs text-center py-2 px-4">
          {t('footer.freeShipping')}
        </div>

        {/* Main nav */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-lg font-bold text-gray-900 hidden sm:block">
                Abdallah Store
              </span>
            </Link>

            {/* Desktop category nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {categoryLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(link.href)
                      ? 'text-black bg-gray-100 font-semibold'
                      : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/about"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive('/about')
                    ? 'text-black bg-gray-100 font-semibold'
                    : 'text-gray-600 hover:text-black hover:bg-gray-50'
                }`}
              >
                {t('nav.about')}
              </Link>
              <Link
                href="/contact"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive('/contact')
                    ? 'text-black bg-gray-100 font-semibold'
                    : 'text-gray-600 hover:text-black hover:bg-gray-50'
                }`}
              >
                {t('nav.contact')}
              </Link>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <LanguageSwitcher />
              </div>

              {/* Auth links */}
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  href="/auth/signup"
                  className="text-sm font-medium bg-black text-white px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  {t('nav.signup')}
                </Link>
              </div>

              {/* Cart button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-black transition-colors"
                aria-label="Open cart"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-black transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {categoryLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(link.href)
                      ? 'text-black bg-gray-100 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/about" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
                {t('nav.about')}
              </Link>
              <Link href="/contact" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
                {t('nav.contact')}
              </Link>
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <div className="flex gap-3">
                  <Link href="/auth/login" className="text-sm font-medium text-black">
                    {t('nav.login')}
                  </Link>
                  <Link href="/auth/signup" className="text-sm font-medium text-black">
                    {t('nav.signup')}
                  </Link>
                </div>
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
