import Authorize from 'api/authorize';
import * as types from '../mutations-types';

const state = {
    authorizes: null
};

const getters = {
    authorize: state => state.authorize
};

const actions = {
    getCurrentUserPermissions({ commit, state }) {
        if (state.authorizes) {
            return Promise.resolve(state.authorizes);
        } else {
            return Authorize.getList().then(data => {
                commit(types.SET_AUTHORIZE_LIST, data.message);
                return data.message;
            });
        }
    }
};

const mutations = {
    [types.SET_AUTHORIZE_LIST](state, data) {
        state.authorizes = data;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}