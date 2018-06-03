import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
    namespaced: true,
    state: {
        logined: false,
        userId: '',
        encryptToken: '',
        timestamp: '',
        random: '',
    },
    actions,
    getters,
    mutations
}