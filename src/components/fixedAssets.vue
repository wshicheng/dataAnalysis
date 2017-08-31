<template>
  <div class="fiexedAssets">
       <Table id="fiexedAssets" width="1180" height="200" border :columns="columns2" :data="data4"></Table>
  </div>
</template>
<script>
import $ from 'jquery'
    export default {
        data () {
            return {
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
                                        lineHeight:'30px',
                                        borderBottom:'1px solid #e9eaec '
                                    }
                                },'城市'),
                                h('div',{
                                    style:{
                                        width:'100%',
                                        lineHeight:'30px',
                                        height:'30px'
                                    }
                                },'    ')
                            ])
                        }
                    },
                    {
                        title: '小蜜蜂',
                        key: 'age',
                        width: 100,
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
                                    },params.row.beefly.num),
                                    h('span',{
                                        style:{
                                            float:'left',
                                            width:'50%',
                                            height:'30px',
                                            lineHeight:'30px',
                                            borderRight:'1px solid rgb(233, 234, 236)',
                                            boxSizing:'border-box',
                                        }
                                    },params.row.beefly.money)
                                ])
                        },
                        renderHeader:(h,params)=>{
                            return h('div',[
                                h('div',{
                                     style:{
                                        width:'100%',
                                        lineHeight:'30px',
                                        borderBottom:'1px solid #e9eaec '
                                    }
                                },'小蜜蜂'),
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
                                    },'数量'),
                                    h('span','金额')
                                ])
                            ])
                        }
                    },
                    {
                        title: '三轮车',
                        key: 'province',
                        width: 100,
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
                                    },params.row.Tricycle.num),
                                    h('span',{
                                        style:{
                                            float:'left',
                                            width:'50%',
                                            height:'30px',
                                            lineHeight:'30px',
                                            borderRight:'1px solid rgb(233, 234, 236)',
                                            boxSizing:'border-box',
                                        }
                                    },params.row.Tricycle.money)
                                ])
                        },
                        renderHeader:(h,params)=>{
                            return h('div',[
                                h('div',{
                                     style:{
                                        width:'100%',
                                        lineHeight:'30px',
                                        borderBottom:'1px solid #e9eaec '
                                    }
                                },'三轮车'),
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
                                    },'数量'),
                                    h('span','金额')
                                ])
                            ])
                        }
                    },
                     {
                        title: '电池',
                        key: 'city',
                        width: 100,
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
                                    },params.row.Battery.num),
                                    h('span',{
                                        style:{
                                            float:'left',
                                            width:'50%',
                                            height:'30px',
                                            lineHeight:'30px',
                                            borderRight:'1px solid rgb(233, 234, 236)',
                                            boxSizing:'border-box',
                                        }
                                    },params.row.Battery.money)
                                ])
                        },
                        renderHeader:(h,params)=>{
                            return h('div',[
                                h('div',{
                                     style:{
                                        width:'100%',
                                        lineHeight:'30px',
                                        borderBottom:'1px solid #e9eaec '
                                    }
                                },'电池'),
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
                                    },'数量'),
                                    h('span','金额')
                                ])
                            ])
                        }
                    },
                    {
                        title: '充电站',
                        key: 'city',
                        width: 100,
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
                                    },params.row.ChargingStation.build),
                                    h('span',{
                                        style:{
                                            float:'left',
                                            width:'50%',
                                            height:'30px',
                                            lineHeight:'30px',
                                            borderRight:'1px solid rgb(233, 234, 236)',
                                            boxSizing:'border-box',
                                        }
                                    },params.row.ChargingStation.cabinet)
                                ])
                        },
                        renderHeader:(h,params)=>{
                            return h('div',[
                                h('div',{
                                     style:{
                                        width:'100%',
                                        lineHeight:'30px',
                                        borderBottom:'1px solid #e9eaec '
                                    }
                                },'充电站'),
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
                                    },'建设'),
                                    h('span','电柜')
                                ])
                            ])
                        }
                    },
                    {
                        title: '房租水电费',
                        key: 'city',
                        width: 100,
                        align:'center',
                        render:(h,params)=>{
                            return h('div',params.row.rentCost.money)
                        },
                        renderHeader:(h,params)=>{
                            return h('div',[
                                h('div',{
                                     style:{
                                        width:'100%',
                                        lineHeight:'30px',
                                        borderBottom:'1px solid #e9eaec '
                                    }
                                },'房租水电费'),
                                h('div',{
                                   style:{
                                        width:'100%',
                                        lineHeight:'30px',
                                        borderBottom:'1px solid #e9eaec '
                                    } 
                                },[
                                    h('span','金额')
                                   
                                ])
                            ])
                        }
                    },
                     {
                        title: '人员工资',
                        key: 'salary',
                        width: 100,
                        align:'center',
                        render:(h,params)=>{
                            return h('div',params.row.salary.money)
                        },
                        renderHeader:(h,params)=>{
                            return h('div',[
                                h('div',{
                                     style:{
                                        width:'100%',
                                        lineHeight:'30px',
                                        borderBottom:'1px solid #e9eaec '
                                    }
                                },'人员工资'),
                                h('div',{
                                   style:{
                                        width:'100%',
                                        lineHeight:'30px',
                                        borderBottom:'1px solid #e9eaec '
                                    } 
                                },[
                                    h('span','金额')
                                   
                                ])
                            ])
                        }
                    },
                     {
                        title: '报销费用',
                        key: 'expenses',
                        width: 100,
                        align:'center',
                         render:(h,params)=>{
                            return h('div',params.row.salary.money)
                        },
                        renderHeader:(h,params)=>{
                            return h('div',[
                                h('div',{
                                     style:{
                                        width:'100%',
                                        lineHeight:'30px',
                                        borderBottom:'1px solid #e9eaec '
                                    }
                                },'报销费用'),
                                h('div',{
                                   style:{
                                        width:'100%',
                                        lineHeight:'30px',
                                        borderBottom:'1px solid #e9eaec '
                                    } 
                                },[
                                    h('span','金额')
                                   
                                ])
                            ])
                        }
                    },
                     {
                        title: '合计',
                        key: 'total',
                        width: 100,
                        fixed: 'right',
                        className:'middle',
                         render:(h,params)=>{
                            return h('div',params.row.total.money)
                        },
                        renderHeader:(h,params)=>{
                            return h('div',[
                                h('div',{
                                    style:{
                                        width:'100%',
                                        lineHeight:'30px',
                                        borderBottom:'1px solid #e9eaec '
                                    }
                                },'合计'),
                                h('div',{
                                    style:{
                                        width:'100%',
                                        lineHeight:'30px',
                                        height:'30px'
                                    }
                                },'    ')
                            ])
                        }
                    }
                ],
                data4:this.mockTableData()
            }
        },
        methods:{
            mockTableData(){
                let data = [];
                for(let i=0;i<10;i++){
                    data.push(
                         {
                            cityName: '城市' + Math.floor(Math.random () * 100 + 1),
                            beefly:{
                                num:Math.floor(Math.random () * 3 + 1),
                                money:Math.floor(Math.random () * 4 + 1),
                            },
                            Tricycle:{
                                num:Math.floor(Math.random () * 5 + 1),
                                money:Math.floor(Math.random () * 6 + 1),
                            },
                            Battery:{
                                num:Math.floor(Math.random () * 7 + 1),
                                money:Math.floor(Math.random () * 8 + 1),
                            },
                            ChargingStation:{
                                build:Math.floor(Math.random () * 9 + 1),
                                cabinet:Math.floor(Math.random () * 10 + 1)
                            },
                            rentCost:{
                                money:Math.floor(Math.random () * 11 + 1)
                            },
                            salary:{
                                money:Math.floor(Math.random () * 12 + 1)
                            },
                            expenses:{
                                money:Math.floor(Math.random () * 13 + 1)
                            },
                            total:{
                                money:Math.floor(Math.random () * 14 + 1)
                            }
                        }
                    )
                }
                return data
            },
            changePage () {
                // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
                this.tableData1 = this.mockTableData1();
            }
        }
    }
</script>
<style lang="scss" scoped type="text/css">
div.ivu-table-wrapper{margin:0 auto;}

</style>

