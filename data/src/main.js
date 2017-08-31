import Vue from 'vue'
import app from './app.vue'
import iView from 'iview';
import 'minireset.css'
import 'iview/dist/styles/iview.css';
import router from './router/index.js'
Vue.use(iView)
var vm = new Vue({
    el:"#app",
    router,
    render: h => h(app)
})