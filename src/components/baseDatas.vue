<template>
    <!--基础数据demo-->
    <div id="baseDatas">
        <div class="container fiexedAssets">
            <Spin v-show="spinShow" fix>
                    <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                    <div style="color:rgb(204, 204, 204);">Loading</div>
                </Spin>
            <div class="nodata" v-show="isNoData2">
                <i class="iconfont icon-zanwushuju"></i>
            </div>
             <div v-show="isNoData" class="table" id="baseData" v-scroll="onScroll" >
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
                                                   小蜜蜂 
                                            </div>
                                            <div>
                                                <span>型号</span>
                                                <span>数量</span>
                                                <span>金额</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="battery">
                                        <div class="cityName">
                                            <div>
                                                   电池
                                            </div>
                                            <div>
                                                <span>型号</span>
                                                <span>数量</span>
                                                <span>金额</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="ChargingStation">
                                        <div class="cityName">
                                            <div>
                                                   电站
                                            </div>
                                            <div>
                                                <span>建设</span>
                                                <span>设备</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="Tricycle">
                                        <div class="cityName">
                                            <div>
                                                   机动车
                                            </div>
                                            <div>
                                                <span>数量</span>
                                                <span>金额</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="Toolcar">
                                        <div class="cityName">
                                            <div>
                                                   运维工具车
                                            </div>
                                            <div>
                                                <span>数量</span>
                                                <span>金额</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="transCost">
                                        <div class="cityName">
                                            <div>
                                                   物流
                                            </div>
                                            
                                        </div>
                                    </li>
                                    <li class="otherCost">
                                        <div class="cityName">
                                            <div>
                                                   其他
                                            </div>
                                            
                                        </div>
                                    </li>
                                    <li class="assetsTotal">
                                        <div class="cityName">
                                            <div>
                                                   小计
                                            </div>
                                            
                                        </div>
                                    </li>
                                    <li class="salaryMoney">
                                        <div class="cityName">
                                            <div>
                                                   薪资福利
                                            </div>
                                            
                                        </div>
                                    </li>
                                    <li class="personnelCost">
                                        <div class="cityName">
                                            <div>
                                                   其他人员成本
                                            </div>
                                            
                                        </div>
                                    </li>
                                    <li class="rentCost">
                                        <div class="cityName">
                                            <div>
                                                   房租生产
                                            </div>
                                            
                                        </div>
                                    </li>
                                    <li class="hydropoer">
                                        <div class="cityName">
                                            <div>
                                                   水电生产
                                            </div>
                                            
                                        </div>
                                    </li>
                                     <li class="operationMoney">
                                        <div class="cityName">
                                            <div>
                                                   其他生产成本
                                            </div>
                                            
                                        </div>
                                    </li>
                                    <li class="manageCost">
                                        <div class="cityName">
                                            <div>
                                                   其他经营费用
                                            </div>
                                            
                                        </div>
                                    </li>
                                     <li class="openCost">
                                        <div class="cityName">
                                            <div>
                                                   开城费用
                                            </div>
                                            
                                        </div>
                                    </li>
                                    <li class="assetsTotal" style="background:#f2b5af">
                                        <div class="cityName">
                                            <div>
                                                   小计
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
                            <dt class="fixedTotal">
                                <div class="cityName leftTitle">
                                    <div>{{item.total.money}}</div>
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
                                                <span>{{item.beefly.bikeModel}}</span>
                                                <span>{{item.beefly.num}}</span>
                                                <span>{{item.beefly.money}}</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="battery">
                                        <div class="cityName">
                                           
                                            <div>
                                                <span>{{item.Battery.battModel}}</span>
                                                <span>{{item.Battery.num}}</span>
                                                <span>{{item.Battery.money}}</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="ChargingStation">
                                        <div class="cityName">
                                           
                                            <div>
                                                <span>{{item.ChargingStation.build}}</span>
                                                <span>{{item.ChargingStation.cabinet}}</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="Tricycle">
                                        <div class="cityName">
                                           
                                            <div>
                                                <span>{{item.Tricycle.num}}</span>
                                                <span>{{item.Tricycle.money}}</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="Toolcar">
                                        <div class="cityName">
                                           
                                            <div>
                                                <span>{{item.Toolcar.num}}</span>
                                                <span>{{item.Toolcar.money}}</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="transCost">
                                        <div class="cityName">
                                            <div>
                                                  {{item.transCost.money}}
                                            </div>
                                            
                                        </div>
                                    </li>
                                    <li class="otherCost">
                                        <div class="cityName">
                                            <div>
                                                   {{item.otherCost.money}}
                                            </div>
                                            
                                        </div>
                                    </li>
                                    <li class="assetsTotal">
                                        <div class="cityName">
                                            <div>
                                                   {{item.assetsTotal.money}}
                                            </div>
                                            
                                        </div>
                                    </li>
                                    <li class="salaryMoney">
                                        <div class="cityName">
                                            <div>
                                                  {{item.salaryMoney.money}}
                                            </div>
                                            
                                        </div>
                                    </li>
                                    <li class="personnelCost">
                                        <div class="cityName">
                                            <div>
                                                 {{item.personnelCost.money}}
                                            </div>
                                            
                                        </div>
                                    </li>
                                    <li class="rentCost">
                                        <div class="cityName">
                                            <div>
                                                  {{item.rentCost.money}}
                                            </div>
                                            
                                        </div>
                                    </li>
                                    <li class="hydropoer">
                                        <div class="cityName">
                                            <div>
                                                   {{item.hydropoer.money}}
                                            </div>
                                            
                                        </div>
                                    </li>
                                     <li class="operationMoney">
                                        <div class="cityName">
                                            <div>
                                                   {{item.operationMoney.money}}
                                            </div>
                                            
                                        </div>
                                    </li>
                                    <li class="manageCost">
                                        <div class="cityName">
                                            <div>
                                                   {{item.manageCost.money}}
                                            </div>
                                            
                                        </div>
                                    </li>
                                     <li class="openCost">
                                        <div class="cityName">
                                            <div>
                                                   {{item.openCost.money}}
                                            </div>
                                            
                                        </div>
                                    </li>
                                    <li class="assetsTotal">
                                        <div class="cityName">
                                            <div>
                                                   {{item.operationTotal.money}}
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
import $ from 'jquery'
import { mapGetters,mapActions } from 'vuex'
export default {
    data() {
        return {
           
            dynamicWidth:'',
            spinShow:true,
            isNoData2: false,
            isNoData:false,
           
            data7: [
                {
                    // 城市
                    cityName: '',
                    //车辆数量
                    beefly: {
                        model:'',
                        num: '',
                        money: '',
                    },
                    //电池
                    Battery: {
                         model:'',
                        num: '',
                        money: '',
                    },
                    // 充电站
                    ChargingStation: {
                        build: '',
                        cabinet: ''
                    },
                    //机动车
                    Tricycle: {
                        num: '',
                        money: ''
                    },
                    //运维工具车
                    Toolcar: {
                        num: '',
                        money: ''
                    },
                    // 物流成本
                    transCost: {
                        money: ''
                    },
                    // //办公成本
                    // officeCost: {
                    //     money: ''
                    // },
                    // 其他金额
                    otherCost: {
                        money: ''
                    },
                     // 固定资产小计
                    assetsTotal: {
                        money: ''
                    },
                     // 薪资福利
                    salaryMoney: {
                        money: ''
                    },
                    // 人员成本
                    personnelCost: {
                        money: ''
                    },
                    // 房租
                    rentCost: {
                        money: ''
                    },
                    //水电
                    hydropoer: {
                        money: ''
                    },
                    
                     // 其他生产成本
                    operationMoney: {
                        money: ''
                    },
                    // 经营费用
                    manageCost: {
                        money: ''
                    },
                    openCost: {
                        money: ''
                    },
                    //运维费用小计
                    operationTotal: {
                        money: ''
                    },
                    total: {
                        money: ''
                    }
                }
            ]
        }
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

                var liW = $('#baseData div.fixedHeader ul li').outerWidth()
                var len = $('#baseData div.fixedHeader dd ul li').length
                var bodyliW = $('#baseData div.fixedHeader ul li').outerWidth()
                var bodylen = $('#baseData div.fixedHeader dd ul li').length
                var dtW = $('#baseData div.fixedBody dl dt').outerWidth()*2
                var availHeight = document.documentElement.clientHeight||document.body.clientHeight ;
                var h1 = $('.ivu-tabs-bar').outerHeight()
                var h2 = $('.monthSelect').outerHeight()
                var h3 = $('.title').outerHeight()
                $('#baseData').height(availHeight - h1 - h2 -h3 - 50)
            $('#baseData div.fixedHeader dd ul').width(len*liW)
            $('#baseData div.fixedBody dd ul').width(bodylen*bodyliW)
            $('#baseData div.fixedBody').width(bodylen*bodyliW + dtW )
        },
        onScroll(e,position){
            // $('.scrollable-rows-table').stop(true).animate({marginTop:-position.scrollTop - 3},30)
            //$('.scrollable-rows-table').css({marginTop:-position.scrollTop  + 'px'})
                //$('.scrollable-columns-table').css({marginLeft:-position.scrollLeft  + 'px'})
            //$('.scrollable-columns-table').stop(true).animate({marginLeft:-position.scrollLeft - 3},30)
            $('#baseData div.fixedHeader dl dt').css({
                left : position.scrollLeft + 'px'
            })
                $('#baseData div.fixedHeader dl dt.fixedTotal').css({
                left : (159 +  position.scrollLeft) + 'px'
            })
                $('#baseData div.fixedBody dl dt').css({
                left : position.scrollLeft + 'px'
            })
                $('#baseData div.fixedBody dl dt.fixedTotal').css({
                left : (159 +  position.scrollLeft) + 'px'
            })
            $('#baseData div.fixedHeader').css({
                top: position.scrollTop + 'px'
            })
        },
         ...mapActions(['updateType']),
        changePage() {
            var that = this;
            this.spinShow = true
             this.isNoData = false
            // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
            // var that = this
            // setTimeout(function() {
                this.axios('/beefly/monthDataDetail/api/v1/monthDataDetail', {
                    params: {
                        dataMonth: this.dataMonth,
                        accessToken: this.$store.state.token,
                        type: 1
                    }
                }).then((response) => {
                   this.spinShow = false
                    var data = response.data.data
                    var initData = [...data]
                    var lastObj = data.pop()
                    if(lastObj==undefined){
                        this.isNoData = false
                        this.isNoData2 = true
                        this.updateType(1)
                        return;
                    }
                    var obj = Object.assign({},lastObj,{cityName:'合计'})
                    data.push(obj)
                    
                    var message = response.data.message
                    var code = response.data.resultCode
                    this.updateType(1)
                    
                   setTimeout(()=>{
                        this.fx()
                         //$('div.dataScroll').width(bodylen*bodyliW + dtW)
                    },30)
                    if(message === '用户登录超时'){
                        this.$router.push({path:'/login'})
                    }
                    var arr = [];
                    if (data.length > 0) {
                        this.isNoData = true
                        this.isNoData2 = false
                    } else {
                        this.isNoData = false
                        this.isNoData2 = true
                    }
                    for (var i = 0; i < data.length; i++) {
                        arr.push(
                                    {
                                        // 城市
                                        cityName: data[i].cityName,
                                        //车辆数量
                                        beefly: {
                                            bikeModel:data[i].bikeModel,
                                            num: data[i].bikeNum,
                                            money: data[i].bikeMoney,
                                        },
                                        //电池
                                        Battery: {
                                            battModel:data[i].battModel,
                                            num: data[i].battNum,
                                            money: data[i].battMoney,
                                        },
                                        // 充电站
                                        ChargingStation: {
                                            build: data[i].chargeBuild,
                                            cabinet: data[i].chargeCabinet
                                        },
                                        //机动车
                                        Tricycle: {
                                            num: data[i].truckNum,
                                            money: data[i].truckMoney
                                        },
                                        //运维工具车
                                        Toolcar: {
                                            num: data[i].carNum,
                                            money: data[i].carMoney
                                        },
                                        // 物流成本
                                        transCost: {
                                            money: data[i].transMoney
                                        },
                                        // //办公成本
                                        // officeCost: {
                                        //     money: data[i].officeMoney
                                        // },
                                        // 其他金额
                                        otherCost: {
                                            money: data[i].otherMoney
                                        },
                                        // 固定资产小计
                                         assetsTotal: {
                                            money: data[i].assetsTotal
                                        },
                                         // 薪资福利
                                        salaryMoney: {
                                            money: data[i].personnelMoney
                                        },
                                        // 人员成本
                                        personnelCost: {
                                            money: data[i].personnelMoney
                                        },
                                        // 房租
                                        rentCost: {
                                            money: data[i].rentMoney
                                        },
                                        //水电
                                        hydropoer: {
                                            money: data[i].hydropower
                                        },
                                         // 其他生产成本
                                        operationMoney: {
                                            money: data[i].operationMoney
                                        },
                                        // 经营费用
                                        manageCost: {
                                            money: data[i].manageMoney
                                        },
                                        openCost: {
                                            money: data[i].openMoney
                                        },
                                        operationTotal: {
                                            money: data[i].operationTotal
                                        },
                                        total: {
                                            money: data[i].total
                                        }

                                    }
                            )
                       
                    }
                    console.log(arr)
                    this.data7 = arr
                }).catch((error) => {
                    console.log(error)
                      that.spinShow = false
                })
            // }, 200)
        }
    },
    computed: {
        ...mapGetters(['dataMonth','analysisType'])
    },
    mounted() {
         var height = $(window).height()
         this.fx()
         //$('div.fiexedAssets').eq(0).height(height/2)

    },
    beforeMount(){
       // this.changePage()
    },
    watch: {
        'dataMonth': {
            handler: function(val) {
                this.changePage()
            },
            deep: true
        }
    }
}
</script>
<style lang="scss" scoped>
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
        dt{color:#495060;text-indent:5px;line-height:38px;z-index:33;width:160px;height:38px;position:absolute;left:0;border:1px solid#ddd;background:#fff;
            &:nth-child(2){
                left:159px;
            }
        }
        dd{color:#495060;
            ul{
                overflow:hidden;
                li{text-align:center;float:left;min-width:200px;border:1px solid #ddd;margin-left:-1px;
                    span{
                        display: inline-block;
                        text-align: center;
                        float: left;
                    }
                }
                 li.bee{
                     background:#7eb5e0;
                     span{
                         width:calc(100% / 3)
                     }
                 }
                 li.battery{
                     background:#7eb5e0;
                     span{
                         width:calc(100% / 3) 
                     }
                 }
                 li.ChargingStation{
                     background:#7eb5e0;
                     span{
                          width:calc(100% / 2) 
                     }
                 }
                 li.Tricycle{
                     background:#7eb5e0;
                     span{
                          width:calc(100% / 2) 
                     }
                 }
                 li.Toolcar{
                     background:#7eb5e0;
                     span{
                          width:calc(100% / 2) 
                     }
                 }
                 li.transCost{
                     background:#7eb5e0;
                     line-height:38px;
                     height:38px;
                 }
                 li.otherCost{
                     background:#7eb5e0;
                     line-height:38px;
                     height:38px;
                 }
                 li.assetsTotal{
                     background:#7eb5e0;
                    line-height:38px;
                    height:38px;
                 }
                 li.salaryMoney{
                     background:#f2b5af;
                    line-height:38px;
                    height:38px;  
                 }
                 li.personnelCost{
                    background:#f2b5af;
                    line-height:38px;
                    height:38px;   
                 }
                 li.rentCost{
                    background:#f2b5af;
                    line-height:38px;
                    height:38px;  
                 }
                 li.hydropoer{
                    background:#f2b5af;
                     line-height:38px;
                     height:38px;   
                 }
                 li.operationMoney{
                      background:#f2b5af; 
                     line-height:38px;
                     height:38px;   
                 }
                 li.manageCost{
                      background:#f2b5af; 
                     line-height:38px;
                     height:38px;   
                 }
                 li.openCost{
                      background:#f2b5af; 
                     line-height:38px;
                     height:38px;  
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
        dt{color:#495060; transition:background-color linear .2s;transition:color linear .2s;width:160px;line-height:38px;height:38px;line-height:38px;position:absolute;left:0;border:1px solid #ddd;border-top:none;background:#fff;text-indent: 5px;
            &:nth-child(2){
                left:159px;
            }
        }
        dd{color:#495060; 
            ul{
                overflow:hidden;
                li{height:38px;line-height:38px;text-align:center;float:left;min-width:200px;border:1px solid #ddd;margin-left:-1px;border-top:none; 
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
                         width:calc(100% / 3)
                     }
                 }
                 li.battery{
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
                 li.Toolcar{
                     span{
                          width:calc(100% / 2) 
                     }
                 }
                 li.transCost{
                     line-height:38px;
                     height:38px;
                 }
                 li.otherCost{
                     line-height:38px;
                     height:38px;
                 }
                 li.assetsTotal{
                    line-height:38px;
                    height:38px;
                 }
                 li.salaryMoney{
                    line-height:38px;
                    height:38px;  
                 }
                 li.personnelCost{
                    line-height:38px;
                    height:38px;   
                 }
                 li.rentCost{
                    line-height:38px;
                    height:38px;  
                 }
                 li.hydropoer{
                     line-height:38px;
                     height:38px;   
                 }
                 li.operationMoney{
                     line-height:38px;
                     height:38px;   
                 }
                 li.manageCost{
                     line-height:38px;
                     height:38px;   
                 }
                 li.openCost{
                     line-height:38px;
                     height:38px;  
                 }
                 li.assetsTotal{
                    line-height:38px;
                     height:38px;   
                 }
            }
        }
    }
}

div.container {
    padding: 0 16px 0 16px;
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

