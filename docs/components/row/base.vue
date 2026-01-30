<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <o-title title="跟el-row的显示规则一样"></o-title>
    <o-row :gutter="16">
      <div class="box">1</div>
      <div class="box">2</div>
      <div class="box">3</div>
      <div class="box">4</div>
    </o-row>
    <o-row :col="6" :gutter="16">
      <div class="box">1</div>
      <div class="box">2</div>
      <div class="box">3</div>
      <div class="box">4</div>
    </o-row>

    <o-row :col="[6, 12, 6]" :gutter="16">
      <div class="box">1</div>
      <div class="box">2</div>
      <div class="box">3</div>
    </o-row>

    <o-row :col="[2, 4, 8, 10, 2, 3]" :gutter="16">
      <div class="box">1</div>
      <div class="box">2</div>
      <div class="box">3</div>
      <div class="box">4</div>
    </o-row>

    <o-row :col="8" :gutter="16">
      <div>11111</div>
      <div>11111</div>
    </o-row>
    <o-row :col="8" :colAttrs="{ offset: 2 }" :gutter="16">
      <div>11111</div>
      <div>11111</div>
    </o-row>

    <o-title title="也可以使用el-row的插槽"></o-title>
    <o-row :gutter="16">
      <el-col :span="6">11111</el-col>
      <el-col :span="6">11111</el-col>
      <el-col :span="6">11111</el-col>
      <el-col :span="6">11111</el-col>
      <el-col :span="6">11111</el-col>
      <el-col :span="6">222222</el-col>
    </o-row>

    <o-title title="响应布局"></o-title>
    <oItemWrapper>
      <o-row
        :gutter="10"
        :colAttrs="{
          xs: 8,
          sm: 6,
          md: 4,
          lg: 3,
          xl: 1,
        }"
      >
        <div class="grid-content ep-bg-purple">我不服11</div>
        <div class="grid-content ep-bg-purple">我不服22</div>
        <div class="grid-content ep-bg-purple">我不服33</div>
        <div class="grid-content ep-bg-purple">我不服44</div>
      </o-row>
    </oItemWrapper>
  </div>
</template>
<style scoped>
.box {
  height: 80px;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  border-radius: 4px;

}
</style>
