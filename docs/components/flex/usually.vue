<template>
  <o-title title="direction 对齐方式"></o-title>
  <el-radio-group v-model="direction">
    <el-radio value="row">row</el-radio>
    <el-radio value="column">column</el-radio>
    <el-radio value="row-reverse">row-reverse</el-radio>
    <el-radio value="column-reverse">column-reverse</el-radio>
  </el-radio-group>
  <o-title title="justify 主轴上如何对齐"></o-title>
  <o-radio
    v-model="justify"
    :options="['start', 'end', 'center', 'space-between', 'space-around', 'space-evenly', 'normal']"
    type="simple"
  ></o-radio>
  <o-title title="align 交叉轴上如何对齐"></o-title>
  <o-radio
    v-model="align"
    :options="['start', 'end', 'center', 'baseline', 'stretch', 'normal']"
    type="simple"
  ></o-radio>
  <o-title title="wrap 自动换行"></o-title>
  <o-radio v-model="wrap" :options="['nowrap', 'wrap', 'wrap-reverse']" type="simple"></o-radio>
  <o-title title="gap设置间距 ['small', 'default', 'large', processWidth的宽度]"></o-title>
  <o-radio v-model="gapRadio" :options="['small', 'default', 'large', 'custom']" type="simple"></o-radio>
  <el-slider v-model="gapProgressValue" v-if="gapRadio === 'custom'"></el-slider>
  <o-flex :direction="direction" :justify="justify" :align="align" :wrap="wrap" :gap="gap" class="h-100 w-100%">
    <div
      v-for="(item, index) in new Array(10)"
      :key="index"
      :style="{
        background: `rgb(${50 + index * 1}, ${100 + index * 30}, ${150 + index * 1})`,
        width: '100px',
        height: '30px',
      }"
    />
  </o-flex>

  <o-title title="component 自定义根标签"></o-title>
  <o-flex component="section" gap="default" class="demo-section">
    <div class="demo-card">根节点是 section</div>
    <div class="demo-card">适合需要语义化标签的场景</div>
  </o-flex>

  <o-title title="flex 控制组件自身伸缩"></o-title>
  <div class="parent-flex">
    <o-flex flex="1" justify="center" align="center" class="grow-box">flex="1"</o-flex>
    <o-flex flex="0 0 180px" justify="center" align="center" class="fixed-box">flex="0 0 180px"</o-flex>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'

type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse'
type FlexJustify = 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'normal'
type FlexAlign = 'start' | 'end' | 'center' | 'baseline' | 'stretch' | 'normal'
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse'
type GapMode = 'small' | 'default' | 'large' | 'custom'

const direction = ref<FlexDirection>('row')
const justify = ref<FlexJustify>('normal')
const align = ref<FlexAlign>('normal')
const wrap = ref<FlexWrap>('nowrap')
const gapRadio = ref<GapMode>('small')
const gap = ref<string | number>(gapRadio.value)
const gapProgressValue = ref(0)

watch(gapRadio, (val) => {
  if (val !== 'custom') {
    gap.value = val
  }
})

watch(gapProgressValue, (val) => {
  gap.value = val
})
</script>

<style scoped lang="scss">
.demo-section,
.parent-flex {
  margin-top: 12px;
}

.demo-card,
.grow-box,
.fixed-box {
  min-height: 48px;
  border-radius: 4px;
}

.demo-card {
  padding: 12px 16px;
  color: #1d4ed8;
  background: #eff6ff;
}

.parent-flex {
  display: flex;
  width: 100%;
  gap: 12px;
}

.grow-box {
  color: #0f766e;
  background: #f0fdfa;
}

.fixed-box {
  color: #c2410c;
  background: #fff7ed;
}
</style>
