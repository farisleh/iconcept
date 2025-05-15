<template>
    <div class="top-right-button">
        <v-dialog class="product-modal">
            <template v-slot:activator="{ props }">
                <v-btn color="primary" size="small" v-bind="props">Add
                    Product
                </v-btn>
            </template>
            <template v-slot:default="{ isActive }">
                <Add @updateSuccessful="fetchProducts" @closeDialog="isActive.value = false" />
            </template>
        </v-dialog>
    </div>

    <EasyDataTable :headers="headers" :items="items" button-pagination v-model:server-options="serverOptions"
        :server-items-length="serverItemsLength" :loading="loading">
        <template #item.thumbnail="{ thumbnail }">
            <v-img :src="thumbnail" width="100" height="100">
            </v-img>
            </template>
    </EasyDataTable>

</template>

<script lang="ts" setup>
import type { Header, Item, ServerOptions } from 'vue3-easy-data-table';
import { useProductStore } from '~/stores/productStore';

const productStore = useProductStore()

const headers: Header[] = [
    { text: 'Image', value: 'thumbnail', sortable: true },
    { text: 'Title', value: 'title', sortable: true },
    { text: 'Price', value: 'price', sortable: true },
]

const productId = ref<string>('')

const items = ref<Item[]>([])

const loading = ref(false);
const serverItemsLength = ref<number>(0)
const serverOptions = ref<ServerOptions>({
    page: 1,
    rowsPerPage: 10
})

const fetchProducts = async () => {
    loading.value = true
    try {
        await productStore.fetchProducts({
            limit: serverOptions.value.rowsPerPage,
            page: serverOptions.value.page
        })

        const products = productStore.getProducts
        items.value = products
        serverItemsLength.value = productStore.getProductTotal

    } catch (error) {
        console.error('Failed to fetch products', error)
    } finally {
        loading.value = false
    }
}

const deleteProduct = async (id: number) => {
    if (confirm('Are you sure you want to delete this todo?')) {
        try {
            await productStore.deleteProduct(id)
            await fetchProducts()
        } catch (error) {
            console.error('Failed to delete product', error)
        }
    }
}

onMounted(() => {
    fetchProducts()
})

watch(serverOptions, (value) => {
    fetchProducts()
}, { deep: true })

</script>

<style scoped>
.product-modal {
    width: calc(100% - 48px);
    min-width: 340px;
    max-width: 600px;
}

.top-right-button {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
}
</style>