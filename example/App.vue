<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'

// import marked from 'marked';
// import cc, {docMd, docName} from './doc/index';
// console.log(`%c 1194 5行 example/src/App.vue 111 `, 111);

// console.log("docName", cc);
// console.log("docMd", docMd);
// console.log("docName", docName);

const { proxy } = getCurrentInstance()
function btnClick() {
  console.log('btnClick')
}
</script>

<template>
  <div>
    <div class="bg-blue cl-red">src/App.vue</div>
    <div></div>
    <o-button @click="btnClick" type="danger">咋的啦</o-button>
    <o-test></o-test>
    <o-empty description="没有数据啊我的哥"></o-empty>
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
