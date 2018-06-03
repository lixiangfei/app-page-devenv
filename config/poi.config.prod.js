/**
 * 虚拟机服务器prod环境配置文件
 */

const buildConfig = require('./poi.config.build');

module.exports = Object.assign({}, buildConfig, {
    //  api引用配置文件需要
    mode: 'production',
    //  虚拟机服务器prod环境可以使用sourceMap
    sourceMap: true,
    extendWebpack(config) {
        //  设置publicPath，这里设置相对路径
        config.output.publicPath('./');
    },
    //  如果使用poi的api，poi并不会读取.babelrc的配置，所以在这里写上babel配置
    babel: {
        babelrc: false,
        cacheDirectory: true,
        "presets": ["env"],
        "plugins": [
            "syntax-dynamic-import"
        ]
    },
});