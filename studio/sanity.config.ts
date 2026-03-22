import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'abdallah-store',
  title: 'Abdallah Store Admin',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Products')
              .child(S.documentTypeList('product').title('All Products')),
            S.listItem()
              .title('Categories')
              .child(S.documentTypeList('category').title('All Categories')),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
})
