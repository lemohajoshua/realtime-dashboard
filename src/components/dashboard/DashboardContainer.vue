<template>
  <div class="dashboard-container">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="mb-6">
        <h1 class="text-3xl font-bold">Real‑Time Analytics Dashboard</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">
          Live streaming metrics | Updated every second
        </p>
      </div>

      <ControlsBar />

      <MetricsRow />

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div class="lg:col-span-2">
          <LineChart v-if="showCharts.line" metric-key="cpu" color="#3b82f6" />
        </div>
        <div>
          <BarChart metric-key="memory" color="#10b981" />
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <AreaChart metric-key="requests" color="#f59e0b" />
        <LineChart metric-key="temperature" color="#ef4444" />
      </div>

      <ActivityFeed />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRealTimeData } from '@/composables/useRealTimeData'
import ControlsBar from './ControlsBar.vue'
import MetricsRow from './MetricsRow.vue'
import LineChart from './LineChart.vue'
import BarChart from './BarChart.vue'
import AreaChart from './AreaChart.vue'
import ActivityFeed from './ActivityFeed.vue'

const { start, stop } = useRealTimeData()
const showCharts = ref({
  line: true,
  bar: true,
  area: true,
})

onMounted(() => {
  start()
})

onUnmounted(() => {
  stop()
})
</script>