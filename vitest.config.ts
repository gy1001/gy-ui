import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    // 使用 happy-dom 模拟浏览器环境
    environment: 'happy-dom',
    // 包含所有子包的测试文件
    include: ['packages/**/*.spec.ts'],
  },
})
