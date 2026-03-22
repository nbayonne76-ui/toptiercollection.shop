import { CartItem } from '@/types'

const SHOPIFY_STORE = 'top-tier-collection-4.myshopify.com'

/**
 * Builds a Shopify direct checkout URL from cart items.
 * Format: https://store.myshopify.com/cart/VARIANT_ID:QTY,VARIANT_ID2:QTY2
 *
 * To get variant IDs: Shopify Admin → Products → click a product
 * → click a variant → the ID is in the URL bar (last number)
 */
export function buildShopifyCheckoutUrl(items: CartItem[]): string {
  const cartItems = items
    .filter(item => item.product.shopifyVariantId)
    .map(item => `${item.product.shopifyVariantId}:${item.quantity}`)
    .join(',')

  if (!cartItems) return ''

  return `https://${SHOPIFY_STORE}/cart/${cartItems}`
}
