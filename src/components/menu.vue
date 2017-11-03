<template>
    <div class="menu">
        <Menu v-on:on-select="handleRoute" class="siderBar" @on-open-change='openChange' :active-name='menuActiveName' id="ul" :theme="theme2" :open-names="openNames" :accordion='accord' width="auto">
        <!-- <Menu-item name="/">首页</Menu-item> -->
            <Submenu name="orderData" v-show="orderShow">
                <template slot="title">
                    <i class="iconfont icon-dingdan1"></i>
                    订单数据
                </template>
                <Menu-item name="/index/orderAllData" class="sign" auth='21'>整体数据</Menu-item>
                <Menu-item name="/index/dateAndArea" class="sign" auth='22'>分日期分地区</Menu-item>
                <Menu-item name="/index/orderStatus" class="sign" auth='23'>订单状态构成</Menu-item>
                <Menu-item name="/index/orderAllDayMap" class="sign" auth='24'>24小时趋势</Menu-item>
                <Menu-item name="/index/orderTime" class="sign" auth='25'>订单时长分布</Menu-item>
                <Menu-item name="/index/orderMileage" class="sign" auth='26'>订单里程分布</Menu-item>
                <Menu-item name="/index/orderRate" class="sign" auth='27'>使用频次分布</Menu-item>
            </Submenu>
            <Submenu name="userData">
                <template slot="title">
                    <Icon type="ios-people"></Icon>
                    用户数据
                </template>
                <Menu-item name="/index/userAllData">整体数据</Menu-item>
                <Menu-item name="/index/userDateAndArea">分日期分地区</Menu-item>
                <Menu-item name="/index/newUser">新用户</Menu-item>
                <Menu-item name="/index/activeUser">活跃用户</Menu-item>
                <Menu-item name="/index/userKeep">用户留存_日留存</Menu-item>
            </Submenu>
            <!-- <Submenu name="3">
                <template slot="title">
                    <Icon type="stats-bars"></Icon>
                    车辆数据
                </template>
                <Menu-item name="/index/bikeAllData">整体数据</Menu-item>
                <Menu-item name="4-2">车均产出</Menu-item>
                <Menu-item name="4-3">车辆数设置</Menu-item>
            </Submenu> -->
            <!-- <Submenu name="4">
                <template slot="title">
                    <Icon type="stats-bars"></Icon>
                    押金充值
                </template>
                <Menu-item name="4-1">整体数据</Menu-item>
                <Menu-item name="4-2">分日期分地区</Menu-item>
                <Menu-item name="4-3">押金变动</Menu-item>
                <Menu-item name="4-4">充值变动</Menu-item>
                <Menu-item name="4-5">充值金额分布</Menu-item>
                <Menu-group title="使用">
                    <Menu-item name="3-1">新增和启动</Menu-item>
                    <Menu-item name="3-2">活跃分析</Menu-item>
                    <Menu-item name="3-3">时段分析</Menu-item>
                </Menu-group>
            </Submenu> -->
            <!-- <Submenu name="5">
                <template slot="title">
                    <Icon type="stats-bars"></Icon>
                    优惠券
                </template>
                <Menu-item name="5-1">优惠券订单</Menu-item>
                <Menu-item name="5-2">优惠券发放</Menu-item>
                <Menu-item name="5-3">获取途径</Menu-item>
                <Menu-item name="5-4">使用情况</Menu-item>
                <Menu-item name="5-5">充值金额分布</Menu-item>
            </Submenu> -->
            <Menu-item name="/index/memberCenter" class="sign" auth='70'>
                <i class="iconfont icon-center contPostion"></i>
                个人中心
            </Menu-item>
            <Menu-item name="/index/accountManager" class="sign" auth='80'>
                <i class="iconfont icon-jiaoseguanli2 contPostion"></i>
                账号管理
            </Menu-item>
            <Menu-item name="/index/roleManager" class="sign" auth='90'>
                <i class="iconfont icon-jiaoseguanli contPostion"></i>
                角色管理
            </Menu-item>
            <Submenu name="9" v-show="cityShow">
                <template slot="title">
                   <i class="iconfont icon-icon3"></i>
                    城市经营分析
                </template>
                <Menu-item name="/index/cityManagerAnalysis" class="sign" auth='101'>整体数据</Menu-item>
                <Menu-item name="/index/managerData" class="sign" auth='102'>我管理的数据</Menu-item>
            </Submenu>
        </Menu>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
    data() {
        return {
            theme2: 'dark',
            menuActiveName: "",
            accord: true,
            openNames: [''],
            authList: [],
            // 权限展示相关
            orderShow: false,
            cityShow: false,
        }
    },
    mounted () {
        this.generateMenu()
        // this.openNames.push('orderData')
    },
    beforeMount () {
        //  window.sessionStorage.setItem('openNames', '')
        if (window.sessionStorage.getItem('openNames') === 'null') {
            return
        } else {
            var openId = window.sessionStorage.getItem('openNames')
            this.openNames.push(openId)
        }
    },
    methods: {
        handleRoute(name) {
            this.$router.push({ path: name })
        },
        changeMenuActiveName () {
            this.menuActiveName = this.$store.state.menuActiveName
        },
        openChange (name) {
            this.openNames = name
            window.sessionStorage.setItem('openNames', name)
        },
        generateMenu () {
            this.authList = window.sessionStorage.getItem('authList')
                var all  = $('.sign')
                if( this.authList.length === 0) {
                        $('.siderBar').hide()
                    }else{
                        for(var i =0;i < all.length; i++) {
                            var res = this.authList.indexOf(all[i].getAttribute('auth'))
                            if (res === -1) {
                                $('.sign').eq(i).hide()
                            }
                        } 
                }

                var delArr = this.authList.split(',')
                for (var i = 0; i < delArr.length; i++) {
                    if (Number(delArr[i]) < 30 && Number(delArr[i]) > 19) {
                        this.orderShow = true
                        break
                    } else {
                        this.orderShow = false
                    }
                }
                
                for (var i = 0; i < delArr.length; i++) {
                    if (Number(delArr[i]) < 109 && Number(delArr[i]) > 100) {
                        this.cityShow = true
                        break
                    } else {
                        this.cityShow = false
                    }
                }
                
        }
    },
    watch: {
        '$store.state.menuActiveName': 'changeMenuActiveName'
    }
}
</script>
<style lang="scss" type="text/css" scoped>
ul.ivu-menu.ivu-menu-dark.ivu-menu-vertical {
    min-width: 168px;
}

.contPostion {
    margin-left: -23px;
    font-weight: 600;
    margin-right: 4px;
}

.ivu-menu-dark {
    background: #404040;
}

.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened {
    background: #404040;
}

li.ivu-menu-item {
    text-indent: 21px;
    padding: 10px 24px;
}
</style>

