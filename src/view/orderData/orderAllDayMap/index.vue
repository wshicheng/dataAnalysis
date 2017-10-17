<template>
  <div id="orderAllDayMap_body">
        <Breadcrumb class="Breadcrumb">
            <BreadcrumbItem>24小时趋势</BreadcrumbItem>
        </Breadcrumb>
      <div id="orderAllDayMap_head">
        <div class="orderAllDayMap_head_time">
            <span>时间:</span>
            <button class="active" @click="handleClick">今日</button>
            <button @click="handleClick">昨日</button>
            <button @click="handleClick">近7日</button>
            <button @click="handleClick">近30天</button>
            <button @click="handleClick">指定时间段</button>
        </div>
        <div class="timeSelectShow" v-show="timeSelectShow">
            <DatePicker type="daterange" v-model="timeLine" placement="bottom-end" placeholder="选择日期" style="width: 216px; vertical-align: top;"></DatePicker>
            <div class="search"><button @click="searchByTimeLine">搜索</button></div>
        </div>
        <city-select></city-select>
      </div>

      <div class="orderAllDayMap_table">
        <div class="help">
            <Poptip trigger="hover" style="float: right;"  placement="top-end" title="数据项说明" content="提示内容">
                <span>?</span>
                <div class="content" slot="content">
                    <p><b>有效订单数:</b>当前时段有效订单数</p>
                    <p><b>有效订单占比:</b>当前时段有效订单数/全时段有效订单数</p>
                    <p><b>累计有效订单:</b>累计到当前时段的有效订单数</p>
                    <p><b>累计有效订单占比:</b>累计到当前时段有效订单数/全时段有效订单数</p>
                    <p><b>订单金额（￥）:</b>当前时段订单金额</p>
                    <p><b>订单金额占比:</b>当前时段订单金额/全时段订单金额</p>
                    <p><b>累计订单金额（￥）:</b>累计到当前时段的订单金额</p>
                    <p><b>累计订单金额占比:</b>累计到当前时段订单金额/全时段订单金额</p>
                </div>
            </Poptip>
        </div>
        <Table border size='small' :columns="columns_orderData" :data="orderData"></Table>
      </div>

      <div class="orderAllDayMap_chart">
        <div class="select">
            <button class="active" @click="chartType">订单数</button>
            <button @click="chartType">订单金额</button>
        </div>
        <div id="container" style="min-width:400px; height: 400px;"></div>
      </div>
  </div>
</template>
<style lang='scss' scoped type="text/css">
    #orderAllDayMap_body {
        background: #ececec;
        .Breadcrumb {
            width: 100%;
            height: 30px;
            font-size: 16px;
            line-height: 30px;
        }
        #orderAllDayMap_head {
            -moz-box-shadow:3px 4px 6px rgba(51, 51, 51, 0.43); 
            -webkit-box-shadow:3px 4px 6px rgba(51, 51, 51, 0.43); 
            box-shadow: 3px 4px 6px rgba(51, 51, 51, 0.43);
            font-size: 14px;
            background: #fff;
            padding: 12px 10px 0 10px;
            overflow: hidden;
            position: relative;
            div.orderAllDayMap_head_time {
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
        .orderAllDayMap_table {
            padding: 10px;
            margin-top: 20px;
            background: #fff;
            overflow: hidden;
            .help {
                width: 100%;
                height: 30px;
                line-height: 30px;
                overflow: hidden;
                margin-bottom: 10px;
                span {
                    display: inline-block;
                    width: 25px;
                    height: 25px;
                    background: orange;
                    line-height: 25px;
                    color: #fff;
                    font-weight: bolder;
                    border-radius: 50%;
                    text-align: center;
                    font-size: 18px;
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
        .orderAllDayMap_chart {
            .select {
                width: 100%;
                height: 40px;
                padding-left: 30px;
                line-height: 40px;
                button {
                    width: 48px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    border: none;
                    margin-right: 10px;
                    font-weight: bolder;
                    outline: none;
                    background: #fff;
                    cursor: pointer;
                }
                button.active {
                    border-bottom: 3px solid blue;
                }
            }
            margin-top: 20px;
            padding: 10px;
            background: #fff;
        }
    }
</style>
<script>
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
            timeLine: '',
            page: {
                'float': 'right',
                'margin-top': '20px'
            },
            columns_orderData: [
                {
                    title: '时间段',
                    key: 'timeLine'
                },
                {
                    title: '有效订单数',
                    key: 'orderNum'
                },
                {
                    title: '有效订单占比',
                    key: 'orderNumPercent'
                },
                {
                    title: '累计有效订单',
                    key: 'totalOrder'
                },
                {
                    title: '累计有效订单占比',
                    key: 'totalOrderPercent'
                },
                {
                    title: '订单金额(￥)',
                    key: 'orderMoney'
                },
                {
                    title: '订单金额占比',
                    key: 'orderMoneyPercent'
                },
                {
                    title: '累计订单金额(￥)',
                    key: 'totalOrderMoney'
                },
                {
                    title: '累计订单金额占比',
                    key: 'totalOrderMoneyPercent'
                }
            ],
            orderData: [
                {
                    timeLine: '0时',
                    orderNum: '432423',
                    orderNumPercent: '1%',
                    totalOrder: '3277',
                    totalOrderPercent: '2%',
                    orderMoney: '21231',
                    orderMoneyPercent: '10%',
                    totalOrderMoney: '2312312',
                    totalOrderMoneyPercent: '10%',
                }, {
                    timeLine: '0时',
                    orderNum: '432423',
                    orderNumPercent: '1%',
                    totalOrder: '3277',
                    totalOrderPercent: '2%',
                    orderMoney: '21231',
                    orderMoneyPercent: '10%',
                    totalOrderMoney: '2312312',
                    totalOrderMoneyPercent: '10%',
                }, {
                    timeLine: '0时',
                    orderNum: '432423',
                    orderNumPercent: '1%',
                    totalOrder: '3277',
                    totalOrderPercent: '2%',
                    orderMoney: '21231',
                    orderMoneyPercent: '10%',
                    totalOrderMoney: '2312312',
                    totalOrderMoneyPercent: '10%',
                }, {
                    timeLine: '0时',
                    orderNum: '432423',
                    orderNumPercent: '1%',
                    totalOrder: '3277',
                    totalOrderPercent: '2%',
                    orderMoney: '21231',
                    orderMoneyPercent: '10%',
                    totalOrderMoney: '2312312',
                    totalOrderMoneyPercent: '10%',
                }, {
                    timeLine: '0时',
                    orderNum: '432423',
                    orderNumPercent: '1%',
                    totalOrder: '3277',
                    totalOrderPercent: '2%',
                    orderMoney: '21231',
                    orderMoneyPercent: '10%',
                    totalOrderMoney: '2312312',
                    totalOrderMoneyPercent: '10%',
                }, {
                    timeLine: '0时',
                    orderNum: '432423',
                    orderNumPercent: '1%',
                    totalOrder: '3277',
                    totalOrderPercent: '2%',
                    orderMoney: '21231',
                    orderMoneyPercent: '10%',
                    totalOrderMoney: '2312312',
                    totalOrderMoneyPercent: '10%',
                }, {
                    timeLine: '0时',
                    orderNum: '432423',
                    orderNumPercent: '1%',
                    totalOrder: '3277',
                    totalOrderPercent: '2%',
                    orderMoney: '21231',
                    orderMoneyPercent: '10%',
                    totalOrderMoney: '2312312',
                    totalOrderMoneyPercent: '10%',
                }, {
                    timeLine: '0时',
                    orderNum: '432423',
                    orderNumPercent: '1%',
                    totalOrder: '3277',
                    totalOrderPercent: '2%',
                    orderMoney: '21231',
                    orderMoneyPercent: '10%',
                    totalOrderMoney: '2312312',
                    totalOrderMoneyPercent: '10%',
                }, {
                    timeLine: '0时',
                    orderNum: '432423',
                    orderNumPercent: '1%',
                    totalOrder: '3277',
                    totalOrderPercent: '2%',
                    orderMoney: '21231',
                    orderMoneyPercent: '10%',
                    totalOrderMoney: '2312312',
                    totalOrderMoneyPercent: '10%',
                }, {
                    timeLine: '0时',
                    orderNum: '432423',
                    orderNumPercent: '1%',
                    totalOrder: '3277',
                    totalOrderPercent: '2%',
                    orderMoney: '21231',
                    orderMoneyPercent: '10%',
                    totalOrderMoney: '2312312',
                    totalOrderMoneyPercent: '10%',
                }, {
                    timeLine: '0时',
                    orderNum: '432423',
                    orderNumPercent: '1%',
                    totalOrder: '3277',
                    totalOrderPercent: '2%',
                    orderMoney: '21231',
                    orderMoneyPercent: '10%',
                    totalOrderMoney: '2312312',
                    totalOrderMoneyPercent: '10%',
                }, {
                    timeLine: '0时',
                    orderNum: '432423',
                    orderNumPercent: '1%',
                    totalOrder: '3277',
                    totalOrderPercent: '2%',
                    orderMoney: '21231',
                    orderMoneyPercent: '10%',
                    totalOrderMoney: '2312312',
                    totalOrderMoneyPercent: '10%',
                }, {
                    timeLine: '0时',
                    orderNum: '432423',
                    orderNumPercent: '1%',
                    totalOrder: '3277',
                    totalOrderPercent: '2%',
                    orderMoney: '21231',
                    orderMoneyPercent: '10%',
                    totalOrderMoney: '2312312',
                    totalOrderMoneyPercent: '10%',
                }, {
                    timeLine: '0时',
                    orderNum: '432423',
                    orderNumPercent: '1%',
                    totalOrder: '3277',
                    totalOrderPercent: '2%',
                    orderMoney: '21231',
                    orderMoneyPercent: '10%',
                    totalOrderMoney: '2312312',
                    totalOrderMoneyPercent: '10%',
                }
            ]
        }
    },
    mounted () {
        document.title = '订单数据 - 24小时趋势'
        this.initChart()
    },
    methods: {
        handleClick (e) {
            var elems = siblings(e.target)
            for (var i = 0; i < elems.length; i++) {
                elems[i].setAttribute('class', '')
            }
            e.target.setAttribute('class', 'active')
            if (e.target.innerHTML === '指定时间段') {
                this.timeSelectShow = true
            } else {
                this.timeSelectShow = false
                this.timeLine = ''
            }
        },
        searchByTimeLine () {},
        chartType (e) {
            var elems = siblings(e.target)
            for (var i = 0; i < elems.length; i++) {
                elems[i].setAttribute('class', '')
            }
            e.target.setAttribute('class', 'active')
            this.initChart()
        },
        initChart () {
            var options = {
                    chart: {
                        zoomType: 'xy'
                    },
                    title: {
                        text: '24小时趋势图'
                    },
                    subtitle: {
                        text: ''
                    },
                    credits:{
                        enabled:false
                    },
                    exporting:{
                        enabled:false
                    },
                    xAxis: [{
                        categories: ['0时', '1时', '2时', '3时', '4时', '5时',
                                    '6时', '7时', '8时', '9时', '10时', '11时',
                                    '12时', '13时','14时', '15时','16时', '17时',
                                    '18时', '19时','20时', '21时','22时', '23时'],
                        crosshair: true
                    }],
                    yAxis: [{ // Primary yAxis
                        labels: {
                            format: '{value}',
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        },
                        title: {
                            text: $('.select button.active')[0].innerHTML === '订单数'?'订单数':'订单金额',
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        }
                    }, { // Secondary yAxis
                        title: {
                            text: $('.select button.active')[0].innerHTML === '订单数'?'累计订单数':'累计订单金额',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
                        labels: {
                            format: '{value} ',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
                        opposite: true
                    }],
                    tooltip: {
                        shared: true
                    },
                    series: [{
                        name: '订单数',
                        type: 'column',
                        yAxis: 1,
                        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4,49.9, 71.5, 106.4, 129.2, 144.0,49.9, 71.5, 106.4, 129.2, 144.0,129.2, 144.0],
                        tooltip: {
                            valueSuffix: ''
                        }
                    }, {
                        name: '累计订单数',
                        type: 'spline',
                        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6,7.0, 6.9, 9.5, 14.5, 18.2,7.0, 6.9, 9.5, 14.5, 18.2,18.2,18.2],
                        tooltip: {
                            valueSuffix: ''
                        }
                    }]
            }

            new Highcharts.chart('container', options);
        }
    }
}
</script>