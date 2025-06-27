<script setup lang="ts">
import { ref, getCurrentInstance, computed } from 'vue'
const { proxy } = getCurrentInstance()
import group1 from '@/assets/images/overview/group1.png'
import group2 from '@/assets/images/overview/group2.png'
import group3 from '@/assets/images/overview/group3.png'
import group4 from '@/assets/images/overview/group4.png'
import overviewService from '@/assets/images/overview/overview-service.png'

defineOptions({
  name: 'OOutService',
})

const props = defineProps({
  details: {
    type: Object,
    default: () => {},
  },
})

const itemList = computed(() => {
  return [
    {
      label: '服务名称',
      value: props.details?.name,
      img: group1,
    },
    {
      label: '服务状态',
      value: props.details?.status,
      img: group2,
    },
    {
      label: '服务端口',
      value: props.details?.port,
      img: group3,
    },
    {
      label: '节点数量',
      value: props.details?.serveCount,
      img: group4,
    },
  ]
})
</script>

<template>
  <oBasicLayout class="h-100%">
    <template #header>
      <o-title title="对外服务信息">
        <template #icon>
          <img :src="overviewService" class="mr" />
        </template>
      </o-title>
    </template>
    <div class="top">
      <div v-for="(v, i) in itemList" :key="i" class="item">
        <img :src="v.img" class="mr2" width="43" />
        <div class="item-right">
          <div class="bold tc">{{ v.value }}</div>
          <div class="cl-45 tc">{{ v.label }}</div>
        </div>
      </div>
    </div>
  </oBasicLayout>
</template>

<style lang="scss" scoped>
.box {
  margin-bottom: 16px;
}

.top {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  .item {
    display: flex;
    .item-right {
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;
      min-width: 100px;
    }
  }
}

.bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  margin-top: 16px;
  font-size: 12px;

  .bottom-item {
    display: flex;
    flex: 1;
    min-height: 63px;
    margin: 0 8px 0 0;
    background: #fff;
    border: 1px solid #d7e0f4;
    border-radius: 5px;

    .num-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      background: #f2f6ff;
      border-radius: 5px 0 0 5px;
    }

    .runtime-item-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      padding: 4px;
    }
  }

  .bottom-item:last-child {
    margin: 0;
  }
}
</style>
