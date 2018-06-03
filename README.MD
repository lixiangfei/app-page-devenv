# 移动端单页面vue脚手架

## 目的

> 简化单页面移动端开发

## 快速开始

```javascript
npm i
npm run dev
```



## cli指令


----------

### npm run dev
启动开发环境
### npm run clear
清空dist目录
### npm run local
清空dist目录，重新编译出文件，启动本地发布环境服务
### npm run build
清空dist目录，重新编译出发布配置的文件
### npm run cdn(前提条件：需要poi先build出来dist目录)
静态资源上传cdn，不包括html，html内容用于上传到cms
### gulp prod（这个只会在虚拟机上使用）
清空dist目录，重新编译出虚拟机服务器prod环境配置的文件，并拷贝到虚拟机服务器相应目录
### npm run release
按照以下顺序执行:

 1. npm run build：清空dist目录，重新编译出发布配置的文件
 2. npm run cdn：静态资源上传cdn

----------

##  使用方法

### 整体配置（重要！必须先配置好）——根目录下config.js文件

```javascript
/**
 * 配置文件
 */

module.exports = {
    //  项目名称，prod环境用
    projectName : "",
    //  html的title
    title : '',
    //  cdn相关，必须先配置
    cdn : {
        //  cdn站点
        site: '', //
        //  cdn路径，
        path: '' //对应目录
    },
    //  服务相关
    server : {
        //  mock服务的projectId
        mockProjectId: 7,
        //  本地服务的host(包括本地开发和本地发布)
        localHost: 'http:xxx.com' 
    }
};
```

### 开发

 1. 用npm run dev来启动开发环境开发
 2. 通过修改js配置文件（/src/script/config/index.js）中相关配置来辅助开发

```javascript
/* 不可手动修改配置项-start */

//  是否开发环境
export const isDev = process.env.NODE_ENV.toLowerCase() === 'development';

//  是否为本地发布环境
export const isLocal = !!__LOCAL__;

/* 不可手动修改配置项-end */

/* 可手动修改配置项-start */

//  是否使用mock，在开发环境才有效
export const isMock = false;

//  微信分享相关配置,如果不需要微信分享，设置为false即可
export const shareConfig = {
    title: '',
    desc: '',
    imgUrl: '',
    link: ''
};

//  最大宽度
export const maxWidth = 750;

//  美术稿宽度
export const formatWidth = 640;

/* 可手动修改配置项-end */
```
 
### 发布

 1. 直接用npm run release生成dist文件，静态资源会自动上传cdn
 2. 将dist文件中的index.html代码粘贴到要发布页面

### 注意点

 1. 执行npm run release和npm run cdn前，必须先配置根目录下config.js文件中的cdn配置

 2. 入口文件中不需要的配置可以自行去掉，目前集成了sdk，微信二次分享，vuex


