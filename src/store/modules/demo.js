import { getDemo } from 'api/demo';
import * as types from '../mutations-types';

const state = {

};

const getters = {
   
};

const actions = {
    getDemo ({commit, state}) {
        getDemo();
    }
};

const mutations = {
    [types.GET_DOME] (state) {

    }
};

export default {
  state,
  getters,
  actions,
  mutations
}