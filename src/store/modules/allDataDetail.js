import Vue from 'vue'
import Vuex from 'vuex'
const state = {
    currentMonth:'',
    analysisType :''
}
const mutations = {
    setCurrentMonth(state,month){
        state.currentMonth = month
    },
    setType(state,type){
        state.analysisType = type
    }
}
const actions = {
    updateMonth({commit},month){
        commit('setCurrentMonth',month)
    },
    updateType({commit},type){
        commit('setType',type)
    }
}
const getters = {
    dataMonth: (state)=>{ return state.currentMonth},
    analysisType:(state)=>{return state.analysisType}
}
export default {
    state,
    mutations,
    actions,
    getters
  }