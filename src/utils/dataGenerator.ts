import type { DataPoint } from '../types/dataPoint'

let lastCpu = 45,
  lastMemory = 60,
  lastRequests = 1200,
  lastTemperature = 22

function randomWalk(current: number, min: number, max: number, step: number): number {
  let delta = (Math.random() - 0.5) * step
  let next = current + delta
  if (next < min) next = min + (min - next)
  if (next > max) next = max - (next - max)
  return Math.round(next * 10) / 10
}

export function generateRandomDataPoint(): DataPoint {
  lastCpu = randomWalk(lastCpu, 5, 95, 2)
  lastMemory = randomWalk(lastMemory, 30, 90, 1.5)
  lastRequests = randomWalk(lastRequests, 800, 2500, 50)
  lastTemperature = randomWalk(lastTemperature, 18, 45, 0.5)
  
  return {
    timestamp: Date.now(),
    cpu: lastCpu,
    memory: lastMemory,
    requests: Math.round(lastRequests),
    temperature: lastTemperature,
  }
}