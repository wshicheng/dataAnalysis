<template>
 <!--运营成本-->
    <div class="fiexedAssets">
        <Table id="fiexedAssets" min-width="1180" height="400" border :columns="columns2" :data="data4"></Table>
    </div>
</template>
<script>
export default {
    data() {
        return {
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
                                }, params.row.beefly.num),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '10%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.beefly.money),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '10%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.beefly.money),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '10%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.beefly.money),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '10%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.beefly.money),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '10%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.beefly.money),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '10%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.beefly.money),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '10%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.beefly.money),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '10%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.beefly.money),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '10%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: 'none',
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
                                }, params.row.beefly.num),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '12.5%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.beefly.money),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '12.5%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.beefly.money),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '12.5%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.beefly.money),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '12.5%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.beefly.money),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '12.5%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.beefly.money),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '12.5%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.beefly.money),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '12.5%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.beefly.money),


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
                                }, params.row.beefly.num),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '14.28%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.beefly.num),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '14.28%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.beefly.num),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '14.28%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.beefly.num),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '14.28%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.beefly.num),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '14.28%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: '1px solid rgb(233, 234, 236)',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.beefly.num),
                                h('span', {
                                    style: {
                                        float: 'left',
                                        width: '14.28%',
                                        height: '30px',
                                        lineHeight: '30px',
                                        borderRight: 'none',
                                        boxSizing: 'border-box',
                                    }
                                }, params.row.beefly.num),


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
            data4: this.mockTableData()
        }
    },
    methods: {
        mockTableData() {
            var data = [];
            for (var i = 0; i < 10; i++) {
                data.push(
                    {
                        cityName: '城市' + Math.floor(Math.random() * 100 + 1),
                        beefly: {
                            num: Math.floor(Math.random() * 3 + 1),
                            money: Math.floor(Math.random() * 4 + 1),
                        },
                        Tricycle: {
                            num: Math.floor(Math.random() * 5 + 1),
                            money: Math.floor(Math.random() * 6 + 1),
                        },
                        Toolcar: {
                            num: Math.floor(Math.random() * 5 + 1),
                            money: Math.floor(Math.random() * 6 + 1),
                        },
                        Battery: {
                            num: Math.floor(Math.random() * 7 + 1),
                            money: Math.floor(Math.random() * 8 + 1),
                        },
                        ChargingStation: {
                            build: Math.floor(Math.random() * 9 + 1),
                            cabinet: Math.floor(Math.random() * 10 + 1)
                        },
                        rentCost: {
                            money: Math.floor(Math.random() * 11 + 1)
                        },
                        salary: {
                            money: Math.floor(Math.random() * 12 + 1)
                        },
                        expenses: {
                            money: Math.floor(Math.random() * 13 + 1)
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
            this.tableData1 = this.mockTableData1();
        }
    },
    mounted(){
        var html = ''
        for(var i=0;i<1;i++){
            html += `
                <tr class="ivu-table-row">
                    <td class="middle ivu-table-hidden">
                        <div class="ivu-table-cell ivu-table-hidden">
                            <div>城市90</div>
                        </div>
                    </td>
                    <td class="ivu-table-column-center">
                        <div class="ivu-table-cell">
                            <div style="height: 30px;"><span style="float: left; width: 10%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">2</span>
                                <span
                                    style="float: left; width: 10%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span><span style="float: left; width: 10%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span>
                                    <span
                                        style="float: left; width: 10%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span><span style="float: left; width: 10%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span>
                                        <span
                                            style="float: left; width: 10%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span><span style="float: left; width: 10%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span>
                                            <span
                                                style="float: left; width: 10%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span><span style="float: left; width: 10%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span>
                                                <span
                                                    style="float: left; width: 10%; height: 30px; line-height: 30px; border-right: none; box-sizing: border-box;">1</span>
                            </div>
                        </div>
                    </td>
                    <td class="ivu-table-column-center">
                        <div class="ivu-table-cell">
                            <div style="height: 30px;"><span style="float: left; width: 12.5%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">2</span>
                                <span
                                    style="float: left; width: 12.5%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span><span style="float: left; width: 12.5%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span>
                                    <span
                                        style="float: left; width: 12.5%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span><span style="float: left; width: 12.5%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span>
                                        <span
                                            style="float: left; width: 12.5%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span><span style="float: left; width: 12.5%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span>
                                            <span
                                                style="float: left; width: 12.5%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span>
                            </div>
                        </div>
                    </td>
                    <td class="ivu-table-column-center">
                        <div class="ivu-table-cell">
                            <div style="height: 30px;"><span style="float: left; width: 14.28%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">2</span>
                                <span
                                    style="float: left; width: 14.28%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">2</span><span style="float: left; width: 14.28%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">2</span>
                                    <span
                                        style="float: left; width: 14.28%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">2</span><span style="float: left; width: 14.28%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">2</span>
                                        <span
                                            style="float: left; width: 14.28%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">2</span><span style="float: left; width: 14.28%; height: 30px; line-height: 30px; border-right: none; box-sizing: border-box;">2</span></div>
                        </div>
                    </td>
                    <td class="middle ivu-table-hidden">
                        <div class="ivu-table-cell ivu-table-hidden">
                            <div>8</div>
                        </div>
                    </td>
                </tr>
            `
        }
        $('.ivu-table-body').eq(1).find('table').append("<tfoot><tr>" + html + "</tr></tfoot>")
        $('.ivu-tabs-tabpane').eq(1).find('.ivu-table-fixed').find('.ivu-table-fixed-body').find('table').append('<tfoot><td class="middle"><div class="ivu-table-cell"><div>合计</div></div></td></tfoot>')
        $('.ivu-tabs-tabpane').eq(1).find('.ivu-table-fixed-right').find('.ivu-table-fixed-body').find('table').append( '<tfoot><tr class="ivu-table-row"><td class="middle"><div class="ivu-table-cell"><div>6</div></div></td></tr></tfoot>')
        
    }
}
</script>
<style lang="scss" scoped type="text/css">
div.ivu-table-wrapper {
    margin: 0 auto;
}
div.fiexedAssets{padding:0 16px 16px 16px;}
</style>

