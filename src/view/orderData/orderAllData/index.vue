<template>
  <div id="orderAllData_body">
        <Breadcrumb class="Breadcrumb">
            <BreadcrumbItem>整体数据</BreadcrumbItem>
        </Breadcrumb>
      <div id="orderAllData_head">
        <div class="orderAllData_head_time">
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

      <div class="orderAllData_table">
        <div class="help">
            <Poptip trigger="hover" style="float: right;"  placement="top-end" title="提示标题" content="提示内容">
                <span>?</span>
            </Poptip>
        </div>
        <Table border size='small' :columns="columns_orderData" :data="orderData"></Table>
        <Page :total="100" show-sizer show-elevator :styles='page' placement="bottom"></Page>
      </div>

      <div class="orderAllData_chart">
          <div id="container" style="min-width:400px; height: 400px;"></div>
      </div>
  </div>
</template>
<style lang='scss' scoped type="text/css">
    #orderAllData_body {
        background: #ececec;
        .Breadcrumb {
            width: 100%;
            height: 30px;
            font-size: 16px;
            line-height: 30px;
        }
        #orderAllData_head {
            -moz-box-shadow:3px 4px 6px rgba(51, 51, 51, 0.43); 
            -webkit-box-shadow:3px 4px 6px rgba(51, 51, 51, 0.43); 
            box-shadow: 3px 4px 6px rgba(51, 51, 51, 0.43);
            font-size: 14px;
            background: #fff;
            padding: 12px 10px 0 10px;
            overflow: hidden;
            position: relative;
            div.orderAllData_head_time {
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
        .orderAllData_table {
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
                    float: right;
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    background: orange;
                    color: #fff;
                    font-weight: bolder;
                    border-radius: 50%;
                    text-align: center;
                    font-size: 18px;
                    cursor: pointer;
                    margin-bottom: 10px;
                }
            }
        }
        .orderAllData_chart {
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
                    title: '地区',
                    key: 'area'
                },
                {
                    title: '订单数',
                    key: 'orderNum',
                    sortable: true
                },
                {
                    title: '订单金额(￥)',
                    key: 'orderMoney',
                    sortable: true
                },
                {
                    title: '均单价',
                    key: 'price',
                    sortable: true
                },
                {
                    title: '实际支付金额',
                    key: 'actualMoney',
                    sortable: true
                },
                {
                    title: '实收率',
                    key: 'earningMoney'
                },
                {
                    title: '优惠卷订单数',
                    key: 'discountsNum'
                },
                {
                    title: '平均订单时长(min)',
                    key: 'time',
                    width: 150
                },
                {
                    title: '平均订单里程(m)',
                    key: 'mileage'
                }
            ],
            orderData: [
                {
                    area: '无为',
                    orderNum: '432423',
                    orderMoney: '23213123',
                    price: '2',
                    actualMoney: '323',
                    earningMoney: '20%',
                    discountsNum: '234',
                    time: '232',
                    mileage: '20',
                },{
                    area: '无为',
                    orderNum: '432423',
                    orderMoney: '23213123',
                    price: '2',
                    actualMoney: '323',
                    earningMoney: '20%',
                    discountsNum: '234',
                    time: '232',
                    mileage: '20',
                },{
                    area: '无为',
                    orderNum: '432423',
                    orderMoney: '23213123',
                    price: '2',
                    actualMoney: '323',
                    earningMoney: '20%',
                    discountsNum: '234',
                    time: '232',
                    mileage: '20',
                },{
                    area: '无为',
                    orderNum: '432423',
                    orderMoney: '23213123',
                    price: '2',
                    actualMoney: '323',
                    earningMoney: '20%',
                    discountsNum: '234',
                    time: '232',
                    mileage: '20',
                },{
                    area: '无为',
                    orderNum: '432423',
                    orderMoney: '23213123',
                    price: '2',
                    actualMoney: '323',
                    earningMoney: '20%',
                    discountsNum: '234',
                    time: '232',
                    mileage: '20',
                },{
                    area: '无为',
                    orderNum: '432423',
                    orderMoney: '23213123',
                    price: '2',
                    actualMoney: '323',
                    earningMoney: '20%',
                    discountsNum: '234',
                    time: '232',
                    mileage: '20',
                },{
                    area: '无为',
                    orderNum: '432423',
                    orderMoney: '23213123',
                    price: '2',
                    actualMoney: '323',
                    earningMoney: '20%',
                    discountsNum: '234',
                    time: '232',
                    mileage: '20',
                },{
                    area: '无为',
                    orderNum: '432423',
                    orderMoney: '23213123',
                    price: '2',
                    actualMoney: '323',
                    earningMoney: '20%',
                    discountsNum: '234',
                    time: '232',
                    mileage: '20',
                },{
                    area: '无为',
                    orderNum: '432423',
                    orderMoney: '23213123',
                    price: '2',
                    actualMoney: '323',
                    earningMoney: '20%',
                    discountsNum: '234',
                    time: '232',
                    mileage: '20',
                },{
                    area: '无为',
                    orderNum: '432423',
                    orderMoney: '23213123',
                    price: '2',
                    actualMoney: '323',
                    earningMoney: '20%',
                    discountsNum: '234',
                    time: '232',
                    mileage: '20',
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
                    type: 'column'
                },
                title: {
                    text: '堆叠柱形图'
                },
                credits:{
                    enabled:false
                },
                exporting:{
                    enabled:false
                },
                xAxis: {
                    categories: ['苹果', '橘子', '梨', '葡萄', '香蕉']
                },
                yAxis: [{ // Primary yAxis
                            labels: {
                                format: '{value}°C',
                                style: {
                                    color: Highcharts.getOptions().colors[2]
                                }
                            },
                            title: {
                                text: '温度',
                                style: {
                                    color: Highcharts.getOptions().colors[2]
                                }
                            },
                            opposite: true
                        }, { // Secondary yAxis
                            gridLineWidth: 0,
                            title: {
                                text: '降雨量',
                                style: {
                                    color: Highcharts.getOptions().colors[0]
                                }
                            },
                            labels: {
                                format: '{value} mm',
                                style: {
                                    color: Highcharts.getOptions().colors[0]
                                }
                            }
                        }, { // Tertiary yAxis
                            gridLineWidth: 0,
                            title: {
                                text: '海平面气压',
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            },
                            labels: {
                                format: '{value} mb',
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            },
                            opposite: true
                        }],
                legend: {
                    align: 'center',
                    x: 0,
                    verticalAlign: 'bottom',
                    y: 0,
                    floating: false,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                    // borderColor: '#CCC',
                    // borderWidth: 1,
                    shadow: false
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.x + '</b><br/>' +
                            this.series.name + ': ' + this.y + '<br/>' +
                            '总量: ' + this.point.stackTotal;
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                            style: {
                                textShadow: '0 0 3px black'
                            }
                        }
                    }
                },
                series: [{
                    name: '小张',
                    data: [5, 3, 4, 7, 2]
                }, {
                    name: '小彭',
                    data: [2, 2, 3, 2, 1]
                }, {
                    name: '小潘',
                    data: [3, 4, 4, 2, 5]
                }, {
                    name: '温度',
                    type: 'spline',
                    data: [7.0, 6.9, 9.5,6.9, 9.5],
                    tooltip: {
                        valueSuffix: ' °C'
                    }
                }]
            }

            new Highcharts.chart('container', options);
        }
    }
}
</script>