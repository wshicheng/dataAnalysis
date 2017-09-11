<template>
  <Row class="pretend">
      <Row class="citySelect">
          <!-- <ul>
              <li class="active">全部地区</li>
              <li v-bind:key="cityItem.id" v-for="cityItem of cityLists">{{cityItem.city}}</li>
          </ul> -->
        <city-select></city-select>
      </Row>
      <Row class="cityBindTable">
          <ul>
              <li class="total" v-show="totalMoneyTbale">
                  <h3>合计</h3>
                  <div class="total">
                      <table>
                          <thead>
                            <tr>
                                <th>假设实收率</th>
                                <th>盈亏状态</th>
                                <th>盈亏率</th>
                            </tr>
                          </thead>
                          <tbody>
                              <tr :key="item.actualYield" v-for="item of items">
                                  <td>{{item.actualactualYield}}</td>
                                  <td>{{item.profitLossStatus}}</td>
                                  <td>
                                      <div class="progress">
                                        <div class="progress-outer">
                                            <span class="progress-text">{{item.profitAndLossLv}}</span>  
                                            <div class="progress-inner">
                                                <div :class="{'progress-bg':common }" percent="0%">
                                                </div>
                                            </div>
                                        </div> 
                                      </div> 
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </li>
              <li class="cityBind" v-bind:key="list.city" v-for="list of allCityTables">
                  <h3>{{list.city}}</h3>
                  <div class="total">
                      <table>
                          <thead>
                            <tr>
                                <th>假设实收率</th>
                                <th>盈亏状态</th>
                                <th>盈亏率</th>
                            </tr>
                          </thead>
                          <tbody>
                              <tr :key="item.id" v-for="item of list.tableItem">
                                  <td>{{item.actualYield}}</td>
                                  <td>{{item.profitLossStatus}}</td>
                                  <td>
                                      <div class="progress">
                                        <div class="progress-outer">
                                            <span class="progress-text">{{item.profitAndLossLv}}</span>  
                                            <div class="progress-inner">
                                                <div  :class="{'progress-bg':common}" :percent="item.profitAndLossLv">
                                                </div>
                                            </div>
                                        </div> 
                                      </div> 
                                  </td>
                              </tr>
                              <!-- <tr>
                                  <td>{{list.actualYield}}</td>
                                  <td>{{list.profitLossStatus}}</td>
                                  <td>
                                      <div class="progress">
                                        <div class="progress-outer">
                                            <span class="progress-text">{{list.profitAndLossLv}}</span>  
                                            <div class="progress-inner">
                                                <div  :class="{'progress-bg':common}" :percent="list.profitAndLossLv">
                                                </div>
                                            </div>
                                        </div> 
                                      </div> 
                                  </td>
                              </tr>                                 -->
                          </tbody>
                      </table>
                  </div>
              </li>
          </ul>
      </Row>
  </Row>
</template>
<script>
import $ from 'jquery'
import { mapGetters } from 'vuex'
import citySelect from './citySelect.vue'
    export default {
        components: {
            "city-select": citySelect
        },
        data(){
          
            return {
                cityLists:this.cityList,
                // items:this.mockTableDatas2(),
                items:[],
                // allCityTables:this.mockTableDatas3(),
                allCityTables: [],
                common:true,
                isWin:true,
                totalMoneyTbale: false
            }
        },
        computed:{
            ...mapGetters(['dataMonth','cityList'])
        },
        mounted(){
              setTimeout(()=>{
                  this.mountedWay()
              },1000)
             // this.mountedWay()
        },
        methods:{
            // mockTableDatas(){
            //     var _this = this
            //     this.axios.get('/beefly/user/api/v1/city', {
            //         params: {
            //             accessToken: window.localStorage.getItem('token')
            //         }
            //     })
            //     .then(function (res) {
            //         var arr = res.data.data
            //     })
            //     .catch(function (err) {
            //         console.log('err', err)
            //     });
            // },
            mockTableDatas2(){
                var arr = []
                for(let i=0;i<5;i++){
                    arr.push(
                        {
                            id: i,
                            actualYield:Math.floor(Math.random()*100) + '%',
                            profitLossStatus:Math.floor(Math.random()*100-8)>2?'赢':'亏',
                            profitAndLossLv:Math.floor(Math.random()*100) + '%',
                        }
                    )
                    
                }
                var res = arr.map((item)=>{
                        if(item.profitLossStatus==='赢'){
                            item.isWin = true
                        }else{
                            item.isWin = false
                        }
                        return Object.assign({},item,{isWin:item.isWin})
                    })
                return  res;
            },
            mockTableDatas3(data){
                var arr = []
                console.log('bBBB')
                data.map( (item) => {
                    var temp = item
                    console.log(item)
                    arr.push(
                        {
                            tableItem:temp,
                            city: temp[0].city
                        }
                    )
                })
                return arr
            },
            changeWidth(){
                var $proress = $('.progress-bg');
               var res =  Array.prototype.slice.call($proress)
               res.forEach(function(item,index){
                   var $percent = $(item).attr('percent')
                    console.log($percent)
                    $(item).css({
                        width:$percent,
                    })
                   if($percent!=='100%'){
                       $(item).parent().prev().css({
                           color:'#000'
                       })
                   }else{
                       $(item).parent().prev().css({
                           color:'#fff'
                       })
                   }
               })
            },
             changePage() {
                   // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
                   var that =  this
                   setTimeout(function() {
                       console.log(that.dataMonth)
                       that.axios('/beefly/monthDataDetail/api/v1/monthDataDetail', {
                           params: {
                               dataMonth: that.dataMonth,
                               accessToken: that.$store.state.token,
                               type: 5,
                               cityCode:that.$store.state.cityList.length===0?'':that.$store.state.cityList.join(',')
                           }
                           }).then((response) => {
                               var data = response.data.data
                            //    for (var i = 0; i < data.length; i++) {
                            //        if (i <= data.length - 1) {
                            //            arr.push(
                            //                 {
                            //                    city: data[i].city,
                            //                    singleProduce: {
                            //                        outPutBilling: data[i].outPutBilling,//单车产出-计费
                            //                        outPutReality: data[i].outPutReality,//单车产出-实收
                            //                    },
                            //                    singleCost: {
                            //                        oBikeCost: data[i].oBikeCost,//单车成本
                            //                    },
                            //                    singleProfit: {
                            //                        inPutBilling: data[i].inPutBilling,//单车盈收-计费
                            //                        inPutReality: data[i].inPutReality,//单车盈收-实收
                            //                    },
                            //                    singleProfitRate: {
                            //                        inPutBillingLv: data[i].inPutBillingLv,//单车盈收率-计费
                            //                        inPutRealityLv: data[i].inPutRealityLv,//单车盈收率-实收
                            //                    }
                            //                }
                            //            )
                            //        }
                            //    }
                                // that.items = data[0]
                                // data.shift()
                                // var newData = that.mockTableDatas3(data)
                                // that.allCityTables = newData
                            if (that.$store.state.cityList.length > 1) {
                                this.totalMoneyTbale = true
                                that.items = data[0]
                                data.shift()
                                var newData = that.mockTableDatas3(data)
                                that.allCityTables = newData
                                
                                // data.shift()
                                // var newData = that.mockTableDatas3(data)
                                // that.allCityTables = newData
                            } else {
                                this.totalMoneyTbale = false
                                console.log(data)
                                console.log(that.mockTableDatas3(data))
                                that.items = that.mockTableDatas3(data)
                                // that.items = data[0]
                                // data.shift()
                                // var newData = that.mockTableDatas3(data)
                                // that.allCityTables = newData
                                // var newData = that.mockTableDatas3(data)
                                // that.allCityTables = newData
                            }

                           }).catch((error) => {
                               console.log(error)
                           })
                       }, 200)
               },
             mountedWay() {
                   // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
                   var that =  this
                   setTimeout(function() {
                       console.log(that.dataMonth)
                       that.axios('/beefly/monthDataDetail/api/v1/monthDataDetail', {
                           params: {
                               dataMonth: that.dataMonth,
                               accessToken: that.$store.state.token,
                               type: 5,
                               cityCode:that.$store.state.cityList.length===0?'':that.$store.state.cityList.join(',')
                           }
                           }).then((response) => {
                               var data = response.data.data
                            //    for (var i = 0; i < data.length; i++) {
                            //        if (i <= data.length - 1) {
                            //            arr.push(
                            //                 {
                            //                    city: data[i].city,
                            //                    singleProduce: {
                            //                        outPutBilling: data[i].outPutBilling,//单车产出-计费
                            //                        outPutReality: data[i].outPutReality,//单车产出-实收
                            //                    },
                            //                    singleCost: {
                            //                        oBikeCost: data[i].oBikeCost,//单车成本
                            //                    },
                            //                    singleProfit: {
                            //                        inPutBilling: data[i].inPutBilling,//单车盈收-计费
                            //                        inPutReality: data[i].inPutReality,//单车盈收-实收
                            //                    },
                            //                    singleProfitRate: {
                            //                        inPutBillingLv: data[i].inPutBillingLv,//单车盈收率-计费
                            //                        inPutRealityLv: data[i].inPutRealityLv,//单车盈收率-实收
                            //                    }
                            //                }
                            //            )
                            //        }
                            //    }
                                //合计
                                this.totalMoneyTbale = true
                                console.log('jjjjj', data)
                                that.items = data[0]
                                data.shift()
                                console.log(data)
                                var newData = that.mockTableDatas3(data)
                                that.allCityTables = newData

                           }).catch((error) => {
                               console.log(error)
                           })
                       }, 200)
               }
        },
        watch: {
            'dataMonth': {
                handler: function(val) {
                    this.changePage()
                },
                deep: true
            },
            '$store.state.cityList': 'changePage'
        }
    }
</script>
<style lang="scss" type="text/css" scoped>
    .citySelect{
        padding:16px 16px 0 16px;
        background:#f3f3f5;
        ul{
            min-width:1200px;margin:0 auto;
            li{border-radius:3px;width:60px;height:35px;line-height:35px;text-align:center;margin-right:16px;margin-bottom:16px;float:left;list-style-type: none;border:1px solid #19be6b;}
            li.active{background:#19be6b;color:#fff;}
        }
    }
    .cityBindTable{
        min-width:1200px;
        margin:16px auto 0;
        padding: 0 16px 0 16px;
        ul{
            width:100%;margin:0 auto;overflow: hidden;
            background:#fbfbfb;
            li{ float:left;
                margin:0 16px 16px 0px;
                width:calc((100% - 16px - 32px)/3);
                box-sizing: border-box;
                h3{margin-bottom:16px;}
                div{
                    table{border-collapse: collapse;width:100%;
                        tr{
                            th{background-color:#f8f8f9;border:1px solid #e9eaec;text-align: center;line-height:30px;}
                            td{border:1px solid #e9eaec;text-align: center;line-height: 35px;}
                        }
                    }
                    .progress{width:100%;height:100%;
                        .progress-outer{
                            position:relative;
                            .progress-text{
                                position: absolute;
                                right:5px;
                                bottom:0;
                                top:50%;
                                margin-top:-15px;
                                color:#fff;
                                z-index:3;
                            }
                            .progress-inner{
                                width:100%;
                                background:#f3f3f3;
                                .progress-bg{
                                    height: 30px;
                                    width:100%;
                                    background:#19be6b;
                                    position: relative;
                                }
                                .progress-bg.active{
                                    height: 30px;
                                    width:100%;
                                    background:#b91010;
                                    position: relative;
                                }
                            }
                        }
                    }
                   
                }
            }
        }
    }
</style>
