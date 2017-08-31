
import index from '../view/index/index.vue'
import orderAllData from '../view/order_allData/index.vue'
import cityManagerAnalysis from '../view/cityManagerAnaliysis/allData/index.vue'
import cityManagerAnalysisByMonth from '../view/cityManagerAnaliysis/allData/detail.vue'
import managerData from '../view/cityManagerAnaliysis/manageData/index.vue'
import Home from '../view/home/index.vue'
import Login from '../view/login/index.vue'
export default [
    {
        path: '/',
        component: index,
        children:[
            {
                path:'/',
                component:Home
            },
            {
                path:'/index/orderAllData',
                component: orderAllData
            },
            {
                path: '/index/managerData',
                component: managerData
            },
            {
                path:'/index/cityManagerAnalysis',
                component: cityManagerAnalysis
            }
        ]
    },
    {
        path:'/index/cityManagerAnalysis/month/:month',
        component: cityManagerAnalysisByMonth
    },
    {
        path:'/login',
        component:Login
    }
   
]
