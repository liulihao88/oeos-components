<script setup lang="ts" name="OCountBar">
/**
  "inCount": {
      "<1024B": 2,
      "1K-1MB": 11,
      "1MB-10MB": 4,
      "10MB-50MB": 0,
      "50MB-100MB": 0,
      "100MB-500MB": 0,
      "500MB-1GB": 0,
      "1GB-5GB": 0,
      ">5GB": 0
  },
  "inSize": {
      "<1024B": 559,
      "1K-1MB": 4239524,
      "1MB-10MB": 5298741,
      "10MB-50MB": 0,
      "50MB-100MB": 0,
      "100MB-500MB": 0,
      "500MB-1GB": 0,
      "1GB-5GB": 0,
      ">5GB": 0
  },
 */
import { ref, getCurrentInstance, onMounted, watch, defineAsyncComponent } from 'vue'
// import VChart from 'vue-echarts'
const VChart = defineAsyncComponent(() => import('vue-echarts')) // // 因为直接引入vue-echarts, 使用vitepress打包回报错, 在使用 VitePress 打包时，如果引入的 vue-echarts 中包含对 document 的引用，可能会导致 document is not defined 的错误。这是因为 VitePress 使用了服务器端渲染（SSR），而 document 是浏览器环境中的对象，在服务器端环境中不存在。以下是几种可能的解决
import '@/utils/useEcharts.ts'
import { clone, formatBytes, formatBytesConvert, isEmpty, formatThousands } from '@/utils/index.ts'
const props = defineProps({
  data: {
    type: Array,
    default: () => [], // [{name: '<1024kb', value: 22}]
  },
})
const option = ref()
const isDataEmpty = ref(false)

let initOption = {
  tooltip: {
    trigger: 'axis', // 设置触发方式为坐标轴
    axisPointer: {
      // Use axis to trigger tooltip
      type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
    },
    formatter: (params) => {
      const param = params[0]
      return `${param.name}: ${formatThousands(param.value)}个 <br> 总大小: ${formatBytes(params[1].value)}`
    },
  },
  grid: {
    containLabel: true,
    top: '2%',
    right: '2%',
    bottom: '2%',
    left: '2%',
  },
  xAxis: [
    {
      type: 'value',
      show: false,
    },
    {
      type: 'value',
      show: false,
    },
  ],
  yAxis: {
    type: 'category',
    axisTick: {
      show: false, // 隐藏刻度线
    },
    axisLine: {
      show: false, // 隐藏轴线（可选项）
    },
    splitLine: {
      show: false,
      lineStyle: {
        type: 'dashed', // 设置分隔线为虚线
        color: '#1b78fc', // 设置分隔线颜色
        opacity: 0.4,
      },
    },
    minInterval: 1,
    axisLabel: {
      color: '#8e97ae',
      formatter: (value) => {
        let res = formatNumberWithChineseAbbreviation(value)
        return res
      },
    },
  },
  series: [
    {
      data: [],
      type: 'bar',
      barWidth: '20%',
      label: {
        show: false,
        position: 'top',
        formatter: (params) => {
          return formatThousands(params.value)
        },
      },
      itemStyle: {
        borderRadius: 10, // 设置柱子的圆角
        color: '#1b78fc', // 设置柱子的颜色
      },
    },
    {
      data: [],
      xAxisIndex: 1,
      type: 'bar',
      barWidth: '20%',
      label: {
        show: false,
        position: 'top',
        formatter: (params) => {
          return formatBytes(params.value)
        },
      },
      itemStyle: {
        borderRadius: 10, // 设置柱子的圆角
        color: '#30bd82', // 设置柱子的颜色
      },
    },
  ],
}

function roundUpToNearestKB(bytes) {
  const regex = /^(\d+(\.\d+)?)\s*([a-zA-Z]+)?$/
  const match = bytes.match(regex)
  const number = parseFloat(match[1])
  const unit = match[3] ? match[3].toUpperCase() : null

  // 向上取整到最近的1000字节的倍数
  const roundedSizeInBytes = Math.ceil(number / 1000) * 1000

  // 转换回KB

  return roundedSizeInBytes + unit
}

function formatNumberWithChineseAbbreviation(num) {
  if (num >= 1e12) {
    return formatThousands(num / 1e12) + '兆'
  } else if (num >= 1e8) {
    return formatThousands(num / 1e8) + '亿'
  } else if (num >= 1e4) {
    return formatThousands(num / 1e4) + '万'
  } else {
    return formatThousands(num)
  }
}

watch(
  () => props.data,
  (val) => {
    if (isEmpty(val)) {
      return
    }

    let parseData = Object.entries(val.inCount).map(([keysOf, value]) => {
      return {
        name: keysOf,
        value: value,
        value2: val.inSize[keysOf],
      }
    })

    isDataEmpty.value = parseData.every((v) => {
      return !v.value
    })
    let filterEmptyData = parseData.filter((v) => {
      // return v.value
      return true
    })
    let yData = filterEmptyData.map((v) => v.name)
    let xData = filterEmptyData.map((v) => v.value)
    let x2Data = filterEmptyData.map((v) => v.value2)
    initOption.series[0].data = xData
    initOption.series[1].data = x2Data
    initOption.yAxis.data = yData
    option.value = clone(initOption)
  },
  {
    deep: true,
    immediate: true,
  },
)
</script>

<template>
  <template v-if="isDataEmpty">
    <o-empty class="h-100%" />
  </template>
  <template v-else>
    <div class="vChart-box">
      <VChart class="calc-height" :option="option" autoresize />
    </div>
  </template>
</template>

<style lang="scss" scoped>
.calc-height {
  height: 100%;
  min-height: 100px;
}
</style>
