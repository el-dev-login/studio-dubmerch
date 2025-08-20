import { defineType, defineField } from 'sanity'

export const productEntry = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'categoryId',
      title: 'Category',
      type: 'number',
      description: 'Reference to product_categories.id in PostgreSQL'
    }),
    defineField({
      name: 'brandId',
      title: 'Brand',
      type: 'number',
      description: 'Reference to brands.id in PostgreSQL'
    }),
    defineField({
      name: 'relatedPlayerId',
      title: 'Related Player',
      type: 'number',
      description: 'Reference to players.id in PostgreSQL'
    }),
    defineField({
      name: 'relatedTeamId',
      title: 'Related Team',
      type: 'number',
      description: 'Reference to teams.id in PostgreSQL'
    }),
    defineField({
      name: 'relatedLeagueId',
      title: 'Related League',
      type: 'number',
      description: 'Reference to leagues.id in PostgreSQL'
    }),
    defineField({
      name: 'colors',
      title: 'Colors',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Color names - primary first, then secondary, etc.',
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'isSignature',
      title: 'Signature Product',
      type: 'boolean',
      description: 'Player signature products',
      initialValue: false
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'credit',
              type: 'string',
              title: 'Photo Credit',
              description: 'e.g., "Photo by John Smith" or "Nike Official"'
            },
            {
              name: 'source',
              type: 'string',
              title: 'Source/Website',
              description: 'e.g., "Nike.com" or "Player Instagram"'
            },
            {
              name: 'license',
              type: 'string',
              title: 'License Type',
              options: {
                list: [
                  'Player Provided',
                  'Brand Official',
                  'Creative Commons',
                  'Fair Use',
                  'Licensed'
                ]
              }
            },
            {
              name: 'creditDisplay',
              type: 'boolean',
              title: 'Show credit publicly?',
              description: 'Uncheck if credit is for internal tracking only',
              initialValue: true
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'purchaseLinks',
      title: 'Purchase Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'retailer', type: 'string', title: 'Retailer Name' },
            { name: 'type', type: 'string', title: 'Link Type', options: { list: ['direct', 'affiliate'] } },
            { name: 'url', type: 'url', title: 'Purchase URL' },
            { name: 'price', type: 'number', title: 'Price (optional)' }
          ]
        }
      ]
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime'
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0'
    }
  }
})