<template>
  <div id="activeUserDetail_body">
        <Breadcrumb class="Breadcrumb2">
            <BreadcrumbItem>{{city}}订单整体数据</BreadcrumbItem>
        </Breadcrumb>
      <div id="activeUserDetail_head">
        <div class="activeUserDetail_head_time">
            <span>时间:</span>
            <button @click="handleClick" myId='1'>今日</button>
            <button @click="handleClick" myId='2'>昨日</button>
            <button class="active" @click="handleClick" myId='3'>近7日</button>
            <button @click="handleClick" myId='4'>近30天</button>
            <!-- <button @click="handleClick" myId='5'>指定时间段</button> -->
        </div>
        <div class="timeSelectShow" v-show="timeSelectShow">
            <DatePicker type="daterange" v-model="timeLine" :options='options' placeholder="选择日期" style="width: 216px; vertical-align: top;"></DatePicker>
            <div class="search"><button @click="searchByTimeLine">查询</button></div>
        </div>
      </div>

      <div class="activeUserDetail_table">
        <Spin fix size="large" v-if="spinShow"  class="spin">
            <Icon type="load-c" size=18 class="demo-spin-icon-load" style="color: #ccc;"></Icon>
            <div style="color: #ccc; text-indent: 5px;">  loading...</div>
        </Spin>
        <div class="help">
            <Poptip trigger="hover" style="float: right;" placement="left-start" title="数据项说明" content="提示内容" :transfer='transfer'>
                <span>?</span>
                <div class="content" slot="content">
                    <p><b>累计用户数量:</b>累计到查询时间段的注册用户数</p>
                    <p><b>活跃用户数:</b>在本查询时间段内有过一次有效订单的用户</p>
                    <p><b>活跃用户比率:</b>活跃用户/累计用户</p>
                    <p><b>活跃新用户:</b>查询时段内注册且在查询时间段内有过一次有效订单的用户</p>
                    <p><b>活跃新用户占比:</b>活跃新用户/活跃用户</p>
                </div>
            </Poptip>
        </div>
        <Table border size='small' :no-data-text='noDataText' :columns="columns_orderData" :data="orderData"></Table>
        <Page :total="totalListNum" show-sizer show-elevator  placement="top" :styles='page' :current='currentPage' v-show="pageShow"  @on-change="handleCurrentPage" @on-page-size-change="handlePageSize" show-sizer :page-size="pageSize" :page-size-opts='pageSizeOpts'></Page>
      </div>

      <div class="activeUserDetail_chart" v-show="noDataBox">
            <Spin fix size="large" v-if="spinShow2"  class="spin">
                <Icon type="load-c" size=18 class="demo-spin-icon-load" style="color: #ccc;"></Icon>
                <div style="color: #ccc; text-indent: 5px;">  loading...</div>
            </Spin>
            <div id="activeUserDetail" style="min-width:400px; height: 400px;"></div>
      </div>
  </div>
</template>
<style lang='scss' scoped type="text/css">
    #activeUserDetail_body {
        background: #ececec;
        .Breadcrumb {
            width: 100%;
            height: 30px;
            font-size: 16px;
            line-height: 30px;
        }
        .Breadcrumb2 {
            width: 100%;
            height: 60px;
            line-height: 60px;
            background: #797979;
            padding-left: 10px;
            font-size: 23px;
            font-weight: bolder;
            span {
                color: #fff;
            }
        }
        #activeUserDetail_head {
            -moz-box-shadow:3px 4px 6px rgba(51, 51, 51, 0.43); 
            -webkit-box-shadow:3px 4px 6px rgba(51, 51, 51, 0.43); 
            box-shadow: 3px 4px 6px rgba(51, 51, 51, 0.43);
            font-size: 14px;
            background: #fff;
            padding: 12px 10px 10px 10px;
            position: relative;
            div.activeUserDetail_head_time {
                margin-bottom: 10px;
                font-size: 13px;
                span:nth-of-type(1) {
                    margin-right: 12px;
                }
                button {
                    width: 80px;
                    height: 30px;
                    line-height: 30px;
                    cursor: pointer;
                    display: inline-block;
                    background: #fff;
                    border: 1px solid #dddee1;
                    border-radius: 4px;
                    text-align: center;
                    color: #565c6b;
                    outline: none;
                    margin-right: 10px;
                }
                button:nth-last-of-type(1) {
                    width: 80px;
                }
                button.active {
                    border: 1px solid orange;
                    color: orange;
                }

            }
            div.timeSelectShow {
                display: inline;
                position: absolute;
                left: 523px;
                top: 9px;
                div.search {
                    display: inline-block;
                    button {
                        width: 80px;
                        height: 32px;
                        line-height: 32px;
                        cursor: pointer;
                        margin-left: 3px;
                        display: inline-block;
                        border-radius: 4px;
                        text-align: center;
                        outline: none;
                        margin-right: 10px;
                        color: #fff;
                        background: #444;
                        font-weight: bolder;
                        border: 1px solid #444;
                    }
                    button:hover {
                        background: #666;
                        border: 1px solid #666;
                    }
                }
            }
        }
        .activeUserDetail_table {
            padding: 10px;
            margin-top: 20px;
            background: #fff;
            position: relative;
            overflow: hidden;
            padding-top: 3px;
            .spin {
                position: absolute;
                display: inline-block;
                // background-color: rgba(253, 248, 248,0.0); 
                background-color: rgba(255, 255, 255, 0.8); 
            }
            .help {
                width: 100%;
                height: 30px;
                line-height: 30px;
                overflow: hidden;
                span {
                    display: inline-block;
                    width: 18px;
                    height: 18px;
                    background: orange;
                    line-height: 18px;
                    color: #fff;
                    font-weight: bolder;
                    border-radius: 50%;
                    text-align: center;
                    font-size: 16px;
                    cursor: pointer;
                    margin-bottom: 10px;
                }
                .content {
                    p {
                        width: 100%;
                        color: #444;
                        font-size: 12px;
                        b {
                            width: 120px;
                            color: #444;
                            font-size: 12px;
                            display: inline-block;
                            text-align: right;
                            margin-right: 10px;
                        }
                    }
                }
            }
        }
        .activeUserDetail_chart {
            position: relative;
            margin-top: 20px;
            padding: 10px;
            background: #fff;
            .spin {
                position: absolute;
                display: inline-block;
                // background-color: rgba(253, 248, 248,0.0); 
                background-color: rgba(255, 255, 255, 0.8); 
            }
        }
    }
</style>
<script>
import moment from 'moment'
import citySelect from '../../../components/citySelect.vue'
import { siblings } from '../../../util/util.js'
import $ from 'jquery'
var Highcharts = require('highcharts');
// 在 Highcharts 加载之后加载功能模块
require('highcharts/modules/exporting')(Highcharts);
export default {
    components: {
        "city-select": citySelect
    },
    data () {
        return {
            timeSelectShow: false,
            timeLine: ['',''],
            page: {
                'float': 'right',
                'margin-top': '20px'
            },
            totalListNum: 100,
            pageSizeOpts: [10, 20, 30, 40],
            pageSize: 10,
            currentPage: 1,
            pageShow: false,
            city: '',
            columns_orderData: [
                {
                    title: '日期',
                    key: 'time'
                },
                {
                    title: '累计用户数量',
                    key: 'userCount'
                },
                {
                    title: '活跃用户数',
                    key: 'active'
                },
                {
                    title: '活跃用户比率',
                    key: 'activeRate'
                },
                {
                    title: '活跃新用户',
                    key: 'newActive'
                },
                {
                    title: '活跃新用户占比',
                    key: 'newActiveRate'
                }
            ],
            orderData: [],
            noDataBox: false,
            spinShow: false,
            spinShow2: false,
            noDataText: '',
            chartDataX: [],
            chartActiveUser: [],
            chartActiveRate: [],
            chartNewActiveRate: [],
            loadFlag: false,
            options: {
                disabledDate(date) {
                    return date&&date.valueOf()> Date.now() - 86400000
                }
            },
            transfer: true
        }
    },
    mounted () {
        document.title = '用户数据 - 活跃用户详情'
        this.loadData("3")
    },
    methods: {
        loadData (type) {
            this.spinShow = true
            this.spinShow2 = true
            this.noDataText = ''

            // 调取数据前，清空chart数据
            this.chartActiveUser = []
            this.chartActiveRate = []
            this.chartNewActiveRate = []
            this.chartDataX = []

            this.city = this.$route.params.id.split('&')[1]
            // 节流防止用户快速点击数据串行
            this.loadFlag = false
            this.axios.get('/beefly/activeUser/getCityData', {
                params: {
                    accessToken: this.$store.state.token,
                    type: type,
                    cityCode: this.$route.params.id.split('&')[0].toString(),
                    pageNo: this.currentPage,
                    pageSize: this.pageSize,
                    beginDate: this.timeLine[0] === ''||this.timeLine[0] === null?'':moment(this.timeLine[0]).format('YYYY-MM-DD'),
                    endDate: this.timeLine[0] === ''||this.timeLine[0] === null?'':moment(this.timeLine[1]).format('YYYY-MM-DD')
                }
            })
            .then( res => {
                var data = res.data.data
                this.spinShow = false
                if (res.data.resultCode != 1) {
                    this.currentPage = 1
                    this.pageShow = false
                    this.noDataText = '暂无数据'
                    this.noDataBox = true
                    this.loadChartData($('.activeUserDetail_head_time button.active').attr('myId'))
                    this.orderData = []
                } else {
                    this.orderData = data

                    this.noDataBox = true
                    this.loadChartData($('.activeUserDetail_head_time button.active').attr('myId'))
                    // 处理分页数据
                    if (res.data.totalPage < 2 && this.pageSize === 10) {
                        this.pageShow = false
                    } else {
                        this.pageShow = true
                    }
                    this.totalListNum = res.data.totalItems
                }

            })
            .catch( err => {
                this.spinShow = false
                this.noDataText = '暂无数据'
                console.log(err)
            })
        },
        loadChartData (type) {
            this.axios.get('/beefly/activeUser/getCityChartData', {
                params: {
                    accessToken: this.$store.state.token,
                    type: type,
                    cityCode: this.$route.params.id.split('&')[0].toString(),
                    beginDate: this.timeLine[0] === ''||this.timeLine[0] === null?'':moment(this.timeLine[0]).format('YYYY-MM-DD'),
                    endDate: this.timeLine[0] === ''||this.timeLine[0] === null?'':moment(this.timeLine[1]).format('YYYY-MM-DD')
                }
            })
            .then( res => {
                // console.log(res.data.data)
                this.spinShow2 = false
                var chartData = res.data.data
                console.log(chartData)
                if (res.data.resultCode === 0) {
                    $('#activeUserDetail').html('')
                    this.noDataBox = false
                    this.loadFlag = true
                } else {
                    this.noDataBox = true
                    chartData.map( item => {
                        this.chartActiveUser.push(Number(this.delcommafy(item.active)))
                        this.chartActiveRate.push(Number(this.delcommafy(item.activeRate)))
                        this.chartNewActiveRate.push(Number(this.delcommafy(item.newActiveRate)))
                        this.chartDataX.push(item.time)
                    })
                    this.initChart()
                    this.loadFlag = true
                }

            })
            .catch( err => {
                this.spinShow = false
                this.noDataText = '暂无数据'
                console.log(err)
            })
        },
        handleClick (e) {
            this.currentPage = 1
            this.pageSize = 10
            var elems = siblings(e.target)
            for (var i = 0; i < elems.length; i++) {
                elems[i].setAttribute('class', '')
            }
            e.target.setAttribute('class', 'active')
            if (e.target.innerHTML === '指定时间段') {
                this.timeSelectShow = true
            } else {
                this.timeSelectShow = false
                this.timeLine = ['','']
                if (this.loadFlag === true) {
                    this.loadData(e.target.getAttribute('myId'))
                } else {
                    return
                }
            }
        },
        searchByTimeLine () {
            if (this.timeLine[0] === '' || this.timeLine[0] === null) {
                this.$Message.warning('请选择时间段')
            } else {
                this.loadData('5')
            }
        },
        handleCurrentPage(currentPage) {
            this.currentPage = currentPage
            if (this.loadFlag === true) {
                this.loadData($('.activeUserDetail_head_time button.active').attr('myId'))
            }
        },
        handlePageSize(pageSize) {
            this.currentPage = 1
            this.pageSize = pageSize
            if (this.loadFlag === true) {
                this.loadData($('.activeUserDetail_head_time button.active').attr('myId'))
            }
        },
        delcommafy(num){
            if (num < 1000) {
                return num;
            } else {
                num=num.replace(/,/gi,'');
                return num;
            }
        },
        initChart () {
            var options = {
                title: {
                    text: this.city + '订单金额及实收率统计图'
                },
                subtitle: {
                    text: '',
                    align: 'right',
                    verticalAlign: 'top',
                    style: {
                        color: '#ccc',
                        fontSize: '12px'
                    }
                },
                credits:{
                    enabled:false
                },
                exporting:{
                    enabled:false
                },
                xAxis: {
                    categories: this.chartDataX
                },
                yAxis: [{
                          labels: {
                              // formatter:function(){
                              //     return Highcharts.numberFormat(this.value, 2, ".",",") + '元'
                              // },
                              style: {
                                  color: Highcharts.getOptions().colors[1]
                              }
                          },
                          title: {
                              text: '用户数',
                              style: {
                                  color: Highcharts.getOptions().colors[1]
                              }
                          }
                      }, {
                          opposite: true,
                          tickPositions: [0, 20, 40, 60, 80, 100],
                          title: {
                              text: '占比',
                              style: {
                                  color: '#9999ff'
                              }
                          },
                          labels: {                        
                              // formatter:function(){
                              //     if (Number(this.value) <= 100) {
                              //         return this.value + '%'
                              //     } else {
                              //         return 100 + '%'
                              //     }
                              // },
                              format: '{value}%',
                              style: {
                                  color: '#9999ff'
                              }
                          }
                      }],
                legend: {
                    align: 'center',
                    x: 0,
                    verticalAlign: 'bottom',
                    y: 0,
                    floating: false,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                    shadow: false
                },
                colors: ['#4472c4', '#ed7d31', '#9999ff', '#ffc000', '#5b9bd5', '#70ad48', '#264478', '#9e480e', '#636363', '#997300'],
                tooltip: {
                    shared: true,
                    useHTML: true,
                    headerFormat: "<p'>{point.key}</p>",
                    pointFormatter:function () {
                        if (this.series.name === '活跃用户') {
                            return "<span>" + this.series.name + ':  </span>' + [new String(this.y).length<3?this.y:Highcharts.numberFormat(this.y, 2, ".",",")] + '<br>'
                        } else {
                            return "<span>" + this.series.name + ':  </span>' + Highcharts.numberFormat(this.y, 1) + '%' + '<br>'
                        }
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: false,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                            style: {
                                textShadow: '0 0 3px black'
                            }
                        }
                    }
                },
                series: [{
                    name: '活跃用户',
                    type: 'column',
                    data: this.chartActiveUser,
                    yAxis: 0,
                    maxPointWidth: 100
                }, {
                    name: '活跃用户占比',
                    type: 'line',
                    data: this.chartActiveRate,
                    tooltip: {
                        valueSuffix: ''
                    },
                    yAxis: 1
                }, {
                    name: '活跃新用户占比',
                    type: 'line',
                    data: this.chartNewActiveRate,
                    tooltip: {
                        valueSuffix: ''
                    },
                    yAxis: 1
                } ]
            }
            // Highcharts.getOptions().plotOptions.pie.colors = (function () {
            //         var colors = ['#4472c4', '#ed7d31', '#9999ff']
            //         return colors;
            // }());
            new Highcharts.chart('activeUserDetail', options);
            
        }
    }
}
</script>