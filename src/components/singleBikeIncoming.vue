<template>
    <!--单车日营收-->
     <div class="fiexedAssets">
        <Spin v-show="spinShow" fix>
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div style="color:rgb(204, 204, 204);">Loading</div>
            </Spin>
          <div class="nodata" v-show="isNoData2">
            <i class="iconfont icon-zanwushuju"></i>
        </div>
         <Table v-show="isNoData" id="fiexedAssets6" :columns="columns8" :data="data7" size="small" ref="table"></Table>
       
     </div>
   </template>
   <script>
   import { mapGetters } from 'vuex'
   import $ from 'jquery'
       export default {
           data () {
               return {
                 countObj:{},
                 spinShow:true,
                   isNoData:true,
                   isNoData2:true,
                   columns8:[
                  {
                    "title": "城市",
                    "key": "name",
                    "fixed": "left",
                    "width": 300,
                    render: (h, params) => {
                      return h('div',params.row.cityName)
                    },
                    renderHeader: (h) => {
                      return h('div', [
                        h('div', {
                          style: {
                            width: '100%',
                          }
                        }, '城市'),

                      ])
                    }
                  },
                  {
                    "title": "单车产出",
                    "width": 450,
                    renderHeader: (h) => {
                      return h('div', [
                        h('div', {
                          style: {
                            textAlign: 'center',
                            lineHeight: '30px',
                            borderBottom: '1px solid #e9eaec',
                            borderRight: '1px solid #e9eaec'
                          }
                        }, '单车产出'),
                        h('div', [
                          h('span', {
                            style: {
                              display: 'inline-block',
                              lineHeight: '30px',
                              width: '50%',
                              textAlign: 'center',
                              borderBox: 'box-sizing',
                              borderRight: '1px solid #e9eaec'
                            }
                          }, '计费'),
                          h('span', {
                            style: {
                              display: 'inline-block',
                              lineHeight: '30px',
                              width: '50%',
                              textAlign: 'center',
                              borderBox: 'box-sizing',
                              borderRight: '1px solid #e9eaec'
                            }
                          }, '实收')
                        ])
                      ])
                    },
                    render: (h, params) => {
                      return h('div', [
                        h('span', {
                          style: {
                            display: 'inline-block',
                            lineHeight: '30px',
                            width: '50%',
                            textAlign: 'center',
                            borderBox: 'box-sizing',
                            borderRight: '1px solid #e9eaec'
                          }
                        }, params.row.singleProduce.outPutBilling),
                        h('span', {
                          style: {
                            display: 'inline-block',
                            lineHeight: '30px',
                            width: '50%',
                            textAlign: 'center',
                            borderBox: 'box-sizing',
                            borderRight: '1px solid #e9eaec'
                          }
                        }, params.row.singleProduce.outPutReality)
                      ])
                    }
                  },
                  {
                    "title": "单车成本",
                    "width": 450,
                    renderHeader: (h) => {
                      return h('div', [
                        h('div', {
                          style: {
                            textAlign: 'center',
                            lineHeight: '60px',
                            borderBottom: 'none',
                            borderRight: '1px solid #e9eaec'
                          }
                        }, '单车成本'),

                      ])
                    },
                    render: (h, params) => {
                      return h('div',{
                          style:{
                               borderRight: '1px solid #e9eaec',
                               height:'30px',
                               lineHeight:'30px'
                          }
                      },params.row.singleCost.oBikeCost)
                    }
                  },
                  {
                    "title": "单车盈收",
                    "width": 450,
                    renderHeader: (h) => {
                      return h('div', [
                        h('div', {
                          style: {
                            textAlign: 'center',
                            lineHeight: '30px',
                            borderBottom: '1px solid #e9eaec',
                            borderRight: '1px solid #e9eaec'
                          }
                        }, '单车盈收'),
                        h('div', [
                          h('span', {
                            style: {
                              display: 'inline-block',
                              lineHeight: '30px',
                              width: '50%',
                              textAlign: 'center',
                              borderBox: 'box-sizing',
                              borderRight: '1px solid #e9eaec'
                            }
                          }, '计费'),
                          h('span', {
                            style: {
                              display: 'inline-block',
                              lineHeight: '30px',
                              width: '50%',
                              textAlign: 'center',
                              borderBox: 'box-sizing',
                              borderRight: '1px solid #e9eaec'
                            }
                          }, '实收')
                        ])
                      ])
                    },
                    render: (h, params) => {
                      return h('div', [
                        h('span', {
                          style: {
                            display: 'inline-block',
                            lineHeight: '30px',
                            width: '50%',
                            textAlign: 'center',
                            borderBox: 'box-sizing',
                            borderRight: '1px solid #e9eaec'
                          }
                        }, params.row.singleProfit.inPutBilling),
                        h('span', {
                          style: {
                            display: 'inline-block',
                            lineHeight: '30px',
                            width: '50%',
                            textAlign: 'center',
                            borderBox: 'box-sizing',
                            borderRight: '1px solid #e9eaec'
                          }
                        }, params.row.singleProfit.inPutReality)
                      ])
                    }
                  },
                  {
                    "title": "单车盈收率",
                    "width": 450,
                    renderHeader: (h) => {
                      return h('div', [
                        h('div', {
                          style: {
                            textAlign: 'center',
                            lineHeight: '30px',
                            borderBottom: '1px solid #e9eaec',
                            borderRight: '1px solid #e9eaec'
                          }
                        }, '单车盈收率'),
                        h('div', [
                          h('span', {
                            style: {
                              display: 'inline-block',
                              lineHeight: '30px',
                              width: '50%',
                              textAlign: 'center',
                              borderBox: 'box-sizing',
                              borderRight: '1px solid #e9eaec'
                            }
                          }, '计费'),
                          h('span', {
                            style: {
                              display: 'inline-block',
                              lineHeight: '30px',
                              width: '50%',
                              textAlign: 'center',
                              borderBox: 'box-sizing',
                              borderRight: '1px solid #e9eaec'
                            }
                          }, '实收')
                        ])
                      ])
                    },
                    render: (h, params) => {
                      return h('div', [
                        h('span', {
                          style: {
                            display: 'inline-block',
                            lineHeight: '30px',
                            width: '50%',
                            textAlign: 'center',
                            borderBox: 'box-sizing',
                            borderRight: '1px solid #e9eaec'
                          }
                        }, params.row.singleProfitRate.inPutBillingLv),
                        h('span', {
                          style: {
                            display: 'inline-block',
                            lineHeight: '30px',
                            width: '50%',
                            textAlign: 'center',
                            borderBox: 'box-sizing',
                            borderRight: '1px solid #e9eaec'
                          }
                        }, params.row.singleProfitRate.inPutRealityLv)
                      ])
                    }
                  }
                ],
                   data7:[],
               }
           },
           computed:{
               ...mapGetters(['dataMonth'])
           },
           methods:{
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
                               var message = response.data.message
                                if(message === '用户登录超时'){
                                    this.$router.push({path:'/login'})
                                }
                               var arr = [];
                                if(data.length>0){
                                    that.isNoData2 = false
                                    that.isNoData = true
                                }else{
                                    that.isNoData2 = true
                                    that.isNoData = false
                                    return;
                                }
                               for (var i = 0; i < data.length; i++) {
                                   if (i < data.length - 1) {
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
                                   if (i === data.length - 1) {
                                       that.countObj = data[data.length - 1]||{}
                                        var obj = that.countObj
                                   }
   
                               }
                               that.data7 = arr
                               var html = ''
                               for (var i = 0; i < 1; i++) {
                                   html += `
                                       <tr class="ivu-table-row">
                                           <td class="middle ivu-table-hidden">
                                               <div class="ivu-table-cell ivu-table-hidden">
                                                   <div>北京市</div>
                                               </div>
                                           </td>
                                           <td class="ivu-table-column-center">
                                               <div class="ivu-table-cell">
                                                   <div style="height: 30px;"><span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.outPutBilling}</span>
                                                       <span
                                                           style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.outPutReality}</span>
                                                   </div>
                                               </div>
                                           </td>
                                           <td class="ivu-table-column-center">
                                               <div class="ivu-table-cell">
                                                   <div style="height: 30px;"><span style="float: left; width: 100%; height: 30px; line-height: 30px; box-sizing: border-box; border-right: 1px solid rgb(233, 234, 236);">${countObj.oBikeCost}</span></div>
                                               </div>
                                           </td>
                                           <td class="ivu-table-column-center">
                                               <div class="ivu-table-cell">
                                                   <div style="height: 30px;"><span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.inPutBilling}</span>
                                                       <span
                                                           style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.inPutReality}</span>
                                                   </div>
                                               </div>
                                           </td>
                                           <td class="ivu-table-column-center">
                                               <div class="ivu-table-cell">
                                                   <div style="height: 30px;"><span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.inPutBillingLv}</span>
                                                       <span
                                                           style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.inPutRealityLv}</span>
                                                   </div>
                                               </div>
                                           </td>
                                       </tr>
                                   `
                               }
                              
                           if(that.data7.length>0){
                                   $('.ivu-table-body').eq(3).find('table').find('tfoot').remove()
                                   $('.ivu-table-body').eq(3).find('table').append("<tfoot><tr>" + html + "</tr></tfoot>")
                                   $('.ivu-tabs-tabpane').eq(3).find('.ivu-table-fixed').find('.ivu-table-fixed-body').find('table').find('tfoot').remove()
                                   $('.ivu-tabs-tabpane').eq(3).find('.ivu-table-fixed').find('.ivu-table-fixed-body').find('table').append('<tfoot><td class="middle"><div class="ivu-table-cell"><div>合计</div></div></td></tfoot>')
                                   $('.ivu-tabs-tabpane').eq(3).find('.ivu-table-fixed-right').find('.ivu-table-fixed-body').find('table').find('tfoot').remove()
                                   $('.ivu-tabs-tabpane').eq(3).find('.ivu-table-fixed-right').find('.ivu-table-fixed-body').find('table').append('<tfoot><tr class="ivu-table-row"><td class="middle"><div class="ivu-table-cell"><div>'+obj.total+'</div></div></td></tr></tfoot>')
                               }else{
                                   $('.ivu-table-body').eq(3).find('table').find('tfoot').remove()
                                   $('.ivu-tabs-tabpane').eq(3).find('.ivu-table-fixed').find('.ivu-table-fixed-body').find('table').find('tfoot').remove()
                                   $('.ivu-tabs-tabpane').eq(3).find('.ivu-table-fixed-right').find('.ivu-table-fixed-body').find('table').find('tfoot').remove()
                               }
                           }).catch((error) => {
                               console.log(error)
                                 that.spinShow = false
                           })
                       }, 200)
               }
           },
           mounted(){
                setTimeout(function(){
                    //   $('div.ivu-tabs-tabpane').eq(3).find('.ivu-table-header').find('table').width('100%')
                    //  $('div.ivu-tabs-tabpane').eq(3).find('.ivu-table-body').find('table').width('100%')
                },200)
                 var height = $(window).height()
                 $('div.fiexedAssets').eq(3).height(height/2)
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
   <style lang="scss" scoped type="text/css">
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
   
   