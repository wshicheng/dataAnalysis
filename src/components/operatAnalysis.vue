<template>
    <div>
        <div class="title">蜜蜂出行{{month}}月份经营报告</div>
        <div class="table">
            <table>
                <thead>
                    <tr>
                         <th colspan="1">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </th>
                        <th v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div>{{list.cityName}}</div>
                                <div>
                                    <span>当期</span>
                                    <span>环比</span>
                                </div>
                            </div>
                        </th>
                    </tr> 
                </thead>
                <tbody>
                    <tr>
                        <td>
                             <div class="cityName leftTitle">
                                <div>归属车辆数</div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span>{{list.bikeNum.nowData}}</span>
                                    <span>{{list.bikeNum.diff}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr class="incoming">
                        <td>
                             <div class="cityName leftTitle">
                                <div>收入（元）</div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span>{{list.inComing.nowData}}</span>
                                    <span>{{list.inComing.diff}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                             <div class="cityName leftTitle">
                                <div>总计费</div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td v-for="list of cityList" v-bind:key="list.id">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span>{{list.orderAmountTot.nowData}}</span>
                                    <span>{{list.orderAmountTot.diff}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                             <div class="cityName leftTitle">
                                <div>总实收</div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span>{{list.payAmountTot.nowData}}</span>
                                    <span>{{list.payAmountTot.diff}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                             <div class="cityName leftTitle">
                                <div>实收率（%）</div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span>{{list.actualYield.nowData}}</span>
                                    <span>{{list.actualYield.diff}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                             <div class="cityName leftTitle">
                                <div>单车计费收入</div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td  v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span>{{list.sinBikeBillingIncome.nowData}}</span>
                                    <span>{{list.sinBikeBillingIncome.diff}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                             <div class="cityName leftTitle">
                                <div>单车实际收入</div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span>{{list.sinBikeRealityIncome.nowData}}</span>
                                    <span>{{list.sinBikeRealityIncome.diff}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr class="cost">
                        <td>
                             <div class="cityName leftTitle">
                                <div>成本（元）</div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                             <div class="cityName leftTitle">
                                <div>总成本</div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span>{{list.costTot.nowData}}</span>
                                    <span>{{list.costTot.diff}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                             <div class="cityName leftTitle">
                                <div>单车成本：</div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td  v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span>{{list.singleBikeCost.nowData}}</span>
                                    <span>{{list.singleBikeCost.diff}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                             <div class="cityName leftTitle">
                                <div class="bikeOperaMoney">
                                    <span class="subCategory">单车运维费用</span>
                                </div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span>{{list.sinBikeManageMoney.nowData}}</span>
                                    <span>{{list.sinBikeManageMoney.diff}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                             <div class="cityName leftTitle">
                                <div class="bikeCostMoney">
                                    <span class="subCategory">单车摊销费用</span>
                                </div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td  v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span>{{list.sinBikeDepreMoney.nowData}}</span>
                                    <span>{{list.sinBikeDepreMoney.diff}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr class="profits">
                        <td>
                             <div class="cityName leftTitle">
                                <div>营收（元）</div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                    </tr>
                     <tr>
                        <td>
                             <div class="cityName leftTitle">
                                <div>税前毛利</div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span>{{list.grossMargin.nowData}}</span>
                                    <span>{{list.grossMargin.diff}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                             <div class="cityName leftTitle">
                                <div>单车实际利润（元）</div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span>{{list.sinBikeRealityProfit.nowData}}</span>
                                    <span>{{list.sinBikeRealityProfit.diff}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                             <div class="cityName leftTitle">
                                <div>单车投资收益率（%）</div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span>{{list.sinBikeInvestIncomeLv.nowData}}</span>
                                    <span>{{list.sinBikeInvestIncomeLv.diff}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                             <div class="cityName leftTitle">
                                <div>单车计费盈利率（%）</div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span>{{list.sinBikeBillingIncomeLv.nowData}}</span>
                                    <span>{{list.sinBikeBillingIncomeLv.diff}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                             <div class="cityName leftTitle">
                                <div>单车实际盈利率（%）</div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span>{{list.sinBikeRealityIncomeLv.nowData}}</span>
                                    <span>{{list.sinBikeRealityIncomeLv.diff}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr class="car">
                        <td>
                             <div class="cityName leftTitle">
                                <div>车辆</div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                             <div class="cityName leftTitle">
                                <div>投产车辆数（日均）</div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span>{{list.avgProducteBikeNum.nowData}}</span>
                                    <span>{{list.avgProducteBikeNum.diff}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                             <div class="cityName leftTitle">
                                <div>投产率（日均）</div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span>{{list.avgProductionLv.nowData}}</span>
                                    <span>{{list.avgProductionLv.diff}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                             <div class="cityName leftTitle">
                                <div>单车日均订单数</div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span>{{list.avgSinBikeOrderNum.nowData}}</span>
                                    <span>{{list.avgSinBikeOrderNum.diff}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                             <div class="cityName leftTitle">
                                <div>单车平均用户数</div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                       <td v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span>{{list.avgSinBikeUserNum.nowData}}</span>
                                    <span>{{list.avgSinBikeUserNum.diff}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                             <div class="cityName leftTitle">
                                <div>单车平均押金用户数（当前）</div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span>{{list.avgSinBikeDepositUserNumDay.nowData}}</span>
                                    <span>{{list.avgSinBikeDepositUserNumDay.diff}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr class="user">
                        <td>
                             <div class="cityName leftTitle">
                                <div>用户</div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                             <div class="cityName leftTitle">
                                <div>注册用户数（累计）</div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span>{{list.registerUserNum.nowData}}</span>
                                    <span>{{list.registerUserNum.diff}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                             <div class="cityName leftTitle">
                                <div>押金用户数（实时）</div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                         <td v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span>{{list.depositUserNum.nowData}}</span>
                                    <span>{{list.depositUserNum.diff}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                             <div class="cityName leftTitle">
                                <div>订单用户数（当期）</div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span>{{list.orderUserNum.nowData}}</span>
                                    <span>{{list.orderUserNum.diff}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                             <div class="cityName leftTitle">
                                <div>新增注册：</div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span>{{list.newAddRegister.nowData}}</span>
                                    <span>{{list.newAddRegister.diff}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                             <div class="cityName leftTitle">
                                <div class="bikeOperaMoney">
                                    <span class="subCategory">当期</span>
                                </div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span>{{list.currentNewAddRegister.nowData}}</span>
                                    <span>{{list.currentNewAddRegister.diff}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                             <div class="cityName leftTitle">
                                <div class="bikeOperaMoney">
                                    <span class="subCategory">日均</span>
                                </div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span>{{list.avgNewAddRegister.nowData}}</span>
                                    <span>{{list.avgNewAddRegister.diff}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                     <tr>
                        <td>
                             <div class="cityName leftTitle">
                                <div>新增押金：</div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span>{{list.newAddDeposit.nowData}}</span>
                                    <span>{{list.newAddDeposit.diff}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                             <div class="cityName leftTitle">
                                <div class="bikeOperaMoney">
                                    <span class="subCategory">当期</span>
                                </div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span>{{list.currentNewAddDeposit.nowData}}</span>
                                    <span>{{list.currentNewAddDeposit.diff}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                             <div class="cityName leftTitle">
                                <div class="bikeOperaMoney">
                                    <span class="subCategory">日均</span>
                                </div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </td>
                        <td v-for="list of cityList" v-bind:key="list.cityId">
                            <div class="cityName">
                                <div></div>
                                <div>
                                    <span>{{list.avgNewAddDeposit.nowData}}</span>
                                    <span>{{list.avgNewAddDeposit.diff}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="hidden">
                <ul>
                    <li>归属车辆数</li>
                    <li class="yellow">收入（元）</li>
                    <li>总计费</li>
                    <li>总实收</li>
                    <li>实收率（%）</li>
                    <li>单车实际收入</li>
                    <li class="yellow">成本（元）</li>
                    <li>总成本</li>
                    <li>单车成本：</li>
                    <li class="indent">单车运维费用</li>
                    <li>单车摊销费用</li>
                    <li class="yellow">营收（元）</li>
                    <li>税前毛利</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data:function(){
            return {
                month:'',
                cityList:[]
            }
        },
        methods:{
            mockDatas(){
                for (var i=0;i<10;i++){
                    this.cityList.push({
                        cityName:'城市' + Math.floor(Math.random()*255),
                        cityId:Math.floor(Math.random())*255 + "-" + Math.floor(Math.random())*9,
                        bikeNum:{
                            nowData:Math.floor(Math.random()*255),
                            diff:Math.floor(Math.random()*100) + '%'
                        },
                        inComing:{
                            nowData:Math.floor(Math.random()*255),
                            diff:Math.floor(Math.random()*100) + '%'
                        },
                        orderAmountTot:{
                            nowData:Math.floor(Math.random()*255),
                            diff:Math.floor(Math.random()*100) + '%'
                        },
                        payAmountTot:{
                            nowData:Math.floor(Math.random()*255),
                            diff:Math.floor(Math.random()*100) + '%'
                        },
                        actualYield:{
                            nowData:Math.floor(Math.random()*255),
                            diff:Math.floor(Math.random()*100) + '%'
                        },
                        sinBikeBillingIncome:{
                            nowData:Math.floor(Math.random()*255),
                            diff:Math.floor(Math.random()*100) + '%'
                        },
                        sinBikeRealityIncome:{
                            nowData:Math.floor(Math.random()*255),
                            diff:Math.floor(Math.random()*100) + '%'
                        },
                        costTot:{
                            nowData:Math.floor(Math.random()*255),
                            diff:Math.floor(Math.random()*100) + '%'
                        },
                        singleBikeCost:{
                            nowData:Math.floor(Math.random()*255),
                            diff:Math.floor(Math.random()*100) + '%'
                        },
                        sinBikeManageMoney:{
                            nowData:Math.floor(Math.random()*255),
                            diff:Math.floor(Math.random()*100) + '%'
                        },
                        sinBikeDepreMoney:{
                            nowData:Math.floor(Math.random()*255),
                            diff:Math.floor(Math.random()*100) + '%'
                        },
                        grossMargin:{
                            nowData:Math.floor(Math.random()*255),
                            diff:Math.floor(Math.random()*100) + '%'
                        },
                        sinBikeRealityProfit:{
                            nowData:Math.floor(Math.random()*255),
                            diff:Math.floor(Math.random()*100) + '%'
                        },
                        sinBikeInvestIncomeLv:{
                            nowData:Math.floor(Math.random()*255),
                            diff:Math.floor(Math.random()*100) + '%'
                        },
                        sinBikeBillingIncomeLv:{
                            nowData:Math.floor(Math.random()*255),
                            diff:Math.floor(Math.random()*100) + '%'
                        },
                        sinBikeRealityIncomeLv:{
                            nowData:Math.floor(Math.random()*255),
                            diff:Math.floor(Math.random()*100) + '%'
                        },
                        avgProducteBikeNum:{
                            nowData:Math.floor(Math.random()*255),
                            diff:Math.floor(Math.random()*100) + '%'
                        },
                        avgProductionLv:{
                            nowData:Math.floor(Math.random()*255),
                            diff:Math.floor(Math.random()*100) + '%'
                        },
                        avgSinBikeOrderNum:{
                            nowData:Math.floor(Math.random()*255),
                            diff:Math.floor(Math.random()*100) + '%'
                        },
                        avgSinBikeUserNum:{
                            nowData:Math.floor(Math.random()*255),
                            diff:Math.floor(Math.random()*100) + '%'
                        },
                        avgSinBikeDepositUserNumDay:{
                            nowData:Math.floor(Math.random()*255),
                            diff:Math.floor(Math.random()*100) + '%'
                        },
                        registerUserNum:{
                            nowData:Math.floor(Math.random()*255),
                            diff:Math.floor(Math.random()*100) + '%'
                        },
                        depositUserNum:{
                            nowData:Math.floor(Math.random()*255),
                            diff:Math.floor(Math.random()*100) + '%'
                        },
                        orderUserNum:{
                            nowData:Math.floor(Math.random()*255),
                            diff:Math.floor(Math.random()*100) + '%'
                        },
                        newAddRegister:{
                            nowData:Math.floor(Math.random()*255),
                            diff:Math.floor(Math.random()*100) + '%'
                        },
                        currentNewAddRegister:{
                            nowData:Math.floor(Math.random()*255),
                            diff:Math.floor(Math.random()*100) + '%'
                        },
                        avgNewAddRegister:{
                            nowData:Math.floor(Math.random()*255),
                            diff:Math.floor(Math.random()*100) + '%'
                        },
                        newAddDeposit:{
                            nowData:Math.floor(Math.random()*255),
                            diff:Math.floor(Math.random()*100) + '%'
                        }, 
                        currentNewAddDeposit:{
                            nowData:Math.floor(Math.random()*255),
                            diff:Math.floor(Math.random()*100) + '%'
                        }, 
                        avgNewAddDeposit:{
                            nowData:Math.floor(Math.random()*255),
                            diff:Math.floor(Math.random()*100) + '%'
                        }   
                        
                    })
                }
            }
        },
        mounted:function(){
            this.mockDatas()
            this.month = this.$route.params.month.split('-')[1]
        }
    }
</script>
<style lang="scss" scoped>
    
    div.title{
        width:1200px;
        text-align:center;
        font-size:20px;
        font-weight:bold;
    }
    div.table{
        position:relative;
        width: calc(100% - 32px);
        margin: 16px auto;
        overflow: auto;
        margin: 0 auto;
        div.hidden{
            width: 200px;
            position: fixed;
            top: 67px;
            background: #ed3f14;
            bottom: 19px;
            opacity:0.3;
        }
        table{
            width: 100%;
            box-sizing: border-box;
            thead{
                tr{
                    background:#bdd7ee;
                    border:1px solid #ddd;
                    th{
                         min-width:200px;
                         &:nth-child(1){width:160px;}
                        .cityName{
                            text-align:center;
                        }
                        span{
                            width:50%;float:left;
                            &:after{
                                content:'.';
                                display:block;
                                clear:both;
                                height:0;
                                overflow:hidden;
                                visibility:hidden;
                            }
                        }
                    }
                }
            }
            tbody{
                tr.incoming,tr.cost,tr.profits,tr.car,tr.user{background:yellow}
                tr{
                    background:#fff;
                    border:1px solid #ddd;
                    height:30px;line-height:30px;
                    td{
                        .cityName{
                            text-align:center;
                        }
                        .leftTitle{
                            text-align:left;
                            .bikeOperaMoney,.bikeCostMoney{height:30px;position:relative;
                                .subCategory{margin-left:54px;position:absolute;}
                            }
                        }
                        span{
                            width:50%;float:left;
                            &:after{
                                content:'.';
                                display:block;
                                clear:both;
                                height:0;
                                overflow:hidden;
                                visibility:hidden;
                            }
                        }
                    }
                }
            }
        }
        
    }
</style>