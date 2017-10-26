import axios from 'axios'
import store from '../store/store'
import * as types from '../store/types'
import router from '../router/router-config'

/**
 * 生产 
 */
let baseURL = 'http://10.31.147.119:5080'

// let baseURL = 'http://192.168.0.129:5080'
// let baseURL = 'http://192.168.0.121:5080'
// let baseURL = 'http://192.168.0.102:5080'
// let baseURL = 'http://192.168.3.181:5080'
// let baseURL = 'http://192.168.0.129:5080'
// let baseURL = 'http://192.168.0.102:5080'
// let baseURL = 'http://47.93.48.250:5080'
// let baseURL = 'http://47.93.48.250:5080'
// let baseURL = 'http://192.168.0.129:5080'
// let baseURL = 'http://47.93.48.250:5080'
// let baseURL =  'http://192.168.3.50:5080'
// let baseURL = 'http://192.168.3.78:5080'
// let baseURL = 'http://192.168.3.116:5080'
// let baseURL = 'http://192.168.3.17:5080'
// let baseURL = 'http://10.31.147.119:5080'
//let baseURL = 'http://192.168.0.131:5080'
// baseURL = 'http://192.168.0.142:5080'
// var instance = axios.create({
//     baseURL: baseURL,
//     timeout: 1000,
//     headers: {'X-Custom-Header': 'foobar'},
//     withCredentials: true
// });

axios.defaults.baseURL = baseURL;
//axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
// axios.defaults.headers.post['Authorization'] = localStorage.getItem('token');
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';

// axios 配置
// axios.defaults.timeout = 5000;
// axios.defaults.baseURL = 'https://api.github.com';

// http request 拦截器
// axios.interceptors.request.use(
//     config => {
//         if (localStorage.getItem('token')) {
//             config.headers.Authorization = `token ${localStorage.getItem('token')}`;
//         }
//         return config;
//     },
//     err => {
//         return Promise.reject(err);
//     });

// http response 拦截器
// axios.interceptors.response.use(
//     response => {
//         return response;
//     },
//     error => {
//         if (error.response) {
//             switch (error.response.status) {
//                 case 401:
//                     // 401 清除token信息并跳转到登录页面
//                     store.commit(types.LOGOUT);
//                     router.replace({
//                         path: 'login',
//                         query: {redirect: router.currentRoute.fullPath}
//                     })
//             }
//         }
//         // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
//         return Promise.reject(error.response.data)
//     });

export default axios;
