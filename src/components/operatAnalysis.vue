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
                <!-- <div class="title">蜜蜂出行{{monthTitle}}月份经营报告</div> -->
                <p style="color: #bbbec4;padding: 0 16px 0px 16px;">*本表中标记为“当前“、”实时”的数据，均是统计到今日 0:00的数据。</p>
                <div class="table" id="analysis" v-scroll="onScroll" >
                     <div class="dataScroll">
                        <div class="fixedHeader">
                            <dl>
                                <dt class="fixedCorner" colspan="1">
                                    <div class="cityName">
                                        <div></div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd>
                                    <ul class="nowRate">
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                                <div>
                                                     <a style="cursor:default;" v-if="list.cityName=='全国'">{{list.cityName}}</a>
                                                     <a v-else target="_blank" :href="'#/index/orderAllData/manageReport/' + list.cityName + '&' + list.dataMonth + '&' +  list.cityId">{{list.cityName}}</a>
                                                </div>
                                                <div>
                                                    <span>当期</span>
                                                    <span>环比</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl> 
                        </div>
                        <div class="fixedBody">
                            <dl @mouseenter="enter" @mouseleave="leave">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div>归属车辆数</div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd >
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                                <div></div>
                                                <div>
                                                    <span>{{list.bikeNum.nowData}}</span>
                                                    <span>{{list.bikeNum.diff}}</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl class="incoming">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div>收入（元）</div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd >
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                            <div></div>
                                            <div>
                                                <span></span>
                                                <span class="spiece"></span>
                                            </div>
                                        </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl @mouseenter="enter" @mouseleave="leave">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div>总计费</div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd >
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.id">
                                            <div class="cityName">
                                            <div></div>
                                            <div>
                                                <span>{{list.orderAmountTot.nowData}}</span>
                                                <span>{{list.orderAmountTot.diff}}</span>
                                            </div>
                                        </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl @mouseenter="enter" @mouseleave="leave">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div>总实收</div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd >
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                            <div></div>
                                            <div>
                                                <span>{{list.payAmountTot.nowData}}</span>
                                                <span>{{list.payAmountTot.diff}}</span>
                                            </div>
                                    </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl @mouseenter="enter" @mouseleave="leave">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div>实收率（%）</div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd >
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                                <div></div>
                                                <div>
                                                    <span>{{list.actualYield.nowData}}</span>
                                                    <span>{{list.actualYield.diff}}</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl @mouseenter="enter" @mouseleave="leave">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div>单车计费收入</div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd >
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                            <div></div>
                                            <div>
                                                <span>{{list.sinBikeBillingIncome.nowData}}</span>
                                                <span>{{list.sinBikeBillingIncome.diff}}</span>
                                            </div>
                                    </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl @mouseenter="enter" @mouseleave="leave">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div>单车实际收入</div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd >
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                            <div></div>
                                            <div>
                                                <span>{{list.sinBikeRealityIncome.nowData}}</span>
                                                <span>{{list.sinBikeRealityIncome.diff}}</span>
                                            </div>
                                    </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl  class="cost">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div>成本（元）</div>
                                        <div>
                                            <span></span>
                                            <span ></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd >
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                                <div></div>
                                                <div>
                                                    <span></span>
                                                    <span class="spiece"></span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl @mouseenter="enter" @mouseleave="leave">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div>总成本</div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd >
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                                <div></div>
                                                <div>
                                                    <span>{{list.costTot.nowData}}</span>
                                                    <span>{{list.costTot.diff}}</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl @mouseenter="enter" @mouseleave="leave">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div>单车成本：</div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd>
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                                <div></div>
                                                <div>
                                                    <span>{{list.singleBikeCost.nowData}}</span>
                                                    <span>{{list.singleBikeCost.diff}}</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl @mouseenter="enter" @mouseleave="leave">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div class="bikeOperaMoney">
                                            <span class="subCategory">单车运维费用</span>
                                        </div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd>
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                                <div></div>
                                                <div>
                                                    <span>{{list.sinBikeManageMoney.nowData}}</span>
                                                    <span>{{list.sinBikeManageMoney.diff}}</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl @mouseenter="enter" @mouseleave="leave">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div class="bikeCostMoney">
                                            <span class="subCategory">单车摊销费用</span>
                                        </div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd>
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                                <div></div>
                                                <div>
                                                    <span>{{list.sinBikeDepreMoney.nowData}}</span>
                                                    <span>{{list.sinBikeDepreMoney.diff}}</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl class="profits">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div>营收（元）</div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd>
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                                <div></div>
                                                <div>
                                                    <span></span>
                                                    <span class="spiece"></span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl @mouseenter="enter" @mouseleave="leave">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div>税前毛利</div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd >
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                                <div></div>
                                                <div>
                                                    <span>{{list.grossMargin.nowData}}</span>
                                                    <span>{{list.grossMargin.diff}}</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl @mouseenter="enter" @mouseleave="leave">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div>单车实际利润（元）</div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd>
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                                <div></div>
                                                <div>
                                                    <span>{{list.sinBikeRealityProfit.nowData}}</span>
                                                    <span>{{list.sinBikeRealityProfit.diff}}</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl @mouseenter="enter" @mouseleave="leave">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div>单车投资收益率（%）</div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd>
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                                <div></div>
                                                <div>
                                                    <span>{{list.sinBikeInvestIncomeLv.nowData}}</span>
                                                    <span>{{list.sinBikeInvestIncomeLv.diff}}</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl @mouseenter="enter" @mouseleave="leave">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div>单车计费盈利率（%）</div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd>
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                                <div></div>
                                                <div>
                                                    <span>{{list.sinBikeBillingIncomeLv.nowData}}</span>
                                                    <span>{{list.sinBikeBillingIncomeLv.diff}}</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl @mouseenter="enter" @mouseleave="leave">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div>单车实际盈利率（%）</div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd >
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                                <div></div>
                                                <div>
                                                    <span>{{list.sinBikeRealityIncomeLv.nowData}}</span>
                                                    <span>{{list.sinBikeRealityIncomeLv.diff}}</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl  class="car">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div>车辆</div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                    <dd >
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                                <div></div>
                                                <div>
                                                    <span></span>
                                                    <span class="spiece"></span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl @mouseenter="enter" @mouseleave="leave">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div>投产车辆数（日均）</div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd >
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                                <div></div>
                                                <div>
                                                    <span>{{list.avgProducteBikeNum.nowData}}</span>
                                                    <span>{{list.avgProducteBikeNum.diff}}</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl @mouseenter="enter" @mouseleave="leave">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div>投产率（日均）</div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd >
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                                <div></div>
                                                <div>
                                                    <span>{{list.avgProductionLv.nowData}}</span>
                                                    <span>{{list.avgProductionLv.diff}}</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl @mouseenter="enter" @mouseleave="leave">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div>单车日均订单数</div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd >
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                                <div></div>
                                                <div>
                                                    <span>{{list.avgSinBikeOrderNum.nowData}}</span>
                                                    <span>{{list.avgSinBikeOrderNum.diff}}</span>
                                                </div>
                                            </div>  
                                        </li>
                                    </ul>
                                    
                                </dd>
                            </dl>
                            <dl @mouseenter="enter" @mouseleave="leave">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div>单车平均用户数</div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd >
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                                <div></div>
                                                <div>
                                                    <span>{{list.avgSinBikeUserNum.nowData}}</span>
                                                    <span>{{list.avgSinBikeUserNum.diff}}</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl @mouseenter="enter" @mouseleave="leave">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div>单车平均押金用户数（当前）</div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd>
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                                <div></div>
                                                <div>
                                                    <span>{{list.avgSinBikeDepositUserNumDay.nowData}}</span>
                                                    <span>{{list.avgSinBikeDepositUserNumDay.diff}}</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl class="user">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div>用户</div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd>
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                                <div></div>
                                                <div>
                                                    <span></span>
                                                    <span class="spiece"></span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl @mouseenter="enter" @mouseleave="leave">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div>注册用户数（累计）</div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd >
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                                <div></div>
                                                <div>
                                                    <span>{{list.registerUserNum.nowData}}</span>
                                                    <span>{{list.registerUserNum.diff}}</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl @mouseenter="enter" @mouseleave="leave">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div>押金用户数（实时）</div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd >
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                                <div></div>
                                                <div>
                                                    <span>{{list.depositUserNum.nowData}}</span>
                                                    <span>{{list.depositUserNum.diff}}</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl @mouseenter="enter" @mouseleave="leave">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div>订单用户数（当期）</div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd >
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                                <div></div>
                                                <div>
                                                    <span>{{list.orderUserNum.nowData}}</span>
                                                    <span>{{list.orderUserNum.diff}}</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl class="addRegister">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div>新增注册：</div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd >
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                                <div></div>
                                                <div>
                                                    <span></span>
                                                    <span class="spiece"></span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl @mouseenter="enter" @mouseleave="leave">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div class="bikeOperaMoney">
                                            <span class="subCategory">当期</span>
                                        </div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd >
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                                <div></div>
                                                <div>
                                                    <span>{{list.currentNewAddRegister.nowData}}</span>
                                                    <span>{{list.currentNewAddRegister.diff}}</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl @mouseenter="enter" @mouseleave="leave">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div class="bikeOperaMoney">
                                            <span class="subCategory">日均</span>
                                        </div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd >
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                                <div></div>
                                                <div>
                                                    <span>{{list.avgNewAddRegister.nowData}}</span>
                                                    <span>{{list.avgNewAddRegister.diff}}</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl class="addDeposit">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div>新增押金：</div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd >
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                                <div></div>
                                                <div>
                                                    <span></span>
                                                    <span class="spiece"></span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl @mouseenter="enter" @mouseleave="leave">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div class="bikeOperaMoney">
                                            <span class="subCategory">当期</span>
                                        </div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd>
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                            <div class="cityName">
                                                <div></div>
                                                <div>
                                                    <span>{{list.currentNewAddDeposit.nowData}}</span>
                                                    <span>{{list.currentNewAddDeposit.diff}}</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl @mouseenter="enter" @mouseleave="leave">
                                <dt>
                                    <div class="cityName leftTitle">
                                        <div class="bikeOperaMoney">
                                            <span class="subCategory">日均</span>
                                        </div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd >
                                    <ul>
                                        <li v-for="list of cityList" v-bind:key="list.cityId">
                                                <div class="cityName">
                                                <div></div>
                                                <div>
                                                    <span>{{list.avgNewAddDeposit.nowData}}</span>
                                                    <span>{{list.avgNewAddDeposit.diff}}</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    
                                </dd>
                            </dl>
                        </div>
                    </div>
                 
                   
                </div>
            </div>
        
        </div>
    </div>
</template>
<script>
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
                fHeader:true,
            }    
        },
        methods:{
            enter(e){
                e.target.style.backgroundColor = "#ebf7ff"
                e.target.children[0].style.backgroundColor = "#ebf7ff"
                e.target.children[1].style.backgroundColor = "#ebf7ff"
                // e.target.style.color = "#fff"
                // e.target.children[0].style.color="#fff";
                // e.target.children[1].style.color="#fff";
            },
            leave(e){
                e.target.style.backgroundColor = "#fff"
                e.target.children[0].style.backgroundColor = "#fff"
                e.target.children[1].style.backgroundColor = "#fff"
                e.target.style.color = "#495060"
                e.target.children[0].style.color="#495060";
                e.target.children[1].style.color="#495060";
            },
            fx(){
                 var liW = $('#analysis div.fixedHeader ul li').outerWidth()
                 var len = $('#analysis div.fixedHeader dd ul li').length
                 var bodyliW = $('#analysis div.fixedHeader ul li').outerWidth()
                 var bodylen = $('#analysis div.fixedHeader dd ul li').length
                 var dtW = $('#analysis div.fixedBody dl dt').outerWidth()
                 var availHeight = document.documentElement.clientHeight||document.body.clientHeight ;
                var h1 = $('.ivu-tabs-bar').outerHeight()
                var h2 = $('.monthSelect').outerHeight()
                var h3 = $('.title').outerHeight()
                $('#analysis').height(availHeight - h1 - h2 -h3 - 70)
                $('#analysis div.fixedHeader dd ul').width(len*liW - 6)
                $('#analysis div.fixedBody dd ul').width(bodylen*bodyliW)
                $('#analysis div.fixedBody').width(bodylen*bodyliW + dtW )
            },
            onScroll(e,position){
               // $('.scrollable-rows-table').stop(true).animate({marginTop:-position.scrollTop - 3},30)
                //$('.scrollable-rows-table').css({marginTop:-position.scrollTop  + 'px'})
                 //$('.scrollable-columns-table').css({marginLeft:-position.scrollLeft  + 'px'})
                //$('.scrollable-columns-table').stop(true).animate({marginLeft:-position.scrollLeft - 3},30)
                $('#analysis div.fixedHeader dl dt').css({
                    left : position.scrollLeft + 'px'
                })
                 $('#analysis div.fixedBody dl dt').css({
                    left : position.scrollLeft + 'px'
                })
                $('#analysis div.fixedHeader').css({
                    top: position.scrollTop + 'px'
                })
            },
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
                    setTimeout(()=>{
                        this.fx()
                         //$('div.dataScroll').width(bodylen*bodyliW + dtW)
                    },30)
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
            window.addEventListener('resize',this.fx())
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
div.fixedHeader{
    position: absolute;
    top:0;
    background:#fff;
    dl{
        background:#7eb5e0;
        padding-left:163px;
        dt{ color:#495060;z-index:33;width:163px;height:38px;position:absolute;left:0;border:1px solid#ddd;background:#fff;}
        dd{ color:#495060;
            ul{
                overflow:hidden;
                li{text-align:center;float:left;min-width:200px;border:1px solid #ddd;margin-left:-1px;
                    span{
                        width:50%;
                        display: inline-block;
                        text-align: center;
                        float: left;
                    }
                    a{
                        color:rgb(73, 80, 96)
                    }
                }
            }
        }
    }
}
div.fixedBody{
    overflow:hidden;
    // // dl.incoming{background:#def3f3;}
    // dl.incoming dt {background:#def3f3;}
    // // dl.cost{background:#def3f3;}
    // dl.cost dt {background:#def3f3;}
    // // dl.profits{background:#def3f3;}
    // dl.profits dt {background:#def3f3;}
    // // dl.car{background:#def3f3;}
    // dl.car dt {background:#def3f3;}
    // // dl.user{background:#def3f3;}
    // dl.user dt {background:#def3f3;}
    dl{
        padding-left:163px;
        dt{z-index: 99; color:#495060;width:163px;height:38px;line-height:38px;position:absolute;left:0;border:1px solid #ddd;border-top:none;background:#fff;text-indent: 5px;}
        dd{
            color:#495060;
            ul{
                overflow:hidden;
                li{ height:38px;line-height:38px;text-align:center;float:left;min-width:200px;border:1px solid #ddd;margin-left:-1px;border-top:none; 
                    span{
                        width:50%;
                        height: 38px;
                        line-height:38px;
                        display: inline-block;
                        text-align: center;
                        float: left;
                        border-right:1px solid #ddd;
                        &:nth-last-child(1){border-right:none;}
                    }
                }
            }
        }
    }
    dl.incoming{
        background:#f8f8f9;
        dt{
           background:#f8f8f9; 
           border-right:#f8f8f9;
        }
        dd{
            ul{
                li{ border-right:#f8f8f9;
                     &:nth-last-child(1){
                         span.spiece{position:relative;
                            &:after{
                                    display:'block';
                                    content:'.';
                                    width:1px;
                                    height: 48px;
                                    background:#ddd;
                                    position: absolute;
                                    right:0;top:0;
                                }
                        }
                    }
                }
            }
            span{
                border-right:#f8f8f9;
                :nth-child(1){border-right:#f8f8f9;
                }
               
            }
            span.spiece{position:relative;
                 &:after{
                        display:'block';
                        content:'.';
                        width:1px;
                        height: 48px;
                        background:#f8f8f9;
                        position: absolute;
                        right:0;top:0;
                    }
            }
        }
    }
    dl.cost{
          background:#f8f8f9;
        dt{
           background:#f8f8f9; 
           border-right:#f8f8f9;
        }
        dd{
            ul{
                li{ border-right:#f8f8f9;
                     &:nth-last-child(1){
                         span.spiece{position:relative;
                            &:after{
                                    display:'block';
                                    content:'.';
                                    width:1px;
                                    height: 48px;
                                    background:#ddd;
                                    position: absolute;
                                    right:0;top:0;
                                }
                        }
                    }
                }
            }
            span{
                border-right:#f8f8f9;
                :nth-child(1){border-right:#f8f8f9;
                }
               
            }
            span.spiece{position:relative;
                 &:after{
                        display:'block';
                        content:'.';
                        width:1px;
                        height: 48px;
                        background:#f8f8f9;
                        position: absolute;
                        right:0;top:0;
                    }
            }
        }
    }
    dl.profits{
          background:#f8f8f9;
        dt{
           background:#f8f8f9; 
           border-right:#f8f8f9;
        }
        dd{
            ul{
                li{ border-right:#f8f8f9;
                     &:nth-last-child(1){
                         span.spiece{position:relative;
                            &:after{
                                    display:'block';
                                    content:'.';
                                    width:1px;
                                    height: 48px;
                                    background:#ddd;
                                    position: absolute;
                                    right:0;top:0;
                                }
                        }
                    }
                }
            }
            span{
                border-right:#f8f8f9;
                :nth-child(1){border-right:#f8f8f9;
                }
               
            }
            span.spiece{position:relative;
                 &:after{
                        display:'block';
                        content:'.';
                        width:1px;
                        height: 48px;
                        background:#f8f8f9;
                        position: absolute;
                        right:0;top:0;
                    }
            }
        }
    }
    dl.car{
          background:#f8f8f9;
        dt{
           background:#f8f8f9; 
           border-right:#f8f8f9;
        }
        dd{
            ul{
                li{ border-right:#f8f8f9;
                     &:nth-last-child(1){
                         span.spiece{position:relative;
                            &:after{
                                    display:'block';
                                    content:'.';
                                    width:1px;
                                    height: 48px;
                                    background:#ddd;
                                    position: absolute;
                                    right:0;top:0;
                                }
                        }
                    }
                }
            }
            span{
                border-right:#f8f8f9;
                :nth-child(1){border-right:#f8f8f9;
                }
               
            }
            span.spiece{position:relative;
                 &:after{
                        display:'block';
                        content:'.';
                        width:1px;
                        height: 48px;
                        background:#f8f8f9;
                        position: absolute;
                        right:0;top:0;
                    }
            }
        }
    }
    dl.user{
          background:#f8f8f9;
        dt{
           background:#f8f8f9; 
           border-right:#f8f8f9;
        }
        dd{
            ul{
                li{ border-right:#f8f8f9;
                     &:nth-last-child(1){
                         span.spiece{position:relative;
                            &:after{
                                    display:'block';
                                    content:'.';
                                    width:1px;
                                    height: 48px;
                                    background:#ddd;
                                    position: absolute;
                                    right:0;top:0;
                                }
                        }
                    }
                }
            }
            span{
                border-right:#f8f8f9;
                :nth-child(1){border-right:#f8f8f9;
                }
               
            }
            span.spiece{position:relative;
                 &:after{
                        display:'block';
                        content:'.';
                        width:1px;
                        height: 48px;
                        background:#f8f8f9;
                        position: absolute;
                        right:0;top:0;
                    }
            }
        }
    }
    dl.addRegister{
         
        dt{
         
           border-right:#ddd;
        }
        dd{
            ul{
                li{ border-right:#ddd;
                    &:nth-last-child(1){
                         span.spiece{position:relative;
                            &:after{
                                    display:'block';
                                    content:'.';
                                    width:1px;
                                    height: 48px;
                                    background:#ddd;
                                    position: absolute;
                                    right:0;top:0;
                                }
                        }
                    }
                }
                
            }
            span{
                border-right:#ddd;
                :nth-child(1){border-right:#ddd;
                }
               
            }
            span.spiece{position:relative;
                 &:after{
                        display:'block';
                        content:'.';
                        width:1px;
                        height: 48px;
                        background:#fff;
                        position: absolute;
                        right:0;top:0;
                    }
            }
        }
    } 
   dl.addDeposit{
         
        dt{
          
           border-right:#ddd;
        }
        dd{
            ul{
                li{ border-right:#ddd;
                    &:nth-last-child(1){
                         span.spiece{position:relative;
                            &:after{
                                    display:'block';
                                    content:'.';
                                    width:1px;
                                    height: 48px;
                                    background:#ddd;
                                    position: absolute;
                                    right:0;top:0;
                                }
                        }
                    }
                }
            }
            span{
                border-right:#ddd;
                :nth-child(1){border-right:#ddd;
                }
               
            }
            span.spiece{position:relative;
                 &:after{
                        display:'block';
                        content:'.';
                        width:1px;
                        height: 48px;
                        background:#fff;
                        position: absolute;
                        right:0;top:0;
                    }
            }
        }
    }  
    
    
}


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
        margin-top: -10px;
        margin-bottom: 8px;
    }
    
    div.table{
        position:relative;
        width: calc(100% - 32px);
        margin: 16px auto;
        overflow: auto;
        height:380px;
        padding-top:38px;
        div.hidden{
            display:none;
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
                // li.yellow{background:rgba(126, 181, 224, 0.55)}
                // li.indent{padding-left:55px}
                // li.space{height: 37px;line-height: 37px;background: #7eb5e0;}
            }
        }
        
    }
    
   
</style>