export default {
    GET_DEVICEINFO: ({
        commit
    }) => {
        if(window.sdk){
            sdk.getDeviceInfo({
                success : (res) => {
                    commit('SET_DEVICEINFO', res);
                }
            });
        }
    }
};