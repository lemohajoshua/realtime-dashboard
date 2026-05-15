import { ref, onUnmounted } from 'vue'
import type { DataPoint, ActivityEvent } from '@/types/dataPoint'
import { generateRandomDataPoint } from '@/utils/dataGenerator'

export function useWebSocket() {
  const isConnected = ref(false)
  const error = ref<string | null>(null)
  let intervalId: number | null = null
  
  function connect(onMessage: (data: DataPoint) => void, onEvent: (event: ActivityEvent) => void) {
    if (intervalId) return
    
    // Simulate connection establishment
    isConnected.value = true
    error.value = null
    
    onEvent({
      timestamp: Date.now(),
      type: 'success',
      message: 'WebSocket connected – data stream active',
      source: 'System',
    })
    
    // Emit a new data point every second
    intervalId = window.setInterval(() => {
      try {
        const newPoint = generateRandomDataPoint()
        onMessage(newPoint)
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'Unknown error'
        onEvent({
          timestamp: Date.now(),
          type: 'error',
          message: `Data generation error: ${error.value}`,
          source: 'System',
        })
      }
    }, 1000)
  }
  
  function disconnect() {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
    isConnected.value = false
  }
  
  onUnmounted(() => {
    disconnect()
  })
  
  return {
    isConnected,
    error,
    connect,
    disconnect,
  }
}