import evt from '../../../event';

export default {
    SET_DEVICEINFO: (state, deviceInfo) => {
        Object.assign(state, deviceInfo);
    }
};