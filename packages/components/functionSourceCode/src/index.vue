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
import { ref, watch } from 'vue'

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
const rawUtilsModules = import.meta.glob('../../../utils/src/*.ts', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>

const getLineStart = (source: string, index: number): number => {
  const lineStart = source.lastIndexOf('\n', index)
  return lineStart === -1 ? 0 : lineStart + 1
}

const findBodyStart = (source: string, startIndex: number): number => {
  let parenDepth = 0
  let seenParen = false

  for (let i = startIndex; i < source.length; i++) {
    const char = source[i]

    if (char === '(') {
      parenDepth++
      seenParen = true
      continue
    }

    if (char === ')') {
      parenDepth--
      continue
    }

    if (char === '{' && (!seenParen || parenDepth === 0)) {
      return i
    }
  }

  return -1
}

const findMatchingBrace = (source: string, openBraceIndex: number): number => {
  let depth = 0

  for (let i = openBraceIndex; i < source.length; i++) {
    const char = source[i]
    if (char === '{') depth++
    if (char === '}') {
      depth--
      if (depth === 0) return i
    }
  }

  return -1
}

const extractDeclaration = (source: string, matcher: RegExp): string | null => {
  const match = matcher.exec(source)
  if (!match || match.index === undefined) return null

  const declarationStart = getLineStart(source, match.index)
  const bodyStart = findBodyStart(source, match.index)
  if (bodyStart === -1) return null

  const bodyEnd = findMatchingBrace(source, bodyStart)
  if (bodyEnd === -1) return null

  return source.slice(declarationStart, bodyEnd + 1).trim()
}

const extractFunctionSource = (source: string, functionName: string): string | null => {
  const escapedName = functionName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const patterns = [
    new RegExp(`export\\s+(?:async\\s+)?function\\s+${escapedName}\\b`, 'm'),
    new RegExp(`export\\s+const\\s+${escapedName}\\s*=`, 'm'),
    new RegExp(`export\\s+class\\s+${escapedName}\\b`, 'm'),
  ]

  for (const pattern of patterns) {
    const code = extractDeclaration(source, pattern)
    if (code) return code
  }

  return null
}

const loadUtils = async (functionName: string) => {
  try {
    for (const loadSource of Object.values(rawUtilsModules)) {
      const source = await loadSource()
      const code = extractFunctionSource(source, functionName)
      if (code) {
        if (functionName === props.functionName) {
          sourceCode.value = code
        }
        return
      }
    }

    if (functionName === props.functionName) {
      sourceCode.value = `// 未能找到函数 "${functionName}" 的源码`
    }
  } catch (error) {
    console.error(`加载函数源码失败: ${functionName}`, error)
    if (functionName === props.functionName) {
      sourceCode.value = `// 加载函数源码时出错: ${error}`
    }
  }
}

watch(
  () => props.functionName,
  (functionName) => {
    sourceCode.value = ''
    loadUtils(functionName)
  },
  { immediate: true },
)
</script>

<style scoped>
.function-source-container {
  margin: 1rem 0;
  border: 1px solid var(--el-border-color-light);
  border-radius: 5px;
}
.function-source-summary {
  padding: 10px 15px;
  background-color: var(--el-fill-color-lighter);
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px 5px 0 0;
}
.language-js {
  margin: 0;
  border-radius: 0 0 5px 5px;
}
</style>
