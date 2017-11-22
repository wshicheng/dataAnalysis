<template>
  <div id="report_body">
      <h3>
          蜜蜂出行{{city}}{{month}}月经营分析报告
      </h3>

      <div class="report_table">
            <Spin fix size="large" v-if="spinShow"  class="spin">
                <Icon type="load-c" size=18 class="demo-spin-icon-load" style="color: #ccc;"></Icon>
                <div style="color: #ccc; text-indent: 5px;">  正在为您疯狂生成报告...</div>
            </Spin>
            <!-- <Table :columns="tableColumn" :data="reportData"></Table> -->
        <div class="tabler-border" v-if="dataReturn">
            <p style="color: rgb(187, 190, 196);margin: 10px 7px;">*本表中标记为“当前“、”实时”的数据，均是统计到今日 0:00的数据。</p>
            <Row class="one">
                <Col span="12"><span style='text-align: left;text-indent: 47px;'>分类</span></Col>
                <Col span="6"><span style="text-align: right;padding-right: 10px;">{{month}}月</span></Col>
                <Col span="6"><span style="text-align: right;padding-right: 10px;">环比</span></Col>
            </Row>
            <!-- 车辆模块 -->
            <Row class="other">
                <Col span="12" class="title_level1"><span><b>1 车辆</b></span></Col>
                <Col span="6"><span></span></Col>
                <Col span="6"><span></span></Col>
            </Row>
            <Row class='other'>
                <Col span="12"  class="title_level2"><span><b title='期末归属车辆数'>1.1 归属车辆数</b></span></Col>
                <Col span="6" class="content"><span>{{data[0].bikeNum}}</span></Col>
                <Col span="6" class="content"><span>{{data[1].bikeNum}}</span></Col>
            </Row>
            <Row class='other'>
                <Col span="12"  class="title_level2"><span><b title='日均投产车辆数/归属车辆数'>1.2 投产率(日均)</b></span></Col>
                <Col span="6" class="content"><span>{{data[0].avgProductionLv}}</span></Col>
                <Col span="6" class="content"><span>{{data[1].avgProductionLv}}</span></Col>
            </Row>
            <Row class='other'>
                <Col span="12"  class="title_level2"><span><b title="车辆损坏数">1.3 车损数</b></span></Col>
                <Col span="6" class="content"><span>{{data[0].bikeDamageNum}}</span></Col>
                <Col span="6" class="content"><span>{{data[1].bikeDamageNum}}</span></Col>
            </Row>
            <Row class='other'>
                <Col span="12"  class="title_level2"><span><b title="车损数/归属车辆数">1.4 车损率</b></span></Col>
                <Col span="6" class="content"><span>{{data[0].bikeDamageLv}}</span></Col>
                <Col span="6" class="content"><span>{{data[1].bikeDamageLv}}</span></Col>
            </Row>

            <!-- 用户模块 -->
            <Row class='other'>
                <Col span="12"  class="title_level1"><span><b>2 用户</b></span></Col>
                <Col span="6"><span></span></Col>
                <Col span="6"><span></span></Col>
            </Row>
            <Row class='other'>
                <Col span="12"  class="title_level2"><span><b title="累计到期末的注册用户数">2.1 注册用户数(累计)</b></span></Col>
                <Col span="6" class="content"><span>{{data[0].registerUserNum}}</span></Col>
                <Col span="6" class="content"><span>{{data[1].registerUserNum}}</span></Col>
            </Row>
                <!-- 用户三级列表 2.1  -->
                <Row class='other'>
                    <Col span="12"  class="title_level3"><span><b title="当期新增注册的用户数">2.1.1 新增注册</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].currentNewAddRegister}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].currentNewAddRegister}}</span></Col>
                </Row>
                <Row class='other'>
                    <Col span="12"  class="title_level3"><span><b title="注册用户数（累计）/归属车辆数">2.1.2 车均注册</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].avgBikeRegisterUserNum}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].avgBikeRegisterUserNum}}</span></Col>
                </Row>

            <Row class='other'>
                <Col span="12"  class="title_level2"><span><b title="注册用户数中当前查询时间还有押金留存的用户数">2.2 押金用户总数(实时)</b></span></Col>
                <Col span="6" class="content"><span>{{data[0].depositUserNum}}</span></Col>
                <Col span="6" class="content"><span>{{data[1].depositUserNum}}</span></Col>
            </Row>
                <!-- 用户三级列表 2.2  -->
                <Row class='other'>
                    <Col span="12"  class="title_level3"><span><b title="新增注册中当前查询时间还有押金留存的用户数">2.2.1 新增押金</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].newAddDepositUserNum}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].newAddDepositUserNum}}</span></Col>
                </Row>
                <Row class='other'>
                    <Col span="12"  class="title_level3"><span><b title="押金用户总数（实时）/归属车辆数">2.2.2 车均押金</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].avgBikeDepositUserNum}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].avgBikeDepositUserNum}}</span></Col>
                </Row>
                <Row class='other'>
                    <Col span="12"  class="title_level3"><span><b title="交过押金但是在当前查询时间押金已退的用户数">2.2.3 已退押金</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].backDepositUserNum}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].backDepositUserNum}}</span></Col>
                </Row>

            <Row class='other'>
                <Col span="12"  class="title_level2"><span><b title="当期有过有效订单的用户数">2.3 订单用户数</b></span></Col>
                <Col span="6" class="content"><span>{{data[0].orderUserNum}}</span></Col>
                <Col span="6" class="content"><span>{{data[1].orderUserNum}}</span></Col>
            </Row>
                <!-- 用户三级列表 2.3  -->
                <Row class='other'>
                    <Col span="12"  class="title_level3"><span><b title="新增注册中当期有过有效订单的用户数">2.3.1 新增订单用户数</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].newAddOrderUserNum}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].newAddOrderUserNum}}</span></Col>
                </Row>
                <Row class='other'>
                    <Col span="12"  class="title_level3"><span><b title="注册用户（累计）中，在当前查询时间前30日未有有效订单的用户数">2.3.2 沉默用户</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].silenceUserNum}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].silenceUserNum}}</span></Col>
                </Row>

            <!-- 收入 -->
            <Row class='other'>
                <Col span="12"  class="title_level1"><span><b title="你好啊">3 收入</b></span></Col>
                <Col span="6"><span></span></Col>
                <Col span="6"><span></span></Col>
            </Row>
            <Row class='other'>
                <Col span="12"  class="title_level2"><span><b title="当期有效订单总数">3.1 总订单数</b></span></Col>
                <Col span="6" class="content"><span>{{data[0].orderNum}}</span></Col>
                <Col span="6" class="content"><span>{{data[1].orderNum}}</span></Col>
            </Row>
                <!-- 收入三级列表 3.1  -->
                <Row class='other'>
                    <Col span="12"  class="title_level3"><span><b title="总订单数/当期天数">3.1.1 日均订单数</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].avgOrderNum}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].avgOrderNum}}</span></Col>
                </Row>
                <Row class='other'>
                    <Col span="12"  class="title_level3"><span><b title="日均订单数/归属车辆数">3.1.2 单车日均订单数</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].avgBikeOrderNum}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].avgBikeOrderNum}}</span></Col>
                </Row>

            <Row class='other'>
                <Col span="12"  class="title_level2"><span><b title="当期有效订单的订单金额总和">3.2 总计费</b></span></Col>
                <Col span="6" class="content"><span>{{data[0].orderAmountTot}}</span></Col>
                <Col span="6" class="content"><span>{{data[1].orderAmountTot}}</span></Col>
            </Row>
                <!-- 收入三级列表 3.2  -->
                <Row class='other'>
                    <Col span="12"  class="title_level3"><span><b title="总计费/当期天数">3.2.1 日均计费</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].avgOrderAmountTot}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].avgOrderAmountTot}}</span></Col>
                </Row>
                <Row class='other'>
                    <Col span="12"  class="title_level3"><span><b title="日均计费/归属车辆数">3.2.2 单车日均计费</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].avgBikeOrderAmountTot}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].avgBikeOrderAmountTot}}</span></Col>
                </Row>

            <Row class='other'>
                <Col span="12"  class="title_level2"><span><b title="当期有效订单的实收金额总和">3.3 总实收</b></span></Col>
                <Col span="6" class="content"><span>{{data[0].payAmountTot}}</span></Col>
                <Col span="6" class="content"><span>{{data[1].payAmountTot}}</span></Col>
            </Row>
                <!-- 收入三级列表 3.3  -->
                <Row class='other'>
                    <Col span="12"  class="title_level3"><span><b title="总实收/当期天数">3.3.1 日均实收</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].avgPayAmountTot}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].avgPayAmountTot}}</span></Col>
                </Row>
                <Row class='other'>
                    <Col span="12"  class="title_level3"><span><b title="日均实收/归属车辆数">3.3.2 单车日均实收</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].avgBikePayAmountTot}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].avgBikePayAmountTot}}</span></Col>
                </Row>
                <Row class='other'>
                    <Col span="12"  class="title_level3"><span><b title="总实收/总计费">3.3.3 实收率(%)</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].actualYield}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].actualYield}}</span></Col>
                </Row>

            <!-- 成本 -->
            <Row class='other'>
                <Col span="12"  class="title_level1"><span><b>4 成本</b></span></Col>
                <Col span="6"><span></span></Col>
                <Col span="6"><span></span></Col>
            </Row>
            <Row class='other'>
                <Col span="12"  class="title_level2"><span><b title="当期固定资产成本摊销总和">4.1 固定资产成本摊销</b></span></Col>
                <Col span="6" class="content"><span>{{data[0].fixedAssetsDepreciation}}</span></Col>
                <Col span="6" class="content"><span>{{data[1].fixedAssetsDepreciation}}</span></Col>
            </Row>
                <!-- 成本三级列表 4.1  -->
                <Row class='other'>
                    <Col span="12"  class="title_level3"><span><b title="当期小蜜蜂成本摊销总和，例如月成本=归属车辆数*单价/36">4.1.1 小蜜蜂</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].bikeDepreciation}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].bikeDepreciation}}</span></Col>
                </Row>
                <Row class='other'>
                    <Col span="12"  class="title_level4"><span><b title="当期电池成本摊销总和">电池</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].battDepreciation}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].battDepreciation}}</span></Col>
                </Row>
                <Row class='other'>
                    <Col span="12"  class="title_level4"><span><b title="当期运维工具车成本摊销总和">运维工具车</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].carDepreciation}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].carDepreciation}}</span></Col>
                </Row>
                <Row class='other'>
                    <Col span="12"  class="title_level4"><span><b title="当期机动车成本摊销总和">机动车</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].truckDepreciation}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].truckDepreciation}}</span></Col>
                </Row>

                <Row class='other'>
                    <Col span="12"  class="title_level3"><span><b title="建设+充电桩及电柜">4.1.2 电站</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].chargeDepreciation}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].chargeDepreciation}}</span></Col>
                </Row>
                <Row class='other'>
                    <Col span="12"  class="title_level4"><span><b title="电站建设费用摊销">建设</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].chargeBuildDepreciation}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].chargeBuildDepreciation}}</span></Col>
                </Row>
                <Row class='other'>
                    <Col span="12"  class="title_level4"><span><b title="充电桩及电柜费用摊销">设备</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].chargeCabinetDepreciation}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].chargeCabinetDepreciation}}</span></Col>
                </Row>

                <Row class='other'>
                    <Col span="12"  class="title_level3"><span><b title="一次性发生的固定资产运输费用，按36个月摊销">4.1.3 物流</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].transDepreciation}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].transDepreciation}}</span></Col>
                </Row>
                <Row class='other'>
                    <Col span="12"  class="title_level3"><span><b title="其他固定资产成本摊销">4.1.4 其他</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].otherDepreciation}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].otherDepreciation}}</span></Col>
                </Row>
                <Row class='other'>
                    <Col span="12"  class="title_level3"><span><b title="车辆电池总成本计提">4.1.5 当期车损计提(按5‰/月计提)</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].currentBikeWastSum}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].currentBikeWastSum}}</span></Col>
                </Row>
                <Row class='other'>
                    <Col span="12"  class="title_level3"><span><b title="固定资产总成本摊销/归属车辆数">4.1.6 单车摊销</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].singleBikeDepreciation}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].singleBikeDepreciation}}</span></Col>
                </Row>

            <Row class='other'>
                <Col span="12"  class="title_level2"><span><b title="当期运维费用合计">4.2 运维费用</b></span></Col>
                <Col span="6" class="content"><span>{{data[0].operateTotal}}</span></Col>
                <Col span="6" class="content"><span>{{data[1].operateTotal}}</span></Col>
            </Row>
                <!-- 成本三级列表 4.2  -->
                <Row class='other'>
                    <Col span="12"  class="title_level3"><span><b title="当期员工工资+福利">4.2.1 薪资福利</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].salaryMoney}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].salaryMoney}}</span></Col>
                </Row>
                <Row class='other'>
                    <Col span="12"  class="title_level3"><span><b title="包括住宿房租水电网、团建费等">4.2.2 其他人员成本</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].personnelMoney}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].personnelMoney}}</span></Col>
                </Row>
                <Row class='other'>
                    <Col span="12"  class="title_level3"><span><b title="当期仓库房租">4.2.3 房租(生产)</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].rentMoney}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].rentMoney}}</span></Col>
                </Row>
                <Row class='other'>
                    <Col span="12"  class="title_level3"><span><b title="当期仓库水电费">4.2.4 水电(生产)</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].hydropower}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].hydropower}}</span></Col>
                </Row>
                <Row class='other'>
                    <Col span="12"  class="title_level3"><span><b title="其他生产成本">4.2.5 其他生产成本</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].operationMoney}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].operationMoney}}</span></Col>
                </Row>
                <Row class='other'>
                    <Col span="12"  class="title_level3"><span><b title="当期其他经营费用">4.2.6 其它经营费用</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].manageMoney}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].manageMoney}}</span></Col>
                </Row>
                <Row class='other'>
                    <Col span="12"  class="title_level3"><span><b title="开城所产生的费用，正式投放前除固定资产外的费用">4.2.7 开城费</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].openMoney}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].openMoney}}</span></Col>
                </Row>
                <Row class='other'>
                    <Col span="12"  class="title_level3"><span><b title="运维费用/归属车辆数">4.2.8 单车运维费用</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].singleBikeOperateMoney}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].singleBikeOperateMoney}}</span></Col>
                </Row>

            <Row class='other'>
                <Col span="12"  class="title_level2"><span><b title="固定资产摊销（和硬件损耗 ）和城市运营费用">4.3 总成本</b></span></Col>
                <Col span="6" class="content"><span>{{data[0].totalCost}}</span></Col>
                <Col span="6" class="content"><span>{{data[1].totalCost}}</span></Col>
            </Row>
                <!-- 成本三级列表 4.3  -->
                <Row class='other'>
                    <Col span="12"  class="title_level3"><span><b title="当期成本/归属车辆数">4.3.1 单车成本</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].singleBikeCost}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].singleBikeCost}}</span></Col>
                </Row>
                <Row class='other'>
                    <Col span="12"  class="title_level3"><span><b title="单车成本/当期天数">4.3.2 单车日均成本</b></span></Col>
                    <Col span="6" class="content"><span>{{data[0].singleBikeAvgCost}}</span></Col>
                    <Col span="6" class="content"><span>{{data[1].singleBikeAvgCost}}</span></Col>
                </Row>

            <!-- 盈亏分析 -->
            <Row class='other'>
                <Col span="12"  class="title_level1"><span style="text-indent: -134px;"><b>5 盈亏分析</b></span></Col>
                <Col span="6"><span></span></Col>
                <Col span="6"><span></span></Col>
            </Row>
            <Row class='other'>
                <Col span="12"  class="title_level2"><span><b title="总实收-总成本">5.1 利润</b></span></Col>
                <Col span="6" class="content"><span>{{data[0].grossMargin}}</span></Col>
                <Col span="6" class="content"><span>{{data[1].grossMargin}}</span></Col>
            </Row>
            <Row class='other'>
                <Col span="12"  class="title_level2"><span><b title="利润/总计费">5.2 计费盈利率(%)</b></span></Col>
                <Col span="6" class="content"><span>{{data[0].billingIncomeLv}}</span></Col>
                <Col span="6" class="content"><span>{{data[1].billingIncomeLv}}</span></Col>
            </Row>
            <Row class='other'>
                <Col span="12"  class="title_level2"><span><b title="利润/总实收">5.3 实收盈利率(%)</b></span></Col>
                <Col span="6" class="content"><span>{{data[0].realityIncomeLv}}</span></Col>
                <Col span="6" class="content"><span>{{data[1].realityIncomeLv}}</span></Col>
            </Row>
            <Row class='other'>
                <Col span="12"  class="title_level2"><span><b title="利润/归属车辆数">5.4 单车利润</b></span></Col>
                <Col span="6" class="content"><span>{{data[0].sinBikeProfit}}</span></Col>
                <Col span="6" class="content"><span>{{data[1].sinBikeProfit}}</span></Col>
            </Row>
            <Row class='other'>
                <Col span="12"  class="title_level2"><span><b title="单车利润/当期天数">5.5 单车日均利润</b></span></Col>
                <Col span="6" class="content"><span>{{data[0].sinBikeAvgProfit}}</span></Col>
                <Col span="6" class="content"><span>{{data[1].sinBikeAvgProfit}}</span></Col>
            </Row>
            <Row class='other'>
                <Col span="12"  class="title_level2"><span><b title="单车利润/单车总成本（非摊销成本）">5.6 单车投资收益率(%)</b></span></Col>
                <Col span="6" class="content"><span>{{data[0].sinBikeInvestIncomeLv}}</span></Col>
                <Col span="6" class="content"><span>{{data[1].sinBikeInvestIncomeLv}}</span></Col>
            </Row>
        </div>

        <div class="tabler-border" v-show="noDataShow" v-else>
            <Row class="one">
                <Col span="12"><span style='text-indent: -111px;'>分类</span></Col>
                <Col span="6"><span>{{month}}月</span></Col>
                <Col span="6"><span>环比</span></Col>
            </Row>
            <!-- 车辆模块 -->
            <Row class="other">
                <Col span="24" class="title_level1" style="text-indent: -2px;"><span>暂无数据</span></Col>
            </Row>
        </div>
            
      </div>
  </div>
</template>
<style lang='scss' scoped type="text/css">
    #report_body {
            width: 1200px;
            margin: 0 auto;
        h3 {
            width: 100%;
            height: 60px;
            line-height: 60px;
            background: #797979;
            font-size: 23px;
            font-weight: bolder;
            margin: 0 auto;
            color: #fff;
            text-align: center;
        }

        .report_table {
            .spin {
                position: absolute;
                display: inline-block;
                // background-color: rgba(253, 248, 248,0.0); 
                background-color: rgba(255, 255, 255, 0.8); 
            }
            .tabler-border {
                border: 1px solid #ddd;
                overflow: hidden;
                width: 100%;
                margin: 0 auto;
                .one {
                    background: #ccc;
                }
                span {
                    display: inline-block;
                    color: #444;
                    text-align: center;
                    height: 30px;
                    font-weight: 400;
                    line-height: 30px;
                    width: 100%;
                    font-size: 13px;
                }
                .other {
                    .content {
                        background: rgba(173,216,230,0.3);
                        padding: 3px;
                        border-radius: 3px;
                        border: 1px solid #fff;
                        border-right: none;
                        font-weight: 400;
                        border-bottom: none;
                        span {
                            font-weight: 400;
                            text-align: right;
                            padding-right: 10px;
                        }
                    }
                    .title_level1 {
                        text-indent: -162px;
                        font-weight: 400;
                        cursor: pointer;
                        span {
                            font-weight: 400;
                            b {
                                font-weight: 400;
                            }
                        }
                    }
                    .title_level2 {
                        cursor: pointer;
                        // width: 200px;
                        // background: #f60;
                        overflow: hidden;
                        b {
                            text-align: left;
                            width: 100%;
                            font-weight: 400;
                            float: left;
                            text-indent: 51px;
                            cursor: pointer;
                        }
                    }
                    .title_level3 {
                        cursor: pointer;
                        overflow: hidden;
                        b {
                            text-align: left;
                            float: left;
                            font-weight: 400;
                            cursor: pointer;
                            text-indent: 78px;
                        }
                    }
                    .title_level4 {
                        overflow: hidden;
                        cursor: pointer;
                        b {
                            text-align: left;
                            cursor: pointer;
                            font-weight: 400;
                            float: left;
                            text-indent: 119px;
                        }                   
                    }
                }
            }
        }
    }
</style>
<script>
export default {
    data () {
        var month = '10'
        // var html = `<>`
        return {
            city: '无为县',
            month: '12',
            spinShow: false,
            dataReturn: false,
            tableColumn: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h) => {
                            return h(html)
                        }
                    },
                    {
                        title: '分类',
                        key: 'type'
                    },
                    {
                        title: month + '月',
                        key: 'month'
                    },
                    {
                        title: '环比',
                        key: 'percent'
                    }
            ],
            noDataShow: false,
            data: []
        }
    },
    mounted () {
        document.title = '城市经验分析 - 经营月报表统计'
        this.loadData()
    },
    methods: {
        loadData () {
            this.spinShow = true
            this.noDataShow = false

            this.city = this.$route.params.id.split('&')[0]
            this.month = this.$route.params.id.split('&')[1]
            this.cityCode = this.$route.params.id.split('&')[2]

            // var dataMonth = this.month

            this.axios.get('/beefly/monthDataDetail/api/v1/singleCityAnalysis', {
                params: {
                    accessToken: this.$store.state.token,
                    dataMonth: this.month,
                    cityCode: this.cityCode
                }
            })
            .then( res => {
                this.checkLogin(res)
                var data = res.data.data

                if (res.data.resultCode === 1) {
                    this.dataReturn = true
                    this.noDataShow = false
                    this.data = data
                } else {
                    this.noDataShow = true
                    this.dataReturn = false
                }

                this.spinShow = false
                console.log(res.data.data)
            })
            .catch( err => {
                this.noDataShow = true
                this.spinShow = false
                console.log(err)
            })
        },
        checkLogin (res) {
           if (res.data.message === '用户登录超时') {
                this.$router.push('/login')
           }
        }
    }
}
</script>