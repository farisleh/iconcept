import { z } from "zod"

const querySchema = z.object({
  page: z.number({ coerce: true }).default(1),
  limit: z.number({ coerce: true }).default(10)
})

export default defineEventHandler(async (event) => {
  const { page, limit } = await getValidatedQuery(event, querySchema.parse)
  const { records, total } = await getProducts({ page, pageSize: limit })

  setPaginationHeaders(event, { total, page, limit })

  return records
})