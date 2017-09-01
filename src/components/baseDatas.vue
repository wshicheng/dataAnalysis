<template>
    <!--基础数据-->
  <div class="fiexedAssets">
       <Table id="fiexedAssets" min-width="1180" height="400" border :columns="columns2" :data="data4"></Table>
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
                                        
                                      
                                    }
                                },'城市'),
                               
                            ])
                        }
                    },
                    {
                        title: '车辆',
                        key: 'age',
                        width: 300,
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
                                },'车辆'),
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
                        width: 300,
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
                        width: 300,
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
                        title: '机动车',
                        key: 'province',
                        width: 300,
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
                                },'机动车'),
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
                        title: '运维工具车',
                        key: 'province',
                        width: 300,
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
                                    },params.row.Toolcar.num),
                                    h('span',{
                                        style:{
                                            float:'left',
                                            width:'50%',
                                            height:'30px',
                                            lineHeight:'30px',
                                            borderRight:'1px solid rgb(233, 234, 236)',
                                            boxSizing:'border-box',
                                        }
                                    },params.row.Toolcar.money)
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
                                },'运维工具车'),
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
                        title: '物流成本',
                        key: 'city',
                        width: 300,
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
                                },'物流成本'),
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
                        title: '办公成本',
                        key: 'city',
                        width: 300,
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
                                },'办公成本'),
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
                        title: '其他金额',
                        key: 'city',
                        width: 300,
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
                                },'其他金额'),
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
                        title: '人员成本',
                        key: 'city',
                        width: 300,
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
                                        borderBottom:'1px solid #e9eaec ',
                                        background:'pink'
                                    }
                                },'人员成本'),
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
                        title: '房租(生产)',
                        key: 'city',
                        width: 300,
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
                                        borderBottom:'1px solid #e9eaec ',
                                         background:'pink'
                                    }
                                },'房租(生产)'),
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
                        title: '水电(生产)',
                        key: 'city',
                        width: 300,
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
                                        borderBottom:'1px solid #e9eaec ',
                                        background:'pink'
                                    }
                                },'水电(生产)'),
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
                        title: '经营费用',
                        key: 'salary',
                        width: 300,
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
                                        borderBottom:'1px solid #e9eaec ',
                                         background:'pink'
                                    }
                                },'经营费用'),
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
                        title: '开城费用',
                        key: 'expenses',
                        width: 300,
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
                                        borderBottom:'1px solid #e9eaec ',
                                          background:'pink'
                                    }
                                },'开城费用'),
                                h('div',{
                                   style:{
                                        width:'100%',
                                        lineHeight:'30px',
                                        borderBottom:'1px solid #e9eaec ',
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
                                       
                                    }
                                },'合计')
                               
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
                            Toolcar:{
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
        },
        mounted(){
            var html = ''
            for(var i=0;i<1;i++){
                html += `
                   <tr class="ivu-table-row">
                    <td class="middle ivu-table-hidden">
                        <div class="ivu-table-cell ivu-table-hidden">
                            <div>城市15</div>
                        </div>
                    </td>
                    <td class="ivu-table-column-center">
                        <div class="ivu-table-cell">
                            <div style="height: 30px;"><span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span>
                                <span
                                    style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">1</span>
                            </div>
                        </div>
                    </td>
                    <td class="ivu-table-column-center">
                        <div class="ivu-table-cell">
                            <div style="height: 30px;"><span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">5</span>
                                <span
                                    style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">5</span>
                            </div>
                        </div>
                    </td>
                    <td class="ivu-table-column-center">
                        <div class="ivu-table-cell">
                            <div style="height: 30px;"><span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">7</span>
                                <span
                                    style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">6</span>
                            </div>
                        </div>
                    </td>
                    <td class="ivu-table-column-center">
                        <div class="ivu-table-cell">
                            <div style="height: 30px;"><span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">5</span>
                                <span
                                    style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">6</span>
                            </div>
                        </div>
                    </td>
                    <td class="ivu-table-column-center">
                        <div class="ivu-table-cell">
                            <div style="height: 30px;"><span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">2</span>
                                <span
                                    style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">6</span>
                            </div>
                        </div>
                    </td>
                    <td class="ivu-table-column-center">
                        <div class="ivu-table-cell">
                            <div>8</div>
                        </div>
                    </td>
                    <td class="ivu-table-column-center">
                        <div class="ivu-table-cell">
                            <div>8</div>
                        </div>
                    </td>
                    <td class="ivu-table-column-center">
                        <div class="ivu-table-cell">
                            <div>8</div>
                        </div>
                    </td>
                    <td class="ivu-table-column-center">
                        <div class="ivu-table-cell">
                            <div>8</div>
                        </div>
                    </td>
                    <td class="ivu-table-column-center">
                        <div class="ivu-table-cell">
                            <div>8</div>
                        </div>
                    </td>
                    <td class="ivu-table-column-center">
                        <div class="ivu-table-cell">
                            <div>8</div>
                        </div>
                    </td>
                    <td class="ivu-table-column-center">
                        <div class="ivu-table-cell">
                            <div>5</div>
                        </div>
                    </td>
                    <td class="ivu-table-column-center">
                        <div class="ivu-table-cell">
                            <div>5</div>
                        </div>
                    </td>
                    <td class="middle ivu-table-hidden">
                        <div class="ivu-table-cell ivu-table-hidden">
                            <div>13</div>
                        </div>
                    </td>
                </tr>
                `
            }
            $('.ivu-table-body').eq(0).find('table').append("<tfoot><tr>" + html + "</tr></tfoot>")
            $('.ivu-tabs-tabpane').eq(0).find('.ivu-table-fixed').find('.ivu-table-fixed-body').find('table').append('<tfoot><td class="middle"><div class="ivu-table-cell"><div>合计</div></div></td></tfoot>')
            $('.ivu-tabs-tabpane').eq(0).find('.ivu-table-fixed-right').find('.ivu-table-fixed-body').find('table').append( '<tfoot><tr class="ivu-table-row"><td class="middle"><div class="ivu-table-cell"><div>6</div></div></td></tr></tfoot>')
           
        }
    }
</script>
<style lang="scss" scoped type="text/css">
div.ivu-table-wrapper{margin:0 auto;}
div.fiexedAssets{padding:0 16px 16px 16px;}
</style>

