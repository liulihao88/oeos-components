import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const cwd = process.cwd()
const packageJsonPath = resolve(cwd, 'package.json')
const dryRun = process.argv.includes('--dry-run')

function readPackageJson() {
  return JSON.parse(readFileSync(packageJsonPath, 'utf8'))
}

function writePackageJson(pkg) {
  writeFileSync(packageJsonPath, `${JSON.stringify(pkg, null, 2)}\n`, 'utf8')
}

function bumpPatchVersion(version) {
  const versionParts = version.split('.').map((item) => Number(item))

  if (versionParts.length !== 3 || versionParts.some((item) => Number.isNaN(item))) {
    throw new Error(`Unsupported version format: ${version}`)
  }

  versionParts[2] += 1
  return versionParts.join('.')
}

function run(command, args) {
  const commandText = [command, ...args].join(' ')
  console.log(`\n> ${commandText}`)
  execFileSync(command, args, {
    cwd,
    stdio: 'inherit',
  })
}

function main() {
  const pkg = readPackageJson()
  const nextVersion = bumpPatchVersion(pkg.version)
  const commitMessage = `chore: release @oeos-components/utils v${nextVersion}`

  if (dryRun) {
    console.log(`Current version: ${pkg.version}`)
    console.log(`Next version: ${nextVersion}`)
    console.log('Planned steps:')
    console.log('1. Update package.json version')
    console.log('2. Build dist with unbuild')
    console.log('3. git add -A .')
    console.log(`4. git commit -m "${commitMessage}"`)
    console.log('5. npm publish')
    return
  }

  pkg.version = nextVersion
  writePackageJson(pkg)

  console.log(`Version bumped: ${pkg.version}`)

  run('npx', ['unbuild'])
  run('git', ['add', '-A', '.'])
  run('git', ['commit', '-m', commitMessage])
  run('npm', ['publish'])
}

main()
