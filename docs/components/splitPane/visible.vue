<script setup lang="ts">
import { ref, watch } from 'vue'

const visiblePanels = ref(['source', 'result'])
const splitPercent = ref(50)
const panelOptions = [
  { label: '显示源文件视图', value: 'source' },
  { label: '显示转换结果', value: 'result' },
]

watch(
  visiblePanels,
  (val) => {
    console.log(`36 val`, val)
    const hasSource = val.includes('source')
    const hasResult = val.includes('result')

    if ((hasSource && hasResult) || (!hasSource && !hasResult)) {
      splitPercent.value = 50
    } else if (hasSource) {
      splitPercent.value = 100
    } else if (hasResult) {
      splitPercent.value = 0
    } else {
      splitPercent.value = 50
    }
  },
  {
    deep: true,
  },
)
</script>

<template>
  <div>
    <div class="toolbar">
      <o-checkbox v-model="visiblePanels" :options="panelOptions" :show-all="false" show-type="button" />
    </div>

    <div class="split-demo">
      <o-split-pane
        v-model="splitPercent"
        :min-percent="0"
        :reset-on-click="visiblePanels.length === 2"
      >
        <template #paneL>
          <div class="pane pane-a">源文件视图</div>
        </template>
        <template #paneR>
          <div class="pane pane-b">转换结果</div>
        </template>
      </o-split-pane>
    </div>
  </div>
</template>

<style scoped lang="scss">
.toolbar {
  margin-bottom: 12px;
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
  font-size: 28px;
  font-weight: 700;
}

.pane-a {
  color: #2563eb;
  background: #eff6ff;
}

.pane-b {
  color: #be123c;
  background: #fff1f2;
}
</style>
