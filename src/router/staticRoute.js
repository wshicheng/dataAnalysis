//import index from '../view/index/index.vue'
const Index = resolve => require.ensure([], () => resolve(require('../view/index/index.vue')), 'index')
//import bikeAllData from '../view/bikeData/bikeAllData/index.vue'
const BikeAllData = resolve => require.ensure([], () => resolve(require('../view/bikeData/bikeAllData/index.vue')), 'bikeAllData')
//import accountManager from '../view/accountManager/index.vue'
const AccountManager = resolve => require.ensure([], () => resolve(require('../view/accountManager/index.vue')), 'accountManager')
//import memberCenter from '../view/memberCenter/index.vue'
const MemberCenter = resolve => require.ensure([], () => resolve(require('../view/memberCenter/index.vue')), 'memberCenter')
//import roleManager from '../view/roleManager/index.vue'
const RoleManager = resolve => require.ensure([], () => resolve(require('../view/roleManager/index.vue')), 'roleManager')
//import Home from '../view/home/index.vue'
const Home = resolve => require.ensure([], () => resolve(require('../view/home/index.vue')), 'Home')
//import Login from '../view/login/index.vue'
//const Login = resolve => require.ensure([], () => resolve(require('../view/login/index.vue')), 'Login')
// 订单管理模块
//import orderAllData from '../view/orderData/orderAllData/index.vue'
const OrderAllData = resolve => require.ensure([], () => resolve(require('../view/orderData/orderAllData/index.vue')), 'orderAllData')
//import orderAllDataDetail from '../view/orderData/orderAllData/orderAllDataDetail.vue'
const OrderAllDataDetail = resolve => require.ensure([], () => resolve(require('../view/orderData/orderAllData/orderAllDataDetail.vue')), 'orderAllDataDetail')
//import dateAndArea from '../view/orderData/dateAndArea/index.vue'
const DateAndArea = resolve => require.ensure([], () => resolve(require('../view/orderData/dateAndArea/index.vue')), 'dateAndArea')
//import orderStatus from '../view/orderData/orderStatus/index.vue'
const OrderStatus = resolve => require.ensure([], () => resolve(require('../view/orderData/orderStatus/index.vue')), 'orderStatus')
//import orderTime from '../view/orderData/orderTime/index.vue'
const OrderTime = resolve => require.ensure([], () => resolve(require('../view/orderData/orderTime/index.vue')), 'orderTime')
//import orderMileage from '../view/orderData/orderMileage/index.vue'
const OrderMileage = resolve => require.ensure([], () => resolve(require('../view/orderData/orderMileage/index.vue')), 'orderMileage')
//import orderRate from '../view/orderData/orderRate/index.vue'
const OrderRate = resolve => require.ensure([], () => resolve(require('../view/orderData/orderRate/index.vue')), 'orderRate')
//import orderAllDayMap from '../view/orderData/orderAllDayMap/index.vue'
const OrderAllDayMap = resolve => require.ensure([], () => resolve(require('../view/orderData/orderAllDayMap/index.vue')), 'orderAllDayMap')
//import NotFoundPage from '../view/nofound/index.vue'
const NotFoundPage = resolve => require.ensure([], () => resolve(require('../view/nofound/index.vue')), 'NotFoundPage')
// 用户数据模块
//import userAllData from '../view/userData/userAllData/index.vue'
const UserAllData = resolve => require.ensure([], () => resolve(require('../view/userData/userAllData/index.vue')), 'userAllData')
//import userAllDataDetail from '../view/userData/userAllData/detail.vue'
const UserAllDataDetail = resolve => require.ensure([], () => resolve(require('../view/userData/userAllData/detail.vue')), 'userAllDataDetail')
//import userDateAndArea from '../view/userData/dateAndArea/index.vue'
const UserDateAndArea = resolve => require.ensure([], () => resolve(require('../view/userData/dateAndArea/index.vue')), 'userDateAndArea')
//import newUser from '../view/userData/newUser/index.vue'
const NewUser = resolve => require.ensure([], () => resolve(require('../view/userData/newUser/index.vue')), 'newUser')
//import newUserDetail from '../view/userData/newUser/detail.vue'
const NewUserDetail = resolve => require.ensure([], () => resolve(require('../view/userData/newUser/detail.vue')), 'newUserDetail')
//import activeUser from '../view/userData/activeUser/index.vue'
const ActiveUser = resolve => require.ensure([], () => resolve(require('../view/userData/activeUser/index.vue')), 'activeUser')
//import activeUserDetail from '../view/userData/activeUser/detail.vue'
const ActiveUserDetail = resolve => require.ensure([], () => resolve(require('../view/userData/activeUser/detail.vue')), 'activeUserDetail')
//import userKeep from '../view/userData/userKeep/index.vue'
const UserKeep = resolve => require.ensure([], () => resolve(require('../view/userData/userKeep/index.vue')), 'userKeep')

// 城市经营分析
//import cityManagerAnalysis from '../view/cityManagerAnaliysis/allData/index.vue'
const CityManagerAnalysis = resolve => require.ensure([], () => resolve(require('../view/cityManagerAnaliysis/allData/index.vue')), 'cityManagerAnalysis')
//import cityManagerAnalysisByMonth from '../view/cityManagerAnaliysis/allData/detail.vue'
const CityManagerAnalysisByMonth = resolve => require.ensure([], () => resolve(require('../view/cityManagerAnaliysis/allData/detail.vue')), 'cityManagerAnalysisByMonth')
//import manageReport from '../view/cityManagerAnaliysis/allData/manageReport.vue'
const ManageReport = resolve => require.ensure([], () => resolve(require('../view/cityManagerAnaliysis/allData/manageReport.vue')), 'manageReport')
//import managerData from '../view/cityManagerAnaliysis/manageData/index.vue'
const ManagerData = resolve => require.ensure([], () => resolve(require('../view/cityManagerAnaliysis/manageData/index.vue')), 'managerData')

let staticRoutes = [
    {
        path: '/',
        component: Index,
        children:[
            {
                path:'/index/orderAllData',
                component: OrderAllData,
                name:'订单整体数据',
                auth: 21
            },
            {
                path:'/index/dateAndArea',
                component: DateAndArea,
                name:'订单分日期分地区',
                auth: 22
            },
            {
                path:'/index/orderStatus',
                component: OrderStatus,
                name:'订单状态构成',
                auth: 23
            },
            {
                path:'/index/orderAllDayMap',
                component: OrderAllDayMap,
                name:'24小时趋势',
                auth: 24
            },
            {
                path:'/index/orderTime',
                component: OrderTime,
                name:'订单时长分布',
                auth: 25
            },
            {
                path:'/index/orderMileage',
                component: OrderMileage,
                name:'订单里程分布',
                auth: 26
            },
            {
                path:'/index/orderRate',
                component: OrderRate,
                name:'使用频次分布',
                auth: 27
            },
            {
                path:'/index/userAllData',
                component: UserAllData,
                name:'用户整体数据',
                auth: 31
            },
            {
                path:'/index/userDateAndArea',
                component: UserDateAndArea,
                name:'用户分地区分地区',
                auth: 32
            },
            {
                path:'/index/newUser',
                component: NewUser,
                name:'新用户',
                auth: 32
            },
            {
                path:'/index/activeUser',
                component: ActiveUser,
                name:'活跃用户',
                auth: 33
            },
            {
                path:'/index/userKeep',
                component: UserKeep,
                name:'用户留存',
                auth: 34
            },
            {
                path:'/index/memberCenter',
                component: MemberCenter,
                name:'个人中心',
                auth: 70
            },
            {
                path:'/index/accountManager',
                component: AccountManager,
                name:'账号管理',
                auth: 80
            },
            {
                path:'/index/roleManager',
                component: RoleManager,
                name: '角色管理',
                auth: 90
            },
            {
                path:'/index/cityManagerAnalysis',
                component: CityManagerAnalysis,
                name:'城市经营分析',
                auth: 101
            },
            {
                path: '/index/managerData',
                component: ManagerData,
                name:'管理数据',
                auth: 102
            }
        ]
    },
    {
        path:'/index/cityManagerAnalysis/month/:month',
        component: CityManagerAnalysisByMonth,
        name:'经营分析明细'
    },
    {
        path:'/index/orderAllData/detail/:id',
        component: OrderAllDataDetail,
        name:'订单整体数据地区详情'
    },
    {
        path:'/index/orderAllData/manageReport/:id',
        component: ManageReport,
        name:'城市月经营统计'
    },
    {
        path:'/index/userAlldata/detail/:id',
        component: UserAllDataDetail,
        name:'用户整体数据地区详情'
    },
    {
        path:'/index/newUserDetail/detail/:id',
        component: NewUserDetail,
        name:'新用户数据地区详情'
    },
    {
        path:'/index/activeUserDetail/detail/:id',
        component: ActiveUserDetail,
        name: '活跃用户详情'
    }
]

export default staticRoutes;
