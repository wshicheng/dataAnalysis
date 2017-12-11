<template>
 <!--运营成本-->
    <div id="operatCosts">
        <div class="fiexedAssets">
            <Spin v-show="spinShow" fix>
                    <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                    <div style="color:rgb(204, 204, 204);">Loading</div>
                </Spin>
            <div class="nodata" v-show="isNoData2">
                <i class="iconfont icon-zanwushuju"></i>
            </div>
             <div v-show="isNoData" class="table" id="operaterCosts" v-scroll="onScroll" >
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
                             <dt class="fixedCorner fixedTotal" colspan="1">
                                <div class="cityName">
                                    <div>合计</div>
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
                                                   硬件摊销（按照3年折旧） 
                                            </div>
                                            <div>
                                                <span>小蜜蜂</span>
                                                <span>电池</span>
                                                <span>电站</span>
                                                <span>机动车</span>
                                                <span>运维工具车</span>
                                                <span>物流</span>
                                                <span>其他</span>
                                                <span>小计</span>
                                                <span>成本占比</span> 
                                            </div>
                                        </div>
                                    </li>
                                    <li class="battery">
                                        <div class="cityName">
                                            <div>
                                                   硬件损耗(按照0.5%/月)
                                            </div>
                                            <div>
                                               <span>小蜜蜂</span>
                                                <span>电池</span>
                                                <span>电站</span>
                                                <span>机动车</span>
                                                <span>运维工具车</span>
                                                <span>其他</span>
                                                <span>小计</span>
                                                <span>成本占比</span> 
                                            </div>
                                        </div>
                                    </li>
                                    <li class="ChargingStation">
                                        <div class="cityName">
                                            <div>
                                                   运维费用
                                            </div>
                                            <div>
                                                <span>薪资福利</span>
                                                <span>其他人员成本</span>
                                                <span>房租（生产）</span>
                                                <span>水电（生产）</span>
                                                <span>其他生产成本</span>
                                                <span>其他经营费用</span>
                                                <span>开城费用</span>
                                                <span>小计</span>
                                                <span>成本占比</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </dd>
                        </dl> 
                    </div>
                    <div class="fixedBody">
                        <dl @mouseenter="enter" @mouseleave="leave" v-for="(item,index) of data4" v-bind:key="index">
                            <dt>
                                <div class="cityName leftTitle">
                                    <div>{{item.cityName}}</div>
                                    <div>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </dt>
                            <dt class="fixedTotal">
                                <div class="cityName leftTitle">
                                    <div>{{item.totalCost.total}}</div>
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
                                                <span>{{item.hardwareCost.bikeDepreciate}}</span>
                                                <span>{{item.hardwareCost.battDepreciate}}</span>
                                                <span>{{item.hardwareCost.chargeDepreciate}}</span>
                                                <span>{{item.hardwareCost.truckDepreciate}}</span>
                                                <span>{{item.hardwareCost.carDepreciate}}</span>
                                                <span>{{item.hardwareCost.transMoneyShare}}</span>
                                                <span>{{item.hardwareCost.otherDepreciate}}</span>
                                                <span>{{item.hardwareCost.totalDepreciate}}</span>
                                                <span>{{item.hardwareCost.depreProporte}}</span> 
                                            </div>
                                        </div>
                                    </li>
                                    <li class="battery">
                                        <div class="cityName">
                                           
                                            <div>
                                               <span>{{item.hardwareLoss.bikeWaste}}</span>
                                               <span>{{item.hardwareLoss.battWaste}}</span>
                                               <span>{{item.hardwareLoss.chargeWaste}}</span>
                                                <span>{{item.hardwareLoss.truckWaste}}</span>
                                                <span>{{item.hardwareLoss.carWaste}}</span>
                                                <span>{{item.hardwareLoss.otherWaste}}</span>
                                                <span>{{item.hardwareLoss.totalWaste}}</span>
                                                <span>{{item.hardwareLoss.wasteProporte}}</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="ChargingStation">
                                        <div class="cityName">
                                            
                                            <div>
                                                <span>{{item.expenses.salaryMoney}}</span>
                                                <span>{{item.expenses.personnelMoney}}</span>
                                                <span>{{item.expenses.rentMoney}}</span>
                                                <span>{{item.expenses.hydropower}}</span>
                                                <span>{{item.expenses.operationMoney}}</span>
                                                <span>{{item.expenses.manageMoney}}</span>
                                                <span>{{item.expenses.openMoney}}</span>
                                                <span>{{item.expenses.operateTotal}}</span>
                                                <span>{{item.expenses.operateProporte}}</span>
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
    data() {
        return {
            spinShow:false,
            isNoData:false,
            isNoData2:true,
            data4: []
        }
    },
    computed:{
        ...mapGetters(['dataMonth','analysisType'])
    },
    methods: {
         enter(e){
           e.target.style.backgroundColor = "#ebf7ff"
           e.target.children[0].style.backgroundColor = "#ebf7ff"
           e.target.children[1].style.backgroundColor = "#ebf7ff"
           e.target.children[2].style.backgroundColor = "#ebf7ff"
        //    e.target.style.color = "#fff"
        //    e.target.children[0].style.color="#fff";
        //    e.target.children[1].style.color="#fff";
        //    e.target.children[2].style.color="#fff";
        },
        leave(e){
            e.target.style.backgroundColor = "#fff"
            e.target.children[0].style.backgroundColor = "#fff"
            e.target.children[1].style.backgroundColor = "#fff"
             e.target.children[2].style.backgroundColor = "#fff"
            e.target.style.color = "#495060"
            e.target.children[0].style.color="#495060";
            e.target.children[1].style.color="#495060";
            e.target.children[2].style.color="#495060";
        },
        fx(){
                var liW = $('#operaterCosts div.fixedHeader ul li').outerWidth()
                var len = $('#operaterCosts div.fixedHeader dd ul li').length
                var bodyliW = $('#operaterCosts div.fixedHeader ul li').outerWidth()
                var bodylen = $('#operaterCosts div.fixedHeader dd ul li').length
                var dtW = $('#operaterCosts div.fixedBody dl dt').outerWidth()*2
                var availHeight = document.documentElement.clientHeight||document.body.clientHeight ;
                var h1 = $('.ivu-tabs-bar').outerHeight()
                var h2 = $('.monthSelect').outerHeight()
                var h3 = $('.title').outerHeight()
                $('#operaterCosts').height(availHeight - h1 - h2 -h3 - 50)
            $('#operaterCosts div.fixedHeader dd ul').width(len*liW)
            $('#operaterCosts div.fixedBody dd ul').width(bodylen*bodyliW)
            $('#operaterCosts div.fixedBody').width(bodylen*bodyliW + dtW )
        },
        onScroll(e,position){
            // $('.scrollable-rows-table').stop(true).animate({marginTop:-position.scrollTop - 3},30)
            //$('.scrollable-rows-table').css({marginTop:-position.scrollTop  + 'px'})
                //$('.scrollable-columns-table').css({marginLeft:-position.scrollLeft  + 'px'})
            //$('.scrollable-columns-table').stop(true).animate({marginLeft:-position.scrollLeft - 3},30)
            $('#operaterCosts div.fixedHeader dl dt').css({
                left : position.scrollLeft + 'px'
            })
                $('#operaterCosts div.fixedHeader dl dt.fixedTotal').css({
                left : (159 +  position.scrollLeft) + 'px'
            })
                $('#operaterCosts div.fixedBody dl dt').css({
                left : position.scrollLeft + 'px'
            })
                $('#operaterCosts div.fixedBody dl dt.fixedTotal').css({
                left : (159 +  position.scrollLeft) + 'px'
            })
            $('#operaterCosts div.fixedHeader').css({
                top: position.scrollTop + 'px'
            })
        },
        mockTableData() {
            let data = [];
            for (let i = 0; i < 10; i++) {
                data.push(
                    {
                        cityName: '城市' + Math.floor(Math.random() * 100 + 1),
                        hardwareCost: {
                            bikeDepreciate:Math.floor(Math.random() * 3 + 1),//车辆折旧
                            battDepreciate: Math.floor(Math.random() * 4 + 1),//电池折旧
                            chargeDepreciate:1,//充电站折旧
                            truckDepreciate:1,//机动车折旧
                            carDepreciate:1,//运维工具车折旧
                            transMoneyShare:1,//物流成本分摊
                            officeDepreciate:1,//办公成本折旧
                            otherDepreciate:1,//其他成本折旧
                            totalDepreciate:1,//折旧成本合计
                            depreProporte:1,//折旧成本占比
                        },
                        hardwareLoss: {
                            bikeWaste : Math.floor(Math.random() * 5 + 1),//车辆损耗
                            battWaste: Math.floor(Math.random() * 6 + 1),//电池损耗
                            chargeWaste:1,//充电站损耗
                            truckWaste:1,//机动车损耗
                             carWaste:1,//运维工具车损耗
                             officeWaste:1,//办公成本损耗
                             totalWaste:1,//损耗合计
                             wasteProporte:1,//损耗成本占比
                        },
                        expenses: {
                            personSalary: Math.floor(Math.random() * 5 + 1),//人员工资
                            rentMoney: Math.floor(Math.random() * 6 + 1),//房租
                            hydropower:1,//水电
                            manageMoney:1,//经营费用
                            openMoney :1,//开城费用
                            operateTotal:1,//运维合计
                            operateProporte:1//运维成本占比
                        },
                        totalCost: {
                            total: Math.floor(Math.random() * 7 + 1)//合计
                        }
                    }
                )
            }
            return data
        },
        changePage() {
            // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
            this.isNoData = false
            this.isNoData2 = false
            this.spinShow = true
            var that =  this
             setTimeout(function() {
            that.axios('/beefly/monthDataDetail/api/v1/monthDataDetail', {
                params: {
                    dataMonth: that.dataMonth,
                    accessToken: that.$store.state.token,
                    type: 2
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
                    var arr = [];
                    var message = response.data.message
                    if(message === '用户登录超时'){
                        this.$router.push({path:'/login'})
                    }
                    if(data.length>0){
                        that.isNoData2 = false
                        that.isNoData = true
                    }else{
                        that.isNoData2 = true
                        that.isNoData = false
                         return
                    }
                    for (var i = 0; i < data.length; i++) {
                         arr.push(
                                 {
                                    cityName: data[i].cityName,
                                    hardwareCost: {
                                        bikeDepreciate: data[i].bikeDepreciate,//车辆折旧
                                        battDepreciate: data[i].battDepreciate,//电池折旧
                                        chargeDepreciate: data[i].chargeDepreciate,//充电站折旧
                                        truckDepreciate: data[i].truckDepreciate,//机动车折旧
                                        carDepreciate: data[i].carDepreciate,//运维工具车折旧
                                        transMoneyShare: data[i].transMoneyShare,//物流成本分摊
                                        officeDepreciate: data[i].officeDepreciate,//办公成本折旧
                                        otherDepreciate: data[i].otherDepreciate,//其他成本折旧
                                        totalDepreciate: data[i].totalDepreciate,//折旧成本合计
                                        depreProporte: data[i].depreProporte,//折旧成本占比
                                    },
                                    hardwareLoss: {
                                        bikeWaste: data[i].bikeWaste,//车辆损耗
                                        battWaste: data[i].battWaste,//电池损耗
                                        chargeWaste: data[i].chargeWaste,//充电站损耗
                                        truckWaste: data[i].truckWaste,//机动车损耗
                                        carWaste: data[i].carWaste,//运维工具车损耗
                                        otherWaste: data[i].otherWaste,//其他
                                        totalWaste: data[i].totalWaste,//损耗合计
                                        wasteProporte: data[i].wasteProporte,//损耗成本占比
                                    },
                                    expenses: {
                                        salaryMoney:data[i].salaryMoney,
                                        personnelMoney: data[i].personnelMoney,//人员工资
                                        rentMoney: data[i].rentMoney,//房租
                                        hydropower:data[i].hydropower,//水电
                                        operationMoney:data[i].operationMoney,
                                        manageMoney: data[i].manageMoney,//经营费用
                                        openMoney: data[i].openMoney,//开城费用
                                        operateTotal: data[i].operateTotal,//运维合计
                                        operateProporte:data[i].operateProporte //运维成本占比
                                    },
                                    totalCost: {
                                        total: data[i].total//合计
                                    }
                                }
                            )

                    }
                    that.data4 = arr
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
       // this.changePage()
        var height = $(window).height()
        this.fx()
         //$('div.fiexedAssets').eq(1).height(height/2)
    },
    watch:{
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
                           this.data4 = []
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
        padding-left:319px;
        dt{text-indent:5px;line-height:38px;z-index:33;width:160px;height:38px;position:absolute;left:0;border:1px solid#ddd;background:#fff;
            &:nth-child(2){
                left:159px;
            }
        }
        dd{
            ul{
                overflow:hidden;
                li{color:#495060;text-align:center;float:left;min-width:850px;border:1px solid #ddd;margin-left:-1px;
                    span{
                        display: inline-block;
                        text-align: center;
                        float: left;
                    }
                }
                 li.bee{
                     background:rgb(126, 181, 224);
                     span{
                         width:calc(100% / 9);
                         min-width:65px;
                     }
                 }
                 li.battery{
                     background:rgb(172, 225, 231);
                     span{
                         width:calc(100% / 8);
                          min-width:65px; 
                     }
                 }
                 li.ChargingStation{
                     background: rgb(242, 181, 175);
                     span{
                          width:calc(100% / 9);
                           min-width:65px; 
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
        padding-left:319px;
        dt{transition:background-color linear .2s;transition:color linear .2s;width:160px;line-height:38px;height:38px;line-height:38px;position:absolute;left:0;border:1px solid #ddd;border-top:none;background:#fff;text-indent: 5px;
            &:nth-child(2){
                left:159px;
            }
        }
        dd{
            ul{
                overflow:hidden;
                li{color:#495060; height:38px;line-height:38px;text-align:center;float:left;min-width:850px;border:1px solid #ddd;margin-left:-1px;border-top:none; 
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
                         width:calc(100% / 9);
                         min-width:65px;
                     }
                 }
                 li.battery{
                     span{
                         width:calc(100% / 8);
                          min-width:65px; 
                     }
                 }
                 li.ChargingStation{
                     span{
                          width:calc(100% / 9);
                           min-width:65px; 
                     }
                 }
            }
        }
    }
}
div.ivu-table-wrapper {
    margin: 0 auto;
}
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

