<script setup lang="ts">
import { ref, getCurrentInstance, nextTick, watch } from 'vue'
const { proxy } = getCurrentInstance()
const options = ref([
  { label: '张三', cc: 'a', value: 'z3' },
  { label: '李四', cc: 'b', value: 'l4' },
  { label: '王五', cc: 'c', value: 'w5' },
  { label: '赵六', cc: 'd', value: 'z6' },
])
const selectRefs = ref()
const setValue = ref()
const getSelectRef = (e, i) => {
  selectRefs[`select${i}`] = e
}
nextTick(() => {
  options.value.forEach((v, i) => {
    selectRefs[`select${i}`]?.$refs.selectRef.$emit('change', options.value[i].value)
  })
})

watch(
  options,
  (val) => {
    console.log(`38 21行 docs/examples/OSelect/multyChange.vue val`, val)
  },
  {
    deep: true,
    immediate: true,
  },
)
</script>

<template>
  <div>
    <div v-for="(v, i) in options" :key="i">
      <o-select v-model="v.cc" :options="options" :ref="(el) => getSelectRef(el, i)"></o-select>
    </div>

    <o-select v-model="setValue" :options="options"></o-select>
  </div>
</template>

<style scoped lang="scss"></style>
