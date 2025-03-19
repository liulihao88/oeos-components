<script setup lang="ts">
import { ref, getCurrentInstance, computed, onMounted, onUnmounted } from 'vue'


const form = ref({
  services: [],
  nodes: [],
  fromDatetime: '',
  toDatetime: '',
})
const cacheResponse = ref({})
</script>

<template>
  <div>
    <div ref="headerRef" class="f-bt-ct mb2">
      <div class="l-box">
        <o-input v-model="form.services" title="123" class="mb" width="200" />
        <o-select
          v-model="form.services"
          :options="cacheResponse.serviceList"
          multiple
          title="服务列表"
          class="mr mb"
          width="350"
          label="name"
          collapse-tags
          collapse-tags-tooltip
        />
        <o-select
          v-model="form.services"
          :options="cacheResponse.serviceList"
          multiple
          title="服务列表"
          class="mr mb"
          width="350"
          label="name"
          collapse-tags
          collapse-tags-tooltip
        />
        <o-select
          v-model="form.services"
          :options="cacheResponse.serviceList"
          multiple
          title="服务列表"
          class="mr mb"
          width="350"
          label="name"
          collapse-tags
          collapse-tags-tooltip
        />
        <o-select
          v-model="form.nodes"
          :options="cacheResponse.nodeList"
          multiple
          title="节点列表"
          label="name"
          value="nodeId"
          width="350"
          class="mr mb"
          collapse-tags
          collapse-tags-tooltip
        />
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.l-box {
  overflow: auto;
  width: 100%;
}
.f-bt-ct{
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.r-box {
  min-width: 300px;
  overflow: auto;

  .icon-box {
    width: 100px;

    :deep(.warning-box__content) {
      min-width: 100px;
    }
  }
}
</style>
