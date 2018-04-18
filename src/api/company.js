import Vue from 'Vue';
import axios from 'axios';

import { HOST } from 'config/index';

const _handleError = (err) => {
    console.error(err.message);
    throw err;
};

const _handleSuccess = (res) => {
    if (res.data.code) {
        return res.data;
    }
    throw res.data;
};
/**
 *  获取物流公司列表
 * @param { Object<page: { pageNum: Number, pageSize: Number }, originId:  String, ,destinationId:  String, companyName:  String> } data 
 */
const getList = (data) => {
    return axios.post(HOST.enquire + '/company/list.do', data)
        .then(_handleSuccess).catch(_handleError);
};

/**
 *  批量删除物流公司
 * @params { Array<String> } ids
 */
const deletes = (ids) => {
    return axios.post(HOST.enquire + '/company/delCompany.do', { ids })
        .then(_handleSuccess).catch(_handleError);
};

/**
 *  添加物流公司 enable('YES or NO')
 * @params { Object<{companyName: String, enable: String}> } data
 */
const addOne = (data) => {
    return axios.post(HOST.enquire + '/company/addCompany.do', data)
        .then(_handleSuccess).catch(_handleError);
};

/**
 *  提交编辑好的物流公司信息 enable('YES or NO')
 * @param { Object<{id: String, companyName: String, enable: String}> } data 
 */
const editOne = (data) => {
    return axios.post(HOST.enquire + '/company/editCompany.do', data)
        .then(_handleSuccess).catch(_handleError);
};

/**
 * 根据id获取公司信息
 * @param { companyId: String } data 
 */
const getOne = (companyId) => {
    return axios.post(HOST.enquire + '/company/getCompanyInfoById.do', { companyId })
        .then(_handleSuccess).catch(_handleError);
};



export default {
    getList,
    deletes,
    addOne,
    editOne,
    getOne
}