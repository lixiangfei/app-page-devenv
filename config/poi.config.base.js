/**
 * 共用配置
 */
const {
    resolve
} = require('path');

const srcPath = resolve(__dirname, '../src');

const config = require('../config');

module.exports = {
    entry: resolve(srcPath, 'index.js'),
    port: 9090,
    filename: {
        js: '[name].[hash:8].js',
        css: 'style.[contenthash:8].css',
        static: '[name].[hash:8].[ext]',
        chunk: '[id].[chunkhash:8].chunk.js'
    },
    autoprefixer: {
        browsers: ['ie > 8', 'last 3 versions']
    },
    resolve: {
        alias: {
            'vue￥': 'vue/dist/vue.js'
        }
    }
}