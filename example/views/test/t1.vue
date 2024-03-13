<script setup lang="ts">
import { ref, getCurrentInstance, nextTick, onMounted } from 'vue'
import { $toast } from '@/utils/gFunc.js'
import { createMessage } from '@/components/customMessage/method'

console.log(`createMessage`, createMessage)
const { proxy } = getCurrentInstance()
const props = defineProps({})

onMounted(() => {
  createMessage({
    message: 'hello world again',
    duration: 0,
    type: 'success',
    showClose: true,
  })
})
</script>

<template>
  <div>
    <div>example/views/test/t111111111.vue</div>
  </div>
</template>

<style scoped lang="scss"></style>
