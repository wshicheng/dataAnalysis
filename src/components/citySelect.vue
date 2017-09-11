<template>
    <div class="citySelect_area" style="margin-bottom: 5px;">
        <span>城市:</span>
        <div class="citySelect_area_span" >
            <span class="active" @click="areaClick">全部地区</span>
            <span @click="areaClick" v-bind:key="item.name" v-for="item in cityList" :myId='item.code'>{{item.name}}</span>
        </div>
    </div>
</template>
<style lang='scss' scoped type="text/css">
.citySelect_area span {
    width: 80px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    font-size: 14px;
    display: inline-block;
    border: 1px solid #dddee1;
    border-radius: 4px;
    text-align: center;
    margin: 0 5px 10px 5px;
}
.citySelect_area span:nth-of-type(1) {
    border: none;
    margin: 0;
    float: left;
    text-align: left;
    width: 40px;
    padding: 0;
}
// .citySelect_area span:nth-of-type(1):active {
//     color: #f60;
// }
.citySelect_area div.citySelect_area_span span:nth-of-type(1) {
    width: 80px;
    margin-left: 5px;
    border: 1px solid #dddee1;
    margin-right: 9px;
    text-align: center;
    padding: 0 3px 0 3px;
}
.citySelect_area div.citySelect_area_span {
    span.active {
        background: #fff;
        color: orange;
        border: 1px solid orange;
        transition: all .1s linear 0s;
    }
}
.citySelect_area div {
   max-width: 90%;

    display: inline-block;
}
</style>
<script>
import $ from 'jquery'
import {siblings} from '../util/util.js'
export default {
    data () {
        return {
            cityList: [],
            citySelect: []
        }
    },
    methods: {
        areaClick (e) {
            var that = this
            var id = e.target.getAttribute('myid')
            console.log(id)
            var res = siblings(e.target)
            if(e.target.innerText==='全部地区'){
                e.target.setAttribute('class','active')
                // 点击全部地区，讲选择数组清空，监听到citySelect改变，从而启动vuex的setCityList方法
                this.citySelect = []
                for(var i=0;i<res.length;i++){
                    res[i].setAttribute('class','')
                }
            }else{
                var id = e.target.getAttribute('myid')
                if(this.citySelect.indexOf(id)===-1){
                    this.citySelect.push(id)
                    console.log(this.citySelect)
                }else{
                    var index = this.citySelect.indexOf(id)
                    this.citySelect.splice(index,1)
                    console.log(this.citySelect)
                }
                
                if(e.target.getAttribute('class')){
                    e.target.setAttribute('class','')
                }else{
                    e.target.setAttribute('class','active')
                }
                // e.target.setAttribute('class','active') 
                for(var i=0;i<siblings(e.target).length;i++){
                    siblings(e.target)[0].setAttribute('class','')
                }
            }
        },  
        citySelectChange () {
            this.$store.dispatch('setCityList', this.citySelect)
        }
    },
    mounted () {
        var _this = this
        console.log('citySelect this.$store.state.token' + this.$store.state.token)
        this.axios.get('/beefly/user/api/v1/city', {
            params: {
                accessToken: this.$store.state.token
            }
        })
        .then(function (res) {
            _this.cityList = res.data.data
            _this.$store.dispatch('keepCitys', res.data.data)

        })
        .catch(function (err) {
            console.log('err', err)
        });
    },
    watch: {
        'citySelect': 'citySelectChange'
    }
}
</script>

