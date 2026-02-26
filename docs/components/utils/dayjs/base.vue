<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { formatDateToDay, formatDateToMinute, formatDate, diffDate, diffDateFromCurrent } from '@/utils/src/index.ts'
</script>

<template>
  <div>
    <div>{{ formatDate(new Date()) }}</div>
    <div>{{ formatDateToDay(new Date()) }}</div>
    <div>{{ formatDateToMinute(new Date()) }}</div>
    <div>{{ diffDate(new Date().getTime() + 3000, new Date()) }}秒</div>
    <div>{{ diffDateFromCurrent(123) }}</div>
  </div>
</template>
