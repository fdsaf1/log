import Reaponded from 'api/responded';
import * as types from '../mutations-types';
import Vue from 'vue';

const state = {
    respondedPage: null
};

const getters = {
    respondedPage: state => state.respondedPage
};

const actions = {
    getRespondedList({ commit, state }, data) {
        return Reaponded.getList(data).then(res => {
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
            commit(types.SET_RESPONDED_PAGE, {
                pageNum: res.pageNum,
                pageSize: res.pageSize
            });
            return res;
        });
    }
};

const mutations = {
    [types.SET_RESPONDED_PAGE](state, page) {
        state.respondedPage = page;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}