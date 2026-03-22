'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useCartStore } from '@/store/useCartStore'
import { useLanguage } from '@/context/LanguageContext'
import { buildShopifyCheckoutUrl } from '@/lib/shopify'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { t } = useLanguage()
  const items = useCartStore(state => state.items)
  const removeItem = useCartStore(state => state.removeItem)
  const updateQuantity = useCartStore(state => state.updateQuantity)
  const totalItems = useCartStore(state => state.totalItems())
  const totalPrice = useCartStore(state => state.totalPrice())
  const drawerRef = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const freeShippingThreshold = 50
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - totalPrice)
  const shippingCost = totalPrice >= freeShippingThreshold ? 0 : 5.99

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={t('cart.title')}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">
            {t('cart.title')}
            {totalItems > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({totalItems} {totalItems === 1 ? t('cart.item') : t('cart.items')})
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Free shipping progress */}
        {totalPrice > 0 && (
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
            {remainingForFreeShipping > 0 ? (
              <p className="text-xs text-gray-700">
                Add <strong>${remainingForFreeShipping.toFixed(2)}</strong> more for free shipping!
              </p>
            ) : (
              <p className="text-xs text-green-700 font-medium">You qualify for free shipping!</p>
            )}
            <div className="mt-1.5 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-black rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (totalPrice / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">{t('cart.empty')}</p>
                <p className="text-sm text-gray-500">{t('cart.emptyDesc')}</p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-zinc-800 transition-colors"
              >
                {t('cart.continueShopping')}
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(item => (
                <li key={item.product.id} className="flex gap-4 py-3 border-b border-gray-50 last:border-0">
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{item.product.name}</h3>
                    <p className="text-sm font-bold text-gray-900 mt-0.5">
                      ${item.product.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-black transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-black transition-colors"
                          aria-label="Increase quantity"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-xs text-red-500 hover:text-red-700 transition-colors"
                      >
                        {t('cart.remove')}
                      </button>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-gray-900 flex-shrink-0">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-4 space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{t('cart.subtotal')}</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{t('cart.shipping')}</span>
              <span>{shippingCost === 0 ? <span className="text-green-600 font-medium">Free</span> : `$${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100">
              <span>{t('cart.total')}</span>
              <span>${(totalPrice + shippingCost).toFixed(2)}</span>
            </div>
            <a
              href={buildShopifyCheckoutUrl(items) || '#'}
              onClick={!buildShopifyCheckoutUrl(items) ? (e) => { e.preventDefault(); alert('Products are not yet connected to Shopify. Please add products in your Shopify admin first.') } : onClose}
              className="block w-full bg-black text-white text-center py-3 rounded-xl font-semibold hover:bg-zinc-800 transition-colors mt-2"
            >
              {t('cart.checkout')}
            </a>
            <button
              onClick={onClose}
              className="block w-full text-center text-sm text-gray-600 hover:text-black transition-colors py-1"
            >
              {t('cart.continueShopping')}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
