<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { clone } from '@/utils/src/index'

const refValue = ref([11, 22, 33])

const options = [
  { label: 'clone([1,2,3])', value: clone([1, 2]) },
  {
    label: ' {a: 1, b:{c:2}, d:new Date(), e: /regex/, f:function(){}, self: null}',
    value: {
      a: 1,
      b: { c: 2 },
      d: new Date(),
      e: /regex/,
      f22: function () {
        return '123'
      }, // JSON.stringify 会丢失
      self: null, // 循环引用
    },
  },
  {
    label: 'clone([1,2,3], 3)',
    value: clone([1, 2, 3]),
  },
  {
    label: 'clone(12)',
    value: clone(12),
  },
  {
    label: 'clone(refValue)',
    value: clone(refValue),
  },
]
</script>

<template>
  <div>
    <o-descriptions :options="options" :column="1" labelWidth="300" :showAll="true"></o-descriptions>
  </div>
</template>
