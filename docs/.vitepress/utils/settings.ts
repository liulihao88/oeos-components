export function createAlgolia() {
  return {
    apiKey: 'b537815b63bd12a83511061a06d783b9',
    indexName: 'Oeos-v3-components',
    // 如果 Algolia 没有为你提供 `appId` ，使用 `BH4D9OD16A` 或者移除该配置项
    appId: 'BH4D9OD16A',
    placeholder: '请输入关键词',
    translations: {
      button: {
        buttonText: '搜索文档',
      },
    },
  }
}

export const GitLab =
  'https://39.104.162.143:3443/storage/oct-web-project-components-vue3/-/tree/develop'
