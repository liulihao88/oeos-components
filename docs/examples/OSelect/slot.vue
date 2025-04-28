<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const selectValue = ref()
const options = ref([
  { label: '张三', value: 'z3' },
  { label: '李四', value: 'l4' },
  { label: '王五', value: 'w5' },
])

const confirm = (op, item) => {
  console.log(`74 item`, item)
  console.log(`38 op`, op)
}
</script>

<template>
  <div>
    <o-select v-model="selectValue" :options="options">
      <template #header>自定义头部</template>
      <template #default="{ options, item }">
        <div class="f-bt-ct w-100%">
          <span>{{ item.label }}</span>
          <o-popconfirm @confirm="confirm(options, item)" trigger="click">
            <o-icon name="delete" @click.stop></o-icon>
          </o-popconfirm>
        </div>
      </template>
      <template #footer>自定义底部</template>
    </o-select>
  </div>
</template>
