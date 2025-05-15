import db from '../db/config'
import { products } from '../db/schemas'
import { eq, count } from 'drizzle-orm'

export async function createProduct(data: any) {
  const todo = await db.insert(products).values(data).returning()

  return await findProductById(todo[0].id)
}

export async function getProducts({ page, pageSize, orderBy, where }: any = {}) {
  const filter: any = {
    limit: pageSize,
    offset: (page - 1) * pageSize,
  }
  if (orderBy) {
    filter["orderBy"] = orderBy
  }
  if (where) {
    filter["where"] = where
  }
 
  const countValue = await db.select({ value: count() }).from(products).where(filter["where"]);
  if (!countValue) {
    return { total: 0, records: [] }
  }
  const records = await db.query.products.findMany(filter);
  return { total: countValue[0].value, records }
}

export async function findProductById(id: number) {
  return await db.query.products.findFirst({ where: eq(products.id, id) });
}

export async function updateProduct(id: number, data: any) {

  const todo = await db.update(products)
    .set({...data, updatedAt: new Date()})
    .where(eq(products.id, id))
    .returning();
  return await findProductById(todo[0].id)
}

export async function deleteProduct(id: number) {
  await db.delete(products).where(eq(products.id, id));
}