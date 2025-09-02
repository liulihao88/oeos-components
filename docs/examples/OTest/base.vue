<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const data = [
  {
    id: 'KS07',
    name: '统计服务',
    serveStatus: 'InService',
    healthLevel: 'HEALTH',
  },
  {
    id: 'KS10',
    name: '对象数据处理服务',
    serveStatus: 'Loading',
    healthLevel: 'HEALTH',
  },
  {
    id: 'KS04',
    name: '调度微服务',
    serveStatus: 'Issue',
    healthLevel: 'HEALTH',
  },
  {
    id: 'KS03',
    name: '数据堆叠服务',
    serveStatus: 'Standby',
    healthLevel: 'HEALTH',
  },
  {
    id: 'KS01',
    name: 'S3网关服务',
    serveStatus: 'InService',
    healthLevel: 'HEALTH',
  },
]
const columns = [
  {
    label: '名字',
    prop: 'serveStatus',
    useSlot: true,
  },
  {
    key: 'operation',
    label: '操作',
    btns: [
      {
        content: '编辑',
      },
    ],
  },
]

const SERVE_STATUS = [
  {
    label: '使用中',
    value: 'InService',
  },
  {
    label: '准备',
    value: 'Standby',
  },
  {
    label: '等待',
    value: 'Loading',
  },
  {
    label: '停止运行',
    value: 'OutOfService',
  },
  {
    label: '错误',
    value: 'Issue',
  },
  {
    label: '未知',
    value: 'Unknown',
  },
]
</script>

<template>
  <div>
    <o-table :columns="columns" :data="data" ref="tableRef">
      <template #serveStatus="{ value }">
        <o-tag
          :primary="['InService']"
          :warning="['Standby', 'Loading']"
          :danger="['Issue']"
          :info="['Unknown', 'OutOfService']"
          :value="value"
          :options="SERVE_STATUS"
          :config="{
            label: 'label',
            value: 'value',
          }"
          width="100%"
        />
      </template>
    </o-table>
  </div>
</template>
