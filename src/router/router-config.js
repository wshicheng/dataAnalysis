import index from '../view/index/index.vue'
import bikeAllData from '../view/bikeData/bikeAllData/index.vue'
import orderAllData from '../view/orderData/orderAllData/index.vue'
import cityManagerAnalysis from '../view/cityManagerAnaliysis/allData/index.vue'
import cityManagerAnalysisByMonth from '../view/cityManagerAnaliysis/allData/detail.vue'
import managerData from '../view/cityManagerAnaliysis/manageData/index.vue'
import accountManager from '../view/accountManager/indev.vue'
import Home from '../view/home/index.vue'
import Login from '../view/login/index.vue'
import NotFoundPage from '../view/nofound/index.vue'

let routes = [
    {
        path: '/',
        component: index,
        children:[
            {
                path: '/nofound',
                component: NotFoundPage,
                name:'notfound'
            },
            {
                path:'/',
                component:Home,
                meta: {
                    requireAuth: true,
                },
            },
            {
                path: '/index/bikeAllData',
                component: bikeAllData,
                name:'车辆所有数据'
            },
            {
                path:'/index/orderAllData',
                component: orderAllData,
                name:'订单所有数据'
            },
            {
                path: '/index/managerData',
                component: managerData,
                name:'管理数据'
            },
            {
                path:'/index/cityManagerAnalysis',
                component: cityManagerAnalysis,
                name:'城市经营分析'
            },
            {
                path:'/index/accountManager',
                component: accountManager,
                name:'账号管理'
            }
        ]
    },
    {
        path:'/index/cityManagerAnalysis/month/:month',
        component: cityManagerAnalysisByMonth,
        name:'经营分析明细'
    },
    {
        path:'/login',
        component:Login,
        name:'登录'
    }
]

export default routes;
