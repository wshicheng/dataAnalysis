<template>
  <div id="orderStatus_body">
        <Breadcrumb class="Breadcrumb">
            <BreadcrumbItem>订单状态构成</BreadcrumbItem>
        </Breadcrumb>
      <div id="orderStatus_head">
        <div class="orderStatus_head_time">
            <span>时间:</span>
            <button class="active" @click="handleClick">今日</button>
            <button @click="handleClick">昨日</button>
            <button @click="handleClick">近七日</button>
            <button @click="handleClick">近30天</button>
            <button @click="handleClick">指定时间段</button>
        </div>
        <div class="timeSelectShow" v-show="timeSelectShow">
            <DatePicker type="daterange" v-model="timeLine" placement="bottom-end" placeholder="选择日期" style="width: 216px; vertical-align: top;"></DatePicker>
            <div class="search"><button @click="searchByTimeLine">搜索</button></div>
        </div>
        <city-select></city-select>
      </div>

      <div class="orderStatus_table">
        <Table border size='small' :columns="columns_orderStatusData" :data="orderStatusData"></Table>
        <Page :total="100" show-sizer show-elevator :styles='page' placement="bottom"></Page>
      </div>

      <div class="orderStatus_chart">
          <div id="container" style="min-width:400px; height: 400px;"></div>
      </div>
  </div>
</template>
<style lang='scss' scoped type="text/css">
    #orderStatus_body {
        background: #ececec;
        .Breadcrumb {
            width: 100%;
            height: 30px;
            font-size: 16px;
            line-height: 30px;
        }
        #orderStatus_head {
            -moz-box-shadow:3px 4px 6px rgba(51, 51, 51, 0.43); 
            -webkit-box-shadow:3px 4px 6px rgba(51, 51, 51, 0.43); 
            box-shadow: 3px 4px 6px rgba(51, 51, 51, 0.43);
            font-size: 14px;
            background: #fff;
            padding: 12px 10px 0 10px;
            overflow: hidden;
            position: relative;
            div.orderStatus_head_time {
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
        .orderStatus_table {
            padding: 10px;
            margin-top: 20px;
            background: #fff;
            overflow: hidden;
        }
        .orderStatus_chart {
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
            columns_orderStatusData: [
                {
                    title: '订单状态',
                    key: 'orderStatus'
                },
                {
                    title: '订单数',
                    key: 'orderNum'
                },
                {
                    title: '数量占比',
                    key: 'numPercent'
                }
            ],
            orderStatusData: [
                {
                    orderStatus: '人工开锁',
                    orderNum: '432423',
                    numPercent: '2%'
                }, {
                    orderStatus: '人工开锁',
                    orderNum: '432423',
                    numPercent: '2%'
                }, {
                    orderStatus: '人工开锁',
                    orderNum: '432423',
                    numPercent: '2%'
                }, {
                    orderStatus: '人工开锁',
                    orderNum: '432423',
                    numPercent: '2%'
                }, {
                    orderStatus: '人工开锁',
                    orderNum: '432423',
                    numPercent: '2%'
                }
            ]
        }
    },
    mounted () {
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
        initChart () {
            var options = {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                credits:{
                    enabled:false
                },
                exporting:{
                    enabled:false
                },
                title: {
                    text: '订单状态的构成'
                },
                tooltip: {
                    headerFormat: '{series.name}<br>',
                    pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    type: 'pie',
                    name: '不同订单状态的比例',
                    data: [
                        ['待出租',   45.0],
                        ['已预定',       26.8],
                        // {
                        //     name: 'Chrome',
                        //     y: 12.8,
                        //     sliced: true,
                        //     selected: true
                        // },
                        ['已出租',    8.5],
                        ['维护中',    6.2]
                    ]
                }]
            }

            new Highcharts.chart('container', options);
        }
    }
}
</script>