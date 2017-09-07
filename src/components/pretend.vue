<template>
  <Row class="pretend">
      <Row class="citySelect">
          <!-- <ul>
              <li class="active">全部地区</li>
              <li v-bind:key="cityItem.id" v-for="cityItem of cityLists">{{cityItem.cityName}}</li>
          </ul> -->
        <city-select></city-select>
      </Row>
      <Row class="cityBindTable">
          <ul>
              <li class="total">
                  <h3>合计</h3>
                  <div class="total">
                      <table>
                          <thead>
                            <tr>
                                <th>假设实收率</th>
                                <th>盈亏状态</th>
                                <th>盈亏率</th>
                            </tr>
                          </thead>
                          <tbody>
                              <tr :key="item.id" v-for="item of items">
                                  <td>{{item.Yield}}</td>
                                  <td>{{item.status}}</td>
                                  <td>
                                      <div class="progress">
                                        <div class="progress-outer">
                                            <span class="progress-text">{{item.winRate}}</span>  
                                            <div class="progress-inner">
                                                <div :class="{'progress-bg':common }" percent="25">
                                                </div>
                                            </div>
                                        </div> 
                                      </div> 
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </li>
              <li class="cityBind" v-bind:key="list.cityName" v-for="list of allCityTables">
                  <h3>{{list.cityName}}</h3>
                  <div class="total">
                      <table>
                          <thead>
                            <tr>
                                <th>假设实收率</th>
                                <th>盈亏状态</th>
                                <th>盈亏率</th>
                            </tr>
                          </thead>
                          <tbody>
                              <tr :key="item.id" v-for="item of list.tableItem">
                                  <td>{{item.Yield}}</td>
                                  <td>{{item.status}}</td>
                                  <td>
                                      <div class="progress">
                                        <div class="progress-outer">
                                            <span class="progress-text">{{item.winRate}}</span>  
                                            <div class="progress-inner">
                                                <div :class="{'progress-bg':common}" :percent="item.winRate">
                                                </div>
                                            </div>
                                        </div> 
                                      </div> 
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </li>
          </ul>
      </Row>
  </Row>
</template>
<script>
import $ from 'jquery'
import citySelect from './citySelect.vue'
    export default {
        components: {
            "city-select": citySelect
        },
        data(){
            //this.changeWidth()
            return {
                cityLists:this.mockTableDatas(),
                items:this.mockTableDatas2(),
                allCityTables:this.mockTableDatas3(),
                common:true,
                isWin:true
            }
        },
        methods:{
            mockTableDatas(){
                // var arr = []
                // for(let i=0;i<20;i++){
                //     arr.push(
                //         {
                //             id: i,
                //             cityName:Math.floor(Math.random()*100) + '城市'
                //          }
                //     )
                // }
                // return arr;
                var _this = this
                this.axios.get('/beefly/user/api/v1/city', {
                    params: {
                        accessToken: window.localStorage.getItem('token')
                    }
                })
                .then(function (res) {
                    var arr = res.data.data
                })
                .catch(function (err) {
                    console.log('err', err)
                });
            },
            mockTableDatas2(){
                var arr = []
                for(let i=0;i<5;i++){
                    arr.push(
                        {
                            id: i,
                            Yield:Math.floor(Math.random()*100) + '%',
                            status:Math.floor(Math.random()*100-8)>2?'赢':'亏',
                            winRate:Math.floor(Math.random()*100) + '%',
                         }
                    )
                    
                }
                var res = arr.map((item)=>{
                        if(item.status==='赢'){
                            item.isWin = true
                        }else{
                            item.isWin = false
                        }
                        return Object.assign({},item,{isWin:item.isWin})
                    })
                return  res;
            },
            mockTableDatas3(){
                var arr = []
                var temp = []
                for(var i=0;i<5;i++){
                    (function(i){
                        temp.push(
                            {
                                id: i,
                                Yield:Math.floor(Math.random()*100) + '%',
                                status:Math.floor(Math.random()*100-8)>2?'赢':'亏',
                                winRate:Math.floor(Math.random()*100) + '%',
                            }
                        )
                       return temp.map((item)=>{
                            if(item.status==='赢'){
                                item.isWin = true
                            }else{
                                item.isWin = false
                            }
                            return Object.assign({},item,{isWin:item.isWin})
                        })
                    })(i)
                    arr.push(
                         {
                            tableItem:temp,
                            cityName: '城市' + Math.floor(Math.random()*100) 
                        }
                    )
                }
                return arr
            },
            changeWidth(){
                var $proress = $('.progress-bg');
               var res =  Array.prototype.slice.call($proress)
               console.log(res,2222)
               //return 
               res.forEach(function(item,index){
                   var $percent = $(item).attr('percent')
                    console.log($percent)
                    $($(item)[0]).css(
                        {
                            width:20
                        }
                    )
               })
            }
        }
    }
</script>
<style lang="scss" type="text/css" scoped>
    .citySelect{
        padding:16px 16px 0 16px;
        background:#f3f3f5;
        ul{
            min-width:1200px;margin:0 auto;
            li{border-radius:3px;width:60px;height:35px;line-height:35px;text-align:center;margin-right:16px;margin-bottom:16px;float:left;list-style-type: none;border:1px solid #19be6b;}
            li.active{background:#19be6b;color:#fff;}
        }
    }
    .cityBindTable{
        min-width:1200px;
        margin:16px auto 0;
        padding: 0 16px 0 16px;
        ul{
            width:100%;margin:0 auto;overflow: hidden;
            background:#fbfbfb;
            li{ float:left;
                margin:0 16px 16px 0px;
                width:calc((100% - 16px - 32px)/3);
                box-sizing: border-box;
                h3{margin-bottom:16px;}
                div{
                    table{border-collapse: collapse;width:100%;
                        tr{
                            th{background-color:#f8f8f9;border:1px solid #e9eaec;text-align: center;line-height:30px;}
                            td{border:1px solid #e9eaec;text-align: center;line-height: 35px;}
                        }
                    }
                    .progress{width:100%;height:100%;
                        .progress-outer{
                            position:relative;
                            .progress-text{
                                position: absolute;
                                right:5px;
                                bottom:0;
                                top:50%;
                                margin-top:-15px;
                                color:#fff;
                                z-index:3;
                            }
                            .progress-inner{
                                width:100%;
                                background:#f3f3f3;
                                .progress-bg{
                                    height: 30px;
                                    width:100%;
                                    background:#19be6b;
                                    position: relative;
                                }
                                .progress-bg.active{
                                    height: 30px;
                                    width:100%;
                                    background:#b91010;
                                    position: relative;
                                }
                            }
                        }
                    }
                   
                }
            }
        }
    }
</style>
