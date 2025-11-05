<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
// import { isEmpty } from '@oeos-components/utils'
import { isEmpty, getType } from '@/utils/src/index.ts'
// import { isEmpty } from 'lodash-es'

const items = [
  { label: 'undefined', value: undefined },
  { label: 'null', value: null },
  { label: "''", value: '' },
  { label: "' '", value: ' ' },
  { label: 'false', value: false },
  { label: "new Date('无效日期')", value: new Date('无效日期') },
  { label: '0', value: 0 },
  { label: '[]', value: [] },
  { label: '{}', value: {} },
  { label: 'NaN', value: NaN },
  { label: 'new Set()', value: new Set() },
  { label: 'new Map()', value: new Map() },
  { label: 'BigInt(0)', value: BigInt(0) },

  { label: '第二个参数为true[0, true]', value: [0, true] },
  { label: '第二个参数为true[false, true]', value: [false, true] },
]
</script>

<template>
  <OFunctionSourceCode functionName="isEmpty"></OFunctionSourceCode>
  <o-warning
    class="mb2"
    content="undefined, null, '', '   ', false, 0, [], {}, NaN, new Set(), new Map(), BigInt(0), new Date('无效日期') 均返回true，否则返回false <br> 如果参数2为true, 处理严格模式（strict=true 时，0/false 不算空）"
  />
  <oItemWrapper :columns="3">
    <div v-for="(v, i) in items" :key="i">
      <span class="mr">{{ v.label }}:</span>
      <span v-if="getType(v.value) === 'array'" class="cl-blue">
        {{ isEmpty(...v.value) }}
      </span>
      <span class="cl-blue" v-else>{{ isEmpty(v.value) }}</span>
    </div>
  </oItemWrapper>
</template>
