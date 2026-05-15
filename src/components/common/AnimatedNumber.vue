<template>
  <span class="transition-all duration-300">{{ displayValue }}</span>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  value: number
  format?: (value: number) => string
}>()

const displayValue = ref(props.format ? props.format(props.value) : props.value.toString())

watch(() => props.value, (newVal) => {
  displayValue.value = props.format ? props.format(newVal) : newVal.toString()
})
</script>