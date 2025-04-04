<script setup lang="ts" name="OCountBar">
import { ref, getCurrentInstance, onMounted, watch } from 'vue'
import VChart from 'vue-echarts'
import '@/utils/useEcharts.ts'
import { clone } from '@/utils/index.ts'
const props = defineProps({
  data: {
    type: Array,
    default: () => [], // [{name: '<1024kb', value: 22}]
  },
})
const option = ref()
const isEmpty = ref(false)

let initOption = {
  tooltip: {
    trigger: 'axis', // 设置触发方式为坐标轴
    formatter: (params) => {
      const param = params[0]
      return `${param.name}: ${param.value}个`
    },
  },
  grid: {
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      color: '#8e97ae',
      interval: 0, // 显示所有标签
      rotate: 0,
    },
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: false, // 不显示y轴轴线
    },
    splitLine: {
      lineStyle: {
        type: 'dashed', // 设置分隔线为虚线
        color: '#ccc', // 设置分隔线颜色
      },
    },
    axisLabel: {
      color: '#8e97ae',
    },
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      barWidth: '30%',
      label: {
        show: true,
        position: 'top',
      },
      itemStyle: {
        borderRadius: 10, // 设置柱子的圆角
        color: '#1b78fc', // 设置柱子的颜色
      },
      // showBackground: true,
      // backgroundStyle: {
      //   color: 'rgba(27, 120, 252, 0.1)', // 设置背景颜色
      //   borderColor: '#1b78fc', // 设置背景边框颜色
      //   borderWidth: 1,
      //   borderType: 'dashed', // 设置背景边框为虚线
      //   borderRadius: 10, // 设置背景边框的圆角
      // },
    },
  ],
}
function formatter(params) {
  let res = `${params.name} \n <span class="cl-blue">${params.value}</span>`
  let { value, name } = params.data
  return `${name}: ${value}\n 占比: (${params.percent}%)`
}

watch(
  () => props.data,
  (val) => {
    console.log(`98 val`, val)
    isEmpty.value = val.every((v) => {
      return !v.value
    })
    let filterEmptyData = val.filter((v) => {
      return v.value
    })
    let xData = filterEmptyData.map((v) => v.name)
    let yData = filterEmptyData.map((v) => v.value)
    if (xData.length > 4) {
      initOption.xAxis.axisLabel.rotate = 45
    } else {
      initOption.xAxis.axisLabel.rotate = 0
    }
    initOption.series[0].data = yData
    initOption.xAxis.data = xData
    option.value = clone(initOption)
  },
  {
    deep: true,
    immediate: true,
  },
)
</script>

<template>
  <template v-if="isEmpty">
    <o-empty class="h-100%" />
  </template>
  <template v-else>
    <VChart class="calc-height" :option="option" autoresize />
  </template>
</template>

<style lang="scss" scoped>
.calc-height {
  height: 100%;
  min-height: 100px;
}
</style>
