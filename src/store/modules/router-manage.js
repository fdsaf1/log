import Logistics from 'api/logistics';
import Router from 'api/router'
import * as types from '../mutations-types';
import Vue from 'vue';

const state = {
    logisticsCompanys: null,
    routerListPage: null,
    cecheRouterlist: [],
    routerId: null,
    cecheRouter: {},
    addRouterState: {
        isError: false,
        msg: '',
        cecheRouter: {}
    }
};

const getters = {
    logisticsCompanys: state => state.logisticsCompanys,
    addRouterState: state => state.addRouterState,
    routerPage: state => state.routerListPage,
    cecheRouter: state => state.cecheRouter
};

const actions = {
    getLogisticsCompanysInfo({ commit, state }) {
        return Logistics.getLogisticsCompanysInfo().then(data => {
            let results = [];
            data.forEach(item => {
                let { companyName, id } = item;
                results.push({ companyName, id });
            });
            commit(types.GET_LOGISTICS_COMPANY_INFO, results);
        });
    },
    pushRouer({ commit, state }, routerData) {
        return Router.putRouter(routerData).then(data => {
            // console.log('Router', data);
            commit(types.PUSH_ROUTER_SUCCESS);
        }).catch(err => {
            // console.log('Router', err);
            commit(types.PUSH_ROUTER_FAIL, routerData);
        });
    },
    findRouterList({ commit, state }, { companyName, originId, destinationId, page }) {
        return Router.getRouterList(companyName, originId, destinationId, page)
            .then(res => {
                commit(types.SET_ROUTER_LIST, res.data.list);
                return res.data
            });
    },
    setRouterPage({ commit, state }, page) {
        commit(types.ROUTER_SET_PAGE, page);
    },
    editRouter({ commit, state }, data) {
        return Router.editRoute(data, state.routerId).then(data => {
            commit(types.PUSH_ROUTER_SUCCESS);
        }).catch(err => {
            commit(types.PUSH_ROUTER_FAIL, routerData);
        });
    },
    setRouterId({ commit, state }, id) {
        if (state.cecheRouter.id) {
            commit(types.SET_ROUTER_ID, { id });
        } else {
            Router.getRouteDetail(id).then(data => {
                commit(types.SET_ROUTER_CECHE, { data, id });
            });
        }
    },
    deleteRouter({ commit, state }, items) {
        let ids = [],
            arr = [];
        if (!items.length) {
            return Promise.reject();
        }
        arr = items.filter(item => {
            if (item.checked) {
                ids.push(item.id);
                return false;
            } else {
                return true;
            }
        });

        if (!ids.length) return Promise.reject();

        return Router.deleteRouter(ids).then(res => {
            return arr;
        });
    }
};

const mutations = {
    [types.SET_ROUTER_LIST](state, list) {
        // console.log('SET_ROUTER_LIST', list);
        state.cecheRouterlist = list;
    },
    [types.SET_ROUTER_CECHE](state, { data, id }) {
        state.cecheRouter = data;
        state.routerId = id;
    },
    [types.SET_ROUTER_ID](state, { id }) {
        state.routerId = id;
        state.cecheRouter = state.cecheRouterlist.filter(item => item.id === id)[0];
    },
    [types.GET_LOGISTICS_COMPANY_INFO](state, data) {
        // console.log('GET_LOGISTICS_COMPANY_INFO', data);
        state.logisticsCompanys = data;
    },
    [types.PUSH_ROUTER_SUCCESS](state) {
        console.log('PUSH_ROUTER_SUCCESS');
        state.addRouterState.isError = false;
        state.addRouterState.msg = '添加物流路线成功';
        state.addRouterState.cecheRouter = {};
    },
    [types.PUSH_ROUTER_FAIL](state, data) {
        console.log('PUSH_ROUTER_FAIL', data);
        state.addRouterState.isError = true;
        state.addRouterState.msg = '添加物流线路失败';
        state.addRouterState.cecheRouter = data;
    },
    [types.ROUTER_SET_PAGE](state, page) {
        state.routerListPage = page;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}