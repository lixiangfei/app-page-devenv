export default {
    GET_USERINFO: ({
        commit
    }) => {
        if(window.sdk){
            sdk.getUserStatus({
                success : (res) => {
                    commit('SET_USERINFO', res);
                }
            });
        }
    }
};