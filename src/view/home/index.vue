<template>
  <Row>
    <Row class="block user">
      <h4>今日用户</h4>
      <Col span="6">
      <div class="container">
        <div class="item">
          <span class="title">新增用户</span>
          <span class="num">2346</span>
        </div>
        <div class="compare">
          <i class="iconfont icon-tubiao101 "></i>
          <i class="compare">较昨日：</i>
          <span class="compare">+300.00</span>
        </div>
      </div>
      </Col>
      <Col span="6">
      <div class="container">
        <div class="item">
          <span class="title">充值用户</span>
          <span class="num">2346</span>
        </div>
        <div class="compare">
          <i class="iconfont icon-tubiao106 "></i>
          <i class="compare">较昨日：</i>
          <span class="compare">-300.00</span>
        </div>
      </div>
      </Col>
      <Col span="6">
      <div class="container">
        <div class="item">
          <span class="title">活跃用户</span>
          <span class="num">2346</span>
        </div>
        <div class="compare">
          <i class="iconfont icon-tubiao101 "></i>
          <i class="compare">较昨日：</i>
          <span class="compare">+300.00</span>
        </div>
      </div>
      </Col>
      <Col span="6">
      <div class="container">
        <div class="item">
          <span class="title">截止当前总用户</span>
          <span class="num">2346</span>
        </div>
        <!-- <div class="compare">
                <i class="iconfont icon-tubiao101 "></i><i class="compare">较昨日：</i><span class="compare">+300.00</span>
              </div> -->
      </div>
      </Col>
    </Row>
    <Row class="block order">
      <h4>今日订单
        <i class="iconfont icon-gengduo"></i>
      </h4>
      <Col span="6">
      <div class="container">
        <div class="item">
          <span class="title">订单数</span>
          <span class="num">2346</span>
        </div>
      </div>
      </Col>
      <Col span="6">
      <div class="container">
        <div class="item">
          <span class="title">订单金额</span>
          <span class="num">2346</span>
        </div>
      </div>
      </Col>
      <Col span="6">
      <div class="container">
        <div class="item">
          <span class="title">实收率</span>
          <span class="num">23%</span>
        </div>
      </div>
      </Col>
      <Col span="6">
      <div class="container">
        <div class="item">
          <span class="title">投产率</span>
          <span class="num">23%</span>
        </div>
      </div>
      </Col>
    </Row>
    <Row class="block bk-chart">
      <Row class="charts">
        <Col span="10">
        <Row>
          <div class="leftChart">
            <h4>车辆运营状态分布</h4>
            <vehicle-operateState></vehicle-operateState>
          </div>
          <div class="rightChartInfo">
            <div class="car-user user-active">
              <div class="status">
                <span class="disc"></span>
                <span class="status">运营中</span>
              </div>
              <div class="num">
                <span class="num">车辆数</span>
                <i>14,000,213</i>
              </div>
            </div>
            <div class="car-user no-user-active">
              <div class="status">
                <span class="disc"></span>
                <span class="status">非运营</span>
              </div>
              <div class="num">
                <span class="num">车辆数</span>
                <i>1,213</i>
              </div>
            </div>
          </div>
        </Row>
        </Col>
        <Col span="10">
        <div class="leftChart">
          <h4>车辆状态分布</h4>
          <vehicle-State></vehicle-State>
        </div>
        <div class="rightChartInfo">
          <div class="car-distribution use-state">
            <ul>
              <li>
                <span class="colorBlock"></span>
                <span class="tex">带出租</span>
              </li>
              <li>
                <span class="colorBlock"></span>
                <span class="tex">已预定</span>
              </li>
              <li>
                <span class="colorBlock"></span>
                <span class="tex">已出租</span>
              </li>
              <li>
                <span class="colorBlock"></span>
                <span class="tex">维护中</span>
              </li>
              <li>
                <span class="colorBlock"></span>
                <span class="tex">寻车中</span>
              </li>
              <li>
                <span class="colorBlock"></span>
                <span class="tex">已丢失</span>
              </li>
              <li>
                <span class="colorBlock"></span>
                <span class="tex">已下线</span>
              </li>
            </ul>
          </div>
          <div class="car-distribution no-use-state">
            <ul>
              <li>
                <span class="colorBlock"></span>
                <span class="tex">库存中</span>
              </li>
              <li>
                <span class="colorBlock"></span>
                <span class="tex">待上线</span>
              </li>
              <li>
                <span class="colorBlock"></span>
                <span class="tex">返修中</span>
              </li>
              <li>
                <span class="colorBlock"></span>
                <span class="tex">已报废</span>
              </li>
              <li>
                <span class="colorBlock"></span>
                <span class="tex">已下线</span>
              </li>
            </ul>
          </div>
        </div>
        </Col>
      </Row>
    </Row>
    <Row class="block">
      <Row>
        <h4>测试导入excel</h4>
        <Button type="primary" @click="uploadFile">导入excel</Button>
        <Button type="error" @click="downloadFile(excelData)">导出excel</Button>
        <input type="file" @change="importFile(this)" id="imFile" style="display: none" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
        <a id="downlink"></a>
        <Table :columns="columns1" :data="data1"></Table>
     </Row>
    </Row>
  </Row>
</template>
<script>
import vehicleOperatStateDistribute from '../../components/Vehicle-operating-state-distribution/index.vue'
import vehicleState from '../../components/Vehicle-state-distribution/index.vue'
var XLSX = require('xlsx')
export default {
  components: {
    'vehicle-operateState': vehicleOperatStateDistribute,
    'vehicle-State': vehicleState
  },
  data() {
    return {
      columns1:[
        {
          title: '品名',
          key: 'name'
        },
        {
          title: '大小',
          key: 'size'
        },
        {
          title:'味道',
          key:'taste'
        },
        {
          title: '价格',
          key: 'price'
        },
         {
          title: '剩余',
          key: 'remain'
        }
      ],
       data1: [
         {
          name: '红烧鱼', size: '大', taste: '微辣', price: '40', remain: '100'
        },
        {
          name: '麻辣小龙虾', size: '大', taste: '麻辣', price: '138', remain: '200'
        },
        {
          name: '清蒸小龙虾', size: '大', taste: '清淡', price: '138', remain: '200'
        },
        {
          name: '香辣小龙虾', size: '大', taste: '特辣', price: '138', remain: '200'
        },
        {
          name: '十三香小龙虾', size: '大', taste: '中辣', price: '138', remain: '108'
        },
        {
          name: '蒜蓉小龙虾', size: '大', taste: '中辣', price: '138', remain: '100'
        },
        {
          name: '凉拌牛肉', size: '中', taste: '中辣', price: '48', remain: '60'
        },
        {
          name: '虾仁寿司', size: '大', taste: '清淡', price: '29', remain: '无限'
        },
        {
          name: '海苔寿司', size: '大', taste: '微辣', price: '26', remain: '无限'
        },
        {
          name: '金针菇寿司', size: '大', taste: '清淡', price: '23', remain: '无限'
        },
        {
          name: '泡菜寿司', size: '大', taste: '微辣', price: '24', remain: '无限'
        },
        {
          name: '鳗鱼寿司', size: '大', taste: '清淡', price: '28', remain: '无限'
        },
        {
          name: '肉松寿司', size: '大', taste: '清淡', price: '22', remain: '无限'
        },
        {
          name: '三文鱼寿司', size: '大', taste: '清淡', price: '30', remain: '无限'
        },
        {
          name: '蛋黄寿司', size: '大', taste: '清淡', price: '20', remain: '无限'
        }
      ],
      imFile: '',//导入文件el
      outFile: '',//导出文件el
      excelData: [  // 测试数据
        {
          name: '红烧鱼', size: '大', taste: '微辣', price: '40', remain: '100'
        },
        {
          name: '麻辣小龙虾', size: '大', taste: '麻辣', price: '138', remain: '200'
        },
        {
          name: '清蒸小龙虾', size: '大', taste: '清淡', price: '138', remain: '200'
        },
        {
          name: '香辣小龙虾', size: '大', taste: '特辣', price: '138', remain: '200'
        },
        {
          name: '十三香小龙虾', size: '大', taste: '中辣', price: '138', remain: '108'
        },
        {
          name: '蒜蓉小龙虾', size: '大', taste: '中辣', price: '138', remain: '100'
        },
        {
          name: '凉拌牛肉', size: '中', taste: '中辣', price: '48', remain: '60'
        },
        {
          name: '虾仁寿司', size: '大', taste: '清淡', price: '29', remain: '无限'
        },
        {
          name: '海苔寿司', size: '大', taste: '微辣', price: '26', remain: '无限'
        },
        {
          name: '金针菇寿司', size: '大', taste: '清淡', price: '23', remain: '无限'
        },
        {
          name: '泡菜寿司', size: '大', taste: '微辣', price: '24', remain: '无限'
        },
        {
          name: '鳗鱼寿司', size: '大', taste: '清淡', price: '28', remain: '无限'
        },
        {
          name: '肉松寿司', size: '大', taste: '清淡', price: '22', remain: '无限'
        },
        {
          name: '三文鱼寿司', size: '大', taste: '清淡', price: '30', remain: '无限'
        },
        {
          name: '蛋黄寿司', size: '大', taste: '清淡', price: '20', remain: '无限'
        }
      ]
    }
  },
  methods:{
    uploadFile: function () { // 点击导入按钮
      this.imFile.click()
    },
    downloadFile: function(rs) { // 点击导出按钮
      let data = [{}]
      for (let k in rs[0]) {
        data[0][k] = k
      }
      data = data.concat(rs)
      this.downloadExl(data, '菜单')
    },
    importFile: function() { // 导入excel
      let obj = this.imFile
      if (!obj.files) {
        return
      }
      var f = obj.files[0]
      var reader = new FileReader()
      let $t = this
      reader.onload = function(e) {
        var data = e.target.result
        if ($t.rABS) {
          $t.wb = XLSX.read(btoa(this.fixdata(data)), {  // 手动转化
            type: 'base64'
          })
        } else {
          $t.wb = XLSX.read(data, {
            type: 'binary'
          })
        }
        let json = XLSX.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[0]])
        console.log(typeof json)
        $t.dealFile($t.analyzeData(json)) // analyzeData: 解析导入数据
      }
      if (this.rABS) {
        reader.readAsArrayBuffer(f)
      } else {
        reader.readAsBinaryString(f)
      }
    },
    downloadExl: function(json, downName, type) {  // 导出到excel
      let keyMap = [] // 获取键
      for (let k in json[0]) {
        keyMap.push(k)
      }
      console.info('keyMap', keyMap, json)
      let tmpdata = [] // 用来保存转换好的json
      json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
        v: v[k],
        position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
      }))).reduce((prev, next) => prev.concat(next)).forEach(function(v) {
        tmpdata[v.position] = {
          v: v.v
        }
      })
      let outputPos = Object.keys(tmpdata)  // 设置区域,比如表格从A1到D10
      let tmpWB = {
        SheetNames: ['mySheet'], // 保存的表标题
        Sheets: {
          'mySheet': Object.assign({},
            tmpdata, // 内容
            {
              '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
            })
        }
      }
      let tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB,
        { bookType: (type === undefined ? 'xlsx' : type), bookSST: false, type: 'binary' } // 这里的数据是用来定义导出的格式类型
      ))], {
          type: ''
        })  // 创建二进制对象写入转换好的字节流
      var href = URL.createObjectURL(tmpDown)  // 创建对象超链接
      this.outFile.download = downName + '.xlsx'  // 下载名称
      this.outFile.href = href  // 绑定a标签
      this.outFile.click()  // 模拟点击实现下载
      setTimeout(function() {  // 延时释放
        URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
      }, 100)
    },
    analyzeData: function(data) {  // 此处可以解析导入数据
      console.log('开始导入数据')
      console.log(data)
      return data
    },
    dealFile: function(data) {   // 处理导入的数据
      console.log(data)
      this.imFile.value = ''
      if (data.length <= 0) {
        console.log('请导入正确信息')
      } else {
        this.data1 = data
      }
    },
    s2ab: function(s) { // 字符串转字符流
      var buf = new ArrayBuffer(s.length)
      var view = new Uint8Array(buf)
      for (var i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF
      }
      return buf
    },
    getCharCol: function(n) { // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
      let s = ''
      let m = 0
      while (n > 0) {
        m = n % 26 + 1
        s = String.fromCharCode(m + 64) + s
        n = (n - m) / 26
      }
      return s
    },
    fixdata: function(data) {  // 文件流转BinaryString
      var o = ''
      var l = 0
      var w = 10240
      for (; l < data.byteLength / w; ++l) {
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
      }
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
      return o
    }
  },
  mounted() {
    this.imFile = document.getElementById('imFile')
    this.outFile = document.getElementById('downlink')
    console.log(this.$store.state.token)
  }
}
</script>
<style lang='scss' type="text/css" scoped>
$title:rgb(153, 153, 153);
$fontSize:16px;
$fontWeight:400;
$fontFamily:'微软雅黑';
$marginBottom:20px;
div.block {
  padding: 16px;
  margin-bottom: 20px;
  background: #fff;
  box-shadow: 3px 4px 6px rgba(51, 51, 51, 0.43);
  h4 {
    color: $title;
    font-size: $fontSize;
    font-family: $fontFamily;
    font-weight: $fontWeight;
    margin-bottom: $marginBottom;
    i.icon-gengduo {
      float: right;
      cursor: pointer;
      &:hover {
        color: green;
      }
    }
  }
  .container {
    width: 100%;
    overflow: hidden;
    border-right: 2px solid #ececec;
    box-sizing: border-box;
    .item {
      padding-left: 30px;
      margin-bottom: 20px;
      width: 400px;
      span {
        display: inline-block;
        line-height: 30px;
        height: 30px;
        vertical-align: middle
      }
      span.title {
        font-size: 18px;
        font-weight: normal;
      }
      span.num {
        font-size: 30px;
        color: orange;
        margin-left: 10px;
        text-overflow: ellipsis;
        max-width: 125px;
        overflow: hidden;
      }
    }
    div.compare {
      padding-left: 65px;
      i.icon-tubiao101 {
        color: orange
      }
      i.icon-tubiao106 {
        color: #48cfae;
      }
      i.compare {
        font-style: normal;
        margin-left: 5px;
        color: gray
      }
      span.compare {
        color: gray;
      }
    }
  }
  .ivu-col-span-6:nth-last-child(1) {
    .container {
      border-right: 2px solid #fff;
    }
  }
  .charts {
    background-color: #ececec;
    .ivu-col {
      width: calc((100% - 20px)/2);
    }
    .ivu-col:nth-child(2) {
      float: right;
    }
  }
}

div.block.bk-chart {
  padding: 0;
  box-shadow: none;
  .ivu-col {
    padding: 16px;
    background: white;
    box-shadow: 3px 4px 6px rgba(51, 51, 51, 0.43);
  }
  div.leftChart {
    width: 60%;
    float: left;
  }
  div.rightChartInfo {
    width: 40%;
    float: right;
    padding-top: 46px;
    .car-user {
      div.status {
        margin-bottom: 10px;
        span.disc {
          width: 16px;
          height: 16px;
          display: inline-block;
          vertical-align: middle;
          background-color: rgb(252, 141, 82);
        }
        span.status {
          line-height: 20px;
          display: inline-block;
          vertical-align: middle;
          color: rgb(174, 174, 174);
          font-size: 14px;
          margin-left: 5px;
        }
      }
      div.num {
        text-indent: 25px;
        color: rgb(174, 174, 174);
        i {
          font-style: normal;
        }
      }
    }
    .no-user-active {
      margin-top: 50px;
      div.status {
        span.disc {
          background-color: #48cfae;
        }
      }
    }
    .use-state {
      width: 50%;
      display: inline-block;
      ul {
        li {
          margin-bottom: 10px;
          span.colorBlock {
            width: 16px;
            height: 16px;
            display: inline-block;
            vertical-align: middle;
          }
          span.tex {
            color: #aeaeae;
            font-size: 14px;
            vertical-align: middle;
          }
        }
        li:nth-child(1) span.colorBlock {
          background: rgb(188, 188, 188);
        }
        li:nth-child(2) span.colorBlock {
          background: rgb(0, 0, 255);
        }
        li:nth-child(3) span.colorBlock {
          background: rgb(51, 255, 102);
        }
        li:nth-child(4) span.colorBlock {
          background: rgb(255, 255, 0);
        }
        li:nth-child(5) span.colorBlock {
          background: rgb(255, 102, 204);
        }
        li:nth-child(6) span.colorBlock {
          background: rgb(204, 102, 153);
        }
        li:nth-child(7) span.colorBlock {
          background: rgb(0, 102, 255);
        }
      }
    }
    .no-use-state {
      width: 50%;
      float: right;
      ul {
        li {
          margin-bottom: 10px;
          span.colorBlock {
            width: 16px;
            height: 16px;
            display: inline-block;
            vertical-align: middle;
          }
          span.tex {
            color: #aeaeae;
            font-size: 14px;
            vertical-align: middle;
          }
        }
        li:nth-child(1) span.colorBlock {
          background: rgb(188, 188, 188);
        }
        li:nth-child(2) span.colorBlock {
          background: rgb(188, 188, 188);
        }
        li:nth-child(3) span.colorBlock {
          background: rgb(204, 204, 204);
        }
        li:nth-child(4) span.colorBlock {
          background: rgb(153, 153, 153);
        }
        li:nth-child(5) span.colorBlock {
          background: rgb(0, 0, 0);
        }
      }
    }
  }
}
</style>

