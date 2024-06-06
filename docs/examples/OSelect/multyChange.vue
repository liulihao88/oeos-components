<script setup lang="ts">
import { ref, getCurrentInstance, nextTick } from 'vue'
const { proxy } = getCurrentInstance()
const options = ref([
  { label: '张三', value: 'z3' },
  { label: '李四', value: 'l4' },
  { label: '王五', value: 'w5' },
  { label: '赵六', value: 'z6' },
])
const selectRefs = ref()
const getSelectRef = (e, i) => {
  selectRefs[`select${i}`] = e
}
function selectChange(val) {
  console.log(`33 val`, val)
}
nextTick(() => {
  options.value.forEach((v, i) => {
    selectRefs[`select${i}`]?.$refs.selectRef.$emit('change', options.value[i].value)
  })
})
</script>

<template>
  <div>
    <div v-for="(v, i) in options" :key="i">
      <o-select
        :ref="(el) => getSelectRef(el, i)"
        v-model="v.value"
        :options="options"
        @change="selectChange"
      ></o-select>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
