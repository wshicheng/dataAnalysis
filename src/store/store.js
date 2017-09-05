import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: {},
        token: '',
        title: ''
    },
    mutations: {
        [types.LOGIN](state, data){
            sessionStorage.token = data;
            state.token = data;
        },
        [types.LOGOUT](state){
            sessionStorage.removeItem('token');
            state.token = ''
        },
        [types.TITLE](state, data){
            state.title = data;
        }
    },
    actions:{
        setToken({commit},token){
            commit(types.LOGIN,token)
        },
        removeToken({commit}){
            commit(types.LOGOUT)
        }
    }
})