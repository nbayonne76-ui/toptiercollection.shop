import { CartItem, Product, Category } from '@/types'

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!
const API_VERSION = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || '2025-01'
const API_URL = `https://${DOMAIN}/api/${API_VERSION}/graphql.json`

async function shopifyFetch(query: string, variables = {}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  })
  const json = await res.json()
  if (json.errors) console.error('Shopify API errors:', json.errors)
  return json.data
}

// Map Shopify category tag to our Category type
function mapCategory(tags: string[]): Category {
  if (tags.includes('home-decor')) return 'home-decor'
  if (tags.includes('kitchenware')) return 'kitchenware'
  if (tags.includes('pet-products')) return 'pet-products'
  if (tags.includes('beauty-self-care')) return 'beauty-self-care'
  return 'home-decor'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProduct(node: any): Product {
  const variant = node.variants?.edges?.[0]?.node
  return {
    id: node.id,
    name: node.title,
    price: parseFloat(variant?.price?.amount ?? node.priceRange?.minVariantPrice?.amount ?? '0'),
    originalPrice: parseFloat(variant?.compareAtPrice?.amount ?? variant?.price?.amount ?? '0'),
    category: mapCategory(node.tags ?? []),
    description: node.description ?? '',
    rating: 5,
    reviewCount: 0,
    image: node.images?.edges?.[0]?.node?.url ?? '',
    inStock: variant?.availableForSale ?? true,
    tags: node.tags ?? [],
    shopifyVariantId: variant?.id ?? '',
  }
}

const PRODUCT_FRAGMENT = `
  id
  title
  description
  tags
  images(first: 1) { edges { node { url } } }
  priceRange { minVariantPrice { amount } }
  variants(first: 1) {
    edges {
      node {
        id
        availableForSale
        price { amount }
        compareAtPrice { amount }
      }
    }
  }
`

export async function getAllProducts(): Promise<Product[]> {
  const data = await shopifyFetch(`
    query {
      products(first: 100) {
        edges { node { ${PRODUCT_FRAGMENT} } }
      }
    }
  `)
  return data?.products?.edges?.map((e: any) => mapProduct(e.node)) ?? []
}

export async function getProductsByCategory(category: Category): Promise<Product[]> {
  const products = await getAllProducts()
  return products.filter(p => p.category === category)
}

export async function getProductById(id: string): Promise<Product | null> {
  const data = await shopifyFetch(`
    query getProduct($id: ID!) {
      product(id: $id) { ${PRODUCT_FRAGMENT} }
    }
  `, { id })
  return data?.product ? mapProduct(data.product) : null
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getAllProducts()
  return products.filter(p => p.inStock).slice(0, 8)
}

// Build a Shopify checkout URL from cart items (direct cart permalink)
export function buildShopifyCheckoutUrl(items: CartItem[]): string {
  const cartItems = items
    .filter(item => item.product.shopifyVariantId)
    .map(item => {
      // Extract numeric ID from Shopify GID (gid://shopify/ProductVariant/123456)
      const numericId = item.product.shopifyVariantId!.split('/').pop()
      return `${numericId}:${item.quantity}`
    })
    .join(',')

  if (!cartItems) return ''
  return `https://${DOMAIN}/cart/${cartItems}`
}
