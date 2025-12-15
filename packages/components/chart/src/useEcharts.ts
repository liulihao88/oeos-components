import { onDeactivated, onBeforeUnmount } from 'vue'
import type * as echarts from 'echarts'

/**
 * @description 使用 Echarts (只是为了添加图表响应式)
 * @param {myChart} myChart Echarts实例 (必传)
 * @param {options} options 绘制Echarts的参数 (必传)
 * */
export const useEcharts = (myChart: echarts.ECharts, options: echarts.EChartsCoreOption) => {
  if (options && typeof options === 'object') {
    myChart.setOption(options)
  }

  const echartsResize = () => {
    myChart?.resize()
  }

  window.addEventListener('resize', echartsResize)

  // 防止 echarts 页面 keepAlive 时，还在继续监听页面
  onDeactivated(() => {
    window.removeEventListener('resize', echartsResize)
  })

  onBeforeUnmount(() => {
    // 1. 移除事件监听
    window.removeEventListener('resize', echartsResize)

    // 2. 销毁 ECharts 实例
    myChart?.dispose()
  })
}
