// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('./assets/style/style.css');
import 'babel-polyfill';

import Vue from 'vue';
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

import App from './App';
import store from './store';
import { router } from './router';

import './filter/index';

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    created() {

    },
    mounted() {

    },
    components: { App }
})