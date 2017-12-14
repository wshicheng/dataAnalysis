<template>
    <div  class="citySelect_area" style="margin-bottom: 5px;" v-show="singleCityShow">
        <span class="city">城市:</span>
        <div class="citySelect_area_span" >
            <span ref="allCity" class="active allCity" @click="areaClick" v-show="allCityHide">全部地区</span>
            <span class="active" @click="areaClick" v-bind:key="item.name" v-for="item in cityList" :myId='item.code'>{{item.name}}</span>
            <i type="error" v-show="cityAuth" style="font-style:normal; margin-left: 6px;">对不起，没有城市访问权限，请联系管理员</i>
        </div>
    </div>
</template>
<style lang='scss' scoped type="text/css">
.citySelect_area{line-height:30px;}
.citySelect_area span {
    width: 80px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    font-size: 13px;
    display: inline-block;
    border: 1px solid #dddee1;
    border-radius: 4px;
    text-align: center;
    margin: 0 8px 10px 5px;
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
//    max-width: 90%;
    max-width: 95%;
    display: inline-block;
}
</style>
<script>
import {siblings} from '../util/util.js'
export default {
    data () {
        return {
            cityAuth:false,
            cityList: [],
            citySelect: [],
            allCityHide: false,
            singleCityShow: true
        }
    },
    mounted () {
        var _this = this
        this.axios.get('/beefly/user/api/v1/city', {
            params: {
                accessToken: this.$store.state.token
            }
        })
        .then(function (res) {
            _this.cityList = res.data.data||[]
            _this.$store.dispatch('keepCitys', res.data.data)
            //_this.$store.dispatch('setCityList',  res.data.data.map((item)=>{return item.code}))
            _this.citySelect = res.data.data.map((item)=>{return item.code})
            if(res.data.data.length===0){
                _this.cityAuth = true
            }else{
                _this.cityAuth = false
            }
            if (res.data.data.length >1) {
                _this.allCityHide = true
                // _this.singleCityShow = true
            } else {
                _this.allCityHide = false
                // _this.singleCityShow = false
                // setTimeout( function () {
                //     $('.citySelect_area_span span')[0].setAttribute('active')
                // }, 10)        
            }
        })
        .catch(function (err) {
            console.log('err', err)
        });
    },
    methods: {
        areaClick (e) {
           
            var that = this
            var id = e.target.getAttribute('myid')
            var res = siblings(e.target)
            if(e.target.innerText==='全部地区'){
                if(e.target.getAttribute('class') == 'active'){
                    e.target.setAttribute('class','');
                     for(var i=0;i<siblings(e.target).length-1;i++){
                        siblings(e.target)[i].setAttribute('class','')
                        this.citySelect = []
                        //this.citySelect.push( siblings(e.target)[i].getAttribute('myid'))
                    }
                }else{
                     e.target.setAttribute('class','active')
                    // 点击全部地区，讲选择数组清空，监听到citySelect改变，从而启动vuex的setCityList方法
                     // this.citySelect = []
                    this.citySelect = []
                    for(var i=0;i<siblings(e.target).length-1;i++){
                        siblings(e.target)[i].setAttribute('class','active')
                         this.citySelect.push( siblings(e.target)[i].getAttribute('myid'))
                    }
                }
               
            }else{
                if(e.target.getAttribute('class')=='active'){
                     e.target.setAttribute('class','');
                     var index= this.citySelect.indexOf(e.target.getAttribute('myid'))
                     this.citySelect.splice(index,1)
                     this.$refs.allCity.setAttribute('class','')
                }else{
                     e.target.setAttribute('class','active');
                     this.citySelect.push(e.target.getAttribute('myid'))
                }
                // var id = e.target.getAttribute('myid')
                // if(this.citySelect.indexOf(id)===-1){
                //     this.citySelect.push(id)
                // }else{
                //     var index = this.citySelect.indexOf(id)
                //     this.citySelect.splice(index,1)
                // }
                
                // if(e.target.getAttribute('class')){
                //     e.target.setAttribute('class','')
                // }else{
                //     e.target.setAttribute('class','active')
                // }
                // // e.target.setAttribute('class','active') 
                // for(var i=0;i<siblings(e.target).length;i++){
                //     siblings(e.target)[0].setAttribute('class','')
                // }
            }
        },  
        citySelectChange () {
            if(this.citySelect.length==this.cityList.length){
                this.$refs.allCity.setAttribute('class','active')
            }
            this.$store.dispatch('setCityList', this.citySelect)
          
        }
    },
    watch: {
        'citySelect': 'citySelectChange'
    }
}
</script>

