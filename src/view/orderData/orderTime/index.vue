<template>
    <div id="dateTime_body">
        <Breadcrumb class="Breadcrumb">
            <BreadcrumbItem>订单时长分布</BreadcrumbItem>
        </Breadcrumb>
        <div id="dateTime_head">
            <div class="dateTime_head_time">
                <span>时间:</span>
                <button @click="handleClick" :myId='1'>今日</button>
                <button @click="handleClick" :myId='2'>昨日</button>
                <button class="active" @click="handleClick" :myId='3'>近7日</button>
                <button @click="handleClick" :myId='4'>近30天</button>
                <button @click="handleClick" :myId='5'>指定时间段</button>
            </div>
            <div class="timeSelectShow" v-show="timeSelectShow">
                <DatePicker type="daterange" v-model="timeLine" :options='options' placement="bottom-end" placeholder="选择日期" style="width: 216px; vertical-align: top;"></DatePicker>
                <div class="search">
                    <button class="DIY_button" @click="searchByTimeLine">查询</button>
                </div>
            </div>
            <city-select></city-select>
        </div>
        <div class="table">
            <div class="help">
                <Poptip width="" trigger="hover" style="float: right;" placement="top-end" :title="poptipTitle" :transfer='transfer'>
                    <span>?</span>
                    <div class="content" slot="content">
                        <p>
                            <b>有效订单数:</b>各时长分布对应有效订单数</p>
                        <p><b>有效订单数占比:</b>各时长分布对应有效订单数/有效订单数</p>
                        <p><b>累计有效订单占比:</b>累计到当前时长分布对应有效订单数/全部有效订单数</p>
                        <p>
                            <b>订单金额(￥):</b>各时长分布对应订单金额</p>
                             <p>
                            <b>订单金额占比:</b>各时长分布对应订单金额/订单金额总和</p>
                          <p><b>累计订单金额占比:</b>累计到当前时长分布对应订单金额/订单金额总和</p>
                            <p><b>均单价:</b>订单金额/有效订单数</p>    
                    </div>
                </Poptip>
            </div>
            <div class="loading">
                 <Table :no-data-text="noDataText" border  :columns="columns1" :data="data2"></Table>
                    <Spin fix size="large" v-show="loading"  class="spin">
                        <Icon type="load-c" size=18 class="demo-spin-icon-load" style="color: #ccc;"></Icon>
                        <div style="color: #ccc; text-indent: 5px;">  loading...</div>
                    </Spin>
            </div>
           
        </div>
        <div class="chart">
            <div v-if="citySelectNum.length<2">
                 <div v-show="data2.length>0">
                     <!-- <div>
                        <p class="vaildOrderNum">*数据来自有效订单数</p>
                    </div> -->
                    <div>
                        <chart toolType="单数" type="时长分布" title="订单时长分布--有效订单占比" :xAxis="xAxis" :chartData="chartData" subtitle="*数据来自有效订单数"></chart>
                    </div>
                 </div>
            </div>
            
            <div v-else>
                <div v-show="data3.length>0">
                     <!-- <div>
                        <p class="vaildOrderNum">*地区超过10个时，显示10个地区,数据来自有效订单数</p>
                    </div> -->
                    <div>
                        <chart-more toolType="单数" type="时长分布" title="分地区订单时长分布--有效订单占比" :xAxis="xAxis" :chartData="chartData" subtitle=""></chart-more>
                    </div>
                </div>
               
            </div>
           
        </div>
    </div>
</template>
<style lang='scss' scoped type="text/css">
div.loading {
  position: relative;
  .spin {
    position: absolute;
    display: inline-block;
    // background-color: rgba(253, 248, 248,0.0);
    background-color: rgba(255, 255, 255, 0.8);
  }
  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
    color: #ccc;
  }
  div.load-text {
    color: #ccc;
  }
}
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
    padding-top: 3px;
  }
  div.help {
    width: 100%;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    span {
      display: inline-block;
      width: 18px;
      height: 18px;
      line-height: 18px;
      background: orange;
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
import citySelect from "../../../components/citySelect.vue";
import { siblings, randomColor } from "../../../util/util.js";
import chart from "../../../components/DataTimeChart/index.vue";
import chartMore from "../../../components/DataTimeChart/index2.vue";
export default {
  components: {
    "city-select": citySelect,
    chart,
    chartMore
  },
  data() {
    return {
      noDataText:'',
      loading: true,
      citySelectNum: [],
      columns1: [
        {
          renderHeader:(h)=>{
            return h('div',[
                h('div','时长分布'),
                h('span','(min)')
            ])
          },
          key: "duration"
        },
        {
          title: "有效订单数",
          key: "orderNum",
          render: function(h, params) {
            return h("div", new Number(params.row.orderNum).thousand());
          }
        },
        {
          title: "有效订单占比",
          key: "orderNumProportion",
          render: function(h, params) {
            return h(
              "div",
              parseFloat(params.row.orderNumProportion).toFixed(1) + "%"
            );
          }
        },
         {
          title: "累计有效订单占比",
          key: "orderNumAccuProp",
          render: function(h, params) {
            return h(
              "div",
            parseFloat(params.row.orderNumAccuProp).toFixed(1) + "%"
            );
          }
        },
        {
          renderHeader:(h)=>{
            return h('div',[
                h('div','订单金额'),
                h('span','￥')
            ])
          },
          key: "orderAmount",
          renderHeader: function(h) {
            return h("div", "订单金额（￥）");
          },
          render: function(h, params) {
            return h(
              "div",
              new Number(params.row.orderAmount).thousandFormat()
            );
          }
        },
        {
          title: "订单金额占比",
          key: "orderAmountProportion",
          render: function(h, params) {
            return h(
              "div",
               parseFloat(params.row.orderAmountProportion).toFixed(1) + "%"
            
            );
          }
        },
        {
          title: "累计订单金额占比",
          key: "orderAmountAccuProp",
          render: function(h, params) {
            return h(
              "div",
               parseFloat(params.row.orderAmountAccuProp).toFixed(1) + "%"
            
            );
          }
        },
         {
          title: "均单价",
          key: "avgUnitPrice",
          render: function(h, params) {
            return h(
              "div",
            params.row.avgUnitPrice
            );
          }
        }
      ],
      data2: [],
      data3: [],
      timeSelectShow: false,
      timeLine: ["", ""],
      page: {
        float: "right",
        "margin-top": "20px"
      },
      chartTitleName: "有效订单数",
      totalTitle: true,
      ellipsis: true,
      poptipTitle: "数据项说明",
      options: {
          disabledDate(date) {
              return date&&date.valueOf()> Date.now() - 86400000
          }
      },
      transfer: true
    };
  },
  created: function() {
    // 发起ajax请求 默认 是全部地区（cityCode= 0） 近 7天的数据
     var cityList = JSON.parse(window.localStorage.getItem('cityList'));
     var cityCode
    if(cityList.length==1){
      cityCode = cityList.map((list)=>{return list.code}).join()
    }else{
      cityCode = this.$store.state.cityList.join();
    }
    this.loadData(3, cityCode);
   
  },
  computed: {
    xAxis: function() {
      if (this.citySelectNum.length < 2) {
        var data = [...this.data2];
        data.pop();
        return data.map(item => item.duration);
      } else {
        return this.citySelectNum;
      }
    },
    chartData: function() {
      if (this.citySelectNum.length < 2) {
        var data = [...this.data2];
        data.pop();
        return data.map(item => {
          console.log(item.orderNumProportion)
          return { color: randomColor(), y: item.orderNumProportion };
        });
      } else {
        var data = [...this.data3];
        return data;
      }
    }
  },

  mounted() {
    this.$store.dispatch("menuActiveName", "/index/orderTime");
    document.title = "订单数据 - 订单时长分布";
  },
  methods: {
    generatArray(len) {
      var arr = [];
      for (var i = 0; i < len; i++) {
        arr[i] = Math.floor(100 * (Math.random() + 1));
      }
      return arr;
    },
    loadData(type, cityCode, beginDate, endDate) {
      this.noDataText = ''
      // 默认请求
      this.loading = true;
      this.axios
        .get("/beefly/orderDuration/getOrderDuration", {
          params: {
            cityCode: cityCode,
            type: type,
            accessToken: this.$store.state.token,
            beginDate: beginDate,
            endDate: endDate
          }
        })
        .then(res => {
          this.checkLogin(res)
          var data = res.data.data;
          if (Object.prototype.toString.call(data) != "[object Array]") {
            this.data2 = [];
            this.loading = false;
            this.noDataText = '暂无数据'
            return;
          }
          if (data.length == 0) {
            this.data2 = [];
            this.noDataText = '暂无数据'
            this.loading = false;
            return;
          }
          this.loading = false;
          this.data2 = data.map(list => {
            return {
              duration: list.duration,
              orderAmount: parseFloat(list.orderAmount),
              orderAmountProportion: parseFloat(list.orderAmountProportion),
              orderNum: parseFloat(list.orderNum),
              orderNumProportion:1*(list.orderNumProportion),
              orderNumAccuProp:list.orderNumAccuProp,
             orderAmountAccuProp:list.orderAmountAccuProp,
             avgUnitPrice:list.avgUnitPrice
            };
          });
        })
        .catch(err => {
          console.log(err);
          this.noDataText = '暂无数据'
          this.loading = false;
        });
    },
    loadMultData(type, cityCode, beginDate, endDate) {
      // 默认请求
      this.axios
        .get("/beefly/orderDuration/getStackNumber", {
          params: {
            cityCode: cityCode,
            type: type,
            accessToken: this.$store.state.token,
            beginDate: beginDate,
            endDate: endDate
          }
        })
        .then(res => {
          this.checkLogin(res)
          var data = res.data.data;
          if (Object.prototype.toString.call(data) != "[object Array]") {
            this.data3 = [];
            return;
          }
          if (data.length == 0) {
            this.data3 = [];
            return;
          }
          var zeroStart = [];
          var oneStart = [];
          var twoStart = [];
          var threeStart = [];
          var fiveStart = [];
          var tenStart = [];
          var genThirty = [];
          var recodeCity = [];
          var genSixty = [];
          data.map(list => {
            zeroStart.push(100*parseFloat(list.zeroToFiveCountProp));
            oneStart.push(100*parseFloat(list.fiveToTenCountProp));
            twoStart.push(100*parseFloat(list.tenToFifCountProp));
            threeStart.push(100*parseFloat(list.fifToTwentyCountProp));
            fiveStart.push(100*parseFloat(list.tweToTweFiveCountProp));
            tenStart.push(100*parseFloat(list.tweFiveToThiCountProp));
            genThirty.push(100*parseFloat(list.thiToSixtyCountProp));
            genSixty.push(100*parseFloat(list.gtSixtyCountProp));
            recodeCity.push(list.cityName);
          });
          this.citySelectNum = recodeCity;
          this.data3 = [
            {
              name: "0-5",
              data: zeroStart
            },
            {
              name: "5-10",
              data: oneStart
            },
            {
              name: "10-15",
              data: twoStart
            },
            {
              name: "15-20",
              data: threeStart
            },
            {
              name: "20-25",
              data: fiveStart
            },
            {
              name: "25-30",
              data: tenStart
            },
            {
              name: "30-60",
              data: genThirty
            },
            {
              name: "60以上",
              data: genSixty
            }
          ];
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleClick(e) {
      if(this.loading==true){
        return
      }
      this.current = 1;
      var elems = siblings(e.target);
      for (var i = 0; i < elems.length; i++) {
        elems[i].setAttribute("class", "");
      }
      e.target.setAttribute("class", "active");
      if (e.target.innerHTML === "指定时间段") {
        this.timeSelectShow = true;
        return;
      } else {
        this.timeSelectShow = false;
        this.timeLine = ["", ""];
      }
      if (this.citySelectNum.length < 2) {
         if(this.citySelectNum.length==0){
           this.data2 = []
           this.data3 = []
           return;
         }
         var cityList = JSON.parse(window.localStorage.getItem('cityList'));
          var cityCode
          if(cityList.length==1){
            cityCode = cityList.map((list)=>{return list.code}).join()
          }else{
            cityCode = this.$store.state.cityList.join();
          }
        var type = $("button.active").attr("myid");
        var beginDate = this.timeLine[0]
          ? moment(this.timeLine[0]).format("YYYY-MM-DD")
          : "";
        var endDate = this.timeLine[1]
          ? moment(this.timeLine[1]).format("YYYY-MM-DD")
          : "";
        this.loadData(type, cityCode, beginDate, endDate);
      } else {
         var cityList = JSON.parse(window.localStorage.getItem('cityList'));
          var cityCode
          if(cityList.lengt==1){
            cityCode = cityList.map((list)=>{return list.code}).join()
          }else{
            cityCode = this.$store.state.cityList.join();
          }
        var type = $("button.active").attr("myid");
        var beginDate = this.timeLine[0]
          ? moment(this.timeLine[0]).format("YYYY-MM-DD")
          : "";
        var endDate = this.timeLine[1]
          ? moment(this.timeLine[1]).format("YYYY-MM-DD")
          : "";
        this.loadData(type, cityCode, beginDate, endDate);
        this.loadMultData(type, cityCode, beginDate, endDate);
      }
    },
    searchByTimeLine() {
      if($(".search button").attr("disabled")=='disabled'){
          return
      }
      if (this.timeLine[0] === "" || this.timeLine[0] === null) {
        this.$Message.warning("请选择时间段");
          $(".search button").attr("disabled","disabled")
          setTimeout(function(){
              $(".search button").attr("disabled",false)
          },1500)
      } else {
        if (this.citySelectNum.length < 2) {
          if(this.citySelectNum.length==0){
            return;
          }
          var cityList = JSON.parse(window.localStorage.getItem('cityList'));
          var cityCode
          if(cityList.length==1){
            cityCode = cityList.map((list)=>{return list.code}).join()
          }else{
            cityCode = this.$store.state.cityList.join();
          }
          var type = $("button.active").attr("myid");
          var beginDate = this.timeLine[0]
            ? moment(this.timeLine[0]).format("YYYY-MM-DD")
            : "";
          var endDate = this.timeLine[1]
            ? moment(this.timeLine[1]).format("YYYY-MM-DD")
            : "";
          this.loadData(type, cityCode, beginDate, endDate);
        } else {
           var cityList = JSON.parse(window.localStorage.getItem('cityList'));
          var cityCode
          if(cityList.length==1){
            cityCode = cityList.map((list)=>{return list.code}).join()
          }else{
            cityCode = this.$store.state.cityList.join();
          }
          var type = $("button.active").attr("myid");
          var beginDate = this.timeLine[0]
            ? moment(this.timeLine[0]).format("YYYY-MM-DD")
            : "";
          var endDate = this.timeLine[1]
            ? moment(this.timeLine[1]).format("YYYY-MM-DD")
            : "";
          this.loadData(type, cityCode, beginDate, endDate);
          this.loadMultData(type, cityCode, beginDate, endDate);
        }
      }
    },
    cityChange() {
      this.current = 1;
      var res = this.$store.state.keepCitys.map(item => {
        if (this.$store.state.cityList.indexOf(item.code) != -1) {
          return item.name;
        }
      });
      this.citySelectNum = res.filter(item => {
        return item !== undefined;
      });
      if (this.citySelectNum.length < 2) {
        if(this.citySelectNum.length==0){
          this.data2 = []
          this.data3 = []
          this.noDataText = "请至少选择一个城市";
          return;
        }
        //发送请求
        var cityCode = this.$store.state.cityList.join();
        var type = "";
        type = $("button.active").attr("myid");
        var beginDate = this.timeLine[0]
          ? moment(this.timeLine[0]).format("YYYY-MM-DD")
          : "";
        var endDate = this.timeLine[1]
          ? moment(this.timeLine[1]).format("YYYY-MM-DD")
          : "";
        this.loadData(type, cityCode, beginDate, endDate);
      } else {
        var cityCode = this.$store.state.cityList.join();
        var type = "";
        type = $("button.active").attr("myid");
        var beginDate = this.timeLine[0]
          ? moment(this.timeLine[0]).format("YYYY-MM-DD")
          : "";
        var endDate = this.timeLine[1]
          ? moment(this.timeLine[1]).format("YYYY-MM-DD")
          : "";
        this.loadData(type, cityCode, beginDate, endDate);
        this.loadMultData(type, cityCode, beginDate, endDate);
        }
    },
    checkLogin (res) {
        if (res.data.message === '用户登录超时') {
            this.$router.push('/login')
        }
    }
  },
  watch: {
    "$store.state.cityList": "cityChange"
  }
};
</script>
