import Cart from 'api/cart';
import * as types from '../mutations-types';
import Vue from 'vue';

const state = {
    cartPage: null
};

const getters = {
    cartPage: state => state.cartPage
};

const actions = {
    getCartsList({ commit, state }, page) {
        return Cart.findList(page).then(res => res.data);
    },
    addCart({ commit, state }, data) {
        return Cart.pushOne(data);
    },
    editCart({ commit, state }, data) {
        return Cart.updateOne(data);
    },
    getCartDetail({ commit, state }, id) {
        return Cart.findOne(id).then(res => res.data);
    },
    deleteCarts({ commit, state }, list) {
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

        return Cart.deleteList(ids).then(res => arr);
    },
    setCartPage({ commit, state }, page) {
        commit(types.SET_CART_PAGE, page);
    }
};

const mutations = {
    [types.SET_CART_PAGE](state, page) {
        state.cartPage = page;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}