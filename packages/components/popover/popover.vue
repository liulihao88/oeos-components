<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const props = defineProps({
  visible: {
    type: Boolean,
  },
})
const popShow = ref(false)
const emits = defineEmits(['update:visible', 'confirm'])

const popperStyle = {
  background: '#2f2b36',
  boxShadow: '0px 2px 4px 0px rgba(2, 1, 2, 0.4)',
  borderRadius: '12px',
  border: 'none',
}
function confirm() {
  console.log(
    `***** 44444444444  19行 src/components/autoImportComponents/gPopOver.vue  16:05:19`,
  )

  popShow.value = false
  emits('confirm')
}
function cancel() {
  popShow.value = false
}
/** @使用方式
<g-popover title="">
  <g-btn type="primary" >测试41</g-btn>
</g-popover>
*/
</script>

<template>
  <el-popover
    :title="$attrs.title || '确定删除?'"
    :width="200"
    v-model:visible="popShow"
    :trigger="$attrs.trigger || 'hover'"
    :popper-style="popperStyle"
  >
    <template #reference>
      <slot></slot>
    </template>
    <div class="f-bt">
      <g-btn type="red" @click="confirm" :customStyle="{ padding: '9px 20px' }">
        确定
      </g-btn>
      <g-btn
        type="primary"
        @click="cancel"
        :customStyle="{ padding: '9px 20px' }"
      >
        取消
      </g-btn>
    </div>
  </el-popover>
</template>

<style lang="scss"></style>
