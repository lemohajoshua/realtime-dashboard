<template>
  <div class="activity-feed">
    <div class="feed-header">
      <h3 class="text-lg font-semibold">Live Activity Feed</h3>
      <button @click="clearFeed" class="text-sm text-gray-500 hover:text-gray-700">
        Clear
      </button>
    </div>
    <div class="feed-items" ref="feedContainer">
      <div
        v-for="event in store.activityFeed"
        :key="event.id"
        class="feed-item"
        :class="`border-l-4 border-${getEventColor(event.type)}-500`"
      >
        <div class="flex justify-between items-start">
          <div>
            <p class="text-sm font-medium">{{ event.message }}</p>
            <p class="text-xs text-gray-500">{{ formatTime(event.timestamp) }}</p>
          </div>
          <span class="text-xs font-semibold" :class="`text-${getEventColor(event.type)}-600`">
            {{ event.type.toUpperCase() }}
          </span>
        </div>
        <div class="text-xs text-gray-400 mt-1">Source: {{ event.source }}</div>
      </div>
      <div v-if="store.activityFeed.length === 0" class="empty-feed">
        No events yet. Waiting for data...
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '@/stores/dataStore'

const store = useDataStore()

function getEventColor(type: string): string {
  const colors = { info: 'blue', warning: 'yellow', error: 'red', success: 'green' }
  return colors[type as keyof typeof colors] || 'gray'
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString()
}

function clearFeed() {
  store.activityFeed = []
}
</script>

<style scoped>
.activity-feed {
  @apply bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden;
}
.feed-header {
  @apply px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center;
}
.feed-items {
  @apply h-96 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700;
}
.feed-item {
  @apply p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition;
}
.empty-feed {
  @apply p-8 text-center text-gray-500;
}
</style>