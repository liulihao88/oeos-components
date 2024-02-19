<template>
  <el-dialog
    :custom-class="getThemeClass"
    :close-on-click-modal="$attrs['closeOnClickModal'] !== false"
    :width="$attrs.width || '640px'"
    :class="!border && 'hide-title-border'"
    v-bind="$attrs"
    @close="handleClose"
  >
    <template #header>
      <slot name="title">
        <div>
          <span>{{ props.title }}</span>
        </div>
      </slot>
    </template>
    <div class="dialog_slot_box">
      <slot></slot>
    </div>
    <div v-if="showFooter" class="dialog_footer">
      <slot name="footer">
        <el-button
          v-if="showCancel"
          :type="cancelAttrs.type || 'info'"
          v-bind="cancelAttrs"
          @click="handleClose"
        >
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
      </slot>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, computed, useAttrs } from 'vue'
const { proxy } = getCurrentInstance()
const attrs = useAttrs()
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  title: {
    type: String,
    default: '', // 弹框标题名称
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

  showFooter: {
    type: Boolean,
    default: true, // 是否显示底部操作按钮
  },
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
  console.log(
    `%c 3351 115行 packages/components/dialog/Dialog.vue proxy `,
    proxy,
  )

  console.log(`attrs`, attrs)
  console.log(`attrs.name`, attrs.name)
  console.log(`attrs.cc`, attrs.cc)
  console.log(`attrs.onCc`, attrs.onCc)
  console.log(`attrs.onConfirm`, attrs.onConfirm)

  if (attrs.onConfirm) {
    attrs.onConfirm()
  } else {
    handleClose()
  }
}
function judgeType(type) {
  if (typeof type === 'object') {
    const objType = Object.prototype.toString
      .call(type)
      .slice(8, -1)
      .toLowerCase()
    return objType
  } else {
    return typeof type
  }
}
function handleClose() {
  emits('update:modelValue', false)
}
</script>
