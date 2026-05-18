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
import { ref, getCurrentInstance, onMounted, onBeforeUnmount, watch, defineAsyncComponent } from 'vue'
// import VChart from 'vue-echarts'
const VChart = defineAsyncComponent(() => import('vue-echarts')) // // 因为直接引入vue-echarts, 使用vitepress打包回报错, 在使用 VitePress 打包时，如果引入的 vue-echarts 中包含对 document 的引用，可能会导致 document is not defined 的错误。这是因为 VitePress 使用了服务器端渲染（SSR），而 document 是浏览器环境中的对象，在服务器端环境中不存在。以下是几种可能的解决
import '@/utils/local/useEcharts'
import { clone, formatBytes, formatBytesConvert, getVariable, isEmpty, formatThousands } from '@/utils/src'
const props = defineProps({
  data: {
    type: Array,
    default: () => [], // [{name: '<1024kb', value: 22}]
  },
  options: {
    type: Object,
    default: () => {
      return {
        count: 'inCount',
        size: 'inSize',
        format: '',
      }
    },
  },
})
const option = ref()
const isDataEmpty = ref(false)
const themeVersion = ref(0)
let themeObserver: MutationObserver | null = null

const syncCountBarTheme = () => {
  initOption.tooltip.backgroundColor = getVariable('--chart-tooltip-bg')
  initOption.tooltip.borderColor = getVariable('--chart-tooltip-border')
  initOption.tooltip.textStyle.color = getVariable('--chart-tooltip-text')
  initOption.yAxis.splitLine.lineStyle.color = getVariable('--chart-grid-primary')
  initOption.yAxis.axisLabel.color = getVariable('--chart-axis-text')
  initOption.series[0].itemStyle.color = getVariable('--chart-series-primary')
  initOption.series[1].itemStyle.color = getVariable('--chart-series-secondary')
}

let initOption = {
  tooltip: {
    trigger: 'axis', // 设置触发方式为坐标轴
    backgroundColor: '',
    borderColor: '',
    textStyle: {
      color: '',
    },
    axisPointer: {
      // Use axis to trigger tooltip
      type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
    },
    formatter: (params) => {
      const param = params[0]
      return `<div  style="font-weight: bold; font-size:16px">${param.axisValueLabel}</div>总数量: ${formatThousands(param.value)}个 <br> 总大小: ${formatBytes(params[1].value)}`
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
        color: '',
        opacity: 0.4,
      },
    },
    minInterval: 1,
    axisLabel: {
      color: '',
      formatter: (value) => {
        // let res = formatNumberWithChineseAbbreviation(value)
        // return res
        return value
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
        color: '',
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
        color: '',
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
    syncCountBarTheme()
    if (isEmpty(val)) {
      isDataEmpty.value = true
      return
    } else {
      isDataEmpty.value = false
    }

    let parseData = Object.entries(val[props.options.count]).map(([keysOf, value]) => {
      return {
        name: keysOf,
        value: value,
        value2: val[props.options.size][keysOf],
      }
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

watch(themeVersion, () => {
  syncCountBarTheme()
  option.value = clone(initOption)
})

onMounted(() => {
  if (typeof MutationObserver !== 'undefined') {
    themeObserver = new MutationObserver(() => {
      themeVersion.value += 1
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme', 'style'],
    })
  }
})

onBeforeUnmount(() => {
  themeObserver?.disconnect()
})
</script>

<template>
  <template v-if="isDataEmpty">
    <o-empty class="h-100%" />
  </template>
  <template v-else>
    <VChart class="calc-height" :option="option" autoresize />
  </template>
</template>

<style lang="scss" scoped>
@import '@/styles/utilities.scss';

.calc-height {
  height: 100%;
  min-height: 100px;
}
</style>
