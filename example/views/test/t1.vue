<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { $toast } from 'pkg/utils/gFunc.js'

const { proxy } = getCurrentInstance()
const props = defineProps({})
$toast('haha ')
$toast({
  message: 'andy',
  type: 'warning',
})
$toast('111n几号', {
  type: 'error',
})
</script>

<template>
  <div>
    <div>example/views/test/t1.vue</div>
  </div>
</template>

<style scoped lang="scss"></style>
