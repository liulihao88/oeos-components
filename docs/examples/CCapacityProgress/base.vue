<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

const row = ref({
  totalSpace: 11111,
  usedSpace: 2222,
})
</script>

<template>
  <div>
    <o-capacity-progress :total="row.totalSpace" :used="row.usedSpace">
      {{ proxy.formatBytes(row.usedSpace) }} / {{ proxy.formatBytes(row.totalSpace) }}
    </o-capacity-progress>
  </div>
</template>
