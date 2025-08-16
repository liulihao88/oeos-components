<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { formatTime, getVariable } from '@oeos-components/utils'
const options = [
  {
    label: 'formatTime基本用法',
    value: formatTime(new Date()),
  },
  {
    label: 'formatTime基本用法',
    value: formatTime(new Date()),
  },
  {
    label: 'formatTime(new Date())',
    value: formatTime(new Date()),
  },
]
</script>

<template>
  <div>
    {{ getVariable('--blue') }}
  </div>
</template>
