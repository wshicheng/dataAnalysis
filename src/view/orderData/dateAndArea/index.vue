<template>
    <div id="dateAndArea_body">
            <Breadcrumb class="Breadcrumb">
                <BreadcrumbItem>分日期分地区</BreadcrumbItem>
            </Breadcrumb>
        <div id="dateAndArea_head">
            <div class="dateAndArea_head_time">
                <span>时间:</span>
                <button class="active"@click="handleClick" :myId='1'>近7日</button>
                <button @click="handleClick" :myId='2'>近30天</button>
                <button @click="handleClick" :myId='3'>指定时间段</button>
            </div>
            <div class="timeSelectShow" v-show="timeSelectShow">
                <DatePicker type="daterange" v-model="timeLine" :options='options' placement="bottom-end" placeholder="选择日期" style="width: 216px; vertical-align: top;"></DatePicker>
                <div class="search"><button class="DIY_button" @click="searchByTimeLine">查询</button></div>
            </div>
            <city-select></city-select>
            <div class="dateAndArea_type_select">
                <span>指标:</span>
                <button @click="handleTypeClick"  class="active" myType='orderNum'>有效订单数</button>
                <button @click="handleTypeClick"  myType='orderAmount'>订单金额</button>
                <button @click="handleTypeClick"  myType='avgAmount'>均单价有效</button>
                <button @click="handleTypeClick"  myType='payAmount'>实收金额</button>
            </div>
        </div>

        <div class="dateAndArea_table">
            <Spin fix size="large" v-if="spinShow"  class="spin">
                <Icon type="load-c" size=18 class="demo-spin-icon-load" style="color: #ccc;"></Icon>
                <div style="color: #ccc; text-indent: 5px;">  loading...</div>
            </Spin>
            <div class="help">
                <Poptip trigger="hover" style="float: right;"  placement="top-end" title="数据项说明" :transfer='transfer'>
                    <span>?</span>
                    <div class="content" slot="content">
                        <p><b>有效订单数:</b>当前时段有效订单数</p>
                        <p><b>有效订单占比:</b>当前时段有效订单数/全时段有效订单数</p>
                        <p><b>累计有效订单:</b>累计到当前时段的有效订单数</p>
                        <p><b>累计有效订单占比:</b>累计到当前时段有效订单数/全时段有效订单数</p>
                        <p><b>订单金额(￥):</b>当前时段订单金额</p>
                        <p><b>订单金额占比:</b>当前时段订单金额/全时段订单金额</p>
                        <p><b>累计订单金额(￥):</b>累计到当前时段的订单金额</p>
                        <p><b>累计订单金额占比:</b>累计到当前时段订单金额/全时段订单金额</p>
                    </div>
                </Poptip>
            </div>
            <Table :no-data-text='noDataText' :ellipsis='ellipsis' :loading='loading' border size='small' :columns="columns_orderData" :data="orderData"></Table>
            <Page :total="totalListNum" show-sizer show-elevator :styles='page' v-show="pageShow" :current='current' placement="top" @on-change="handleCurrentPage" @on-page-size-change="handlePageSize" show-sizer :page-size="pageSize" :page-size-opts='pageSizeOpts'></Page>
        </div>

        <div class="dateAndArea_table_total" v-show="noDataBox">
            <Spin fix size="large" v-if="spinShow2"  class="spin">
                <Icon type="load-c" size=18 class="demo-spin-icon-load" style="color: #ccc;"></Icon>
                <div style="color: #ccc; text-indent: 5px;">  loading...</div>
            </Spin>
            <!-- <div class="title" v-show="totalTitle">
                <div class="avg">
                    平均
                </div>
                <div class="total">
                    合计
                </div>
            </div> -->
            <Table :no-data-text='noDataText2' class="totalTable" :show-header='showHeader' border size='small' :columns="columns_total" :data="totalData"></Table>
        </div>

        <div class="dateAndArea_chart"  v-show="noDataBox">
            <Spin fix size="large" v-if="spinShow3"  class="spin">
                <Icon type="load-c" size=18 class="demo-spin-icon-load" style="color: #ccc;"></Icon>
                <div style="color: #ccc; text-indent: 5px;">  loading...</div>
            </Spin>
            <!-- <div class="nodata" v-show="noData" style="text-align:center;">
                <i class="iconfont icon-zanwushuju" style="font-size:400px;color:#dedcdc;"></i>
            </div> -->
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
            padding: 12px 10px 0 10px;
            overflow: hidden;
            position: relative;
            div.dateAndArea_head_time {
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
            div.dateAndArea_type_select {
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
        }
        .dateAndArea_table {
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
                            width: 80px;
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
        .dateAndArea_table_total {
            padding: 10px;
            width: 100%;
            overflow: hidden;
            background: #fff;
            position: relative;
            margin-top: 20px;
            .spin {
                position: absolute;
                display: inline-block;
                // background-color: rgba(253, 248, 248,0.0); 
                background-color: rgba(255, 255, 255, 0.8); 
            }
            div.title {
                float: left;
                width: 200px;
                div.avg {
                    width: 100%;
                    height: 41px;
                    background: #fcf;
                    text-align: center;
                    line-height: 41px;
                    color: #fff;
                    font-weight: bolder;
                }
                div.total {
                    width: 100%;
                    height: 41px;
                    background: #ccf;
                    text-align: center;
                    line-height: 41px;
                    color: #fff;
                    font-weight: bolder;
                }
            }
            div.totalTable {
                // float: left;
            }
        }
        .dateAndArea_chart {
            margin-top: 20px;
            position: relative;
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
import moment from 'moment'
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
            columns_orderData: [
                {
                    title: '日期',
                    key: 'orderTime'
                },
                {
                    title: '北京',
                    key: 'city'
                },
                {
                    title: '合计',
                    key: 'total'
                }
            ],
            orderData: [
                {
                    orderTime: '1111',
                    city: '111',
                    total:1
                }
            ],
            columns_total: [
                {
                    title: '日期',
                    key: 'orderTime'
                },
                {
                    title: '',
                    key: 'city'
                },
                {
                    title: '合计',
                    key: 'total'
                }
            ],
            totalData: [                
                {
                    orderTime: '1111',
                    city: '',
                    total:1
                }],
            totalListNum: 100,
            pageSizeOpts: [10, 20, 30, 40],
            pageSize: 10,
            current: 1,
            loading: false,
            spinShow: false,
            spinShow2: false,
            spinShow3: false,
            showHeader: true,
            chartTime: [],
            chartData: [],
            noDataText: '',
            noDataText2: '',
            pageShow: false,
            chartTitleName: '有效订单数',
            totalTitle: true,
            ellipsis: true,
            noDataBox: false,
            options: {
                disabledDate(date) {
                    return date&&date.valueOf()> Date.now() - 86400000
                }
            },
            transfer: true
        }
    },
    mounted () {
        this.$store.dispatch('menuActiveName', '/index/dateAndArea')
        this.$store.state.cityList = []
        document.title = '订单数据 - 分日期分地区'
        this.loadData('1')
        this.loadTotalData('1')
    },
    methods: {
        loadData (type) {
            this.spinShow = true
            this.spinShow3 = true
            this.noDataText = ''
            // 默认加载时去掉无数据图片

            this.axios.get('/beefly/dateCityOrders/api/v1/page', {
                params: {
                    accessToken: this.$store.state.token,
                    type: type,
                    beginDate: this.timeLine[0] === ''||this.timeLine[0] === null?'':moment(this.timeLine[0]).format('YYYY-MM-DD'),
                    endDate: this.timeLine[0] === ''||this.timeLine[0] === null?'':moment(this.timeLine[1]).format('YYYY-MM-DD'),
                    pageNo: this.current,
                    pageSize: this.pageSize,
                    cityCode: this.$store.state.cityList.toString()
                }
            })
            .then( (res) => {
                this.checkLogin(res)
                // console.log(res.data.data)
                    $('#container').html('')
                if (res.data.data.length === 0) {
                    this.noDataText = '暂无数据'
                    this.spinShow = false
                    this.spinShow3 = false
                    this.orderData = []
                    this.noDataBox = false
                    this.totalListNum = 1
                } else {
                    this.noDataBox = true
                    this.spinShow = false
                    var data = res.data.data

                    //随机取出一个数据制作表头
                    var arr = []
                    var firstData = data[0]
                    firstData.map( (item) => {
                        var obj = {}

                        obj.title = item.cityName
                        obj.key = $('.dateAndArea_type_select button.active').attr("myType") + item.cityCode
                        obj.width = firstData.length > 11?100:''

                        arr.push(obj)
                        return arr
                    })
                    // 将最后一条的合计取出
                    var totalTitle = arr.pop()
                    totalTitle.title = '合计'
                    totalTitle.key = $('.dateAndArea_type_select button.active').attr("myType")
                    totalTitle.fixed = 'right'
                    totalTitle.width = 120
                    
                    arr.push(totalTitle)
                    // 讲日期插入动态title
                    arr.unshift({
                        title: '日期',
                        key: 'orderTime',
                        fixed: 'left',
                        width: 120
                    })
                    
                    this.columns_orderData = arr
                    var delData = this.tableDataDel(data)
                    this.orderData = delData

                    // 处理分页
                    if (res.data.totalPage < 2 && this.pageSize === 10) {
                        this.pageShow = false
                    } else {
                        this.pageShow = true
                    }
                    this.totalListNum = res.data.totalItems
                    
                    this.getChartData($('.dateAndArea_head_time button.active').attr('myId'))
                    // 关闭loading 
                    this.spinShow = false
                    this.noDataText = ''

                }
                
            })
            .catch( (err) => {
                console.log(err)
                this.spinShow = false
                this.noDataText = '暂无数据'
            })
        },
        loadTotalData (type) {
            this.spinShow2 = true
            this.noDataText2 = ''
            
            this.axios.get('/beefly/dateCityOrders/api/v1/avgTotal', {
                params: {
                    accessToken: this.$store.state.token,
                    type: type,
                    beginDate: this.timeLine[0] === ''||this.timeLine[0] === null?'':moment(this.timeLine[0]).format('YYYY-MM-DD'),
                    endDate: this.timeLine[0] === ''||this.timeLine[0] === null?'':moment(this.timeLine[1]).format('YYYY-MM-DD'),
                    cityCode: this.$store.state.cityList.toString()
                }
            })
            .then( (res) => {
                this.checkLogin(res)
                
                var data = res.data.data
                if (data.length === 0) {
                    this.totalTitle = false
                    this.totalData = []
                   
                    // 关闭loading 
                    this.spinShow2 = false
                    this.noDataText2 = ''
                } else {
                    this.totalTitle = true
                    //随机取出一个数据制作表头  
                    var arr = []
                    var firstData = data[0]
                    firstData.map( (item) => {
                        var obj = {}

                        obj.title = item.cityName
                        obj.key = $('.dateAndArea_type_select button.active').attr("myType") + item.cityCode
                        obj.width = firstData.length > 11?100:''

                        arr.push(obj)
                        return arr
                    })
                    // 将最后一条的合计取出
                    var totalTitle = arr.pop()
                    totalTitle.title = '合计'
                    totalTitle.key = $('.dateAndArea_type_select button.active').attr("myType")
                    totalTitle.width = 120
                    totalTitle.fixed = 'right'
                    
                    arr.push(totalTitle)
                    // 将平均字段插入动态title
                    arr.unshift({
                        title: '分类',
                        key: 'title',
                        fixed: 'left',
                        width: 120
                    })
                    
                    this.columns_total = arr
                    var delData = this.tableTotalDataDel(data)
                    this.totalData = delData

                    // 关闭loading 
                    this.spinShow2 = false
                    this.noDataText2 = ''
                }
                

            })
            .catch( (err) => {
                console.log(err)
                this.spinShow2 = false
                this.noDataText2 = '暂无数据'
            })
        },
        tableDataDel (arr) {
            var type = $('.dateAndArea_type_select button.active').attr("myType")
            var newArr = []
            arr.map( (list) => {
                // 去除合计字段
                var dataTime = list.pop()
                var obj = {}
                for (var i=0; i<list.length; i++) {
                    var code = type + list[i].cityCode
                    obj[code] = list[i][type]
                }
                newArr.push(obj)
                obj.orderTime = dataTime.orderTime
                // 在这里创造chart图表的x轴坐标
                //this.chartTime.push(dataTime.orderTime)
                obj[type] = dataTime[type]
                return newArr
            })
            // console.log('newArr',newArr)

            return newArr
        },
        getChartData (type) {
            this.axios.get('/beefly/dateCityOrders/lineNum', {
                params: {
                    accessToken: this.$store.state.token,
                    type: type,
                    beginDate: this.timeLine[0] === ''||this.timeLine[0] === null?'':moment(this.timeLine[0]).format('YYYY-MM-DD'),
                    endDate: this.timeLine[0] === ''||this.timeLine[0] === null?'':moment(this.timeLine[1]).format('YYYY-MM-DD'),
                    cityCode: this.$store.state.cityList.toString()
                }
            })
            .then( (res) => {
                var chartData = res.data.data
                if (chartData.length === 0) {
                    this.spinShow3 = false
                    $('#container').html('')
                } else {
                    this.spinShow3 = false
                    // var newArr = []
                    // var type = $('.dateAndArea_type_select button.active').attr("myType")
                    // chartData.map( item => {
                    //     var arr = new Array()
                    //     for (var i = 0; i < item.length; i++) {
                    //         // debugger
                    //         var obj = {}
                    //         arr.push(Number(item[i][type]))
                    //         obj.data = arr
                    //         obj.name = item[i].cityName
                    //     }
                    //     newArr.push(obj)
                    //     return newArr
                    // })
                    var type = $('.dateAndArea_type_select button.active').attr("myType")
                    var res = chartData.map((item)=>{
                        var arrType = []
                        var arrTime = []
                        var obj = {}
                        item.map((list)=>{
                           arrType.push(Number(list[type]))
                           arrTime.push(list.orderTime)
                           obj.name = list.cityName
                        })
                        obj.data = arrType
                        obj.time = arrTime
                       return obj
                    })
                   
                    var _result = res.map((item)=>{
                        return item.time.length
                    })
                   var _index = Math.max.apply(null,_result)
                   res.map((item)=>{
                       if(item.time.length === _index){
                           this.chartTime = item.time
                       }
                   })
                       this.chartData = res;
                        // 延时加载，确保x轴正常显示。
                        var that = this;
                    setTimeout(function() {
                        that.initChart()
                    }, 500)
                }
            })
            .catch( (err) => {
                this.spinShow = false
                console.log(err)
            })
        },
        tableTotalDataDel (arr) {
            var type = $('.dateAndArea_type_select button.active').attr("myType")
            var newArr = []
            arr.map( (list) => {
                // 去除合计字段
                var dataTime = list.pop()
                var obj = {}
                for (var i=0; i<list.length; i++) {
                    var code = type + list[i].cityCode
                    obj[code] = list[i][type]
                }
                newArr.push(obj)
                obj.orderTime = dataTime.orderTime
                obj[type] = dataTime[type]
                return newArr
            })
            
            newArr[0].title = '平均'
            newArr[0].cellClassName = {title: 'demo-table-info-cell-name'}
            newArr[1].title = '合计'
            newArr[1].cellClassName = {title: 'demo-table-info-cell-name'}

            return newArr
        },
        handleClick (e) {
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
                this.timeLine = ['','']
                this.loadData(e.target.getAttribute('myId'))
                this.loadTotalData(e.target.getAttribute('myId'))
            }
        },
        handleTypeClick (e) {
            this.chartTitleName = e.target.innerHTML
            this.current = 1
            var elems = siblings(e.target)
            for (var i = 0; i < elems.length; i++) {
                elems[i].setAttribute('class', '')
            }
            e.target.setAttribute('class', 'active')
            this.loadData($('.dateAndArea_head_time button.active').attr('myId'))
            this.loadTotalData($('.dateAndArea_head_time button.active').attr('myId'))
        },
        searchByTimeLine () {
            if (this.timeLine[0] === '' || this.timeLine[0] === null) {
                this.$Message.warning('请选择时间段')
            } else {
                this.loadData($('.dateAndArea_head_time button.active').attr('myId'))
                this.loadTotalData($('.dateAndArea_head_time button.active').attr('myId'))
            }
        },
        initChart () {
            var options = {
                chart: {
                    type: 'line'
                },
                title: {
                    text: '分日期分地区 ' + this.chartTitleName
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
                colors: ['#4472c4', '#ed7d31', '#9999ff', '#ffc000', '#5b9bd5', '#70ad48', '#264478', '#9e480e', '#636363', '#997300'],
                tooltip: {
                    valueSuffix: '',
                    formatter: function() { 
                        var type = $('.dateAndArea_type_select button.active').attr("myType")
                         
                        if(type==='orderNum'){
                          
                            if(new String(this.point.y).length>3){
                             return '时间:' + this.point.category + '<br>' + this.point.series.name + ':' + Highcharts.numberFormat(this.point.y, 0,"",",");
                            }else{
                                return '时间:' + this.point.category + '<br>' + this.point.series.name + ':' + this.point.y;
                            }
                        }
                        if(type=='orderAmount'||type=='avgAmount'||type=='payAmount'){
                            if(new String(this.point.y).length>5){
                               
                             return '时间:' + this.point.category + '<br>' + this.point.series.name + ':' + Highcharts.numberFormat(this.point.y, 2, ".",",");
                            }else{
                                return '时间:' + this.point.category + '<br>' + this.point.series.name + ':' + this.point.y;
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
        handleCurrentPage(current) {
            this.current = current

            this.loadData($('.dateAndArea_head_time button.active').attr('myId'))
            this.loadTotalData($('.dateAndArea_head_time button.active').attr('myId'))
        },
        handlePageSize(pageSize) {
            this.currentPage = 1
            this.pageSize = pageSize

            this.loadData($('.dateAndArea_head_time button.active').attr('myId'))
            this.loadTotalData($('.dateAndArea_head_time button.active').attr('myId'))
            
        },
        cityChange () {
            this.current = 1
            this.loadData($('.dateAndArea_head_time button.active').attr('myId'))
            this.loadTotalData($('.dateAndArea_head_time button.active').attr('myId'))
            // this.getChartData($('.dateAndArea_head_time button.active').attr('myId'))
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
