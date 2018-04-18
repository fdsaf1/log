import Vue from 'Vue';
import axios from 'axios';

import { HOST } from 'config/index';

const _handleError = (err) => {
    console.error(err.message);
    throw err;
};

const _handleSuccess = (res) => {
    // console.log(res.data);
    if (res.data) {
        return res.data;
    }
    throw { message: new Error('数据获取出现错误') };
};

/**
 * 根据条件获取已报价订单
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
const getList = (data) => {
    return axios.post(HOST.enquire + '/order/priceConfirmedOrdersByPage.do', data).then(_handleSuccess).catch(_handleError);
}


export default {
    getList
};