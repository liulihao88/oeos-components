<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1)
</script>

<template>
  <div>
    <o-input-number v-model="value" :min="0" :max="10" />
    <span class="m-l-12">当前值: {{ value }}</span>
  </div>
</template>

<style scoped lang="scss"></style>
