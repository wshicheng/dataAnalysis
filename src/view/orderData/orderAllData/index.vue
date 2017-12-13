<template>
  <div id="orderAllData_body">
        <Breadcrumb class="Breadcrumb">
            <BreadcrumbItem>整体数据</BreadcrumbItem>
        </Breadcrumb>
        <div id="orderAllData_head">
            <div class="orderAllData_head_time" v-if="cityType === 1">
                <span>时间:</span>
                <button @click="handleClick" myId='1'>今日</button>
                <button @click="handleClick" myId='2'>昨日</button>
                <button class="active" @click="handleClick" myId='3'>近7日</button>
                <button @click="handleClick" myId='4'>近30天</button>
                <button @click="handleClick" myId='5'>指定时间段</button>
            </div>
            <div class="orderAllData_head_time" v-else>
                <span>时间:</span>
                <button @click="handleClick" class="active" myId='1'>近7日</button>
                <button @click="handleClick" myId='2'>近30天</button>
                <button @click="handleClick" myId='3'>指定时间段</button>
            </div>
            <div class="timeSelectShow" v-show="timeSelectShow" v-if="cityType === 1">
                <DatePicker type="daterange" v-model="timeLine" :options='options' placement="bottom-end" placeholder="选择日期" style="width: 216px; vertical-align: top;"></DatePicker>
                <div class="search"><button @click="searchByTimeLine">查询</button></div>
            </div>
            <div class="timeSelectShow2" v-show="timeSelectShow" v-else>
                <DatePicker type="daterange" v-model="timeLine" :options='options'  placement="bottom-end" placeholder="选择日期" style="width: 216px; vertical-align: top;"></DatePicker>
                <div class="search"><button @click="searchByTimeLine">查询</button></div>
            </div>
            <div v-if="cityType === 1">
                <city-select></city-select>
            </div>
            <div v-else>
                
            </div>
        </div>

      <div class="orderAllData_table">
        <Spin fix size="large" v-if="spinShow"  class="spin">
            <Icon type="load-c" size=18 class="demo-spin-icon-load" style="color: #ccc;"></Icon>
            <div style="color: #ccc; text-indent: 5px;">  loading...</div>
        </Spin>
        <div class="help">
            <Poptip trigger="hover" style="float: right;"  placement="left" title="数据项说明" content="提示内容" :transfer='transfer'>
                <span>?</span>
                <div class="content" slot="content">
                    <p><b>订单总数:</b>除运维订单以外所有状态的订单总数</p>
                    <p><b>有效订单数:</b>订单状态为人工结束和已结束；非运维订单；订单金额>0</p>
                    <p><b>订单金额（￥）:</b>订单总数的订单金额总和</p>
                    <p><b>均单价（总数）:</b>订单金额/订单总数</p>
                    <p><b>均单价（有效）:</b>订单金额/有效订单数</p>
                    <p><b>实收率:</b>订单金额中的实际支付金额/订单金额</p>
                    <p><b>优惠订单占比:</b>有效订单数中使用优惠券的订单数/有效订单数</p>
                    <p><b>平均订单时长（分）:</b>有效订单数的总订单时长/有效订单数</p>
                    <p><b>平均订单里程（公里）:</b>有效订单数的总订单里程/有效订单数/1000</p>
                </div>
            </Poptip>
        </div>
        <div class="spieceTablePar" >

              <Table class="spieceTable" @on-sort-change="sortChange"  border size='small'  :no-data-text='noDataTextSpace' :columns="columns_orderData" :data="[]"></Table>
        </div>
      
       <div class="relTab">
            <Table @on-sort-change="sortChange"  border size='small'  :no-data-text='noDataText' :columns="columns_orderData" :data="orderData"></Table>
       </div>
        <Page :total="totalListNum" :styles='page' placement="top" :current='currentPage' v-show="pageShow"  @on-change="handleCurrentPage" @on-page-size-change="handlePageSize"  :page-size="pageSize" :page-size-opts='pageSizeOpts' show-sizer show-elevator></Page>
      </div>

      <div class="orderTotalAllData_table" v-show="citySelectNum.length==0?false:true">
        <Spin fix size="large" v-if="spinShow3"  class="spin">
            <Icon type="load-c" size=18 class="demo-spin-icon-load" style="color: #ccc;"></Icon>
            <div style="color: #ccc; text-indent: 5px;">  loading...</div>
        </Spin>
        <Table  border size='small' :no-data-text='noDataText2' :show-header='showHeader' :columns="columns_orderTotalData" :data="orderTotalData"></Table>
      </div>

      <div class="orderAllData_chart" v-show="noDataBox">
            <Spin fix size="large" v-if="spinShow2"  class="spin">
                <Icon type="load-c" size=18 class="demo-spin-icon-load" style="color: #ccc;"></Icon>
                <div style="color: #ccc; text-indent: 5px;">  loading...</div>
            </Spin>
            <div id="container" style="min-width:400px; height: 400px;"></div>
      </div>
  </div>
</template>
<style lang='scss' scoped type="text/css">
    div.spieceTablePar{
        position: absolute;left: 10px;top: 33px;z-index: 99;width:calc(100% - 20px);height:58px;}
    #orderAllData_body {
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
        #orderAllData_head {
            -moz-box-shadow:3px 4px 6px rgba(51, 51, 51, 0.43); 
            -webkit-box-shadow:3px 4px 6px rgba(51, 51, 51, 0.43); 
            box-shadow: 3px 4px 6px rgba(51, 51, 51, 0.43);
            font-size: 13px;
            background: #fff;
            padding: 12px 10px 0 10px;
            overflow: hidden;
            position: relative;
            div.orderAllData_head_time {
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
            div.timeSelectShow2 {
                display: inline;
                position: absolute;
                left: 332px;
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
        .orderAllData_table {
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
        .orderTotalAllData_table {
            position: relative;
            .spin {
                position: absolute;
                display: inline-block;
                top: -9px;
                background-color: rgba(255, 255, 255, 0.8);
            }
            padding: 10px;
            margin-top: 20px;
            background: #fff;
            position: relative;
            overflow: hidden;
            padding-top: 10px;
        }
        .orderAllData_chart {
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
import {mapGetters,mapActions} from 'vuex'
// var Highcharts = require('highcharts');
// // 在 Highcharts 加载之后加载功能模块
// require('highcharts/modules/exporting')(Highcharts);
// require('highcharts-no-data-to-display')(Highcharts)
export default {
    components: {
        "city-select": citySelect
    },
    data () {
        var that = this;
        return {
            recode:'',
            noDataTextSpace:'',
            citySelectNum:[],
            cityType: '',
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
            // 订单数从小到大字段， 0 代表从小到大， 1 代表从大到小
            sortNum: 1,
            columns_orderData: [
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
                                    href: '#/index/orderAllData/detail/' + params.row.cityCode + '&' + params.row.cityName
                                }
                            }, params.row.cityName)
                        } else {
                            return h('p', {
                            }, params.row.orderTime)
                        }
                    }
                },
                {
                    title: '订单总数',
                    key: 'orderAllNum',
                    
                },
                {
                    title: '有效订单数',
                    render:function(h,params){
                        return h('div',params.row.orderNum)
                    },
                    sortable:'custom'
                    
                },
                {
                 
                    //  renderHeader:(h)=>{
                    //     return h('div',[
                    //         h('div','订单金额'),
                    //         h('span','(￥)')
                    //     ])
                    // },
                    title:'订单金额(￥)',
                    key: 'orderAllAmount',
                    width:100
                    // sortable: true
                },
                {
                    title: '均单价(总数)',
                    key: 'avgAllAmount'
                },
                {
                    title: '均单价(有效)',
                    key: 'avgAmount',
                    // sortable: true
                },
                {
                    title: '实收率',
                    key: 'profitRate'
                },
                {
                    title: '优惠订单占比',
                    key: 'discountRate'
                },
                {
                     renderHeader:(h)=>{
                        return h('div',[
                            h('div','平均订单时长'),
                            h('span','(min)')
                        ])
                    },
                    key: 'avgTime',
                    width: 120
                },
                {
                    renderHeader:(h)=>{
                        return h('div',[
                            h('div','平均订单里程'),
                            h('span','(km)')
                        ])
                    },
                    key: 'avgMileage',
                    width: 120
                }
            ],
            orderData: [],
            columns_orderTotalData: [
                {
                    title: ' ',
                    key: 'titleName'
                },
                {
                    title: '订单总数',
                    key: 'orderAllNum'
                },
                {
                    title: '有效订单数',
                    key: 'orderNum'
                },
                {
                    title: '订单金额(￥)',
                    key: 'orderAllAmount',
                     width:100
                    // sortable: true
                },
                {
                    title: '均单价(总数)',
                    key: 'avgAllAmount'
                },
                {
                    title: '均单价(有效)',
                    key: 'avgAmount',
                    // sortable: true
                },
                {
                    title: '实收率',
                    key: 'profitRate'
                },
                {
                    title: '优惠订单占比',
                    key: 'discountRate'
                },
                {
                    title: '平均订单时长(min)',
                    key: 'avgTime',
                    width: 120
                },
                {
                    title: '平均订单里程(km)',
                    key: 'avgMileage',
                    width: 120
                }
            ],
            orderTotalData: [],
            noDataBox: false,
            spinShow: false,
            spinShow2: false,
            spinShow3: false,            
            noDataText: '',
            noDataText2: '',
            chartDataX: [],
            chartDataPayAmount: [],
            chartDisCountAmount: [],
            chartProfitRate: [],
            loadFlag: false,
            options: {
                disabledDate(date) {
                    return date&&date.valueOf()> Date.now() - 86400000
                    // return date&&date.valueOf() > now.getDay() - 1
                }
            },
            transfer: true,
            showHeader: false
        }
    },
    mounted () {
        document.title = '订单数据 - 整体数据'
        this.$store.dispatch('menuActiveName', '/index/orderAllData')
        var type = Number(window.localStorage.getItem('cityType'))
        this.cityType = type
        var that = this
        if(this.citySelectNum.length==0){
              setTimeout( function () {
                that.loadData($('.orderAllData_head_time button.active').attr('myId'))
            }, 200)
        }
      
    },
    computed: {
        ...mapGetters(['scrollTop']),
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

        ...mapActions(['setScrollTop']),
        sortChange(params){
          var arr = this.orderData.map((item)=>{
             return  item.orderNum.replace(',','')
          })
          var that = this
         var tem = []
          if(params.order=='asc'){
              // 从小到大
               var res = arr.sort(function(a,b){
                    return a - b;
                })
         
                res.map((item)=>{
                    that.orderData.map((list)=>{
                        if(list.orderNum.replace(',','')==item){
                            tem.push(list)
                        }
                    })
                })
          }
          if(params.order=='desc'){
              // 从小到大
               var res = arr.sort(function(a,b){
                    return b - a;
                })
         
                res.map((item)=>{
                    that.orderData.map((list)=>{
                        if(list.orderNum.replace(',','')==item){
                            tem.push(list)
                        }
                    })
                })
          }
          if(params.order=='normal'){
              tem = this.orderData
          }
         
          this.orderData = tem;
        },
        handleSort(column,key,order){
        },
        sortMethod (type) {
            this.sortNum = type
            if( this.sortNum==0){
                this.sortNum = 1
            }else{
                this.sortNum=0
            }
           
        },
        loadData (type) {
            this.spinShow = true
            this.spinShow2 = true
            this.spinShow3 = true
            this.noDataText = ''
            // 调取数据前，清空chart数据
            this.orderData = []
            this.chartDataPayAmount = []
            this.chartDisCountAmount = []
            this.chartProfitRate = []
            this.chartDataX = []
            // 节流防止用户快速点击数据串行
            this.loadFlag = false       

            this.axios.get('/beefly/dateCityOrders/api/v1/wholeDataPage', {
                params: {
                    accessToken: this.$store.state.token,
                    type: type,
                    cityCode: this.$store.state.cityList.toString(),
                    pageNo: this.currentPage,
                    pageSize: this.pageSize,
                    beginDate: this.timeLine[0] === ''||this.timeLine[0] === null?'':moment(this.timeLine[0]).format('YYYY-MM-DD'),
                    endDate: this.timeLine[0] === ''||this.timeLine[0] === null?'':moment(this.timeLine[1]).format('YYYY-MM-DD'),
                    sort_orderNum: this.sortNum
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

                
                // 先展示下面的图表加载状 态
                this.noDataBox = true
                if (res.data.resultCode != 1) {
                     this.noDataText = '暂无数据'
                     this.pageShow = false
                     this.spinShow = false
                     this.orderData = data
                    this.loadChartData($('.orderAllData_head_time button.active').attr('myId'))
                    this.loadTotalData($('.orderAllData_head_time button.active').attr('myId'))
                } else {
                    this.orderData = data

                    this.loadChartData($('.orderAllData_head_time button.active').attr('myId'))
                    this.loadTotalData($('.orderAllData_head_time button.active').attr('myId'))
                    // 处理分页数据
                    if (res.data.totalPage < 2 && this.pageSize === 10) {
                        this.pageShow = false
                    } else {
                        this.pageShow = true
                    }
                    this.totalListNum = res.data.totalItems
                    this.spinShow = false
                }

            })
            .catch( err => {
                this.spinShow = false
                this.noDataText = '暂无数据'
                console.log(err)
            })
        },
        loadChartData (type) {
            this.axios.get('/beefly/dateCityOrders/api/v1/chartData', {
                params: {
                    accessToken: this.$store.state.token,
                    type: type,
                    cityCode: this.$store.state.cityList.toString(),
                    beginDate: this.timeLine[0] === ''||this.timeLine[0] === null?'':moment(this.timeLine[0]).format('YYYY-MM-DD'),
                    endDate: this.timeLine[0] === ''||this.timeLine[0] === null?'':moment(this.timeLine[1]).format('YYYY-MM-DD'),
                    sort_orderNum: this.sortNum
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
                        this.chartDataPayAmount.push(Number(this.delcommafy(item.payAmount)))
                        this.chartDisCountAmount.push(Number(this.delcommafy(item.disCountAmount)))
                        this.chartProfitRate.push(Number(item.profitRate))
                        this.chartDataX.push(this.cityType === 1?item.cityName:item.orderTime)
                    })
                    this.chartDataPayAmount = this.chartDataPayAmount.unique()
                    this.chartDisCountAmount =  this.chartDisCountAmount.unique()
                    this.chartProfitRate = this.chartProfitRate.unique()
                    this.chartDataX = this.chartDataX.unique()
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
        loadTotalData (type) {
            this.axios.get('/beefly/dateCityOrders/api/v1/wholeTotal', {
                params: {
                    accessToken: this.$store.state.token,
                    type: type,
                    cityCode: this.$store.state.cityList.toString(),
                    beginDate: this.timeLine[0] === ''||this.timeLine[0] === null?'':moment(this.timeLine[0]).format('YYYY-MM-DD'),
                    endDate: this.timeLine[0] === ''||this.timeLine[0] === null?'':moment(this.timeLine[1]).format('YYYY-MM-DD'),
                    sort_orderNum: this.sortNum
                }
            })
            .then( res => {
                this.checkLogin(res)
                // console.log(res.data.data)
                this.spinShow3 = false
                var result = res.data.data

                if (res.data.resultCode === 0) {
                    this.orderTotalData = []
                    this.noDataText2 = '暂无数据'
                    
                } else {
                    // 多个和单个城市登录时，分别显示是合计，还是平均 + 合计
                    if (this.cityType === 1) {
                        var arr = new Array()
                        var obj = {}
                        for ( var i in result) {
                            obj[i] = result[i]
                        }
                        obj.titleName = '合计'
                        arr.push(obj)
                        arr[0].cellClassName = {
                            titleName: 'demo-table-info-cell-name'
                        }
                        this.orderTotalData = arr
                    }  else {
                        var newArr = result.slice(0)
                        newArr[0].titleName = '平均'
                        newArr[0].cellClassName = {
                            titleName: 'demo-table-info-cell-name'
                        }
                        newArr[1].titleName = '合计'
                        newArr[1].cellClassName = {
                            titleName: 'demo-table-info-cell-name'
                        }

                        this.orderTotalData = newArr 
                    }     
                }

            })
            .catch( err => {
                this.spinShow = false
                this.noDataText2 = '暂无数据'
                console.log(err)
            })
        },
        handleClick (e) {
            if(this.loadFlag==false){
                return
            }
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
                if(this.citySelectNum.length==0){
                    return;
                }
                if (this.loadFlag === true) {
                    this.loadData(e.target.getAttribute('myId'))
                } else {
                    return
                }
            }
        },
        searchByTimeLine () {
            if($(".search button").attr("disabled")=='disabled'){
                return
            }
            if (this.timeLine[0] === '' || this.timeLine[0] === null) {
                this.$Message.warning('请选择时间段')
                $(".search button").attr("disabled","disabled")
                setTimeout(function(){
                    $(".search button").attr("disabled",false)
                },1500)
            } else {
                if(this.citySelectNum.length==0){
                    return;
                }
                this.loadData('5')
            }
        },
        handleCurrentPage(currentPage) {
            $('div.spieceTable').parent().hide() 
            $('div.spieceTable').parent().css({
                position:'relative',
                top:'initial' ,
                zIndex:99
            })
            this.currentPage = currentPage
            if (this.loadFlag === true) {
                this.loadData($('.orderAllData_head_time button.active').attr('myId'))
            }
        },
        handlePageSize(pageSize) {
             $('div.spieceTable').parent().hide() 
            $('div.spieceTable').parent().css({
                position:'relative',
                top:'initial' ,
                zIndex:99
            })
            this.currentPage = 1
            this.pageSize = pageSize
            if (this.loadFlag === true) {
                this.loadData($('.orderAllData_head_time button.active').attr('myId'))
            }
        },
        delcommafy(num){
        //   if((num+"").Trim()==""){
        //    return"";
        //   }
          num=num.replace(/,/gi,'');
          return num;
        },
        initChart () {
            var options = {
                title: {
                    text: this.cityType===1?'分地区 订单金额及实收率统计图':'订单金额及实收率统计图'
                },
                subtitle: {
                    text: this.cityType===1?'':'',
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
                lang: {
                    noData: "暂无数据，请选择一个指标或其他城市"
                },
                noData: {  
                    position: {
                        align: 'center',
                        marginLeft: '10px'
                    },  
                    attr: { 
                        'stroke-width': 1,  
                        stroke: '#cccccc'  
                    }, 
                    style: {                  
                        fontWeight: 'bolder',       
                        fontSize: '22px',  
                        color: '#444',
                        border: 'none',
                        zIndex: 200,
                        backgroundColor: '#444'
                    }  
                },
                xAxis: {
                    categories: this.chartDataX
                },
                yAxis: [{
                            labels: {
                                formatter:function(){
                                    return Highcharts.numberFormat(this.value, 2, ".",",") + '元'
                                },
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            },
                            title: {
                                text: '金额',
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            }
                        }, {
                            opposite: true,
                            tickPositions: [20, 40, 60, 80, 100],
                            title: {
                                text: '实收率',
                                style: {
                                    color: '#9999ff'
                                }
                            },
                            labels: {                        
                                // formatter:function(){
                                //     if (Number(this.value) <= 100) {
                                //         return this.value + '%'
                                //     } else {
                                //         return 100 + '%'
                                //     }
                                // },
                                format: '{value}%',
                                style: {
                                    color: '#9999ff'
                                }
                            }
                        }],
                legend: {
                    align: 'center',
                    x: 0,
                    verticalAlign: 'bottom',
                    y: 0,
                    floating: false,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                    shadow: false
                },
                tooltip: {
                    shared: true,
                    useHTML: true,
                    headerFormat: "<p'>{point.key}</p>",
                    pointFormatter:function () {
                        if (this.series.name != '实收率') {
                            return "<span>" + this.series.name + ':  </span>' + [new String(this.y).length<3?this.y:Highcharts.numberFormat(this.y, 2, ".",",")] + '<br>'
                        } else {
                            return "<span>" + this.series.name + ':  </span>' + Highcharts.numberFormat(this.y, 1) + '%'
                        }
                    }
                },
                colors: ['#4472c4', '#ed7d31', '#9999ff', '#ffc000', '#5b9bd5', '#70ad48', '#264478', '#9e480e', '#636363', '#997300'],
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: false,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                            style: {
                                textShadow: '0 0 3px black'
                            }
                        }
                    }
                },
                series: [{
                    name: '实际支付金额',
                    type: 'column',
                    data: this.chartDataPayAmount,
                    yAxis: 0,
                    maxPointWidth: 100
                }, { 
                    name: '优惠劵抵扣金额',
                    type: 'column',
                    data: this.chartDisCountAmount,
                    yAxis: 0,
                    maxPointWidth: 100
                }, {
                    name: '实收率',
                    type: 'line',
                    data: this.chartProfitRate,
                    tooltip: {
                        valueSuffix: ''
                    },
                    yAxis: 1
                }]
            }

            new Highcharts.chart('container', options);
        },
        cityChange () {
            this.citySelectNum = this.$store.state.cityList;
            if(this.citySelectNum.length==0){
                this.orderData = []
                this.noDataText = '请至少选择一个城市'
                this.pageShow = false
                this.noDataBox = false
                return;
            }
            this.currentPage = 1
            this.loadData($('.orderAllData_head_time button.active').attr('myId'))
        },
        sortData () {
            this.loadData($('.orderAllData_head_time button.active').attr('myId'))
        },
        checkLogin (res) {
           if (res.data.message === '用户登录超时') {
                this.$router.push('/login')
           }
        }
    },
    watch: {
        'scrollTop':{
            handler:function(n,o){
               var partop = $('div.ivu-col.ivu-col-span-19').offset().top
               //relTab spieceTable
               var _relTop = $('div.relTab').offset().top
               var top =  $('div.spieceTable').offset().top
               var _selfHeight =  $('div.spieceTable').height()
            //    console.log('假头部距离 窗口顶部的距离：' +  (top - partop))
                var pageToTop =  $('.ivu-page').offset().top // tab的高度
                // console.log('pageToTop:' + pageToTop)
               if(-(_relTop-partop) > _selfHeight){
                //    console.log('此时假头部改出现了')
                   if(Math.abs(-(top-partop) - _selfHeight)<10){
                        this.recode = n
                       
                    }
                     var disY = -(_relTop-partop) - _selfHeight;
                    // console.log('disY:'+ disY)
                        // console.log('recode:' + this.recode)
                        $('div.spieceTable').parent().show() 
                    $('div.spieceTable').parent().css({
                        position:'absolute',
                        top:Math.abs(-(_relTop-partop)) + _selfHeight - 10  ,
                        zIndex:99
                    }) 
               }else{
                    $('div.spieceTable').parent().css({
                        position:'absolute',
                        top:33  ,
                        zIndex:99
                    }) 
               }
              if(pageToTop - 30 <_selfHeight){
                  $('div.spieceTable').parent().hide() 
                    $('div.spieceTable').parent().css({
                        position:'relative',
                        top:33 ,
                        zIndex:99
                    }) 
              }
            },
            deep:true
        },
        '$store.state.cityList': 'cityChange',
    }
}
</script>