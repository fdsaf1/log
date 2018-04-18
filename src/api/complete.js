import Vue from 'Vue';
import axios from 'axios';

import { HOST } from 'config/index';

const _handleError = (err) => {
    console.error(err);
    throw err;
};

const _handleSuccess = (res) => {
    if (res.data) {
        return res.data;
    }
    throw new Error('数据获取出现错误');
};

/**
 * 获取已完成的定单列表
 * @param {Object<{ pageRequest: { pageNum: Number, pageSize: Number }, query: Object }>} data 
 */
const getList = (data) => {
    return axios.post(HOST.enquire + '/order/completeOrdersByPage.do', data).then(_handleSuccess).catch(_handleError);
};

export default {
    getList
};