import Vue from 'vue';
import Vuex from 'Vuex';

Vue.use(Vuex);

import DOME from './modules/demo';
import sideNavbar from './modules/side-nav-bar';
import page from './modules/page';
import member from './modules/member';
import routerManage from './modules/router-manage';
import accountManage from './modules/account-manage';
import companyManage from './modules/company-manage';
import cartManage from './modules/cart-manage';
import addressManage from './modules/address-manage';
import authorize from './modules/authorize';
import distirbutionEnquire from './modules/distribution-enquire';
import completeEnquire from './modules/complete-enquire';
import chooseEnquire from './modules/choose-enquire';
import respondedEnquire from './modules/responded-enquire';
import payedEnquire from './modules/payed-enquire';
import query from './modules/query';
import Area from './modules/area';

export default new Vuex.Store({
    //   actions,
    //   getters,
    modules: {
        DOME,
        sideNavbar,
        page,
        member,
        routerManage,
        accountManage,
        companyManage,
        cartManage,
        addressManage,
        distirbutionEnquire,
        completeEnquire,
        chooseEnquire,
        respondedEnquire,
        payedEnquire,
        Area,
        authorize,
        query
    },
    //   strict: debug,
    //   plugins: debug ? [createLogger()] : []
})