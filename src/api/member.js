import axios from 'axios';
import { HOST } from 'config/index';

const host = HOST.login;

const handleErr = (err) => {
    console.error(err);
    throw err;
};
// 用户登录
const login = (data) => {
    let url = host + '/login.do';
    return axios.post(url, data).catch(handleErr);
};

// 用户退出
const logout = (data) => {
    let url = host + '/logoutclear.do';
    window.open(url, '_self');
    // return axios.post(url, data).catch(handleErr);
};

// 获取当前用户信息
const getMember = () => {
    let url = host + '/currentUser.do';
    return axios.post(url).then(res => {
        if (res.data.code) {
            return res.data;
        }
        throw res.data;
    }).catch(handleErr);
};

// 更改当前用户的状态
const changeOnline = () => {
    let url = host + '/changeOnline.do';
    return axios.post(url).then(res => {
        if (res.data.code) {
            return res.data.message;
        }
        throw res.data;
    }).catch(handleErr);
};

/**
 * 根据 pageNum（页码）和 pageSize（单页信息数）获取用户列表
 * @param { Object<{ pageNum: Number, pageSize: Number }> } page 
 * @return Map
 */
const getUserList = (page) => {
    let url = host + '/user/findUsers.do';
    return axios.post(url, page).then(res => {
        if (res.data.code) {
            return res.data.message;
        }
        throw res.data;
    }).catch(handleErr);
};

/**
 * 提交新的用户信息 account（用户名）password（密码） phone（手机号码） disabled（是否激活）userCode（用编码）
 * @param { Object<{ account: String, password: String, phone: String, disabled: Boolean, userCode: String }>} data 
 */
const addUser = (data) => {
    let url = host + '/user/addUser.do';
    return axios.post(url, data).then(res => {
        if (res.data.code) {
            return res.data.message;
        }
        throw res.data;
    }).catch(handleErr);
};

/**
 * 提交用户编辑好的信息 id（用户ID） account（用户名） phone（手机号码） disabled（是否激活）userCode（用编码）
 * @param { Object<{ id: String, account: String, phone: String, disabled: Boolean, userCode: String }>} data 
 */
const editUser = (data) => {
    let url = host + '/user/changeUser.do';
    return axios.post(url, data).then(res => {
        if (res.data.code) {
            return res.data.message;
        }
        throw res.data;
    }).catch(handleErr);
};

/**
 * 提交用户重置的密码
 * @param { Object<{ id: String, oldPassword: String, newPassword: String, resureNewPassword: Boolean }>} data 
 */
const resetPassword = (data) => {
    let url = host + '/user/changePassword.do';
    return axios.post(url, data).then(res => {
        if (res.data.code) {
            return res.data.message;
        }
        throw res.data;
    }).catch(handleErr);
};

/**
 * 批量重置用户密码
 * @param { Array<{id: String}>} data 
 */
const resetUsersPassword = (ids) => {
    let url = host + '/user/batchChangePasswords.do';
    return axios.post(url, ids).then(res => {
        if (res.data.code) {
            return res.data.message;
        }
        throw res.data;
    }).catch(handleErr);
};

/**
 * 根据id获得用信息
 * @param { Stirng } id 用户ID
 * @return 
 */
const getUserDetail = (id) => {
    let url = host + '/findUserById.do';
    return axios.post(url, { id }).then(res => {
        if (res.data.code) {
            return res.data.message;
        }
        throw res.data;
    }).catch(handleErr);
}

/**
 * 根据id数组ids，批量删除用户
 * @param { Array<Stirng> } ids 
 */
const deleteUsers = (ids) => {
    let url = host + '/user/batchDeleteUsers.do';
    return axios.post(url, ids).then(res => {
        if (res.data.code) {
            return res.data.message;
        }
        throw res.data;
    }).catch(handleErr);
};

/**
 * 根据id数组ids，批量启用用户
 * @param { Array<{id: String}> } ids 
 */
const enableUsers = (ids) => {
    let url = host + '/user/batchEnableUser.do';
    return axios.post(url, ids).then(res => {
        if (res.data.code) {
            return res.data.message;
        }
        throw res.data;
    }).catch(handleErr);
};

/**
 * 根据id数组ids，批量停用用户
 * @param { Array<{id: String}> } ids 
 */
const disableUsers = (ids) => {
    let url = host + '/user/batchDisableUser.do';
    return axios.post(url, ids).then(res => {
        if (res.data.code) {
            return res.data.message;
        }
        throw res.data;
    }).catch(handleErr);
};

/**
 *  查询用户角色列表
 * @param void
 */
const getRoles = () => {
    let url = host + '/findAllRoles.do';
    return axios.post(url).then(res => {
        if (res.data.code) {
            return res.data.message;
        }
        throw res.data;
    }).catch(handleErr);
};



export default {
    login,
    logout,
    getMember,
    changeOnline,
    getUserList,
    addUser,
    editUser,
    getUserDetail,
    deleteUsers,
    enableUsers,
    disableUsers,
    resetUsersPassword,
    resetPassword,
    getRoles
};