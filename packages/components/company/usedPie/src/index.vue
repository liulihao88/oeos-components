<script setup lang="ts" name="OUsedPie">
import VChart from 'vue-echarts'
import '@/utils/useEcharts.ts'

import { ref, getCurrentInstance, onMounted, watch } from 'vue'
import { getVariable, clone, isEmpty, formatBytes, formatBytesConvert } from '@/utils'

const props = defineProps({
  used: {
    type: [Number, String],
    default: 0,
  },
  total: {
    type: [Number, String],
    default: 0,
  },
  options: {
    type: Object,
    default: () => {},
  },
})
const option = ref()
const usedPercent = ref('0%')

let initOption = {
  tooltip: {
    trigger: 'item',
    show: false,
  },
  series: [
    {
      type: 'pie',
      center: ['50%', '50%'],
      radius: ['65%', '85%'],
      clockwise: true,
      avoidLabelOverlap: true,
      hoverOffset: 15,
      itemStyle: {
        color: function (params) {
          if (params.name === '使用量') {
            return getVariable('--blue') // 使用量为蓝色
          } else {
            return getVariable('--green') // 剩余容量为灰色
          }
        },
      },
      label: {
        show: false,
        position: 'outside',
        formatter: formatter,
        rich: {
          hr: {
            backgroundColor: 't',
            borderRadius: 3,
            width: 3,
            height: 3,
            padding: [3, 3, 0, -12],
          },
          a: {
            padding: [-30, 15, -20, 15],
          },
        },
      },
      labelLine: {
        normal: {
          length: 20,
          length2: 30,
          lineStyle: {
            width: 1,
          },
        },
      },
      data: [],
    },
  ],
  graphic: [
    {
      type: 'text',
      left: 'center',
      top: 'center',
      style: {
        text: '', // 初始文本
        textAlign: 'center',
        fontSize: 34,
        fontWeight: 'bold',
        fill: '#333',
      },
    },
  ],
}

watch(
  () => [props.used, props.total],
  ([newUsedOrigin, newTotalOrigin]) => {
    let newUsed = formatBytesConvert(newUsedOrigin)
    let newTotal = formatBytesConvert(newTotalOrigin)
    if (newTotal != 0) {
      usedPercent.value = ((newUsed / newTotal) * 100).toFixed(2) + '%'
    }
    initOption.series[0].data = [
      {
        name: '使用量',
        value: newUsed,
      },
      {
        name: '剩余量',
        value: newTotal - newUsed,
      },
    ]
    initOption.graphic[0].style.text = usedPercent.value
    option.value = clone(initOption)
  },
  {
    deep: true,
    immediate: true,
  },
)
/**
 *
 * 	[{
		"name": "使用量",
		"value": 46868949
	},
	{
		"name": "剩余容量",
		"value": 2100614699
	},
  {
      name: '总容量',
      value: totalCapacity.value,
    },
]
 */
function formatter(params) {
  let res = `${params.name} \n <span class="cl-blue">${params.value}</span>`
  let { value, name } = params.data
  let formatBytesRes = formatBytes(value)
  return `${name}: ${formatBytesRes}\n 占比: (${params.percent}%)`
}
</script>

<template>
  <div class="box">
    <VChart class="calc-height" :option="option" autoresize />
    <div class="f w-100% list-container">
      <div class="list">
        <div>使用量</div>
        <div class="num">{{ formatBytes(used) }}</div>
      </div>
      <div class="list">
        <div>总量</div>
        <div class="num">{{ formatBytes(total) }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
}

.calc-height {
  height: calc(100% - 100px);
  min-height: 100px;
}

.list-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 70px;

  .list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: calc((100% - 24px) / 2);
    padding: 8px;
    background-color: #f8f8f8;
    border: 1px dashed #dbdfe9;
    border-radius: 2px;

    .num {
      font-size: 20px;
      font-weight: 700;
    }
  }
}
</style>
