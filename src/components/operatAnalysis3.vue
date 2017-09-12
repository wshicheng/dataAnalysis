<template>
    <div class="container">
        <div class="nodata" v-show="isNoData">
            <i class="iconfont icon-zanwushuju"></i>
        </div>
        <Table id="fiexedAssets6" :columns="columns8" min-width='1200' :data="data7" size="small" border ref="table"></Table>
    </div>
</template>
<script>
import $ from 'jquery'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            isNoData: false,
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
                    "fixed": "left",
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
            // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
            var that = this
            setTimeout(function() {
                that.axios('/beefly/monthDataDetail/api/v1/monthDataDetail', {
                    params: {
                        dataMonth: that.dataMonth,
                        accessToken: that.$store.state.token,
                        type: 3
                    }
                }).then((response) => {
                    var data = response.data.data
                    var arr = [];
                    if (data.length > 0) {
                        that.isNoData = false
                    } else {
                        that.isNoData = true
                        return
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
                            that.countObj = data[data.length - 1]
                        }
                        that.$nextTick(()=>{
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
                                                <span style="display: inline-block; line-height: 30px; width: 33.3%; text-align: center; border-right: 1px solid rgb(233, 234, 236);">${countObj.mBillingIncome}</span><span style="display: inline-block; line-height: 30px; width: 33.3%; text-align: center; border-right: 1px solid rgb(233, 234, 236);">${countObj.mRealityIncome}</span><span style="display: inline-block; line-height: 30px; width: 33.3%; text-align: center; border-right: none;">${countObj.realIncomeLv}</span></div>
                                        </div>
                                    </td>
                                    <td class="">
                                        <div class="ivu-table-cell">
                                            <div>
                                                <span style="display: inline-block; line-height: 30px; width: 50%; text-align: center; border-right: 1px solid rgb(233, 234, 236);">${countObj.billProfitAndLoss }</span><span style="display: inline-block; line-height: 30px; width: 50%; text-align: center; border-right: none;">${countObj.billProfitAndLossLv }</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="">
                                        <div class="ivu-table-cell">
                                            <div>
                                                <span style="display: inline-block; line-height: 30px; width: 50%; text-align: center; border-right: 1px solid rgb(233, 234, 236);">${countObj.realProfitAndLoss}</span><span style="display: inline-block; line-height: 30px; width: 50%; text-align: center; border-right: none;">${countObj.realProfitAndLossLv}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="">
                                        <div class="ivu-table-cell">
                                            <div>
                                                <span style="display: inline-block; line-height: 30px; width: 50%; text-align: center; border-right: 1px solid rgb(233, 234, 236);">${countObj.oBilling}</span><span style="display: inline-block; line-height: 30px; width: 50%; text-align: center; border-right: none;">${countObj.oReality}</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                `
                                console.log(html)
                            $('div.ivu-tabs-tabpane').eq(5).find('.ivu-table-header').find('table').width('100%')
                            $('div.ivu-tabs-tabpane').eq(5).find('.ivu-table-body').find('table').width('100%')
                            $('div.ivu-tabs-tabpane').eq(5).find('.ivu-table-body').find('table').find('tfoot').remove()
                            $('div.ivu-tabs-tabpane').eq(5).find('.ivu-table-body').find('table').append('<tfoot>' + html + '</tfoot>')
                            $('div.ivu-tabs-tabpane').eq(5).find('.ivu-table-fixed-body').find('table').find('tfoot').remove()
                            $('div.ivu-tabs-tabpane').eq(5).find('.ivu-table-fixed-body').find('table').append('<tfoot>' + html + '</tfoot>')
                        })
                      
                    }
                    console.log(arr)
                    that.data7 = arr
                }).catch((error) => {
                    console.log(error)
                })
            }, 2000)
        }
    },
    computed: {
        ...mapGetters(['dataMonth'])
    },
    mounted() {
       

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
</style>

