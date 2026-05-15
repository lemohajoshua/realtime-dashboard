<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <MetricCard
      title="CPU Usage"
      :value="cpuMetrics.current"
      :avg="cpuMetrics.average"
      :max="cpuMetrics.max"
      :min="cpuMetrics.min"
      color="blue"
    >
      <template #icon>
        <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
        </svg>
      </template>
    </MetricCard>
    <!-- Similar cards for memory, requests, temperature -->
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '@/stores/dataStore'
import MetricCard from './MetricCard.vue'

const store = useDataStore()
const { cpuMetrics } = store
</script>