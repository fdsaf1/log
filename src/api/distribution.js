import Vue from 'Vue';
import axios from 'axios';

import { HOST } from 'config/index';

const _handleError = (err) => {
    console.error(err);
    throw err;
};

const _handleSuccess = (res) => {
    if (res.data.code == '0') {
        throw Error('server respond erorr');
    }
    if (res.data) {
        return res.data;
    }
    throw new Error('数据获取出现错误');
};

/**
 * 根据条件获取待分发的订单
 * @params { Object<{ pageRequest: { pageNum: Number, pageSize: Number },
 *  query: { 
 *       orderNo: String,            //订单编号
 *       processState: String,       //处理状态
 *       senderName: String,         //发件人
 *       receiverName: String,       // 收件人
 *       createdDateStart: String,   // 开始时间
 *       createdDateEnd: String      // 结束时间
 *       senderAddress;              //寄件地
 *       receiverAddress;            //收件地
 *   }}> }  data 
 */
const getList = (data) => {
    return axios.post(HOST.enquire + '/order/handlingOrdersPage.do', data).then(_handleSuccess).catch(_handleError);
};

/**
 * 获取分发公司列表
 * @param null
 */ 
const getCompanyList = () => {
    return axios.post(HOST.enquire + '/company/getCompanyInfo.do', null)
}


export default {
    getList,
    getCompanyList
};