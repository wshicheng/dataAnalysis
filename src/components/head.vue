<template>
    <div class="header">
        <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo">蜜蜂出行数据运营平台

            </div>
            <div class="cityList">
                <!-- <span class="cityList">{{city}}</span> -->
                <span class="cityList">全部地区</span>
            </div>
            <div class="layout-logoInfo">
                <i class="iconfont icon-zhanghao1"></i>
                <!-- <i class="icon iconfont icon-touxiang" style="color: #fff; font-size: 50px;"></i> -->
                <span class="accountUserName">{{userInfo.name}}</span>
                <i class="iconfont icon-zhuxiao_logout exit" @click="handleLoginOut"></i>
            </div>
        </Menu>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            cityList: [
                { "code": "110100", "id": 1, "name": "北京市" },
                { "code": "120100", "id": 12, "name": "天津市" },
                { "code": "130200", "id": 40, "name": "唐山市" },
                { "code": "340225", "id": 2, "name": "无为县" }
            ]

        }
    },
    methods: {
        handleLoginOut() {
            this.$router.push('/login')
            this.removeToken()
            window.sessionStorage.removeItem('token')
            window.sessionStorage.removeItem('userInfo')
        },
        ...mapActions(['removeToken'])
    },
    computed: {
        ...mapGetters(['userInfo']),
        city: function() {
            return this.userInfo.cityList.map((item) => { return item.name }).join('、')
        }
    }
}
</script>
<style lang="scss" scoped type="text/css">
.layout-logo {
    height: 30px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
    color: #fff;
    font-size: 20px;
    line-height: 30px;
}

.layout-nav {
    width: 420px;
    margin: 0 auto;
}

.ivu-menu-dark {
    background: rgb(121, 121, 121);
}

.layout-logoInfo {
    float: right;
    height: 60px;
}

i.icon-zhanghao1 {
    color: #fff;
    font-size: 34px;
    vertical-align: middle
}

span.accountUserName {
    color: #fff;
    font-size: 16px;
}

i.icon-zhuxiao_logout {
    margin-left: 20px;
    color: #fff;
    font-size: 16px;
    margin-right: 20px;
}

.exit {
    cursor: pointer;
    display: inline-block;
    width: 20px;
    height: 20px;
}

.exit:hover {
    transition: all .2s linear 0s;
    color: #444;
}

div.cityList {
    display: inline-block;

    position: relative;
    left: 50px;
    height: 30px;
    line-height: 30px;
    top: 12px;
    color: #fff;
}

span.cityList {
    font-size: 15px;
    white-space: nowrap;
    overflow: hidden;
    width: 208px;
    display: inline-block;
    text-overflow: ellipsis;
    position: absolute;
    left: 0;
    top: 0;
}

span.cityList:hover {
    cursor:pointer;
    text-overflow: inherit;
    overflow: visible;
}
</style>
