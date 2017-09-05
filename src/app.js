// import Vue from 'vue'
// import app from './app.vue'
// import iView from 'iview';
// import 'minireset.css'
// import 'iview/dist/styles/iview.css';
// import './my-theme/index.less';
// import router from './router/index.js'
// Vue.use(iView)
// var vm = new Vue({
//     el:"#app",
//     router,
//     render: h => h(app)
// })
import Vue from 'vue'
import app from './app.vue'
import axios from  './api/axios_api.js'
import store from './store/store.js'
import iView from 'iview';
import 'minireset.css'
import 'iview/dist/styles/iview.css';
import router from './router/index.js'
import './my-theme/index.less';
import * as types from './store/types'
Vue.use(iView)

Vue.prototype.axios = axios

//页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
    store.commit(types.LOGIN, window.localStorage.getItem('token'))
}

// router.beforeEach((to, from, next) => {
//     if (to.matched.some(r => r.meta.requireAuth)) {
//         if (store.state.token) {
//             next();
//         }
//         else {
//             next({
//                 path: '/login',
//                 query: {redirect: to.fullPath}
//             })
//         }
//     }
//     else {
//         next();
//     }
// })

var vm = new Vue({
    el:"#app",
    store,
    router,
    render: h => h(app)
})
