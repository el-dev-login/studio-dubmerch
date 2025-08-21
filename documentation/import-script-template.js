// This script imports products from a CSV file into a Sanity dataset

import { createClient } from '@sanity/client'
import fs from 'fs'
import { parse } from 'csv-parse/sync'

const client = createClient({
 projectId: 'your-project-id', // EDIT: Replace with your actual Sanity project ID (found in sanity.json or project settings)
 dataset: 'production', // EDIT: Change to 'development' if importing to dev dataset first
 useCdn: false,
 token: 'your-write-token', // EDIT: Replace with your write token from sanity.io/manage → your project → API → Tokens
 apiVersion: '2024-01-01'
})

// Check if product already exists by slug
async function productExists(slug) {
 const existing = await client.fetch(
   `*[_type == "product" && slug.current == $slug][0]`, 
   { slug }
 )
 return !!existing
}

// Read and parse CSV
const csvData = fs.readFileSync('products.csv', 'utf8') // EDIT: Change 'products.csv' to your actual CSV filename
const records = parse(csvData, { 
 columns: true, 
 skip_empty_lines: true 
})

// Transform CSV data to Sanity format
const products = records.map((row, index) => ({
 _type: 'product',
 title: row.title, // EDIT: Make sure your CSV has a 'title' column, or change to match your column name
 slug: { current: row.slug }, // EDIT: Make sure your CSV has a 'slug' column, or change to match your column name
 description: row.description, // EDIT: Make sure your CSV has a 'description' column, or change to match your column name
 categoryId: parseInt(row.categoryId), // EDIT: Make sure your CSV has a 'categoryId' column, or change to match your column name
 brandId: parseInt(row.brandId), // EDIT: Make sure your CSV has a 'brandId' column, or change to match your column name
 relatedPlayerId: parseInt(row.relatedPlayerId), // EDIT: Make sure your CSV has a 'relatedPlayerId' column, or change to match your column name
 relatedTeamId: parseInt(row.relatedTeamId), // EDIT: Make sure your CSV has a 'relatedTeamId' column, or change to match your column name
 relatedLeagueId: parseInt(row.relatedLeagueId), // EDIT: Make sure your CSV has a 'relatedLeagueId' column, or change to match your column name
 colors: row.colors ? row.colors.split(',').map(c => c.trim()) : [], // EDIT: Make sure your CSV has a 'colors' column with comma-separated values like "red,white,blue"
 tags: row.tags ? row.tags.split(',').map(t => t.trim()) : [], // EDIT: Make sure your CSV has a 'tags' column with comma-separated values like "jersey,nike,signature"
 isSignature: row.isSignature === 'true', // EDIT: Make sure your CSV has an 'isSignature' column with 'true' or 'false' values
 isFeatured: row.isFeatured === 'true', // EDIT: Make sure your CSV has an 'isFeatured' column with 'true' or 'false' values
 // EDIT: Add or remove fields here to match your productEntry schema and CSV columns
}))

// Import products with duplicate checking
async function importProducts() {
 let created = 0
 let skipped = 0
 
 for (const product of products) {
   try {
     // Check if product already exists
     const exists = await productExists(product.slug.current)
     
     if (exists) {
       console.log(`⏭️  Skipping existing product: ${product.title}`)
       skipped++
       continue
     }
     
     // Create new product
     const result = await client.create(product)
     console.log(`✅ Created: ${result.title}`)
     created++
     
   } catch (error) {
     console.error(`❌ Error creating product: ${product.title}`, error)
   }
 }
 
 console.log(`\\n📊 Import Summary:`)
 console.log(`   ${created} products created`)
 console.log(`   ${skipped} products skipped (already exist)`)
 console.log(`   ${products.length} total products processed`)
}

// Run the import
importProducts()