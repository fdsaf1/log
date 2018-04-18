import Vue from 'Vue';
import axios from 'axios';

import { HOST } from 'config/index';

const _handleError = (err) => {
    if (err.message) {
        console.error(err.message);
    }
    throw err;
};

const _handleSuccess = (res) => {
    console.log(res.data);
    if (res.data.code == '0') {
        throw Error('server respond erorr');
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
 * 根据条件获取待选择物流报价的订单
 * @params { Object<{ pageRequest: { pageNum: Number, pageSize: Number },
 *  query: { 
 *       location: String,           // 地址
 *       orderNo: String,            //订单编号
 *       processState: String,       //处理状态
 *       senderName: String,         //发件人
 *       receiverName: String,       // 收件人
 *       createdDateStart: String,   // 开始时间
 *       createdDateEnd: String      // 结束时间
 *   }}> }  data
 */
const getList = (data) => {
    return axios.post(HOST.enquire + '/order/handledOrdersPage.do', data).then(_handleSuccess).catch(_handleError);
};

/**
 * 获取物流报价信息
 * @param { Object<{
 *      orderId: String
 * }> } data 
 */
const logisticsList = (data) => {
    return axios.post(HOST.enquire + '/offer/getCustomOffer.do', data).then(res => {
        return res.data;
    });
};

/**
 * 选择已经报价的物流公司
 * @param { Object<{ orderId: String, offerId: String }> } data 
 */
const selectLogistics = (data) => {
    return axios.post(HOST.enquire + '/offer/editProcessPrice.do', data).then(_handleSuccess).catch(_handleError);
};

/**
 * 保存自定定义价格
 * @param {*} data 
 */
const savePrice = (data) => {
    return axios.post(HOST.enquire + '/offer/updateOffer.do', data).then(_handleSuccess).catch(_handleError);
};

/**
 * 处理完信息后，反馈当前订单信息给客户
 * @param { Object<{orderId: String, offerId: String}> } data
 */
const confirm = (data) => {
    return axios.post(HOST.enquire + '/order/editProcessReplyCustomer.do', data).then(_handleSuccess).catch(_handleError);
}


/**
 * 获取已报价的物流公司
 * @param { pageRequest: Page,  orderId: String } data
 */ 
const getOfferLogistic = (data) => {
    return axios.post(HOST.enquire + '/offer/getOfferListByOrderId.do', data);
}


/**
 * 选择一个报价公司与物流订单关联
 * @param { Object<orderId: string, offerId: string>} data 
 */ 
const selectOfferOrder = (data) => {
   let url = 'order/selectOffer.do';
   return axios.post(HOST.enquire + url, data);
}

/**
 * 获取的订单对应的报价单
 * @param {*} offerId 
 */ 
const getOffer = (offerId) => {
    let url = 'offer/getOfferById.do';
    return axios.post(HOST.enquire + url, {
        offerId
    });
}


export default {
    getList,
    getOne,
    logisticsList,
    selectLogistics,
    savePrice,
    confirm,
    getOfferLogistic,
    selectOfferOrder,
    getOffer
};