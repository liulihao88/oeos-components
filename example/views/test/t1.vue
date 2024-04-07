<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
export {
  isArray,
  isFunction,
  isObject,
  isString,
  isDate,
  isPromise,
  isSymbol,
} from '@vue/shared'
const { proxy } = getCurrentInstance()

console.log(`isArray([])`, isArray([]))
console.log(`isObject([])`, isObject([]))
</script>

<template>
  <div>
    <div>example/views/test/t1.vue</div>
  </div>
</template>

<style scoped lang="scss"></style>
