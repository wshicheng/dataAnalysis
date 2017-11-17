<template>
    <div id="operatAnalysis">
        <div class="fiexedAssets">
            <Spin v-show="spinShow" fix>
                    <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                    <div style="color:rgb(204, 204, 204);">Loading</div>
                </Spin>
            <div class="nodata" v-show="isNoData2">
                <i class="iconfont icon-zanwushuju"></i>
            </div>
            <div v-show="isNoData">
                <div class="title">蜜蜂出行{{monthTitle}}月份经营报告</div>
                <div class="table" >
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
                                        <div><a target="_blank" :href="'#/index/orderAllData/manageReport/' + list.cityName + '&' + list.dataMonth + '&' +  list.cityId">{{list.cityName}}</a></div>
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
                                            <span></span>
                                            <span></span>
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
                    <div class="hidden" v-show="cityList.length>5">
                        <ul>
                            <li class="space"></li>    
                            <li>归属车辆数</li>
                            <li class="yellow">收入（元）</li>
                            <li>总计费</li>
                            <li>总实收</li>
                            <li>实收率（%）</li>
                            <li>单车计费收入</li>
                            <li>单车实际收入</li>
                            <li class="yellow">成本（元）</li>
                            <li>总成本</li>
                            <li>单车成本：</li>
                            <li class="indent">单车运维费用</li>
                            <li class="indent">单车摊销费用</li>
                            <li class="yellow">营收（元）</li>
                            <li>税前毛利</li>
                            <li>单车实际利润（元）</li>
                            <li>单车投资收益率（%）</li>
                            <li>单车计费盈利率（%）</li>
                            <li>单车实际盈利率（%）</li>
                            <li class="yellow">车辆</li>
                            <li>投产车辆数（日均）</li>
                            <li>投产率（日均）</li>    
                            <li>单车日均订单数</li>
                            <li>单车平均用户数</li>
                            <li>单车平均押金用户数（当前）</li>
                            <li class="yellow">用户</li>
                            <li>注册用户数（累计）</li>
                            <li>押金用户数（实时）</li>
                            <li>订单用户数（当期）</li>
                            <li>新增注册：</li>
                            <li class="indent">当期</li>
                            <li class="indent">日均</li>
                            <li>新增押金：</li>
                            <li class="indent">当期</li>
                            <li class="indent">日均</li>                      
                        </ul>
                    </div>
                </div>
            </div>
        
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
import { mapGetters } from 'vuex'
    export default {
        data:function(){
            return {
                month:'',
                monthTitle:'',
                cityList:[],
                cityItems:[],
                 spinShow:true,
                isNoData:false,
                isNoData2:false,
            }    
        },
        methods:{
            mockDatas(){
                for (var i=0;i<1;i++){
                    this.cityItems.push({
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
            },
            changePage() {
            // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
            // var that = this
            // setTimeout(function() {
                var that = this
                this.axios('/beefly/monthDataDetail/api/v1/monthDataDetail', {
                    params: {
                        dataMonth: this.dataMonth,
                        accessToken: this.$store.state.token,
                        type: 3
                    }
                }).then((response) => {
                    var data = response.data.data
                     if(data.length>0){
                        that.isNoData2 = false
                        that.isNoData = true
                        that.spinShow = false
                    }else{
                        that.isNoData2 = true
                        that.isNoData = false
                         that.spinShow = false
                    }
                    var dataDel =  data.map((item,_index)=>{
                         var arr = []
                    var bikeNum = {}
                    var orderAmountTot = {}
                    var payAmountTot = {}
                    var actualYield = {}
                    var sinBikeBillingIncome = {}
                    var sinBikeRealityIncome = {}
                    var costTot = {}
                    var singleBikeCost = {}
                    var sinBikeManageMoney = {}
                    var sinBikeDepreMoney = {}
                    var grossMargin = {}
                    var sinBikeRealityProfit ={}
                    var sinBikeInvestIncomeLv = {}
                    var sinBikeBillingIncomeLv ={}
                    var sinBikeRealityIncomeLv= {}
                    var avgProducteBikeNum = {}
                    var avgProductionLv = {}
                    var avgSinBikeOrderNum = {}
                    var avgSinBikeUserNum = {}
                    var avgSinBikeDepositUserNumDay = {}
                    var registerUserNum = {}
                    var depositUserNum = {}
                    var orderUserNum ={}
                    var newAddRegister = {}
                    var avgNewAddRegister = {}
                    var currentNewAddRegister = {}
                    var newAddDeposit = {}
                    var currentNewAddDeposit = {}
                    var avgNewAddDeposit = {}
                       item.map((list,index)=>{
                          if(index==0){
                              bikeNum.nowData = list.bikeNum
                              orderAmountTot.nowData = list.orderAmountTot
                              payAmountTot.nowData = list.payAmountTot
                              actualYield.nowData = list.actualYield
                              sinBikeBillingIncome.nowData = list.sinBikeBillingIncome
                              sinBikeRealityIncome.nowData = list.sinBikeRealityIncome
                              costTot.nowData = list.costTot
                              singleBikeCost.nowData = list.singleBikeCost
                              sinBikeManageMoney.nowData = list.sinBikeManageMoney
                              sinBikeDepreMoney.nowData = list.sinBikeDepreMoney
                              grossMargin.nowData = list.grossMargin
                              sinBikeRealityProfit.nowData = list.sinBikeRealityProfit
                              sinBikeInvestIncomeLv.nowData = list.sinBikeInvestIncomeLv
                              sinBikeBillingIncomeLv.nowData = list.sinBikeBillingIncomeLv
                              sinBikeRealityIncomeLv.nowData = list.sinBikeRealityIncomeLv
                              avgProducteBikeNum.nowData = list.avgProducteBikeNum
                              avgProductionLv.nowData = list.avgProductionLv
                              avgSinBikeOrderNum.nowData = list.avgSinBikeOrderNum
                              avgSinBikeUserNum.nowData = list.avgSinBikeUserNum
                              avgSinBikeDepositUserNumDay.nowData = list.avgSinBikeDepositUserNumDay
                              registerUserNum.nowData = list.registerUserNum
                              depositUserNum.nowData = list.depositUserNum
                              orderUserNum.nowData = list.orderUserNum
                              newAddRegister.nowData = list.newAddRegister
                              currentNewAddRegister.nowData = list.currentNewAddRegister
                              avgNewAddRegister.nowData = list.avgNewAddRegister
                              newAddDeposit.nowData = list.newAddDeposit
                              currentNewAddDeposit.nowData = list.currentNewAddDeposit
                              avgNewAddDeposit.nowData = list.avgNewAddDeposit
                          }else{
                              bikeNum.diff = list.bikeNum
                              orderAmountTot.diff = list.orderAmountTot
                              payAmountTot.diff = list.payAmountTot
                              actualYield.diff = list.actualYield
                              sinBikeBillingIncome.diff = list.sinBikeBillingIncome
                              sinBikeRealityIncome.diff = list.sinBikeRealityIncome
                              costTot.diff = list.costTot
                              singleBikeCost.diff = list.singleBikeCost
                              sinBikeManageMoney.diff = list.sinBikeManageMoney
                              sinBikeDepreMoney.diff = list.sinBikeDepreMoney
                              grossMargin.diff = list.grossMargin
                              sinBikeRealityProfit.diff = list.sinBikeRealityProfit
                              sinBikeInvestIncomeLv.diff = list.sinBikeInvestIncomeLv
                              sinBikeBillingIncomeLv.diff = list.sinBikeBillingIncomeLv
                              sinBikeRealityIncomeLv.diff = list.sinBikeRealityIncomeLv
                              avgProducteBikeNum.diff = list.avgProducteBikeNum
                              avgProductionLv.diff = list.avgProductionLv
                              avgSinBikeOrderNum.diff = list.avgSinBikeOrderNum
                              avgSinBikeUserNum.diff = list.avgSinBikeUserNum
                              avgSinBikeDepositUserNumDay.diff = list.avgSinBikeDepositUserNumDay
                              registerUserNum.diff = list.registerUserNum
                              depositUserNum.diff = list.depositUserNum
                              orderUserNum.diff = list.orderUserNum
                              newAddRegister.diff = list.newAddRegister
                              currentNewAddRegister.diff = list.currentNewAddRegister
                              avgNewAddRegister.diff = list.avgNewAddRegister
                              newAddDeposit.diff = list.newAddDeposit
                              currentNewAddDeposit.diff = list.currentNewAddDeposit
                              avgNewAddDeposit.diff = list.avgNewAddDeposit
                          }
                       })
                       return Object.assign({},
                        {dataMonth:item[0].dataMonth},
                        {cityId:item[0].cityCode},
                        {cityName:item[0].cityName},
                        {bikeNum},
                        {orderAmountTot},
                        {payAmountTot},
                        {actualYield},
                        {sinBikeBillingIncome},
                        {sinBikeRealityIncome},
                        {costTot},
                        {singleBikeCost},
                        {sinBikeManageMoney},
                        {sinBikeDepreMoney},
                        {grossMargin},
                        {sinBikeRealityProfit},
                        {sinBikeInvestIncomeLv},
                        {sinBikeBillingIncomeLv},
                        {sinBikeRealityIncomeLv},
                        {avgProducteBikeNum}, 
                        {avgProductionLv},
                        {avgSinBikeOrderNum},
                        {avgSinBikeUserNum},
                        {avgSinBikeDepositUserNumDay},
                        {registerUserNum},
                        {depositUserNum},
                        {orderUserNum},
                        {newAddRegister},
                        {currentNewAddRegister}, 
                        {newAddDeposit},
                        {currentNewAddDeposit},
                        {avgNewAddDeposit},
                        {avgNewAddRegister}

                       )
                   })
                    that.cityList = dataDel;
                  var message = response.data.message
                    if(message === '用户登录超时'){
                        this.$router.push({path:'/login'})
                    }

                }).catch((error) => {
                    console.log(error)
                })
            }
        },
         computed: {
            ...mapGetters(['dataMonth','analysisType'])
        },
        mounted:function(){
            //this.mockDatas()
            this.month = this.$route.params.month.split('-')[1]
        },
        watch: {
                'dataMonth':{
                    handler:function(val){
                        var test = $('.currentMonth').text()
                        this.monthTitle = test
                        this.isNoData2 = false
                        this.isNoData = false
                        this.spinShow = true
                    },
                    deep:true
                },
                'analysisType': {
                    handler: function(n,o) {
                       if(n==1){
                           this.changePage()
                       }else{
                           this.cityList = []
                           this.isNoData = false
                           this.isNoData2 = false
                           this.spinShow = true
                       }
                    },
                    deep: true
                }
        }
    }
</script>
<style lang="scss" scoped>
    div.fiexedAssets {
        padding: 0 16px 16px 16px;
        box-sizing: border-box;
        position:relative;
        .demo-spin-icon-load{
            color:rgb(204, 204, 204);
            animation: ani-demo-spin 1s linear infinite;
        }
        @keyframes ani-demo-spin {
            from { transform: rotate(0deg);}
            50%  { transform: rotate(180deg);}
            to   { transform: rotate(360deg);}
        }
    }
    div.nodata{text-align:center;}
    div.nodata i{font-size:400px;color:#dedcdc;}
    div.title{
        width: 100%;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
    }
    div.table{
        position:relative;
        width: calc(100% - 32px);
        margin: 16px auto;
        overflow: auto;
        div.hidden{
            width: 200px;
            position: fixed;
            top: 49px;
            background: #fff;
            bottom: 0px;
            opacity:1;
            ul{
                li{
                   line-height: 31px;
                   height: 31px;
                   border-bottom: 1px solid #ddd; 
                }
                li.yellow{background:rgba(126, 181, 224, 0.55)}
                li.indent{padding-left:55px}
                li.space{height: 37px;line-height: 37px;background: #7eb5e0;}
            }
        }
        table{
            width: 100%;
            box-sizing: border-box;
            thead{
                tr{
                    background:rgb(126, 181, 224);
                    border:1px solid #ddd;
                    th{
                         min-width:200px;
                         &:nth-child(1){width:160px;}
                        .cityName{
                            text-align:center;
                            a{line-height:20px;height:20px;color:#fff;}
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
                tr.incoming,tr.cost,tr.profits,tr.car,tr.user{background:rgba(126, 181, 224, 0.55)}
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