import evt from '../../../event';

export default {
    SET_USERINFO: (state, userInfo) => {
        Object.assign(state, userInfo);
    }
};