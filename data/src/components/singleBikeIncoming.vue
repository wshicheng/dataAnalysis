<template>
 <!--单车日营收-->
  <div class="fiexedAssets">
       <Table id="fiexedAssets" min-width="1180" height="420" border :columns="columns2" :data="data4"></Table>
  </div>
</template>
<script>
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
                                    },params.row.beefly.money),
                                     h('span',{
                                        style:{
                                            float:'left',
                                          width:'50%',
                                            height:'30px',
                                            lineHeight:'30px',
                                            borderRight:'none',
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
                                            borderRight:'none',
                                            boxSizing:'border-box',
                                        }
                                    },'实收')
                                ])
                            ])
                        }
                    },
                      {
                        title: '单车成本',
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
                                            width:'100%',
                                            height:'30px',
                                            lineHeight:'30px',
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
                                        lineHeight:'60px',
                                    }
                                },'单车成本'),
                                h('div',{
                                   style:{
                                        width:'100%',
                                        lineHeight:'30px', 
                                    } 
                                },[
                                    
                                   
                                ])
                            ])
                        }
                    },
                      {
                        title: '单车营收',
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
                                    },params.row.beefly.money),
                                     h('span',{
                                        style:{
                                            float:'left',
                                          width:'50%',
                                            height:'30px',
                                            lineHeight:'30px',
                                            borderRight:'none',
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
                                        borderBottom:'none',
                                    }
                                },'单车营收'),
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
                                            borderRight:'none',
                                            boxSizing:'border-box',
                                        }
                                    },'计费'),
                                    h('span',{
                                        style:{
                                            float:'left',
                                           width:'50%',
                                            borderRight:'none',
                                            boxSizing:'border-box',
                                        }
                                    },'实收')
                                ])
                            ])
                        }
                    },
                    {
                        title: '单车盈亏率）',
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
                                    },params.row.beefly.num),
                                    h('span',{
                                        style:{
                                            float:'left',
                                           width:'50%',
                                            height:'30px',
                                            lineHeight:'30px',
                                            borderRight:'none',
                                            boxSizing:'border-box',
                                        }
                                    },params.row.beefly.money),
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
                                },'单车盈亏率'),
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
                                            borderRight:'none',
                                            boxSizing:'border-box',
                                        }
                                    },'实收')
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
                                    },params.row.beefly.num),
                                    h('span',{
                                        style:{
                                            float:'left',
                                           width:'50%',
                                            height:'30px',
                                            lineHeight:'30px',
                                            borderRight:'none',
                                            boxSizing:'border-box',
                                        }
                                    },params.row.beefly.money),
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
                                            borderRight:'none',
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
                                    },params.row.beefly.num),
                                    h('span',{
                                        style:{
                                            float:'left',
                                           width:'50%',
                                            height:'30px',
                                            lineHeight:'30px',
                                            borderRight:'none',
                                            boxSizing:'border-box',
                                        }
                                    },params.row.beefly.money),
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
                                            borderRight:'none',
                                            boxSizing:'border-box',
                                        }
                                    },'实收')
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
                var data = [];
                for(var i=0;i<11;i++){
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
                                <div>合计</div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div style="height: 30px;">
                                    <span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">统计1</span>
                                    <span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: none; box-sizing: border-box;">统计1</span>
                                </div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div style="height: 30px;">
                                    <span style="float: left; width: 100%; height: 30px; line-height: 30px; box-sizing: border-box;">统计1</span>
                                </div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div style="height: 30px;">
                                    <span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">统计1</span>
                                    <span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: none; box-sizing: border-box;">统计1</span>
                                </div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div style="height: 30px;">
                                    <span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">统计1</span>
                                    <span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: none; box-sizing: border-box;">统计1</span>
                                </div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div style="height: 30px;">
                                    <span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">统计1</span>
                                    <span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: none; box-sizing: border-box;">统计1</span>
                                </div>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <div style="height: 30px;">
                                    <span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: 1px solid rgb(233, 234, 236); box-sizing: border-box;">统计1</span>
                                    <span style="float: left; width: 50%; height: 30px; line-height: 30px; border-right: none; box-sizing: border-box;">统计1</span>
                                </div>
                            </div>
                        </td>
                        <td class="middle ivu-table-hidden">
                            <div class="ivu-table-cell ivu-table-hidden">
                                <div>统计1</div>
                            </div>
                        </td>
                    </tr>
                `
            }
            $('.ivu-table-body').eq(3).find('table').append("<tfoot><tr>" + html + "</tr></tfoot>")
            $('.ivu-tabs-tabpane').eq(3).find('.ivu-table-fixed').find('.ivu-table-fixed-body').find('table').append('<tfoot><td class="middle"><div class="ivu-table-cell"><div>合计</div></div></td></tfoot>')
            $('.ivu-tabs-tabpane').eq(3).find('.ivu-table-fixed-right').find('.ivu-table-fixed-body').find('table').append( '<tfoot><tr class="ivu-table-row"><td class="middle"><div class="ivu-table-cell"><div>6</div></div></td></tr></tfoot>')
           
        }
    }
</script>
<style lang="scss" scoped type="text/css">
div.ivu-table-wrapper{margin:0 auto;}
div.fiexedAssets{padding:0 16px 16px 16px;}
</style>

