<template>
    <div class="container q-pt-lg">
        <div class="row">
            <div v-for="category in uniqueCategories" :key="category" class="q-px-sm q-my-sm">
              <q-chip outline  clickable color="primary" >
                <q-avatar icon="sell" color="blue-10" text-color="white" />
                {{ category }}
              </q-chip>
        
      </div>
        </div>
        
        <div class="row" v-if="products.length">
            <div v-for="product in products" :key="product.id" class="col-lg-3 col-md-4 col-sm-6 col-xs-12 q-px-sm q-my-sm">
                <q-card >
                    <q-img :src="product.image" alt="Product Image" :ratio="1.5" />
                    <q-card-section>
                        <div class="text-bold product-title">{{ product.title }}</div>
                        <div class="text-primary">{{ product.category }}</div>
                        <div class="product-price">${{ product.price }}</div>
                        <div class="product-description">{{ product.description }}</div>
                    </q-card-section>
                    <q-separator />
                    <q-card-actions>
                        <q-btn flat color="primary">
                        read more
                        </q-btn>
                    </q-card-actions>
                </q-card>
            </div>
        </div>
    </div>
    <q-spinner-dots v-if="loading" />
    
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  
  // Define the Product type
  interface Product {
    id: number
    title: string
    price: string
    category: string
    description: string
    image: string
  }
  
  const products = ref<Product[]>([]) // Array to hold the products
  const loading = ref<boolean>(true) // Track loading state

  const uniqueCategories = computed(() => {
  // Extract the categories from the products array
  const categories = products.value.map(product => product.category)
  
  // Remove duplicates by converting to a Set and back to an array
  return [...new Set(categories)] 
})
  
  // Fetch data from the API when the component is mounted
  onMounted(async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products')
      const data: Product[] = await response.json() // Type the fetched data
      products.value = data
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      loading.value = false
    }


  })
  </script>
  
  <style scoped>
  .my-card {
    max-width: 300px;
    margin: 10px;
  }
  .container {
  max-width: 1140px;
  margin: 0 auto;
}
.product-title{
    font-size: 16px;
    height: 30px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.product-price {
    font-size: 18px;
    text-align: right;
    color: red;
}
.product-description{
    position: relative;
    height: 65px;
    overflow: hidden;
}
.product-description::after{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
    z-index: 10;
}
  </style>
  