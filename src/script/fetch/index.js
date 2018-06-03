//  fetch兼容包
import 'whatwg-fetch';
import fetchJsonp from 'fetch-jsonp';

//  工具类
import {
    json2query
} from '../utils';

//  配置
import {
    isMock,
    isDev,
    isLocal
} from '../config';

//  返回状态处理
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300 || response.status == 304) {
        return response;
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

//  格式化结果的方法
function parseJSON(response) {
    return response.json();
}

//  fetch错误结果方法
function error(err) {
    throw err;
}

//  默认配置
const CONFIG = {
    data: {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        },
        // 设置同源cookies
        credentials: 'same-origin',
        // 设置跨域cookies
        // credentials: 'include'
    }
}

//  根据环境和是否需要添加url前缀
//  isLocal:本地发布环境，isDev:本地开发环境，isMock:是否使用mock服务（只在本地开发环境下起作用）
const urlPrefix = (function() {
    if (isLocal) {
        //  本地发布环境
        return '/api';
    }
    if (isDev) {
        //  本地开发环境
        return isMock ? '/mockApi' : '/api';
    }
    return '';
})();

//  get和jsonp请求处理url
const getUrl = function(url, data) {
    if (data) {
        return [url, json2query(data)].join(~url.indexOf('?') ? '&' : '?');
    }

    return url;
}

//  暴露wFetch方法
export const wFetch = function(url, config) {
    config = Object.assign({}, CONFIG, config || {});
    return fetch(urlPrefix + url, config)
        .then(checkStatus)
        .then(parseJSON)
        .catch(error);
}

//  暴露wGet方法
export const fGet = function(config) {
    let {
        url,
        data
    } = config;

    url = getUrl(url, data);

    return wFetch(url);
}

//  暴露fPost方法
export const fPost = function(config) {
    let {
        url,
        data
    } = config;

    return wFetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
    });
};

//  暴露fJsonp方法
export const fJsonp = function(config) {
    let {
        url,
        data
    } = config;

    url = getUrl(url, data);

    return fetchJsonp(url)
        .then(parseJSON)
        .catch(error);
}