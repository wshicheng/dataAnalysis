<template>
    <!--单车日营收-->
    <div id="singleBikeIncoming"> 
      <div class="fiexedAssets">
          <Spin v-show="spinShow" fix>
                  <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                  <div style="color:rgb(204, 204, 204);">Loading</div>
              </Spin>
            <div class="nodata" v-show="isNoData2">
              <i class="iconfont icon-zanwushuju"></i>
          </div>
           <div v-show="isNoData" class="table" id="singleBike" v-scroll="onScroll" >
                <div class="dataScroll">
                    <div class="fixedHeader">
                        <dl>
                            <dt class="fixedCorner" colspan="1">
                                <div class="cityName">
                                    <div>城市</div>
                                    <div>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </dt>
                            <dd>
                                <ul>
                                    <li class="bee">
                                        <div class="cityName">
                                            <div>
                                                   单车产出
                                            </div>
                                            <div>
                                                <span>计费</span>
                                                <span>实收</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="battery">
                                        <div class="cityName">
                                            <div>
                                                   单车成本
                                            </div>
                                        </div>
                                    </li>
                                    <li class="ChargingStation">
                                        <div class="cityName">
                                            <div>
                                                   单车营收
                                            </div>
                                            <div>
                                                <span>计费</span>
                                                <span>实收</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="Tricycle">
                                        <div class="cityName">
                                            <div>
                                                   单车营收率
                                            </div>
                                            <div>
                                                 <span>计费</span>
                                                <span>实收</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </dd>
                        </dl> 
                    </div>
                    <div class="fixedBody">
                        <dl @mouseenter="enter" @mouseleave="leave" v-for="(item,index) of data7" v-bind:key="index">
                            <dt>
                                <div class="cityName leftTitle">
                                    <div>{{item.cityName}}</div>
                                    <div>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </dt>
  
                            <dd >
                                 <ul>
                                    <li class="bee">
                                        <div class="cityName">
                                           
                                            <div>
                                                <span>{{item.singleProduce.outPutBilling}}</span>
                                                <span>{{item.singleProduce.outPutReality}}</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="battery">
                                        <div class="cityName">
                                            <div>
                                                   {{item.singleCost.oBikeCost}}
                                            </div>
                                        </div>
                                    </li>
                                    <li class="ChargingStation">
                                        <div class="cityName">
                                           
                                            <div>
                                                <span>{{item.singleProfit.inPutBilling}}</span>
                                                <span>{{item.singleProfit.inPutReality}}</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="Tricycle">
                                        <div class="cityName">
                                           
                                            <div>
                                                 <span>{{item.singleProfitRate.inPutBillingLv}}</span>
                                                <span>{{item.singleProfitRate.inPutRealityLv}}</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>        
      </div>
    </div>
   </template>
   <script>
   import { mapGetters } from 'vuex'
       export default {
           data () {
               return {
                 spinShow:true,
                   isNoData:false,
                   isNoData2:true,
                   data7:[]
               }
           },
           computed:{
               ...mapGetters(['dataMonth','analysisType'])
           },
           methods:{
              enter(e){
           e.target.style.backgroundColor = "#ebf7ff"
           e.target.children[0].style.backgroundColor = "#ebf7ff"
           e.target.children[1].style.backgroundColor = "#ebf7ff"
        //    e.target.style.color = "#fff"
        //    e.target.children[0].style.color="#fff";
        //    e.target.children[1].style.color="#fff";
        },
        leave(e){
            e.target.style.backgroundColor = "#fff"
            e.target.children[0].style.backgroundColor = "#fff"
            e.target.children[1].style.backgroundColor = "#fff"
            e.target.style.color = "#495060"
            e.target.children[0].style.color="#495060";
            e.target.children[1].style.color="#495060";
        },
        fx(){
                var liW = $('#singleBike div.fixedHeader ul li').outerWidth()
                var len = $('#singleBike div.fixedHeader dd ul li').length
                var bodyliW = $('#singleBike div.fixedHeader ul li').outerWidth()
                var bodylen = $('#singleBike div.fixedHeader dd ul li').length
                var dtW = $('#singleBike div.fixedBody dl dt').outerWidth()
                var availHeight = document.documentElement.clientHeight||document.body.clientHeight ;
                var h1 = $('.ivu-tabs-bar').outerHeight()
                var h2 = $('.monthSelect').outerHeight()
                var h3 = $('.title').outerHeight()
                $('#singleBike').height(availHeight - h1 - h2 -h3 - 50)
            $('#singleBike div.fixedHeader dd ul').width(len*liW - 4)
            $('#singleBike div.fixedBody dd ul').width(bodylen*bodyliW)
            $('#singleBike div.fixedBody').width(bodylen*bodyliW + dtW )
        },
        onScroll(e,position){
            // $('.scrollable-rows-table').stop(true).animate({marginTop:-position.scrollTop - 3},30)
            //$('.scrollable-rows-table').css({marginTop:-position.scrollTop  + 'px'})
                //$('.scrollable-columns-table').css({marginLeft:-position.scrollLeft  + 'px'})
            //$('.scrollable-columns-table').stop(true).animate({marginLeft:-position.scrollLeft - 3},30)
            $('#singleBike div.fixedHeader dl dt').css({
                left : position.scrollLeft + 'px'
            })
                $('#singleBike div.fixedHeader dl dt.fixedTotal').css({
                left : (159 +  position.scrollLeft) + 'px'
            })
                $('#singleBike div.fixedBody dl dt').css({
                left : position.scrollLeft + 'px'
            })
                $('#singleBike div.fixedBody dl dt.fixedTotal').css({
                left : (159 +  position.scrollLeft) + 'px'
            })
            $('#singleBike div.fixedHeader').css({
                top: position.scrollTop + 'px'
            })
        },
               mockTableData(){
                   let data = [];
                   for(let i=0;i<11;i++){
                       data.push(
                            {
                               cityName: '城市' + Math.floor(Math.random () * 100 + 1),
                               singleProduce:{
                                   outPutBilling:Math.floor(Math.random () * 3 + 1),//单车产出-计费
                                   outPutReality:Math.floor(Math.random () * 4 + 1),//单车产出-实收
                               },
                               singleCost:{
                                   oBikeCost:Math.floor(Math.random () * 5 + 1),//单车成本
                               },
                               singleProfit:{
                                   inPutBilling:Math.floor(Math.random () * 5 + 1),//单车盈收-计费
                                   inPutReality:Math.floor(Math.random () * 6 + 1),//单车盈收-实收
                               },
                               singleProfitRate:{
                                   inPutBillingLv:Math.floor(Math.random () * 7 + 1),//单车盈收率-计费
                                   inPutRealityLv:Math.floor(Math.random () * 8 + 1),//单车盈收率-实收
                               }
                           }
                       )
                   }
                   return data
               },
               changePage() {
                 this.spinShow = true
                   // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
                   var that =  this
                   setTimeout(function() {
                       that.axios('/beefly/monthDataDetail/api/v1/monthDataDetail', {
                           params: {
                               dataMonth: that.dataMonth,
                               accessToken: that.$store.state.token,
                               type: 4
                           }
                           }).then((response) => {
                                that.spinShow = false
                               var data = response.data.data||[]
                                var initData = [...data]
                                var lastObj = data.pop()
                                 if(lastObj==undefined){
                                    that.isNoData = false
                                    that.isNoData2 = true
                                   
                                    return;
                                }
                                var obj = Object.assign({},lastObj,{cityName:'合计'})
                                data.push(obj)
                               var message = response.data.message
                                if(message === '用户登录超时'){
                                    that.$router.push({path:'/login'})
                                }
                               var arr = [];
                                if(data.length>0){
                                    that.isNoData2 = false
                                    that.isNoData = true
                                }else{
                                    that.isNoData2 = true
                                    that.isNoData = false
                                     
                                }
                               for (var i = 0; i < data.length; i++) {
                                    arr.push(
                                            {
                                               cityName: data[i].cityName,
                                               singleProduce: {
                                                   outPutBilling: data[i].outPutBilling,//单车产出-计费
                                                   outPutReality: data[i].outPutReality,//单车产出-实收
                                               },
                                               singleCost: {
                                                   oBikeCost: data[i].oBikeCost,//单车成本
                                               },
                                               singleProfit: {
                                                   inPutBilling: data[i].inPutBilling,//单车盈收-计费
                                                   inPutReality: data[i].inPutReality,//单车盈收-实收
                                               },
                                               singleProfitRate: {
                                                   inPutBillingLv: data[i].inPutBillingLv,//单车盈收率-计费
                                                   inPutRealityLv: data[i].inPutRealityLv,//单车盈收率-实收
                                               }
                                           }
                                       )
   
                               }
                               that.data7 = arr
                                setTimeout(()=>{
                                  that.fx()
                                },30)
                          
                           }).catch((error) => {
                               console.log(error)
                                 that.spinShow = false
                           })
                       }, 200)
               }
           },
           mounted(){
               this.fx()
                 var height = $(window).height()
                 //$('div.fiexedAssets').eq(3).height(height/2)
           },
           watch: {
              'dataMonth':{
                  handler:function(val){
                    this.isNoData2 = false
                    this.isNoData = false
                    this.spinShow = true
                  },
                  deep:true
              },
               'analysisType': {
                    handler: function(n,o) {
                        if(n==1){
                           this.changePage()
                       }else{
                         this.data7 = []
                           this.isNoData = false
                           this.isNoData2 = false
                           this.spinShow = true
                       }
                    },
                    deep: true
                }
           }
       }
   </script>
   <style lang="scss" scoped type="text/css">
   div.table{
    position: relative;
    width: calc(100% - 32px);
    margin: 16px auto;
    overflow: auto;
    height: 380px;
    padding-top: 38px;
}
div.fixedHeader{
    position: absolute;
    top:0;
    background:#fff;
    dl{
        background:#7eb5e0;
        padding-left:160px;
        dt{color:#495060;text-indent:5px;line-height:38px;z-index:33;width:160px;height:38px;position:absolute;left:0;border:1px solid#ddd;background:#fff;
            &:nth-child(2){
                left:159px;
            }
        }
        dd{color:#495060;
            ul{
                overflow:hidden;
                li{text-align:center;float:left;min-width:300px;border:1px solid #ddd;margin-left:-1px;
                    span{
                        display: inline-block;
                        text-align: center;
                        float: left;
                    }
                }
                 li.bee{
                     span{
                         width:calc(100% / 2)
                     }
                 }
                 li.battery{
                      height: 38px;
                      line-height:38px;
                     span{
                         width:calc(100% / 3) 
                     }
                 }
                 li.ChargingStation{
                     span{
                          width:calc(100% / 2) 
                     }
                 }
                 li.Tricycle{
                     span{
                          width:calc(100% / 2) 
                     }
                 }
                
                
            }
        }
    }
}
div.fixedBody{
    overflow:hidden;
    dl.incoming{background:#def3f3;}
    dl.incoming dt {background:#def3f3;}
    dl.cost{background:#def3f3;}
    dl.cost dt {background:#def3f3;}
    dl.profits{background:#def3f3;}
    dl.profits dt {background:#def3f3;}
    dl.car{background:#def3f3;}
    dl.car dt {background:#def3f3;}
    dl.user{background:#def3f3;}
    dl.user dt {background:#def3f3;}
    dl{
        transition:background-color linear .2s;
        transition:color linear .2s;
        padding-left:160px;
        dt{color:#495060;transition:background-color linear .2s;transition:color linear .2s;width:160px;line-height:38px;height:38px;line-height:38px;position:absolute;left:0;border:1px solid #ddd;border-top:none;background:#fff;text-indent: 5px;
            &:nth-child(2){
                left:159px;
            }
        }
        dd{color:#495060;
            ul{
                overflow:hidden;
                li{height:38px;line-height:38px;text-align:center;float:left;min-width:300px;border:1px solid #ddd;margin-left:-1px;border-top:none; 
                    span{
                        width:50%;
                        display: inline-block;
                        text-align: center;
                        float: left;
                        border-right: 1px solid #ddd;
                        box-sizing: border-box;
                        height: 38px;
                        &:nth-last-child(1){border-right:none;}
                    }
                   
                }
                li.bee{
                     span{
                         width:calc(100% / 2)
                     }
                 }
                 li.battery{
                      height: 38px;
                      line-height:38px;
                     span{
                         width:calc(100% / 3) 
                     }
                 }
                 li.ChargingStation{
                     span{
                          width:calc(100% / 2) 
                     }
                 }
                 li.Tricycle{
                     span{
                          width:calc(100% / 2) 
                     }
                 }
                
            }
        }
    }
}

   div.ivu-table-wrapper{margin:0 auto;}
   div.fiexedAssets {
    padding: 0 16px 16px 16px;
    box-sizing: border-box;
    position:relative;
    .demo-spin-icon-load{
        color:rgb(204, 204, 204);
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
}
div.nodata{text-align:center;}
div.nodata i{font-size:400px;color:#dedcdc;}
   </style>
   
   