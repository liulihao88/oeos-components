<template>
  <div class="function-source-container">
    <details>
      <summary class="function-source-summary">函数源码: {{ functionName }}</summary>
      <div class="language-ts function-source-block">
        <pre class="language-ts"><code class="language-ts" v-html="highlightedSourceCode"></code></pre>
      </div>
    </details>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Prism from 'prismjs'
import 'prismjs/components/prism-typescript'

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
const rawUtilsModules = import.meta.glob('/packages/utils/src/*.ts', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>
const highlightedSourceCode = computed(() => {
  const normalizedCode = sourceCode.value || ''
  return Prism.highlight(normalizedCode, Prism.languages.typescript, 'typescript')
})

onMounted(() => {
  loadUtils()
})

const getLineStart = (source: string, index: number): number => {
  const lineStart = source.lastIndexOf('\n', index)
  return lineStart === -1 ? 0 : lineStart + 1
}

const getLineEnd = (source: string, index: number): number => {
  const lineEnd = source.indexOf('\n', index)
  return lineEnd === -1 ? source.length : lineEnd
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

const getDeclarationStart = (source: string, matchIndex: number, functionName: string): number => {
  let start = getLineStart(source, matchIndex)
  let cursor = start

  const overloadPattern = new RegExp(`^export\\s+function\\s+${functionName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`)

  while (cursor > 0) {
    const previousLineEnd = cursor - 1
    const previousLineStart = getLineStart(source, previousLineEnd)
    const previousLine = source.slice(previousLineStart, getLineEnd(source, previousLineStart)).trim()

    if (!previousLine) {
      break
    }

    if (
      previousLine.startsWith('*') ||
      previousLine.startsWith('/**') ||
      previousLine.startsWith('*/') ||
      overloadPattern.test(previousLine)
    ) {
      start = previousLineStart
      cursor = previousLineStart
      continue
    }

    break
  }

  return start
}

const extractDeclaration = (source: string, matcher: RegExp): string | null => {
  const match = matcher.exec(source)
  if (!match || match.index === undefined) return null

  const declarationStart = getDeclarationStart(source, match.index, match[1] || '')
  const bodyStart = source.indexOf('{', match.index)
  if (bodyStart === -1) return null

  const bodyEnd = findMatchingBrace(source, bodyStart)
  if (bodyEnd === -1) return null

  return source.slice(declarationStart, bodyEnd + 1).trim()
}

const extractFunctionSource = (source: string, functionName: string): string | null => {
  const escapedName = functionName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const patterns = [
    new RegExp(`export\\s+(?:async\\s+)?function\\s+(${escapedName})\\b`, 'm'),
    new RegExp(`export\\s+const\\s+(${escapedName})\\s*=`, 'm'),
    new RegExp(`export\\s+class\\s+(${escapedName})\\b`, 'm'),
  ]

  for (const pattern of patterns) {
    const code = extractDeclaration(source, pattern)
    if (code) return code
  }

  return null
}

const loadUtils = async () => {
  try {
    for (const source of Object.values(rawUtilsModules)) {
      const code = extractFunctionSource(source, props.functionName)
      if (code) {
        sourceCode.value = code
        return
      }
    }

    sourceCode.value = `// 未能找到函数 "${props.functionName}" 的源码`
  } catch (error) {
    console.error(`加载函数源码失败: ${props.functionName}`, error)
    sourceCode.value = `// 加载函数源码时出错: ${error}`
  }
}
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
.function-source-block {
  margin: 0;
  border-radius: 0 0 5px 5px;
}

.function-source-block pre {
  margin: 0;
  padding: 20px 24px;
  overflow: auto;
  line-height: 1.7;
  white-space: pre;
}

.function-source-block code {
  display: block;
  font-size: 14px;
}
</style>
