import Vue from 'Vue';
import axios from 'axios';

import { HOST } from 'config/index';

const _handleError = (error) => {
    console.error(error.message);
    throw error;
};

/**
 * 获取当前用户的权限列表
 * @params void 
 */
const getList = () => {
    return axios
        .get(HOST.enquire + '/permission/currentUserPermissions.do').then(res => {
            if (res.data.code) {
                return res.data;
            }
            throw res.data;
        }).catch(_handleError);
};

export default {
    getList
}