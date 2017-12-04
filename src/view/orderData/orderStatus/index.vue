<template>
  <div id="orderStatus_body">
        <Breadcrumb class="Breadcrumb">
            <BreadcrumbItem>订单状态构成</BreadcrumbItem>
        </Breadcrumb>
      <div id="orderStatus_head">
        <div class="orderStatus_head_time">
            <span>时间:</span>
            <button @click="handleClick"  :myId='1'>今日</button>
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

    <Tabs :value="currentTab" style="background: rgba(255,255,255,0.3); margin-top: 20px; margin-bottom: -10px;" type='line' @on-click='tabChange'> 
        <TabPane label="汇总" name="1" >
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
                <div id="container" style="min-width:400px; height: 400px;"></div>
            </div>
        </TabPane>
        <TabPane label="对比" name="2" id="orderStatus_comparison_table">
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
                <Table :no-data-text='noDataText2'  border size='small' :columns="columnsComparison" :data="comparisonData"></Table>
                <Page :total="totalListNum" show-sizer show-elevator  :styles='page' placement="top" :current='currentPage' v-show="pageShow"  @on-change="handleCurrentPage" @on-page-size-change="handlePageSize" show-sizer :page-size="pageSize" :page-size-opts='pageSizeOpts'></Page>
            </div>

            <div v-show="noData" class="orderStatus_chart">
                    <Spin fix size="large" v-if="spinShow"  class="spin">
                        <Icon type="load-c" size=18 class="demo-spin-icon-load" style="color: #ccc;"></Icon>
                        <div style="color: #ccc; text-indent: 5px;">  loading...</div>
                    </Spin>
                <div id="container2" style="min-width:400px; height: 400px;"></div>
            </div>
        </TabPane>
        <TabPane label="趋势" name="3" class="orderStatus_tendency">
            <div class="btn">
                <button @click="handleTendencyClick" class="active" myType='1'>人工关闭</button>
                <button @click="handleTendencyClick" myType='2'>开锁失败</button>
                <button @click="handleTendencyClick" myType='3'>已取消</button>
                <button @click="handleTendencyClick" myType='4'>已结束</button>
            </div>

            <div v-show="noData" class="orderStatus_chart">
                    <Spin fix size="large" v-if="spinShow"  class="spin">
                        <Icon type="load-c" size=18 class="demo-spin-icon-load" style="color: #ccc;"></Icon>
                        <div style="color: #ccc; text-indent: 5px;">  loading...</div>
                    </Spin>
                <div id="container3" style="min-width:400px; height: 400px;"></div>
            </div>
        </TabPane>
    </Tabs>
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
            /* margin-top: 20px; */
            background: #fff;
            padding-top: 0px;
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
        .orderStatus_tendency {
            margin-top: 0px;
            .btn {
                background: #fff;
                width: 100%;
                margin-bottom: -24px;
                button {
                    padding: 5px 10px;
                    color: #444;
                    border: none;
                    outline: none;
                    font-size: 13px;
                    cursor: pointer;
                }
                button:nth-of-type(1) {
                    margin-left: 4px;
                }
                button:hover {
                    color:#f90;
                }
                button.active {
                    color:#f60;
                }
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
            currentTab: '1',
            timeSelectShow: false,
            timeLine: ['',''],
            spinShow: false,
            page: {
                'float': 'right',
                'margin-top': '20px'
            },
            totalListNum: 100,
            pageSizeOpts: [10, 20, 30, 40],
            pageSize: 10,
            currentPage: 1,
            pageShow: false,
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
            columnsComparison: [
                {
                    title: '城市',
                    key: 'cityName',
                    align: 'center'
                },
                {
                    title: '合计',
                    key: 'num',
                    align: 'center'
                },
                {
                    align: 'center',
                    renderHeader: (h) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    width: '100%',
                                    display: 'inline-block',
                                    lineHeight: '30px',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderBottom: '1px solid #e9eaec',
                                }
                            }, '人工关闭'),
                            h('div', {
                                style: {
                                    width: 'calc(100%/2)',
                                    display: 'inline-block',
                                    lineHeight: '30px',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: '1px solid #e9eaec'
                                }
                            }, '订单数'),
                            h('div', {
                                style: {
                                    width: 'calc(100%/2)',
                                    display: 'inline-block',
                                    lineHeight: '30px',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing'
                                }
                            }, '占比')
                        ])
                    },
                    render: (h, params) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    width: 'calc(100%/2)',
                                    display: 'inline-block',
                                    lineHeight: '40px',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: '1px solid #e9eaec'
                                }
                            }, params.row.closeNum),
                            h('div', {
                                style: {
                                    width: 'calc(100%/2)',
                                    display: 'inline-block',
                                    lineHeight: '40px',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing'
                                }
                            }, params.row.failNum)
                        ])
                    }
                },
                {
                    align: 'center',
                    renderHeader: (h) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    width: '100%',
                                    display: 'inline-block',
                                    lineHeight: '30px',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderBottom: '1px solid #e9eaec',
                                }
                            }, '开锁失败'),
                            h('div', {
                                style: {
                                    width: 'calc(100%/2)',
                                    display: 'inline-block',
                                    lineHeight: '30px',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: '1px solid #e9eaec'
                                }
                            }, '订单数'),
                            h('div', {
                                style: {
                                    width: 'calc(100%/2)',
                                    display: 'inline-block',
                                    lineHeight: '30px',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing'
                                }
                            }, '占比')
                        ])
                    },
                    render: (h, params) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    width: 'calc(100%/2)',
                                    display: 'inline-block',
                                    lineHeight: '40px',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: '1px solid #e9eaec'
                                }
                            }, params.row.cancelNum),
                            h('div', {
                                style: {
                                    width: 'calc(100%/2)',
                                    display: 'inline-block',
                                    lineHeight: '40px',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing'
                                }
                            }, params.row.endNum)
                        ])
                    }
                },
                {
                    align: 'center',
                    renderHeader: (h) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    width: '100%',
                                    display: 'inline-block',
                                    lineHeight: '30px',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderBottom: '1px solid #e9eaec',
                                }
                            }, '已取消'),
                            h('div', {
                                style: {
                                    width: 'calc(100%/2)',
                                    display: 'inline-block',
                                    lineHeight: '30px',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: '1px solid #e9eaec'
                                }
                            }, '订单数'),
                            h('div', {
                                style: {
                                    width: 'calc(100%/2)',
                                    display: 'inline-block',
                                    lineHeight: '30px',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing'
                                }
                            }, '占比')
                        ])
                    },
                    render: (h, params) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    width: 'calc(100%/2)',
                                    display: 'inline-block',
                                    lineHeight: '40px',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: '1px solid #e9eaec'
                                }
                            }, params.row.closePercent),
                            h('div', {
                                style: {
                                    width: 'calc(100%/2)',
                                    display: 'inline-block',
                                    lineHeight: '40px',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing'
                                }
                            }, params.row.failPercent)
                        ])
                    }
                },
                {
                    align: 'center',
                    renderHeader: (h) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    width: '100%',
                                    display: 'inline-block',
                                    lineHeight: '30px',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderBottom: '1px solid #e9eaec'
                                }
                            }, '已结束'),
                            h('div', {
                                style: {
                                    width: 'calc(100%/2)',
                                    display: 'inline-block',
                                    lineHeight: '30px',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: '1px solid #e9eaec'
                                }
                            }, '订单数'),
                            h('div', {
                                style: {
                                    width: 'calc(100%/2)',
                                    display: 'inline-block',
                                    lineHeight: '30px',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing'
                                }
                            }, '占比')
                        ])
                    },
                    render: (h, params) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    width: 'calc(100%/2)',
                                    display: 'inline-block',
                                    lineHeight: '40px',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing',
                                    borderRight: '1px solid #e9eaec'
                                }
                            }, params.row.cancelPercent),
                            h('div', {
                                style: {
                                    width: 'calc(100%/2)',
                                    display: 'inline-block',
                                    lineHeight: '40px',
                                    textAlign: 'center',
                                    borderBox: 'box-sizing'
                                }
                            }, params.row.endPercent)
                        ])
                    }
                }
            ],
            comparisonData: [],
            currentPage: 1,
            pageSize: 10,
            noDataText: '',
            noDataText2: '',
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
                    endDate: this.timeLine[0] === ''||this.timeLine[0] === null?'':moment(this.timeLine[1]).format('YYYY-MM-DD'),
                    data_type: this.currentTab,
                    // state是趋势模块，四种不同类型的标识
                    state: this.currentTab === '3'?$('.btn button.active').attr('myType'):'',
                    // 发送pageSize与pageNo是对比模块表格的数据，不发则是chart图表的数据。
                    pageSize: this.currentTab === '2'?this.pageSize:'',
                    pageNo: this.currentTab === '2'?this.currentPage:'',
                }
            })
            .then((res) => {
                this.spinShow = false
                this.noDataText = '暂无数据'
                // 判断是否超时
                this.checkLogin(res)
                var data = res.data.data
                if (data.length > 0) {
                    console.log('dada', this.currentTab)
                    if (this.currentTab === '1') {
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
                    } else if (this.currentTab === '2') {
                        this.noData = true
                        // console.log('this.currentTab')
                        this.comparisonData = data

                        if (res.data.totalPage < 2 && this.pageSize === 10) {
                            this.pageShow = false
                        } else {
                            this.pageShow = true
                        }
                        this.totalListNum = res.data.totalItems
                        this.getCompariseChart($('.orderStatus_head_time button.active').attr('myId'))
                    }
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
        getCompariseChart (type) {
            this.axios.get('/beefly/orderState/getOrderState', {
                params: {
                    accessToken: this.$store.state.token,
                    type: type,
                    cityCode: this.$store.state.cityList.toString(),
                    beginDate: this.timeLine[0] === ''||this.timeLine[0] === null?'':moment(this.timeLine[0]).format('YYYY-MM-DD'),
                    endDate: this.timeLine[0] === ''||this.timeLine[0] === null?'':moment(this.timeLine[1]).format('YYYY-MM-DD'),
                    data_type: this.currentTab,
                    // state是趋势模块，四种不同类型的标识
                    state: this.currentTab === '3'?$('.btn button.active').attr('myType'):''
                }
            })
            .then( res => {
                console.log('compariseData', res.data.data)
                var data = res.data.data
                var delArr = new Array()
                // data.map(item => {
                //     debugger
                //     for (var i = 0; i < item.length; i++) {
                //         var obj = {}
                //         obj.name = item[i].cityName
                //         var data = new Array()
                //         var num = Number(item[i].proportion.replace('%', ''))
                //         data.push(num)
                //         delArr.push(obj)
                //     }
                // })
                for (var i = 0; i < data.length; i++) {
                    
                }


// var obj = {}
//                     var arr = new Array()
//                     obj.name = item.length === 0?'':item[0].cityName
//                     for (var i = 0; i < item.length; i++) {
//                         var num = Number(item[i].proportion.replace('%', ''))
//                         arr.push(num)
//                     }
//                     obj.data = arr
//                     delArr.push(obj)
                console.log(delArr)

                this.initChart2(delArr)
            })
            .catch( err => {
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
        handleTendencyClick (e) {
            var elems = siblings(e.target)
            for (var i = 0; i < elems.length; i++) {
                elems[i].setAttribute('class', '')
            }
            e.target.setAttribute('class', 'active')
        },
        tabChange (name) {
            console.log(name)
            this.currentTab = name
            if (name === '2') {
                this.loadData($('.orderStatus_head_time button.active').attr('myId'))
            } else if (name === '3') {
                this.loadData($('.orderStatus_head_time button.active').attr('myId'))
                this.initChart3()
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
        initChart2 (data) {
            var options = {
                chart: {
                    type: 'column'
                },
                title: {
                    text: '月平均降雨量'
                },
                subtitle: {
                    text: '数据来源: WorldClimate.com'
                },
                xAxis: {
                    categories: [
                        '人工关闭',
                        '开锁失败',
                        '已取消',
                        '已结束'
                    ],
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '降雨量 (mm)'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: '东京',
                    data: [49.9, 71.5, 106.4, 129.2]
                }, {
                    name: '北京',
                    data: [59.9, 71.5, 106.4, 129.2]
                }, {
                    name: '东京',
                    data: [79.9, 71.5, 106.4, 129.2]
                }, {
                    name: '东京',
                    data: [99.9, 74.5, 106.4, 129.2]
                }, {
                    name: '东京',
                    data: [49.9, 71.5, 106.4, 129.2]
                }]
                // series: data
            }

            new Highcharts.chart('container2', options);
        },
        initChart3 () {
            var options = {    
                title: {
                    text: '2010 ~ 2016 年太阳能行业就业人员发展情况'
                },
                subtitle: {
                    text: '数据来源：thesolarfoundation.com'
                },
                yAxis: {
                    title: {
                        text: '就业人数'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },
                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: 2010
                    }
                },
                series: [{
                    name: '安装，实施人员',
                    data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
                }, {
                    name: '工人',
                    data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
                }, {
                    name: '销售',
                    data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
                }, {
                    name: '项目开发',
                    data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
                }, {
                    name: '其他',
                    data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
                }],
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }
            }

            new Highcharts.chart('container3', options);
        },
        cityChange () {
            var type = $('.orderStatus_head_time button.active').attr('myId')
            this.loadData(type)
        },
        handleCurrentPage(currentPage) {
            this.currentPage = currentPage
        },
        handlePageSize(pageSize) {
            this.currentPage = pageSize
        }
    },
    watch: {
        '$store.state.cityList': 'cityChange'
    }
}
</script>