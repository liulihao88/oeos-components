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
    <o-capacity-progress
      :total="row.totalSpace"
      :used="row.usedSpace"
      :info="['UNKNOWN']"
      :warning="['OVERFLOW', 'CRITICAL', 'SHORT', 'OVERHALF']"
      :primary="['SUFFICIENT']"
      value="OVERFLOW"
      :customColor="true"
    ></o-capacity-progress>
    <br>
    <o-capacity-progress
      :total="row.totalSpace"
      :used="row.usedSpace"
      :info="['UNKNOWN']"
      :warning="['OVERFLOW', 'CRITICAL', 'SHORT', 'OVERHALF']"
      :primary="['SUFFICIENT']"
      value="SUFFICIENT"
      :customColor="true"
    ></o-capacity-progress>
    <br></br>
    <o-capacity-progress
      :total="row.totalSpace"
      :used="row.usedSpace"
      :info="['UNKNOWN']"
      :warning="['OVERFLOW', 'CRITICAL', 'SHORT', 'OVERHALF']"
      :primary="['SUFFICIENT']"
      value="UNKNOWN"
      :customColor="true"
    ></o-capacity-progress>
    <br></br>
    <o-capacity-progress
      :total="row.totalSpace"
      :used="row.usedSpace"
      :info="['UNKNOWN']"
      :warning="['OVERFLOW', 'CRITICAL', 'SHORT', 'OVERHALF']"
      :danger="['BUG']"
      :primary="['SUFFICIENT']"
      value="BUG"
      :customColor="true"
    ></o-capacity-progress>
  </div>
</template>
