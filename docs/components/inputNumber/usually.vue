<script setup lang="ts">
import { ref } from 'vue'
const smallCount = ref(1)
const strictCount = ref(2)
</script>

<template>
  <div>
    <o-item-wrapper :columns="2">
      <o-input v-model="smallCount"></o-input>
      <o-input-number v-model="smallCount" title="宽度" width="200" />
      <o-input-number v-model="smallCount" title="最大1, 最小5" :min="1" :max="5" />
      <o-input-number v-model="smallCount" title="禁用" disabled />
      <o-input-number v-model="smallCount" title="精度:precision " :precision="2" />
      <o-input-number v-model="smallCount" title="前缀和后缀 ">
        <template #prefix>
          <span>￥</span>
        </template>
        <template #suffix>
          <span>RMB</span>
        </template>
      </o-input-number>
      <o-input-number v-model="smallCount" title="按钮位置: controls-position " controls-position="" />
      <o-input-number v-model="smallCount" title="步进2" :step="2" />
      <o-input-number v-model="strictCount" title="严格步进2" :step="2" step-strictly />
      <o-input-number v-model="smallCount" title="当输入框被清空显示的值" :value-on-clear="1" />
    </o-item-wrapper>
  </div>
</template>
