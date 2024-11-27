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
    required: true,
  },
  reConfirm: {
    type: Boolean,
    default: true,
  },
})

defineExpose({
  close,
})
</script>

<template>
  <div v-if="reConfirm">
    <el-popover
      class="o-popconfirm"
      :title="title"
      :width="width"
      v-bind="$attrs"
      @show="handleShow"
      v-model:visible="isPopoverVisible"
    >
      <slot name="content">
        <div class="o-popconfirm__content">{{ content }}</div>
      </slot>
      <div class="o-popconfirm__footer">
        <slot name="footer">
          <el-button size="small" type="info" @click="cancel">取消</el-button>
          <el-button size="small" type="primary" @click="confirm">确定</el-button>
        </slot>
      </div>
      <template v-slot:reference>
        <slot></slot>
      </template>
    </el-popover>
  </div>
  <div v-else @click="confirm">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.o-popconfirm__footer {
  text-align: right;
  margin: 0;
  margin-top: 16px;
}
</style>
