import Distribution from 'api/distribution';
import Order from 'api/order';
import * as types from '../mutations-types';
import Vue from 'vue';

const state = {
    distributionPage: null
};

const getters = {
    distributionPage: state => state.distributionPage
};

const actions = {
    getDistributionCompanyList ({ commit, state }) {
        return Distribution.getCompanyList().then((res) => {
            let arr = res.data;
            arr.map(item => {
                Vue.set(item, 'checked', false);
                return item;
            });
            // console.log(arr);
            return arr;
        })
    },  
    setDistributionPage({ commit, state }, page) {
        commit(types.SET_DISTRIBUTION_PAGE, page)
    },
    getDistributionList({ commit, state }, data) {
        return Distribution.getList(data).then(res => {
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
    },
    getDistributionDetail({ commit, state }, id) {
            var dataFormat = Vue.filter('dateFormat');

            return Order.getOne(id).then(data => {
                
                switch (data.handleState) {
                        case 'PENDING':
                            Vue.set(data, 'handleStateString', '待处理');
                            break;
                        case 'HANDLING':
                            Vue.set(data, 'handleStateString', '处理中');
                            break;
                        case 'HANDLED':
                            Vue.set(data, 'handleStateString', '处理完成');
                            break;
                        default:
                            Vue.set(data, 'handleStateString', '待处理');
                    }

                    switch (data.orderType) {
                        case 'BREAKBULK':
                            Vue.set(data, 'orderTypeString', '零担');
                            break;
                        case 'CARLOAD':
                            Vue.set(data, 'orderTypeString', '整车');
                            break;
                        default:
                            Vue.set(data, 'orderTypeString', '整车');
                    }

                    if (data.needInvoice && data.needInvoice.toLowerCase() === 'yes') {
                        Vue.set(data, 'needInvoiceString', '是');
                    } else {
                        Vue.set(data, 'needInvoiceString', '否');
                    }

                    data.sendDate = data.sendDate && dataFormat(data.sendDate, 'yyyy/MM/dd hh:mm');
                    data.deliveryDate = data.deliveryDate && dataFormat(data.deliveryDate, 'yyyy/MM/dd hh:mm');
                    data.loadDate = data.loadDate && dataFormat(data.loadDate, 'yyyy/MM/dd hh:mm');

                    return  Order.getRemark(id).then((res) => {
                        if(res.data.code){
                             data.remarks = res.data.list;
                        }
                        return data;
                    });
            })
    },
    dispatchDistributionOne({ commit, state }, { id, companyId }) {
        return Order.dispatchList({
            orderIdList: [id],
            companyId: null
        });
    },
    dispatchDistributionList({ commit, state }, { list, companyIds }) {
        let orderIdList = [], companyIdList = [];

        list.forEach(item => {
            if (item.checked) {
                orderIdList.push(item.id);
            }
        });

        companyIds.forEach(item => {
            if(item.checked){
                companyIdList.push(item.id);
            }
        })

        if (!orderIdList.length || !companyIdList.length) {
            return Promise.reject(new Error('selected orderIdList or companyIdList item length is 0'));
        }
        return Order.dispatchList({
            orderIdList,
            companyId: companyIdList
        });
    }
};

const mutations = {
    [types.SET_DISTRIBUTION_PAGE](state, page) {
        state.distributionPage = page;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}