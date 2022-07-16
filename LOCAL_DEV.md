# Local Development

## Generate new component

With command

```bash
$ pnpm gen component-name
```

Note the `component-name` must be in `kebab-case`, combining words by replacing each space with a dash.

And component type must be added to `typings/global.d.ts`.

## Bootstrap project

With command

```bash
$ pnpm i
```

the project will install all dependencies

## Website preview

With command

```bash
$ pnpm docs:gen-locale
$ pnpm docs:dev
```

the project will launch website for you to preview all existing component

## Local development

See [Local development guide](https://github.com/qv-vue/qv-vue/CONTRIBUTING.md)

1. With command

```shell
$ pnpm dev
```

will start the local development environment

2. Add your component into `play/src/App.vue`

> App.vue

```vue
<template>
  <ComponentYouAreDeveloping />
</template>

<script setup lang="ts">
// make sure this component is registered in @qv-vue/components
import { ComponentYouAreDeveloping } from '@qv-vue/components'
</script>
```

Modify `App.vue` file per your needs to get things work.
