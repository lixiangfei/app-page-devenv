/* 不可手动修改配置项-start */

//  是否开发环境
export const isDev = process.env.NODE_ENV.toLowerCase() === 'development';

//  是否为本地发布环境
export const isLocal = !!__LOCAL__;

/* 不可手动修改配置项-end */

/* 可手动修改配置项-start */

//  是否使用mock，在开发环境才有效
export const isMock = true;

//  微信分享相关配置,如果不需要微信分享，设置为false即可
export const shareConfig = {
    title: '',
    desc: '',
    imgUrl: '',
    link: ''
};

//  最大宽度,不需要可以设置为false
export const maxWidth = 750;

//  美术稿宽度  插件156
export const formatWidth = 750;

/* 可手动修改配置项-end */