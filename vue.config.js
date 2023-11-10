const { defineConfig } = require('@vue/cli-service')
const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
