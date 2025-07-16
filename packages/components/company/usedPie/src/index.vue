<script setup lang="ts" name="OUsedPie">
// import {defineAsyncComponent} from 'vue'
import { ref, getCurrentInstance, onMounted, watch, defineAsyncComponent } from 'vue'
// import VChart from 'vue-echarts'
const VChart = defineAsyncComponent(() => import('vue-echarts')) // 因为直接引入vue-echarts, 使用vitepress打包回报错, 在使用 VitePress 打包时，如果引入的 vue-echarts 中包含对 document 的引用，可能会导致 document is not defined 的错误。这是因为 VitePress 使用了服务器端渲染（SSR），而 document 是浏览器环境中的对象，在服务器端环境中不存在。以下是几种可能的解决
import '@/utils/useEcharts.ts'

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
          if (params.data.prop === 'used') {
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

function getPieColorByDataIndex(params: any) {
  if (params.dataIndex === 0) {
    return getVariable('--blue')
  } else {
    return getVariable('--green')
  }
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
        prop: 'used',
        name: '使用量',
        value: newUsed,
      },
    ]
    if (!(newUsed == 0 && newTotal == 0)) {
      initOption.series[0].data.push({
        name: '剩余量',
        value: newTotal - newUsed,
      })
      initOption.series[0].itemStyle.color = getPieColorByDataIndex
    } else {
      initOption.series[0].itemStyle.color = getVariable('--green')
    }
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
  <div class="vChart-box">
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
.vChart-box {
  width: 100%;
  height: 100%;
}

.calc-height {
  height: calc(100% - 70px);
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
    width: calc((100% - 16px) / 2);
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
