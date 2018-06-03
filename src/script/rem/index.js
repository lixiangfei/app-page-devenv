/**
 * 
 * @param {*Object} config 配置
 ** @param {*Number} maxWidth 设置屏幕最大宽度
 ** @param {*Number} formatWidth 美术稿宽度，不传则默认640
 */

import {
    maxWidth,
    formatWidth
} from '../config';

import { debounce } from '../utils';

const rem = function() {
    const clientWidth = document.documentElement.clientWidth;
    //  当前屏幕宽度与最大宽度作对比，得出相对应格式化的宽度
    let width = clientWidth;
    if (width > maxWidth) {
        width = maxWidth;
    }
    document.documentElement.style.fontSize = ((width / formatWidth) * 100) + 'px';
};

rem();

// resize事件监听
window.addEventListener('resize', () => {
    //	页面resize后调整rem
    debounce(rem, 300)();
});