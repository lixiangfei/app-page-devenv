/**
 * 微信分享
 * 直接从cms移植过来的
 */

import {
    shareConfig
} from '../config';

import {
    isWx,
    loadScript
} from '../utils';

import {
    fGet
} from '../../script/fetch';

//  没有分享配置或者不是微信，都不用初始化微信分享;
if (shareConfig && isWx) {
    var WxShare = function() {
            this.config = {
                debug: false,
                appId: '',
                timestamp: '',
                nonceStr: '',
                signature: '',
                jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord', 'onVoiceRecordEnd',
                    'playVoice', 'onVoicePlayEnd', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard'
                ],
                ready: '',
                error: ''
            };
        }
        // 初始化
    WxShare.prototype.init = function(config) {
        var self = this;
        config = Object.assign({}, self.config, config);
        // wx.config, 验证授权
        wx.config && wx.config({
            debug: config.debug,
            appId: config.appId,
            timestamp: config.timestamp,
            nonceStr: config.nonceStr,
            signature: config.signature,
            jsApiList: config.jsApiList
        });
        wx.ready && wx.ready(function() {
            if (typeof config.ready === 'function') {
                config.ready(self);
            }
        });
        wx.error && wx.error(function() {
            if (typeof config.error === 'function') {
                config.error(self);
            }
        });
    };
    // 调用分享接口，自定义分享内容
    // 参数中需要含有以下属性：title、link、imgUrl、success、error
    WxShare.prototype.share = function(config) {
        var defConf = {
            title: '',
            desc: '',
            link: '',
            imgUrl: '',
            success: '',
            cancle: ''
        };
        config = Object.assign({}, defConf, config);
        wx.onMenuShareTimeline && wx.onMenuShareTimeline({
            title: config.title, // 分享标题
            desc: config.desc,
            link: config.link, // 分享链接
            imgUrl: config.imgUrl, // 分享图标
            success: function() {
                if (typeof config.success === 'function') {
                    config.success();
                }
            },
            cancel: function() {
                if (typeof config.cancel === 'function') {
                    config.cancel();
                }
            }
        });
        wx.onMenuShareAppMessage && wx.onMenuShareAppMessage({
            title: config.title, // 分享标题
            desc: config.desc,
            link: config.link, // 分享链接
            imgUrl: config.imgUrl, // 分享图标
            success: function() {
                if (typeof config.success === 'function') {
                    config.success();
                }
            },
            cancel: function() {
                if (typeof config.cancel === 'function') {
                    config.cancel();
                }
            }
        });
    };
    loadScript('//res.wx.qq.com/open/js/jweixin-1.0.0.js', function() {
        console.log('微信脚本加载完毕');
        var wxShare = new WxShare();
        fGet({
            url: '/m/mall/getJsApiSignature',
            data: {
                url: encodeURIComponent(window.location.href)
            }
        }).then(res => {
            var data = res.data;
            wxShare.init({
                debug: false,
                appId: data.appid,
                timestamp: data.timestamp,
                nonceStr: data.noncestr,
                signature: data.signature,
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
                ready: function(obj) {
                    obj.share(shareConfig);
                },
                error: function() {}
            });
        });
    });
}