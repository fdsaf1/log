import * as types from '../mutations-types';

const state = {
    number: null,
    size: null
};

const getters = {
   number: state => state.number,
   size: state => state.number
};

const actions = {
    gotoPage ({commit, state}, value) {
        console.log(value);
    }
};

const mutations = {
    [types.PAGE_GOTO] (state) {

    }
};

export default {
  state,
  getters,
  actions,
  mutations
}