<script setup lang="ts" name="OChart">
import { ref, getCurrentInstance, onMounted, watch, nextTick, markRaw } from 'vue'
const { proxy } = getCurrentInstance()
import * as echarts from 'echarts'
import { processWidth, debounce } from '../../../../packages/utils/src/index.ts'
import type { EChartsOption } from 'echarts'
import { useEcharts } from './useEcharts.ts'
const echartDivRef = ref<HTMLElement>(null)

const emits = defineEmits()

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

const chart = ref()

const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    option: EChartsOption
    theme?: string
  }>(),
  {
    height: '400px',
    width: '100%',
  },
)

// 设置图表函数
const setOption = debounce(
  async (data) => {
    if (!chart.value) return
    chart.value.setOption(data, true, true)
    await nextTick()
    resizeChart()
  },
  300,
  true,
)

const initChart = () => {
  chart.value = markRaw(echarts.init(echartDivRef.value, props.theme))
  // setOption(props.option)
  // 返回chart实例
  emits('chart', chart.value)
  setTimeout(() => {
    useEcharts(chart.value, props.option)
  }, 0)
}

// 重绘图表函数
const resizeChart = debounce(
  () => {
    chart.value?.resize()
  },
  300,
  true,
)

watch(
  [() => props.width, () => props.height],
  (val) => {
    resizeChart()
  },
  {
    deep: true,
    immediate: true,
  },
)
watch(
  () => [props.option],
  () => {
    setTimeout(() => {
      initChart()
      resizeChart()
    }, 0)
  },
  {
    deep: true,
    immediate: true,
  },
)

watch(
  () => props.theme,
  async () => {
    chart.value.dispose()
    initChart()
  },
)

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
      <o-chart :option="options3" height="100px"></o-chart>
    </div>
  </div>
*/

defineExpose({
  initChart,
  resizeChart,
})
</script>

<template>
  <div ref="echartDivRef" :style="{ height: processWidth(height, true), width: processWidth(width, true) }" />
</template>

<style scoped lang="scss"></style>
