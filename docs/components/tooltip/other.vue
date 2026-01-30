<template>
  <o-flex gutter="small" direction="column">
    <div>
      <o-title title="主题: effect"></o-title>
      <div>
        <o-tooltip content="Top center" placement="top">
          <el-button>Dark</el-button>
        </o-tooltip>
        <o-tooltip content="Bottom center" placement="bottom" effect="light">
          <el-button>Light</el-button>
        </o-tooltip>

        <o-tooltip content="Bottom center" effect="customized">
          <el-button>Customized theme</el-button>
        </o-tooltip>
      </div>
    </div>

    <div>
      <o-title
        title="关闭: disabled"
        sub-title="如果需要关闭 tooltip 功能，disabled 属性可以满足这个需求， 你只需要将其设置为 true"
      ></o-title>
      <el-tooltip :disabled="disabled" content="click to close tooltip function" placement="bottom" effect="light">
        <el-button @click="disabled = !disabled">
          click to {{ disabled ? 'active' : 'close' }} tooltip function
        </el-button>
      </el-tooltip>
    </div>
  </o-flex>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const disabled = ref(false)
</script>

<style>
.el-popper.is-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.el-popper.is-customized .el-popper__arrow::before {
  background: linear-gradient(45deg, #b2e68d, #bce689);
  right: 0;
}
</style>
