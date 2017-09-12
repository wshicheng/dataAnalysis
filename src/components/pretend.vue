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
              <li class="total" v-show="allCount">
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
                                  <td>{{item.actualYield}}</td>
                                  <td>{{item.profitLossStatus}}</td>
                                  <td>
                                      <div class="progress">
                                        <div class="progress-outer">
                                            <span class="progress-text">{{item.profitAndLossLv}}</span>  
                                            <div class="progress-inner">
                                                <div :class="{'progress-bg':common }" :percent="item.profitAndLossLv">
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
              <li class="cityBind" v-bind:key="index" v-for="(item,index) of allCityTables">
                  <h3>{{item[0].city}}</h3>
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
                              <tr :key="list.id" v-for="list of item">
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
                allCount:false,
                cityLists:this.cityList,
                allCityTables:[],
                items:[],
                common:true,
                isWin:true,
                totalMoneyTbale: false
            }
        },
        computed:{
            ...mapGetters(['dataMonth','cityList'])
        },
        updated(){
              setTimeout(()=>{
                  this.changeWidth()
              },500)
        },
        methods:{
            changeWidth(){
                var $proress = $('.progress-bg');
               var res =  Array.prototype.slice.call($proress)
               res.forEach(function(item,index){
                   var $percent = $(item).attr('percent')
                    $(item).css({
                        width:$percent,
                    })
                   if($percent=='100%'){
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
                       that.axios('/beefly/monthDataDetail/api/v1/monthDataDetail', {
                           params: {
                               dataMonth: that.dataMonth,
                               accessToken: that.$store.state.token,
                               type: 5,
                               cityCode:that.$store.state.cityList.length===0?'':that.$store.state.cityList.join(',')
                           }
                           }).then((response) => {
                               var data = response.data.data
                                 that.items = data[0]
                                 if(data.length>1){
                                      that.allCount = true
                                      that.items = data[0]
                                      data.splice(0,1)
                                      that.allCityTables = data.map(item => {
                                        return item.map(list => {
                                            if(list.actualYield.trim().length==0){
                                                return {}
                                            }else{
                                                return list
                                            }
                                        })
                                        
                                     })
                                     // that.allCityTables = data
                                 }else{
                                     that.allCount = false
                                      that.allCityTables = data.map(item => {
                                        return item.map(list => {
                                            if(list.actualYield.trim().length==0){
                                                return {}
                                            }else{
                                                return list
                                            }
                                        })
                                        
                                     })

                                 }

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
            '$store.state.cityList': {
                handler: function(){
                    this.changePage()
                },
                deep: true
            }
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
