import Company from 'api/company';
import * as types from '../mutations-types';
import Vue from 'vue';

const state = {
    companyPage: null,
    companyQuery: null
};

const getters = {
    companyPage: state => state.companyPage,
    companyQuery: state => state.companyQuery
};

const actions = {
    getCompanyList({ commit, state }, resoult) {

        return Company.getList(resoult).then(data => {

            return data.data;
        });
    },
    deleteCompanyList({ commit, state }, companyList) {
        let list = [],
            ids = [];
        list = companyList.filter(item => {
            if (item.checked) {
                ids.push(item.id);
                return false;
            }
            return true;
        });
        return Company.deletes(ids).then(data => {
            return list;
        });
    },
    getCompanyDetail({ commit, state }, id) {

        return Company.getOne(id).then(data => {
            let { companyName, id, enable, companyCode } = data.data;
            return {
                companyName,
                id,
                companyCode,
                enable: enable.toLowerCase()
            };
        });
    },
    addCompany({ commit, state }, campany) {

        return Company.addOne(campany).then(data => {
            return data;
        });
    },
    editCompany({ commit, state }, campany) {

        return Company.editOne(campany).then(data => {

            return data;
        });
    },
    setHistoryCompanyPage({ commit, state }, { page, query }) {
        commit(types.SET_COMPANY_PAGE, page);
        commit(types.SET_COMPANY_QUERY, query);
    }
};

const mutations = {
    [types.SET_COMPANY_PAGE](state, page) {
        state.companyPage = page;
    },
    [types.SET_COMPANY_QUERY](state, query) {
        state.companyQuery = query;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}