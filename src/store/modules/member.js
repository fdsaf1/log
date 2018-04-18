import member from 'api/member';
import * as types from '../mutations-types';

const state = {
    member: {},
    memberState: null
};

const getters = {
   member: state => state.member
};

const actions = {
    userlogin ({commit, state}, data) {
       member.login(data).then(res => {
            commit(types.USER_LOGIN);
       });
    },
    userlogout ({commit, state}) {
        member.logout();
        commit(types.USER_LOGOUT);
    },
    getMember ({commit, state}) {
        member.getMember().then(data => {
            console.log('getMember', data);
            commit(types.USER_SET_MEMBER_DATA, data.message);
        });
    },
    changeOnlineState ({commit, state}) {
        member.changeOnline().then(data => {
            if(data.isOnline === 'YES'){
               commit(types.USER_MEMBER_ONLINE);
            }else {
                commit(types.USER_MEMBER_OFFLINE);
            }
        })
    }
};

const mutations = {
    [types.USER_LOGIN] (state) {
        state.memberState = 'login';
    },
    [types.USER_LOGOUT] (state) {
        state.memberState = 'logout';
        state.member = {};
    },
    [types.USER_SET_MEMBER_DATA] (state, data) {
        state.member = data;
    },
    [types.USER_MEMBER_ONLINE] (state, data) {
        state.member.isOnline = 'YES';
    },
     [types.USER_MEMBER_OFFLINE] (state, data) {
        state.member.isOnline = 'NO';
    }
};

export default {
  state,
  getters,
  actions,
  mutations
}