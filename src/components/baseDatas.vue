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
        <Table   v-show="isNoData" id="fiexedAssets5" :columns="columns8" min-width='1200' :data="data7" size="small" border ref="table"></Table>
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
                                textAlign: 'center',
                                height:'30px',
                                lineHeight:'30PX'
                            }
                        }, params.row.cityName)
                    }
                },
                {
                    "title": "小蜜蜂",
                    "width": 350,
                    renderHeader: (h) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    textAlign: 'center',
                                    background:'rgb(126, 181, 224)',
                                    lineHeight:'30px',
                                    height:'30px',
                                    // borderBottom: '1px solid #e9eaec'
                                    borderBottom: '1px solid rgb(126, 181, 224)'
                                }
                            }, '小蜜蜂'),
                            h('div', [
                                 h('span', {
                                    style: {
                                       display: 'inline-block', float:'left',height:'30px',
                                        lineHeight: '30px',
                                        width: '33.3%',
                                        textAlign: 'center',
                                        borderBox: 'box-sizing',
                                        borderRight: '1px solid rgb(126, 181, 224)',
                                        backgroundColor:'rgb(126, 181, 224)'
                                    }
                                }, '型号'),
                                h('span', {
                                    style: {
                                       display: 'inline-block', float:'left',height:'30px',
                                        lineHeight: '30px',
                                        width: '33.3%',
                                        textAlign: 'center',
                                        borderBox: 'box-sizing',
                                        borderRight: '1px solid rgb(126, 181, 224)',
                                        backgroundColor:'rgb(126, 181, 224)'
                                    }
                                }, '数量'),
                                h('span', {
                                    style: {
                                       display: 'inline-block', float:'left',height:'30px',
                                        lineHeight: '30px',
                                        width: '33.3%',
                                        textAlign: 'center',
                                        borderBox: 'box-sizing',
                                        borderRight: '1px solid none',
                                        backgroundColor:'rgb(126, 181, 224)'
                                    }
                                }, '金额')

                            ])
                        ])
                    },
                    render: (h, params) => {
                        return h('div', [
                             h('span', {
                                style: {
                                   display: 'inline-block', float:'left',height:'30px',
                                    lineHeight: '30px',
                                     width: '33.3%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: '1px solid #d6dce4'
                                }
                            }, params.row.beefly.bikeModel),
                            h('span', {
                                style: {
                                   display: 'inline-block', float:'left',height:'30px',
                                    lineHeight: '30px',
                                     width: '33.3%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: '1px solid #d6dce4'
                                }
                            }, params.row.beefly.num),
                            h('span', {
                                style: {
                                   display: 'inline-block', float:'left',height:'30px',
                                    lineHeight: '30px',
                                    width: '33.3%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: 'none'
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
                                    background:'rgb(126, 181, 224)',
                                     lineHeight:'30px',
                                    height:'30px',
                                    borderBottom: '1px solid rgb(126, 181, 224)'
                                }
                            }, '电池'),
                            h('div', [
                                 h('span', {
                                    style: {
                                       display: 'inline-block', float:'left',height:'30px',
                                        lineHeight: '30px',
                                        width: '33.3%',
                                        textAlign: 'center',
                                        borderBox: 'box-sizing',
                                        borderRight: '1px solid rgb(126, 181, 224)',
                                         backgroundColor:'rgb(126, 181, 224)'
                                    }
                                }, '型号'),
                                h('span', {
                                    style: {
                                       display: 'inline-block', float:'left',height:'30px',
                                        lineHeight: '30px',
                                          width: '33.3%',
                                        textAlign: 'center',
                                        borderBox: 'box-sizing',
                                        borderRight: '1px solid rgb(126, 181, 224)',
                                         backgroundColor:'rgb(126, 181, 224)'
                                    }
                                }, '数量'),
                                h('span', {
                                    style: {
                                       display: 'inline-block', float:'left',height:'30px',
                                        lineHeight: '30px',
                                           width: '33.3%',
                                        textAlign: 'center',
                                        borderBox: 'box-sizing',
                                        borderRight: 'none',
                                         backgroundColor:'rgb(126, 181, 224)'
                                    }
                                }, '金额')

                            ])
                        ])
                    },
                    render: (h, params) => {
                        return h('div', [
                             h('span', {
                                style: {
                                   display: 'inline-block', float:'left',height:'30px',
                                    lineHeight: '30px',
                                    width: '33.3%',
                                    float:'left',
                                    height:'30px',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: '1px solid #d6dce4'
                                }
                            }, params.row.Battery.battModel),
                            h('span', {
                                style: {
                                   display: 'inline-block', float:'left',height:'30px',
                                    lineHeight: '30px',
                                     width: '33.3%',
                                    float:'left',
                                    height:'30px',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: '1px solid #d6dce4'
                                }
                            }, params.row.Battery.num),
                            h('span', {
                                style: {
                                   display: 'inline-block', float:'left',height:'30px',
                                    lineHeight: '30px',
                                     width: '33.3%',
                                     float:'left',
                                    height:'30px',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: 'none'
                                }
                            }, params.row.Battery.money)
                        ])
                    }
                },
                {
                    "title": "电站",
                    "width": 350,
                    renderHeader: (h) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    textAlign: 'center',
                                    background:'rgb(126, 181, 224)',
                                     lineHeight:'30px',
                                    height:'30px',
                                    borderBottom: '1px solid rgb(126, 181, 224)'
                                }
                            }, '电站'),
                            h('div', [
                                h('span', {
                                    style: {
                                       display: 'inline-block', float:'left',height:'30px',
                                        lineHeight: '30px',
                                        width: '50%',
                                        textAlign: 'center',
                                        borderBox: 'box-sizing',
                                        borderRight: '1px solid rgb(126, 181, 224)',
                                        backgroundColor:'rgb(126, 181, 224)'
                                    }
                                }, '建设'),
                                h('span', {
                                    style: {
                                       display: 'inline-block', float:'left',height:'30px',
                                        lineHeight: '30px',
                                        width: '50%',
                                        textAlign: 'center',
                                        borderBox: 'box-sizing',
                                        borderRight: 'none',
                                        backgroundColor:'rgb(126, 181, 224)'
                                    }
                                }, '设备')

                            ])
                        ])
                    },
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                style: {
                                   display: 'inline-block', float:'left',height:'30px',
                                    lineHeight: '30px',
                                    width: '50%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: '1px solid #d6dce4'
                                }
                            }, params.row.ChargingStation.build),
                            h('span', {
                                style: {
                                   display: 'inline-block', float:'left',height:'30px',
                                    lineHeight: '30px',
                                    width: '50%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: 'none'
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
                                    background:'rgb(126, 181, 224)',
                                     lineHeight:'30px',
                                    height:'30px',
                                    borderBottom: '1px solid rgb(126, 181, 224)'
                                }
                            }, '机动车'),
                            h('div', [
                                h('span', {
                                    style: {
                                       display: 'inline-block', float:'left',height:'30px',
                                        lineHeight: '30px',
                                        width: '50%',
                                        textAlign: 'center',
                                        borderBox: 'box-sizing',
                                        borderRight: '1px solid rgb(126, 181, 224)',
                                        backgroundColor:'rgb(126, 181, 224)'
                                    }
                                }, '数量'),
                                h('span', {
                                    style: {
                                       display: 'inline-block', float:'left',height:'30px',
                                        lineHeight: '30px',
                                        width: '50%',
                                        textAlign: 'center',
                                        borderBox: 'box-sizing',
                                        borderRight: 'none',
                                        backgroundColor:'rgb(126, 181, 224)'
                                    }
                                }, '金额')

                            ])
                        ])
                    },
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                style: {
                                   display: 'inline-block', float:'left',height:'30px',
                                    lineHeight: '30px',
                                    width: '50%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: '1px solid #d6dce4'
                                }
                            }, params.row.Tricycle.num),
                            h('span', {
                                style: {
                                   display: 'inline-block', float:'left',height:'30px',
                                    lineHeight: '30px',
                                    width: '50%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: 'none'
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
                                    background:'rgb(126, 181, 224)',
                                     lineHeight:'30px',
                                    height:'30px',
                                    borderBottom: '1px solid rgb(126, 181, 224)'
                                }
                            }, '运维工具车'),
                            h('div', [
                                h('span', {
                                    style: {
                                       display: 'inline-block', float:'left',height:'30px',
                                        lineHeight: '30px',
                                        width: '50%',
                                        textAlign: 'center',
                                        borderBox: 'box-sizing',
                                        borderRight: '1px solid rgb(126, 181, 224)',
                                        backgroundColor:'rgb(126, 181, 224)'
                                    }
                                }, '数量'),
                                h('span', {
                                    style: {
                                       display: 'inline-block', float:'left',height:'30px',
                                        lineHeight: '30px',
                                        width: '50%',
                                        textAlign: 'center',
                                        borderBox: 'box-sizing',
                                        borderRight: 'none',
                                        backgroundColor:'rgb(126, 181, 224)'
                                    }
                                }, '金额')

                            ])
                        ])
                    },
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                style: {
                                   display: 'inline-block', float:'left',height:'30px',
                                    lineHeight: '30px',
                                    width: '50%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: '1px solid #e9eaec'
                                }
                            },  params.row.Toolcar.num),
                            h('span', {
                                style: {
                                   display: 'inline-block', float:'left',height:'30px',
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
                    "title": "物流",
                    "width": 350,
                    renderHeader: (h) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    textAlign: 'center',
                                    background:'rgb(126, 181, 224)',
                                     lineHeight:'60px',
                                    height:'60px',
                                    borderBottom: '1px solid rgb(126, 181, 224)'
                                }
                            }, '物流'),
                            // h('div', [
                            //     h('span', {
                            //         style: {
                            //            display: 'inline-block', float:'left',height:'30px',
                            //             lineHeight: '30px',
                            //             width: '100%',
                            //             textAlign: 'center',
                            //             borderBox: 'box-sizing',
                            //             borderRight: 'none'
                            //         }
                            //     }, '金额')

                            // ])
                        ])
                    },
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                style: {
                                   display: 'inline-block', float:'left',height:'30px',
                                    lineHeight: '30px',
                                    width: '100%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: 'none'
                                }
                            }, params.row.transCost.money)
                        ])
                    }
                },
                // {
                //     "title": "办公成本",
                //     "width": 350,
                //     renderHeader: (h) => {
                //         return h('div', [
                //             h('div', {
                //                 style: {
                //                     textAlign: 'center',
                //                     background:'#7eb5e0',
                //                      lineHeight:'30px',
                //                     height:'30px',
                //                     borderBottom: '1px solid #e9eaec'
                //                 }
                //             }, '办公成本'),
                //             h('div', [
                //                 h('span', {
                //                     style: {
                //                        display: 'inline-block', float:'left',height:'30px',
                //                         lineHeight: '30px',
                //                         width: '100%',
                //                         textAlign: 'center',
                //                         borderBox: 'box-sizing',
                //                         borderRight: 'none'
                //                     }
                //                 }, '金额')

                //             ])
                //         ])
                //     },
                //     render: (h, params) => {
                //         return h('div', [
                //             h('span', {
                //                 style: {
                //                    display: 'inline-block', float:'left',height:'30px',
                //                     lineHeight: '30px',
                //                     width: '100%',
                //                     textAlign: 'center',
                //                     borderBox: 'box-sizing',
                //                     borderRight: 'none'
                //                 }
                //             }, params.row.officeCost.money)
                //         ])
                //     }
                // },
                {
                    "title": "其他",
                    "width": 350,
                    renderHeader: (h) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    textAlign: 'center',
                                    background:'rgb(126, 181, 224)',
                                     lineHeight:'60px',
                                    height:'60px',
                                    borderBottom: '1px solid rgb(126, 181, 224)'
                                }
                            }, '其他'),
                            // h('div', [
                            //     h('span', {
                            //         style: {
                            //            display: 'inline-block', float:'left',height:'30px',
                            //             lineHeight: '30px',
                            //             width: '100%',
                            //             textAlign: 'center',
                            //             borderBox: 'box-sizing',
                            //             borderRight: 'none'
                            //         }
                            //     }, '金额')

                            // ])
                        ])
                    },
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                style: {
                                   display: 'inline-block', float:'left',height:'30px',
                                    lineHeight: '30px',
                                    width: '100%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: 'none'
                                }
                            }, params.row.otherCost.money)
                        ])
                    }
                },
                  {
                    "title": "小计",
                    "width": 350,
                    renderHeader: (h) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    textAlign: 'center',
                                    background:'rgb(126, 181, 224)',
                                     lineHeight:'60px',
                                    height:'60px',
                                    borderBottom: '1px solid rgb(126, 181, 224)'
                                }
                            }, '小计'),
                            // h('div', [
                            //     h('span', {
                            //         style: {
                            //            display: 'inline-block', float:'left',height:'30px',
                            //             lineHeight: '30px',
                            //             width: '100%',
                            //             textAlign: 'center',
                            //             borderBox: 'box-sizing',
                            //             borderRight: 'none'
                            //         }
                            //     }, '金额')

                            // ])
                        ])
                    },
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                style: {
                                   display: 'inline-block', float:'left',height:'30px',
                                    lineHeight: '30px',
                                    width: '100%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: 'none'
                                }
                            }, params.row.assetsTotal.money)
                        ])
                    }
                },
                   {
                    "title": "薪资福利",
                    "width": 350,
                    renderHeader: (h) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    textAlign: 'center',
                                    background:'#f8cbad',
                                     lineHeight:'60px',
                                    height:'60px',
                                    borderBottom: '1px solid #f8cbad'
                                }
                            }, '薪资福利'),
                            // h('div', [
                            //     h('span', {
                            //         style: {
                            //            display: 'inline-block', float:'left',height:'30px',
                            //             lineHeight: '30px',
                            //             width: '100%',
                            //             textAlign: 'center',
                            //             borderBox: 'box-sizing',
                            //             borderRight: 'none'
                            //         }
                            //     }, '金额')

                            // ])
                        ])
                    },
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                style: {
                                   display: 'inline-block', float:'left',height:'30px',
                                    lineHeight: '30px',
                                    width: '100%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: 'none'
                                }
                            }, params.row.salaryMoney.money)
                        ])
                    }
                },
                {
                    "title": "其他人员成本",
                    "width": 350,
                    renderHeader: (h) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    textAlign: 'center',
                                    background:'#f8cbad',
                                     lineHeight:'60px',
                                    height:'60px',
                                    borderBottom: '1px solid #f8cbad'
                                }
                            }, '其他人员成本'),
                            // h('div', [
                            //     h('span', {
                            //         style: {
                            //            display: 'inline-block', float:'left',height:'30px',
                            //             lineHeight: '30px',
                            //             width: '100%',
                            //             textAlign: 'center',
                            //             borderBox: 'box-sizing',
                            //             borderRight: 'none'
                            //         }
                            //     }, '金额')

                            // ])
                        ])
                    },
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                style: {
                                   display: 'inline-block', float:'left',height:'30px',
                                    lineHeight: '30px',
                                    width: '100%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: 'none'
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
                                     background:'#f8cbad',
                                      lineHeight:'60px',
                                    height:'60px',
                                    borderBottom: '1px solid #f8cbad'
                                }
                            }, '房租（生产）'),
                            // h('div', [
                            //     h('span', {
                            //         style: {
                            //            display: 'inline-block', float:'left',height:'30px',
                            //             lineHeight: '30px',
                            //             width: '100%',
                            //             textAlign: 'center',
                            //             borderBox: 'box-sizing',
                            //             borderRight: 'none'
                            //         }
                            //     }, '金额')

                            // ])
                        ])
                    },
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                style: {
                                   display: 'inline-block', float:'left',height:'30px',
                                    lineHeight: '30px',
                                    width: '100%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: 'none'
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
                                     background:'#f8cbad',
                                      lineHeight:'60px',
                                    height:'60px',
                                    borderBottom: '1px solid #f8cbad'
                                }
                            }, '水电（生产）'),
                            // h('div', [
                            //     h('span', {
                            //         style: {
                            //            display: 'inline-block', float:'left',height:'30px',
                            //             lineHeight: '30px',
                            //             width: '100%',
                            //             textAlign: 'center',
                            //             borderBox: 'box-sizing',
                            //             borderRight: 'none'
                            //         }
                            //     }, '金额')

                            // ])
                        ])
                    },
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                style: {
                                   display: 'inline-block', float:'left',height:'30px',
                                    lineHeight: '30px',
                                    width: '100%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: 'none'
                                }
                            }, params.row.hydropoer.money)
                        ])
                    }
                },
                   {
                    "title": "其他生产成本",
                    "width": 350,
                    renderHeader: (h) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    textAlign: 'center',
                                    background:'#f8cbad',
                                     lineHeight:'60px',
                                    height:'60px',
                                    borderBottom: '1px solid #f8cbad'
                                }
                            }, '其他生产成本'),
                            // h('div', [
                            //     h('span', {
                            //         style: {
                            //            display: 'inline-block', float:'left',height:'30px',
                            //             lineHeight: '30px',
                            //             width: '100%',
                            //             textAlign: 'center',
                            //             borderBox: 'box-sizing',
                            //             borderRight: 'none'
                            //         }
                            //     }, '金额')

                            // ])
                        ])
                    },
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                style: {
                                   display: 'inline-block', float:'left',height:'30px',
                                    lineHeight: '30px',
                                    width: '100%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: 'none'
                                }
                            }, params.row.operationMoney.money)
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
                                    background:'#f8cbad',
                                     lineHeight:'60px',
                                    height:'60px',
                                    borderBottom: '1px solid #f8cbad'
                                }
                            }, '其他经营费用'),
                            // h('div', [
                            //     h('span', {
                            //         style: {
                            //            display: 'inline-block', float:'left',height:'30px',
                            //             lineHeight: '30px',
                            //             width: '100%',
                            //             textAlign: 'center',
                            //             borderBox: 'box-sizing',
                            //             borderRight: 'none'
                            //         }
                            //     }, '金额')

                            // ])
                        ])
                    },
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                style: {
                                   display: 'inline-block', float:'left',height:'30px',
                                    lineHeight: '30px',
                                    width: '100%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: 'none'
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
                                    background:'#f8cbad',
                                     lineHeight:'60px',
                                    height:'60px',
                                    borderBottom: '1px solid #f8cbad'
                                }
                            }, '开城费用'),
                            // h('div', [
                            //     h('span', {
                            //         style: {
                            //            display: 'inline-block', float:'left',height:'30px',
                            //             lineHeight: '30px',
                            //             width: '100%',
                            //             textAlign: 'center',
                            //             borderBox: 'box-sizing',
                            //             borderRight: 'none'
                            //         }
                            //     }, '金额')

                            // ])
                        ])
                    },
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                style: {
                                   display: 'inline-block', float:'left',height:'30px',
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
                    "title": "小计",
                    "width": 350,
                    renderHeader: (h) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    textAlign: 'center',
                                    background:'#f8cbad',
                                     lineHeight:'60px',
                                    height:'60px',
                                    borderBottom: '1px solid #f8cbad'
                                }
                            }, '小计'),
                            // h('div', [
                            //     h('span', {
                            //         style: {
                            //            display: 'inline-block', float:'left',height:'30px',
                            //             lineHeight: '30px',
                            //             width: '100%',
                            //             textAlign: 'center',
                            //             borderBox: 'box-sizing',
                            //             borderRight: 'none'
                            //         }
                            //     }, '金额')

                            // ])
                        ])
                    },
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                style: {
                                   display: 'inline-block', float:'left',height:'30px',
                                    lineHeight: '30px',
                                    width: '100%',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: '1px solid #e9eaec'
                                }
                            }, params.row.operationTotal.money)
                        ])
                    }
                },
                {
                    title: '合计',
                    key: 'total',
                    width: 100,
                    fixed: 'left',
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

