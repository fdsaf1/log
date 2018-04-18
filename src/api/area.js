import Vue from 'Vue';
import axios from 'axios';

import { HOST } from 'config/index';

export default new class {
    constructor() {}

    findRegion(areaId) {
        return axios.post(HOST.area + '/area/find_children.do', { areaId })
            .then(this._handleSuccess.bind(this))
            .catch(this._handleError);
    };

    findCity(cityId, city) {
        return axios.post(HOST.area + '/area/find_one_detail.do', {
                cityId,
                city
            })
            .then(this._handleSuccess.bind(this))
            .catch(this._handleError);
    };

    findProvince(provinceId, province) {
        return axios.post(HOST.area + '/area/find_one.do', {
                provinceId,
                province
            })
            .then(this._handleSuccess.bind(this))
            .catch(this._handleError);
    }

    findAreaByFullName(fullName) {
        return axios.post(HOST.area + '/area/init_area.do', { fullName })
            .then((res) => {
                return res.data;
            })
            .catch(this._handleError);
    }

    _handleSuccess(res) {
        return res.data;
    }

    _handleError(err) {
        console.error(err.message);
        throw err;
    }
};