import { navLists } from '../../data/side-nav-bar';
import * as types from '../mutations-types';

const state = {
  navLists,
  navSate: true
};

const getters = {
  navLists: state => state.navLists,
  navSate: state => state.navSate
};

const actions = {
  selectNavBar ({ commit, state }, { title }) {
    commit(types.SIDE_NAV_BAR_SELECT, { title });
  },
  setNavBarList ({ commit, state }, list) {
    commit(types.SIDE_NAV_BAR_RESOURE, { list });
  },
  selectSuperNavBar ({ commit, state }, { key }) {
     commit(types.SIDE_NAV_BAR_SELECTSUPER, { key });
  },
  navBarHide ({ commit, state }) {
    commit(types.SIDE_NAV_BAR_HIDE);
  },
  navBarShow ({ commit, state }) {
    commit(types.SIDE_NAV_BAR_SHOW);
  },
};

const mutations = {
    [types.SIDE_NAV_BAR_SELECT] (state, { title }) {
        // console.log(state.navLists);
        state.navLists.map(list => {

            list.checked = false;

            if(list.title === title){
                list.checked = true;
            }

            return list;
        });
    },
    [types.SIDE_NAV_BAR_RESOURE] (state, { list }) {
        state.navLists = list;
    },
    [types.SIDE_NAV_BAR_SELECTSUPER] (state, { key }) {
      
        state.navLists.map(list => {

            list.checked = false;

            if(list.name === key){
                list.checked = true;
            }
            return list;
        });
    },
    [types.SIDE_NAV_BAR_HIDE] (state) {
        state.navSate = false;
    },
    [types.SIDE_NAV_BAR_SHOW] (state) {
        state.navSate = true;
    }
};

export default {
  state,
  getters,
  actions,
  mutations
}
