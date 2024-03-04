# dialog(弹出框)组件

### 基础用法

:::demo
ODialog/base
:::

### 通常用法

:::demo
ODialog/usually
:::

<script setup lang="ts">
  import { ElMessage, ElLoading, ElButton } from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
  import {ref} from 'vue'
// import Dialog from "../../../packages/components/dialog/Dialog.vue";


// import 'element-plus/theme-chalk/dark/css-vars.css'
// import 'element-plus/theme-chalk/index.css'
// import 'element-plus/theme-chalk/dark/css-vars.css'
// import 'element-plus/theme-chalk/index.css'

const isShow = ref(false)

function why() {
  console.log("why");
}
// ElMessage.success({
//   message: '你好',
//   type: 'success'
// })
// ElLoading.service({})
// <Dialog v-model="isShow"> </Dialog>
</script>

<el-button :loading="true" type="primary" @click="why">我就想知道你为什么不转</el-button>
哈哈111


