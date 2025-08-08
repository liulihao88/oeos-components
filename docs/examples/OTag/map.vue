<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const map = [
  { type: 'primary', name: '标签1' },
  { type: 'primary', name: '标签11' },
  { type: 'primary', name: '标签11' },
  { type: 'info', name: '标签2' },
  { type: 'warning', name: '标签3' },
  { type: 'danger', name: '标签4' },
]

const map2 = [
  {
    danger: [{ Issuce: '问题' }, { OutOfService: '未激活1' }],
  },
  {
    warning: [{ Loading: '激活中' }, { Unloading: '停服中' }, { Standby: '备用' }],
  },
  {
    info: [{ Unknown: '未知' }],
  },
  {
    primary: [{ InService: '已激活' }],
  },
]

const testMap = {
  Issue: '问题', // danger
  OutOfService: '未激活', // danger
  Loading: '激活中', //warning
  Unloading: '停服中', // warning
  Standby: '备用', // warning
  Unknown: '未知', // info
  InService: '已激活', // primary
}

const row = {
  asyncValue: 'OutOfService',
  InService: 'InService'
}
</script>

<template>
  <div>
    <div v-for="(v, i) in map" :key="i">
      <OTag class="m-r-8" :type="v.type">{{ v.name }}</OTag>
    </div>
    <OTag class="m-r-8" :options="map2" :value="row.asyncValue" width="100"></OTag>
    <OTag class="m-r-8" :options="map2" :value="row.InService" width="100"></OTag>
  </div>
</template>
