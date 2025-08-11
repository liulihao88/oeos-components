<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const tenantDetails = {
  tenantCount: 1,
  bucketCount: 4,
  tenantQuota: '0.01 TB',
  allocateQuota: '7.99 GB',
  totalSpace: 10995116032,
  usedSpace: '0 BYTE',
  handleTaskCount: 2,
}

const tenantDetailsExceed = {
  tenantCount: 1,
  bucketCount: 4,
  tenantQuota: '0.01 TB',
  allocateQuota: '7.99 GB',
  totalSpace: 10995116032,
  usedSpace: 13995116032,
  handleTaskCount: 2,
}
</script>

<template>
  <div>
    <oBasicLayout title="租户容量配额" class="w-200" :square="true">
      <template #header></template>
      <OQuotaPie
        class="h-100%"
        type="quota"
        :used="tenantDetails.allocateQuota"
        :total="tenantDetails.tenantQuota"
        text="总使用量 / 总可用量"
      ></OQuotaPie>
    </oBasicLayout>

    <OQuotaPie
      class="h-300"
      type="used"
      :used="tenantDetails.usedSpace"
      :total="tenantDetails.totalSpace"
      text="总分配配额 / 租户总配额"
    ></OQuotaPie>
    <OQuotaPie
      class="h-200"
      type="used"
      :used="tenantDetailsExceed.usedSpace"
      :total="tenantDetailsExceed.totalSpace"
      text="总分配配额 / 租户总配额"
    ></OQuotaPie>
    <OQuotaPie
      class="h-500"
      type="used"
      :used="tenantDetailsExceed.usedSpace"
      :total="tenantDetailsExceed.totalSpace"
      text="总分配配额 / 租户总配额"
    ></OQuotaPie>
  </div>
</template>
