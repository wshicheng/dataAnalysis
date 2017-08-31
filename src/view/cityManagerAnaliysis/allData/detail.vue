<template>
    <Row>
        <Row class="monthSelect">
            <i @click="handleMinusMonth" class="iconfont left icon-jiantou-"></i> 
            <time class="currentMonth">
                {{currentMonth}}       
            </time>
            <i @click="handleAplusMonth" class="iconfont right icon-right-arrow "></i>
            <div class="title">
                <h3>城市经营分析</h3>
            </div> 
        </Row>
        <Row class="tab">
             <Tabs>
                <TabPane label="基础数据" icon="social-apple">
                    <base-datas></base-datas>
                </TabPane>
                <TabPane label="运营成本" icon="social-windows">
                    <operating-cost></operating-cost>
                </TabPane>
                <TabPane label="运营成本分析" icon="social-tux">
                    <operating-analysis></operating-analysis>
                </TabPane>
                <TabPane label="单车日收益" icon="social-tux">
                    <single-bike></single-bike>
                </TabPane>
                <TabPane label="实收变动盈亏率动态预测" icon="social-tux">
                    <pretend></pretend>
                </TabPane>
            </Tabs>
        </Row>
    </Row>
</template>
<script>
import moment from 'moment'
import baseDatas from '../../../components/baseDatas.vue'
import operatingCost  from '../../../components/operatCosts.vue'
import operatingAnalysis from '../../../components/operatAnalysis.vue'
import singleBike from '../../../components/singleBikeIncoming.vue'
import pretend from '../../../components/pretend.vue'
    export default {
        components:{
            'base-datas':baseDatas,
            'operating-cost':operatingCost,
            'operating-analysis':operatingAnalysis,
            'single-bike':singleBike,
            'pretend':pretend
        },
        data(){
            return {
                currentMonth:moment().format('YYYY-MM')
            }
        },
        methods:{
            handleMinusMonth(){
               var time =  moment(this.currentMonth).subtract(1,'month')
               this.currentMonth = moment(time).format('YYYY-MM')
            },
            handleAplusMonth(){
                var time =  moment(this.currentMonth).add(1,'month')
               this.currentMonth = moment(time).format('YYYY-MM')
            }
        }
    }
</script>
<style lang="scss" type="text/css" scoped>
$line-height:40px;
   div.monthSelect{
       background-color: rgb(255, 139, 74);
       text-align:center;
       color:#fff;
       font-size:30px;
       i{
           vertical-align: middle;
           cursor:pointer;
           font-size:34px;
       }
       i.left,i.right:hover{color:#efecec;}
       .title{
           h3{font-size:20px; line-height:$line-height;}
       }
   } 
 

</style>
