<template>
  <div class="o-dialog">
    <component
      :is="parseType"
      :custom-class="getThemeClass"
      v-bind="{
        width: '640px',
        closeOnClickModal: true,
        destroyOnClose: true,
        draggable: true,
        ...$attrs,
      }"
      @close="handleClose"
    >
      <template #header>
        <span class="o-dialog__header">
          <slot name="header">
            {{ title }}
          </slot>
        </span>
      </template>
      <div :class="$attrs.fullscreen === true || $attrs.fullscreen === '' ? 'dialog_fullscreen ' : 'dialog_slot_box'">
        <slot></slot>
      </div>
      <template #footer v-if="showFooter">
        <slot name="footer">
          <el-button v-if="showCancel" :type="cancelAttrs.type || ''" v-bind="cancelAttrs" @click="handleCancelClose">
            {{ cancelText }}
          </el-button>
          <el-button
            v-if="showConfirm"
            :loading="confirmLoading"
            id="kdDialogConfirmBtn"
            :type="confirmAttrs.type || 'primary'"
            v-bind="confirmAttrs"
            @click="confirm"
          >
            {{ confirmText }}
          </el-button>
        </slot>
      </template>
    </component>
  </div>
</template>

<script setup lang="ts" name="ODialog">
import { ref, computed, useAttrs, useSlots, watch, onBeforeUnmount, onMounted } from 'vue'
import { getType } from '@/utils/index'
const attrs = useAttrs()
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  type: {
    type: String, // drawer
    // default: 'drawer',
    default: '',
  },
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
  showFooter: {
    type: Boolean,
    default: true,
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
  showConfirm: {
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
  enableConfirm: {
    // 是否允许使用enter键, 点击确定按钮
    type: Boolean,
    default: true,
  },
  confirm: {
    type: Function,
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

const fullscreenHeight = ref('calc(100vh - 124px)')
watch(
  () => props.showFooter,
  (val) => {
    if (attrs.fullscreen === true || attrs.fullscreen === '') {
      if (props.showFooter === false) {
        fullscreenHeight.value = 'calc(100vh - 74px)'
      } else {
        fullscreenHeight.value = 'calc(100vh - 124px)'
      }
    }
  },
  {
    immediate: true,
  },
)

const confirmLoading = ref(false)
async function confirm() {
  if (props.confirm && getType(props.confirm) === 'function') {
    confirmLoading.value = true
    await props.confirm().finally(() => {
      confirmLoading.value = false
    })
  } else if (attrs.onConfirm) {
    attrs.onConfirm()
  } else {
    handleClose()
  }
}
function handleCancelClose() {
  if (attrs.onCancel) {
    attrs.onCancel()
  } else {
    emits('update:modelValue', false)
  }
}

function handleClose() {
  emits('update:modelValue', false)
}

// 只有当弹框的时候, 且按的是回车键, 才走confirm
function onkeypress({ code }: KeyboardEvent) {
  if (attrs.modelValue === true && code === 'Enter' && props.enableConfirm && props.confirmAttrs?.loading !== true) {
    confirm()
  }
}

const parseType = computed(() => {
  if (props.type === '') {
    return 'el-dialog'
  } else if (props.type === 'drawer') {
    return 'el-drawer'
  }
})

onMounted(() => {
  document.addEventListener('keypress', onkeypress)
})

onBeforeUnmount(() => {
  document.removeEventListener('keypress', onkeypress)
})
</script>

<style lang="scss" scoped>
.o-dialog {
  :deep(.el-dialog__header),
  :deep(.el-drawer__header) {
    padding: 8px 16px;
    height: 46px;
    border-bottom: 1px solid var(--line);
    font-weight: 700;
  }
  :deep(.el-drawer__header) {
    margin-bottom: 0;
  }
  :deep(.el-dialog) {
    padding: 0 !important;
  }
  :deep(.el-dialog__body) {
    padding: 16px;
    .dialog_slot_box {
      min-height: 20px;
      max-height: calc(100vh - 30vh - 100px);
      overflow-y: auto;
    }
    .dialog_fullscreen {
      height: v-bind(fullscreenHeight);
      overflow-y: auto;
    }
  }
  :deep(.el-dialog__footer),
  :deep(.el-drawer__footer) {
    border-top: 1px solid var(--line);
    padding: 16px;
    height: 46px;
    box-sizing: border-box;
    display: flex;
    justify-content: end;
    align-items: center;
  }
  :deep(.el-drawer__footer) {
    justify-content: start;
    flex-direction: row-reverse;
    .el-button {
      margin-left: 0px;
      margin-right: 12px;
    }
  }
  :deep(.el-dialog__headerbtn) {
    width: 46px;
    height: 46px;
  }
  .o-dialog__header {
    font-size: 16px;
  }
}
</style>
