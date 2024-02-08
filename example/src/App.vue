<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import Guide from "../src/doc/guide.md";

// import marked from 'marked';
// import cc, {docMd, docName} from './doc/index';
// console.log(`%c 1194 5行 example/src/App.vue 111 `, 111);

// console.log("docName", cc);
// console.log("docMd", docMd);
// console.log("docName", docName);


const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <div>src/App.vue</div>
    <div v-html="Guide"></div>
    <div>
    </div>
    <o-test></o-test>
  </div>
</template>


<style scoped lang="scss"></style>

