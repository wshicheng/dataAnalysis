import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'
import allDataDetailMoudle from './modules/allDataDetail'

Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        allDataDetailMoudle:allDataDetailMoudle
    },
    state: {
        user: {},
        token: '',
        title: '',
        cityList: [],
        keepCitys: []
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
        },
        cityList_mutation(state, list) {
            state.cityList = list
        },
        keepCitys_mutation( state, list) {
            state.keepCitys = list
        }
    },
    actions:{
        setToken({commit},token){
            commit(types.LOGIN,token)
        },
        removeToken({commit}){
            commit(types.LOGOUT)
        },
        setCityList ({commit}, list) {
            commit('cityList_mutation', list)
        },
        keepCitys ( {commit}, list) {
            commit( 'keepCitys_mutation', list)
        }
    }
})