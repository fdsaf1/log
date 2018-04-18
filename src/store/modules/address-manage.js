import Address from 'api/address';
import * as types from '../mutations-types';
import Vue from 'vue';

const state = {
    addressPage: null
};

const getters = {
    addressPage: state => state.addressPage
};

const actions = {
    getAddressesList({ commit, state }, page) {
        return Address.findList(page).then(res => res.carmodels);
    },
    addAddresses({ commit, state }, data) {
        return Address.pushOne(data);
    },
    editAddress({ commit, state }, data) {
        return Address.updateOne(data);
    },
    getAddressDetail({ commit, state }, id) {
        return Address.findOne(id).then(res => res.data);
    },
    deleteAddressses({ commit, state }, list) {
        var arr = [],
            ids = [];
        arr = list.filter(item => {
            if (item.checked) {
                ids.push(item.id);
                return false;
            } else {
                return true;
            }
        });

        return Address.deleteList(ids).then(res => arr);
    },
    setAddressPage({ commit, state }, page) {
        commit(types.SET_ADDRESS_PAGE, page);
    }
};

const mutations = {
    [types.SET_ADDRESS_PAGE](state, page) {
        state.addressPage = page;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}