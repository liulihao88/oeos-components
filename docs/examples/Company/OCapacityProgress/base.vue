<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { formatBytes } from '@/utils/src/index.ts'

const row = ref({
  noUsed: -234,
  totalSpace: 100,
  usedSpace: 23,
  overUsedSpace: 200,
})

function parseSpace(space) {
  if (!space) {
    return '0.00B'
  }
  if (space < 0) {
    return '?'
  }
  return formatBytes(space ?? 0)
}
</script>

<template>
  <div>
    <o-capacity-progress :total="row.totalSpace" :used="row.usedSpace"></o-capacity-progress>

    <hr />

    <o-capacity-progress :total="row.totalSpace" :used="row.overUsedSpace"></o-capacity-progress>

    <hr />
    <o-capacity-progress :total="row.totalSpace" :used="row.noUsed">
      <span>{{ parseSpace(row.noUsed) }} / {{ parseSpace(row.totalSpace) }}</span>
    </o-capacity-progress>
  </div>
</template>
