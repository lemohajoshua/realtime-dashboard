export interface DataPoint {
  timestamp: number;
  cpu: number;
  memory: number;
  requests: number;
  temperature: number;
}

export interface MetricSummary {
  current: number;
  average: number;
  max: number;
  min: number;
}

export interface ActivityEvent {
  id?: string;
  timestamp: number;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  source: string;
}