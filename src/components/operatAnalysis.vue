<template>
    <div class="container fiexedAssets">
         <Spin v-show="spinShow" fix>
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div style="color:rgb(204, 204, 204);">Loading</div>
            </Spin>
        <div class="nodata" v-show="isNoData2">
            <i class="iconfont icon-zanwushuju"></i>
        </div>
        <Table v-show="isNoData" id="fiexedAssets6" :columns="columns8" min-width='1200' :data="data7" size="small" border ref="table"></Table>
    </div>
</template>
<script>
import $ from 'jquery'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            spinShow:true,
            isNoData2: false,
            isNoData:false,
            countObj: {
                billProfitAndLoss: "",
                billProfitAndLossLv: "",
                city: "",
                dataMonth: "",
                id: '',
                mBillingIncome: "",
                mRealityIncome: "",
                oBilling: "",
                oReality: "",
                realIncomeLv: "",
                realProfitAndLoss: "",
                realProfitAndLossLv: "",
            },
            columns8: [
                {
                    "title": "城市",
                    "cityName": "name",
                   
                    "width": 200,
                    render: (h,params) => {
                        return h('div', {
                            style: {
                                textAlign: 'center'
                            }
                        }, params.row.cityName)
                    }
                },
                {
                    "title": "月收入",
                    "width": 350,
                    renderHeader: (h) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    textAlign: 'center',
                                    height:'30px',
                                    lineHeight:'30px',
                                    borderBottom: '1px solid #e9eaec'
                                }
                            }, '月收入'),
                            h('div', [
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        lineHeight: '30px',
                                        width: '33.3%',
                                        textAlign: 'center',
                                        borderBox: 'box-sizing',
                                        borderRight: '1px solid #e9eaec'
                                    }
                                }, '计费收入'),
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        lineHeight: '30px',
                                        width: '33.3%',
                                        textAlign: 'center',
                                        borderBox: 'box-sizing',
                                        borderRight: '1px solid #e9eaec'
                                    }
                                }, '实际收入'),
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        lineHeight: '30px',
                                        width: '33.3%',
                                        textAlign: 'center',
                                        borderRight: 'none'
                                    }
                                }, '实收率'),

                            ])
                        ])
                    },
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    lineHeight: '30px',
                                    width: '33.3%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: '1px solid #e9eaec'
                                }
                            }, params.row.monthIncoming.mBillingIncome),
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    lineHeight: '30px',
                                    width: '33.3%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: '1px solid #e9eaec'
                                }
                            }, params.row.monthIncoming.mRealityIncome),
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    lineHeight: '30px',
                                    width: '33.3%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: 'none'
                                }
                            }, params.row.monthIncoming.realIncomeLv),
                        ])
                    }
                },
                {
                    "title": "盈亏状态（计费）",
                    "key": "show",
                    "width": 350,
                    renderHeader: (h) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    textAlign: 'center',
                                     height:'30px',
                                    lineHeight:'30px',
                                    borderBottom: '1px solid #e9eaec'
                                }
                            }, '盈亏状态（计费）'),
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
                                }, '计费盈亏'),
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        lineHeight: '30px',
                                        width: '50%',
                                        textAlign: 'center',
                                        borderBox: 'box-sizing',
                                        borderRight: 'none'
                                    }
                                }, '计费盈亏率')

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
                            }, params.row.profitStatus. billProfitAndLoss),
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    lineHeight: '30px',
                                    width: '50%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: 'none'
                                }
                            }, params.row.profitStatus. billProfitAndLossLv)
                        ])
                    }
                },
                {
                    "title": "盈亏状态（实收）",
                    "key": "show",
                    "width": 350,
                    renderHeader: (h) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    textAlign: 'center',
                                     height:'30px',
                                    lineHeight:'30px',
                                    borderBottom: '1px solid #e9eaec'
                                }
                            }, '盈亏状态（实收）'),
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
                                }, '实收盈亏'),
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        lineHeight: '30px',
                                        width: '50%',
                                        textAlign: 'center',
                                        borderBox: 'box-sizing',
                                        borderRight: 'none'
                                    }
                                }, '实收盈亏率')

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
                            }, params.row.actualProfit.realProfitAndLoss),
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    lineHeight: '30px',
                                    width: '50%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: 'none'
                                }
                            }, params.row.actualProfit.realProfitAndLossLv)
                        ])
                    }
                },
                {
                    "title": "单车产出",
                    "key": "show",
                    "width": 350,
                    renderHeader: (h) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    textAlign: 'center',
                                     height:'30px',
                                    lineHeight:'30px',
                                    borderBottom: '1px solid #e9eaec'
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
                                        borderRight: 'none'
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
                            }, params.row.singleCar.oBilling),
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    lineHeight: '30px',
                                    width: '50%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: 'none'
                                }
                            }, params.row.singleCar.oReality)
                        ])
                    }
                }
            ],
            data7: [
                {
                    cityName: '',
                    monthIncoming: {
                        mBillingIncome: '',//月收入-计费
                        mRealityIncome: '',//月收入-实收
                        realIncomeLv: ''//月收入-实收率
                    },
                    profitStatus: {
                        billProfitAndLoss: '',//盈亏状态(计费)-计费盈亏
                        billProfitAndLossLv: '',//盈亏状态(计费)-计费盈亏率
                    },
                    actualProfit: {
                        realProfitAndLoss: '',//盈亏状态(实收)-实收盈亏
                        realProfitAndLossLv: '',//盈亏状态(实收)-实收盈亏率
                    },
                    singleCar: {
                        oBilling: '',//单车产出-计费
                        oReality: '',//单车产出-实收
                    }
                }
            ]
        }
    },
    methods: {
        changePage() {
            this.spinShow = true
            // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
            // var that = this
            // setTimeout(function() {
                this.axios('/beefly/monthDataDetail/api/v1/monthDataDetail', {
                    params: {
                        dataMonth: this.dataMonth,
                        accessToken: this.$store.state.token,
                        type: 3
                    }
                }).then((response) => {
                    this.spinShow = false
                    var data = response.data.data
                    var arr = [];
                  var message = response.data.message
                    if(message === '用户登录超时'){
                        this.$router.push({path:'/login'})
                    }
                    if (data.length > 0) {
                        this.isNoData = true
                        this.isNoData2 = false
                    } else {
                         this.isNoData = false
                        this.isNoData2 = true
                    }
                    for (var i = 0; i < data.length; i++) {
                        if (i < data.length - 1) {
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
                            this.countObj = data.pop()
                            var obj = this.countObj
                                    var html = `
                                        <tr class="ivu-table-row">
                                            <td class="ivu-table-cell">
                                                <div class="ivu-table-cell ">
                                                    <span>合计</span>
                                                </div>
                                            </td>
                                            <td class="">
                                                <div class="ivu-table-cell">
                                                    <div>
                                                        <span style="display: inline-block; line-height: 30px; width: 33.3%; text-align: center; border-right: 1px solid rgb(233, 234, 236);">${obj.mBillingIncome}</span><span style="display: inline-block; line-height: 30px; width: 33.3%; text-align: center; border-right: 1px solid rgb(233, 234, 236);">${obj.mRealityIncome}</span><span style="display: inline-block; line-height: 30px; width: 33.3%; text-align: center; border-right: none;">${obj.realIncomeLv}</span></div>
                                                </div>
                                            </td>
                                            <td class="">
                                                <div class="ivu-table-cell">
                                                    <div>
                                                        <span style="display: inline-block; line-height: 30px; width: 50%; text-align: center; border-right: 1px solid rgb(233, 234, 236);">${obj.billProfitAndLoss }</span><span style="display: inline-block; line-height: 30px; width: 50%; text-align: center; border-right: none;">${obj.billProfitAndLossLv }</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="">
                                                <div class="ivu-table-cell">
                                                    <div>
                                                        <span style="display: inline-block; line-height: 30px; width: 50%; text-align: center; border-right: 1px solid rgb(233, 234, 236);">${obj.realProfitAndLoss}</span><span style="display: inline-block; line-height: 30px; width: 50%; text-align: center; border-right: none;">${obj.realProfitAndLossLv}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="">
                                                <div class="ivu-table-cell">
                                                    <div>
                                                        <span style="display: inline-block; line-height: 30px; width: 50%; text-align: center; border-right: 1px solid rgb(233, 234, 236);">${obj.oBilling}</span><span style="display: inline-block; line-height: 30px; width: 50%; text-align: center; border-right: none;">${obj.oReality}</span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        `
                                    // $('div.ivu-tabs-tabpane').eq(2).find('.ivu-table-header').find('table').width('100%')
                                    // $('div.ivu-tabs-tabpane').eq(2).find('.ivu-table-body').find('table').width('100%')
                                    $('div.ivu-tabs-tabpane').eq(2).find('.ivu-table-body').find('table').find('tfoot').remove()
                                    $('div.ivu-tabs-tabpane').eq(2).find('.ivu-table-body').find('table').append('<tfoot>' + html + '</tfoot>')
                                    $('div.ivu-tabs-tabpane').eq(2).find('.ivu-table-fixed-body').find('table').find('tfoot').remove()
                                    $('div.ivu-tabs-tabpane').eq(2).find('.ivu-table-fixed-body').find('table').append('<tfoot>' + html + '</tfoot>')
                        
                        }
                    }
                    this.data7 = arr
                }).catch((error) => {
                    console.log(error)
                      that.spinShow = false
                })
            // }, 200)
        }
    },
    computed: {
        ...mapGetters(['dataMonth'])
    },
   
    beforeMount(){
        //this.changePage()
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
div.container {
    padding: 0 16px 0 16px;
}
div.fiexedAssets {
    padding: 0 16px 16px 16px;
    height:400px;
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

