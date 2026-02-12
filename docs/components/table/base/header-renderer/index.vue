<script setup lang="ts">
import { useColumns } from './columns'
import Calendar from '~icons/ri/calendar-2-line'

const { columns, filterTableData } = useColumns()
</script>

<template>
  <o-table :data="filterTableData" :columns="columns">
    <template #nameHeader>
      <span class="flex items-center">
        <IconifyIconOffline :icon="Calendar" />
        日期
      </span>
    </template>
  </o-table>
</template>
