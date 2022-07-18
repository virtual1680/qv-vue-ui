import path from 'path'
import { copyFile, mkdir } from 'fs/promises'
import { copy } from 'fs-extra'
import consola from 'consola'
import { parallel, series } from 'gulp'
import glob from 'fast-glob'
import {
  buildOutput,
  esOutput,
  epOutput,
  epPackage,
  projRoot,
  excludeFiles,
} from '@qv-vue/build-utils'
import { buildConfig, run, runTask, withTaskName } from './src'
import type { TaskFunction } from 'gulp'
import type { Module } from './src'

export const qvFile = async () => {
  // const mjsList = path.resolve(esOutput, '*.mjs')
  // Promise.all([

  // ])
  const input = excludeFiles(
    await glob('*.mjs', {
      cwd: esOutput,
      absolute: true,
      onlyFiles: true,
    })
  )
  consola.log(input)
  // await copyFile(
  //   path.resolve(epOutput, 'theme-chalk/index.css'),
  //   path.resolve(epOutput, 'dist/index.css')
  // )
}

export const copyFiles = () =>
  Promise.all([
    copyFile(epPackage, path.join(epOutput, 'package.json')),
    copyFile(
      path.resolve(projRoot, 'README.md'),
      path.resolve(epOutput, 'README.md')
    ),
    copyFile(
      path.resolve(projRoot, 'global.d.ts'),
      path.resolve(epOutput, 'global.d.ts')
    ),
  ])

export const copyTypesDefinitions: TaskFunction = (done) => {
  const src = path.resolve(buildOutput, 'types', 'packages')
  const copyTypes = (module: Module) =>
    withTaskName(`copyTypes:${module}`, () =>
      copy(src, buildConfig[module].output.path, { recursive: true })
    )

  return parallel(copyTypes('esm'), copyTypes('cjs'))(done)
}

export const copyFullStyle = async () => {
  await mkdir(path.resolve(epOutput, 'dist'), { recursive: true })
  await copyFile(
    path.resolve(epOutput, 'theme-chalk/index.css'),
    path.resolve(epOutput, 'dist/index.css')
  )
}

export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  withTaskName('createOutput', () => mkdir(epOutput, { recursive: true })),

  parallel(
    runTask('buildModules'),
    // runTask('buildModules(2)'),
    runTask('buildFullBundle'),
    runTask('generateTypesDefinitions'),
    runTask('buildHelper'),
    series(
      withTaskName('buildThemeChalk', () =>
        run('pnpm run -C packages/theme-chalk build')
      ),
      copyFullStyle
    )
  ),

  parallel(qvFile, copyTypesDefinitions, copyFiles)
)

export * from './src'
