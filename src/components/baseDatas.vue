<template>
    <!--基础数据demo-->
    <div class="container fiexedAssets">
         <Spin v-show="spinShow" fix>
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div style="color:rgb(204, 204, 204);">Loading</div>
            </Spin>
        <div class="nodata" v-show="isNoData2">
            <i class="iconfont icon-zanwushuju"></i>
        </div>
        <Table v-show="isNoData" id="fiexedAssets5" :columns="columns8" min-width='1200' :data="data7" size="small" border ref="table"></Table>
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
                    "title": "车辆",
                    "width": 350,
                    renderHeader: (h) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    textAlign: 'center',
                                    background:'#7eb5e0',
                                    borderBottom: '1px solid #e9eaec'
                                }
                            }, '车辆'),
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
                                }, '数量'),
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        lineHeight: '30px',
                                        width: '50%',
                                        textAlign: 'center',
                                        borderBox: 'box-sizing',
                                        borderRight: '1px solid #e9eaec'
                                    }
                                }, '金额')

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
                            }, params.row.beefly.num),
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    lineHeight: '30px',
                                    width: '50%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: '1px solid #e9eaec'
                                }
                            }, params.row.beefly.money)
                        ])
                    }
                },
                {
                    "title": "电池",
                    "width": 350,
                    renderHeader: (h) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    textAlign: 'center',
                                    background:'#7eb5e0',
                                    borderBottom: '1px solid #e9eaec'
                                }
                            }, '电池'),
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
                                }, '数量'),
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        lineHeight: '30px',
                                        width: '50%',
                                        textAlign: 'center',
                                        borderBox: 'box-sizing',
                                        borderRight: '1px solid #e9eaec'
                                    }
                                }, '金额')

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
                            }, params.row.Battery.num),
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    lineHeight: '30px',
                                    width: '50%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: '1px solid #e9eaec'
                                }
                            }, params.row.Battery.money)
                        ])
                    }
                },
                {
                    "title": "充电站",
                    "width": 350,
                    renderHeader: (h) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    textAlign: 'center',
                                    background:'#7eb5e0',
                                    borderBottom: '1px solid #e9eaec'
                                }
                            }, '充电站'),
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
                                }, '数量'),
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        lineHeight: '30px',
                                        width: '50%',
                                        textAlign: 'center',
                                        borderBox: 'box-sizing',
                                        borderRight: '1px solid #e9eaec'
                                    }
                                }, '金额')

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
                            }, params.row.ChargingStation.build),
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    lineHeight: '30px',
                                    width: '50%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: '1px solid #e9eaec'
                                }
                            }, params.row.ChargingStation.cabinet)
                        ])
                    }
                },
                {
                    "title": "机动车",
                    "width": 350,
                    renderHeader: (h) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    textAlign: 'center',
                                    background:'#7eb5e0',
                                    borderBottom: '1px solid #e9eaec'
                                }
                            }, '机动车'),
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
                                }, '数量'),
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        lineHeight: '30px',
                                        width: '50%',
                                        textAlign: 'center',
                                        borderBox: 'box-sizing',
                                        borderRight: '1px solid #e9eaec'
                                    }
                                }, '金额')

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
                            }, params.row.Tricycle.num),
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    lineHeight: '30px',
                                    width: '50%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: '1px solid #e9eaec'
                                }
                            }, params.row.Tricycle.money)
                        ])
                    }
                },
                {
                    "title": "运维工具车",
                    "width": 350,
                    renderHeader: (h) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    textAlign: 'center',
                                    background:'#7eb5e0',
                                    borderBottom: '1px solid #e9eaec'
                                }
                            }, '运维工具车'),
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
                                }, '数量'),
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        lineHeight: '30px',
                                        width: '50%',
                                        textAlign: 'center',
                                        borderBox: 'box-sizing',
                                        borderRight: '1px solid #e9eaec'
                                    }
                                }, '金额')

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
                            },  params.row.Toolcar.num),
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    lineHeight: '30px',
                                    width: '50%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: '1px solid #e9eaec'
                                }
                            }, params.row.Toolcar.money)
                        ])
                    }
                },
                {
                    "title": "物流成本",
                    "width": 350,
                    renderHeader: (h) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    textAlign: 'center',
                                    background:'#7eb5e0',
                                    borderBottom: '1px solid #e9eaec'
                                }
                            }, '物流成本'),
                            h('div', [
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        lineHeight: '30px',
                                        width: '100%',
                                        textAlign: 'center',
                                        borderBox: 'box-sizing',
                                        borderRight: 'none'
                                    }
                                }, '金额')

                            ])
                        ])
                    },
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    lineHeight: '30px',
                                    width: '100%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: '1px solid #e9eaec'
                                }
                            }, params.row.transCost.money)
                        ])
                    }
                },
                {
                    "title": "办公成本",
                    "width": 350,
                    renderHeader: (h) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    textAlign: 'center',
                                    background:'#7eb5e0',
                                    borderBottom: '1px solid #e9eaec'
                                }
                            }, '办公成本'),
                            h('div', [
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        lineHeight: '30px',
                                        width: '100%',
                                        textAlign: 'center',
                                        borderBox: 'box-sizing',
                                        borderRight: 'none'
                                    }
                                }, '金额')

                            ])
                        ])
                    },
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    lineHeight: '30px',
                                    width: '100%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: '1px solid #e9eaec'
                                }
                            }, params.row.officeCost.money)
                        ])
                    }
                },
                {
                    "title": "其他",
                    "width": 350,
                    renderHeader: (h) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    textAlign: 'center',
                                    background:'#7eb5e0',
                                    borderBottom: '1px solid #e9eaec'
                                }
                            }, '其他'),
                            h('div', [
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        lineHeight: '30px',
                                        width: '100%',
                                        textAlign: 'center',
                                        borderBox: 'box-sizing',
                                        borderRight: 'none'
                                    }
                                }, '金额')

                            ])
                        ])
                    },
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    lineHeight: '30px',
                                    width: '100%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: '1px solid #e9eaec'
                                }
                            }, params.row.otherCost.money)
                        ])
                    }
                },
                {
                    "title": "人员成本",
                    "width": 350,
                    renderHeader: (h) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    textAlign: 'center',
                                    background:'#f2b5af',
                                    borderBottom: '1px solid #e9eaec'
                                }
                            }, '人员成本'),
                            h('div', [
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        lineHeight: '30px',
                                        width: '100%',
                                        textAlign: 'center',
                                        borderBox: 'box-sizing',
                                        borderRight: 'none'
                                    }
                                }, '金额')

                            ])
                        ])
                    },
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    lineHeight: '30px',
                                    width: '100%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: '1px solid #e9eaec'
                                }
                            }, params.row.personnelCost.money)
                        ])
                    }
                },
                {
                    "title": "房租生产",
                    "width": 350,
                    renderHeader: (h) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    textAlign: 'center',
                                     background:'#f2b5af',
                                    borderBottom: '1px solid #e9eaec'
                                }
                            }, '房租生产'),
                            h('div', [
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        lineHeight: '30px',
                                        width: '100%',
                                        textAlign: 'center',
                                        borderBox: 'box-sizing',
                                        borderRight: 'none'
                                    }
                                }, '金额')

                            ])
                        ])
                    },
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    lineHeight: '30px',
                                    width: '100%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: '1px solid #e9eaec'
                                }
                            }, params.row.rentCost.money)
                        ])
                    }
                },
                {
                    "title": "水电生产",
                    "width": 350,
                    renderHeader: (h) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    textAlign: 'center',
                                     background:'#f2b5af',
                                    borderBottom: '1px solid #e9eaec'
                                }
                            }, '水电生产'),
                            h('div', [
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        lineHeight: '30px',
                                        width: '100%',
                                        textAlign: 'center',
                                        borderBox: 'box-sizing',
                                        borderRight: 'none'
                                    }
                                }, '金额')

                            ])
                        ])
                    },
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    lineHeight: '30px',
                                    width: '100%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: '1px solid #e9eaec'
                                }
                            }, params.row.hydropoer.money)
                        ])
                    }
                },
                {
                    "title": "经营费用",
                    "width": 350,
                    renderHeader: (h) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    textAlign: 'center',
                                    background:'#f2b5af',
                                    borderBottom: '1px solid #e9eaec'
                                }
                            }, '经营费用'),
                            h('div', [
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        lineHeight: '30px',
                                        width: '100%',
                                        textAlign: 'center',
                                        borderBox: 'box-sizing',
                                        borderRight: 'none'
                                    }
                                }, '金额')

                            ])
                        ])
                    },
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    lineHeight: '30px',
                                    width: '100%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: '1px solid #e9eaec'
                                }
                            }, params.row.manageCost.money)
                        ])
                    }
                },
                {
                    "title": "开城费用",
                    "width": 350,
                    renderHeader: (h) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    textAlign: 'center',
                                    background:'#f2b5af',
                                    borderBottom: '1px solid #e9eaec'
                                }
                            }, '开城费用'),
                            h('div', [
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        lineHeight: '30px',
                                        width: '100%',
                                        textAlign: 'center',
                                        borderBox: 'box-sizing',
                                        borderRight: 'none'
                                    }
                                }, '金额')

                            ])
                        ])
                    },
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    lineHeight: '30px',
                                    width: '100%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: '1px solid #e9eaec'
                                }
                            }, params.row.openCost.money)
                        ])
                    }
                },
                {
                    title: '合计',
                    key: 'total',
                    width: 100,
                    fixed: 'right',
                    render: (h, params) => {
                        return h('div',  params.row.total.money)
                    },
                    renderHeader: (h,) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    width: '100%',

                                }
                            }, '合计')

                        ])
                    }
                }
               
              
            ],
            data7: [
                {
                    // 城市
                    cityName: '',
                    //车辆数量
                    beefly: {
                        num: '',
                        money: '',
                    },
                    //电池
                    Battery: {
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
                    //办公成本
                    officeCost: {
                        money: ''
                    },
                    // 其他金额
                    otherCost: {
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
                    // 经营费用
                    manageCost: {
                        money: ''
                    },
                    openCost: {
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
        changePage() {
            this.spinShow = true
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
                    var arr = [];
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
                                        // 城市
                                        cityName: data[i].city,
                                        //车辆数量
                                        beefly: {
                                            num: data[i].bikeNum,
                                            money: data[i].bikeMoney,
                                        },
                                        //电池
                                        Battery: {
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
                                        //办公成本
                                        officeCost: {
                                            money: data[i].officeMoney
                                        },
                                        // 其他金额
                                        otherCost: {
                                            money: data[i].otherMoney
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
                                        // 经营费用
                                        manageCost: {
                                            money: data[i].manageMoney
                                        },
                                        openCost: {
                                            money: data[i].openMoney
                                        },
                                        total: {
                                            money: data[i].total
                                        }

                                    }
                                )
                        }
                        if (i === data.length - 1) {
                            this.countObj = data.pop()
                            var obj = this.countObj
                                    var html = `
                                        <tr class="ivu-table-row">
                        <td class="middle">
                            <div class="ivu-table-cell">
                                <div>合计</div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div style="height: 30px;">
                                <span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${obj.bikeNum}</span>
                                    <span
                                        style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${obj.bikeMoney}</span>
                                </div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div style="height: 30px;">
                                    <span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${obj.battNum}</span>
                                    <span
                                        style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${obj.battMoney}</span>
                                </div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div style="height: 30px;">
                                <span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${obj.chargeBuild}</span>
                                    <span
                                        style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${obj.chargeCabinet}</span>
                                </div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div style="height: 30px;">
                                <span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${obj.truckNum}</span>
                                    <span
                                        style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${obj.truckMoney}</span>
                                </div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div style="height: 30px;">
                                <span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${obj.carNum}</span>
                                    <span
                                        style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${obj.carMoney }</span>
                                </div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div>${obj.transMoney}</div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div>${obj.officeMoney }</div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div>${obj.otherMoney}</div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div>${obj.personnelMoney}</div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div>${obj.rentMoney}</div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div>${obj.hydropower}</div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div>${obj.manageMoney}</div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div>${obj.openMoney}</div>
                            </div>
                        </td>
                    
                    </tr>
                                        `
                            $('div.ivu-tabs-tabpane').eq(0).find('.ivu-table-header').find('table').width('100%')
                            $('div.ivu-tabs-tabpane').eq(0).find('.ivu-table-body').find('table').width('100%')
                            $('div.ivu-tabs-tabpane').eq(0).find('.ivu-table-body').find('table').find('tfoot').remove()
                            $('div.ivu-tabs-tabpane').eq(0).find('.ivu-table-body').find('table').append('<tfoot>' + html + '</tfoot>')
                            $('div.ivu-tabs-tabpane').eq(0).find('.ivu-table-fixed-body').find('table').find('tfoot').remove()
                            $('div.ivu-tabs-tabpane').eq(0).find('.ivu-table-fixed-body').find('table').append('<tfoot>' + html + '</tfoot>')
                            $('div.ivu-tabs-tabpane').eq(0).find('.ivu-table-fixed-right').find('.ivu-table-fixed-body').find('table').find('tfoot').remove()
                            $('div.ivu-tabs-tabpane').eq(0).find('.ivu-table-fixed-right').find('.ivu-table-fixed-body').find('table').append('<tfoot><tr class="ivu-table-row"><td class="middle"><div class="ivu-table-cell"><div>'+obj.total+'</div></div></td></tr></tfoot>')
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
    mounted() {
        

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

