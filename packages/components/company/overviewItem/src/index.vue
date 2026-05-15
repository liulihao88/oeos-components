<script setup lang="ts">
import { ref, getCurrentInstance, computed } from 'vue'
const { proxy } = getCurrentInstance()
import bucketNumber from '@/assets/images/overview/bucket-number.png'
import bucketTaskNumber from '@/assets/images/overview/bucket-task-number.png'
import objSize from '@/assets/images/overview/obj-size.png'
import objNumber from '@/assets/images/overview/obj-number.png'
import freeSize from '@/assets/images/overview/free-size.png'
import healthyStatus from '@/assets/images/overview/healthy-status.png'
import workModule from '@/assets/images/overview/work-module.png'
import spaceLimit from '@/assets/images/overview/space-limit.png'

defineOptions({
  name: 'OOverviewItem',
})

const props = defineProps({
  details: {
    type: Object,
    default: () => {},
  },
  type: {
    type: String, // tenant | system
    default: 'tenant',
  },
})

const compItemList = computed(() => {
  let originItemList = ref([
    {
      label: '桶数量',
      value: proxy.formatThousands(props.details.tenant?.bucketCount),
      key: 'bucketCount',
      src: bucketNumber,
      style: {
        color: 'var(--overview-primary-text)',
        background: 'var(--overview-success-alt-bg)',
      },
    },
    {
      label: '桶任务数量',
      value: proxy.formatThousands(props.details.tenant?.handleTaskCount),
      key: 'handleTaskCount',
      src: bucketTaskNumber,
      style: {
        color: 'var(--overview-warning-text)',
        background: 'var(--overview-warning-bg)',
      },
    },
    {
      label: '总对象大小',
      value: proxy.formatBytes(props.details.object?.objectSize),
      src: objSize,
      key: 'objectSize',
      style: {
        color: 'var(--overview-success-text)',
        background: 'var(--overview-success-bg)',
      },
    },
    {
      label: '对象总数量',
      value: proxy.formatThousands(props.details.object?.objectCount),
      src: objNumber,
      key: 'objectCount',
      style: {
        color: 'var(--overview-primary-text)',
        background: 'var(--overview-success-alt-bg)',
      },
    },
    {
      label: '总空闲量',
      value: proxy.formatBytes(props.details.primarySpace?.totalFreeCapacity),
      src: freeSize,
      key: 'totalFreeCapacity',
      style: {
        color: 'var(--overview-warning-text)',
        background: 'var(--overview-warning-bg)',
      },
    },
    {
      label: '健康状态',
      value: props.details.health?.healthLevel,
      src: healthyStatus,
      key: 'healthLevel',
      style: {
        color: 'var(--overview-success-text)',
        background: 'var(--overview-success-bg)',
      },
    },
    {
      label: '工作模式',
      value: props.details.workmode,
      src: workModule,
      key: 'workmode',
      style: {
        color: 'var(--overview-primary-text)',
        background: 'var(--overview-success-alt-bg)',
      },
    },
    {
      label: '空间剩余度',
      value: props.details.primarySpace?.capacityUsageLevel,
      src: spaceLimit,
      key: 'capacityUsageLevel',
      style: {
        color: 'var(--overview-warning-text)',
        background: 'var(--overview-warning-bg)',
      },
    },
  ])
  if (props.type === 'tenant') {
    return originItemList.value.slice(0, -1)
  }
  if (props.type === 'system') {
    return originItemList.value.filter((v) => {
      const map = ['bucketCount', 'handleTaskCount', 'objectSize', 'objectCount', 'workmode']
      return map.includes(v.key)
    })
  }
})
</script>

<template>
  <oBasicLayout class="h-100%">
    <oItemWrapper class="w-100%">
      <template v-for="(v, i) in compItemList" :key="i">
        <OItem
          :label="v.label"
          :value="v.value"
          :style="{ background: v.style.background, fontSize: '12px', minWidth: '200px' }"
          :labelStyle="{ color: v.style.color }"
          :itemStyle="{
            minWidth: '100px',
          }"
          :valueStyle="{ color: v.style.color, fontSize: '16px' }"
        >
          <template #img>
            <div class="new-img-box">
              <img :src="v.src" class="po-r" :useResize="true" />
            </div>
          </template>
        </OItem>
      </template>
    </oItemWrapper>
  </oBasicLayout>
</template>

<style lang="scss" scoped>
.new-img-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 100%;

  img {
    min-width: 100%;
    max-width: 100%;
    object-fit: contain !important; // 这里是为了让图片, 不缩放
  }
}
</style>
