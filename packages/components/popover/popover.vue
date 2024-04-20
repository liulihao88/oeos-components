<script setup lang="ts">
/**
 * <g-popover @confirm="confirm" trigger="click"></g-popover>
 */
import { ref, getCurrentInstance, onMounted } from 'vue'
const { proxy } = getCurrentInstance()
const isPopoverVisible = ref(false)
// const isPopoverVisible = ref(true)
const togglePopover = () => {
  isPopoverVisible.value = true
}
const handleShow = () => {
  onMounted(() => {
    document.addEventListener('click', closePopoverOnClickOutside)
  })
}

const closePopoverOnClickOutside = (event) => {
  if (!document.querySelector('.el-popover').contains(event.target)) {
    close()
  }
}
const emits = defineEmits(['confirm', 'cancel'])
function confirm() {
  close()
  emits('confirm')
}
function close() {
  isPopoverVisible.value = false
}
function cancel() {
  close()
  emits('cancel')
}
const props = defineProps({
  title: {
    type: String,
    default: '删除',
  },
  width: {
    type: [String, Number],
    default: 200,
  },
  content: {
    type: String,
    default: '确定删除? ',
  },
})

defineExpose({
  close,
});
</script>

<template>
  <el-popover
    class="o-popover"
    :title="title"
    :width="width"
    v-bind="$attrs"
    @show="handleShow"
    v-model:visible="isPopoverVisible"
  >
    <slot name="content">
      <div class="o-popover__content">{{ content }}</div>
    </slot>
    <slot name="footer">
      <div style="text-align: right; margin: 0">
        <el-button size="small" type="info" @click="cancel">取消</el-button>
        <el-button size="small" type="primary" @click="confirm">确定</el-button>
      </div>
    </slot>
    <template v-slot:reference>
      <slot v-if="$slots.default"></slot>
      <el-button class="m-2" type="primary" v-else>删除</el-button>
    </template>
  </el-popover>
</template>

<style scoped lang="scss">
.o-popover {
}
.o-popover__content {
  margin-bottom: 12px;
}
</style>
