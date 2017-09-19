import index from '../view/index/index.vue'
import bikeAllData from '../view/bikeData/bikeAllData/index.vue'
import accountManager from '../view/accountManager/index.vue'
import memberCenter from '../view/memberCenter/index.vue'
import Home from '../view/home/index.vue'
import Login from '../view/login/index.vue'
// 订单管理模块
import orderAllData from '../view/orderData/orderAllData/index.vue'
import dateAndArea from '../view/orderData/dateAndArea/index.vue'
import orderStatus from '../view/orderData/orderStatus/index.vue'
import NotFoundPage from '../view/nofound/index.vue'
// 城市经营分析
import cityManagerAnalysis from '../view/cityManagerAnaliysis/allData/index.vue'
import cityManagerAnalysisByMonth from '../view/cityManagerAnaliysis/allData/detail.vue'
import managerData from '../view/cityManagerAnaliysis/manageData/index.vue'

let staticRoutes = [
    {
        path: '/',
        component: index,
        children:[
            // {
            //     path:'/system/home',
            //     component:Home,
            //     name:'home',
            //     meta: {
            //         requireAuth: true,
            //     },
            // },
            // {
            //     path: '/index/bikeAllData',
            //     component: bikeAllData,
            //     name:'车辆所有数据'
            // },
            {
                path:'/index/orderAllData',
                component: orderAllData,
                name:'订单整体数据'
            },
            {
                path:'/index/dateAndArea',
                component: dateAndArea,
                name:'订单分日期分地区'
            },
            {
                path:'/index/orderStatus',
                component: orderStatus,
                name:'订单状态构成'
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
            },
            {
                path:'/index/memberCenter',
                component: memberCenter,
                name:'个人中心'
            }
        ]
    },
    {
        path:'/index/cityManagerAnalysis/month/:month',
        component: cityManagerAnalysisByMonth,
        name:'经营分析明细'
    }
]

export default staticRoutes;
