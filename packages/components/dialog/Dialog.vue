<template>
  <div class="o-dialog">
    <el-dialog
      :custom-class="getThemeClass"
      :class="!border && 'hide-title-border'"
      v-bind="{
        width: '640px',
        closeOnClickModal: true,
        draggable: true,
        ...$attrs,
      }"
      @close="handleClose"
    >
      <template #header>
        <slot name="header">
          <div class="dddddddddd">
            <span>{{ title }}</span>
          </div>
        </slot>
      </template>
      <div class="dialog_slot_box">
        <slot></slot>
      </div>
      <template #footer>
        <slot name="footer">
          <div class="dialog_footer">
            <el-button v-if="showCancel" :type="cancelAttrs.type || 'info'" v-bind="cancelAttrs" @click="handleClose">
              {{ cancelText }}
            </el-button>
            <el-button
              v-if="showConfirm"
              id="kdDialogConfirmBtn"
              :type="confirmAttrs.type || 'primary'"
              v-bind="confirmAttrs"
              @click="confirm"
            >
              {{ confirmText }}
            </el-button>
          </div>
        </slot>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, computed, useAttrs, useSlots, watch, onBeforeUnmount, onMounted } from 'vue'
const { proxy } = getCurrentInstance()
const attrs = useAttrs()
const slots = useSlots()
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  title: {
    type: String,
    default: '提示',
  },
  theme: {
    type: String,
    default: '', // 弹框样式: 默认空, norm norm16 simple
  },
  cancel: {
    type: [Function, String],
    default: '', //
  },
  cancelText: {
    type: String,
    default: '取消',
  },
  confirmText: {
    type: String,
    default: '确认',
  },
  // 是否显示底部操作按钮 :footer="null"
  footer: Object,
  showCancel: {
    type: Boolean,
    default: true,
  },
  showConfirm: {
    type: Boolean,
    default: true,
  },
  border: {
    type: Boolean,
    default: true,
  },
  confirmAttrs: {
    type: Object,
    default: () => ({}),
  },
  cancelAttrs: {
    type: Object,
    default: () => ({}),
  },
  // 允许自动清空的表单名, 默认form
  formData: {
    type: String,
    default: 'form',
  },
})
const getThemeClass = computed(() => {
  if (props.theme === 'norm') {
    return 'kd-norm-dialog'
  } else if (props.theme === 'norm16') {
    return 'kd-norm16-dialog'
  } else if (props.theme === 'simple') {
    return 'kd-simple-dialog'
  } else {
    return ''
  }
})

function confirm() {
  if (attrs.onConfirm) {
    attrs.onConfirm()
  } else {
    handleClose()
  }
}

function handleClose() {
  emits('update:modelValue', false)
}

// 只有当弹框的时候, 且按的是回车键, 才走confirm
function onkeypress({ code }: KeyboardEvent) {
  if (attrs.modelValue === true && code === 'Enter') {
    confirm()
  }
}

onMounted(() => {
  document.addEventListener('keypress', onkeypress)
})

onBeforeUnmount(() => {
  document.removeEventListener('keypress', onkeypress)
})
</script>

<style lang="scss" scoped>
.o-dialog {
  :deep(.el-dialog__header) {
    padding: 8px 16px;
    border-bottom: 1px solid #e3e6eb;
  }
  :deep(.el-dialog) {
    padding: 0 !important;
  }
  :deep(.el-dialog__body) {
    padding: 16px;
    .dialog_slot_box {
      min-height: 300px;
      max-height: calc(100vh - 30vh - 100px);
      overflow-y: auto;
    }
  }
  :deep(.el-dialog__footer) {
    border-top: 1px solid #e3e6eb;
    padding: 0 16px;
    height: 50px;
    box-sizing: border-box;
    display: flex;
    justify-content: end;
    align-items: center;
  }
}
</style>
