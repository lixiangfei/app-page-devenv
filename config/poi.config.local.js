/**
 * 本地发布环境配置文件
 * 
 */

const buildConfig = require('./poi.config.build');

module.exports = Object.assign({}, buildConfig, {
    define: {
        __LOCAL__: true
    },
    extendWebpack(config) {
        //  设置publicPath，需要本地起站点不改publicPath
        config.output.publicPath('/');
    }
});