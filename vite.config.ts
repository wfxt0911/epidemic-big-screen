import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/var.scss";`
      }
    }
  },
  plugins: [vue(),
  Components({
    resolvers: [AntDesignVueResolver()],
  }),
  AutoImport({
    resolvers: [AntDesignVueResolver()],
  }),
  viteCompression({
    verbose: true, // 默认即可
    disable: false, //开启压缩(不禁用)，默认即可
    deleteOriginFile: false, //删除源文件
    threshold: 10240, //压缩前最小文件大小
    algorithm: 'gzip', //压缩算法
    ext: '.gz', //文件类型
  })
  ],
  server: {
    // 'https://c.m.163.com/ug/api/wuhan/app/data/list-total'
    proxy: {
      '/163': {
        target: 'https://c.m.163.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/163/, '')
      }
    }
  },
})
