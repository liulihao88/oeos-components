<template>
  <o-flex class="h-100">
    <div
      v-for="(item, index) in new Array(4)"
      :key="item"
      :style="{
        background: `rgb(${50 + index * 50}, ${100 + index * 30}, ${150 + index * 20})`,
        width: '100%',
        height: '100%',
      }"
    />
  </o-flex>
</template>
<script setup lang="ts">
import { ref } from 'vue'
</script>
