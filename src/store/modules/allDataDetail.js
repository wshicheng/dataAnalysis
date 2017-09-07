import Vue from 'vue'
import Vuex from 'vuex'
const state = {
    currentMonth:''
}
const mutations = {
    setCurrentMonth(state,month){
        state.currentMonth = month
    }
}
const actions = {
    updateMonth({commit},month){
        commit('setCurrentMonth',month)
    }
}
const getters = {
    dataMonth: (state)=>{ return state.currentMonth}
}
export default {
    state,
    mutations,
    actions,
    getters
  }