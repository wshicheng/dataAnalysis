<template>
    <div id="dateTime_body">
        <Breadcrumb class="Breadcrumb">
            <BreadcrumbItem>订单时长分布</BreadcrumbItem>
        </Breadcrumb>
        <div id="dateTime_head">
            <div class="dateTime_head_time">
                <span>时间:</span>
                <button @click="handleClick" :myId='0'>今日</button>
                <button @click="handleClick" :myId='-1'>昨日</button>
                <button class="active" @click="handleClick" :myId='1'>近7日</button>
                <button @click="handleClick" :myId='2'>近30天</button>
                <button @click="handleClick" :myId='3'>指定时间段</button>
            </div>
            <div class="timeSelectShow" v-show="timeSelectShow">
                <DatePicker type="daterange" v-model="timeLine" placement="bottom-end" placeholder="选择日期" style="width: 216px; vertical-align: top;"></DatePicker>
                <div class="search">
                    <button class="DIY_button" @click="searchByTimeLine">查询</button>
                </div>
            </div>
            <city-select></city-select>
        </div>
        <div class="table">
            <div class="help">
                <Poptip trigger="hover" style="float: right;" placement="top-end" :title="poptipTitle">
                    <span>?</span>
                    <div class="content" slot="content">
                        <p>
                            <b>订单数:</b>各订单状态的订单数（非运维订单）</p>
                        <p>
                            <b>数量占比:</b>各订单状态的订单数（非运维订单）/订单总数</p>
                    </div>
                </Poptip>
            </div>
            <!-- <table>
                    <thead>
                      <tr>
                        <th>时间分布（m）</th>
                        <th>有效订单数</th>
                        <th>有效订单占比</th>
                        <th>订单金额</th>
                        <th>订单金额占比</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>0-5</td>
                        <td>3277</td>
                        <td>1%</td>
                        <td>3277</td>
                        <td>9%</td>
                      </tr>
                      <tr>
                        <td>5-10</td>
                        <td>3277</td>
                        <td>1%</td>
                        <td>3277</td>
                        <td>9%</td>
                      </tr>
                      <tr>
                        <td>10-15</td>
                        <td>3277</td>
                        <td>1%</td>
                        <td>3277</td>
                        <td>9%</td>
                      </tr>
                      <tr>
                        <td>15-20</td>
                        <td>3277</td>
                        <td>1%</td>
                        <td>3277</td>
                        <td>9%</td>
                      </tr>
                      <tr>
                         <td>20-25</td>
                        <td>3277</td>
                        <td>1%</td>
                        <td>3277</td>
                        <td>9%</td>
                      </tr>
                      <tr>
                         <td>25-30</td>
                        <td>3277</td>
                        <td>1%</td>
                        <td>3277</td>
                        <td>9%</td>
                      </tr>
                      <tr>
                         <td>30已上</td>
                        <td>3277</td>
                        <td>1%</td>
                        <td>3277</td>
                        <td>9%</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>合计</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table> -->
            <Table border :columns="columns1" :data="data2"></Table>
        </div>
        <div class="chart">
            <p class="vaildOrderNum">*数据来自有效订单数</p>
            <div v-if="citySelectNum.length<2?true:false">
                <chart title="订单时长分布" :xAxis="xAxis" :chartData="chartData"></chart>
            </div>
            <div v-else>
                <chart-more title="分地区订单时长分布" :xAxis="xAxis" :chartData="chartData"></chart-more>
            </div>

        </div>
    </div>
</template>
<style lang='scss' scoped type="text/css">
#dateTime_body {
    background: #ececec;
    .Breadcrumb {
        width: 100%;
        height: 30px;
        font-size: 16px;
        line-height: 30px;
    }
    div.table {
        padding: 20px;
        background: #fff;
        margin-top: 20px;
    }
    div.help {
        width: 100%;
        height: 30px;
        line-height: 30px;
        overflow: hidden;
        margin-bottom: 10px;
        span {

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
        .content {
            p {
                width: 100%;
                color: #444;
                font-size: 12px;
                b {
                    width: 50px;
                    color: #444;
                    font-size: 12px;
                    display: inline-block;
                    text-align: right;
                    margin-right: 10px;
                }
            }
        }
    }
    table {
        width: 100%;
        border-collapse: collapse;
        thead {
            tr {
                th {
                    font-weight: normal;
                    border: 1px solid rgb(174, 174, 174);
                    font-size: 14px;
                    height: 40px;
                    background: rgb(201, 201, 201);
                    padding-left: 5px;
                    box-sizing: border-box;
                }
            }
        }
        tbody {
            tr {
                td {
                    padding-left: 5px;
                    box-sizing: border-box;
                    font-size: 14px;
                    height: 30px;
                    line-height: 30px;
                    border: 1px solid rgb(174, 174, 174);
                }
            }
        }
        tfoot {
            tr {
                td {
                    padding-left: 5px;
                    box-sizing: border-box;
                    font-size: 14px;
                    height: 30px;
                    line-height: 30px;
                    border: 1px solid rgb(174, 174, 174);
                }
            }
        }
    }
    div.chart {
        margin-top: 20px;
        p.vaildOrderNum {
            background: #fff;
            text-align: right;
            padding-right: 20px;
            padding-top: 5px;
            color: #ccc;
        }
    }
    #dateTime_head {
        -moz-box-shadow: 3px 4px 6px rgba(51, 51, 51, 0.43);
        -webkit-box-shadow: 3px 4px 6px rgba(51, 51, 51, 0.43);
        box-shadow: 3px 4px 6px rgba(51, 51, 51, 0.43);
        font-size: 14px;
        background: #fff;
        padding: 12px 10px 0 10px;
        overflow: hidden;
        position: relative;
        div.dateTime_head_time {
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
            top: 11px;
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
        div.dateTime_type_select {
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
    }
}
</style>
<script>
import citySelect from '../../../components/citySelect.vue'
import moment from 'moment'
import { siblings, randomColor } from '../../../util/util.js'
import $ from 'jquery'
import chart from '../../../components/DataTimeChart/index.vue'
import chartMore from '../../../components/DataTimeChart/index2.vue'
export default {
    components: {
        "city-select": citySelect,
        chart,
        chartMore
    },
    data() {
        return {
            citySelectNum: '',
            columns1: [
                {
                    title: '时间分布',
                    key: 'time'
                },
                {
                    title: '有效订单数',
                    key: 'orderNum'
                },
                {
                    title: '有效订单占比',
                    key: 'validOrderRate'
                },
                {
                    title: '订单金额',
                    key: 'orderMoney',
                    renderHeader: function(h) {
                        return h('div', '订单金额（￥）')
                    }
                },
                {
                    title: '订单金额占比',
                    key: 'orderMoneyRate'
                }
            ],
            data2: [
                {
                    time: '0-5',
                    orderNum: 11328,
                    validOrderRate: '19%',
                    orderMoney: 23.01,
                    orderMoneyRate: '23.02%'
                },
                {
                    time: '5-10',
                    orderNum: 11528,
                    validOrderRate: '19%',
                    orderMoney: 23.01,
                    orderMoneyRate: '23.02%'
                },
                {
                    time: '10-15',
                    orderNum: 12821,
                    validOrderRate: '19%',
                    orderMoney: 23.01,
                    orderMoneyRate: '23.02%'
                },
                {
                    time: '15-20',
                    orderNum: 22228,
                    validOrderRate: '19%',
                    orderMoney: 23.01,
                    orderMoneyRate: '23.02%'
                },
                {
                    time: '20-25',
                    orderNum: 12123,
                    validOrderRate: '19%',
                    orderMoney: 23.01,
                    orderMoneyRate: '23.02%'
                },
                {
                    time: '25-30',
                    orderNum: 8543,
                    validOrderRate: '19%',
                    orderMoney: 23.01,
                    orderMoneyRate: '23.02%'
                },
                {
                    time: '30已上',
                    orderNum: 9332,
                    validOrderRate: '19%',
                    orderMoney: 23.01,
                    orderMoneyRate: '23.02%'
                },
                {
                    time: '合计',
                    orderNum: '合计-12328',
                    validOrderRate: '合计-19%',
                    orderMoney: '合计-9999',
                    orderMoneyRate: '合计23.02%'
                }
            ],
            data3: [
                {
                    name: '0-5',
                    data: [250, 250]
                }, 
                {
                    name: '5-10',
                    data: [500, 400,]
                }, 
                {
                    name: '10-15',
                    data: [100, 600,]
                }, 
                {
                    name: '15-20',
                    data: [200, 80,]
                },
                {
                    name: '25-30',
                    data: [300, 150, ]
                },
                {
                    name: '30已上',
                    data: [400, 200,]
                }
            ],
            timeSelectShow: false,
            timeLine: ['', ''],
            page: {
                'float': 'right',
                'margin-top': '20px'
            },
            chartTitleName: '有效订单数',
            totalTitle: true,
            ellipsis: true,
            poptipTitle: '数据字段说明'
        }
    },
    computed: {
        xAxis: function() {
            if (this.citySelectNum.length < 2) {
                var data = [...this.data2]
                data.pop()
                return data.map(item => item.time)
            } else {
                var arr = []
                this.$store.state.keepCitys.map((item) => {
                    this.citySelectNum.map((id) => {
                        if (item.code === id) {
                            console.log(item)
                            arr.push(item.name)
                         }
                        
                    })
                })
                return arr.unique()
            }

        },
        chartData: function() {
            if (this.citySelectNum.length <2) {
                var data = [...this.data2];
                data.pop()
                return data.map(item => { return { color: randomColor(), y: item.orderNum } })
            } else {
                var data = [...this.data3];
                return data
            }

        }
    },
    mounted() {
        this.citySelectNum = this.$store.state.cityList
        this.$store.dispatch('menuActiveName', '/index/dateTime')
        document.title = '订单数据 - 订单时长分布'
    },
    methods: {
        loadData(type) {
            this.spinShow = true
            this.noDataText = ''
            // 默认加载时去掉无数据图片

            this.axios.get('/beefly/dateCityOrders/api/v1/page', {
                params: {
                    accessToken: this.$store.state.token,
                    type: type,
                    beginDate: this.timeLine[0] === '' || this.timeLine[0] === null ? '' : moment(this.timeLine[0]).format('YYYY-MM-DD'),
                    endDate: this.timeLine[0] === '' || this.timeLine[0] === null ? '' : moment(this.timeLine[1]).format('YYYY-MM-DD'),
                    pageNo: this.current,
                    pageSize: this.pageSize,
                    cityCode: this.$store.state.cityList.toString()
                }
            })
                .then((res) => {
                    console.log(res.data.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        handleClick(e) {
            this.current = 1
            var elems = siblings(e.target)
            for (var i = 0; i < elems.length; i++) {
                elems[i].setAttribute('class', '')
            }
            e.target.setAttribute('class', 'active')
            if (e.target.innerHTML === '指定时间段') {
                this.timeSelectShow = true
            } else {
                this.timeSelectShow = false
                this.timeLine = ['', '']
                this.loadData(e.target.getAttribute('myId'))
            }
        },
        handleTypeClick(e) {
            this.chartTitleName = e.target.innerHTML
            this.current = 1
            var elems = siblings(e.target)
            for (var i = 0; i < elems.length; i++) {
                elems[i].setAttribute('class', '')
            }
            e.target.setAttribute('class', 'active')
            this.loadData($('.dateAndArea_head_time button.active').attr('myId'))
        },
        searchByTimeLine() {
            if (this.timeLine[0] === '' || this.timeLine[0] === null) {
                this.$Message.warning('请选择时间段')
            } else {
                this.loadData($('.dateAndArea_head_time button.active').attr('myId'))
            }
        },
        initChart() {
            var options = {
                chart: {
                    type: 'line'
                },
                title: {
                    text: '分日期分地区 ' + this.chartTitleName
                },
                subtitle: {
                    text: '*地区超过10个时，显示排名靠前的10个地区'
                },
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                tooltip: {
                    valueSuffix: '',
                    formatter: function() {
                        var type = $('.dateAndArea_type_select button.active').attr("myType")
                        console.log(type)
                        if (type === 'orderNum') {
                            if (this.point.y.length > 3) {
                                return '时间:' + this.point.category + '<br>' + this.point.series.name + ':' + Highcharts.numberFormat(this.point.y, 2, ",", " ") + '单/天';
                            } else {
                                return '时间:' + this.point.category + '<br>' + this.point.series.name + ':' + this.point.y + '单/天';
                            }
                        }
                        if (type == 'orderAmount' || type == 'avgAmount' || type == 'payAmount') {
                            if (this.point.y.length > 7) {
                                return '时间:' + this.point.category + '<br>' + this.point.series.name + ':' + Highcharts.numberFormat(this.point.y, 2, ",", " ") + '元/天';
                            } else {
                                return '时间:' + this.point.category + '<br>' + this.point.series.name + ':' + this.point.y + '元/天';
                            }
                        }

                    }
                },
                xAxis: {
                    categories: this.chartTime
                },
                yAxis: {
                    title: {
                        text: ''
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: false,        // 开启数据标签
                        },
                        enableMouseTracking: true, // 关闭鼠标跟踪，对应的提示框、点击事件会失效
                    }
                },
                series: this.chartData
            }

            new Highcharts.chart('container', options);
        },
        cityChange() {
            this.current = 1
            this.citySelectNum = this.$store.state.cityList
            this.loadData($('.dateAndArea_head_time button.active').attr('myId'))
            
        }
    },
    watch: {
        '$store.state.cityList': 'cityChange'
    }
}
</script>
