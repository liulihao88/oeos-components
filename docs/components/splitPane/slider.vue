<script setup lang="ts">
import { ref } from 'vue'

const leftPercent = ref(35)
</script>

<template>
  <div>
    <div class="toolbar">
      <span class="label">左侧宽度：{{ leftPercent }}%</span>
      <el-slider v-model="leftPercent" :min="10" :max="90" class="slider" />
    </div>

    <div class="split-demo">
      <o-split-pane v-model="leftPercent" :min-percent="10">
        <template #paneL>
          <div class="pane pane-a">左侧 {{ leftPercent }}%</div>
        </template>
        <template #paneR>
          <div class="pane pane-b">右侧 {{ 100 - leftPercent }}%</div>
        </template>
      </o-split-pane>
    </div>
  </div>
</template>

<style scoped lang="scss">
.toolbar {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.label {
  min-width: 120px;
  color: var(--el-text-color-secondary);
}

.slider {
  max-width: 420px;
}

.split-demo {
  height: 320px;
  overflow: hidden;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
}

.pane {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
}

.pane-a {
  color: #1d4ed8;
  background: #eff6ff;
}

.pane-b {
  color: #0f766e;
  background: #f0fdfa;
}
</style>
