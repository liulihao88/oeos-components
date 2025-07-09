<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const childBorder = ref(false)
const columns2 = [
  { label: '名字2', prop: 'name' },
  { label: '城市2', prop: 'city' },
]
const data = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
])
const preserveExpanded = ref(false)
const columns = [
  {
    label: '名字',
    prop: 'name',
  },
  {
    label: 'city',
    prop: '城市',
  },
  {
    key: 'operation',
    label: '操作',
    btns: [
      {
        content: '编辑',
      },
    ],
  },
]
</script>

<template>
  <div>
    <o-table :columns="columns" :preserve-expanded-content="preserveExpanded" :data="data" ref="tableRef">
      <el-table-column type="expand">
        <template #default="props">
          <div class="inner-table">
            <o-table
              :data="props.row.family"
              :columns="columns2"
              :showIndex="false"
              :showPage="false"
              :custom-header-cell-style="{
                height: '40px !important',
              }"
            >
              <el-table-column label="Name" prop="name" />
              <el-table-column label="State" prop="state" />
              <el-table-column label="City" prop="city" />
              <el-table-column label="Address" prop="address" />
            </o-table>
          </div>
        </template>
      </el-table-column>
    </o-table>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-table .el-table__expanded-cell) {
  padding: 0 !important;
}
</style>
