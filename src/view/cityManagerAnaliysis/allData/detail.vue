<template>
    <Row>
        <Row class="monthSelect">
            <div>
                <i @click="handleMinusMonth" class="iconfont left icon-jiantou-"></i> 
                <time class="currentMonth">
                    {{currentMonth}}       
                </time>
                <i ref="next" @click="handleAplusMonth" class="iconfont right icon-right-arrow "></i>
            </div>
            <div class="title">
                <h3>城市经营分析</h3>
            </div> 
        </Row>
        <Row class="tab">
             <Tabs>
                <TabPane :label="label" >
                    <base-datas></base-datas>
                </TabPane>
                <TabPane :label="label2">
                    <operating-cost></operating-cost>
                </TabPane>
                <TabPane :label="label3">
                    <operating-analysis></operating-analysis>
                </TabPane>
                <TabPane :label="label4">
                    <single-bike></single-bike>
                </TabPane>
                <TabPane :label="label5">
                    <pretend></pretend>
                </TabPane>
                <TabPane label="demo">
                    <demo></demo>
                </TabPane>
                 <TabPane label="deMo">
                    <myDemo></myDemo>
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
import demo from '../../../components/operatAnalysis3.vue'
import myDemo from '../../../components/operaAnalysis4.vue'
import singleBike from '../../../components/singleBikeIncoming.vue'
import pretend from '../../../components/pretend.vue'
import {mapActions,mapGetters} from 'vuex'
    export default {
        components:{
            'base-datas':baseDatas,
            'operating-cost':operatingCost,
            'operating-analysis':operatingAnalysis,
            'single-bike':singleBike,
            'pretend':pretend,
            demo,
            myDemo
        },
        data(){
            return {
                label:(h)=>{
                    return h('div',[
                         h('span',[
                             h('i',{
                                 attrs:{
                                     class:'iconfont icon-16pxshuju'
                                 },
                                 style:'vertical-align:middle;margin-right:10px;'
                             })
                         ]),
                        h('span','基础数据')
                    ])
                },
                label2:(h)=>{
                    return h('div',[
                            h('span',[
                                h('i',{
                                    attrs:{
                                        class:'iconfont icon-chengben'
                                    },
                                    style:'vertical-align:middle;margin-right:10px;'
                                })
                            ]),
                        h('span','运营成本')
                    ])
                },
                label3:(h)=>{
                    return h('div',[
                            h('span',[
                                h('i',{
                                    attrs:{
                                        class:'iconfont icon-icon3'
                                    },
                                    style:'vertical-align:middle;margin-right:10px;'
                                })
                            ]),
                        h('span','运营经营分析')
                    ])
                },
                label4:(h)=>{
                    return h('div',[
                            h('span',[
                                h('i',{
                                    attrs:{
                                        class:'iconfont icon-pop_fengshouying'
                                    },
                                    style:'vertical-align:middle;margin-right:10px;'
                                })
                            ]),
                        h('span','单车日收益')
                    ])
                },
                label5:(h)=>{
                    return h('div',[
                            h('span',[
                                h('i',{
                                    attrs:{
                                        class:'iconfont icon-yuce'
                                    },
                                    style:'vertical-align:middle;margin-right:10px;'
                                })
                            ]),
                        h('span','实收变动盈亏率动态预测')
                    ])
                },
                currentMonth:''
            }
        },
        computed:{
            ...mapGetters(['dataMonth'])
        },
        methods:{
            ...mapActions(['updateMonth']),
            handleMinusMonth(){
               var time =  moment(this.currentMonth).subtract(1,'M')
               this.currentMonth = moment(time).format('YYYY-MM')
               var now = moment()
               var diff = now.diff(this.currentMonth,'month')
               console.log('minus:' +　this.currentMonth)
               this.updateMonth(this.currentMonth)
                this.$refs.next.setAttribute('class','iconfont right icon-right-arrow')
            },
            handleAplusMonth(){
                var now = moment()
                var currentMonth = moment(this.currentMonth);
                var nextMonth = moment(currentMonth).add(1,'M')
                var diff = now.diff(this.currentMonth,'month')
                if((diff-1)<=0){
                    this.$refs.next.setAttribute('class','iconfont right icon-right-arrow disabled')
                    this.currentMonth = moment().format('YYYY-MM')
                     this.updateMonth(this.currentMonth)
                    return 
                }else{
                    this.currentMonth = moment(nextMonth).format('YYYY-MM')
                    this.$refs.next.setAttribute('class','iconfont right icon-right-arrow')
                     this.updateMonth(this.currentMonth)
                }
               
            }
        },
        mounted(){
            this.currentMonth = moment(this.$route.params.month).format('YYYY-MM')
            var now = moment()
            var currentMonth = moment(this.currentMonth);
            document.title = '城市经营分析表 -' + moment(this.$route.params.month).format('YYYY-MM')
            var diff = now.diff(currentMonth,'month')
            if(diff===0){
                this.$refs.next.setAttribute('class','iconfont right icon-right-arrow disabled')
            }
            this.updateMonth(this.currentMonth)
            
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
        padding-top:15px;
       i{
           vertical-align: middle;
           cursor:pointer;
           font-size:34px;
       }
       i.left:hover,i.right:hover{color:#efecec;}
       .title{
           margin-top:-8px;
           margin-bottom:8px;
           h3{font-size:20px; line-height:$line-height;}
       }
       i.right.disabled{color:#e05f16;cursor:initial;}
       time{vertical-align: middle}
   } 
 

</style>
