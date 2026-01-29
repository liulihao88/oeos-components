<template>
  <o-title title="direction 对齐方式"></o-title>
  <el-radio-group v-model="direction">
    <el-radio value="row">row</el-radio>
    <el-radio value="column">column</el-radio>
    <el-radio value="row-reverse">row-reverse</el-radio>
    <el-radio value="column-reverse">column-reverse</el-radio>
  </el-radio-group>
  <o-title title="justify 主轴上如何对齐"></o-title>
  <o-radio
    v-model="justify"
    :options="['start', 'end', 'center', 'space-between', 'space-around', 'space-evenly', 'normal']"
    type="simple"
  ></o-radio>
  <o-title title="align 交叉轴上如何对齐"></o-title>
  <o-radio
    v-model="align"
    :options="['start', 'end', 'center', 'baseline', 'stretch', 'normal']"
    type="simple"
  ></o-radio>
  <o-title title="wrap 自动换行"></o-title>
  <o-radio v-model="wrap" :options="['nowrap', 'wrap', 'wrap-reverse']" type="simple"></o-radio>
  <o-title title="gap设置间距 ['small', 'default', 'large', processWidth的宽度]"></o-title>
  <o-radio v-model="gapRadio" :options="['small', 'default', 'large', 'custom']" type="simple"></o-radio>
  <el-slider v-model="gapProgressValue" v-if="gapRadio === 'custom'"></el-slider>
  <o-flex :direction="direction" :justify="justify" :align="align" :wrap="wrap" :gap="gap" class="h-100 w-100%">
    <div
      v-for="(item, index) in new Array(10)"
      :key="item"
      :style="{
        background: `rgb(${50 + index * 1}, ${100 + index * 30}, ${150 + index * 1})`,
        width: '100px',
        height: '30px',
      }"
    />
  </o-flex>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import type { CSSProperties } from 'vue'
const direction = ref('row')
const justify = ref('normal')
const align = ref('normal')
const wrap = ref('nowrap')
const gapRadio: any = ref('small')
const gap = ref(gapRadio.value)
const gapProgressValue = ref(0)
watch(gapRadio, (val) => {
  if (val !== 'custom') {
    gap.value = val
  }
})

watch(gapProgressValue, (val) => {
  console.log(`65 val`, val)
  gap.value = val
})
</script>
