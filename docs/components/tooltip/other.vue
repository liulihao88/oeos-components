<template>
  <o-flex gutter="small" direction="column">
    <div>
      <o-title title="自定义主题: effect"></o-title>
      <div class="demo-row">
        <o-tooltip content="默认暗色主题" placement="top">
          <el-button>Dark</el-button>
        </o-tooltip>
        <o-tooltip content="浅色主题" placement="bottom" effect="light">
          <el-button>Light</el-button>
        </o-tooltip>

        <o-tooltip content="自定义主题" effect="customized">
          <el-button>Customized</el-button>
        </o-tooltip>
      </div>
    </div>

    <div>
      <o-title title="禁用状态: disabled" sub-title="设置为 true 后，即使内容超出也不会显示 tooltip" />
      <div class="demo-row">
        <o-tooltip
          :disabled="disabled"
          content="这是一段会根据 disabled 状态切换的提示文本，当前展示宽度较窄。"
          width="220px"
          effect="light"
        />
        <el-button @click="disabled = !disabled">
          {{ disabled ? '开启 tooltip' : '关闭 tooltip' }}
        </el-button>
      </div>
    </div>
  </o-flex>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const disabled = ref(false)
</script>

<style>
.demo-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.el-popper.is-customized {
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.el-popper.is-customized .el-popper__arrow::before {
  background: linear-gradient(45deg, #b2e68d, #bce689);
  right: 0;
}
</style>
