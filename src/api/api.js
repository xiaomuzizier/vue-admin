import axios from 'axios';

let base = '';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };
export const addU = params => { return axios.get(`http://182.61.13.156/section/`, { params: params }); };
export const addproject = params => { return axios.get(`http://182.61.13.156/navsec/project/`, { params: params }); };
export const addowner = params => { return axios.get(`http://182.61.13.156/navsec/owner/`, { params: params }); };
export const addcompany = params => { return axios.get(`http://182.61.13.156/navsec/company/`, { params: params }); };