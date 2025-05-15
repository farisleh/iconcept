// server/tasks/fetch-products.ts
import db from '../db/config'
import { products } from '../db/schemas'
import { $fetch } from 'ofetch'

export default defineTask({
  async run(event: any) {
    const response = await $fetch('https://dummyjson.com/products')
    const productList = response.products

    if (!productList) {
      console.error('No products fetched')
      return { result: undefined }
    }

    for (const product of productList) {
      await db.insert(products).values({
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail
      }).onConflictDoUpdate({
        target: products.id,
        set: {
          title: product.title,
          description: product.description,
          price: product.price,
          thumbnail: product.thumbnail,
        },
      })
    }

    console.log(`✅ Synced ${productList.length} products`)
    return { result: productList.length }
  }
})
