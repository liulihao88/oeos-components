<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

const row = ref({
  totalSpace: 11111,
  usedSpace: 2222,
  overUsedSpace: 11333,
})
</script>

<template>
  <div>
    <o-capacity-progress :total="row.totalSpace" :used="row.usedSpace">
      {{ proxy.formatBytes(row.usedSpace) }} / {{ proxy.formatBytes(row.totalSpace) }}
    </o-capacity-progress>

    <hr>

    <o-capacity-progress :total="row.totalSpace" :used="row.overUsedSpace">
      {{ proxy.formatBytes(row.overUsedSpace) }} / {{ proxy.formatBytes(row.totalSpace) }}
    </o-capacity-progress>
  </div>
</template>
