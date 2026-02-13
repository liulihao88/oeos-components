<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const selectValue = ref();

let src = 'https://pure-admin.github.io/pure-admin-table/imgs/2.jpg'
</script>

<template>
   <el-select
    ref="selectRef"
    v-model="selectValue"
    class="w-[200px]!"
    placeholder="请选择"
    value-key="id"
    clearable
  >
    <template #empty>
      <div class="m-4">
        <!-- <pure-table
          row-key="id"
          alignWhole="center"
          :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)'
          }"
          :row-style="rowStyle"
          :data="
            tableDataEdit.slice(
              (pagination.currentPage - 1) * pagination.pageSize,
              pagination.currentPage * pagination.pageSize
            )
          "
          :columns="columns"
          :pagination="pagination"
          @row-click="onRowClick"
        /> -->
        123321321
      </div>
    </template>
    <!-- <el-option></el-option> -->
  </el-select>
</template>