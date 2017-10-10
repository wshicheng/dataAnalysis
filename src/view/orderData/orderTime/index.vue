<template>
    <div id="dateTime_body">
            <Breadcrumb class="Breadcrumb">
                <BreadcrumbItem>订单时长分布</BreadcrumbItem>
            </Breadcrumb>
        <div id="dateTime_head">
            <div class="dateTime_head_time">
                <span>时间:</span>
                <button  @click="handleClick" :myId='0'>今日</button>
                <button  @click="handleClick" :myId='-1'>昨日</button>
                <button class="active" @click="handleClick" :myId='1'>近7日</button>
                <button @click="handleClick" :myId='2'>近30天</button>
                <button @click="handleClick" :myId='3'>指定时间段</button>
            </div>
            <div class="timeSelectShow" v-show="timeSelectShow">
                <DatePicker type="daterange" v-model="timeLine" placement="bottom-end" placeholder="选择日期" style="width: 216px; vertical-align: top;"></DatePicker>
                <div class="search"><button class="DIY_button" @click="searchByTimeLine">查询</button></div>
            </div>
            <city-select></city-select>
        </div>
        <div class="table">
          <table>
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
          </table>
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
        div.table{padding:20px;background:#fff;margin-top:20px;}
        table{
          width:100%;
          border-collapse: collapse;
          thead{
            tr{
              th{font-weight:normal;border:1px solid rgb(174, 174, 174);font-size:14px;height:40px;background:rgb(201, 201, 201);padding-left:5px;box-sizing:border-box;}
            }
          }
          tbody{
            tr{
              td{padding-left:5px;box-sizing:border-box;font-size:14px;height:30px;line-height: 30px;border:1px solid rgb(174, 174, 174);}
            }
          }
          tfoot{
            tr{
              td{padding-left:5px;box-sizing:border-box;font-size:14px;height:30px;line-height: 30px;border:1px solid rgb(174, 174, 174);}
            }
          }
        }
        #dateTime_head {
            -moz-box-shadow:3px 4px 6px rgba(51, 51, 51, 0.43); 
            -webkit-box-shadow:3px 4px 6px rgba(51, 51, 51, 0.43); 
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
            chartTitleName: '有效订单数',
            totalTitle: true,
            ellipsis: true
        }
    },
    mounted () {
        this.$store.dispatch('menuActiveName', '/index/dateTime')
        document.title = '订单数据 - 订单时长分布'
    },
    methods: {
        loadData (type) {
            this.spinShow = true
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
                console.log(res.data.data) 
            })
            .catch( (err) => {
                console.log(err)
            })
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
        },
        searchByTimeLine () {
            if (this.timeLine[0] === '' || this.timeLine[0] === null) {
                this.$Message.warning('请选择时间段')
            } else {
                this.loadData($('.dateAndArea_head_time button.active').attr('myId'))
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
                    text: '*地区超过10个时，显示排名靠前的10个地区'
                },
                credits:{
                    enabled:false
                },
                exporting:{
                    enabled:false
                },
                tooltip: {
                    valueSuffix: '',
                    formatter: function() { 
                        var type = $('.dateAndArea_type_select button.active').attr("myType")
                        console.log(type)
                        if(type==='orderNum'){
                            if(this.point.y.length>3){
                             return '时间:' + this.point.category + '<br>' + this.point.series.name + ':' + Highcharts.numberFormat(this.point.y, 2, ",", " ") + '单/天';
                            }else{
                                return '时间:' + this.point.category + '<br>' + this.point.series.name + ':' + this.point.y + '单/天';
                            }
                        }
                        if(type=='orderAmount'||type=='avgAmount'||type=='payAmount'){
                            if(this.point.y.length>7){
                             return '时间:' + this.point.category + '<br>' + this.point.series.name + ':' + Highcharts.numberFormat(this.point.y, 2, ",", " ") + '元/天';
                            }else{
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
        cityChange () {
            this.current = 1
            this.loadData($('.dateAndArea_head_time button.active').attr('myId'))
        }
    },
    watch: {
        '$store.state.cityList': 'cityChange'
    }
}
</script>
