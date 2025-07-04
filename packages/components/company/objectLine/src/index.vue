<script setup lang="ts" name="OObjectLine">
/** @使用方式
  时间最小区间是30分钟, 最大区间是2周
*/
import { ref, getCurrentInstance, computed, watch } from 'vue'
import { formatThousands, notEmpty, formatTime, formatBytes, formatBytesConvert, getVariable } from '@/utils'
import * as echarts from 'echarts'

defineOptions({
  name: 'OObjectLine',
})

const { proxy } = getCurrentInstance()
const chartRef = ref(null)

const props = defineProps({
  objectCount: {
    type: Array,
    default: () => [],
  },
  objectSize: {
    type: Array,
    default: () => [],
  },
})

const emits = defineEmits(['dateChange'])
const color = ['rgb(180, 225, 215)', getVariable('--green')]

const data: any = ref([])
const data2: any = ref([])

const dateRange = ref([
  new Date(new Date().toLocaleDateString()).getTime() - 3600 * 1000 * 24 * (30 - 1),
  new Date().getTime(),
])

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

/**
 * 动态四舍五入到最接近的整十/整百
 * @param {number} value - 原始值
 * @returns {number} - 四舍五入后的值
 */
function ceilToNearest(value) {
  if (value <= 10) {
    return Math.ceil(value) // ≤10：四舍五入到个位（1.2 → 2）
  } else if (value <= 100) {
    return Math.ceil(value / 10) * 10 // ≤100：四舍五入到十位（96.34 → 100）
  } else {
    return Math.ceil(value / 100) * 100 // >100：四舍五入到百位（1234 → 1300）
  }
}

const interval = ref(0)

const calcMax = (value) => {
  // value.max 是自动计算出的最大值
  let res = formatBytes(value.max)
  let [num, unit] = res.split(' ')
  let ceilToNearestNum = ceilToNearest(num)
  let maxValue = ceilToNearestNum + ' ' + unit
  let cc = formatBytesConvert(maxValue)
  interval.value = cc / 5
  return cc
}

const option = computed(() => {
  return {
    color: [color[0], color[1], '#37A2FF', '#FF0087', '#FFBF00'],
    tooltip: {
      trigger: 'axis', // 设置触发方式为坐标轴
      formatter: (params, ...arr) => {
        let time = data.value[0].timeValue[params[0].dataIndex].time * 1000
        let parseTime = formatTime(time, '{m}-{d} {h}')
        let res = `<span class='bold'>${data.value?.[0]?.tenant}</span> <br> ${parseTime} <br> `
        params.forEach((v) => {
          if (v.seriesName === '大小') {
            res += ` <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${v.color}; margin-right: 5px;"></span>大小: <span class="bold-700">
              ${formatBytes(v.data)}
            </span>`
          }
          if (v.seriesName === '数量') {
            res += ` <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${v.color}; margin-right: 5px;"></span>数量: <span class="bold-700">${formatThousands(v.data)}</span> <br> `
          }
        })

        return res
      },
    },
    grid: {
      containLabel: true,
      top: '10%',
      right: '4%',
      bottom: '4%',
      left: '4%',
    },
    legend: {
      data: ['数量', '大小'],
      right: '10', // 距离右侧 10px
      orient: 'horizontal', // 水平排列（默认）
      align: 'left', // 文本左对齐
    },
    xAxis: {
      type: 'category',
      interval: 0,
      // showMaxLabel: true, // 强制显示最后一个
      axisLabel: {
        formatter: (value, index, ...arr) => {
          let time = data.value?.[0]?.timeValue[index].time * 1000
          let timeStr = formatTime(time, '{m}-{d}')
          if (index === 0) {
            return timeStr
          }
          let beforeDateTime = data.value?.[0]?.timeValue.slice(0, index)
          let repeatTime = beforeDateTime.some((v) => {
            let nowTime = v.time * 1000
            let nowTimeStr = formatTime(nowTime, '{m}-{d}')
            return nowTimeStr === timeStr
          })
          if (repeatTime) {
            return ''
          }
          console.log(`09 timeStr`, timeStr)
          return timeStr
        },
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
        axisLabel: {
          color: '#8e97ae',
          formatter: (value) => {
            let res = formatNumberWithChineseAbbreviation(value)
            return res
          },
          hideOverlap: true, // 自动隐藏重叠标签
        },
      },
      {
        type: 'value',
        position: 'right',
        splitLine: {
          lineStyle: {
            type: 'dashed', // 设置分隔线为虚线
            color: '#1b78fc', // 设置分隔线颜色
            opacity: 0.4,
          },
        },
        minInterval: 1,
        interval: interval.value,
        max: calcMax,
        axisLabel: {
          color: '#8e97ae',
          formatter: (value) => {
            let res = formatBytes(value)
            return res
          },
        },
      },
    ],
    series: [
      {
        name: '数量',
        type: 'line',
        smooth: true, // Add smooth curve
        lineStyle: {
          color: color[0], // Light green color
          width: 1,
        },
        stack: 'Total',
        areaStyle: {
          opacity: 1,
          color: color[0],
        },
        showSymbol: false,
        emphasis: {
          focus: 'series',
        },
        data: data.value?.[0]?.timeValue.map((v) => Number(v.value)),
      },
      {
        name: '大小',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 1,
          color: color[1],
        },
        showSymbol: false,
        areaStyle: {
          opacity: 1,
          color: color[1],
        },
        emphasis: {
          focus: 'series',
        },
        yAxisIndex: 1,
        data: data2.value?.[0]?.timeValue.map((v) => Number(v.value)),
      },
    ],
  }
})

watch([() => props.objectCount, () => props.objectSize], ([val1, val2]) => {
  data.value = val1
  data2.value = val2
})

defineExpose({
  dateRange,
})
</script>

<template>
  <oBasicLayout class="h-100%">
    <template #header>
      <o-title title="对象数量/大小历史">
        <!-- <template #right>
          <DisabledCountDate v-model="dateRange" style="height: 24px" />
        </template> -->
      </o-title>
    </template>
    <o-chart v-if="notEmpty(data)" :option="option" height="100%" ref="chartRef" />
    <o-empty v-else class="h-100%" />
  </oBasicLayout>
</template>
