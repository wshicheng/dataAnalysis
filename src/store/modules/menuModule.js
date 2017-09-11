import * as types from '../types.js'
import staticRoute from '../../router/staticRoute.js'
console.log(staticRoute)
const state = {
    items:[],
    isLoadRoutes: false,
    staticRoute
}
const mutations= {
    [types.ADD_MENU](state,token){
        if(!token){
            state.items = []
        }else{
            console.log('addRoute')
            generateMenuItems(state)
        }
    },
    [types.LOAD_ROUTES](state){
        state.isLoadRoutes = !state.isLoadRoutes
    }
}
const actions = {
    addMenu({commit},token){
        commit(types.ADD_MENU,token)
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
function generateMenuItems(state){
    var arr = state.staticRoute
    console.log('生产菜单')
    console.log(arr)
    state.items = arr
    return
}
export default {
    state,
    mutations,
    actions,
    getters
}