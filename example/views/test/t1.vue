<script setup lang="ts">
import { ref, getCurrentInstance, nextTick } from 'vue'
import { $toast } from 'pkg/utils/gFunc.js'
import { createMessage } from '../../../packages/components/customMessage/method'

console.log(`createMessage`, createMessage)
const { proxy } = getCurrentInstance()
const props = defineProps({})
nextTick(() => {
  createMessage({ message: 'hello 1111111111world', duration: 0 })
  createMessage({ message: 'hello 1111111111world', duration: 0 })
  createMessage({ message: 'hello 1111111111world', duration: 0 })
})
</script>

<template>
  <div>
    <div>example/views/test/t111111111.vue</div>
  </div>
</template>

<style scoped lang="scss"></style>
