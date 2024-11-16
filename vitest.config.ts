/// <reference types="vitest" />  

/**
 * 使用了Vitest 和 @vue/test-utils 进行 Vue 组件的单元测试，同时利用 jsdom 模拟浏览器环境
 */


import { defineConfig, PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros'

// https://vitejs.dev/config/  
export default defineConfig({
  // 配置 Vite 插件  
  plugins: [
    // 使用 VueMacros 插件,它包括了 Vue 和 Vue JSX 插件  
    VueMacros.vite({
      plugins: {
        vue: vue() as PluginOption,
        vueJsx: vueJsx() as PluginOption,
      },
    }) as PluginOption,
  ],

  // 配置测试设置  
  test: {
    // 启用全局变量用于测试  
    globals: true,
    // 模拟使用 JSDOM 环境进行测试  
    environment: 'jsdom'
  }
})