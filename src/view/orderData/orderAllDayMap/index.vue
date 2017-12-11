<template>
  <div id="orderAllDayMap_body">
        <Breadcrumb class="Breadcrumb">
            <BreadcrumbItem>24小时趋势</BreadcrumbItem>
        </Breadcrumb>
      <div id="orderAllDayMap_head">
        <div class="orderAllDayMap_head_time">
            <span>时间:</span>
            <button @click="handleClick" :myId='1'>今日</button>
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

      <div class="orderAllDayMap_table">
        <Spin fix size="large" v-if="spinShow"  class="spin">
            <Icon type="load-c" size=18 class="demo-spin-icon-load" style="color: #ccc;"></Icon>
            <div style="color: #ccc; text-indent: 5px;">  loading...</div>
        </Spin>
        <div class="help">
            <Poptip trigger="hover" style="float: right;"  placement="top-end" title="数据项说明" content="提示内容" :transfer='transfer'>
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
                    <p><b>投产车（日均）:</b>有效订单的车辆数，去重；多日求平均值</p>
                    <p><b>累计投产车（日均）:</b>累计 有效订单的车辆数，去重；多日求平均值</p>
                    <p><b>车辆使用率（日均）:</b>投产车辆数（日均）/当天车辆总数（日均）</p>
                    
                </div>
            </Poptip>
        </div>
        <Table height='300'  border size='small' :no-data-text='noDataText' :columns="columns_orderData" :data="orderData"></Table>
      </div>

      <div class="orderAllDayMap_chart" v-show="noDataBox">
        <Spin fix size="large" v-if="spinShow"  class="spin">
            <Icon type="load-c" size=18 class="demo-spin-icon-load" style="color: #ccc;"></Icon>
            <div style="color: #ccc; text-indent: 5px;">  loading...</div>
        </Spin>
        <div class="select">
            <button class="active" @click="chartType" myType='orderNum'>订单数</button>
            <button @click="chartType" myType='orderAmount'>订单金额</button>
            <button @click="chartType" myType='bikeNum'>投产车辆数</button>
        </div>
        <div  id="container" style="min-width:400px; height: 400px;"></div>
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
        .orderAllDayMap_table {
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
        .orderAllDayMap_chart {
            position: relative;
            .spin {
                position: absolute;
                display: inline-block;
                // background-color: rgba(253, 248, 248,0.0); 
                background-color: rgba(255, 255, 255, 0.8); 
            }
            .select {
                width: 100%;
                height: 40px;
                padding-left: 30px;
                line-height: 40px;
                button {
                    width: 60px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    border-radius: inherit;
                    border: none;
                    font-size: 14px;
                  
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
var Highcharts = require('highcharts');
// 在 Highcharts 加载之后加载功能模块
require('highcharts/modules/exporting')(Highcharts);
export default {
    components: {
        "city-select": citySelect
    },   
    data () {
        return {
            citySelectNum:[],
            timeSelectShow: false,
            timeLine: ['',''],
            page: {
                'float': 'right',
                'margin-top': '20px'
            },
            columns_orderData: [
                {
                    title: '时间段',
                    key: 'timeFlag'
                },
                {
                    title: '有效订单数',
                    key: 'orderNum'
                },
                {
                    title: '有效订单占比',
                    key: 'orderNumProportion'
                },
                {
                    title: '累计有效订单',
                    key: 'orderNumAccumulate'
                },
                {
                    title: '累计有效订单占比',
                    key: 'orderNumAccuProp'
                },
                {
                    title: '订单金额(￥)',
                    key: 'orderAmount'
                },
                {
                    title: '订单金额占比',
                    key: 'orderAmountProportion'
                },
                {
                    title: '累计订单金额(￥)',
                    key: 'orderAmountAccumulate'
                },
                {
                    title: '累计订单金额占比',
                    key: 'orderAmountAccuProp'
                },
                // v0,5新增需求
                {
                    title: '投产车(日均)',
                    key: 'bikeNum'
                },
                {
                    title: '累计投产车（日均）',
                    key: 'sumBikeNum'
                },
                {
                    title: '车辆使用率（日均）',
                    key: 'bikeUsageRate',
                    width:100
                },
            ],
            orderData: [],
            spinShow: false,
            noDataText: '',
            // 订单数图表数据
            orderNumData: [],
            orderNumProData: [],
            // 订单金额图表数据
            orderMoneyData: [],
            orderMoneyProData: [],
            // 投产车辆数数据
            bikeNumData: [],
            sumBikeNumData: [],
            noDataBox: false,
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
        this.$store.dispatch('menuActiveName', '/index/orderAllDayMap')
        document.title = '订单数据 - 24小时趋势'
        this.loadData('3')
    },
    methods: {
        loadData (type) {
            // console.log('this.timeLine',this.timeLine)
            // console.log('this.timeLine[0]',this.timeLine[0])
            // console.log("this.timeLine[0] === ''",this.timeLine[0] === '')
            // console.log("this.timeLine[0] === null",this.timeLine[0] === null)

            this.spinShow = true
            this.noDataText = ''
            // 节流防止用户快速点击时数据串行。
            this.loadFlag = false

            this.axios.get('/beefly/24HourTrend/api/v1/dataTrend', {
                params: {
                    accessToken: this.$store.state.token,
                    type: type,
                    cityCode: this.$store.state.cityList.toString(),
                    beginDate: this.timeLine[0] === ''||this.timeLine[0] === null?'':moment(this.timeLine[0]).format('YYYY-MM-DD'),
                    endDate: this.timeLine[0] === ''||this.timeLine[0] === null?'':moment(this.timeLine[1]).format('YYYY-MM-DD')
                }
            })
            .then( res => {
                this.checkLogin(res)
                var data = res.data.data
                this.spinShow = false
                
                if (res.data.resultCode != 1) {
                    this.noDataText = '暂无数据'
                    this.noDataBox = false
                    this.orderData = []
                    this.loadFlag = true
                } else {
                    this.noDataBox = true
                    this.orderData = res.data.data
                    // 去除合计字段
                    var newData =  [...data]
                    newData.pop()
                
                    // 处理图表
                    // 清空chart数据
                    this.orderNumData = []
                    this.orderNumProData = []
                    this.orderMoneyData = []
                    this.orderMoneyProData = []
                    this.bikeNumData = []
                    this.sumBikeNumData = []
                    var that = this
                    setTimeout(function () {
                        newData.map( (item) => {
                            that.orderNumData.push(Number(that.delcommafy(item.orderNum)))
                            that.orderNumProData.push(Number(that.delcommafy(item.orderNumAccumulate)))
                            that.orderMoneyData.push(Number(that.delcommafy(item.orderAmount)))
                            that.orderMoneyProData.push(Number(that.delcommafy(item.orderAmountAccumulate)))
                            that.bikeNumData.push(Number(that.delcommafy(item.bikeNum)))
                            that.sumBikeNumData.push(Number(that.delcommafy(item.sumBikeNum)))
                        })
                        that.initChart($(".select button.active").attr('myType'))
                        that.loadFlag = true
                    }, 100)
                }

            })
            .catch( err => {
                this.spinShow = false
                this.noDataText = '暂无数据'
                console.log(err)
            })
        },
        delcommafy(num){
        //   if((num+"").Trim()==""){
        //    return"";
        //   }
          num=num.replace(/,/gi,'');
          return num;
        },
        handleClick (e) {
            // 清空chart数据
            this.orderNumData = []
            this.orderNumProData = []
            this.orderMoneyData = []
            this.orderMoneyProData = []
            this.bikeNumData = []
            this.sumBikeNumData = []
            var elems = siblings(e.target)
            for (var i = 0; i < elems.length; i++) {
                elems[i].setAttribute('class', '')
            }
            e.target.setAttribute('class', 'active')
            if (e.target.innerHTML === '指定时间段') {
                this.timeSelectShow = true
            } else {
                this.timeSelectShow = false
                 if(this.citySelectNum.length==0){
                    return;
                }
                if (this.loadFlag === true) {
                    this.timeLine = ['','']
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
                if(this.citySelectNum.length==0){
                    return;
                }
                this.loadData('5')
            }
        },
        chartType (e) {
            var elems = siblings(e.target)
            for (var i = 0; i < elems.length; i++) {
                elems[i].setAttribute('class', '')
            }
            e.target.setAttribute('class', 'active')
            this.initChart($(".select button.active").attr('myType'))
        },
        initChart (type) {
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
                    colors: ['#4472c4', '#ed7d31', '#9999ff', '#ffc000', '#5b9bd5', '#70ad48', '#264478', '#9e480e', '#636363', '#997300'],
                    xAxis: [{
                        categories: ['0时', '1时', '2时', '3时', '4时', '5时',
                                    '6时', '7时', '8时', '9时', '10时', '11时',
                                    '12时', '13时','14时', '15时','16时', '17时',
                                    '18时', '19时','20时', '21时','22时', '23时'],
                        crosshair: true
                    }],
                    yAxis: [{ // Primary yAxis
                        labels: {
                            format: '{value} ',
                            style: {
                                color: '#ed7d31'
                            }
                        },
                        title: {
                            text: $('.select button.active')[0].innerHTML === '订单数'?'累计订单数':($('.select button.active')[0].innerHTML === '订单金额'?'累计订单金额':'累计投产车辆'),
                            style: {
                                color: '#ed7d31'
                            }
                        },
                        allowDecimals: false
                    }, { // Secondary yAxis
                        title: {
                            text: $('.select button.active')[0].innerHTML === '订单数'?'订单数':($('.select button.active')[0].innerHTML === '订单金额'?'订单金额':'投产车辆'),
                            style: {
                                color: '#4472c4'
                            }
                        },
                        labels: {
                            format: '{value} ',
                            style: {
                                color: '#4472c4'
                            }
                        },
                        opposite: true,
                        allowDecimals: false
                    }],
                    tooltip: {
                        shared: true,
                        useHTML: true,
                        headerFormat: "<p>时间: {point.key}</p>",
                        pointFormatter:function () {
                            var text = $('.select button.active').text()
                            if(text=='订单金额'){
                                 return "<span>" + this.series.name + ':</span>' + [new String(this.y).length<3?this.y:Highcharts.numberFormat(this.y, 2, ".",",")] + '<br>'    
                            }else{
                                 return "<span>" + this.series.name + ':</span>' + [new String(this.y).length<3?this.y:this.y] + '<br>'
                            }
                           
                        }
                    },
                    series: [{
                        name: type==='orderNum'?'订单数':[type === 'orderAmount'?'订单金额':'投产车辆'],
                        type: 'spline',
                        yAxis: 1,
                        data: type==='orderNum'?this.orderNumData:(type === 'orderAmount'?this.orderMoneyData:this.bikeNumData),
                        tooltip: {
                            valueSuffix: ''
                        }
                    }, {
                        name: type==='orderNum'?'累计订单数':[type === 'orderAmount'?'累计订单金额':'累计投产车辆'],
                        type: 'spline',
                        data: type==='orderNum'?this.orderNumProData:(type === 'orderAmount'?this.orderMoneyProData:this.sumBikeNumData),
                        // data: this.sumBikeNumData],
                        tooltip: {
                            valueSuffix: ''
                        }
                    }]
            }

            new Highcharts.chart('container', options);
        },
        cityChange () {
            this.citySelectNum = this.$store.state.cityList
            if(this.citySelectNum.length==0){
                this.orderData = []
                this.noDataBox = false;
                this.noDataText = '请至少选择一个城市'
                return;
            }
            if (this.loadFlag === true) {
                this.loadData($(".orderAllDayMap_head_time button.active").attr('myId'))
            }
        },
        checkLogin (res) {
           if (res.data.message === '用户登录超时') {
                this.$router.push('/login')
           }
        }
    },
    watch: {
        '$store.state.cityList': 'cityChange'
    }
}
</script>