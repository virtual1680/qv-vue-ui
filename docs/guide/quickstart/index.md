# 快速开始

本节将介绍如何在项目中使用 qv-vue。

## 安装

我们建议您使用包管理器 (NPM, Yarn, pnpm) 安装 qv-vue, 然后您就可以使用打包工具，例如 Vite 和 webpack

```bash
# 选择一个你喜欢的包管理器
# NPM
$ npm install element-plus qv-vue --save
# Yarn
$ yarn add element-plus qv-vue
# pnpm
$ pnpm install element-plus qv-vue
```

如果您的网络环境不好，建议使用相关镜像服务 cnpm 或 中国 NPM 镜像。

## 用法

### 完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

```js
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import QvVue from 'qv-vue'
import 'qv-vue/theme-chalk/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(QvVue)
app.mount('#app')
```

### 按需引入

```js
// 目前还有点问题 建议不使用
import { QvCrud, QvForm } from 'qv-vue'
```
