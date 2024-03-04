# dialog(弹出框)组件

### 基础用法

:::demo
ODialog/base
:::

### 通常用法

:::demo
ODialog/usually
:::

<script setup>
  import {ref} from 'vue'
import Dialog from "../../../packages/components/dialog/Dialog.vue";

const isShow = ref(false)
</script>


<el-button :loading="true" type="primary">我就想知道你为什么不转</el-button> 
<Dialog v-model="isShow">
哈哈
</Dialog>
