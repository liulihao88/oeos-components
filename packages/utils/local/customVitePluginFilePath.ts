export function customVitePluginFilePath() {
  return {
    name: 'custom-vite-plugin-file-path',
    transform(src, id) {
      if (id.endsWith('.js') || id.endsWith('.ts') || id.endsWith('.vue') || id.endsWith('.tsx')) {
        const filePath = JSON.stringify(id)
        src = src.replace(/__INJECT_FILE_PATH__/g, filePath)
      }
      return src
    },
  }
}
