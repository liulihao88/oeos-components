<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { uuid } from '@/utils/src/index.ts'

const options = [
  { label: 'uuid()', value: uuid() },
  { label: 'uuid("名字")', value: uuid('名字') },
  {
    label: 'uuid("time")',
    value: uuid('time'),
  },
  {
    label: 'uuid("time", 0, {startStr:"andy", timeStr:"{h}:{i}:{s}"})',
    value: uuid('time', 0, { startStr: 'andy', timeStr: '{h}:{i}:{s}' }),
  },
  { label: 'uuid("phone")', value: uuid('phone') },
  { label: 'uuid("number")', value: uuid('number') },
  { label: 'uuid("email")', value: uuid('email') },
  { label: 'uuid("ip")', value: uuid('ip') },
  { label: 'uuid("port")', value: uuid('port') },
  {
    label: 'uuid([{label: "小泽泽",value: "xzz"},{ label: "小月月",value:"xyy"}=>xzz',
    value: uuid([
      { label: '小泽泽', value: 'xzz' },
      { label: '小月月', value: 'xyy' },
    ]),
  },
]
</script>

<template>
  <OFunctionSourceCode functionName="uuid"></OFunctionSourceCode>
  <div>
    <o-descriptions :options="options" title="uuid随机字符" :column="1"></o-descriptions>
  </div>
</template>
