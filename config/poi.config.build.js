/**
 * 发布配置
 */
const {
    resolve
} = require('path');

const srcPath = resolve(__dirname, '../src');

const config = require('../config');

const baseConfig = require('./poi.config.base');

const {
    cdn
} = config;

const webpack = require('webpack');

const publicPath = `${cdn.site}${cdn.path}`;

module.exports = Object.assign({}, baseConfig, {
    define: {
        __LOCAL__: false
    },
    //把css注入页面中
    //extractCSS:false
    //默认压缩 minimize:false
    sourceMap: false,
    html: {
        title: config.title,
        template: resolve(srcPath, 'index.ejs'),
        cdnSite: cdn.site
    },
    extendWebpack(config) {
        config.output.publicPath(publicPath);
        //处理将js和vue中的中文转为unicode,兼容cdn返回GBK格式
        config.module
            .rule('vue')
            .use('unicode-loader')
            .loader('unicode-loader');
        config.module
            .rule('js')
            .use('unicode-loader')
            .loader('unicode-loader');
        config.plugin('minimize')
            .use(webpack.optimize.UglifyJsPlugin, [{
                sourceMap: Boolean(module.exports.sourceMap),
                compressor: {
                    warnings: false,
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true,
                    negate_iife: false
                },
                output: {
                    /* 让unicode不被再转义成中文 */
                    ascii_only: true,
                    comments: false
                }
            }])
    }
});