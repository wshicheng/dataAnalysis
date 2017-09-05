<template>
  <Row>
      <Row class="block">
        <h4>今日用户</h4>
        <Col span="6">
          <div class="container">
            <div class="item">
              <span class="title">新增用户</span>
              <span class="num">2346</span>
            </div>
            <div class="compare">
              <i class="iconfont icon-tubiao101 "></i><i class="compare">较昨日：</i><span class="compare">+300.00</span>
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
              <i class="iconfont icon-tubiao106 "></i><i class="compare">较昨日：</i><span class="compare">-300.00</span>
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
              <i class="iconfont icon-tubiao101 "></i><i class="compare">较昨日：</i><span class="compare">+300.00</span>
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
  </Row>
</template>
<script>
import vehicleOperatStateDistribute from '../../components/Vehicle-operating-state-distribution/index.vue'
import vehicleState from '../../components/Vehicle-state-distribution/index.vue' 
 export default{
     components:{
       'vehicle-operateState':vehicleOperatStateDistribute,
       'vehicle-State':vehicleState
     }
  }
</script>
<style lang='scss' type="text/css" scoped>
  $title:rgb(153, 153, 153);
  $fontSize:16px;
  $fontWeight:400;
  $fontFamily:'微软雅黑';
  $marginBottom:20px;
  div.block{
    padding:16px;
    margin-bottom:20px;
    background:#fff;
    box-shadow: 3px 4px 6px rgba(51, 51, 51, 0.43);
    h4{
      color:$title;
      font-size:$fontSize;
      font-family:$fontFamily;
      font-weight: $fontWeight;
      margin-bottom: $marginBottom
    }
    .container{
      width:100%;
      overflow: hidden;
      border-right:2px solid #ececec;
      box-sizing: border-box;
      .item{
        padding-left:30px;
        margin-bottom: 20px;
        width:400px;
        span{display: inline-block;line-height:30px;height:30px;vertical-align: middle}
        span.title{
          font-size:18px;
          font-weight:normal;
        }
        span.num{
          font-size:30px;
          color:orange;
          margin-left:10px;
          text-overflow: ellipsis;
          max-width: 125px;
          overflow: hidden;
        }
      }
      div.compare{
          padding-left:65px;
          i.icon-tubiao101{color:orange}
          i.icon-tubiao106{color:#48cfae;}
          i.compare{font-style: normal;margin-left:5px;color:gray}
          span.compare{color:gray;}
      }
    }
    .ivu-col-span-6:nth-last-child(1){
      .container{
        border-right:2px solid #fff;
      }
    }
    .charts{
      background-color:#ececec;
      .ivu-col{
        width:calc((100% - 20px )/2);
      }
      .ivu-col:nth-child(2){float: right;}
    }
    
}
 div.block.bk-chart{padding:0;
    box-shadow: none;
    .ivu-col{padding: 16px;
      background: white;
     box-shadow: 3px 4px 6px rgba(51, 51, 51, 0.43);
    }
    div.leftChart{
       width:60%;
       float: left;
     }
     div.rightChartInfo{
       width:40%;
       float: right;
       padding-top: 46px;
      .car-user{
         div.status{
          margin-bottom:10px;
          span.disc{
            width:16px;
            height: 16px;
            display: inline-block;
            vertical-align: middle;
            background-color:rgb(252, 141, 82);
          }
          span.status{
            line-height:20px;
            display: inline-block;
            vertical-align: middle;
            color:rgb(174, 174, 174);
            font-size:14px;
            margin-left:5px;
          }
       }
       div.num{
         text-indent:25px;
         color:rgb(174, 174, 174);
         i{font-style:normal;}
       }
      }
      .no-user-active{
        margin-top:50px;
        div.status{
          span.disc{
            background-color:#48cfae;
          }
        }
      }
      .use-state{
        width:50%;
        display: inline-block;
        ul{
          li{
            margin-bottom:10px;
            span.colorBlock{width:16px;height:16px;display: inline-block;vertical-align: middle;}
            span.tex{color:#aeaeae;font-size:14px;vertical-align: middle;}
          }
          li:nth-child(1) span.colorBlock{background:rgb(188, 188, 188);}
          li:nth-child(2) span.colorBlock{background:rgb(0, 0, 255);}
          li:nth-child(3) span.colorBlock{background:rgb(51, 255, 102);}
          li:nth-child(4) span.colorBlock{background:rgb(255, 255, 0);}
          li:nth-child(5) span.colorBlock{background:rgb(255, 102, 204);}
          li:nth-child(6) span.colorBlock{background:rgb(204, 102, 153);}
          li:nth-child(7) span.colorBlock{background:rgb(0, 102, 255);}
        }
      }
      .no-use-state{
        width:50%;
        float:right;
         ul{
          li{
            margin-bottom:10px;
            span.colorBlock{width:16px;height:16px;display: inline-block;vertical-align: middle;}
            span.tex{color:#aeaeae;font-size:14px;vertical-align: middle;}
          }
           li:nth-child(1) span.colorBlock{background:rgb(188, 188, 188);}
          li:nth-child(2) span.colorBlock{background:rgb(188, 188, 188);}
          li:nth-child(3) span.colorBlock{background:rgb(204, 204, 204);}
          li:nth-child(4) span.colorBlock{background:rgb(153, 153, 153);}
          li:nth-child(5) span.colorBlock{background:rgb(0, 0, 0);}
        }
      } 
     }
} 
</style>

