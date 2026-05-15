import { useDataStore } from '@/stores/dataStore'
import { useWebSocket } from './useWebSocket'
import type { DataPoint, ActivityEvent } from '@/types/dataPoint'

export function useRealTimeData() {
  const store = useDataStore()
  const { isConnected, error, connect, disconnect } = useWebSocket()
  
  function onMessage(point: DataPoint) {
    if (store.isStreaming) {
      store.addDataPoint(point)
      if (point.cpu > 85) {
        store.addActivityEvent({
          timestamp: point.timestamp,
          type: 'warning',
          message: `High CPU usage detected: ${point.cpu}%`,
          source: 'CPU Monitor',
        })
      }
      if (point.memory > 85) {
        store.addActivityEvent({
          timestamp: point.timestamp,
          type: 'warning',
          message: `High memory usage: ${point.memory}%`,
          source: 'Memory Monitor',
        })
      }
    }
  }
  
  function onEvent(event: ActivityEvent) {
    store.addActivityEvent(event)
  }
  
  function start() {
    connect(onMessage, onEvent)
  }
  
  function stop() {
    disconnect()
  }
  
  return {
    isConnected,
    error,
    start,
    stop,
  }
}