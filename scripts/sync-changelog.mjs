import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const repoRoot = fileURLToPath(new URL('../', import.meta.url))
const changelogPath = fileURLToPath(new URL('../CHANGELOG.md', import.meta.url))
const docsChangelogPath = fileURLToPath(new URL('../docs/components/utils/changelog/home.md', import.meta.url))

const rootContent = readFileSync(changelogPath, 'utf8').replace(/\r\n/g, '\n')
const entries = rootContent
  .replace(/^# Changelog\s*/u, '')
  .trim()

const docsContent = [
  '# 更新日志',
  '',
  '## Hidden Title {.md-hidden}',
  '',
  entries,
  '',
].join('\n')

writeFileSync(docsChangelogPath, docsContent, 'utf8')

console.log(`Synced changelog to docs from ${repoRoot}`)
