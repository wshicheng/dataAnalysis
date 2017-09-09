<template>
 <!--运营成本-->
    <div class="fiexedAssets">
        <Table id="fiexedAssets" min-width="1180" height="400" border :columns="columns2" :data="data4"></Table>
    </div>
</template>
<script>
import $ from 'jquery'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            countObj:{},
            columns2: [
                {
                    title: '城市',
                    key: 'name',
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
                    title: '硬件摊销（按照3年折旧）',
                    key: 'age',
                    width: 920,
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
                                        width: '10%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.hardwareCost.bikeDepreciate),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '10%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.hardwareCost.battDepreciate),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '10%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.hardwareCost.chargeDepreciate),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '10%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.hardwareCost.truckDepreciate),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '10%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.hardwareCost.carDepreciate),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '10%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.hardwareCost.transMoneyShare),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '10%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.hardwareCost.officeDepreciate),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '10%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.hardwareCost.otherDepreciate),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '10%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.hardwareCost.totalDepreciate),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '10%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: 'none',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.hardwareCost.depreProporte)

                            ])
                    },
                    renderHeader: (h, params) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    width: '100%',
                                    lineHeight: '30px',
                                    borderBottom: '1px solid #e9eaec ',
                                    background: '#b2b2cc',
                                    color: '#fff'
                                }
                            }, '硬件摊销（按照3年折旧）'),
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
                                            width: '10%',
                                            borderRight: '1px solid rgb(233, 234, 236)',
                                            boxSizing: 'border-box',
                                        }
                                    }, '车辆折旧'),
                                    h('span', {
                                        style: {
                                            float: 'left',
                                            width: '10%',
                                            borderRight: '1px solid rgb(233, 234, 236)',
                                            boxSizing: 'border-box',
                                        }
                                    }, '电池折旧'),
                                    h('span', {
                                        style: {
                                            float: 'left',
                                            width: '10%',
                                            borderRight: '1px solid rgb(233, 234, 236)',
                                            boxSizing: 'border-box',
                                        }
                                    }, '充电站折旧'),
                                    h('span', {
                                        style: {
                                            float: 'left',
                                            width: '10%',
                                            borderRight: '1px solid rgb(233, 234, 236)',
                                            boxSizing: 'border-box',
                                        }
                                    }, '机动车折旧'),
                                    h('span', {
                                        style: {
                                            float: 'left',
                                            width: '10%',
                                            borderRight: '1px solid rgb(233, 234, 236)',
                                            boxSizing: 'border-box',
                                        }
                                    }, '运维工具车折旧'),
                                    h('span', {
                                        style: {
                                            float: 'left',
                                            width: '10%',
                                            borderRight: '1px solid rgb(233, 234, 236)',
                                            boxSizing: 'border-box',
                                        }
                                    }, '物流成本分摊'),
                                    h('span', {
                                        style: {
                                            float: 'left',
                                            width: '10%',
                                            borderRight: '1px solid rgb(233, 234, 236)',
                                            boxSizing: 'border-box',
                                        }
                                    }, '办公成本折旧'),
                                    h('span', {
                                        style: {
                                            float: 'left',
                                            width: '10%',
                                            borderRight: '1px solid rgb(233, 234, 236)',
                                            boxSizing: 'border-box',
                                        }
                                    }, '其他成本折旧'),
                                    h('span', {
                                        style: {
                                            float: 'left',
                                            width: '10%',
                                            borderRight: '1px solid rgb(233, 234, 236)',
                                            boxSizing: 'border-box',
                                        }
                                    }, '合计'),
                                    h('span', {
                                        style: {
                                            float: 'left',
                                            width: '10%',
                                            borderRight: 'none',
                                            boxSizing: 'border-box',
                                        }
                                    }, '成本占比'),

                                ])
                        ])
                    }
                },
                {
                    title: '硬件损耗(按照0.5%/月)',
                    key: 'age',
                    width: 920,
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
                                        width: '12.5%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.hardwareLoss.bikeWaste),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '12.5%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.hardwareLoss.battWaste),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '12.5%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.hardwareLoss.chargeWaste),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '12.5%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.hardwareLoss.truckWaste),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '12.5%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.hardwareLoss.carWaste),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '12.5%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.hardwareLoss.officeWaste),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '12.5%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.hardwareLoss.totalWaste),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '12.5%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.hardwareLoss.wasteProporte),


                            ])
                    },
                    renderHeader: (h, params) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    width: '100%',
                                    lineHeight: '30px',
                                    borderBottom: '1px solid #e9eaec ',
                                    background: 'rgb(31, 192, 230)',
                                    color: '#fff'
                                }
                            }, '硬件损耗(按照0.5%/月)'),
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
                                            width: '12.5%',
                                            borderRight: '1px solid rgb(233, 234, 236)',
                                            boxSizing: 'border-box',
                                        }
                                    }, '车辆损耗'),
                                    h('span', {
                                        style: {
                                            float: 'left',
                                            width: '12.5%',
                                            borderRight: '1px solid rgb(233, 234, 236)',
                                            boxSizing: 'border-box',
                                        }
                                    }, '电池损耗'),
                                    h('span', {
                                        style: {
                                            float: 'left',
                                            width: '12.5%',
                                            borderRight: '1px solid rgb(233, 234, 236)',
                                            boxSizing: 'border-box',
                                        }
                                    }, '充电站损耗'),
                                    h('span', {
                                        style: {
                                            float: 'left',
                                            width: '12.5%',
                                            borderRight: '1px solid rgb(233, 234, 236)',
                                            boxSizing: 'border-box',
                                        }
                                    }, '机动车损耗'),
                                    h('span', {
                                        style: {
                                            float: 'left',
                                            width: '12.5%',
                                            borderRight: '1px solid rgb(233, 234, 236)',
                                            boxSizing: 'border-box',
                                        }
                                    }, '运维工具车损耗'),
                                    h('span', {
                                        style: {
                                            float: 'left',
                                            width: '12.5%',
                                            borderRight: '1px solid rgb(233, 234, 236)',
                                            boxSizing: 'border-box',
                                        }
                                    }, '办公室成本损耗'),
                                    h('span', {
                                        style: {
                                            float: 'left',
                                            width: '12.5%',
                                            borderRight: '1px solid rgb(233, 234, 236)',
                                            boxSizing: 'border-box',
                                        }
                                    }, '合计'),
                                    h('span', {
                                        style: {
                                            float: 'left',
                                            width: '12.5%',
                                            borderRight: 'none',
                                            boxSizing: 'border-box',
                                        }
                                    }, '成本占比'),

                                ])
                        ])
                    }
                },
                {
                    title: '运维费用',
                    key: 'age',
                    width: 920,
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
                                        width: '14.28%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.expenses.personSalary),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '14.28%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.expenses.rentMoney),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '14.28%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.expenses.hydropower),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '14.28%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.expenses.manageMoney),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '14.28%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.expenses.openMoney),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '14.28%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.expenses.operateTotal),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '14.28%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: 'none',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.expenses.operateProporte),


                            ])
                    },
                    renderHeader: (h, params) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    width: '100%',
                                    lineHeight: '30px',
                                    borderBottom: '1px solid #e9eaec ',
                                    background: 'rgb(245, 106, 175)',
                                    color: '#fff'
                                }
                            }, '运维费用'),
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
                                            width: '14.28%',
                                            borderRight: '1px solid rgb(233, 234, 236)',
                                            boxSizing: 'border-box',
                                        }
                                    }, '人员工资'),
                                    h('span', {
                                        style: {
                                            float: 'left',
                                            width: '14.28%',
                                            borderRight: '1px solid rgb(233, 234, 236)',
                                            boxSizing: 'border-box',
                                        }
                                    }, '房租（生产）'),
                                    h('span', {
                                        style: {
                                            float: 'left',
                                            width: '14.28%',
                                            borderRight: '1px solid rgb(233, 234, 236)',
                                            boxSizing: 'border-box',
                                        }
                                    }, '水电（生产）'),
                                    h('span', {
                                        style: {
                                            float: 'left',
                                            width: '14.28%',
                                            borderRight: '1px solid rgb(233, 234, 236)',
                                            boxSizing: 'border-box',
                                        }
                                    }, '经营费用'),
                                    h('span', {
                                        style: {
                                            float: 'left',
                                            width: '14.28%',
                                            borderRight: '1px solid rgb(233, 234, 236)',
                                            boxSizing: 'border-box',
                                        }
                                    }, '开城费用'),
                                    h('span', {
                                        style: {
                                            float: 'left',
                                            width: '14.28%',
                                            borderRight: '1px solid rgb(233, 234, 236)',
                                            boxSizing: 'border-box',
                                        }
                                    }, '合计'),
                                    h('span', {
                                        style: {
                                            float: 'left',
                                            width: '14.28%',
                                            boxSizing: 'border-box',
                                        }
                                    }, '成本占比')
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
                        return h('div', params.row.totalCost.total)
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
            data4: this.mockTableData()
        }
    },
    computed:{
        ...mapGetters(['dataMonth'])
    },
    methods: {
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
            var that =  this
             setTimeout(function() {
            console.log(that.dataMonth)
            that.axios('/beefly/monthDataDetail/api/v1/monthDataDetail', {
                params: {
                    dataMonth: that.dataMonth,
                    accessToken: that.$store.state.token,
                    type: 2
                }
                }).then((response) => {
                    var data = response.data.data
                    var arr = [];
                    for (var i = 0; i < data.length; i++) {
                        if (i < data.length - 1) {
                            arr.push(
                                 {
                                    cityName: data[i].city,
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
                                        officeWaste: data[i].officeWaste,//办公成本损耗
                                        totalWaste: data[i].totalWaste,//损耗合计
                                        wasteProporte: data[i].wasteProporte,//损耗成本占比
                                    },
                                    expenses: {
                                        personSalary: data[i].personSalary,//人员工资
                                        rentMoney: data[i].rentMoney,//房租
                                        hydropower:data[i].hydropower,//水电
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
                                    <div>城市90</div>
                                </div>
                            </td>
                            <td class="ivu-table-column-center">
                                <div class="ivu-table-cell">
                                    <div style="height: 30px;"><span style="float: left; width: 10%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.bikeDepreciate}</span>
                                        <span
                                            style="float: left; width: 10%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.battDepreciate}</span><span style="float: left; width: 10%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.chargeDepreciate}</span>
                                            <span
                                                style="float: left; width: 10%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.truckDepreciate}</span><span style="float: left; width: 10%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.carDepreciate}</span>
                                                <span
                                                    style="float: left; width: 10%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.transMoneyShare}</span><span style="float: left; width: 10%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.officeDepreciate}</span>
                                                    <span
                                                        style="float: left; width: 10%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.otherDepreciate}</span><span style="float: left; width: 10%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.totalDepreciate}</span>
                                                        <span
                                                            style="float: left; width: 10%; height: 30px; line-height: 30px; border-right: none; box-sizing: border-box;">${countObj.depreProporte}</span>
                                    </div>
                                </div>
                            </td>
                            <td class="ivu-table-column-center">
                                <div class="ivu-table-cell">
                                    <div style="height: 30px;"><span style="float: left; width: 12.5%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.bikeWaste}</span>
                                        <span
                                            style="float: left; width: 12.5%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.battWaste}</span><span style="float: left; width: 12.5%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.chargeWaste}</span>
                                            <span
                                                style="float: left; width: 12.5%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.truckWaste}</span><span style="float: left; width: 12.5%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.carWaste}</span>
                                                <span
                                                    style="float: left; width: 12.5%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.officeWaste}</span><span style="float: left; width: 12.5%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.totalWaste}</span>
                                                    <span
                                                        style="float: left; width: 12.5%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.wasteProporte}</span>
                                    </div>
                                </div>
                            </td>
                            <td class="ivu-table-column-center">
                                <div class="ivu-table-cell">
                                    <div style="height: 30px;"><span style="float: left; width: 14.28%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.personSalary}</span>
                                        <span
                                            style="float: left; width: 14.28%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.rentMoney}</span><span style="float: left; width: 14.28%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.hydropower}</span>
                                            <span
                                                style="float: left; width: 14.28%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.manageMoney}</span><span style="float: left; width: 14.28%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.openMoney}</span>
                                                <span
                                                    style="float: left; width: 14.28%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">${countObj.operateTotal}</span><span style="float: left; width: 14.28%; height: 30px; line-height: 30px; border-right: none; box-sizing: border-box;">${countObj.operateProporte}</span></div>
                                </div>
                            </td>
                            <td class="middle ivu-table-hidden">
                                <div class="ivu-table-cell ivu-table-hidden">
                                    <div>${countObj.total}</div>
                                </div>
                            </td>
                        </tr>
                    `
                    }
                   if(that.data4.length>0){
                         $('.ivu-table-body').eq(1).find('table').find('tfoot').remove()
                        $('.ivu-table-body').eq(1).find('table').append("<tfoot><tr>" + html + "</tr></tfoot>")
                        $('.ivu-tabs-tabpane').eq(1).find('.ivu-table-fixed').find('.ivu-table-fixed-body').find('table').find('tfoot').remove()
                        $('.ivu-tabs-tabpane').eq(1).find('.ivu-table-fixed').find('.ivu-table-fixed-body').find('table').append('<tfoot><td class="middle"><div class="ivu-table-cell"><div>合计</div></div></td></tfoot>')
                        $('.ivu-tabs-tabpane').eq(1).find('.ivu-table-fixed-right').find('.ivu-table-fixed-body').find('table').find('tfoot').remove()
                        $('.ivu-tabs-tabpane').eq(1).find('.ivu-table-fixed-right').find('.ivu-table-fixed-body').find('table').append('<tfoot><tr class="ivu-table-row"><td class="middle"><div class="ivu-table-cell"><div>'+this.countObj.total+'</div></div></td></tr></tfoot>')
                    }else{
                        $('.ivu-table-body').eq(1).find('table').find('tfoot').remove()
                        $('.ivu-tabs-tabpane').eq(1).find('.ivu-table-fixed').find('.ivu-table-fixed-body').find('table').find('tfoot').remove()
                        $('.ivu-tabs-tabpane').eq(1).find('.ivu-table-fixed-right').find('.ivu-table-fixed-body').find('table').find('tfoot').remove()
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }, 200)
        }
    },
    mounted(){
        this.changePage()
        // var html = ''
        // for(var i=0;i<1;i++){
        //     html += `
        //         <tr class="ivu-table-row">
        //             <td class="middle ivu-table-hidden">
        //                 <div class="ivu-table-cell ivu-table-hidden">
        //                     <div>城市90</div>
        //                 </div>
        //             </td>
        //             <td class="ivu-table-column-center">
        //                 <div class="ivu-table-cell">
        //                     <div style="height: 30px;"><span style="float: left; width: 10%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">2</span>
        //                         <span
        //                             style="float: left; width: 10%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span><span style="float: left; width: 10%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span>
        //                             <span
        //                                 style="float: left; width: 10%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span><span style="float: left; width: 10%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span>
        //                                 <span
        //                                     style="float: left; width: 10%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span><span style="float: left; width: 10%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span>
        //                                     <span
        //                                         style="float: left; width: 10%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span><span style="float: left; width: 10%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span>
        //                                         <span
        //                                             style="float: left; width: 10%; height: 30px; line-height: 30px; border-right: none; box-sizing: border-box;">1</span>
        //                     </div>
        //                 </div>
        //             </td>
        //             <td class="ivu-table-column-center">
        //                 <div class="ivu-table-cell">
        //                     <div style="height: 30px;"><span style="float: left; width: 12.5%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">2</span>
        //                         <span
        //                             style="float: left; width: 12.5%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span><span style="float: left; width: 12.5%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span>
        //                             <span
        //                                 style="float: left; width: 12.5%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span><span style="float: left; width: 12.5%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span>
        //                                 <span
        //                                     style="float: left; width: 12.5%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span><span style="float: left; width: 12.5%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span>
        //                                     <span
        //                                         style="float: left; width: 12.5%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span>
        //                     </div>
        //                 </div>
        //             </td>
        //             <td class="ivu-table-column-center">
        //                 <div class="ivu-table-cell">
        //                     <div style="height: 30px;"><span style="float: left; width: 14.28%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">2</span>
        //                         <span
        //                             style="float: left; width: 14.28%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">2</span><span style="float: left; width: 14.28%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">2</span>
        //                             <span
        //                                 style="float: left; width: 14.28%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">2</span><span style="float: left; width: 14.28%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">2</span>
        //                                 <span
        //                                     style="float: left; width: 14.28%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">2</span><span style="float: left; width: 14.28%; height: 30px; line-height: 30px; border-right: none; box-sizing: border-box;">2</span></div>
        //                 </div>
        //             </td>
        //             <td class="middle ivu-table-hidden">
        //                 <div class="ivu-table-cell ivu-table-hidden">
        //                     <div>8</div>
        //                 </div>
        //             </td>
        //         </tr>
        //     `
        // }
        // $('.ivu-table-body').eq(1).find('table').append("<tfoot><tr>" + html + "</tr></tfoot>")
        // $('.ivu-tabs-tabpane').eq(1).find('.ivu-table-fixed').find('.ivu-table-fixed-body').find('table').append('<tfoot><td class="middle"><div class="ivu-table-cell"><div>合计</div></div></td></tfoot>')
        // $('.ivu-tabs-tabpane').eq(1).find('.ivu-table-fixed-right').find('.ivu-table-fixed-body').find('table').append( '<tfoot><tr class="ivu-table-row"><td class="middle"><div class="ivu-table-cell"><div>6</div></div></td></tr></tfoot>')
        
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
div.fiexedAssets{padding:0 16px 16px 16px;}
</style>

