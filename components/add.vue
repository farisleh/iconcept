<template>
    <v-form @submit.prevent="handleOnAdd">
        <v-card>
            <v-card-title class="pa-5">
                <span class="text-h5">Add Product List</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-label class="mb-2">Title</v-label>
                            <v-text-field v-model="product.title" :rules="titleRules" placeholder="Enter title"
                                variant="outlined" density="comfortable" required single-line hide-details="auto">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-label class="mb-2">Description</v-label>
                            <v-text-field v-model="product.description" :rules="descriptionRules" placeholder="Enter description"
                                variant="outlined" density="comfortable" required single-line hide-details="auto">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-label class="mb-2">Price</v-label>
                            <v-text-field v-model="product.price" :rules="priceRules" placeholder="Enter price" type="number"
                                variant="outlined" density="comfortable" required single-line hide-details="auto">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-label class="mb-2">Image Url</v-label>
                            <v-text-field v-model="product.thumbnail" placeholder="Enter image url"
                                variant="outlined" density="comfortable" required single-line hide-details="auto">
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="black" rounded="md" variant="text" @click="$emit('closeDialog')">
                    Cancel
                </v-btn>
                <v-btn color="#F05055" rounded="md" variant="flat" type="submit">
                    Save
                </v-btn>
            </v-card-actions>
            <div v-if="apiError" class="pa-5">
                    <v-alert type="error" color="error" density="compact" variant="tonal">{{ apiError }}</v-alert>
                </div>
        </v-card>
    </v-form>
</template>

<script setup lang="ts">
import { useProductStore } from '~/stores/productStore'

const emit = defineEmits(['updateSuccessful', 'closeDialog'])

const productStore = useProductStore()
const apiError = ref('');

const titleRules = [
    (v: any) => !!v.trim() || 'Title is required',
    (v: any) => (v && v.length <= 50) || 'Title must be less than 50 characters',
];

const descriptionRules = [
    (v: any) => !!v.trim() || 'Description is required'
];

const priceRules = [
    (v: any) => !!v || 'Price is required'
];

const product = ref({
    id: 0,
    title: '',
    description: '',
    price: 0,
    thumbnail: '',
    createdAt: new Date(),
    updatedAt: new Date()
})

const handleOnAdd = async () => {
    try {
        product.value.price = Number(product.value.price);
        await productStore.createProduct(product.value)
        emit('updateSuccessful');
        emit('closeDialog');
    } catch (error) {
        apiError.value = 'Failed to add product, please try again';
    }
}

</script>

<style scoped>
</style>