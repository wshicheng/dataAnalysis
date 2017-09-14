import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'
import allDataDetailMoudle from './modules/allDataDetail'
import MenuModule from './modules/menuModule.js'
import userModule from './modules/userModule.js'
Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        allDataDetailMoudle:allDataDetailMoudle,
        menus:MenuModule,
        user:userModule
    },
    state: {
        user: {},
        token: '',
        title: '',
        cityList: [],
        keepCitys: [],
        menuActiveName: ''
    },
    getters:{
        cityList: state => {return state.cityList}
    },
    mutations: {
        [types.LOGIN](state, data){
            state.token = data;
            window.sessionStorage.setItem('token',data)
        },
        [types.LOGOUT](state){
            state.token = ''
            window.sessionStorage.removeItem('token')
        },
        [types.TITLE](state, data){
            state.title = data;
        },
        cityList_mutation(state, list) {
            state.cityList = list
        },
        keepCitys_mutation( state, list) {
            state.keepCitys = list
        },
        menuActiveName_mutation( state, text) {
            state.menuActiveName = text
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
        },
        menuActiveName ( { commit }, text) {
            commit( 'menuActiveName_mutation', text)
        }
    }
})