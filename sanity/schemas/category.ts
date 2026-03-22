import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Category Name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: Rule => Rule.required() }),
    defineField({ name: 'emoji', title: 'Emoji Icon', type: 'string', description: 'Single emoji for the category icon (e.g. 🏠)' }),
    defineField({ name: 'description', title: 'Short Description', type: 'string' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'slug.current' },
    prepare({ title, subtitle }) { return { title: title, subtitle: `/${subtitle}` } },
  },
})
