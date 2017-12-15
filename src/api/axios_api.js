import axios from 'axios'
import store from '../store/store'
import * as types from '../store/types'
import router from '../router/router-config'
import qs from 'qs'
/**
 * 生产 
 */
// let baseURL = 'http://10.31.147.119:5080'


let baseURL = 'http://47.93.48.250:5080'

//let baseURL = 'http://192.168.0.131:5080'
// let baseURL = 'http://192.168.0.129:5080'
// var instance = axios.create({
//     baseURL: baseURL,
//     timeout: 1000,
//     headers: {'X-Custom-Header': 'foobar'},
//     withCredentials: true
// });

axios.defaults.baseURL = baseURL;

axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
	//在发送请求之前做某件事
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }
    
    return config;
},(error) =>{
     _.toast("错误的传参", 'fail');
    return Promise.reject(error);
});
//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{
    //对响应数据做些事
    console.log(res)
    if(!res.data.success){
        // _.toast(res.data.msg);
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    console.log("网络异常", 'fail');
    return Promise.reject(error);
});
  

export default axios;
