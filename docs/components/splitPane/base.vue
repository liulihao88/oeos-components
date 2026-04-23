<script setup lang="ts">
import { reactive, ref } from 'vue'

const percent = ref(36)
const setting = reactive({
  minPercent: 12,
  defaultPercent: percent.value,
  split: 'vertical',
})

function handleResize(val: number) {
  percent.value = val
}
</script>

<template>
  <div>
    <div class="split-toolbar">左侧宽度：{{ percent.toFixed(2) }}%</div>
    <div class="split-demo">
      <o-split-pane :split-set="setting" @resize="handleResize">
        <template #paneL>
          <div class="pane pane-a">
            <strong>Pane A</strong>
            <span>拖动中间分割条调整宽度</span>
          </div>
        </template>
        <template #paneR>
          <div class="pane pane-b">
            <strong>Pane B</strong>
            <span>点击分割条可重置为 50%</span>
          </div>
        </template>
      </o-split-pane>
    </div>
  </div>
</template>

<style scoped lang="scss">
.split-toolbar {
  margin-bottom: 12px;
  color: var(--el-text-color-secondary);
}

.split-demo {
  height: 320px;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
}

.pane {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
}

.pane strong {
  font-size: 28px;
}

.pane-a {
  color: #1d4ed8;
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
}

.pane-b {
  color: #b45309;
  background: linear-gradient(135deg, #fffbeb, #fef3c7);
}
</style>
