<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const isLoading = ref(true)
const loadingText = 'andy凌云志'
</script>

<template>
  <div v-cus-loading:[loadingText]="isLoading" class="h-300">我说呢</div>
</template>
