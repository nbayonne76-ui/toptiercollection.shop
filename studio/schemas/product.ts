import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: () => '🛍️',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: Rule => Rule.required().error('Product name is required'),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Auto-generated from the name. Click Generate.',
      options: { source: 'name', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: Rule => Rule.required().error('Please select a category'),
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      description: 'Upload a photo of the product',
      options: { hotspot: true },
      validation: Rule => Rule.required().error('Product image is required'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Describe the product in 2-3 sentences',
    }),
    defineField({
      name: 'price',
      title: 'Price ($)',
      type: 'number',
      validation: Rule => Rule.required().positive().error('Price must be a positive number'),
    }),
    defineField({
      name: 'originalPrice',
      title: 'Original Price ($)',
      type: 'number',
      description: 'The price before discount. Leave empty if no discount.',
      validation: Rule => Rule.positive(),
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      description: 'Uncheck to show "Out of Stock" on the product',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      description: 'Check to show this product in the Featured section on the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'rating',
      title: 'Rating (0 to 5)',
      type: 'number',
      description: 'Average customer rating',
      validation: Rule => Rule.min(0).max(5),
      initialValue: 4.5,
    }),
    defineField({
      name: 'reviewCount',
      title: 'Number of Reviews',
      type: 'number',
      validation: Rule => Rule.min(0).integer(),
      initialValue: 0,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Keywords for search and filtering (e.g. lamp, lighting, bedroom)',
      options: { layout: 'tags' },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      price: 'price',
      category: 'category.name',
      inStock: 'inStock',
    },
    prepare({ title, media, price, category, inStock }: {
      title: string
      media: unknown
      price: number
      category: string
      inStock: boolean
    }) {
      return {
        title,
        media,
        subtitle: `${category || 'No category'} · $${price} ${inStock ? '✓' : '✗ Out of stock'}`,
      }
    },
  },
})
