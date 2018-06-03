//	兼容包
import './script/polyfills/assign';
import 'es6-promise/auto';

//	库依赖
// import Vue from 'vue';
import Vue from 'vue/dist/vue.js';
import FastClick from 'fastclick';
import VueRouter from 'vue-router';

//	插件依赖
import rem from './script/rem';
import evt from './script/event';



//	二次分享
import './script/share/wx';

// store
import store from './script/store';
import storeInit from './script/store/init';

import './scss/base.scss';
//	组件
// import Index from './view/index/index.vue';

// import Record from './view/index/record.vue';

// import Address from './view/index/address.vue';

// import SetAddress from './view/index/setAddress.vue';

Vue.use(VueRouter);

//VueRouter路由配置
const routes = [
    // { path: '', component: Index },
    // { path: '/record', component: Record, name: 'record' },
    // { path: '/address', component: Address, name: 'address' },
    // { path: '/setaddress', component: SetAddress, name: 'setaddress' }
]

const router = new VueRouter({
        mode: 'hash',
        routes // (缩写) 相当于 routes: routes
    })
    // window.onload完成之后在通知进行初始化
window.onload = () => {

    vueInit();
}

const vueInit = () => {
    new Vue({
        store,
        router,
        template: `<div id="app"><router-view /></div>`
    }).$mount('#app');
}