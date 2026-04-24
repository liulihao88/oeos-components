<template>
  <div>
    <OBasicLayout collapsible>
      <template #header>
        <o-title title="更多">
          <template #right>
            <a href="#">header插槽</a>
          </template>
        </o-title>
      </template>
      默认插槽
      <template #icon>
        <o-icon name="plus" content="自定义折叠icon"></o-icon>
      </template>
      <template #footer>
        <el-button type="primary">footer插槽</el-button>
      </template>
    </OBasicLayout>
  </div>
</template>
