import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: () => '📁',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: Rule => Rule.required().error('Category name is required'),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Auto-generated from the name. Used in the website URL.',
      options: { source: 'name', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'emoji',
      title: 'Emoji Icon',
      type: 'string',
      description: 'A single emoji shown on the website (e.g. 🏠 for Home Decor)',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'string',
      description: 'Shown under the category name on the homepage',
    }),
  ],
  preview: {
    select: { title: 'name', emoji: 'emoji' },
    prepare({ title, emoji }: { title: string; emoji?: string }) {
      return { title: `${emoji || '📁'} ${title}` }
    },
  },
})
