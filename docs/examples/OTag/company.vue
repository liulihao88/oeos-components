<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const columns = [
  {
    label: '状态',
    prop: 'status',
    useSlot: true,
  },
]
const nodeStatus = [
  {
    name: '未知',
    value: 'Unknown',
  },
  {
    name: '正常',
    value: 'Normal',
  },
  {
    name: '问题',
    value: 'Issue',
  },
  {
    name: '维护',
    value: 'Maintenance',
  },
  {
    name: '重启中',
    value: 'Rebooting',
  },
  {
    name: '关闭中',
    value: 'Shuttingdown',
  },
  {
    name: '断电',
    value: 'PowerOff',
  },
]

const data = ref([])

setTimeout(() => {
  data.value = [
    {
      updateTime: 1756794274572,
      startTime: 1756783064121,
      upTime: 11210455,
      nodeId: 'N01',
      name: 'A200-1',
      status: 'Normal',
      type: 'A_NODE',
      description: '',
      serveStatus: 'InService',
      serveDescription: '',
    },
    {
      updateTime: 1756794274579,
      startTime: 1756783071827,
      upTime: 11202755,
      nodeId: 'N02',
      name: 'A200-2',
      status: 'Unknown',
      type: 'A_NODE',
      description: '',
      serveStatus: 'InService',
      serveDescription: '',
    },
    {
      updateTime: 1756794274585,
      startTime: null,
      upTime: null,
      nodeId: 'N03',
      name: 'A200-3',
      status: 'Issue',
      type: 'A_NODE',
      description: '',
      serveStatus: 'Unknown',
      serveDescription: '-',
    },
    {
      updateTime: 1756794274585,
      startTime: null,
      upTime: null,
      nodeId: 'N03',
      name: 'A200-3',
      status: 'Shuttingdown',
      type: 'A_NODE',
      description: '',
      serveStatus: 'Unknown',
      serveDescription: '-',
    },
  ]
}, 1000)

setTimeout(() => {
  data.value = [
    {
      updateTime: 1756794274572,
      startTime: 1756783064121,
      upTime: 11210455,
      nodeId: 'N01',
      name: 'A200-1',
      status: 'Shuttingdown',
      type: 'A_NODE',
      description: '',
      serveStatus: 'InService',
      serveDescription: '',
    },
    {
      updateTime: 1756794274579,
      startTime: 1756783071827,
      upTime: 11202755,
      nodeId: 'N02',
      name: 'A200-2',
      status: 'Unknown',
      type: 'A_NODE',
      description: '',
      serveStatus: 'InService',
      serveDescription: '',
    },
    {
      updateTime: 1756794274585,
      startTime: null,
      upTime: null,
      nodeId: 'N03',
      name: 'A200-3',
      status: 'Issue',
      type: 'A_NODE',
      description: '',
      serveStatus: 'Unknown',
      serveDescription: '-',
    },
    {
      updateTime: 1756794274585,
      startTime: null,
      upTime: null,
      nodeId: 'N03',
      name: 'A200-3',
      status: 'Maintenance',
      type: 'A_NODE',
      description: '',
      serveStatus: 'Unknown',
      serveDescription: '-',
    },
    {
      updateTime: 1756794274585,
      startTime: null,
      upTime: null,
      nodeId: 'N03',
      name: 'A200-3',
      status: 'not-match',
      type: 'A_NODE',
      description: '',
      serveStatus: 'Unknown',
      serveDescription: '-',
    },
  ]
}, 3000)
</script>

<template>
  <div>
    <o-table ref="tableRef" :columns="columns" :data="data">
      <template #status="{ scope, row, value }">
        <!-- {{ value }}?? -->
        <!-- {{ nodeStatus.find((v) => v.value === value).name }} -->
        <o-tag
          :primary="['Normal']"
          :info="['Unknown', 'PowerOff', 'Maintenance']"
          :warning="['Rebooting', 'Shuttingdown']"
          :danger="['Issue']"
          :options="nodeStatus"
          :config="{
            label: 'name',
          }"
          :value="value"
        ></o-tag>
      </template>
    </o-table>
  </div>
</template>
