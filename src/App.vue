<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

// Initialize the router
const router = useRouter()

// Define the model for the v-model binding in q-btn-toggle
const model = ref<'draggableTable' | 'audioWavesurfer' | null>(null)

// Define the options for the toggle buttons
const options = [
  { label: 'Draggable table', value: 'draggableTable', icon:'pivot_table_chart' },
  { label: 'Audio wavesurfer', value: 'audioWavesurfer', icon:'graphic_eq' },
  { label: 'APIS', value: 'apis', icon:'api' },
]

// Watch for changes in the model and navigate to the correct route
watch(model, (newVal) => {
  if (newVal === 'draggableTable') {
    router.push('/draggable-table')
  } else if (newVal === 'audioWavesurfer') {
    router.push('/audio-wavesurfer')
  } else if (newVal === 'apis') {
    router.push('/apis')
  }
})
const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div>
    <q-toolbar class="bg-primary text-white  shadow-2">
      <q-separator dark vertical />
      <q-btn
        flat 
        stretch
        icon="home" 
        @click="goHome"
        toggle-color="yellow"
      />
      <q-separator dark vertical />
      <q-btn-toggle
        v-model="model"
        flat
        stretch
        toggle-color="yellow"
        :options="options"
        separator="vertical"
      />
      <q-separator dark vertical />
    </q-toolbar>

    <!-- This is where the routed component will be displayed -->
    <router-view></router-view>
  </div>
</template>

<style scoped>
</style>
