<template>
  <o-flex :flex="1">
    <div class="f-1">
      <el-button @click="isEmptyBn = !isEmptyBn">切换状态</el-button>
      <o-chart :option="options" :isEmpty="isEmptyBn" height="300" />
    </div>
    <div class="f-1">
      <el-button @click="addData()">增加数据</el-button>
      <h3>Function类型</h3>
      <o-chart
        :option="options"
        :isEmpty="isEmptyFn"
        image="/img/logo.svg"
        description="empty 组件的描述信息"
        height="300"
      />
    </div>
    <div class="f-1">
      <h3>空状态插槽</h3>
      <o-chart :option="options" :isEmpty="isEmptyFn" height="300">
        <template #empty>
          <div style="text-align: center; margin-top: 100px; font-size: 32px">自定义空状态插槽</div>
        </template>
      </o-chart>
    </div>
  </o-flex>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const options = ref({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [],
      type: 'line',
    },
  ],
})

const addData = () => {
  options.value.xAxis.data.push('test' + Math.random().toString(36).substring(2, 8))
  options.value.series[0].data.push(Math.random() * 200)
}

const isEmptyBn = ref(false)
const isEmptyFn = (options) => {
  return options.series[0].data.length === 0
}
</script>
