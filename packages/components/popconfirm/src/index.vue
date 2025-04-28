<script setup lang="ts" name="OPopconfirm">
/**
 * <g-popover @confirm="confirm" trigger="click"></g-popover>
 */
import { ref, onMounted } from 'vue'
const isPopoverVisible = ref(false)
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
    default: '确定删除吗?',
  },
  width: {
    type: [String, Number],
    default: 200,
  },
  content: {
    type: String,
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
  <div v-if="props.reConfirm">
    <el-popover
      class="o-popconfirm"
      :title="props.title"
      :width="props.width"
      v-bind="$attrs"
      @show="handleShow"
      v-model:visible="isPopoverVisible"
    >
      <slot name="content">
        <div class="o-popconfirm__content">{{ props.content }}</div>
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
