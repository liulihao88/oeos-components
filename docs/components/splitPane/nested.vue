<script setup lang="ts">
import { reactive } from 'vue'

const settingLR = reactive({
  minPercent: 10,
  defaultPercent: 40,
  split: 'vertical',
})

const settingTB = reactive({
  minPercent: 18,
  defaultPercent: 52,
  split: 'horizontal',
})
</script>

<template>
  <div class="split-demo">
    <o-split-pane :split-set="settingLR">
      <template #paneL>
        <div class="pane pane-a">A</div>
      </template>

      <template #paneR>
        <o-split-pane :split-set="settingTB" class="nested-split">
          <template #paneL>
            <div class="pane pane-b">B</div>
          </template>
          <template #paneR>
            <div class="pane pane-c">C</div>
          </template>
        </o-split-pane>
      </template>
    </o-split-pane>
  </div>
</template>

<style scoped lang="scss">
.split-demo {
  height: 420px;
  overflow: hidden;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
}

.nested-split {
  width: 100%;
  height: 100%;
}

.pane {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 52px;
  font-weight: 700;
}

.pane-a {
  color: #2563eb;
  background: #eff6ff;
}

.pane-b {
  color: #0f766e;
  background: #f0fdfa;
}

.pane-c {
  color: #be123c;
  background: #fff1f2;
}
</style>
