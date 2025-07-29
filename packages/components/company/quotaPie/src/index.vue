<script setup lang="ts">
import { ref, onMounted, watch, computed, defineAsyncComponent } from 'vue'
const VChart = defineAsyncComponent(() => import('vue-echarts')) // 因为直接引入vue-echarts, 使用vitepress打包回报错, 在使用 VitePress 打包时，如果引入的 vue-echarts 中包含对 document 的引用，可能会导致 document is not defined 的错误。这是因为 VitePress 使用了服务器端渲染（SSR），而 document 是浏览器环境中的对象，在服务器端环境中不存在。以下是几种可能的解决
import '@/utils/local/useEcharts'
import { getPieColorByDataIndex } from '@/utils/local/packageUtils'
import { formatBytes, formatBytesConvert, clone } from '@oeos-components/utils'
defineOptions({
  name: 'OQuotaPie',
})
const props = defineProps({
  used: {
    type: [String, Number],
    required: true,
  },
  total: {
    type: [String, Number],
    required: true,
  },
  type: {
    type: String, // used, quota
    default: 'used',
  },
  text: {
    type: String,
    required: true,
    default: '总使用量 / 总可用量',
  },
})
// 添加容器尺寸的响应式引用
const containerRef = ref(null)
const containerSize = ref({ width: 0, height: 0 })
const isEmpty = ref(false)
const options = ref()

const seriesData = ref([])
const usedNum = ref(0)
const totalNum = ref(0)
const usedPercent = ref('0%')

const getValue = computed(() => {
  usedPercent.value = ((usedNum.value / totalNum.value) * 100).toFixed(2) + '%'
  let num = `${formatBytes(formatBytesConvert(props.used))} / ${formatBytes(formatBytesConvert(props.total))}`
  // let text = '总使用量 / 总可用量'
  return `${usedPercent.value}\n\n${num}\n\n${props.text}`
})

let initOptions = {
  title: {
    text: '',
    textStyle: {
      color: 'blue', // 更改标题颜色为红色
      fontSize: 16, // 更改标题字体大小为 20px
    },
  },
  legend: {
    top: 'bottom',
    textStyle: {
      fontSize: 10, // 更改图例文本字体大小为 14px
    },
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    show: false,
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
    },
  },
  series: [
    {
      type: 'pie',
      radius: ['70%', '90%'], // 设置饼图的内外半径，内容显示在内部
      center: ['50%', '50%'], // 设置饼图的中心位置
      label: {
        backgroundColor: '#F6F8FC',
        borderColor: '#8C8D8E',
        position: 'inner', // 标签显示在扇形内部
        borderRadius: 4,
        textStyle: {
          fontSize: 12, // 更改标题字体大小为 20px
          color: '#e4393c',
        },
        rich: {
          a: {
            color: '#6E7079',
            lineHeight: 22,
            fontSize: 10,
            align: 'center',
          },
          hr: {
            borderColor: '#8C8D8E',
            width: '100%',
            borderWidth: 1,
            height: 0,
          },
          b: {
            color: '#4C5058',
            fontSize: 12,
            fontWeight: 'bold',
            lineHeight: 33,
          },
        },
      },
      itemStyle: {
        borderRadius: 8,
        color: (params) => getPieColorByDataIndex(params, usedPercent.value),
      },
      data: [],
    },
  ],
  graphic: {
    type: 'text',
    left: 'center',
    top: 'center',
    style: {
      text: getValue, // 自定义文本内容
      textAlign: 'center',
      fill: '#000', // 文字颜色
      fontSize: 14,
      fontWeight: 'bold', // 文字加粗
    },
  },
}

watch(
  () => [props.used, props.total],
  ([usedNew, totalNew]) => {
    if (usedNew || totalNew) {
      isEmpty.value = false
      usedNum.value = formatBytesConvert(usedNew)
      totalNum.value = formatBytesConvert(totalNew)
      initOptions.series[0].data = [usedNum.value, totalNum.value - usedNum.value]
      options.value =clone(initOptions)
    } else {
      isEmpty.value = true
    }
  },
  {
    deep: true,
    immediate: true,
  },
)

// 根据容器尺寸调整字体大小的函数
const adjustFontSize = (width, height) => {
  let baseSize = Math.min(width, height) / 20

  const minFontSize = 10
  const maxFontSize = 24
  if (baseSize < minFontSize) {
    baseSize = minFontSize
  } else if (baseSize > maxFontSize) {
    baseSize = maxFontSize
  }
  initOptions.graphic.style.fontSize = baseSize + 'px' // 中央文本大小

  initOptions.series[0].label.textStyle = {
    fontSize: baseSize / 30,
    color: '#e4393c',
  }

  initOptions.title.textStyle = {
    color: 'blue',
    fontSize: baseSize / 25,
  }

  initOptions.legend.textStyle = {
    fontSize: baseSize / 35,
  }

  // 触发选项更新
  options.value = { ...initOptions }
}

// 监听容器大小变化
onMounted(() => {
  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const { width, height } = entry.contentRect
      containerSize.value = { width, height }
      adjustFontSize(width, height)
    }
  })

  if (containerRef.value) {
    resizeObserver.observe(containerRef.value)
  }

  return () => {
    resizeObserver.disconnect()
  }
})
</script>

<template>
  <template v-if="isEmpty">
    <o-empty class="h-100%" />
  </template>
  <template v-else>
    <div class="vChart-box" ref="containerRef">
      <v-chart class="calc-height" :option="options" autoresize />
    </div>
  </template>
</template>

<style lang="scss" scoped>
.calc-height {
  height: 100%;
  min-height: 100px;
}
</style>
