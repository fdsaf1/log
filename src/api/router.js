import Vue from 'Vue';
import axios from 'axios';

import { HOST } from 'config/index';

const handleError = (err) => {
    console.error(err.message);
    throw err;
};
const putRouter = (data) => {
    return axios.post(HOST.router + '/route/addRoute.do', data).then(res => {
        // console.log('putRouter', res);
        if (!res.data.code) {
            throw res.data;
        }
        return res.data;
    }).catch(handleError);
};

const getRouterList = (companyName = null, originId = null, destinationId = null, page) => {
    return axios.post(HOST.router + '/route/list.do', {
        companyName,
        originId,
        destinationId,
        page
    }).then(res => {
        if (!res.data.code) {
            throw res.data;
        }
        return res.data;
    }).catch(handleError);
};

const editRoute = (data, id) => {
    let reuslt = Object.assign(data, { id });
    return axios.post(HOST.router + '/route/editRoute.do', data).then(res => {
        if (!res.data.code) {
            throw res.data;
        }
        return res.data;
    }).catch(handleError);
}

const getRouteDetail = (id) => {
    return axios.post(HOST.router + '/route/getRouteDetailedById.do', { id }).then(res => {
        return res.data.data;
    }).catch(handleError);
}

const deleteRouter = (ids) => {
    return axios.post(HOST.router + '/route/delRoute.do', { ids }).then(res => {
        if (!res.data.code) {
            throw res.data;
        }
        return res.data;
    }).catch(handleError);
}

export default {
    putRouter,
    getRouterList,
    editRoute,
    getRouteDetail,
    deleteRouter
}