<template>
  <div class="function-source-container">
    <details>
      <summary class="function-source-summary">函数源码: {{ functionName }}</summary>
      <div class="language-js">
        <pre><code>{{ sourceCode }}</code></pre>
      </div>
    </details>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

defineOptions({
  name: 'OFunctionSourceCode',
})

// 从父组件接收函数名
const props = defineProps({
  functionName: {
    type: String,
    default: 'uuid',
  },
})

const sourceCode = ref<string>('')

onMounted(() => {
  loadUtils()
})

// .vitepress/components/FunctionSourceCode.vue

// Helper function to convert PascalCase to kebab-case
const pascalToKebab = (str: string) => {
  return str
    .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/^-/, '')
}

const loadUtils = async () => {
  try {
    // 动态导入你保存了所有函数的 JS/TS 文件
    // 这里我们假设你的函数都在 'src/utils/functions.ts' 中
    const module = await import('@/utils/src/index.ts')

    // 根据函数名从模块中获取函数本身
    const func = module[props.functionName]

    if (func && typeof func === 'function') {
      // 使用 .toString() 将函数转换为源代码字符串
      sourceCode.value = func.toString()
    } else {
      sourceCode.value = `// 未能找到函数 "${props.functionName}"`
    }
  } catch (error) {
    console.error(`加载函数源码失败: ${props.functionName}`, error)
    sourceCode.value = `// 加载函数源码时出错: ${error}`
  }
}
</script>

<style scoped>
.function-source-container {
  margin: 1rem 0;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.function-source-summary {
  padding: 10px 15px;
  background-color: #f8f8f8;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px 5px 0 0;
}
.language-js {
  margin: 0;
  border-radius: 0 0 5px 5px;
}
</style>
