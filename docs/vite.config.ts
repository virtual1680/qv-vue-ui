// vite.config.ts
// 打包element-plus css时报错 加如下插件plugin https://blog.csdn.net/qq_39831708/article/details/124703642
// md的目录必须小写 不然打包后找不到文件 会显示不了
import { defineConfig, loadEnv } from 'vite'
export default defineConfig({
  css: {
    postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                // 去除elementPlus内部charset警告
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              }
            }
          }
        ]
      }
  },
})

