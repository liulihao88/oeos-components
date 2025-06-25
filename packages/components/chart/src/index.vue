<script setup lang="ts" name="OChart">
import { ref, getCurrentInstance, onMounted, watch } from 'vue'
const { proxy } = getCurrentInstance()
import * as echarts from 'echarts'
import { processWidth } from '@/utils/index'
import type { EChartsOption } from 'echarts'
import { useEcharts } from './useEcharts.ts'
const echartDivRef = ref<HTMLElement>(null)

// const props = defineProps({
//   height: {
//     type: [String, Number],
//     default: '400px',
//   },
//   width: {
//     type: [String, Number],
//     default: '100%',
//   },
//   option: {
//     type: Object,
//     default: () => {},
//   },
// })

const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    option: EChartsOption
  }>(),
  {
    height: '400px',
    width: '100%',
  },
)

const init = () => {
  if (echartDivRef.value) {
    let myChart = echarts.init(echartDivRef.value)
    if (myChart) {
      useEcharts(myChart, props.option)
    }
  }
}

const resizeChart = () => {
  if (echartDivRef.value) {
    let myChart = echarts.init(echartDivRef.value)
    if (myChart) {
      setTimeout(() => {
        myChart.resize()
        init()
      }, 0)
    }
  }
}

watch(
  [() => props.width, () => props.height, () => props.option],
  (val) => {
    resizeChart()
  },
  {
    deep: true,
    immediate: true,
  },
)

onMounted(() => {
  init()
})

/**
* @使用方法
  <div class="f">
    <div class="f-1">
      <o-chart
        :option="option"
        style="height: 700px"
      ></o-chart>
    </div>
    <div class="f-1">
      <o-chart :option="options2" class="g-100"></o-chart>
    </div>
    <div class="f-1">
      <o-chart :option="options3" h="100px"></o-chart>
    </div>
  </div>
*/
</script>

<template>
  <div ref="echartDivRef" :style="{ height: processWidth(height, true), width: processWidth(width, true) }" />
</template>

<style scoped lang="scss"></style>
