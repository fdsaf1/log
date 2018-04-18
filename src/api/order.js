import Vue from 'Vue';
import axios from 'axios';

import { HOST } from 'config/index';

const _handleError = (err) => {
    console.error(err.message);
    throw err;
};

const _handleSuccess = (res) => {
    // console.log(res.data);
    if (res.data.code == '0') {
        throw Error('server respond error');
    }
    if (res.data) {
        return res.data;
    }
    throw { message: new Error('数据获取出现错误') };
};

/**
 * 获取订单详情信息
 * @param { String } orderId
 */
const getOne = (orderId) => {
    return axios.post(HOST.enquire + '/order/getOrder.do', { orderId }).then(_handleSuccess).catch(_handleError);
}

/**
 * 批量分发物流订单
 * @param {object< orderIdList: Array<String>,  companyId: String>} data 
 */
const dispatchList = (data) => {
    return axios.post(HOST.enquire + '/order/dispatchOrder.do', data).then(_handleSuccess).catch(_handleError);
};

/**
 * 根据条件查询所有订单
 * @param { Object<{
 *  pageRequest: {
 *     pageNum: Number,
 *     pageSize: Number
 *  },
 *  query: {
 *       orderNo: String,            //订单编号
 *       processState: String,       //处理状态
 *       senderName: String,         //发件人
 *       receiverName: String,       // 收件人
 *       createdDateStart: String,   // 开始时间
 *       createdDateEnd: String      // 结束时间
 *       senderAddress;              //寄件地
 *       receiverAddress;            //收件地
 *  }
 * }> } data 
 */
const getAll = (data) => {
    return axios.post(HOST.enquire + '/order/getAllOrdersByPage.do', data).then(_handleSuccess).catch(_handleError);
}

/**
 * 获取物流订单的excel表格
 * @param { Obejct<{fields: Array<String>, ids: Array<String>}> } data 
 */
const getExcel = (data) => {
    return axios.post(HOST.enquire + '/order/outputOrderExcel.do', data).then(_handleSuccess).catch(_handleError);
}

/*
 * 获取订单备注 
 */
const getRemark = (id) => {
    return axios.post(HOST.enquire + '/order/findRemarkByThirdOrderId.do', {id});
}

export default {
    getOne,
    dispatchList,
    getAll,
    getExcel,
    getRemark
};