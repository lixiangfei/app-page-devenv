const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();

const port = 8989;

const resolve = require('path').resolve;

const root = resolve(__dirname + '/dist');

//本地发布环境api的站点
const {
    localHost
} = require('./config').server;

app.use("/", express.static(root));

app.use("/api", proxy({
    target: localHost,
    pathRewrite: {
        '^/api': ''
    },
    changeOrigin: true
}));

app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
});