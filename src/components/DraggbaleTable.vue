<template>
  <div class="q-ma-sm">
      
      <a href="https://socket.dev/npm/package/quasar-ui-q-draggable-table/overview/1.0.2" target="_blank">
        <q-chip clickable  color="primary" text-color="white" icon="link">
          quasar-ui-q-draggable-table library
        </q-chip>
      </a>
    </div>
  <div class="container q-px-md">
    <q-table
      v-draggable-table="{
        onDrop: onDropColumn,
        onDrag,
        onShadowMove,
        onOut
      }"
      v-model="pagination"
      title="Drag columns"
      :rows="rows"
      :columns="columns"
      row-key="name"
      data-testid="column"
      separator="cell"
    />
    
    <q-table
      v-draggable-table="{
        options: {
          mode: 'free',
          onlyBody: true,
          dragHandler: 'th,td'
        },
        onDrop,
        onDrag,
        onShadowMove,
        onOut
      }"
      v-model="pagination"
      title="Drag rows / columns"
      :rows="rows"
      :columns="columns"
      row-key="name"
      data-testid="column"
      separator="cell"
      class="q-mt-lg"
    />
    
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Initialize handlers as actual functions
const onDrag = (event: any) => {
  console.log('Dragging: ', event)
}
const onShadowMove = (event: any) => {
  console.log('Shadow Moving: ', event)
}
const onOut = (event: any) => {
  console.log('Out: ', event)
}

const pagination = ref({
  page: 1,
  rowsPerPage: 5
})

const columns = ref([
  {
    name: 'name',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: (row: any) => row.name,
    format: (val: string) => `${val}`,
    sortable: true
  },
  { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' },
  { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10) }
])

// Define rows as a ref so that it is reactive
const rows = ref([
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%'
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%'
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%'
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%'
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%'
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%'
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%'
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
  }
])

const onDrop = (from: number, to: number, table: string, mode: 'column' | 'row') => {
  if (mode === 'column') {
    onDropColumn(from, to)
  } else {
    onDropRow(from, to)
  }
}

const onDropColumn = (from: number, to: number) => {
  columns.value.splice(to, 0, columns.value.splice(from, 1)[0])
}

const onDropRow = (from: number, to: number): void => {
  const offset = (pagination.value.page - 1) * pagination.value.rowsPerPage

  // Remove the row from the "from" index
  const movedRow = rows.value.splice(offset + from - 1, 1)[0]

  // Insert the moved row at the "to" index
  if (movedRow) {
    rows.value.splice(offset + to - 1, 0, movedRow)
  }
}
</script>
