/**
 * 开发环境
 */
const {
    resolve
} = require('path');

const srcPath = resolve(__dirname, '../src');

const nodeModulesPath = resolve(__dirname, '../node_modules');

const config = require('../config');

const baseConfig = require('./poi.config.base');

const {
    mockProjectId,
    localHost
} = config.server;

module.exports = Object.assign({}, baseConfig, {
    define: {
        __LOCAL__: false
    },
    minimize: false,
    sourceMap: true,
    html: {
        title: config.title,
        template: resolve(srcPath, 'index.ejs'),
    },
    devServer: {
        proxy: {
            //使用Mock则用此代理
            '/mockApi/*': {
                target: 'http://mock.XXX.netease.com/',
                pathRewrite: {
                    '^/mockApi': `/mockjsdata/${mockProjectId}/`
                },
                changeOrigin: true, // 虚拟机起的服务需要
                secure: false
            },
            //不使用mock则用此代理
            '/api/*': {
                target: localHost,
                pathRewrite: {
                    '^/api': ''
                },
                changeOrigin: true,
                secure: false
            }
        }
    },
    extendWebpack(config) {
        //  解决在开发环境下，由于没有对webpack-dev-server加载进去的js编译，导致在安卓端app中报错的问题
        //  安卓端的webview在使用严格模式下，用const定义会报错，所以这里对webpack-dev-server多做处理
        config.module
            .rule('js')
            .include
            .add(resolve(nodeModulesPath, 'webpack-dev-server'))
            .end();
    }
});