<script setup lang="ts" name="OObjectLine">
/** @使用方式
  时间最小区间是30分钟, 最大区间是2周
*/
import { ref, getCurrentInstance, computed, watch } from 'vue'
import DisabledCountDate from './disabledCountDate.vue'
import { formatThousands, notEmpty, formatTime, formatBytes } from '@/utils/index.ts'
import * as echarts from 'echarts'

defineOptions({
  name: 'OObjectLine',
})

const { proxy } = getCurrentInstance()

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

const data: any = ref([])
const data2: any = ref([])

const dateRange = ref([new Date().getTime() - 3600 * 1000 * 24 * (7 - 1), new Date().getTime()])

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
 * 移除日期字符串中的年份部分
 * @param {string} dateStr - 格式必须为 "YYYY-MM-DD HH:mm:ss"
 * @returns {string} 格式 "MM-DD HH:mm:ss"
 */
function removeYear(dateStr) {
  try {
    return dateStr.replace(/^\d{4}-/, '')
  } catch (e) {
    return dateStr
  }
}
watch([() => props.objectCount, () => props.objectSize], ([val1, val2]) => {
  data.value = val1
  data2.value = val2
})

// watch(
//   () => dateRange.value,
//   () => {
//     emits('dateChange', dateRange.value)
//   },
//   { immediate: true },
// )

const option = computed(() => {
  return {
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    tooltip: {
      trigger: 'axis', // 设置触发方式为坐标轴
      formatter: (params) => {
        let res = `${data.value?.[0]?.tenant} <br> ${params[0].axisValue} <br> `
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

    // dataZoom: [
    //   {
    //     show: true,
    //     realtime: true,
    //     start: 0,
    //     end: 100,
    //     xAxisIndex: [0, 1],
    //   },
    // ],
    grid: {
      containLabel: true,
      top: '10%',
      right: '2%',
      bottom: '4%',
      left: '4%',
    },
    legend: {
      data: ['数量', '大小'],
      right: '10', // 距离右侧 10px
      top: '', // 距离顶部 10px
      orient: 'horizontal', // 水平排列（默认）
      align: 'left', // 文本左对齐
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      showMinLabel: true, // 强制显示第一个
      showMaxLabel: true, // 强制显示最后一个
      data: data.value?.[0]?.timeValue.map((v) => {
        let time = v.time * 1000
        let timeToStr = formatTime(time, '{y}-{m}-{d}')
        return timeToStr
        // return removeYear(timeToStr)
      }),
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
          color: 'rgb(180, 225, 215)', // Light green color
          width: 1,
        },
        stack: 'Total',
        areaStyle: {
          opacity: 1,
          color: 'rgb(180, 225, 215)',
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
          color: proxy.getVariable('--green'),
        },
        showSymbol: false,
        areaStyle: {
          opacity: 1,
          color: proxy.getVariable('--green'),
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
    <o-chart v-if="notEmpty(data)" :option="option" height="100%" />
    <o-empty v-else class="h-100%" />
  </oBasicLayout>
</template>
