import Member from 'api/member';
import * as types from '../mutations-types';
import Vue from 'vue';

const state = {
    accountPage: null
};

const getters = {
    accountPage: state => state.accountPage
};

const actions = {
    getUserList({ commit, state }, page) {
        let dataFormat = Vue.filter('dateFormat');
        return Member.getUserList(page).then(data => {
            commit(types.ACCOUNT_SET_PAGE, page);

            data.list.map(item => {
                item.lastLoginTime = item.lastLoginTime && dataFormat(item.lastLoginTime, 'yyyy/MM/dd hh:mm');
                Vue.set(item, 'disabledString', item.disabled ? '否' : '是');
                return item;
            })
            return data;
        });
    },
    addUser({ commit, state }, data) {
        return Member.addUser(data);
    },
    editUser({ commit, state }, { user, id }) {
        Vue.set(user, 'id', id);
        return Member.editUser(user);
    },
    getUserDetail({ commit, state }, id) {
        return Member.getUserDetail(id);
    },
    deleteUsers({ commit, state }, data) {
        let { ids, arr } = handleData(data);
        return Member.deleteUsers(ids).then(data => arr);
    },
    enableUsers({ commit, state }, data) {
        let { ids, arr } = handleData(data, true);
        return Member.enableUsers(ids).then(data => arr);
    },
    disableUsers({ commit, state }, data) {
        let { ids, arr } = handleData(data, true);
        return Member.disableUsers(ids).then(data => arr);
    },
    resetPasswords({ commit, state }, data) {
        let { ids, arr } = handleData(data, true);
        return Member.resetUsersPassword(ids).then(data => arr);
    },
    changeUserPassword({ commit, state }, { user, id }) {
        Vue.set(user, 'id', id);
        return Member.resetPassword(user);
    },
    getUserRoles() {
        return Member.getRoles();
    }
};

const mutations = {
    [types.ACCOUNT_SET_PAGE](state, page) {
        state.accountPage = page;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}

function handleData(result, boolean) {
    let ids = [],
        arr = [];
    arr = result.filter(item => {

        if (item.checked) {
            if (boolean) {
                ids.push({ id: item.id });
            } else {
                ids.push(item.id);
            }
            return false;
        } else {
            return true;
        }
    })
    return {
        arr,
        ids
    }
}