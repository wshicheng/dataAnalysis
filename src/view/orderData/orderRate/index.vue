<template>
    <div id="dateTime_body">
        <Breadcrumb class="Breadcrumb">
            <BreadcrumbItem>使用频次分布</BreadcrumbItem>
        </Breadcrumb>
        <div id="dateTime_head">
            <div class="dateTime_head_time">
                <span>时间:</span>
                <button @click="handleClick" :myId='1'>今日</button>
                <button @click="handleClick" :myId='2'>昨日</button>
                <button class="active" @click="handleClick" :myId='3'>近7日</button>
                <button @click="handleClick" :myId='4'>近30天</button>
                <!-- <button @click="handleClick" :myId='5'>指定时间段</button> -->
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
                <Poptip trigger="hover" style="float: right;" placement="top-end" :title="poptipTitle" :transfer='transfer'>
                    <span>?</span>
                   <div class="content" slot="content">
                        <p>
                            <b>用户数:</b>有效订单数中日均单为该使用频次的用户数</p>
                        <p>
                            <b>用户数占比:</b>用户数/有效订单数中所有用户</p>
                         <p><b>有效订单数:</b>各使用频次的有效订单数</p>    
                         <p><b>有效订单数占比:</b>各使用频次的有效订单数/全部有效订单数</p> 
                         <p><b>订单金额:</b>各使用频次的有效订单金额</p>     
                           <p><b>订单金额占比:</b>各使用频次的有效订单金额/订单金额总和</p>     
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
        <div class="orderRate_chart" v-show="noDataBox">
              <Spin fix size="large" v-if="spinShow"  class="spin">
                  <Icon type="load-c" size=18 class="demo-spin-icon-load" style="color: #ccc;"></Icon>
                  <div style="color: #ccc; text-indent: 5px;">  loading...</div>
              </Spin>
             <div class="select">
                <button class="active" @click="chartType" myType='percentage'>用户数占比</button>
                <button @click="chartType" myType='orderCountRate'>订单数占比</button>
                <button @click="chartType" myType='amountRate'>订单金额占比</button>
            </div>
             <div class="chart">

          
            <div v-if="citySelectNum.length<2">
                 <div v-show="data2.length>0">
                     <div>
                        <!-- <p class="vaildOrderNum">*数据来自有效订单数</p> -->
                    </div>
                    <div>
                        <chart v-bind:toolType="toolType" type="频次分布" title="使用频次分布" :xAxis="xAxis" :chartData="chartData" :subtitle="'*数据来自'+toolType"></chart>
                    </div>
                 </div>
            </div>
            
            <div v-else>
                <div v-show="data3.length>0">
                     <!-- <div>
                        <p class="vaildOrderNum">*地区超过10个时，显示10个地区,</p>
                    </div> -->
                    <div>
                        <chart-more v-bind:toolType="toolType" type="频次分布" title="分地区使用频次分布" :xAxis="xAxis" :chartData="chartData" :subtitle="'*数据来自'+toolType"></chart-more>
                    </div>
                </div>
               
            </div>
           
        </div>
        </div>
       
    </div>
</template>
<style lang='scss' scoped type="text/css">
div.orderRate_chart{
            margin-top: 20px;
            padding: 10px;
            background: #fff;
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
                  height: 30px;
                  line-height: 30px;
                  text-align: center;
                  border-radius: inherit;
                  border: none;
                  font-size: 14px;
                  margin-right: 10px;
                  font-weight: bolder;
                  outline: none;
                  background: #fff;
                  cursor: pointer;
              }
              button.active {
                  border-bottom: 3px solid blue;
              }
          }
}

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
      frequency:[],
      cityName:[],
      spinShow:false,
      noDataBox:false,
      chartSelectType:'',
      toolType:'',
      percentage:[],
      orderCountRate:[],
      amountRate:[],
      noDataText: "",
      loading: true,
      citySelectNum: [],
      columns1: [
        {
          title: "次数",
          key: "time"
        },
        {
          title: "用户数",
          key: "userCont"
        },
        {
          title: "用户数占比",
          key: "percentage"
        },
        {
          title: "订单数",
          key: "orderCount"
        },
        {
          title: "订单数占比",
          key: "orderCountRate"
        },
        {
          title: "订单金额",
          key: "amount"
        },
        {
          title: "订单金额占比",
          key: "amountRate"
        },
         {
          title: "均单价",
          key: "averagePrice"
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
    var cityList = JSON.parse(window.localStorage.getItem("cityList"));
    var cityCode;
    if (cityList.length == 1) {
      cityCode = cityList
        .map(list => {
          return list.code;
        })
        .join();
    } else {
      cityCode = this.$store.state.cityList.join();
    }
    this.loadData(3, cityCode);
  },
  computed: {
    xAxis: function() {
      if (this.citySelectNum.length < 2) {
        var data = [...this.data2];
        data.pop();
        return data.map(item => item.time);
      } else {
        return this.cityName;
      }
    },
    chartData: function() {
      if (this.citySelectNum.length < 2) {
        var data = [...this.data2];
        data.pop();
        var type = $('.select button.active').attr('mytype')

        this.chartSelectType = type
        if(this.chartSelectType=='percentage'){
           return data.map(item => {
            return { color: randomColor(), y: 1*parseFloat(item.percentage).toFixed(2) };
          });
        }
          if(this.chartSelectType=='orderCountRate'){
           return data.map(item => {
            return { color: randomColor(), y: 1*parseFloat(item.orderCountRate).toFixed(2) };
          });
        }
          if(this.chartSelectType=='amountRate'){
           return data.map(item => {
            return { color: randomColor(), y: 1*parseFloat(item.amountRate).toFixed(2) };
          });
        }
       
        // var newArr = []
        // newArr.push({
        //   color: '#4472c4',
        //   y: data[0].userCont
        // })
        // newArr.push({
        //   color: '#ed7d31',
        //   y: data[1].userCont
        // })
        // newArr.push({
        //   color: '#9999ff',
        //   y: data[2].userCont
        // })
        // newArr.push({
        //   color: '#ffc000',
        //   y: data[3].userCont
        // })
        // newArr.push({
        //   color: '#5b9bd5',
        //   y: data[4].userCont
        // })
        // newArr.push({
        //   color: '#70ad48',
        //   y: data[5].userCont
        // })

        // return newArr
      } else {
        var data = [...this.data3];
        return data;
      }
    }
  },

  mounted() {
   
    this.$store.dispatch("menuActiveName", "/index/orderRate");
    document.title = "订单数据 - 使用频次分布";
  },
  methods: {
     chartType (e) {
        var elems = siblings(e.target)
        for (var i = 0; i < elems.length; i++) {
            elems[i].setAttribute('class', '')
        }
        e.target.setAttribute('class', 'active')
        this.chartSelectType =  e.target.getAttribute('myType')
        //this.initChart($(".select button.active").attr('myType'))
    },
    generatArray(len) {
      var arr = [];
      for (var i = 0; i < len; i++) {
        arr[i] = Math.floor(100 * (Math.random() + 1));
      }
      return arr;
    },
    loadData(type, cityCode, beginDate, endDate) {
      this.noDataBox = true
      this.spinShow = true
      this.noDataText = "";
      // 默认请求
      this.loading = true;
      this.axios
        .get("/beefly/Frequency/getOrderFrequency", {
          params: {
            graphicsType: 1,
            cityCode: cityCode,
            type: type,
            accessToken: this.$store.state.token,
            beginDate: beginDate,
            endDate: endDate
          }
        })
        .then(res => {
          this.spinShow = false
          this.checkLogin(res)
          this.loading = false;
          var data = res.data.data;
          if (Object.prototype.toString.call(data) != "[object Array]") {
            this.data2 = [];
            this.noDataBox = false
            this.noDataText = "暂无数据";
            return;
          }
          if (data.length == 0) {
            this.data2 = [];
            this.noDataBox = false;
            this.noDataText = "暂无数据";
            return;
          }
          this.data2 = data.map((item)=>{
            return {
                    time:item.frequency,
                    userCont:item.userCont,
                    percentage:item.percentage,
                    orderCount:item.orderCount,
                    orderCountRate:item.orderCountRate,
                    amount:item.amount,
                    amountRate:item.amountRate,
                    averagePrice:item.averagePrice
                   }
          })
        
        })
        .catch(err => {
          console.log(err);
          this.noDataText = "暂无数据";
          this.loading = false;
        });
    },
    loadMultData(type, cityCode, beginDate, endDate) {
      this.noDataBox = true
      this.spinShow = true;
      var that = this;
      // 默认请求
      this.axios
        .get("/beefly/Frequency/getOrderFrequency", {
          params: {
            graphicsType: 2,
            cityCode: cityCode,
            type: type,
            accessToken: this.$store.state.token,
            beginDate: beginDate,
            endDate: endDate
          }
        })
        .then(res => {
          this.spinShow = false
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
         
          data.map((list,index) => {
            list.pop()
           if(index==0){
            list.map((item)=>{
              that.frequency.push(item.frequency)
            })
           }
           that.cityName.push(list[0].cityName)
          });
          var percentage = []
          var orderCountRate = []
          var amountRate = []
          for(var i=0;i<that.frequency.length;i++){
            data.map((list)=>{
              list.map((item)=>{
                if(item.frequency==that.frequency[i]){
                 percentage.push(1*parseFloat(item.percentage).toFixed(2))
                 orderCountRate.push(1*parseFloat(item.orderCountRate).toFixed(2))
                 amountRate.push(1*parseFloat(item.amountRate).toFixed(2))
                }
              })
            })
          }
          var _percentage = []
          var _orderCountRate = []
          var _amountRate = []
         for(var i=0;i<percentage.length;i+=that.cityName.length){
          _percentage.push(percentage.slice(i,i+that.cityName.length))
          _orderCountRate.push(orderCountRate.slice(i,i+that.cityName.length))
          _amountRate.push(amountRate.slice(i,i+that.cityName.length))
         }
         this.percentage = _percentage.map((list,index)=>{
           return {name:that.frequency[index],data:list}
         })
         this.orderCountRate = _orderCountRate.map((list,index)=>{
           return {name:that.frequency[index],data:list}
         })
          this.amountRate = _amountRate.map((list,index)=>{
           return {name:that.frequency[index],data:list}
         })
        
         $('div.select button').removeClass('active').eq(0).trigger('click')
          this.noDataBox = true;
          return;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleClick(e) {
       $('.select button').removeClass('active')
       $('.select button').eq(0).addClass('active')
        this.amountRate = []
        this.percentage = []
        this.orderCountRate = []
        this.cityName = []
        this.frequency = []
        this.chartSelectType = ''
        this.toolType = '用户数占比'
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
          this.amountRate = []
          this.percentage = []
          this.orderCountRate = []
          this.cityName = []
          this.frequency = []
          return;

        }
        var cityList = JSON.parse(window.localStorage.getItem("cityList"));
        var cityCode;
        if (cityList.length == 1) {
          cityCode = cityList
            .map(list => {
              return list.code;
            })
            .join();
        } else {
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
        var cityList = JSON.parse(window.localStorage.getItem("cityList"));
        var cityCode;
        if (cityList.length == 1) {
          cityCode = cityList
            .map(list => {
              return list.code;
            })
            .join();
        } else {
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
      if (this.timeLine[0] === "" || this.timeLine[0] === null) {
        this.$Message.warning("请选择时间段");
      } else {
        if (this.citySelectNum.length < 2) {
          var cityList = JSON.parse(window.localStorage.getItem("cityList"));
          var cityCode;
          if (cityList.length == 1) {
            cityCode = cityList
              .map(list => {
                return list.code;
              })
              .join();
          } else {
            cityCode = this.$store.state.cityList.join();
          }
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
          var cityList = JSON.parse(window.localStorage.getItem("cityList"));
          var cityCode;
          if (cityList.length == 1) {
            cityCode = cityList
              .map(list => {
                return list.code;
              })
              .join();
          } else {
            cityCode = this.$store.state.cityList.join();
          }
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
      }
    },
    cityChange() {
       this.chartSelectType = ''
       this.toolType = '用户数占比'
        this.data2 = []
        this.data3 = []
        this.amountRate = []
        this.percentage = []
        this.orderCountRate = []
        this.cityName = []
        this.frequency = []
      $('.select button').removeClass('active')
       $('.select button').eq(0).addClass('active')
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
          this.noDataBox = false;
          this.spinShow = false;
          this.amountRate = []
          this.percentage = []
          this.orderCountRate = []
          this.cityName = []
          return;
        }
        //发送请求
        var cityCode = this.$store.state.cityList.join();
        var type = "";
        if (this.timeSelectShow == true) {
          type = "";
        } else {
          type = $("button.active").attr("myid");
        }
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
        if (this.timeSelectShow == true) {
          type = "";
        } else {
          type = $("button.active").attr("myid");
        }
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
    "$store.state.cityList": "cityChange",
    'chartSelectType':{
      handler:function(n,o){
        if(n=='percentage'){
          
            this.data3 = this.percentage
            this.toolType = '用户数占比'
          
          }
          if(n=='orderCountRate'){
            this.data3 = this.orderCountRate
            this.toolType = '订单数占比'
              
          }
          if(n=='amountRate'){
            this.data3 = this.amountRate
            this.toolType = '订单金额占比'
            
          }
        
      },
      deep:true
    }
  }
};
</script>
