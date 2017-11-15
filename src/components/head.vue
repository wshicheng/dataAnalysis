<template>
    <div class="header">
        <!-- <div v-show="cityList.length>3?true:false" class="cityShowHiden">
            <ul>
                <li v-bind:key="list.code" v-for="list of cityList">{{list.name}}</li>
            </ul>
        </div> -->
        <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo">蜜蜂出行数据运营平台

            </div>
            <Tooltip placement="bottom" v-if="cityList.length>3">
                <div class="cityList">
                    <span class="cityList">{{city}}
                    </span>
                    <!-- <span class="cityList">全部地区</span> -->
                </div>
                <div slot="content">
                    <div style="width: 200px; overflow: hidden;">
                        <ul>
                            <li style="float: left; margin: 5px 8px; width: 30px; " v-bind:key="list.code" v-for="list of cityList">{{list.name}}</li>
                        </ul>
                    </div>
                </div>
            </Tooltip>
            <div class="cityList" v-else>
                <span class="cityList">{{city}}
                </span>
                <!-- <span class="cityList">全部地区</span> -->
            </div>

            <div class="layout-logoInfo">
                <img class="headImg" v-if="headImg" :src="headImg" @click="$router.push('/index/memberCenter')">
                <i v-else class="icon iconfont icon-touxiang headIcon"></i>

                <!-- <i v-if="getHeadImg = false" class="iconfont icon-zhanghao1"></i> -->
                <!-- <i class="icon iconfont icon-touxiang" style="color: #fff; font-size: 50px;"></i> -->
                <span class="accountUserName">{{userInfo.name.length>0?userInfo.name:userInfo.userName}}</span>
                <i class="iconfont icon-zhuxiao_logout exit" @click="handleLoginOut"></i>
            </div>
        </Menu>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import $ from 'jquery'

export default {
    data() {
        setTimeout(function() {
            $('span.cityList').hover(function() {
                $('div.cityShowHiden').show(300)
            }, function() {
                $('div.cityShowHiden').hide()
            })
        }, 1000)
        return {
            cityList: [
            ],
            getHeadImg: false,
            headImg: ''
        }
    },
    mounted() {
        this.headImg = window.sessionStorage.getItem('headImg')
    },
    methods: {
        handleLoginOut() {
            this.$router.push('/login')
            this.removeToken()
            window.sessionStorage.removeItem('token')
            window.sessionStorage.removeItem('userInfo')
            window.sessionStorage.removeItem('openNames')
            window.sessionStorage.removeItem('authList')
            window.sessionStorage.removeItem('cityStr')
            window.sessionStorage.removeItem('cityType')
        },
        getImage() {
            if (this.$store.state.imageUrl === '') {
                this.headImg = window.sessionStorage.getItem('headImg')
            } else {
                this.headImg = this.$store.state.imageUrl
            }
        },
        ...mapActions(['removeToken'])
    },
    computed: {
        ...mapGetters(['userInfo']),
        // city: function() {
        //     this.cityList = this.userInfo.cityList
        //     window.localStorage.setItem('city', this.cityList[0].name)
        //     return this.userInfo.cityList.map((item) => { return item.name }).join('、')
        //     // return this.city = window.localStorage.getItem('cityStr')
        // }
        city: {
            get: function () {
                this.cityList = this.userInfo.cityList
                window.sessionStorage.setItem('city', this.cityList[0].name)
                if (window.sessionStorage.getItem('cityStr') != '全部地区' && window.sessionStorage.getItem('cityStr').length > 3) {
                    return this.userInfo.cityList.map((item) => { return item.name }).join('、')
                } else {
                    return this.city = window.sessionStorage.getItem('cityStr')
                } 
            },
            set: function () {
                return
            }
        }
    },
    watch: {
        '$store.state.imageUrl': 'getImage',
        '$route': {
            handler: function() {
                this.$store.dispatch('setCityList', [])
            },
            deep: true
        }
    }
}
</script>
<style lang="scss" scoped type="text/css">
img.headImg {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
    cursor: pointer;
    margin-top: 16px;
    float: left;
}

.headIcon {
    font-size: 38px;
    position: relative;
    color: #fff;
    left: -8px;
    top: 1px;
    float: left;
}

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
    font-size: 14px;
    float: left;
    margin-top: 0;
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
    width: 300px;
    left: 50px;
    height: 30px;
    line-height: 30px;
    top: 4px;
    color: #fff;
}

span.cityList {
    font-size: 13px;
    white-space: nowrap;
    width: 139px;
    cursor: pointer;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    position: absolute;
    top: 10px;
}

div.cityShowHiden ul {
    padding: 10px;
    padding-bottom: 0px;
}

div.cityShowHiden {
    cursor: pointer;
    width: 400px;
    height: auto;
    transition: all linear .2s;
    position: absolute;
    left: 241px;
    top: 59px;
    border: 1px solid #797979;
    z-index: 33;
    opacity: 1;
    display: none;
    background: rgba(121, 121, 121, .8);
}

div.cityShowHiden ul li {
    padding: 0 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    float: left;
    background: #495060;
    color: #f8f8f9;
    border-radius: 5px;
    font-size: 12px;
}

div.header {
    position: relative;
}
</style>
