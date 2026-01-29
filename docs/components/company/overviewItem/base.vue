<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const details = ref({})
details.value = {
  updateTime: 1751017882683,
  startTime: null,
  upTime: null,
  workmode: 'Development',
  health: {
    updateTime: 1751014410875,
    healthLevel: 'HEALTH',
    description: '',
  },
  spaces: [
    {
      quota: '1.17 TB',
      totalSpace: 1287835926528,
      usedSpace: 856001601536,
      name: 'STANDARD_STORAGE1',
      objectCount: 97,
      objectSize: 292110079,
      usageLevel: 'OVERHALF',
    },
    {
      quota: '1.17 TB',
      totalSpace: 1287835926528,
      usedSpace: 856001601536,
      name: 'STANDARD_STORAGE2',
      objectCount: 0,
      objectSize: 0,
      usageLevel: 'OVERHALF',
    },
    {
      quota: '29.11 TB',
      totalSpace: 32006783484559,
      usedSpace: 11907710928814,
      name: 'GLACIER_STORAGE1',
      objectCount: 0,
      objectSize: 0,
      usageLevel: 'SUFFICIENT',
    },
    {
      quota: '29.11 TB',
      totalSpace: 32006783484559,
      usedSpace: 11907710928814,
      name: 'GLACIER_STORAGE2',
      objectCount: 0,
      objectSize: 0,
      usageLevel: 'SUFFICIENT',
    },
    {
      quota: '29.11 TB',
      totalSpace: 32006783484559,
      usedSpace: 11907710928814,
      name: 'GLACIER_STORAGE3',
      objectCount: 0,
      objectSize: 0,
      usageLevel: 'SUFFICIENT',
    },
    {
      quota: '29.11 TB',
      totalSpace: 32006783484559,
      usedSpace: 11907710928814,
      name: 'GLACIER_STORAGE4',
      objectCount: 0,
      objectSize: 0,
      usageLevel: 'SUFFICIENT',
    },
    {
      quota: '116.44 TB',
      totalSpace: 128027133938236,
      usedSpace: 47630843715256,
      name: 'GLACIER_STORAGE4in1',
      objectCount: 0,
      objectSize: 0,
      usageLevel: 'SUFFICIENT',
    },
    {
      quota: '29.11 TB',
      totalSpace: 32006783484559,
      usedSpace: 11907710928814,
      name: 'GLACIER_STORAGE_R0',
      objectCount: 0,
      objectSize: 0,
      usageLevel: 'SUFFICIENT',
    },
  ],
  services: [
    {
      id: 'KS07',
      name: '统计服务',
      serveStatus: 'InService',
      healthLevel: 'HEALTH',
    },
    {
      id: 'KS10',
      name: '对象数据处理服务',
      serveStatus: 'InService',
      healthLevel: 'HEALTH',
    },
    {
      id: 'KS04',
      name: '调度微服务',
      serveStatus: 'InService',
      healthLevel: 'HEALTH',
    },
    {
      id: 'KS03',
      name: '数据堆叠服务',
      serveStatus: 'InService',
      healthLevel: 'HEALTH',
    },
    {
      id: 'KS01',
      name: 'S3网关服务',
      serveStatus: 'InService',
      healthLevel: 'HEALTH',
    },
  ],
  primarySpace: {
    totalAvailableCapacity: 10995116032,
    totalUsedCapacity: 292110079,
    totalFreeCapacity: 10703005953,
    capacityUsageLevel: 'SUFFICIENT',
    usedCapacityPrecent: 0.03,
    description:
      '租户[liu]可用硬配额充裕！租户[liu]总可用硬配额 10.24GB 空闲硬配额 9.97GB 已用硬配额 278.58MB逻辑硬配额 278.58MB 使用占比 3.0% 状态 SUFFICIENT',
    reportTime: 1751017837686,
  },
  servicePoint: [
    {
      id: 'KS01',
      name: 'S3网关服务',
      port: 9003,
      serveCount: 3,
      status: 'S3READDELETE',
      description: '数据不可写',
      endpoints: [
        {
          updateTime: 1751017882584,
          startTime: 1751014304902,
          upTime: 3577682,
          host: '10.0.11.33',
          port: 9003,
        },
        {
          updateTime: 1751017882594,
          startTime: 1751014337264,
          upTime: 3545330,
          host: '10.0.11.34',
          port: 9003,
        },
        {
          updateTime: 1751017882595,
          startTime: 1751014305060,
          upTime: 3577535,
          host: '10.0.11.35',
          port: 9003,
        },
      ],
    },
  ],
  tenant: {
    tenantCount: 1,
    bucketCount: 4,
    tenantQuota: '0.01 TB',
    allocateQuota: '7.99 GB',
    totalSpace: 10995116032,
    usedSpace: 292110079,
    handleTaskCount: 2,
  },
  object: {
    objectCount: 97,
    objectSize: 292110079,
  },
}
</script>

<template>
  <div>
    <OOverviewItem :details="details" ></OOverviewItem>
    <OOverviewItem :details="details" style="width: 300%" type="system"></OOverviewItem>
  </div>
</template>
