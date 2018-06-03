const ua = navigator.userAgent.toLowerCase();
/**
 * 函数去抖动
 * @param {*} func 
 * @param {*} delay 
 */
export const debounce = function(func, delay) {
    let timer = null;
    return function() {
        const context = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
            func.apply(context, args);
        }, delay);
    }
}

/**
 * json对象转化为query格式
 * @param {*} json
 */

export const json2query = function(json) {
    let queryArr = [];
    for (let prop in json) {
        queryArr.push(`${prop}=${json[prop]}`);
    }

    return queryArr.join('&');
}

/**
 * 直接返回是否为BoBoApp
 */

export const isBoBoApp = ua.match(/neteasebobo/i) == "neteasebobo";

/**
 * cookie方法
 */

export const Cookie = {
    set: function(name, value, days) {
        var expires = '';
        if (days) {
            var fix = 0;
            var date = new Date();
            if (days === 'today') {
                days = 1;
                fix = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
            }
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000) - fix * 1000);
            expires = "; expires=" + date.toGMTString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    },

    get: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
            }
        }
        return null;
    },

    del: function(name) {
        this.set(name, '', -1);
    }
};

//  是否微信浏览器打开
export const isWx = ua.match(/microMessenger/i) == "micromessenger";

//  异步加载外链JS
export const loadScript = function(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) { //IE 
        script.onreadystatechange = function() {
            if (script.readyState == "loaded" ||
                script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else { //Others: Firefox, Safari, Chrome, and Opera 
        script.onload = function() {
            callback();
        };
    }
    script.src = url;
    document.body.appendChild(script);
}

/*
 * 格式化时间
 * */
var tempYear, tempMonth, tempDate, tempHour, tempMinute, tempSecond;

function toTwoDigit(num) { return num < 10 ? "0" + num : num; };

function getDatePart(part) {
    switch (part) {
        case "yyyy":
            return tempYear;
        case "yy":
            return tempYear.toString().slice(-2);
        case "MM":
            return toTwoDigit(tempMonth);
        case "M":
            return tempMonth;
        case "dd":
            return toTwoDigit(tempDate);
        case "d":
            return tempDate;
        case "HH":
            return toTwoDigit(tempHour);
        case "H":
            return tempHour;
        case "hh":
            return toTwoDigit(tempHour > 12 ? tempHour - 12 : tempHour);
        case "h":
            return tempHour > 12 ? tempHour - 12 : tempHour;
        case "mm":
            return toTwoDigit(tempMinute);
        case "m":
            return tempMinute;
        case "ss":
            return toTwoDigit(tempSecond);
        case "s":
            return tempSecond;
        default:
            return part;
    }
};

export const formatDate = function(time, formation) {
    var date = new Date(time);
    tempYear = date.getFullYear();
    tempMonth = date.getMonth() + 1;
    tempDate = date.getDate();
    tempHour = date.getHours();
    tempMinute = date.getMinutes();
    tempSecond = date.getSeconds();
    return formation.replace(/y+|m+|d+|h+|s+|H+|M+/g, getDatePart);
}