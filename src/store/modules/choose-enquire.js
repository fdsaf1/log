import Choose from 'api/choose';
import Logistics from 'api/logistics';
import * as types from '../mutations-types';
import Vue from 'vue';

const state = {
    choosePage: null
};

const getters = {
    choosePage: state => state.choosePage
};

const actions = {
    setSelectOfferOrder ({ commit, state}, {orderId, offerId}) {
         return Choose.selectOfferOrder({orderId, offerId}).then(res => res.data);
    },
     getOfferLogisticList ({ commit, state}, { page,  id}) {
        return Choose.getOfferLogistic(
            {
                pageRequest: page,
                orderId: id
            }
        ).then((res) => {
            let arr = res.data;
            return arr;
        });
    },
    setChoosePage({ commit, state }, page) {
        commit(types.SET_CHOOSE_PAGE, page);
    },
    getPenddingOrderList({ commit, state }, data) {
        return Choose.getList(data).then(res => {
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
    addCustomOffer({ commit, state }, { selector, id }) {
        let { logisticsCompany } = selector, data = Object.assign({}, selector);

        data.logisticsCompanyName = logisticsCompany.companyName;
        data.logisticsCompanyId = logisticsCompany.id;
        data.payWay = '线上支付';
        data.orderId = id;

        Vue.delete(data, 'logisticsCompany');
        return Logistics.addCustomOffer(data);
    },
    modifyLogisticPrice({ commit, state }, data) {
        return Choose.savePrice({
            offer: data
        });
    },
    findLogisticOfferList({ commit, state }, orderId) {
        return Choose.logisticsList({
            orderId
        });
    },
    feedbacToCustomer({ commit, state }, { orderId, offerId }) {
        // let { logisticsCompany } = selector;
        // console.log('logisticsCompany', logisticsCompany);
        return Choose.confirm({
            orderId,
            offerId
        });
    },
    getOfferByOrder({ commit, state }, { offerId }) {
        return Choose.getOffer(offerId);
    }
};

const mutations = {
    [types.SET_CHOOSE_PAGE](state, page) {
        state.choosePage = page;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}