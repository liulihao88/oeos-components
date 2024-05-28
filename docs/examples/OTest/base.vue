<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
console.log(`67 proxy.formatBytes('321321321')`, proxy.formatBytes('321321321'))
console.log(`67 proxy.formatBytes(321321321)`, proxy.formatBytes(32132132222222221))
console.log(`67 proxy.formatBytes(-1)`, proxy.formatBytes(-1))
console.log(`67 proxy.formatBytes('-1')`, proxy.formatBytes('-1'))
console.log(`67 proxy.formatBytes(0)`, proxy.formatBytes(0))
console.log(`67 proxy.formatBytesConvert('20 KB')`, proxy.formatBytesConvert('20 KB'))
console.log(`67 proxy.formatBytesConvert('11120PB')`, proxy.formatBytesConvert('20 PB'))
console.log(`6711 proxy.formatBytesConvert('11120PB')`, proxy.formatBytesConvert('男人'))
</script>

<template>
  <div>
    <div>docs/examples/OTest/base.vue</div>
  </div>
</template>

<style scoped lang="scss"></style>
