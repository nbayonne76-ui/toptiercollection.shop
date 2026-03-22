import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Product Name', type: 'string', validation: Rule => Rule.required() }),
    defineField({
      name: 'slug', title: 'Slug', type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category', title: 'Category', type: 'reference',
      to: [{ type: 'category' }],
      validation: Rule => Rule.required(),
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({ name: 'price', title: 'Price ($)', type: 'number', validation: Rule => Rule.required().positive() }),
    defineField({ name: 'originalPrice', title: 'Original Price ($)', type: 'number', description: 'Leave empty if no discount' }),
    defineField({ name: 'image', title: 'Product Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'inStock', title: 'In Stock', type: 'boolean', initialValue: true }),
    defineField({ name: 'rating', title: 'Rating (0-5)', type: 'number', validation: Rule => Rule.min(0).max(5) }),
    defineField({ name: 'reviewCount', title: 'Number of Reviews', type: 'number', validation: Rule => Rule.min(0) }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({ name: 'featured', title: 'Featured Product', type: 'boolean', initialValue: false, description: 'Show on homepage' }),
  ],
  preview: {
    select: { title: 'name', media: 'image', subtitle: 'category.name' },
  },
})
