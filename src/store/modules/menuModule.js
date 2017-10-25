import * as types from '../types.js'
import staticRoute from '../../router/staticRoute.js'
const state = {
    items:[],
    isLoadRoutes: false,
    staticRoute
}
const mutations= {
    [types.ADD_MENU](state ,authList){
        if(authList == null || authList.length === 0){
            state.items = []
        }else{
            generateMenuItems(state, authList)
        }
    },
    [types.LOAD_ROUTES](state){
        state.isLoadRoutes = !state.isLoadRoutes
    }
}
const actions = {
    addMenu({commit}, authList){
        commit(types.ADD_MENU, authList)
    },
    loadRoutes({commit}){
        commit(types.LOAD_ROUTES)
    }
}
const menuitems = state => state.items
const isLoadRoutes = state => state.isLoadRoutes
const getters = {
    menuitems,
    isLoadRoutes
}
function generateMenuItems(state, authList){

    // console.log('state.staticRoute', state.staticRoute)
    // console.log('authList', authList)
    var arr = state.staticRoute[0].children
    var newArr = []
    for(var i=0;i<arr.length;i++){
      if(authList.indexOf(arr[i].auth.toString())!==-1){
          newArr.push(arr[i])
      }
    }
    // console.log('hehehe',newArr)
    var res = Object.assign({},state.staticRoute[0],{children:newArr})
    state.items = [res,state.staticRoute[1],state.staticRoute[2]]
    // console.log('state.items', state.items)
    // state.items = state.staticRoute
    return
}
export default {
    state,
    mutations,
    actions,
    getters
}