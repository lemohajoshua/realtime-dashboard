<template>
  <div class="chart-container">
    <v-chart
      :option="chartOption"
      :autoresize="true"
      @ready="onChartReady"
      class="chart"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart as EBarChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { useDataStore } from '@/stores/dataStore'

use([CanvasRenderer, EBarChart, TitleComponent, TooltipComponent, GridComponent, LegendComponent])

const props = defineProps<{
  metricKey: 'cpu' | 'memory' | 'requests' | 'temperature'
  color: string
}>()

const store = useDataStore()
let chartInstance: any = null

const chartData = computed(() => {
  return store.filteredData.slice(-20).map((dp: any) => ({
    timestamp: dp.timestamp,
    value: dp[props.metricKey],
  }))
})

const chartOption = computed(() => ({
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  grid: { left: '8%', right: '5%', top: 20, bottom: 30, containLabel: true },
  xAxis: {
    type: 'category',
    data: chartData.value.map((d: any) => new Date(d.timestamp).toLocaleTimeString()),
    axisLabel: { rotate: 45 },
  },
  yAxis: {
    type: 'value',
    name: props.metricKey === 'temperature' ? '°C' : '%',
  },
  series: [
    {
      name: props.metricKey.toUpperCase(),
      type: 'bar',
      data: chartData.value.map((d: any) => d.value),
      itemStyle: { color: props.color, borderRadius: [4, 4, 0, 0] },
      animation: false,
    },
  ],
}))

function onChartReady(chart: any) {
  chartInstance = chart
}

// No need for watch – ECharts will update automatically when option changes
onUnmounted(() => {
  if (chartInstance) chartInstance.dispose()
})
</script>

<style scoped>
.chart-container {
  @apply w-full h-80 bg-white dark:bg-gray-800 rounded-xl shadow-md p-2;
}
.chart { @apply w-full h-full; }
</style>