<template>
<div id="userKeep">
    <Tabs :value="currentTab" style="background: rgba(255,255,255,0.3);" type='line' @on-click='tabChange'>
        <TabPane label="日留存" name="dayKeep" >
            <div id="userKeepDay_body">
                <div id="userKeepDay_head">
                    <div class="userKeepDay_head_time">
                        <span>时间:</span>
                        <button class="active" @click="handleDayClick" myId='1'>近7日</button>
                        <button @click="handleDayClick" myId='2'>近30天</button>
                        <button @click="handleDayClick" myId='3'>指定时间段</button>
                    </div>
                    <div class="timeSelectShow" v-show="timeSelectShow">
                        <DatePicker type="daterange" v-model="timeLine" :options='options' placement="bottom-end" placeholder="选择日期" style="width: 216px; vertical-align: top;"></DatePicker>
                        <div class="search"><button @click="searchByTimeLine">搜索</button></div>
                    </div>
                    <div v-if="cityType === 1">
                        <city-select></city-select>
                    </div>
                    <div v-else>
                        
                    </div>
                </div>

                <div class="userKeepDay_table">
                    <Spin fix size="large" v-if="spinShow"  class="spin">
                        <Icon type="load-c" size=18 class="demo-spin-icon-load" style="color: #ccc;"></Icon>
                        <div style="color: #ccc; text-indent: 5px;">  loading...</div>
                    </Spin>
                    <div class="help">
                        <Poptip trigger="hover" style="float: right;"  placement="top" title="数据项说明" content="提示内容" :transfer='transfer'>
                            <span>?</span>
                            <div class="content" slot="content">
                                <p><b>新注册用户:</b>所选时间段内新注册的用户数</p>
                                <p><b>留存率:</b></p>
                            </div>
                        </Poptip>
                    </div>
                    <Table  border size='small' :no-data-text='noDataText' :columns="columns_userKeepDayData" :data="userKeepDayData"></Table>
                    <Page :total="totalListNum" show-sizer show-elevator  :styles='page' placement="top" :current='currentPage' v-show="pageShow"  @on-change="handleCurrentPage" @on-page-size-change="handlePageSize" show-sizer :page-size="pageSize" :page-size-opts='pageSizeOpts'></Page>
                </div>
            </div>
        </TabPane>
        <TabPane label="周留存" name="weekKeep">
            <div id="userKeepWeek_body">
                <div id="userKeepWeek_head">
                    <div class="userKeepWeek_head_time">
                        <span>时间:</span>
                        <button class="active" @click="handleWeekClick" myId='1'>近4周</button>
                        <button @click="handleWeekClick" myId='2'>近12周</button>
                        <button @click="handleWeekClick" myId='3'>指定时间段</button>
                    </div>
                    <div class="timeSelectShow" v-show="timeSelectShow">
                        <DatePicker type="daterange" v-model="timeLine" :options='options' placement="bottom-end" placeholder="选择日期" style="width: 216px; vertical-align: top;"></DatePicker>
                        <div class="search"><button @click="searchByTimeLine">搜索</button></div>
                    </div>
                    <div v-if="cityType === 1">
                        <city-select></city-select>
                    </div>
                    <div v-else>
                        
                    </div>
                </div>

                <div class="userKeepWeek_table">
                    <Spin fix size="large" v-if="spinShow"  class="spin">
                        <Icon type="load-c" size=18 class="demo-spin-icon-load" style="color: #ccc;"></Icon>
                        <div style="color: #ccc; text-indent: 5px;">  loading...</div>
                    </Spin>
                    <div class="help">
                        <Poptip trigger="hover" style="float: right;"  placement="left" title="数据项说明" content="提示内容">
                            <span>?</span>
                            <div class="content" slot="content">
                                <p><b>新注册用户:</b>所选时间段内新注册的用户数</p>
                                <p><b>留存率:</b></p>
                            </div>
                        </Poptip>
                    </div>
                    <Table  border size='small' :no-data-text='noDataText' :columns="columns_userKeepWeekData" :data="userKeepWeekData"></Table>
                    <Page :total="totalListNum" show-sizer show-elevator  :styles='page' placement="top" :current='currentPage' v-show="pageShow"  @on-change="handleCurrentPage" @on-page-size-change="handlePageSize" show-sizer :page-size="pageSize" :page-size-opts='pageSizeOpts'></Page>
                </div>
            </div>
        </TabPane>
        <TabPane label="月留存" name="monthKeep">
            <div id="userKeepMonth_body">
                <div id="userKeepMonth_head">
                    <div class="userKeepMonth_head_time">
                        <span>时间:</span>
                        <button class="active" @click="handleMonthClick" myId='1'>近3月</button>
                        <button @click="handleMonthClick" myId='2'>近12月</button>
                        <button @click="handleMonthClick" myId='3'>指定时间段</button>
                    </div>
                    <div class="timeSelectShow" v-show="timeSelectShow">
                        <DatePicker type="daterange" v-model="timeLine" :options='options' placement="bottom-end" placeholder="选择日期" style="width: 216px; vertical-align: top;"></DatePicker>
                        <div class="search"><button @click="searchByTimeLine">搜索</button></div>
                    </div>
                    <div v-if="cityType === 1">
                        <city-select></city-select>
                    </div>
                    <div v-else>
                        
                    </div>
                </div>

                <div class="userKeepMonth_table">
                    <Spin fix size="large" v-if="spinShow"  class="spin">
                        <Icon type="load-c" size=18 class="demo-spin-icon-load" style="color: #ccc;"></Icon>
                        <div style="color: #ccc; text-indent: 5px;">  loading...</div>
                    </Spin>
                    <div class="help">
                        <Poptip trigger="hover" style="float: right;"  placement="left" title="数据项说明" content="提示内容">
                            <span>?</span>
                            <div class="content" slot="content">
                                <p><b>新注册用户:</b>所选时间段内新注册的用户数</p>
                                <p><b>留存率:</b></p>
                            </div>
                        </Poptip>
                    </div>
                    <Table  border size='small' :no-data-text='noDataText' :columns="columns_userKeepMonthData" :data="userKeepMonthData"></Table>
                    <Page :total="totalListNum" show-sizer show-elevator  :styles='page' placement="top" :current='currentPage' v-show="pageShow"  @on-change="handleCurrentPage" @on-page-size-change="handlePageSize" show-sizer :page-size="pageSize" :page-size-opts='pageSizeOpts'></Page>
                </div>
            </div>
        </TabPane>
    </Tabs>
</div>
</template>
<style lang='scss' scoped type="text/css">
    #userKeepDay_body {
        background: #ececec;
        .Breadcrumb {
            width: 100%;
            height: 30px;
            font-size: 16px;
            line-height: 30px;
        }
        .Breadcrumb2 {
            width: 100%;
            height: 40px;
            line-height: 40px;
            background: #797979;
            padding-left: 10px;
            font-size: 18px;
            font-weight: bolder;
            span {
                color: #fff;
            }
        }
        #userKeepDay_head {
            -moz-box-shadow:3px 4px 6px rgba(51, 51, 51, 0.43); 
            -webkit-box-shadow:3px 4px 6px rgba(51, 51, 51, 0.43); 
            box-shadow: 3px 4px 6px rgba(51, 51, 51, 0.43);
            font-size: 14px;
            background: #fff;
            padding: 12px 10px 0 10px;
            overflow: hidden;
            position: relative;
            div.userKeepDay_head_time {
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
        .userKeepDay_table {
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
    }

    #userKeepWeek_body {
        background: #ececec;
        .Breadcrumb {
            width: 100%;
            height: 30px;
            font-size: 16px;
            line-height: 30px;
        }
        .Breadcrumb2 {
            width: 100%;
            height: 40px;
            line-height: 40px;
            background: #797979;
            padding-left: 10px;
            font-size: 18px;
            font-weight: bolder;
            span {
                color: #fff;
            }
        }
        #userKeepWeek_head {
            -moz-box-shadow:3px 4px 6px rgba(51, 51, 51, 0.43); 
            -webkit-box-shadow:3px 4px 6px rgba(51, 51, 51, 0.43); 
            box-shadow: 3px 4px 6px rgba(51, 51, 51, 0.43);
            font-size: 14px;
            background: #fff;
            padding: 12px 10px 0 10px;
            overflow: hidden;
            position: relative;
            div.userKeepWeek_head_time {
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
        .userKeepWeek_table {
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
    }

    #userKeepMonth_body {
        background: #ececec;
        .Breadcrumb {
            width: 100%;
            height: 30px;
            font-size: 16px;
            line-height: 30px;
        }
        .Breadcrumb2 {
            width: 100%;
            height: 40px;
            line-height: 40px;
            background: #797979;
            padding-left: 10px;
            font-size: 18px;
            font-weight: bolder;
            span {
                color: #fff;
            }
        }
        #userKeepMonth_head {
            -moz-box-shadow:3px 4px 6px rgba(51, 51, 51, 0.43); 
            -webkit-box-shadow:3px 4px 6px rgba(51, 51, 51, 0.43); 
            box-shadow: 3px 4px 6px rgba(51, 51, 51, 0.43);
            font-size: 14px;
            background: #fff;
            padding: 12px 10px 0 10px;
            overflow: hidden;
            position: relative;
            div.userKeepMonth_head_time {
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
        .userKeepMonth_table {
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
    }
</style>
<script>
import moment from 'moment'
import citySelect from '../../../components/citySelect.vue'
import { siblings } from '../../../util/util.js'
import $ from 'jquery'
var Highcharts = require('highcharts');
// 在 Highcharts 加载之后加载功能模块
require('highcharts/modules/exporting')(Highcharts);
// require('highcharts-no-data-to-display')(Highcharts)
export default {
    components: {
        "city-select": citySelect
    },
    data () {
        var that = this;
        return {
            cityType: '',
            currentTab: 'dayKeep',
            timeSelectShow: false,
            timeLine: ['',''],
            page: {
                'float': 'right',
                'margin-top': '20px'
            },
            totalListNum: 100,
            pageSizeOpts: [10, 20, 30, 40],
            pageSize: 10,
            currentPage: 1,
            pageShow: false,
            // 表单数据
            columns_userKeepDayData: [
                {
                    renderHeader: (h) => {
                        // title: that.cityType === undefined?'地区':'日期2',
                        // key: that.cityType === '1'?'cityName':'orderTime',
                        return h('span', that.cityType === 1?'地区':'日期')
                    },
                    render: (h, params) => {
                        if (that.cityType === 1) {
                            return h('a', {
                                style: {
                                    color: '#2d8cf0',
                                    cursor: 'pointer'
                                },
                                attrs: {
                                    target: '_blank',
                                    href: '#/index/userKeepDetail/detail/' + params.row.cityCode + '&' + params.row.cityName
                                }
                            }, params.row.cityName)
                        } else {
                            return h('p', {
                            }, params.row.time)
                        }
                    }
                },
                {
                    title: '新注册用户',
                    key: 'userCount',
                    // sortable: true
                },
                {
                    title: '仅注册用户',
                    key: 'onlyRegister'
                },
                {
                    title: '存量押金用户',
                    key: 'stock',
                    // sortable: true
                },
                {
                    title: '已退押金用户',
                    key: 'refundDeposit'
                },
                {
                    title: '活跃新用户(累计)',
                    key: 'active',
                    // sortable: true
                },
                {
                    title: '活跃新用户(累计)占比',
                    key: 'activeRate'
                }
            ],
            userKeepDayData: [],
            columns_userKeepWeekData: [
                {
                    renderHeader: (h) => {
                        // title: that.cityType === undefined?'地区':'日期2',
                        // key: that.cityType === '1'?'cityName':'orderTime',
                        return h('span', that.cityType === 1?'地区':'日期')
                    },
                    render: (h, params) => {
                        if (that.cityType === 1) {
                            return h('a', {
                                style: {
                                    color: '#2d8cf0',
                                    cursor: 'pointer'
                                },
                                attrs: {
                                    target: '_blank',
                                    href: '#/index/userKeepDetail/detail/' + params.row.cityCode + '&' + params.row.cityName
                                }
                            }, params.row.cityName)
                        } else {
                            return h('p', {
                            }, params.row.time)
                        }
                    }
                },
                {
                    title: '新注册用户',
                    key: 'userCount',
                    // sortable: true
                },
                {
                    title: '仅注册用户',
                    key: 'onlyRegister'
                },
                {
                    title: '存量押金用户',
                    key: 'stock',
                    // sortable: true
                },
                {
                    title: '已退押金用户',
                    key: 'refundDeposit'
                },
                {
                    title: '活跃新用户(累计)',
                    key: 'active',
                    // sortable: true
                },
                {
                    title: '活跃新用户(累计)占比',
                    key: 'activeRate'
                }
            ],
            userKeepWeekData: [],
            columns_userKeepMonthData: [
                {
                    renderHeader: (h) => {
                        // title: that.cityType === undefined?'地区':'日期2',
                        // key: that.cityType === '1'?'cityName':'orderTime',
                        return h('span', that.cityType === 1?'地区':'日期')
                    },
                    render: (h, params) => {
                        if (that.cityType === 1) {
                            return h('a', {
                                style: {
                                    color: '#2d8cf0',
                                    cursor: 'pointer'
                                },
                                attrs: {
                                    target: '_blank',
                                    href: '#/index/userKeepDetail/detail/' + params.row.cityCode + '&' + params.row.cityName
                                }
                            }, params.row.cityName)
                        } else {
                            return h('p', {
                            }, params.row.time)
                        }
                    }
                },
                {
                    title: '新注册用户',
                    key: 'userCount',
                    // sortable: true
                },
                {
                    title: '仅注册用户',
                    key: 'onlyRegister'
                },
                {
                    title: '存量押金用户',
                    key: 'stock',
                    // sortable: true
                },
                {
                    title: '已退押金用户',
                    key: 'refundDeposit'
                },
                {
                    title: '活跃新用户(累计)',
                    key: 'active',
                    // sortable: true
                },
                {
                    title: '活跃新用户(累计)占比',
                    key: 'activeRate'
                }
            ],
            userKeepMonthData: [],
            noDataBox: false,
            spinShow: false,
            spinShow2: false,
            noDataText: '',
            chartDataX: [],
            chartDataOnlyRegister: [],
            chartStock: [],
            chartRefundDeposit: [],
            loadFlag: false,
            options: {
                disabledDate(date) {
                    return date&&date.valueOf()> Date.now() - 86400000
                    // return date&&date.valueOf() > now.getDay() - 1
                }
            },
            transfer: true
        }
    },
    mounted () {
        console.log('哇哈哈哈')
        // document.title = '用户数据 - 活跃用户'
        // this.$store.dispatch('menuActiveName', '/index/userKeep')
        var type = Number(window.sessionStorage.getItem('cityType'))
        this.cityType = type
        var that = this
        setTimeout( function () {
            // that.loadData($('.userKeep_head_time button.active').attr('myId'))
        }, 200)
    },
    computed: {
        city:{
            get () {
                return this.city = window.localStorage.getItem('city')
            },
            set () {
                // 当只有一个城市时，用来显示的城市名
                return 
            }
        }
    },
    methods: {
        handleSort(column,key,order){
            console.log(column,key,order)
        },
        tabChange (name) {
            console.log(name)
        },
        loadData (type) {
            this.spinShow = true
            this.spinShow2 = true
            this.noDataText = ''
            // 调取数据前，清空chart数据
            this.chartDataOnlyRegister = []
            this.chartStock = []
            this.chartRefundDeposit = []
            this.chartDataX = []
            // 节流防止用户快速点击数据串行
            this.loadFlag = false       

            this.axios.get('/beefly/userKeep/getData', {
                params: {
                    accessToken: this.$store.state.token,
                    type: type,
                    cityCode: this.$store.state.cityList.toString(),
                    pageNo: this.currentPage,
                    pageSize: this.pageSize,
                    beginDate: this.timeLine[0] === ''||this.timeLine[0] === null?'':moment(this.timeLine[0]).format('YYYY-MM-DD'),
                    endDate: this.timeLine[0] === ''||this.timeLine[0] === null?'':moment(this.timeLine[1]).format('YYYY-MM-DD')
                }
            })
            .then( res => {
                this.checkLogin(res)
                var data = res.data.data
                // 判断message字段是1 or 0 , 1:多个城市，0:一个城市
                // if (Number(res.data.message) === 0) {
                //     this.cityType = 0
                // } else {
                //     this.cityType = 1
                // }


                this.spinShow = false
                // 先展示下面的图表加载状 态
                this.noDataBox = true
                if (res.data.resultCode === 0) {
                    this.noDataText = '暂无数据'
                    this.userKeepData = []
                    this.loadChartData($('.userKeep_head_time button.active').attr('myId'))
                } else {
                    this.userKeepData = data

                    this.loadChartData($('.userKeep_head_time button.active').attr('myId'))
                    // 处理分页数据
                    if (res.data.totalPage < 2 && this.pageSize === 10) {
                        this.pageShow = false
                    } else {
                        this.pageShow = true
                    }
                    this.totalListNum = res.data.totalItems
                }

            })
            .catch( err => {
                this.spinShow = false
                this.noDataText = '暂无数据'
                console.log(err)
            })
        },
        loadChartData (type) {
            this.axios.get('/beefly/userKeep/getData', {
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
                // console.log(res.data.data)
                this.spinShow2 = false
                var chartData = res.data.data
                if (res.data.resultCode === 0) {
                    $('#container').html('')
                    this.noDataBox = false
                    this.loadFlag = true
                } else {
                    this.noDataBox = true
                    chartData.map( item => {
                        this.chartDataOnlyRegister.push(Number(this.delcommafy(item.onlyRegister)))
                        this.chartStock.push(Number(this.delcommafy(item.stock)))
                        this.chartRefundDeposit.push(Number(this.delcommafy(item.refundDeposit)))
                        this.chartDataX.push(this.cityType === 1?item.cityName:item.time)
                        // this.chartDataOnlyRegister.push(Number(item.onlyRegister))
                        // this.chartStock.push(Number(item.stock))
                        // this.chartRefundDeposit.push(Number(item.refundDeposit))
                        // this.chartDataX.push(this.cityType === 1?item.cityName:item.time)
                    })

                    console.log('this.chartDataOnlyRegister', this.chartDataOnlyRegister)
                    console.log('this.chartStock', this.chartStock)
                    console.log('this.chartRefundDeposit', this.chartRefundDeposit)
                    console.log('this.chartDataX', this.chartDataX)
                    this.initChart()
                    this.loadFlag = true
                }

            })
            .catch( err => {
                this.spinShow = false
                this.noDataText = '暂无数据'
                console.log(err)
            })
        },
        handleDayClick (e) {
            this.currentPage = 1
            this.pageSize = 10
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
                if (this.loadFlag === true) {
                    this.loadData(e.target.getAttribute('myId'))
                } else {
                    return
                }
            }
        },
        handleWeekClick (e) {
            this.currentPage = 1
            this.pageSize = 10
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
                if (this.loadFlag === true) {
                    this.loadData(e.target.getAttribute('myId'))
                } else {
                    return
                }
            }
        },
        handleMonthClick (e) {
            this.currentPage = 1
            this.pageSize = 10
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
                if (this.loadFlag === true) {
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
                this.loadData('5')
            }
        },
        handleCurrentPage(currentPage) {
            this.currentPage = currentPage
            if (this.loadFlag === true) {
                this.loadData($('.userKeep_head_time button.active').attr('myId'))
            }
        },
        handlePageSize(pageSize) {
            this.currentPage = 1
            this.pageSize = pageSize
            if (this.loadFlag === true) {
                this.loadData($('.userKeep_head_time button.active').attr('myId'))
            }
        },
        delcommafy(num){
            if (num < 1000) {
                return num;
            } else {
                num=num.replace(/,/gi,'');
                return num;
            }
        },
        cityChange () {
            if (this.loadFlag === true) {
                this.loadData($('.userKeep_head_time button.active').attr('myId'))
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
