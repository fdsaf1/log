import Vue from 'Vue';
import axios from 'axios';

import { HOST } from 'config/index';

const host = HOST.router;

const handleErr = (err) => {
    console.error(err.message);
    throw err;
};

const getLogisticsCompanysInfo = () => {
    let url = host + '/company/getCompanyInfo.do';
    return axios.post(url)
        .then(res => {
            return res.data;
        })
        .catch(handleErr);
};

/**
 * 自定义物流报价
 * @param { Object<>} data 
 */
const addCustomOffer = (data) => {
    let url = host + '/offer/addCustomOffer.do';
    return axios.post(url, data)
        .then(res => {
            if (res.data.code) {
                return res.data;
            }
            throw res.data;
        })
        .catch(handleErr);
};

export default {
    getLogisticsCompanysInfo,
    addCustomOffer
}