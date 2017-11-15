<template>
  <div id="orderStatus_body">
        <Breadcrumb class="Breadcrumb">
            <BreadcrumbItem>订单状态构成</BreadcrumbItem>
        </Breadcrumb>
      <div id="orderStatus_head">
        <div class="orderStatus_head_time">
            <span>时间:</span>
            <button@click="handleClick"  :myId='1'>今日</button>
            <button @click="handleClick" :myId='2'>昨日</button>
            <button class="active" @click="handleClick" :myId='3'>近7日</button>
            <button @click="handleClick" :myId='4'>近30天</button>
            <button @click="handleClick" :myId='5'>指定时间段</button>
        </div>
        <div class="timeSelectShow" v-show="timeSelectShow">
            <DatePicker type="daterange" v-model="timeLine" :options='options' placement="bottom-end" placeholder="选择日期" style="width: 216px; vertical-align: top;"></DatePicker>
            <div class="search"><button @click="searchByTimeLine">查询</button></div>
        </div>
        <city-select></city-select>
      </div>

      <div class="orderStatus_table">
        <Spin fix size="large" v-if="spinShow"  class="spin">
            <Icon type="load-c" size=18 class="demo-spin-icon-load" style="color: #ccc;"></Icon>
            <div style="color: #ccc; text-indent: 5px;">  loading...</div>
        </Spin>
        <div class="help">
            <Poptip trigger="hover" style="float: right;"  placement="top-end" :title="poptipTitle" :transfer='transfer'>
                <span>?</span>
                <div class="content" slot="content">
                    <p><b>订单数:</b>各订单状态的订单数（非运维订单）</p>
                    <p><b>数量占比:</b>各订单状态的订单数（非运维订单）/订单总数</p>
                </div>
            </Poptip> 
        </div>
        <Table :no-data-text='noDataText'  border size='small' :columns="columns_orderStatusData" :data="orderStatusData"></Table>
        <!-- <Page :total="100" show-sizer show-elevator :styles='page' placement="bottom"></Page> -->
      </div>

      <div v-show="noData" class="orderStatus_chart">
            <Spin fix size="large" v-if="spinShow"  class="spin">
                <Icon type="load-c" size=18 class="demo-spin-icon-load" style="color: #ccc;"></Icon>
                <div style="color: #ccc; text-indent: 5px;">  loading...</div>
            </Spin>
            <div class="nodata" v-show="!noData" style="text-align:center;">
                <i class="iconfont icon-zanwushuju" style="font-size:400px;color:#dedcdc;"></i>
            </div>
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
                font-size: 13px;
                margin-bottom: 10px;
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
        }
        .orderStatus_table {
            position: relative;
            padding: 10px;
            margin-top: 20px;
            background: #fff;
            padding-top: 3px;
            overflow: hidden;
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
        }
        .orderStatus_chart {
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
import citySelect from '../../../components/citySelect.vue'
import { siblings } from '../../../util/util.js'
import moment from 'moment'
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
            spinShow: false,
            page: {
                'float': 'right',
                'margin-top': '20px'
            },
            columns_orderStatusData: [
                {
                    title: '订单状态',
                    key: 'orderFlow'
                },
                {
                    title: '订单数',
                    key: 'num'
                },
                {
                    title: '数量占比',
                    key: 'proportion'
                }
            ],
            orderStatusData: [],
            noDataText: '',
            chartArr: '',
            noData: false,
            poptipTitle: '数据项说明',
            options: {
                disabledDate(date) {
                    return date&&date.valueOf()> Date.now() - 86400000
                }
            },
            transfer: true
        }
    },
    mounted () {
        this.$store.dispatch('menuActiveName', '/index/orderStatus')
        document.title = '订单数据 - 订单状态构成'
        this.loadData('3')
    },
    methods: {
        loadData (type) {
            this.spinShow = true
            this.noDataText = '' 
            this.noData = false
            this.axios.get('/beefly/orderState/getOrderState', {
                params: {
                    accessToken: this.$store.state.token,
                    type: type,
                    cityCode: this.$store.state.cityList.toString(),
                    beginDate: this.timeLine[0] === ''||this.timeLine[0] === null?'':moment(this.timeLine[0]).format('YYYY-MM-DD'),
                    endDate: this.timeLine[0] === ''||this.timeLine[0] === null?'':moment(this.timeLine[1]).format('YYYY-MM-DD')
                }
            })
            .then((res) => {
                this.spinShow = false
                this.noDataText = '暂无数据'
                // 判断是否超时
                this.checkLogin(res)
                var data = res.data.data
                if (data.length > 0) {
                    this.noData = true
                    var newArr = []
                    data.map( (item) => {
                        newArr.push(Object.assign({},item,{proportion: item.proportion + "%"}))
                        return newArr
                    })
                    this.orderStatusData = newArr
                    // 去掉合计字段集
                    data.pop()
                    var arr = new Array()
                    for (var i in data) {
                        arr.push([data[i].orderFlow, Number(data[i].proportion)])
                    }
                    // 取掉无关字段
                    arr.pop()
                    this.chartArr = arr
                    // console.log(this.chartArr)
                    this.initChart()                    
                } else {
                    var newArr = []
                    data.map( (item) => {
                        newArr.push(Object.assign({},item,{proportion: item.proportion + "%"}))
                        return newArr
                    })
                    this.orderStatusData = newArr
                    // 去掉合计字段集
                    data.pop()
                    var arr = new Array()
                    for (var i in data) {
                        arr.push([data[i].orderFlow, Number(data[i].proportion)])
                    }
                    // 取掉无关字段
                    arr.pop()
                    this.chartArr = arr
                    $('#container').html('')
                    this.chartArr = []
                    this.noData = false
                }
            })
            .catch( (err) => {
                this.spinShow = false
                this.noDataText = '暂无数据'
                console.log(err)
            })
        },
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
                this.timeLine = ['','']
                this.loadData(e.target.getAttribute('myId'))
            }
        },
        checkLogin (res) {
           if (res.data.message === '用户登录超时') {
                this.$router.push('/login')
           }
        },
        searchByTimeLine () {
             var type = $('.orderStatus_head_time button.active').attr('myId')
            if (this.timeLine[0] === '' || this.timeLine[0] === null) {
                this.$Message.warning('请选择时间段')
            } else {
                this.loadData(type)
                return;
                
                this.spinShow = true
                this.noDataText = ''
                var beginDate = moment(this.timeLine[0]).format('YYYY-MM-DD')
                var endDate =  moment(this.timeLine[1]).format('YYYY-MM-DD')
                this.axios.get('/beefly/orderState/getOrderState', {
                    params: {
                        accessToken: this.$store.state.token,
                        type: 5,
                        cityCode: this.$store.state.cityList.toString(),
                        beginDate,
                        endDate
                    }
                })
                .then((res) => {
                    this.spinShow = false
                    this.noDataText = '暂无数据'
                    // 判断是否超时
                    this.checkLogin(res)
                    
                    var data = res.data.data
                    if (data.length > 0) {
                        this.noData = false
                        var newArr = []
                        data.map( (item) => {
                            newArr.push(Object.assign({},item,{proportion: item.proportion + "%"}))
                            return newArr
                        })
                        this.orderStatusData = newArr
                        // 去掉合计字段集
                        data.pop()
                        var arr = new Array()
                        for (var i in data) {
                            arr.push([data[i].orderFlow, Number(data[i].proportion)])
                        }
                        // 取掉无关字段
                        arr.pop()
                        this.chartArr = arr

                        // console.log(this.chartArr)
                        this.initChart()                    
                    } else {
                        var newArr = []
                        data.map( (item) => {
                            newArr.push(Object.assign({},item,{proportion: item.proportion + "%"}))
                            return newArr
                        })
                        this.orderStatusData = newArr
                        // 去掉合计字段集
                        data.pop()
                        var arr = new Array()
                        for (var i in data) {
                            arr.push([data[i].orderFlow, Number(data[i].proportion)])
                        }
                        // 取掉无关字段
                        arr.pop()
                        this.chartArr = arr
                        $('#container').html('')
                        this.chartArr = []
                        this.noData = true
                    }
                })
                .catch( (err) => {
                    this.spinShow = false
                    this.noDataText = '暂无数据'
                    console.log(err)
                })
            }
        },
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
                colors: ['#4472c4', '#ed7d31', '#9999ff', '#ffc000', '#5b9bd5', '#70ad48', '#264478', '#9e480e', '#636363', '#997300'],
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
                    data: this.chartArr
                }]
            }

            new Highcharts.chart('container', options);
        },
        cityChange () {
            var type = $('.orderStatus_head_time button.active').attr('myId')
            this.loadData(type)
        }
    },
    watch: {
        '$store.state.cityList': 'cityChange'
    }
}
</script>