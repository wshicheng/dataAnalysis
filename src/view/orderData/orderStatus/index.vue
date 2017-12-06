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
        <TabPane label="汇总" name="gather" >
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
                <Table :total="totalItemsNum" :no-data-text='noDataText'  border size='small' :columns="columns_orderStatusData" :data="orderStatusData"></Table>
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
        <TabPane label="对比" name="comparison" id="orderStatus_comparison_table">
            
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
               
                
           </div>
            <div style="height:43px;background:#fff;">
                 <Page show-total  :total="totalItemsNum" :styles='page' placement="top" :current="currentPageNum" @on-change="pageNumChange" @on-page-size-change="pageSizeChange"   :page-size-opts="pageOpts"  :page-size="pageSize" show-sizer show-elevator  ></Page>
            </div>
            <div v-show="noData" class="orderStatus_chart">
                    <Spin fix size="large" v-if="spinShow"  class="spin">
                        <Icon type="load-c" size=18 class="demo-spin-icon-load" style="color: #ccc;"></Icon>
                        <div style="color: #ccc; text-indent: 5px;">  loading...</div>
                    </Spin>
                     <div class="select">
                            <button class="active" @click="chartType" myType='percentage'>订单数</button>
                            <button @click="chartType" myType='orderCountRate'>订单数占比</button>
                     </div>
                <div id="container2" style="min-width:400px; height: 400px;"></div>
            </div>
        </TabPane>
        <TabPane label="趋势" name="tendency" class="orderStatus_tendency">
            <div class="btn">
                <button @click="handleTendencyClick" class="active" myType="close" >人工关闭</button>
                <button @click="handleTendencyClick" myType="fail">开锁失败</button>
                <button @click="handleTendencyClick" myType="cancel">已取消</button>
                <button @click="handleTendencyClick" myType="end">已结束</button>
            </div>

            <div class="orderStatus_chart">
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
    -moz-box-shadow: 3px 4px 6px rgba(51, 51, 51, 0.43);
    -webkit-box-shadow: 3px 4px 6px rgba(51, 51, 51, 0.43);
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
        color: #f90;
      }
      button.active {
        color: #f60;
      }
    }
  }
  div.orderStatus_chart {
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
</style>
<script>
import citySelect from "../../../components/citySelect.vue";
import { siblings } from "../../../util/util.js";
import moment from "moment";
import $ from "jquery";
var Highcharts = require("highcharts");
// 在 Highcharts 加载之后加载功能模块
require("highcharts/modules/exporting")(Highcharts);
export default {
  components: {
    "city-select": citySelect
  },
  data() {
    return {
     orderTdyColData:[],//人工关闭
     orderTdyFailData:[],//开锁失败
     orderTdyCelData:[],//已取消
     orderTdyEndData:[],//已经结束，
     orderTdyStatu:'',//记录四种状态
      pageOpts: [10, 20, 30, 40, 50],
      pageSize: 10,
      chartSelectType: "",
      orderCmsDataRate: [],
      orderCmsData: [],
      orderComparisonData: [],
      orderTendencyData: [],
      tabChangeName: "",
      resultData: [],
      currentPageSize: 10,
      totalItemsNum: 0,
      currentPageNum: 1,
      currentTab: "gather",
      timeSelectShow: false,
      timeLine: ["", ""],
      spinShow: false,
      page: {
        float: "right",
        "margin-right": "9px"
      },
      columns_orderStatusData: [
        {
          title: "订单状态",
          key: "orderFlow"
        },
        {
          title: "订单数",
          key: "num"
        },
        {
          title: "数量占比",
          key: "proportion"
        }
      ],
      orderStatusData: [],
      columnsComparison: [
        {
          title: "城市",
          key: "cityName",
          align: "center"
        },
        {
          title: "合计",
          key: "num",
          align: "center"
        },
        {
          align: "center",
          renderHeader: h => {
            return h("div", [
              h(
                "div",
                {
                  style: {
                    width: "100%",
                    display: "inline-block",
                    lineHeight: "30px",
                    textAlign: "center",
                    borderBox: "box-sizing",
                    borderBottom: "1px solid #e9eaec"
                  }
                },
                "人工关闭"
              ),
              h(
                "div",
                {
                  style: {
                    width: "calc(100%/2)",
                    display: "inline-block",
                    lineHeight: "30px",
                    textAlign: "center",
                    borderBox: "box-sizing",
                    borderRight: "1px solid #e9eaec"
                  }
                },
                "订单数"
              ),
              h(
                "div",
                {
                  style: {
                    width: "calc(100%/2)",
                    display: "inline-block",
                    lineHeight: "30px",
                    textAlign: "center",
                    borderBox: "box-sizing"
                  }
                },
                "占比"
              )
            ]);
          },
          render: (h, params) => {
            return h("div", [
              h(
                "div",
                {
                  style: {
                    width: "calc(100%/2)",
                    display: "inline-block",
                    lineHeight: "40px",
                    textAlign: "center",
                    borderBox: "box-sizing",
                    borderRight: "1px solid #e9eaec"
                  }
                },
                params.row.closeNum
              ),
              h(
                "div",
                {
                  style: {
                    width: "calc(100%/2)",
                    display: "inline-block",
                    lineHeight: "40px",
                    textAlign: "center",
                    borderBox: "box-sizing"
                  }
                },
                params.row.closePercent
              )
            ]);
          }
        },
        {
          align: "center",
          renderHeader: h => {
            return h("div", [
              h(
                "div",
                {
                  style: {
                    width: "100%",
                    display: "inline-block",
                    lineHeight: "30px",
                    textAlign: "center",
                    borderBox: "box-sizing",
                    borderBottom: "1px solid #e9eaec"
                  }
                },
                "开锁失败"
              ),
              h(
                "div",
                {
                  style: {
                    width: "calc(100%/2)",
                    display: "inline-block",
                    lineHeight: "30px",
                    textAlign: "center",
                    borderBox: "box-sizing",
                    borderRight: "1px solid #e9eaec"
                  }
                },
                "订单数"
              ),
              h(
                "div",
                {
                  style: {
                    width: "calc(100%/2)",
                    display: "inline-block",
                    lineHeight: "30px",
                    textAlign: "center",
                    borderBox: "box-sizing"
                  }
                },
                "占比"
              )
            ]);
          },
          render: (h, params) => {
            return h("div", [
              h(
                "div",
                {
                  style: {
                    width: "calc(100%/2)",
                    display: "inline-block",
                    lineHeight: "40px",
                    textAlign: "center",
                    borderBox: "box-sizing",
                    borderRight: "1px solid #e9eaec"
                  }
                },
                params.row.failNum
              ),
              h(
                "div",
                {
                  style: {
                    width: "calc(100%/2)",
                    display: "inline-block",
                    lineHeight: "40px",
                    textAlign: "center",
                    borderBox: "box-sizing"
                  }
                },
                params.row.failPercent
              )
            ]);
          }
        },
        {
          align: "center",
          renderHeader: h => {
            return h("div", [
              h(
                "div",
                {
                  style: {
                    width: "100%",
                    display: "inline-block",
                    lineHeight: "30px",
                    textAlign: "center",
                    borderBox: "box-sizing",
                    borderBottom: "1px solid #e9eaec"
                  }
                },
                "已取消"
              ),
              h(
                "div",
                {
                  style: {
                    width: "calc(100%/2)",
                    display: "inline-block",
                    lineHeight: "30px",
                    textAlign: "center",
                    borderBox: "box-sizing",
                    borderRight: "1px solid #e9eaec"
                  }
                },
                "订单数"
              ),
              h(
                "div",
                {
                  style: {
                    width: "calc(100%/2)",
                    display: "inline-block",
                    lineHeight: "30px",
                    textAlign: "center",
                    borderBox: "box-sizing"
                  }
                },
                "占比"
              )
            ]);
          },
          render: (h, params) => {
            return h("div", [
              h(
                "div",
                {
                  style: {
                    width: "calc(100%/2)",
                    display: "inline-block",
                    lineHeight: "40px",
                    textAlign: "center",
                    borderBox: "box-sizing",
                    borderRight: "1px solid #e9eaec"
                  }
                },
                params.row.cancelNum
              ),
              h(
                "div",
                {
                  style: {
                    width: "calc(100%/2)",
                    display: "inline-block",
                    lineHeight: "40px",
                    textAlign: "center",
                    borderBox: "box-sizing"
                  }
                },
                params.row.cancelPercent
              )
            ]);
          }
        },
        {
          align: "center",
          renderHeader: h => {
            return h("div", [
              h(
                "div",
                {
                  style: {
                    width: "100%",
                    display: "inline-block",
                    lineHeight: "30px",
                    textAlign: "center",
                    borderBox: "box-sizing",
                    borderBottom: "1px solid #e9eaec"
                  }
                },
                "已结束"
              ),
              h(
                "div",
                {
                  style: {
                    width: "calc(100%/2)",
                    display: "inline-block",
                    lineHeight: "30px",
                    textAlign: "center",
                    borderBox: "box-sizing",
                    borderRight: "1px solid #e9eaec"
                  }
                },
                "订单数"
              ),
              h(
                "div",
                {
                  style: {
                    width: "calc(100%/2)",
                    display: "inline-block",
                    lineHeight: "30px",
                    textAlign: "center",
                    borderBox: "box-sizing"
                  }
                },
                "占比"
              )
            ]);
          },
          render: (h, params) => {
            return h("div", [
              h(
                "div",
                {
                  style: {
                    width: "calc(100%/2)",
                    display: "inline-block",
                    lineHeight: "40px",
                    textAlign: "center",
                    borderBox: "box-sizing",
                    borderRight: "1px solid #e9eaec"
                  }
                },
                params.row.endNum
              ),
              h(
                "div",
                {
                  style: {
                    width: "calc(100%/2)",
                    display: "inline-block",
                    lineHeight: "40px",
                    textAlign: "center",
                    borderBox: "box-sizing"
                  }
                },
                params.row.endPercent
              )
            ]);
          }
        }
      ],
      comparisonData: [],
      noDataText: "",
      noDataText2: "",
      chartArr: "",
      noData: false,
      poptipTitle: "数据项说明",
      options: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now() - 86400000;
        }
      },
      transfer: true
    };
  },
  mounted() {
    this.$store.dispatch("menuActiveName", "/index/orderStatus");
    document.title = "订单数据 - 订单状态构成";
    this.tabChangeName = "gather";
    this.loadData("3", 1);
  },
  methods: {
    chartType(e) {
      var elems = siblings(e.target);
      for (var i = 0; i < elems.length; i++) {
        elems[i].setAttribute("class", "");
      }
      e.target.setAttribute("class", "active");
      this.chartSelectType = e.target.getAttribute("myType");
      //this.initChart($(".select button.active").attr('myType'))
    },
    pageNumChange(val) {
      this.currentPageNum = val;
      var type = $(".orderStatus_head_time button.active").attr("myId");
      this.loadData(type, 2, 0, val, this.pageSize);
    },
    pageSizeChange(val) {
      var type = $(".orderStatus_head_time button.active").attr("myId");
      this.currentPageSize = val;
      this.pageSize = val;
      this.loadData(type, 2, 0, this.currentPageNum, this.pageSize);
    },
    loadMutlData(type, data_type, state) {
      this.spinShow = true;
      this.noDataText = "";
      this.noData = false;
      this.orderComparisonData = [];
      this.orderStatusData = [];
      this.orderTendencyData = [];
      this.axios
        .get("/beefly/orderState/getOrderState", {
          params: {
            accessToken: this.$store.state.token,
            type: type,
            cityCode: this.$store.state.cityList.toString(),
            beginDate:
              this.timeLine[0] === "" || this.timeLine[0] === null
                ? ""
                : moment(this.timeLine[0]).format("YYYY-MM-DD"),
            endDate:
              this.timeLine[0] === "" || this.timeLine[0] === null
                ? ""
                : moment(this.timeLine[1]).format("YYYY-MM-DD"),
            data_type: data_type,
            state: state
          }
        })
        .then(res => {
          this.spinShow = false;
          this.noDataText = "暂无数据";
          // 判断是否超时
          this.checkLogin(res);
          var data = res.data.data;
          if (data.length > 0) {
            this.noData = true;
            var newArr = [];
            data.map(item => {
              newArr.push(
                Object.assign({}, item, { proportion: item.proportion + "%" })
              );
              return newArr;
            });
            this.orderComparisonData = newArr;
            this.orderStatusData = newArr;
            this.orderTendencyData = [] = newArr;
            // 去掉合计字段集
            data.pop();
            var arr = new Array();
            for (var i in data) {
              arr.push([data[i].orderFlow, Number(data[i].proportion)]);
            }
            // 取掉无关字段
            arr.pop();
            this.chartArr = arr;
            // console.log(this.chartArr)
            this.initChart();
          } else {
            var newArr = [];
            data.map(item => {
              newArr.push(
                Object.assign({}, item, { proportion: item.proportion + "%" })
              );
              return newArr;
            });
            this.orderComparisonData = newArr;
            this.orderStatusData = newArr;
            this.orderTendencyData = [] = newArr;
            data.pop();
            var arr = new Array();
            for (var i in data) {
              arr.push([data[i].orderFlow, Number(data[i].proportion)]);
            }
            // 取掉无关字段
            arr.pop();
            this.chartArr = arr;
            $("#container").html("");
            this.chartArr = [];
            this.noData = false;
          }
        })
        .catch(err => {
          this.spinShow = false;
          this.noDataText = "暂无数据";
          console.log(err);
        });
    },
    loadData(type, data_type, state, pageNo, pageSize) {
      this.spinShow = true;
      this.noDataText = "";
      this.noData = false;
      this.orderStatusData = [];
      this.axios
        .get("/beefly/orderState/getOrderState", {
          params: {
            accessToken: this.$store.state.token,
            type: type,
            cityCode: this.$store.state.cityList.toString(),
            beginDate:
              this.timeLine[0] === "" || this.timeLine[0] === null
                ? ""
                : moment(this.timeLine[0]).format("YYYY-MM-DD"),
            endDate:
              this.timeLine[0] === "" || this.timeLine[0] === null
                ? ""
                : moment(this.timeLine[1]).format("YYYY-MM-DD"),
            data_type: data_type,
            state: state,
            pageNo: pageNo,
            pageSize: pageSize
          }
        })
        .then(res => {
          this.spinShow = false;
          this.noDataText = "暂无数据";
          // 判断是否超时
          this.checkLogin(res);
          var data = res.data.data;
          this.totalItemsNum = res.data.totalItems;
          if (data.length > 0) {
            this.noData = true;
            var newArr = [];
            data.map(item => {
              newArr.push(
                Object.assign({}, item, { proportion: item.proportion + "%" })
              );
              return newArr;
            });
            this.orderStatusData = newArr;
            // 去掉合计字段集
            data.pop();
            var arr = new Array();
            for (var i in data) {
              arr.push([data[i].orderFlow, Number(data[i].proportion)]);
            }
            // 取掉无关字段
            arr.pop();
            this.chartArr = arr;
            // console.log(this.chartArr)
            this.initChart();
          } else {
            resultData = [];
            var newArr = [];
            data.map(item => {
              newArr.push(
                Object.assign({}, item, { proportion: item.proportion + "%" })
              );
              return newArr;
            });
            this.orderStatusData = newArr;
            // 去掉合计字段集
            data.pop();
            var arr = new Array();
            for (var i in data) {
              arr.push([data[i].orderFlow, Number(data[i].proportion)]);
            }
            // 取掉无关字段
            arr.pop();
            this.chartArr = arr;
            $("#container").html("");
            this.chartArr = [];
            this.noData = false;
          }
        })
        .catch(err => {
          this.spinShow = false;
          this.noDataText = "暂无数据";
          console.log(err);
        });
    },
    handleClick(e) {
      $("div.select button")
        .removeClass("active")
        .eq(0)
        .trigger("click");

      var elems = siblings(e.target);
      for (var i = 0; i < elems.length; i++) {
        elems[i].setAttribute("class", "");
      }
      e.target.setAttribute("class", "active");
      if (e.target.innerHTML === "指定时间段") {
        this.timeSelectShow = true;
      } else {
        this.timeSelectShow = false;
        this.timeLine = ["", ""];
        if (this.tabChangeName == "gather") {
          this.loadMutlData(e.target.getAttribute("myId"), 1, 0);
        } else if (this.tabChangeName == "comparison") {
          this.loadData(
            e.target.getAttribute("myId"),
            2,
            0,
            this.currentPageNum,
            this.currentPageSize
          );
          this.loadMutlData(e.target.getAttribute("myId"), 2, 0);
        } else {
          this.loadMutlData(e.target.getAttribute("myId"), 3, 0);
        }
      }
    },
    handleTendencyClick(e) {
      var elems = siblings(e.target);
      for (var i = 0; i < elems.length; i++) {
        elems[i].setAttribute("class", "");
      }
      e.target.setAttribute("class", "active");
      this.orderTdyStatu = e.target.getAttribute('myType')
    },
    tabChange(name) {
      this.tabChangeName = name;
      if (name === "comparison") {
        var type = $(".orderStatus_head_time button.active").attr("myId");
        // loadData (type,data_type,state,pageNum,pageSize)
        this.loadData(type, 2, 0, this.currentPageNum, this.currentPageSize);
        this.loadMutlData(type, 2, 0);
        //this.comparisonData = this.resultData
        // if(this.chartSelectType=='percentage'){
        //     this.initChart2(res,'订单数')
        // }else{
        //     this.initChart2(res,'订单数占比')
        // }
      } else if (name === "tendency") {
        var type = $(".orderStatus_head_time button.active").attr("myId");
        this.loadMutlData(type, 3, 0);
        this.orderTdyColData =  [
          {
            name: "东京",
            data: [
              7.0,
              6.9,
              9.5,
              14.5,
              18.2,
              21.5,
              25.2,
              26.5,
              23.3,
              18.3,
              13.9,
              9.6
            ]
          },
          {
            name: "伦敦",
            data: [
              3.9,
              4.2,
              5.7,
              8.5,
              11.9,
              15.2,
              17.0,
              16.6,
              14.2,
              10.3,
              6.6,
              4.8
            ]
          }
        ]
       
        this.initChart3(this.orderTdyColData);
      } else {
        var type = $(".orderStatus_head_time button.active").attr("myId");
        this.loadMutlData(type, 1, 0);
      }
    },
    checkLogin(res) {
      if (res.data.message === "用户登录超时") {
        this.$router.push("/login");
      }
    },
    searchByTimeLine() {
      var type = $(".orderStatus_head_time button.active").attr("myId");
      if (this.timeLine[0] === "" || this.timeLine[0] === null) {
        this.$Message.warning("请选择时间段");
      } else {
        if (this.tabChangeName === "comparison") {
          var type = $(".orderStatus_head_time button.active").attr("myId");
          // loadData (type,data_type,state,pageNum,pageSize)
          this.loadData(type, 2, 0, this.currentPageNum, this.currentPageSize);
          this.loadMutlData(type, 2, 0);
          //this.comparisonData = this.resultData
          //this.initChart2()
        } else if (this.tabChangeName === "tendency") {
          this.initChart3();
        } else {
          var type = $(".orderStatus_head_time button.active").attr("myId");
          this.loadData(type, 1, 0, 0, 0);
        }
        return;

        this.spinShow = true;
        this.noDataText = "";
        var beginDate = moment(this.timeLine[0]).format("YYYY-MM-DD");
        var endDate = moment(this.timeLine[1]).format("YYYY-MM-DD");
        this.axios
          .get("/beefly/orderState/getOrderState", {
            params: {
              accessToken: this.$store.state.token,
              type: 5,
              cityCode: this.$store.state.cityList.toString(),
              beginDate,
              endDate
            }
          })
          .then(res => {
            this.spinShow = false;
            this.noDataText = "暂无数据";
            // 判断是否超时
            this.checkLogin(res);

            var data = res.data.data;
            if (data.length > 0) {
              this.noData = false;
              var newArr = [];
              data.map(item => {
                newArr.push(
                  Object.assign({}, item, { proportion: item.proportion + "%" })
                );
                return newArr;
              });
              this.orderStatusData = newArr;
              // 去掉合计字段集
              data.pop();
              var arr = new Array();
              for (var i in data) {
                arr.push([data[i].orderFlow, Number(data[i].proportion)]);
              }
              // 取掉无关字段
              arr.pop();
              this.chartArr = arr;

              // console.log(this.chartArr)
              this.initChart();
            } else {
              var newArr = [];
              data.map(item => {
                newArr.push(
                  Object.assign({}, item, { proportion: item.proportion + "%" })
                );
                return newArr;
              });
              this.orderStatusData = newArr;
              // 去掉合计字段集
              data.pop();
              var arr = new Array();
              for (var i in data) {
                arr.push([data[i].orderFlow, Number(data[i].proportion)]);
              }
              // 取掉无关字段
              arr.pop();
              this.chartArr = arr;
              $("#container").html("");
              this.chartArr = [];
              this.noData = true;
            }
          })
          .catch(err => {
            this.spinShow = false;
            this.noDataText = "暂无数据";
            console.log(err);
          });
      }
    },
    initChart() {
      var options = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false
        },
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        title: {
          text: "订单状态的构成"
        },
        tooltip: {
          headerFormat: "{series.name}<br>",
          pointFormat: "{point.name}: <b>{point.percentage:.1f}%</b>"
        },
        colors: [
          "#4472c4",
          "#ed7d31",
          "#9999ff",
          "#ffc000",
          "#5b9bd5",
          "#70ad48",
          "#264478",
          "#9e480e",
          "#636363",
          "#997300"
        ],
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: {point.percentage:.1f} %",
              style: {
                color:
                  (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                  "black"
              }
            },
            showInLegend: true
          }
        },
        series: [
          {
            type: "pie",
            name: "不同订单状态的比例",
            data: this.chartArr
          }
        ]
      };

      new Highcharts.chart("container", options);
    },
    initChart2(data, title) {
      var options = {
        chart: {
          type: "column"
        },
        title: {
          text: "订单状态构成--" + title
        },
        subtitle: {
          text: ""
        },
        xAxis: {
          categories: ["人工关闭", "开锁失败", "已取消", "已结束"],
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: ""
          }
        },
        tooltip: {
          headerFormat:
            '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:0f}' +
            (title == "订单数" ? "单" : "%") +
            "</b></td></tr>",
          footerFormat: "</table>",
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: data
      };

      new Highcharts.chart("container2", options);
    },
    initChart3(data) {
      var options = {
        chart: {
          type: "spline"
        },
        title: {
          text: "订单状态构成-趋势"
        },
        subtitle: {
          text: ""
        },
        xAxis: {
          categories: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月"
          ]
        },
        yAxis: {
          title: {
            text: "温度"
          },
          labels: {
            formatter: function() {
              return this.value + "°";
            }
          }
        },
        tooltip: {
          crosshairs: true,
          shared: true
        },
        plotOptions: {
          spline: {
            marker: {
              radius: 4,
              lineColor: "#666666",
              lineWidth: 1
            }
          }
        },
        series:data
      };

      new Highcharts.chart("container3", options);
    },
    cityChange() {
      $("div.select button")
        .removeClass("active")
        .eq(0)
        .trigger("click");
      var type = $(".orderStatus_head_time button.active").attr("myId");
      if (this.tabChangeName == "gather") {
        this.loadData(type, 1);
      } else if (this.tabChangeName == "comparison") {
        this.loadData(type, 2, 0, this.currentPageNum, this.currentPageSize);
        this.loadMutlData(type, 2, 0);
      }
    }
  },
  watch: {
    "$store.state.cityList": "cityChange",
    orderStatusData: {
      handler: function(val, old) {
        this.comparisonData = val;
      },
      deep: true
    },
    orderComparisonData: {
      handler: function(val, old) {
        this.orderComparisonData = val;
        if (this.tabChangeName === "comparison") {
          var data = val;

          var res = data.map(item => {
            var tem = [];
            tem.push(1 * item.closeNum);
            tem.push(1 * item.failNum);
            tem.push(1 * item.cancelNum);
            tem.push(1 * item.endNum);
            return {
              name: item.cityName,
              data: tem
            };
          });
          var res2 = data.map(item => {
            var tem2 = [];
            tem2.push(1 * parseFloat(item.closePercent).toFixed(2));
            tem2.push(1 * parseFloat(item.failPercent).toFixed(2));
            tem2.push(1 * parseFloat(item.cancelPercent).toFixed(2));
            tem2.push(1 * parseFloat(item.endPercent).toFixed(2));
            return {
              name: item.cityName,
              data: tem2
            };
          });
          this.orderCmsData = res;
          this.orderCmsDataRate = res2;
          if (this.chartSelectType == "percentage") {
            this.initChart2(res, "订单数");
          } else {
            this.initChart2(res, "订单数占比");
          }
        }
      },
      deep: true
    },
    chartSelectType: {
      handler: function(n, o) {
        if (n == "percentage") {
          this.initChart2(this.orderCmsData, "订单数");
        } else {
          this.initChart2(this.orderCmsDataRate, "订单数占比");
        }
      },
      deep: true
    }
  }
};
</script>