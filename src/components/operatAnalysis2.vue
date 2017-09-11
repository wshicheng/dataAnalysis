<template>
 <!--运营成本分析-->
  <div class="fiexedAssets">
       <Table id="fiexedAssets" min-width="1180" height="400" border :columns="columns2" :data="data4"></Table>
  </div>
</template>
<script>
import $ from 'jquery'
import { mapGetters } from 'vuex'
    export default {
        data () {
            return {
                dynamicWidth:'',
                countObj:{},
                columns2: [
                    {
                        title: '城市',
                        key: 'name',
                        width: 100,
                        fixed: 'left',
                        className:'middle',
                        render:(h,params)=>{
                            return h('div',params.row.cityName)
                        },
                        renderHeader:(h,params)=>{
                            return h('div',[
                                h('div',{
                                    style:{
                                        width:'100%',
                                    }
                                },'城市'),
                               
                            ])
                        }
                    },
                    {
                        title: '月收入）',
                        key: 'age',
                        width: 420,
                        align:'center',
                        render:(h,params)=>{
                            return  h('div',{
                               style:{
                                    height:'30px'
                               }
                            },[
                                    h('span',{
                                        style:{
                                            float:'left',
                                           width:'33.3%',
                                            height:'30px',
                                            lineHeight:'30px',
                                            borderRight:'1px solid rgb(233, 234, 236)',
                                            boxSizing:'border-box',
                                        }
                                    },params.row.monthIncoming.mBillingIncome),
                                    h('span',{
                                        style:{
                                            float:'left',
                                           width:'33.3%',
                                            height:'30px',
                                            lineHeight:'30px',
                                            borderRight:'1px solid rgb(233, 234, 236)',
                                            boxSizing:'border-box',
                                        }
                                    },params.row.monthIncoming.mRealityIncome),
                                     h('span',{
                                        style:{
                                            float:'left',
                                          width:'33.3%',
                                            height:'30px',
                                            lineHeight:'30px',
                                            borderRight:'none',
                                            boxSizing:'border-box',
                                        }
                                    },params.row.monthIncoming.realIncomeLv )
                                    
                                ])
                        },
                        renderHeader:(h,params)=>{
                            return h('div',[
                                h('div',{
                                     style:{
                                        width:'100%',
                                        lineHeight:'30px',
                                        borderBottom:'none ',
                                        background:'#b2b2cc',
                                        color:'#fff'
                                    }
                                },'月收入'),
                                h('div',{
                                   style:{
                                        width:'100%',
                                        lineHeight:'30px',
                                        borderBottom:'1px solid #e9eaec '
                                    } 
                                },[
                                    h('span',{
                                        style:{
                                            float:'left',
                                           width:'33.3%',
                                            borderRight:'1px solid rgb(233, 234, 236)',
                                            boxSizing:'border-box',
                                        }
                                    },'计费收入'),
                                    h('span',{
                                        style:{
                                            float:'left',
                                           width:'33.3%',
                                            borderRight:'1px solid rgb(233, 234, 236)',
                                            boxSizing:'border-box',
                                        }
                                    },'实际收入'),
                                    h('span',{
                                        style:{
                                            float:'left',
                                            width:'33.3%',
                                            borderRight:'none',
                                            boxSizing:'border-box',
                                        }
                                    },'实收率')
                                    
                                ])
                            ])
                        }
                    },
                    {
                        title: '盈亏状态（计费）',
                        key: 'age',
                        width: 420,
                        align:'center',
                        render:(h,params)=>{
                            return  h('div',{
                               style:{
                                    height:'30px'
                               }
                            },[
                                    h('span',{
                                        style:{
                                            float:'left',
                                           width:'50%',
                                            height:'30px',
                                            lineHeight:'30px',
                                            borderRight:'1px solid rgb(233, 234, 236)',
                                            boxSizing:'border-box',
                                        }
                                    },params.row.profitStatus. billProfitAndLoss),
                                    h('span',{
                                        style:{
                                            float:'left',
                                           width:'50%',
                                            height:'30px',
                                            lineHeight:'30px',
                                            borderRight:'none',
                                            boxSizing:'border-box',
                                        }
                                    },params.row.profitStatus. billProfitAndLossLv),
                                ])
                        },
                        renderHeader:(h,params)=>{
                            return h('div',[
                                h('div',{
                                     style:{
                                        width:'100%',
                                        lineHeight:'30px',
                                        borderBottom:'none ',
                                    }
                                },'盈亏状态（计费）'),
                                h('div',{
                                   style:{
                                        width:'100%',
                                        lineHeight:'30px',
                                        borderBottom:'1px solid #e9eaec '
                                    } 
                                },[
                                    h('span',{
                                        style:{
                                            float:'left',
                                           width:'50%',
                                            borderRight:'1px solid rgb(233, 234, 236)',
                                            boxSizing:'border-box',
                                        }
                                    },'计费盈亏'),
                                    h('span',{
                                        style:{
                                            float:'left',
                                            width:'50%',
                                            borderRight:'none',
                                            boxSizing:'border-box',
                                        }
                                    },'计费盈亏率')
                                ])
                            ])
                        }
                    },
                     {
                        title: '盈亏状态（实收）',
                        key: 'age',
                        width: 420,
                        align:'center',
                        render:(h,params)=>{
                            return  h('div',{
                               style:{
                                    height:'30px'
                               }
                            },[
                                    h('span',{
                                        style:{
                                            float:'left',
                                           width:'50%',
                                            height:'30px',
                                            lineHeight:'30px',
                                            borderRight:'1px solid rgb(233, 234, 236)',
                                            boxSizing:'border-box',
                                        }
                                    },params.row.actualProfit.realProfitAndLoss),
                                    h('span',{
                                        style:{
                                            float:'left',
                                           width:'50%',
                                            height:'30px',
                                            lineHeight:'30px',
                                            borderRight:'none',
                                            boxSizing:'border-box',
                                        }
                                    },params.row.actualProfit.realProfitAndLossLv),
                                ])
                        },
                        renderHeader:(h,params)=>{
                            return h('div',[
                                h('div',{
                                     style:{
                                        width:'100%',
                                        lineHeight:'30px',
                                        borderBottom:'none',
                                    }
                                },'盈亏状态（实收）'),
                                h('div',{
                                   style:{
                                        width:'100%',
                                        lineHeight:'30px',
                                        borderBottom:'1px solid #e9eaec '
                                    } 
                                },[
                                    h('span',{
                                        style:{
                                            float:'left',
                                           width:'50%',
                                            borderRight:'1px solid rgb(233, 234, 236)',
                                            boxSizing:'border-box',
                                        }
                                    },'实收盈亏'),
                                    h('span',{
                                        style:{
                                            float:'left',
                                            width:'50%',
                                            borderRight:'1px solid rgb(233, 234, 236)',
                                            boxSizing:'border-box',
                                        }
                                    },'实收盈亏率')
                                ])
                            ])
                        }
                    },
                       {
                        title: '单车产出',
                        key: 'age',
                        width: 420,
                        align:'center',
                        render:(h,params)=>{
                            return  h('div',{
                               style:{
                                    height:'30px'
                               }
                            },[
                                    h('span',{
                                        style:{
                                            float:'left',
                                           width:'50%',
                                            height:'30px',
                                            lineHeight:'30px',
                                            borderRight:'1px solid rgb(233, 234, 236)',
                                            boxSizing:'border-box',
                                        }
                                    },params.row.singleCar.oBilling),
                                    h('span',{
                                        style:{
                                            float:'left',
                                           width:'50%',
                                            height:'30px',
                                            lineHeight:'30px',
                                            borderRight:'none',
                                            boxSizing:'border-box',
                                        }
                                    },params.row.singleCar.oReality),
                                ])
                        },
                        renderHeader:(h,params)=>{
                            return h('div',[
                                h('div',{
                                     style:{
                                        width:'100%',
                                        lineHeight:'30px',
                                        borderBottom:'none ',
                                    }
                                },'单车产出'),
                                h('div',{
                                   style:{
                                        width:'100%',
                                        lineHeight:'30px',
                                        borderBottom:'1px solid #e9eaec '
                                    } 
                                },[
                                    h('span',{
                                        style:{
                                            float:'left',
                                           width:'50%',
                                            borderRight:'1px solid rgb(233, 234, 236)',
                                            boxSizing:'border-box',
                                        }
                                    },'计费'),
                                    h('span',{
                                        style:{
                                            float:'left',
                                            width:'50%',
                                            borderRight:'1px solid rgb(233, 234, 236)',
                                            boxSizing:'border-box',
                                        }
                                    },'实收')
                                ])
                            ])
                        }
                    },
                    //  {
                    //     title: '合计',
                    //     key: 'total',
                    //     width: 100,
                    //     fixed: 'right',
                    //     className:'middle',
                    //      render:(h,params)=>{
                    //         return h('div',params.row.total.money)
                    //     },
                    //     renderHeader:(h,params)=>{
                    //         return h('div',[
                    //             h('div',{
                    //                 style:{
                    //                     width:'100%',
                                       
                    //                 }
                    //             },'合计')
                               
                    //         ])
                    //     }
                    // }
                ],
                data4:this.mockTableData()
            }
        },
        computed:{
            ...mapGetters(['dataMonth'])
        },
        methods:{
            mockTableData(){
                let data = [];
                for(let i=0;i<10;i++){
                    data.push(
                         {
                            cityName: '城市' + Math.floor(Math.random () * 100 + 1),
                            monthIncoming:{
                                mBillingIncome:Math.floor(Math.random () * 3 + 1),//月收入-计费
                                mRealityIncome:Math.floor(Math.random () * 4 + 1),//月收入-实收
                                realIncomeLv:1//月收入-实收率
                            },
                            profitStatus:{
                                billProfitAndLoss:Math.floor(Math.random () * 5 + 1),//盈亏状态(计费)-计费盈亏
                                billProfitAndLossLv:Math.floor(Math.random () * 6 + 1),//盈亏状态(计费)-计费盈亏率
                            },
                            actualProfit:{
                                realProfitAndLoss:1,//盈亏状态(实收)-实收盈亏
                                realProfitAndLossLv:1,//盈亏状态(实收)-实收盈亏率
                            },
                            singleCar:{
                                oBilling:Math.floor(Math.random () * 7 + 1),//单车产出-计费
                                oReality:Math.floor(Math.random () * 8 + 1),//单车产出-实收
                            }
                        }
                    )
                }
                return data
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
                        type: 3
                    }
                    }).then((response) => {
                        var data = response.data.data
                        var arr = [];
                        for (var i = 0; i < data.length; i++) {
                            if (i <= data.length-1) {
                                arr.push(
                                    {
                                        cityName: data[i].city,
                                        monthIncoming: {
                                            mBillingIncome: data[i].mBillingIncome,//月收入-计费
                                            mRealityIncome: data[i].mRealityIncome,//月收入-实收
                                            realIncomeLv: data[i].realIncomeLv//月收入-实收率
                                        },
                                        profitStatus: {
                                            billProfitAndLoss: data[i].billProfitAndLoss,//盈亏状态(计费)-计费盈亏
                                            billProfitAndLossLv: data[i].billProfitAndLossLv,//盈亏状态(计费)-计费盈亏率
                                        },
                                        actualProfit: {
                                            realProfitAndLoss: data[i].realProfitAndLoss,//盈亏状态(实收)-实收盈亏
                                            realProfitAndLossLv: data[i].realProfitAndLossLv,//盈亏状态(实收)-实收盈亏率
                                        },
                                        singleCar: {
                                            oBilling: data[i].oBilling,//单车产出-计费
                                            oReality: data[i].oReality,//单车产出-实收
                                        }
                                    }
                                )
                            }
                            if (i === data.length - 1) {
                                this.countObj = data[data.length - 1]
                            }

                        }
                        console.log(arr)
                        console.log(this.countObj)
                        that.data4 = arr
                        var html = ''
                        for (var i = 0; i < 1; i++) {
                            html += `
                           <tr class="ivu-table-row">
                        <td class="middle ivu-table-hidden">
                            <div class="ivu-table-cell ivu-table-hidden">
                                <div>城市83</div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div style="height: 30px;"><span style="float: left; width: 33.3%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.mBillingIncome}</span>
                                    <span
                                        style="float: left; width: 33.3%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.mRealityIncome}</span><span style="float: left; width: 33.3%; height: 30px; line-height: 30px;  box-sizing: border-box;">${countObj.realIncomeLv}</span></div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div style="height: 30px;"><span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.billProfitAndLoss }</span>
                                    <span
                                        style="float: left; width: 50%; height: 30px; line-height: 30px;box-sizing: border-box;">${countObj.billProfitAndLossLv}</span>
                                </div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div style="height: 30px;"><span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.realProfitAndLoss}</span>
                                    <span
                                        style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.realProfitAndLossLv}</span>
                                </div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div style="height: 30px;"><span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.oBilling}</span>
                                    <span
                                        style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.oReality}</span>
                                </div>
                            </div>
                        </td>
                        <td class="middle ivu-table-hidden">
                            <div class="ivu-table-cell ivu-table-hidden">
                                <div>5</div>
                            </div>
                        </td>
                    </tr>
                        `
                        }
                    if(that.data4.length>0){
                            $('.ivu-table-body').eq(2).find('table').find('tfoot').remove()
                            $('.ivu-table-body').eq(2).find('table').append("<tfoot><tr>" + html + "</tr></tfoot>")
                            $('.ivu-tabs-tabpane').eq(2).find('.ivu-table-fixed').find('.ivu-table-fixed-body').find('table').find('tfoot').remove()
                            $('.ivu-tabs-tabpane').eq(2).find('.ivu-table-fixed').find('.ivu-table-fixed-body').find('table').append('<tfoot><td class="middle"><div class="ivu-table-cell"><div>合计</div></div></td></tfoot>')
                            $('.ivu-tabs-tabpane').eq(2).find('.ivu-table-fixed-right').find('.ivu-table-fixed-body').find('table').find('tfoot').remove()
                            $('.ivu-tabs-tabpane').eq(2).find('.ivu-table-fixed-right').find('.ivu-table-fixed-body').find('table').append('<tfoot><tr class="ivu-table-row"><td class="middle"><div class="ivu-table-cell"><div>'+this.countObj.total+'</div></div></td></tr></tfoot>')
                        }else{
                            $('.ivu-table-body').eq(2).find('table').find('tfoot').remove()
                            $('.ivu-tabs-tabpane').eq(2).find('.ivu-table-fixed').find('.ivu-table-fixed-body').find('table').find('tfoot').remove()
                            $('.ivu-tabs-tabpane').eq(2).find('.ivu-table-fixed-right').find('.ivu-table-fixed-body').find('table').find('tfoot').remove()
                        }
                    }).catch((error) => {
                        console.log(error)
                    })
                }, 200)
            }
        },
        mounted(){
            console.log('屏幕工作区可用宽度:' + window.screen.availWidth)
            console.log('屏幕分辨率的宽:'  + window.screen.width)
            this.changePage()
            // var html = ''
            // for(var i=0;i<1;i++){
            //     html += `
            //         <tr class="ivu-table-row">
            //             <td class="middle ivu-table-hidden">
            //                 <div class="ivu-table-cell ivu-table-hidden">
            //                     <div>城市83</div>
            //                 </div>
            //             </td>
            //             <td class="ivu-table-column-center">
            //                 <div class="ivu-table-cell">
            //                     <div style="height: 30px;"><span style="float: left; width: 33.3%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">3</span>
            //                         <span
            //                             style="float: left; width: 33.3%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span><span style="float: left; width: 33.3%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span></div>
            //                 </div>
            //             </td>
            //             <td class="ivu-table-column-center">
            //                 <div class="ivu-table-cell">
            //                     <div style="height: 30px;"><span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">3</span>
            //                         <span
            //                             style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span>
            //                     </div>
            //                 </div>
            //             </td>
            //             <td class="ivu-table-column-center">
            //                 <div class="ivu-table-cell">
            //                     <div style="height: 30px;"><span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">3</span>
            //                         <span
            //                             style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span>
            //                     </div>
            //                 </div>
            //             </td>
            //             <td class="ivu-table-column-center">
            //                 <div class="ivu-table-cell">
            //                     <div style="height: 30px;"><span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">3</span>
            //                         <span
            //                             style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span>
            //                     </div>
            //                 </div>
            //             </td>
            //             <td class="middle ivu-table-hidden">
            //                 <div class="ivu-table-cell ivu-table-hidden">
            //                     <div>5</div>
            //                 </div>
            //             </td>
            //         </tr>
            //     `
            // }
            // $('.ivu-table-body').eq(2).find('table').append("<tfoot><tr>" + html + "</tr></tfoot>")
            // $('.ivu-tabs-tabpane').eq(2).find('.ivu-table-fixed').find('.ivu-table-fixed-body').find('table').append('<tfoot><td class="middle"><div class="ivu-table-cell"><div>合计</div></div></td></tfoot>')
            // $('.ivu-tabs-tabpane').eq(2).find('.ivu-table-fixed-right').find('.ivu-table-fixed-body').find('table').append( '<tfoot><tr class="ivu-table-row"><td class="middle"><div class="ivu-table-cell"><div>6</div></div></td></tr></tfoot>')
            
        },
        watch:{
        'dataMonth':{
            handler:function(val){
                this.changePage()
            },
            deep:true
        }
    }
    }
</script>
<style lang="scss" scoped type="text/css">
div.ivu-table-wrapper{margin:0 auto;}
div.fiexedAssets{padding:0 16px 16px 16px;}
</style>

