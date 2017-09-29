<template>
    <div id="dateAndArea_body">
            <Breadcrumb class="Breadcrumb">
                <BreadcrumbItem>分日期分地区</BreadcrumbItem>
            </Breadcrumb>
        <div id="dateAndArea_head">
            <div class="dateAndArea_head_time">
                <span>时间:</span>
                <button class="active"@click="handleClick" :myId='1'>近七日</button>
                <button @click="handleClick" :myId='2'>近30天</button>
                <button @click="handleClick" :myId='3'>指定时间段</button>
            </div>
            <div class="timeSelectShow" v-show="timeSelectShow">
                <DatePicker type="daterange" v-model="timeLine" placement="bottom-end" placeholder="选择日期" style="width: 216px; vertical-align: top;"></DatePicker>
                <div class="search"><button class="DIY_button" @click="searchByTimeLine">搜索</button></div>
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
            <!-- <div class="help">
                <Poptip trigger="hover" style="float: right;"  placement="top-end" title="数据字段说明">
                    <span>?</span>
                    <div class="content" slot="content">
                        <p><b>订单数:</b>各订单状态的订单数（非运维订单）</p>
                        <p><b>数量占比:</b>各订单状态的订单数（非运维订单）/订单总数</p>
                    </div>
                </Poptip>
            </div> -->
            <Table :no-data-text='noDataText' :loading='loading' border size='small' :columns="columns_orderData" :data="orderData"></Table>
            <Page :total="totalListNum" show-sizer show-elevator :styles='page' :current='current' placement="top" @on-change="handleCurrentPage" @on-page-size-change="handlePageSize" show-sizer :page-size="pageSize" :page-size-opts='pageSizeOpts'></Page>
        </div>

        <div class="dateAndArea_table_total">
            <Spin fix size="large" v-if="spinShow2"  class="spin">
                <Icon type="load-c" size=18 class="demo-spin-icon-load" style="color: #ccc;"></Icon>
                <div style="color: #ccc; text-indent: 5px;">  loading...</div>
            </Spin>
            <div class="title">
                <div class="avg">
                    平均
                </div>
                <div class="total">
                    合计
                </div>
            </div>
            <Table :no-data-text='noDataText' class="totalTable" :show-header='showHeader' border size='small' :columns="columns_total" :data="totalData"></Table>
        </div>

        <div class="dateAndArea_chart">
            <Spin fix size="large" v-if="spinShow"  class="spin">
                <Icon type="load-c" size=18 class="demo-spin-icon-load" style="color: #ccc;"></Icon>
                <div style="color: #ccc; text-indent: 5px;">  loading...</div>
            </Spin>
            <div class="nodata" v-show="noData" style="text-align:center;">
                <i class="iconfont icon-zanwushuju" style="font-size:400px;color:#dedcdc;"></i>
            </div>
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
            div.dateAndArea_type_select {
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
        .dateAndArea_table {
            padding: 10px;
            margin-top: 20px;
            background: #fff;
            position: relative;
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
        .dateAndArea_table_total {
            padding: 10px;
            width: 100%;
            overflow: hidden;
            background: #fff;
            position: relative;
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
                    title: '北京',
                    key: 'city'
                },
                {
                    title: '合计',
                    key: 'total'
                }
            ],
            totalData: [],
            totalListNum: 100,
            pageSizeOpts: [10, 20, 30, 40],
            pageSize: 10,
            current: 1,
            loading: false,
            spinShow: false,
            spinShow2: false,
            showHeader: false,
            chartTime: [],
            chartData: [],
            noDataText: '',
            noData: false
        }
    },
    mounted () {
        this.$store.dispatch('menuActiveName', '/index/dateAndArea')
        document.title = '订单数据 - 分日期分地区'
        this.loadData('1')
        this.loadTotalData('1')
    },
    methods: {
        loadData (type) {
            this.spinShow = true
            this.noDataText = ''
            // 默认加载时去掉无数据图片
            this.noData = false

            this.axios.get('/beefly/dateCityOrders/api/v1/page', {
                params: {
                    accessToken: this.$store.state.token,
                    type: type,
                    beginTime: this.timeLine[0] === ''||this.timeLine[0] === null?'':moment(this.timeLine[0]).format('YYYY-MM-DD'),
                    endTime: this.timeLine[0] === ''||this.timeLine[0] === null?'':moment(this.timeLine[1]).format('YYYY-MM-DD'),
                    pageNo: this.current,
                    pageSize: this.pageSize,
                    cityCode: this.$store.state.cityList.toString()
                }
            })
            .then( (res) => {
                console.log(res.data.data)
                
                if (res.data.data === '') {
                    this.spinShow = true
                    this.noDataText = '暂无数据'

                    this.noData = true
                } else {
                    var data = res.data.data

                    this.noData = false
                    //随机取出一个数据制作表头
                    var arr = []
                    var firstData = data[0]
                    firstData.map( (item) => {
                        var obj = {}

                        obj.title = item.cityName
                        obj.key = $('.dateAndArea_type_select button.active').attr("myType") + item.cityCode

                        arr.push(obj)
                        return arr
                    })
                    // 将最后一条的合计取出
                    var totalTitle = arr.pop()
                    totalTitle.title = '合计'
                    totalTitle.key = $('.dateAndArea_type_select button.active').attr("myType")
                    
                    arr.push(totalTitle)
                    // 讲日期插入动态title
                    arr.unshift({
                        title: '日期',
                        key: 'orderTime'
                    })
                    
                    this.columns_orderData = arr
                    var delData = this.tableDataDel(data)
                    this.orderData = delData

                    this.totalListNum = res.data.totalItems
                    // 关闭loading 
                    this.spinShow = false
                    this.noDataText = ''

                    this.initChart()
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
            this.noDataText = ''
            
            this.axios.get('/beefly/dateCityOrders/api/v1/avgTotal', {
                params: {
                    accessToken: this.$store.state.token,
                    type: type,
                    beginTime: this.timeLine[0] === ''||this.timeLine[0] === null?'':moment(this.timeLine[0]).format('YYYY-MM-DD'),
                    endTime: this.timeLine[0] === ''||this.timeLine[0] === null?'':moment(this.timeLine[1]).format('YYYY-MM-DD'),
                    cityCode: this.$store.state.cityList.toString()
                }
            })
            .then( (res) => {
                console.log(res.data.data)
                
                var data = res.data.data
                //随机取出一个数据制作表头  
                var arr = []
                var firstData = data[0]
                firstData.map( (item) => {
                    var obj = {}

                    obj.title = item.cityName
                    obj.key = $('.dateAndArea_type_select button.active').attr("myType") + item.cityCode

                    arr.push(obj)
                    return arr
                })
                // 将最后一条的合计取出
                var totalTitle = arr.pop()
                totalTitle.title = '合计'
                totalTitle.key = $('.dateAndArea_type_select button.active').attr("myType")
                
                arr.push(totalTitle)
                // 将日期插入动态title
                // arr.unshift({
                //     title: '日期',
                //     key: 'orderTime'
                // })
                
                this.columns_total = arr
                var delData = this.tableTotalDataDel(data)
                this.totalData = delData

                // 关闭loading 
                this.spinShow2 = false
                this.noDataText = ''

            })
            .catch( (err) => {
                console.log(err)
                this.spinShow2 = false
                this.noDataText = '暂无数据'
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
                this.chartTime.push(dataTime.orderTime)
                obj[type] = dataTime[type]
                return newArr
            })
            // console.log('newArr',newArr)

            return newArr
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
            // console.log('newArr',newArr)

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
                    categories: this.chartTime
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
            this.pageSize = pageSize

            this.loadData($('.dateAndArea_head_time button.active').attr('myId'))
            this.loadTotalData($('.dateAndArea_head_time button.active').attr('myId'))
            
        },
        cityChange () {
            this.current = 1
            this.loadData($('.dateAndArea_head_time button.active').attr('myId'))
            this.loadTotalData($('.dateAndArea_head_time button.active').attr('myId'))
        }
    },
    watch: {
        '$store.state.cityList': 'cityChange'
    }
}
</script>
