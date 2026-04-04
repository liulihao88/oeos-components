import path from 'node:path'
import { defineBuildConfig } from 'unbuild'
import glob from 'fast-glob'

const formatBuildTime = (date: Date) => {
  const pad = (value: number) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(
    date.getMinutes(),
  )}:${pad(date.getSeconds())}`
}

const buildTime = formatBuildTime(new Date())

const entries = glob.sync('./src/*', {
  cwd: path.resolve(__dirname),
  onlyFiles: true,
})

export default defineBuildConfig({
  entries,
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
    dts: {
      respectExternal: true,
    },
    esbuild: {
      // 强制转换 CJS 模块
      target: 'esnext',
      format: 'esm',
      define: {
        __OEOS_UTILS_BUILD_TIME__: JSON.stringify(buildTime),
      },
    },
  },
})
