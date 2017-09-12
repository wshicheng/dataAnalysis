<template>
    <!--基础数据-->
    <div class="fiexedAssets">
      <Spin fix>
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
         <div class="nodata" v-show="!isNoData2">
            <i class="iconfont icon-zanwushuju"></i>
        </div>
        <Table v-show="isNoData" id="fiexedAssets" min-width="1180" height="400" border :columns="columns2" :data="data4"></Table>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import $ from 'jquery'

export default {
    data() {
        return {
            spinShow:true,
            isNoData:false,
            isNoData2:true,
            countObj: {},
            columns2: [
                {
                    title: '城市',
                    key: 'cityName',
                    width: 100,
                    fixed: 'left',
                    className: 'middle',
                    render: (h, params) => {
                        return h('div', params.row.cityName)
                    },
                    renderHeader: (h, params) => {
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
                    title: '车辆',
                    key: 'beefly',
                    width: 300,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', {
                            style: {
                                height: '30px',
                            }
                        }, [
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '50%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.beefly.num),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '50%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.beefly.money)
                            ])
                    },
                    renderHeader: (h, params) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    width: '100%',
                                    lineHeight: '30px',
                                    borderBottom: '1px solid #e9eaec ',
                                     backgroundColor:'#7eb5e0'
                                }
                            }, '车辆'),
                            h('div', {
                                style: {
                                    width: '100%',
                                    lineHeight: '30px',
                                    borderBottom: '1px solid #e9eaec '
                                }
                            }, [
                                    h('span', {
                                        style: {
                                            float: 'left',
                                            width: '50%',
                                            borderRight: '1px solid rgb(233, 234, 236)',
                                            boxSizing: 'border-box',
                                        }
                                    }, '数量'),
                                    h('span', '金额')
                                ])
                        ])
                    }
                },
                {
                    title: '电池',
                    key: 'Battery',
                    width: 300,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', {
                            style: {
                                height: '30px'
                            }
                        }, [
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '50%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.Battery.num),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '50%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.Battery.money)
                            ])
                    },
                    renderHeader: (h, params) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    width: '100%',
                                    lineHeight: '30px',
                                    borderBottom: '1px solid #e9eaec ',
                                    backgroundColor:'#7eb5e0'
                                }
                            }, '电池'),
                            h('div', {
                                style: {
                                    width: '100%',
                                    lineHeight: '30px',
                                    borderBottom: '1px solid #e9eaec '
                                }
                            }, [
                                    h('span', {
                                        style: {
                                            float: 'left',
                                            width: '50%',
                                            borderRight: '1px solid rgb(233, 234, 236)',
                                            boxSizing: 'border-box',
                                        }
                                    }, '数量'),
                                    h('span', '金额')
                                ])
                        ])
                    }
                },
                {
                    title: '充电站',
                    key: 'ChargingStation',
                    width: 300,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', {
                            style: {
                                height: '30px'
                            }
                        }, [
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '50%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.ChargingStation.build),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '50%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.ChargingStation.cabinet)
                            ])
                    },
                    renderHeader: (h, params) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    width: '100%',
                                    lineHeight: '30px',
                                    borderBottom: '1px solid #e9eaec ',
                                    backgroundColor:'#7eb5e0'
                                }
                            }, '充电站'),
                            h('div', {
                                style: {
                                    width: '100%',
                                    lineHeight: '30px',
                                    borderBottom: '1px solid #e9eaec '
                                }
                            }, [
                                    h('span', {
                                        style: {
                                            float: 'left',
                                            width: '50%',
                                            borderRight: '1px solid rgb(233, 234, 236)',
                                            boxSizing: 'border-box',
                                        }
                                    }, '建设'),
                                    h('span', '电柜')
                                ])
                        ])
                    }
                },
                {
                    title: '机动车',
                    key: 'Tricycle',
                    width: 300,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', {
                            style: {
                                height: '30px'
                            }
                        }, [
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '50%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.Tricycle.num),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '50%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.Tricycle.money)
                            ])
                    },
                    renderHeader: (h, params) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    width: '100%',
                                    lineHeight: '30px',
                                    borderBottom: '1px solid #e9eaec ',
                                    backgroundColor:'#7eb5e0'
                                }
                            }, '机动车'),
                            h('div', {
                                style: {
                                    width: '100%',
                                    lineHeight: '30px',
                                    borderBottom: '1px solid #e9eaec '
                                }
                            }, [
                                    h('span', {
                                        style: {
                                            float: 'left',
                                            width: '50%',
                                            borderRight: '1px solid rgb(233, 234, 236)',
                                            boxSizing: 'border-box',
                                        }
                                    }, '数量'),
                                    h('span', '金额')
                                ])
                        ])
                    }
                },
                {
                    title: '运维工具车',
                    key: 'Toolcar',
                    width: 300,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', {
                            style: {
                                height: '30px'
                            }
                        }, [
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '50%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.Toolcar.num),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '50%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.Toolcar.money)
                            ])
                    },
                    renderHeader: (h, params) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    width: '100%',
                                    lineHeight: '30px',
                                    borderBottom: '1px solid #e9eaec ',
                                    backgroundColor:'#7eb5e0'
                                }
                            }, '运维工具车'),
                            h('div', {
                                style: {
                                    width: '100%',
                                    lineHeight: '30px',
                                    borderBottom: '1px solid #e9eaec '
                                }
                            }, [
                                    h('span', {
                                        style: {
                                            float: 'left',
                                            width: '50%',
                                            borderRight: '1px solid rgb(233, 234, 236)',
                                            boxSizing: 'border-box',
                                        }
                                    }, '数量'),
                                    h('span', '金额')
                                ])
                        ])
                    }
                },
                {
                    title: '物流成本',
                    key: 'transCost',
                    width: 300,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', params.row.transCost.money)
                    },
                    renderHeader: (h, params) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    width: '100%',
                                    lineHeight: '30px',
                                    borderBottom: '1px solid #e9eaec ',
                                    backgroundColor:'#7eb5e0'
                                }
                            }, '物流成本'),
                            h('div', {
                                style: {
                                    width: '100%',
                                    lineHeight: '30px',
                                    borderBottom: '1px solid #e9eaec '
                                }
                            }, [
                                    h('span', '金额')

                                ])
                        ])
                    }
                },
                {
                    title: '办公成本',
                    key: 'officeCost',
                    width: 300,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', params.row.officeCost.money)
                    },
                    renderHeader: (h, params) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    width: '100%',
                                    lineHeight: '30px',
                                    borderBottom: '1px solid #e9eaec ',
                                    backgroundColor:'#7eb5e0'
                                }
                            }, '办公成本'),
                            h('div', {
                                style: {
                                    width: '100%',
                                    lineHeight: '30px',
                                    borderBottom: '1px solid #e9eaec '
                                }
                            }, [
                                    h('span', '金额')

                                ])
                        ])
                    }
                },
                {
                    title: '其他金额',
                    key: 'otherCost',
                    width: 300,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', params.row.otherCost.money)
                    },
                    renderHeader: (h, params) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    width: '100%',
                                    lineHeight: '30px',
                                    borderBottom: '1px solid #e9eaec ',
                                    backgroundColor:'#7eb5e0'
                                }
                            }, '其他金额'),
                            h('div', {
                                style: {
                                    width: '100%',
                                    lineHeight: '30px',
                                    borderBottom: '1px solid #e9eaec '
                                }
                            }, [
                                    h('span', '金额')

                                ])
                        ])
                    }
                },
                {
                    title: '人员成本',
                    key: 'personnelCost',
                    width: 300,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', params.row.personnelCost.money)
                    },
                    renderHeader: (h, params) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    width: '100%',
                                    lineHeight: '30px',
                                    borderBottom: '1px solid #e9eaec ',
                                    background: 'pink'
                                }
                            }, '人员成本'),
                            h('div', {
                                style: {
                                    width: '100%',
                                    lineHeight: '30px',
                                    borderBottom: '1px solid #e9eaec '
                                }
                            }, [
                                    h('span', '金额')

                                ])
                        ])
                    }
                },
                {
                    title: '房租(生产)',
                    key: 'rentCost',
                    width: 300,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', params.row.rentCost.money)
                    },
                    renderHeader: (h, params) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    width: '100%',
                                    lineHeight: '30px',
                                    borderBottom: '1px solid #e9eaec ',
                                    background: 'pink'
                                }
                            }, '房租(生产)'),
                            h('div', {
                                style: {
                                    width: '100%',
                                    lineHeight: '30px',
                                    borderBottom: '1px solid #e9eaec '
                                }
                            }, [
                                    h('span', '金额')

                                ])
                        ])
                    }
                },
                {
                    title: '水电(生产)',
                    key: 'city',
                    width: 300,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', params.row.hydropoer.money)
                    },
                    renderHeader: (h, params) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    width: '100%',
                                    lineHeight: '30px',
                                    borderBottom: '1px solid #e9eaec ',
                                    background: 'pink'
                                }
                            }, '水电(生产)'),
                            h('div', {
                                style: {
                                    width: '100%',
                                    lineHeight: '30px',
                                    borderBottom: '1px solid #e9eaec '
                                }
                            }, [
                                    h('span', '金额')

                                ])
                        ])
                    }
                },
                {
                    title: '经营费用',
                    key: 'manageCost',
                    width: 300,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', params.row.manageCost.money)
                    },
                    renderHeader: (h, params) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    width: '100%',
                                    lineHeight: '30px',
                                    borderBottom: '1px solid #e9eaec ',
                                    background: 'pink'
                                }
                            }, '经营费用'),
                            h('div', {
                                style: {
                                    width: '100%',
                                    lineHeight: '30px',
                                    borderBottom: '1px solid #e9eaec '
                                }
                            }, [
                                    h('span', '金额')

                                ])
                        ])
                    }
                },
                {
                    title: '开城费用',
                    key: 'openCost',
                    width: 300,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', params.row.openCost.money)
                    },
                    renderHeader: (h, params) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    width: '100%',
                                    lineHeight: '30px',
                                    borderBottom: '1px solid #e9eaec ',
                                    background: 'pink'
                                }
                            }, '开城费用'),
                            h('div', {
                                style: {
                                    width: '100%',
                                    lineHeight: '30px',
                                    borderBottom: '1px solid #e9eaec ',
                                }
                            }, [
                                    h('span', '金额')

                                ])
                        ])
                    }
                },
                {
                    title: '合计',
                    key: 'total',
                    width: 100,
                    fixed: 'right',
                    className: 'middle',
                    render: (h, params) => {
                        return h('div', params.row.total.money)
                    },
                    renderHeader: (h, params) => {
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
            data4: [],
          
        }
    },
    computed: {
        ...mapGetters(['dataMonth'])
    },
    methods: {
        mockTableData() {
            let data = [];
            for (let i = 0; i < 10; i++) {
                data.push(
                    {
                        // 城市
                        cityName: '城市' + Math.floor(Math.random() * 100 + 1),
                        //车辆数量
                        beefly: {
                            num: Math.floor(Math.random() * 3 + 1),
                            money: Math.floor(Math.random() * 4 + 1),
                        },
                        //电池
                        Battery: {
                            num: Math.floor(Math.random() * 7 + 1),
                            money: Math.floor(Math.random() * 8 + 1),
                        },
                        // 充电站
                        ChargingStation: {
                            build: Math.floor(Math.random() * 9 + 1),
                            cabinet: Math.floor(Math.random() * 10 + 1)
                        },
                        //机动车
                        Tricycle: {
                            num: Math.floor(Math.random() * 5 + 1),
                            money: Math.floor(Math.random() * 6 + 1),
                        },
                        //运维工具车
                        Toolcar: {
                            num: Math.floor(Math.random() * 5 + 1),
                            money: Math.floor(Math.random() * 6 + 1),
                        },
                        // 物流成本
                        transCost: {
                            money: Math.floor(Math.random() * 11 + 1)
                        },
                        //办公成本
                        officeCost: {
                            money: Math.floor(Math.random() * 11 + 1)
                        },
                        // 其他金额
                        otherCost: {
                            money: Math.floor(Math.random() * 11 + 1)
                        },
                        // 人员成本
                        personnelCost: {
                            money: Math.floor(Math.random() * 11 + 1)
                        },
                        // 房租
                        rentCost: {
                            money: Math.floor(Math.random() * 11 + 1)
                        },
                        //水电
                        hydropoer: {
                            money: Math.floor(Math.random() * 11 + 1)
                        },
                        // 经营费用
                        manageCost: {
                            money: Math.floor(Math.random() * 11 + 1)
                        },
                        openCost: {
                            money: Math.floor(Math.random() * 11 + 1)
                        },
                        total: {
                            money: Math.floor(Math.random() * 14 + 1)
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
            that.axios('/beefly/monthDataDetail/api/v1/monthDataDetail', {
                params: {
                    dataMonth: that.dataMonth,
                    accessToken: that.$store.state.token,
                    type: 1
                }
                }).then((response) => {
                    that.spinShow = false
                    var data = response.data.data||[]
                    var message = response.data.message
                    if(message === '用户登录超时'){
                        that.$router.push({path:'/login'})
                    }
                    var arr = [];
                    if (data.length > 0) {
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
                                this.countObj = data[data.length - 1]
                            }

                        }
                    }
                    if(data.length>0){
                        
                        that.isNoData = true
                        that.isNoData2 = true
                    }else{
                        that.isNoData = false
                        that.isNoData2 = false
                        return
                    }
                    that.data4 = arr
                    var html = ''
                    for (var i = 0; i < 1; i++) {
                        html += `
                    <tr class="ivu-table-row">
                        <td class="middle ivu-table-hidden">
                            <div class="ivu-table-cell ivu-table-hidden">
                                <div>城市15</div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div style="height: 30px;">
                                <span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.bikeNum}</span>
                                    <span
                                        style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.bikeMoney}</span>
                                </div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div style="height: 30px;">
                                    <span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.battNum}</span>
                                    <span
                                        style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.battMoney}</span>
                                </div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div style="height: 30px;">
                                <span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.chargeBuild}</span>
                                    <span
                                        style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.chargeCabinet}</span>
                                </div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div style="height: 30px;">
                                <span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.truckNum}</span>
                                    <span
                                        style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.truckMoney}</span>
                                </div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div style="height: 30px;">
                                <span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.carNum}</span>
                                    <span
                                        style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.carMoney }</span>
                                </div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div>${countObj.transMoney}</div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div>${countObj.officeMoney }</div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div>${countObj.otherMoney}</div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div>${countObj.personnelMoney}</div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div>${countObj.rentMoney}</div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div>${countObj.hydropower}</div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div>${countObj.manageMoney}</div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div>${countObj.openMoney}</div>
                            </div>
                        </td>
                    
                    </tr>
                    `
                    }
                    if(that.data4.length>0){
                        $('.ivu-table-body').eq(0).find('table').find('tfoot').remove()
                        $('.ivu-table-body').eq(0).find('table').append("<tfoot><tr>" + html + "</tr></tfoot>")
                        $('.ivu-tabs-tabpane').eq(0).find('.ivu-table-fixed').find('.ivu-table-fixed-body').find('table').find('tfoot').remove()
                        $('.ivu-tabs-tabpane').eq(0).find('.ivu-table-fixed').find('.ivu-table-fixed-body').find('table').append('<tfoot><td class="middle"><div class="ivu-table-cell"><div>合计</div></div></td></tfoot>')
                        $('.ivu-tabs-tabpane').eq(0).find('.ivu-table-fixed-right').find('.ivu-table-fixed-body').find('table').find('tfoot').remove()
                        $('.ivu-tabs-tabpane').eq(0).find('.ivu-table-fixed-right').find('.ivu-table-fixed-body').find('table').append('<tfoot><tr class="ivu-table-row"><td class="middle"><div class="ivu-table-cell"><div>'+this.countObj.total+'</div></div></td></tr></tfoot>')
                    }else{
                        $('.ivu-table-body').eq(0).find('table').find('tfoot').remove()
                        $('.ivu-tabs-tabpane').eq(0).find('.ivu-table-fixed').find('.ivu-table-fixed-body').find('table').find('tfoot').remove()
                        $('.ivu-tabs-tabpane').eq(0).find('.ivu-table-fixed-right').find('.ivu-table-fixed-body').find('table').find('tfoot').remove()
                    }
                   
                }).catch((error) => {
                    console.log(error)
                })
            }, 200)
        }
    },
    mounted() {
        var that = this
       this.changePage()
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
div.ivu-table-wrapper {
    margin: 0 auto;
}

div.fiexedAssets {
    padding: 0 16px 16px 16px;
    height:400px;
    box-sizing: border-box;
    position:relative;
    .demo-spin-icon-load{
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

