<template>
    <div class="header">
        <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo">蜜蜂出行数据运营平台</div>
            <div class="layout-logoInfo">
                <i class="iconfont icon-zhanghao1"></i>
                <span class="accountUserName">{{userInfo.name}}</span>
                <i class="iconfont icon-zhuxiao_logout exit" @click="handleLoginOut"></i>
            </div>
        </Menu>
    </div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'
    export default {
        methods:{
            handleLoginOut(){
                this.$router.push('/login')
                this.removeToken()
                window.sessionStorage.removeItem('token')
                window.sessionStorage.removeItem('userInfo')
            },
            ...mapActions(['removeToken'])
        },
        computed:{
            ...mapGetters(['userInfo'])
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
    font-size:20px;
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

</style>
