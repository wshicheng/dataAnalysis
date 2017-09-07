<template>
    <div id="dateAndArea_body">
            <Breadcrumb class="Breadcrumb">
                <BreadcrumbItem>整体数据</BreadcrumbItem>
            </Breadcrumb>
        <div id="dateAndArea_head">
            <div class="dateAndArea_head_time">
                <span>时间:</span>
                <button class="active"@click="handleClick">近七日</button>
                <button @click="handleClick">近30天</button>
                <button @click="handleClick">指定时间段</button>
            </div>
            <div class="timeSelectShow" v-show="timeSelectShow">
                <DatePicker type="daterange" v-model="timeLine" placement="bottom-end" placeholder="选择日期" style="width: 216px; vertical-align: top;"></DatePicker>
                <div class="search"><button @click="searchByTimeLine">搜索</button></div>
            </div>
            <city-select></city-select>
        </div>

        <div class="dateAndArea_table">
            <div class="help">
                <Poptip trigger="hover" style="float: right;"  placement="top-end" title="提示标题" content="提示内容">
                    <span>?</span>
                </Poptip>
            </div>
            <Table border size='small' :columns="columns_orderData" :data="orderData"></Table>
            <Page :total="100" show-sizer show-elevator :styles='page' placement="bottom"></Page>
        </div>

        <div class="dateAndArea_chart">
            <div id="container" style="min-width:400px; height: 400px;"></div>
        </div>
    </div>
</template>
<style lang='scss' scoped type="text/css">
    #dateAndArea_body {
        background: #ececec;
        .Breadcrumb {
            width: 100%;
            height: 30px;
            font-size: 16px;
            line-height: 30px;
        }
        #dateAndArea_head {
            -moz-box-shadow:3px 4px 6px rgba(51, 51, 51, 0.43); 
            -webkit-box-shadow:3px 4px 6px rgba(51, 51, 51, 0.43); 
            box-shadow: 3px 4px 6px rgba(51, 51, 51, 0.43);
            font-size: 14px;
            background: #fff;
            padding: 10px;
            overflow: hidden;
            position: relative;
            div.dateAndArea_head_time {
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
                left: 335px;
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
        .dateAndArea_table {
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
        .dateAndArea_chart {
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
                    type: 'line'
                },
                title: {
                    text: '分日期分地区 订单金额'
                },
                subtitle: {
                    text: '*地区超过10个时，显示排名靠前的10个地区'
                },
                credits:{
                    enabled:false
                },
                exporting:{
                    enabled:false
                },
                xAxis: {
                    categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
                },
                yAxis: {
                    title: {
                        text: '气温 (°C)'
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true          // 开启数据标签
                        },
                        enableMouseTracking: false // 关闭鼠标跟踪，对应的提示框、点击事件会失效
                    }
                },
                series: [{
                    name: '东京',
                    data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                }, {
                    name: '伦敦',
                    data: [3.9, 3.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
                }, {
                    name: '伦敦',
                    data: [3.9, 17.2, 2.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
                }, {
                    name: '伦敦',
                    data: [3.9, 4.2, 0.7, 8.5, 11.9, 13.2, 16.0, 12.2, 14.2, 68.3,16.6, 4.8]
                }, {
                    name: '伦敦',
                    data: [3.9, 4.2, 1.7, 8.5, 11.9, 12.2, 17.0, 16.6, 14.2, 10.3,12.2, 4.8]
                }, {
                    name: '伦敦',
                    data: [3.9, 4.2,12.2, 17.2, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
                }, {
                    name: '伦敦',
                    data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
                }, {
                    name: '伦敦',
                    data: [3.9, 4.2,12.2, 17.2, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6,12.2]
                }, {
                    name: '伦敦',
                    data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 12.2, 14.2, 10.3, 6.6, 4.8]
                }, {
                    name: '伦敦',
                    data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 12.2, 17.2, 17.2]
                }]
            }

            new Highcharts.chart('container', options);
        }
    }
}
</script>
