import path from 'node:path'
import { defineBuildConfig } from 'unbuild'
import glob from 'fast-glob'

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
    },
  },
})
