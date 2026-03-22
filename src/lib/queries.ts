import { groq } from 'next-sanity'
import { client, isSanityConfigured } from './sanity'
import { products as staticProducts, getCategoryProducts as getStaticCategoryProducts, getFeaturedProducts as getStaticFeatured, getProductById as getStaticProductById } from '@/data/products'
import { Product } from '@/types'

// Transform Sanity product to our Product type
function transformProduct(p: any): Product {
  return {
    id: p.slug?.current || p._id,
    name: p.name,
    price: p.price,
    originalPrice: p.originalPrice || p.price,
    category: p.category?.slug?.current || '',
    description: p.description || '',
    rating: p.rating || 4.5,
    reviewCount: p.reviewCount || 0,
    image: p.image?.asset?.url || '',
    inStock: p.inStock ?? true,
    tags: p.tags || [],
  }
}

const PRODUCT_FIELDS = groq`
  _id,
  name,
  slug,
  description,
  price,
  originalPrice,
  inStock,
  rating,
  reviewCount,
  tags,
  featured,
  "image": image { asset-> { url } },
  "category": category-> { name, slug }
`

export async function getAllProducts(): Promise<Product[]> {
  if (!isSanityConfigured) return staticProducts
  try {
    const data = await client.fetch(groq`*[_type == "product"] | order(name asc) { ${PRODUCT_FIELDS} }`)
    return data.map(transformProduct)
  } catch { return staticProducts }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  if (!isSanityConfigured) return getStaticFeatured()
  try {
    const data = await client.fetch(groq`*[_type == "product" && featured == true && inStock == true] | order(name asc) [0...8] { ${PRODUCT_FIELDS} }`)
    return data.length > 0 ? data.map(transformProduct) : getStaticFeatured()
  } catch { return getStaticFeatured() }
}

export async function getCategoryProducts(categorySlug: string): Promise<Product[]> {
  if (!isSanityConfigured) return getStaticCategoryProducts(categorySlug)
  try {
    const data = await client.fetch(
      groq`*[_type == "product" && category->slug.current == $slug] | order(name asc) { ${PRODUCT_FIELDS} }`,
      { slug: categorySlug }
    )
    return data.length > 0 ? data.map(transformProduct) : getStaticCategoryProducts(categorySlug)
  } catch { return getStaticCategoryProducts(categorySlug) }
}

export async function getProductById(id: string): Promise<Product | undefined> {
  if (!isSanityConfigured) return getStaticProductById(id)
  try {
    const data = await client.fetch(
      groq`*[_type == "product" && slug.current == $id][0] { ${PRODUCT_FIELDS} }`,
      { id }
    )
    return data ? transformProduct(data) : getStaticProductById(id)
  } catch { return getStaticProductById(id) }
}

export async function getAllCategories() {
  if (!isSanityConfigured) return []
  try {
    return await client.fetch(groq`*[_type == "category"] | order(name asc) { _id, name, slug, emoji, description }`)
  } catch { return [] }
}
