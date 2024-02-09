<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()
function btnClick() {
  console.log('btnClick')
}
const a = ref(33)
</script>

<template>
  <div>
    <div class="bg-blue cl-red" v-copy="'src/App.vue'">src/App.vue</div>
    <div></div>
    <o-button @click="btnClick" type="danger">咋的啦</o-button>
    <o-test></o-test>
    <o-empty description="没有数据啊我的哥"></o-empty>
    <el-input v-model="a" v-number />
    <o-title title="测试中">
      <template #right>
        <div>
          <o-button>这是按钮1</o-button>
          <o-button type="success">这是按钮123321321</o-button>
        </div>
      </template>
    </o-title>
  </div>
</template>

<style scoped lang="scss"></style>
