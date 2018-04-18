import Vue from 'Vue';

export const getPage = () => {
    Vue.axios.get('/');
};