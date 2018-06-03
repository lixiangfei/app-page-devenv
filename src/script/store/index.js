import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//  外层
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

//  最外层state
const state = {};

//  模块引入
import user from './modules/user';
import device from './modules/device';

//  modules
const modules = {
    user,
    device
}

const store = new Vuex.Store({
    state,
    modules,
    getters,
    actions,
    mutations
});

export default store;