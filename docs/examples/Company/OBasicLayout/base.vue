<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <OBasicLayout>
      我是内部的文件
      <template #header>
        <o-title title="基础用法"></o-title>
      </template>
      <template #footer>
        <el-button type="primary">测试07</el-button>
        <el-button type="primary">测试07</el-button>
      </template>
    </OBasicLayout>

    <OBasicLayout
      :headerStyle="{ paddingTop: 0 }"
      class="mt2"
      :mainStyle="{ paddingLeft: 0 }"
      :footerStyle="{ paddingBottom: 0 }"
    >
      无paddingLeft
      <template #header>
        <o-title title="更改内部样式, 无paddingTop"></o-title>
      </template>
      <template #footer>
        <el-button type="primary">无paddingBottom</el-button>
      </template>
    </OBasicLayout>

    <OBasicLayout title="无border" :border="false" class="mt2">
      我是内部的文件111
      <template #footer>
        <el-button type="primary">测试07</el-button>
        <el-button type="primary">测试07</el-button>
      </template>
    </OBasicLayout>

    <OBasicLayout title="自定义样式" :style="{ 'border-radius': '100px' }" class="mt2">
      我是内部的文件111
      <template #footer>
        <el-button type="primary">测试07</el-button>
        <el-button type="primary">测试07</el-button>
      </template>
    </OBasicLayout>
    <OBasicLayout title="清除borderRadius样式" clearBrBottom clearBrTop class="mt2">
      我是内部的文件111
      <template #footer>
        <el-button type="primary">测试07</el-button>
        <el-button type="primary">测试07</el-button>
      </template>
    </OBasicLayout>

    <div class="h-200">
      <OBasicLayout title="不自适应body的高度" clearBrBottom clearBrTop class="mt2 h-100%" :scroll="false">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <template #footer>
          <el-button type="primary">测试07</el-button>
        </template>
      </OBasicLayout>
    </div>
    <div class="h-200">
      <OBasicLayout title="自适应body的高度" clearBrBottom clearBrTop class="mt2 h-100%">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, blanditiis corporis porro hic ea doloribus dolores cumque nulla minima eius fugiat facilis deserunt praesentium tempora in voluptate ex repellendus quod.
        </div>
        <template #footer>
          <el-button type="primary">测试07</el-button>
        </template>
      </OBasicLayout>
    </div>
  </div>
</template>
