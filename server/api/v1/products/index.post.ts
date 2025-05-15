import { z } from "zod"

const bodyParams = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  thumbnail: z.string(),
})

export default defineEventHandler(async (event) => {
  try {
    const { title, description, price, thumbnail } = await readValidatedBody(event, bodyParams.parse)
    const record = await createProduct({ title, description, price, thumbnail })
    return record
  } catch (error) {
    return createError({
      statusCode: 422,
      data: error
    })
  }
})