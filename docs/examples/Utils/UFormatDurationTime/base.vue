<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { formatDurationTime, getType } from '@/utils/src/index.ts'

const options = [
  { label: 'formatDurationTime(null)', value: formatDurationTime(null) },
  { label: 'formatDurationTime(0)', value: formatDurationTime(0) },
  { label: 'formatDurationTime(0, "{h}时{i}分")', value: formatDurationTime(0, '{h}时{i}分') },
  {
    label: 'formatDurationTime(999999999, "{d}天{h}时{i}分{s}秒")',
    value: formatDurationTime(999999999, '{d}天{h}时{i}分{s}秒'),
  },
  { label: 'formatDurationTime(11628)', value: formatDurationTime(11628) },
  { label: 'formatDurationTime(1162821)', value: formatDurationTime(1162821) },
  { label: 'formatDurationTime(11628213)', value: formatDurationTime(11628213) },
  { label: 'formatDurationTime(116282134)', value: formatDurationTime(116282134) },
  { label: 'formatDurationTime(1162821345)', value: formatDurationTime(1162821345) },
  { label: 'formatDurationTime(11628213456)', value: formatDurationTime(11628213456) },
  { label: 'formatDurationTime(116282134567)', value: formatDurationTime(116282134567) },
  { label: 'formatDurationTime(1162821345678)', value: formatDurationTime(1162821345678) },
]
</script>

<template>
  <OFunctionSourceCode functionName="formatDurationTime"></OFunctionSourceCode>
  <div>
    <o-descriptions :options="options" title="时间转换" :column="1"></o-descriptions>
  </div>
</template>
