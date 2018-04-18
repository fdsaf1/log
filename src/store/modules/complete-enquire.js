import Complete from 'api/complete.js';
import * as types from '../mutations-types';
import Vue from 'vue';

const state = {
    completePage: null
};

const getters = {
    completePage: state => state.completePage
};

const actions = {
    setCompletePage({ commit, state }, page) {
        commit(types.SET_COMPLETE_PAGE, page);
    },
    getCompleteOrderList({ commit, state }, data) {
        return Complete.getList(data).then(res => {
            let list = res.list,
                dataFormat = Vue.filter('dateFormat');

            list = list.filter(item => item);

            list.map(item => {
                switch (item.handleState) {
                    case 'PENDING':
                        Vue.set(item, 'handleStateString', '待处理');
                        break;
                    case 'HANDLING':
                        Vue.set(item, 'handleStateString', '处理中');
                        break;
                    case 'HANDLED':
                        Vue.set(item, 'handleStateString', '处理完成');
                        break;
                    default:
                        Vue.set(item, 'handleStateString', '待处理');
                }

                switch (item.orderType) {
                    case 'BREAKBULK':
                        Vue.set(item, 'orderTypeString', '零担');
                        break;
                    case 'CARLOAD':
                        Vue.set(item, 'orderTypeString', '整车');
                        break;
                    default:
                        Vue.set(item, 'orderTypeString', '整车');
                }

                item.updatedDate = item.updatedDate && dataFormat(item.updatedDate, 'yyyy/MM/dd hh:mm');
                Vue.set(item, 'disabledString', item.disabled ? '否' : '是');

                return item;
            });
            res.list = list;
            return res;
        });
    }
};

const mutations = {
    [types.SET_COMPLETE_PAGE](state, page) {
        state.completePage = page;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}