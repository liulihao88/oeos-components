<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <div class="h-300">
      <OBasicLayout title="不自适应body的高度" clearBrBottom clearBrTop class="mt2 h-100%" :scroll="false">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus
          dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus
          dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus
          dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus
          dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus
          dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus
          dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus
          dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus
          dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus
          dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <template #footer>
          <el-button type="primary">测试07</el-button>
        </template>
      </OBasicLayout>
    </div>
    <div class="h-300">
      <OBasicLayout title="自适应body的高度(默认自适应)" clearBrBottom clearBrTop class="mt2 h-100%">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus
          dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus
          dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus
          dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus
          dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus
          dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus
          dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus
          dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus
          dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus
          dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <template #footer>
          <el-button type="primary">测试07</el-button>
        </template>
      </OBasicLayout>
    </div>
  </div>
</template>
