<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'PureProgress',
})

const format = (percentage) => (percentage === 100 ? 'Full' : `${percentage}%`)
const defaultColor = ref(true)
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <o-radio v-model="defaultColor" :options="[true, false]" type="simple" title="不使用el-progress默认颜色"></o-radio>
    </template>

    <div class="mb-4">直线进度条动画</div>
    <div class="w-1/4">
      <o-progress indeterminate :percentage="50" class="mb-4" :customColor="defaultColor" />
      <o-progress indeterminate :percentage="100" :format="format" class="mb-4" :customColor="defaultColor" />
      <o-progress indeterminate :customColor="defaultColor" :percentage="100" status="success" class="mb-4" />
      <o-progress indeterminate :percentage="100" :customColor="defaultColor" status="warning" class="mb-4" />
      <o-progress indeterminate :percentage="50" status="exception" :customColor="defaultColor" class="mb-4" />
    </div>

    <div class="mb-4">进度条内显示百分比标识</div>
    <div class="w-1/4">
      <o-progress :text-inside="true" :stroke-width="26" :percentage="70" class="mb-4" :customColor="defaultColor" />
      <o-progress
        :text-inside="true"
        :stroke-width="24"
        :customColor="defaultColor"
        :percentage="100"
        status="success"
        striped
        striped-flow
        :duration="70"
        class="mb-4"
      />
      <o-progress
        :text-inside="true"
        :stroke-width="22"
        :percentage="80"
        status="warning"
        class="mb-4"
        :customColor="defaultColor"
      />
      <o-progress
        :text-inside="true"
        :customColor="defaultColor"
        :stroke-width="20"
        :percentage="50"
        status="exception"
        striped
        striped-flow
        class="mb-4"
      />
    </div>

    <div class="mb-4">自定义内容</div>
    <div class="w-1/4 demo-progress">
      <o-progress :percentage="50" :customColor="defaultColor">
        <el-button text>自定义内容</el-button>
      </o-progress>
      <o-progress
        :text-inside="true"
        :stroke-width="20"
        :percentage="50"
        status="exception"
        :customColor="defaultColor"
      >
        <span>自定义内容</span>
      </o-progress>
      <o-progress type="circle" :percentage="100" status="success" :customColor="defaultColor">
        <el-button type="success" icon="el-icon-check" circle />
      </o-progress>
      <o-progress type="dashboard" :percentage="80" :customColor="defaultColor">
        <template #default="{ percentage }">
          <span class="percentage-value">{{ percentage }}%</span>
          <span class="percentage-label">上升率</span>
        </template>
      </o-progress>
    </div>
  </el-card>
</template>

<style scoped>
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}

.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}

.demo-progress .el-progress--line {
  width: 350px;
  margin-bottom: 15px;
}

.demo-progress .el-progress--circle {
  margin-right: 15px;
}
</style>
