import Vue from 'Vue';
import axios from 'axios';

import { HOST } from 'config/index';

const host = HOST.router;

/**
 * 处理服务器连接错误获取响应返回的错误
 * @param { Object<any> } err 
 */
const _handleError = (err) => {
    console.error(err.message);
    throw err;
};

/**
 * 处理服务器响应返回的信息
 * @param { Object<any> } res 
 */
const _handleRespon = (res) => {
    if (res.data.code) {
        return res.data;
    }
    throw res.data;
};

/**
 * 获取车辆列表
 * @params { Object<{ pageNum: Number, pageSize: Number }> } page
 */
const findList = (page) => {
    return axios.post(host + '/carmodels/list.do', { page }).then(_handleRespon, _handleError);
};
/**
 * 根据id获取车辆信息
 * @params { String } id
 */
const findOne = (id) => {
    return axios.post(host + '/carmodels/getCarmodelById.do', { id }).then(_handleRespon, _handleError);
};

/**
 * 添加车辆信息
 * @params { Object<{ carmodelsName: { carmodelsName: String } }> }  carmodels
 */
const pushOne = (carmodels) => {
    return axios.post(host + '/carmodels/addCompany.do', carmodels).then(_handleRespon, _handleError);
};

/**
 * 修改车辆信息
 * @params { Object<{ carmodelsName: String, id: String }> } carmodels
 */
const updateOne = (carmodels) => {
    return axios.post(host + '/carmodels/editCompany.do', carmodels).then(_handleRespon, _handleError);
};

/**
 * 批量删除车辆信息
 * @params { Array<String> } ids 
 */
const deleteList = (ids) => {
    return axios.post(host + '/carmodels/delCarmodel.do', { ids }).then(_handleRespon, _handleError);
};


export default {
    findList,
    findOne,
    pushOne,
    updateOne,
    deleteList
}