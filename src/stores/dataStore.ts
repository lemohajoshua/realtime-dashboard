import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { DataPoint, MetricSummary, ActivityEvent } from '@/types/dataPoint'

export const useDataStore = defineStore('data', () => {
  // ---------- State ----------
  const dataPoints = ref<DataPoint[]>([])
  const activityFeed = ref<ActivityEvent[]>([])
  const isStreaming = ref(true)
  const timeRange = ref<'1m' | '5m' | '1h' | 'realtime'>('realtime')
  const selectedMetrics = ref<Array<keyof Omit<DataPoint, 'timestamp'>>>([
    'cpu',
    'memory',
    'requests',
    'temperature',
  ])
  
  // ---------- Getters (computed) ----------
  const filteredData = computed(() => {
    if (timeRange.value === 'realtime') return dataPoints.value
    
    const now = Date.now()
    const ranges = { '1m': 60 * 1000, '5m': 5 * 60 * 1000, '1h': 60 * 60 * 1000 }
    const cutoff = now - ranges[timeRange.value]
    return dataPoints.value.filter(dp => dp.timestamp >= cutoff)
  })
  
  const cpuMetrics = computed<MetricSummary>(() =>
    calculateMetrics(filteredData.value, 'cpu')
  )
  const memoryMetrics = computed(() =>
    calculateMetrics(filteredData.value, 'memory')
  )
  const requestsMetrics = computed(() =>
    calculateMetrics(filteredData.value, 'requests')
  )
  const temperatureMetrics = computed(() =>
    calculateMetrics(filteredData.value, 'temperature')
  )
  
  // Helper: compute min/max/avg for a field
  function calculateMetrics(data: DataPoint[], field: keyof Omit<DataPoint, 'timestamp'>): MetricSummary {
    if (data.length === 0) {
      return { current: 0, average: 0, max: 0, min: 0 }
    }
    const values = data.map(dp => dp[field] as number)
    const current = values[values.length - 1]
    const sum = values.reduce((acc, val) => acc + val, 0)
    return {
      current,
      average: sum / values.length,
      max: Math.max(...values),
      min: Math.min(...values),
    }
  }
  
  // ---------- Actions ----------
  function addDataPoint(point: DataPoint) {
    dataPoints.value.push(point)
    // Keep only last 500 points to prevent memory bloat
    if (dataPoints.value.length > 500) {
      dataPoints.value = dataPoints.value.slice(-500)
    }
  }
  
  function addActivityEvent(event: Omit<ActivityEvent, 'id'>) {
    const newEvent: ActivityEvent = {
      ...event,
      id: crypto.randomUUID(),
    }
    activityFeed.value.unshift(newEvent)  // newest first
    // Keep last 200 events
    if (activityFeed.value.length > 200) {
      activityFeed.value = activityFeed.value.slice(0, 200)
    }
  }
  
  function clearData() {
    dataPoints.value = []
    activityFeed.value = []
  }
  
  function toggleStreaming() {
    isStreaming.value = !isStreaming.value
    addActivityEvent({
      timestamp: Date.now(),
      type: 'info',
      message: isStreaming.value ? 'Resumed data stream' : 'Paused data stream',
      source: 'System',
    })
  }
  
  function setTimeRange(range: '1m' | '5m' | '1h' | 'realtime') {
    timeRange.value = range
  }
  
  function toggleMetric(metric: keyof Omit<DataPoint, 'timestamp'>) {
    const index = selectedMetrics.value.indexOf(metric)
    if (index === -1) {
      selectedMetrics.value.push(metric)
    } else {
      selectedMetrics.value.splice(index, 1)
    }
  }
  
  return {
    // state
    dataPoints,
    activityFeed,
    isStreaming,
    timeRange,
    selectedMetrics,
    // getters
    filteredData,
    cpuMetrics,
    memoryMetrics,
    requestsMetrics,
    temperatureMetrics,
    // actions
    addDataPoint,
    addActivityEvent,
    clearData,
    toggleStreaming,
    setTimeRange,
    toggleMetric,
  }
})