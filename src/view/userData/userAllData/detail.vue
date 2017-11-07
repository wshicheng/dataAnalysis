<template>
  <div id="userAllDataDetail_body">
        <Breadcrumb class="Breadcrumb2">
            <BreadcrumbItem>{{city}}订单整体数据</BreadcrumbItem>
        </Breadcrumb>
      <div id="userAllDataDetail_head">
        <div class="userAllDataDetail_head_time">
            <span>时间:</span>
            <DatePicker v-model="time" :clearable='clearable' @on-change='timeChange' type="date" :options='options' placeholder="选择日期" style="width: 216px;"></DatePicker>
            <span>*查询数据的截止日期</span>        
        </div>
      </div>

      <div class="userAllDataDetail_table">
        <Spin fix size="large" v-if="spinShow"  class="spin">
            <Icon type="load-c" size=18 class="demo-spin-icon-load" style="color: #ccc;"></Icon>
            <div style="color: #ccc; text-indent: 5px;">  loading...</div>
        </Spin>
        <div class="help">
            <Poptip trigger="hover" style="float: right;" placement="left-start" title="数据项说明" content="提示内容" transfer='true'>
                <span>?</span>
                <div class="content" slot="content">
                    <p><b>累计用户:</b>累计到查询日期的注册用户数</p>
                    <p><b>押金用户(累计):</b>累计用户中当前押金大于0的用户</p>
                    <p><b>日活跃用户:</b>所选日期当日有过一次有效订单的用户数</p>
                    <p><b>日活跃用户率:</b>日活跃用户/累计用户</p>
                    <p><b>月活跃用户:</b>包括所选日期在内的近30天中，有过3次以上有效订单的用户数</p>
                    <p><b>月活跃用户率:</b>月活跃用户/累计用户</p>
                    <p><b>仅注册用户(累计):</b>累计用户中仅注册，没有成功缴纳过押金的用户</p>
                    <p><b>已退押金用户(累计):</b>累计用户中，缴纳过押金，且查询时押金为0的用户</p>
                </div>
            </Poptip>
        </div>
        <Table border size='small' :no-data-text='noDataText' :columns="columns_orderData" :data="orderData"></Table>
        <Page :total="totalListNum" show-sizer show-elevator  placement="top" :styles='page' :current='currentPage' v-show="pageShow"  @on-change="handleCurrentPage" @on-page-size-change="handlePageSize" show-sizer :page-size="pageSize" :page-size-opts='pageSizeOpts'></Page>
      </div>

      <div class="userAllDataDetail_chart" v-show="noDataBox">
            <Spin fix size="large" v-if="spinShow2"  class="spin">
                <Icon type="load-c" size=18 class="demo-spin-icon-load" style="color: #ccc;"></Icon>
                <div style="color: #ccc; text-indent: 5px;">  loading...</div>
            </Spin>
            <div id="container" style="min-width:400px; height: 400px;"></div>
      </div>
  </div>
</template>
<style lang='scss' scoped type="text/css">
    #userAllDataDetail_body {
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
        #userAllDataDetail_head {
            -moz-box-shadow:3px 4px 6px rgba(51, 51, 51, 0.43); 
            -webkit-box-shadow:3px 4px 6px rgba(51, 51, 51, 0.43); 
            box-shadow: 3px 4px 6px rgba(51, 51, 51, 0.43);
            font-size: 14px;
            background: #fff;
            padding: 12px 10px 10px 10px;
            position: relative;
            div.userAllDataDetail_head_time {
                margin-bottom: 10px;
                span:nth-of-type(1) {
                    margin-right: 9px;
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
                span:nth-of-type(2) {
                    color: #ccc;
                    margin-left: 10px;
                    font-size: 13px;
                }
            }
        }
        .userAllDataDetail_table {
            padding: 10px;
            margin-top: 20px;
            background: #fff;
            position: relative;
            // overflow: hidden;
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
        .userAllDataDetail_chart {
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
            time:  Date.now() - 86400000,
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
                    key: 'createDate'
                },
                {
                    title: '累计用户',
                    key: 'totalUser',
                    // sortable: true
                },
                {
                    title: '押金用户(累计)',
                    key: 'depositUser'
                },
                {
                    title: '日活跃用户数',
                    key: 'dayActiveNum',
                    // sortable: true
                },
                {
                    title: '日活跃用户率',
                    key: 'dayActiveRate'
                },
                {
                    title: '月活跃用户数',
                    key: 'monthActiveNum',
                    // sortable: true
                },
                {
                    title: '月活跃用户率',
                    key: 'monthActiveRate'
                },
                {
                    title: '仅注册用户(累计)',
                    key: 'registerUser'
                },
                {
                    title: '已退押金用户',
                    key: 'unDepositUser'
                }
            ],
            orderData: [],
            noDataBox: false,
            spinShow: false,
            spinShow2: false,
            noDataText: '',
            chartDataX: [],
            chartDepositUser: [],
            chartUnDepositUser: [],
            chartRegisterUser: [],
            chartDepositUserRate: [],
            loadFlag: false,
            options: {
                disabledDate(date) {
                    return date&&date.valueOf()> Date.now() - 86400000
                }
            },
            clearable: false
        }
    },
    mounted () {
        document.title = '用户数据 - 分地区数据详情'
        this.loadData()
    },
    methods: {
        timeChange (newTime) {
            this.time = newTime
            if (this.time.length === '') {
                return
            } else {
                this.loadData()
            }
        },
        loadData () {
            this.currentPage = 1
            this.spinShow = true
            this.spinShow2 = true
            this.noDataText = ''

            // 调取数据前，清空chart数据
            this.chartDepositUser = []
            this.chartUnDepositUser = []
            this.chartRegisterUser = []
            this.chartDepositUserRate = []
            this.chartDataX = []

            this.city = this.$route.params.id.split('&')[1]
            // 节流防止用户快速点击数据串行
            this.loadFlag = false
            this.axios.get('/beefly/wholeUser/api/v1/cityDataPage', {
                params: {
                    accessToken: this.$store.state.token,
                    cityCode: this.$route.params.id.split('&')[0].toString(),
                    pageNo: this.currentPage,
                    pageSize: this.pageSize,
                    time: moment(this.time).format('YYYY-MM-DD')
                }
            })
            .then( res => {
                var data = res.data.data
                this.spinShow = false
                if (res.data.resultCode === 0) {
                    this.noDataText = '暂无数据'
                    this.loadChartData()
                    this.orderData = []
                } else {
                    this.orderData = data

                    this.loadChartData()
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
        loadChartData () {
            this.axios.get('/beefly/wholeUser/api/v1/cityDataChart', {
                params: {
                    accessToken: this.$store.state.token,
                    cityCode: this.$route.params.id.split('&')[0].toString(),
                    time: moment(this.time).format('YYYY-MM-DD')
                }
            })
            .then( res => {
                // console.log(res.data.data)
                this.spinShow2 = false
                var chartData = res.data.data
                console.log(chartData)
                if (res.data.resultCode === 0) {
                    $('#container').html('')
                    this.noDataBox = false
                    this.loadFlag = true
                } else {
                    this.noDataBox = true
                    chartData.map( item => {
                        this.chartDepositUser.push(Number(this.delcommafy(item.depositUser)))
                        this.chartUnDepositUser.push(Number(this.delcommafy(item.unDepositUser)))
                        this.chartRegisterUser.push(Number(this.delcommafy(item.registerUser)))
                        this.chartDepositUserRate.push(Number(item.depositUserRate))
                        this.chartDataX.push(item.createDate)
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
        handleCurrentPage(currentPage) {
            this.currentPage = currentPage
            if (this.loadFlag === true) {
                this.loadData()
            }
        },
        handlePageSize(pageSize) {
            this.currentPage = 1
            this.pageSize = pageSize
            if (this.loadFlag === true) {
                this.loadData()
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
                    text: this.city + '累计用户及累计押金用户占比'
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
                                text: '金额',
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            }
                        }, {
                            opposite: true,
                            tickPositions: [0, 20, 40, 60, 80, 100],
                            title: {
                                text: '实收率',
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
                tooltip: {
                    shared: true,
                    useHTML: true,
                    headerFormat: "<p'>{point.key}</p>",
                    pointFormatter:function () {
                        if (this.series.name != '累计押金用户占比') {
                            return "<span>" + this.series.name + ':  </span>' + [new String(this.y).length<3?this.y:Highcharts.numberFormat(this.y, 0, "",",")] + '<br>'
                        } else {
                            return "<span>" + this.series.name + ':  </span>' + Highcharts.numberFormat(this.y, 1) + '%'
                        }
                    }
                },
                colors: ['#4472c4', '#ed7d31', '#9999ff', '#ffc000', '#5b9bd5', '#70ad48', '#264478', '#9e480e', '#636363', '#997300'],
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
                    name: '累计押金用户',
                    type: 'column',
                    data: this.chartDepositUser,
                    yAxis: 0,
                    maxPointWidth: 100
                }, { 
                    name: '已退押金用户',
                    type: 'column',
                    data: this.chartUnDepositUser,
                    yAxis: 0,
                    maxPointWidth: 100
                }, { 
                    name: '仅注册用户',
                    type: 'column',
                    data: this.chartRegisterUser,
                    yAxis: 0,
                    maxPointWidth: 100
                }, {
                    name: '累计押金用户占比',
                    type: 'line',
                    data: this.chartDepositUserRate,
                    tooltip: {
                        valueSuffix: ''
                    },
                    yAxis: 1
                }]
            }
            // Highcharts.getOptions().plotOptions.pie.colors = (function () {
            //         var colors = ['#4472c4', '#ed7d31', '#9999ff']
            //         return colors;
            // }());
            new Highcharts.chart('container', options);
            
        }
    }
}
</script>