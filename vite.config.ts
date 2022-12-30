import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import {
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {
      VUE_APP_PATH: '/'
    }
  },
  plugins: [
    vue(),
    // 自动注入vue组件，不需要在每个页面重新import引入
    AutoImport({
      imports: ['vue', 'vue-router'],
      eslintrc: {
        enabled: true, // 若没此json文件，先开启，生成后在关闭
        filepath: './types/.eslintrc-auto-import.json',
        globalsPropValue: true
      },
      dts: './types/auto-imports.d.ts'
    }),
    // 集成自动引入组件插件
    Components({
      resolvers: [
        AntDesignVueResolver({
          // 自动引入 ant-design/icons-vue中的图标，需要安装@ant-design/icons-vue
          resolveIcons: true
        })
      ],
      dts: './types/components.d.ts'
    }),
    // 集成原子unocss插件
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        // 添加图标预设
        presetIcons({
          scale: 1.2,
          warn: true
        })
      ],
      transformers: [transformerDirectives(), transformerVariantGroup()]
    })
  ]
})
