<script setup lang="ts" name="ODrawer">
/** @使用方式
<o-drawer
  v-model="isShow"
  title="测试dialog"
  width="500"
  :closeOnClickModal="true"
></o-drawer>
*/
import { ref, computed, useAttrs } from 'vue'
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  confirmText: {
    type: String,
    default: '提交',
  },
  cancelText: {
    type: String,
    default: '取消',
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
  showConfirm: {
    type: Boolean,
    default: true,
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
  wrapperClosable: {
    type: Boolean,
    default: true,
  },
  confirmAttrs: {
    type: Object,
    default: () => {
      return {}
    },
  },
  cancelAttrs: {
    type: Object,
    default: () => {
      return {}
    },
  },
  // 自定义详情属性
  detailAttrs: {
    type: Object,
    default: () => {},
  },
  // 可选值: detail, ''
  type: {
    type: String,
    default: '',
  },
})

const attrs = useAttrs()
const mergeAttrs = computed(() => {
  // 如果type不是detail, 走默认的逻辑
  let changeAttrs = {
    size: attrs.size || 640,
    confirmText: props.confirmText,
    showCancel: props.showCancel,
    wrapperClosable: props.wrapperClosable,
    destroyOnClose: true,
  }
  if (props.type === 'detail') {
    changeAttrs = Object.assign(
      {
        size: 400,
        confirmText: '关闭',
        showCancel: false,
        wrapperClosable: true,
        destroyOnClose: true,
      },
      props.detailAttrs,
    )
  }
  return changeAttrs
})

function confirm() {
  if (attrs.onConfirm) {
    attrs.onConfirm()
  } else {
    _handleClose()
  }
}
function handleClose() {
  if (attrs.onCancel) {
    attrs.onCancel()
  } else {
    _handleClose()
  }
}

function _handleClose() {
  emits('update:modelValue', false)
}
</script>

<template>
  <div class="o-drawer">
    <el-drawer
      :wrapper-closable="mergeAttrs.wrapperClosable"
      :destroy-on-close="mergeAttrs.wrapperClosable !== false"
      :with-header="true"
      :size="mergeAttrs.size"
      v-bind="$attrs"
      @close="_handleClose"
    >
      <template #header>
        <slot name="header">
          {{ attrs.title }}
        </slot>
      </template>
      <div class="drawer-main">
        <el-scrollbar class="drawer-scrollbar">
          <div class="content">
            <slot></slot>
          </div>
        </el-scrollbar>
      </div>
      <div v-if="showFooter" class="kd-drawer-footer">
        <slot name="footer">
          <el-button
            v-if="showConfirm"
            id="kdDrawerConfirmBtn"
            :type="confirmAttrs.type || 'primary'"
            v-bind="confirmAttrs"
            class="mr"
            @click="confirm"
          >
            {{ mergeAttrs.confirmText }}
          </el-button>
          <el-button
            v-if="mergeAttrs.showCancel"
            :type="cancelAttrs.type || 'info'"
            v-bind="cancelAttrs"
            @click="handleClose"
          >
            {{ cancelText }}
          </el-button>
        </slot>
      </div>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
.o-drawer {
  :deep(.el-drawer__header) {
    margin-bottom: 0;
    color: var(--text-color);
    font-weight: 500;
    padding: 12px;
    background-color: #ebedf0;
    font-size: 14px;
    border-bottom: 1px solid #e3e6eb;
    box-sizing: border-box;
    > span {
      font-size: 14px;
      padding-left: 24px;
    }

    > .el-drawer__close-btn {
      font-size: 16px;
      padding-right: 24px;
      display: flex;
      justify-content: flex-end;
    }
  }
  :deep(.el-drawer__body) {
    padding: 0;
  }

  .drawer-main {
    flex: 1;
    height: calc(100% - 50px);
    padding: 24px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    .drawer-scrollbar {
      flex: 1;
      height: 100%;

      .el-scrollbar__view {
        width: 100%;
        height: 100%;
      }

      .el-scrollbar__wrap {
        overflow-x: hidden;
      }
    }

    .content {
      min-height: calc(100vh - 200px) !important;
      overflow-y: auto;
      padding: 24px;
    }
  }

  .kd-drawer-footer {
    height: 50px;
    padding: 0 24px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    border-top: 1px solid var(--line);
  }
}
</style>
