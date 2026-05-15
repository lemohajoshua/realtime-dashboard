<template>
  <div class="bg-white rounded-lg p-4 shadow">
    <v-chart class="h-80 w-full" :option="chartOption" autoresize />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores/dataStore'
import VChart from 'vue-echarts'

const props = defineProps<{
  metricKey: 'cpu' | 'memory' | 'requests' | 'temperature'
  color: string
}>()

const store = useDataStore()

const chartData = computed(() =>
  store.filteredData.map((item) => ({
    timestamp: item.timestamp,
    value: item[props.metricKey],
  })),
)

const chartOption = computed(() => ({
  tooltip: { trigger: 'axis' },
  xAxis: {
    type: 'category',
    data: chartData.value.map((d) => new Date(d.timestamp).toLocaleTimeString()),
  },
  yAxis: { type: 'value' },
  series: [
    {
      data: chartData.value.map((d) => d.value),
      type: 'line',
      smooth: true,
    },
  ],
}))
</script>
