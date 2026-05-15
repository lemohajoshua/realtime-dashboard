<template>
  <div class="bg-white rounded-lg p-4 shadow">
    <h3 class="font-semibold">{{ title }}</h3>
    <p class="text-2xl font-bold">{{ value }}</p>
    <div class="text-sm text-gray-500 mt-2">
      Avg: {{ avg }} | Max: {{ max }} | Min: {{ min }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  value: number
  avg: number
  max: number
  min: number
  color: 'blue' | 'green' | 'yellow' | 'red'
}>()
</script>
