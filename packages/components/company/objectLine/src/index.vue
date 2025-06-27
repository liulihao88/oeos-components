<script setup lang="ts" name="OObjectLine">
/** @使用方式
  时间最小区间是30分钟, 最大区间是2周
*/
import { ref, getCurrentInstance, computed, watch } from 'vue'
import DisabledCountDate from './disabledCountDate.vue'
import { formatThousands, notEmpty, formatTime, formatBytes } from '@/utils/index.ts'
import * as echarts from 'echarts'

defineOptions({
  name: 'OObjectLine'
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

const dateRange = ref([new Date(new Date().toLocaleDateString()).getTime(), new Date().getTime()])

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

watch(
  () => dateRange.value,
  () => {
    emits('dateChange', dateRange.value)
  },
  { immediate: true },
)

const option = computed(() => {
  return {
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    tooltip: {
      trigger: 'axis', // 设置触发方式为坐标轴
      formatter: (params) => {
        return `${params[0].axisValue} <br> 租户: ${data.value?.[0]?.tenant} <br> 数量: ${formatThousands(params[0].data)} <br> 大小: ${formatBytes(params[1].data)}`
      },
    },
    dataZoom: [
      {
        show: true,
        realtime: true,
        start: 30,
        end: 70,
        xAxisIndex: [0, 1],
      },
    ],
    grid: {
      containLabel: true,
      top: '10%',
      right: '2%',
      bottom: '18%',
      left: '4%',
    },
    legend: {
      data: data.value.map((v) => v.tenant),
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.value?.[0]?.timeValue.map((v) => {
        let time = v.time * 1000
        let timeToStr = formatTime(time)
        return removeYear(timeToStr)
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
        name: data.value[0].tenant,
        type: 'line',
        smooth: true, // Add smooth curve
        lineStyle: {
          color: '#90EE90', // Light green color
          width: 0,
        },
        stack: 'Total',
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(180, 225, 215)',
            },
            {
              offset: 1,
              color: 'rgb(180, 225, 215)',
            },
          ]),
        },
        showSymbol: false,
        emphasis: {
          focus: 'series',
        },
        data: data.value?.[0]?.timeValue.map((v) => Number(v.value)),
      },
      {
        name: data2.value[0].tenant,
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(118, 169, 170)',
            },
            {
              offset: 1,
              color: 'rgb(118, 169, 170)',
            },
          ]),
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
</script>

<template>
  <oBasicLayout class="h-100%">
    <template #header>
      <o-title title="对象数量/大小历史">
        <template #right>
          <DisabledCountDate v-model="dateRange" style="height: 24px" />
        </template>
      </o-title>
    </template>
    <o-chart v-if="notEmpty(data)" :option="option" height="100%" />
    <o-empty v-else class="h-100%" />
  </oBasicLayout>
</template>
