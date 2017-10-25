import index from '../view/index/index.vue'
import bikeAllData from '../view/bikeData/bikeAllData/index.vue'
import accountManager from '../view/accountManager/index.vue'
import memberCenter from '../view/memberCenter/index.vue'
import roleManager from '../view/roleManager/index.vue'

import Home from '../view/home/index.vue'
import Login from '../view/login/index.vue'
// 订单管理模块
import orderAllData from '../view/orderData/orderAllData/index.vue'
import orderAllDataDetail from '../view/orderData/orderAllData/orderAllDataDetail.vue'
import dateAndArea from '../view/orderData/dateAndArea/index.vue'
import orderStatus from '../view/orderData/orderStatus/index.vue'
import orderTime from '../view/orderData/orderTime/index.vue'
import orderMileage from '../view/orderData/orderMileage/index.vue'
import orderRate from '../view/orderData/orderRate/index.vue'
import orderAllDayMap from '../view/orderData/orderAllDayMap/index.vue'
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
            {
                path:'/index/orderAllData',
                component: orderAllData,
                name:'订单整体数据',
                auth: 21
            },
            {
                path:'/index/dateAndArea',
                component: dateAndArea,
                name:'订单分日期分地区',
                auth: 22
            },
            {
                path:'/index/orderStatus',
                component: orderStatus,
                name:'订单状态构成',
                auth: 23
            },
            {
                path:'/index/orderAllDayMap',
                component: orderAllDayMap,
                name:'24小时趋势',
                auth: 24
            },
            {
                path:'/index/orderTime',
                component: orderTime,
                name:'订单时长分布',
                auth: 25
            },
            {
                path:'/index/orderMileage',
                component: orderMileage,
                name:'订单里程分布',
                auth: 26
            },
            {
                path:'/index/orderRate',
                component: orderRate,
                name:'使用频次分布',
                auth: 27
            },
            {
                path:'/index/memberCenter',
                component: memberCenter,
                name:'个人中心',
                auth: 70
            },
            {
                path:'/index/accountManager',
                component: accountManager,
                name:'账号管理',
                auth: 80
            },
            {
                path:'/index/roleManager',
                component: roleManager,
                name: '角色管理',
                auth: 90
            },
            {
                path:'/index/cityManagerAnalysis',
                component: cityManagerAnalysis,
                name:'城市经营分析',
                auth: 101
            },
            {
                path: '/index/managerData',
                component: managerData,
                name:'管理数据',
                auth: 102
            }
        ]
    },
    {
        path:'/index/cityManagerAnalysis/month/:month',
        component: cityManagerAnalysisByMonth,
        name:'经营分析明细'
    },
    {
        path:'/index/orderAllData/detail/:id',
        component: orderAllDataDetail,
        name:'订单整体数据地区详情'
    }
]

export default staticRoutes;
