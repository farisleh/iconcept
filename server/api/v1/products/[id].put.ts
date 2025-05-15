import { z } from "zod"

const bodyParams = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  thumbnail: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  try {
    const body = await readValidatedBody(event, bodyParams.parse)
    const record = await updateProduct(parseInt(id!), body)

    return record
  } catch (error) {
    return createError({
      statusCode: 422,
      data: error
    })
  }

})