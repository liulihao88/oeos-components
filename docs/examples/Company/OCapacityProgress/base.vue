<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

function parseSpace(space) {
  if (!space) {
    return '0B'
  }
  if (space < 0) {
    return '?'
  }
  return proxy.formatBytes(space ?? 0)
}

const row = ref({
  noUsed: -234,
  totalSpace: 11111,
  usedSpace: 2222,
  overUsedSpace: 11333,
})
</script>

<template>
  <div>
    <o-capacity-progress :total="row.totalSpace" :used="row.usedSpace">

    </o-capacity-progress>

    <hr />

    <o-capacity-progress :total="row.totalSpace" :used="row.overUsedSpace">
     
    </o-capacity-progress>

    <hr />
    <o-capacity-progress :total="row.totalSpace" :used="row.noUsed">
 
    </o-capacity-progress>
  </div>
</template>
