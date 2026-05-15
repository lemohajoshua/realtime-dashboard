<template>
  <div class="controls-bar">
    <div class="flex flex-wrap gap-3 items-center">
      <button
        @click="store.toggleStreaming()"
        :class="store.isStreaming ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'"
        class="px-4 py-2 text-white rounded-lg transition"
      >
        {{ store.isStreaming ? 'Pause' : 'Resume' }}
      </button>

      <div class="flex gap-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
        <button
          v-for="range in ranges"
          :key="range.value"
          @click="store.setTimeRange(range.value)"
          :class="store.timeRange === range.value ? 'bg-white dark:bg-gray-800 shadow' : ''"
          class="px-3 py-1 rounded-md text-sm transition"
        >
          {{ range.label }}
        </button>
      </div>

      <div class="flex gap-1">
        <button
          v-for="metric in metrics"
          :key="metric.key"
          @click="store.toggleMetric(metric.key)"
          :class="store.selectedMetrics.includes(metric.key) ? metric.activeClass : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'"
          class="px-3 py-1 rounded-md text-sm transition"
        >
          {{ metric.label }}
        </button>
      </div>

      <button
        @click="store.clearData()"
        class="px-3 py-1 text-gray-600 dark:text-gray-300 hover:text-gray-800"
      >
        Clear
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '@/stores/dataStore'

const store = useDataStore()

// Define the exact literal types that match the store
type TimeRange = '1m' | '5m' | '1h' | 'realtime'
type MetricKey = 'cpu' | 'memory' | 'requests' | 'temperature'

const ranges: { label: string; value: TimeRange }[] = [
  { label: 'Last 1 min', value: '1m' },
  { label: 'Last 5 min', value: '5m' },
  { label: 'Last 1 hour', value: '1h' },
  { label: 'Realtime', value: 'realtime' },
]

const metrics: { key: MetricKey; label: string; activeClass: string }[] = [
  { key: 'cpu', label: 'CPU', activeClass: 'bg-blue-500 text-white' },
  { key: 'memory', label: 'Memory', activeClass: 'bg-green-500 text-white' },
  { key: 'requests', label: 'Requests', activeClass: 'bg-yellow-500 text-white' },
  { key: 'temperature', label: 'Temp', activeClass: 'bg-red-500 text-white' },
]
</script>

<style scoped>
.controls-bar {
  @apply bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6;
}
</style>