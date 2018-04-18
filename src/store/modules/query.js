import Order from 'api/order';
import * as types from '../mutations-types';
import Vue from 'vue';

const state = {
    queryPage: null
};

const getters = {
    queryPage: state => state.queryPage
};

const actions = {
    setQueryPage({ commit, state }, page) {
        commit(types.SET_QUERY_PAGE, page);
    },
    outputExcel({ commit, state }, { lists, items }) {
        let ids = [],
            fields = {},
            i = 0;

        lists.forEach(item => {
            if (item.checked) {
                // let obj = {
                //     [item.value]: item.title
                // };
                fields[item.value] = item.title;
                i++;
            }
        });
        items.forEach(item => {
            if (item.checked) {
                ids.push(item.id)
            }
        });

        if (ids.length && i) {
            // console.log('导出excel的数据', {
            //     ids,
            //     fields
            // });

            return Order.getExcel({
                ids,
                fields
            });
        } else {
            throw Error('id or fields is null');
        }
    },
    findQueryOrderList({ commit, state }, data) {
        return Order.getAll(data).then(res => {
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
            commit(types.SET_QUERY_PAGE, {
                pageNum: res.pageNum,
                pageSize: res.pageSize
            });
            return res;
        });
    }
};

const mutations = {
    [types.SET_QUERY_PAGE](state, page) {
        state.queryPage = page;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}