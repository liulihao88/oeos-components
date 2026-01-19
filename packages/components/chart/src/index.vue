<script setup lang="ts" name="OChart">
import { ref, getCurrentInstance, onMounted, watch, nextTick, markRaw, onBeforeUnmount, computed } from 'vue'
const { proxy } = getCurrentInstance()
import * as echarts from 'echarts'
import { processWidth, debounce } from '../../../../packages/utils/src/index.ts'
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
    id?: string
    option: Record<string, any>
    theme?: string
    isEmpty: boolean | ((options: Record<string, any>) => boolean)
    description: string
  }>(),
  {
    height: '400px',
    isEmpty: false,
    width: '100%',
    description: '暂无数据',
    id: () => Math.random().toString(36).substring(2, 8),
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

const formatEmpty = computed(() => {
  if (typeof props.isEmpty === 'function') {
    return props.isEmpty(props.option)
  }
  return props.isEmpty
})

defineExpose({
  initChart,
  resizeChart,
})

onBeforeUnmount(() => {
  // 取消监听
  // window.removeEventListener('resize', resizeChart)
  // 销毁echarts实例
  chart.value.dispose()
  chart.value = null
})
</script>

<template>
  <div class="o-chart po-r" :style="{ height: processWidth(height, true), width: processWidth(width, true) }">
    <div ref="echartDivRef" :id="id" class="o-chart-container" v-show="!formatEmpty" />
    <slot v-if="formatEmpty" name="empty">
      <el-empty v-bind="$attrs" :description="description" />
    </slot>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.o-chart-container {
  height: 100%;
  width: 100%;
}
</style>
