import { defineStore } from "pinia"
import type { Product } from "~/Types/productTypes"

export const useProductStore = defineStore('products', () => {

    const products = ref<Product[]>([])
    const productTotal = ref(0)
    const getProducts = computed(() => products.value)
    const getProductTotal = computed(() => productTotal.value)
    const getByIdProduct = (productId: number) => {
        return products.value.find(product => product.id === productId)
    }

    async function fetchProducts(params: { limit: number; page: number }) {
        const response: any = await $fetch.raw(`/api/v1/products`, {
            params: {
                limit: params.limit,
                page: params.page
            }
        })
        products.value = response._data
        productTotal.value = parseInt(response.headers.get('X-Total-Items') || '')
    }

    async function createProduct(product: Product) {
        const response: any = await $fetch(`/api/v1/products`, {
            method: 'POST',
            body: product
        })
        products.value.push(response)
        productTotal.value += 1
    }

    async function updateProduct(productId: number, product: Product) {
        await $fetch(`/api/v1/products/${productId}`, {
            method: 'PUT',
            body: product
        })
        const index = products.value.findIndex(product => product.id === productId)
        if (index !== -1) {
            products.value.splice(index, 1, product)
        }
    }

    async function deleteProduct(productId: number) {
        await $fetch(`/api/v1/products/${productId}`, {
            method: 'DELETE',
        })

        products.value = products.value.filter(product => product.id !== productId)

        productTotal.value -= 1
    }

    return {
        products,
        productTotal,
        getProducts,
        getProductTotal,
        getByIdProduct,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct
    }
})