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
import { clone, formatBytes, formatBytesConvert, formatThousands } from '@/utils/index.ts'
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
      return `${param.name}: ${formatThousands(param.value)}个 <br> 总大小: ${formatBytes(params[1].value)}`
    },
  },
  grid: {
    containLabel: true,
    top: '6%',
    right: '2%',
    bottom: '2%',
    left: '2%',
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
  yAxis: [
    {
      type: 'value',
      axisLine: {
        show: false, // 不显示y轴轴线
      },
      splitLine: {
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
    {
      type: 'value',
      position: 'right',
      axisLine: {
        show: false, // 不显示y轴轴线
      },
      splitLine: {
        lineStyle: {
          opacity: 0.4,
          // type: 'dashed', // 设置分隔线为虚线
          color: '#30bd82', // 设置分隔线颜色
        },
      },
      axisLabel: {
        color: '#8e97ae',
        formatter: (value) => {
          let res = formatBytes(value, { toFixed: 2 })
          return res
        },
      },
    },
  ],
  series: [
    {
      data: [],
      type: 'bar',
      barWidth: '20%',
      label: {
        show: true,
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
      type: 'bar',
      yAxisIndex: 1,
      barWidth: '20%',
      label: {
        show: true,
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
function formatter(params) {
  let res = `${params.name} \n <span class="cl-blue">${params.value}</span>`
  let { value, name } = params.data
  return `${name}: ${value}\n 占比: (${params.percent}%)`
}

// 计算y轴的最大值
function _parseYAxisMax(yData) {
  let getMax = Math.max(...yData)
  let toBytes = formatBytes(getMax)
  console.log(`57 toBytes`, toBytes)
  let toUpperBytes = roundUpToNearestKB(toBytes)
  console.log(`22 toUpperBytes`, toUpperBytes)
  let max = formatBytesConvert(toUpperBytes)
  console.log(`48 max`, max)
  initOption.yAxis[1].max = max
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
    isEmpty.value = val.every((v) => {
      return !v.value
    })
    let filterEmptyData = val.filter((v) => {
      return v.value
    })
    let xData = filterEmptyData.map((v) => v.name)
    let yData = filterEmptyData.map((v) => v.value)
    let y2Data = filterEmptyData.map((v) => v.value2)
    if (xData.length > 4) {
      initOption.xAxis.axisLabel.rotate = 45
    } else {
      initOption.xAxis.axisLabel.rotate = 0
    }
    // _parseYAxisMax(y2Data)
    initOption.series[0].data = yData
    initOption.series[1].data = y2Data
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
