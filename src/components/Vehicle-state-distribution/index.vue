<template>
    <div>
        <div>
            <!--车辆状态分布
                        待出租
                        已预定
                        已出租
                        维护中
                        寻车中
                        已丢失
                        已下线
                        库存中
                        返修中
                        已报废            
                    -->
        </div>
        <div id="container" ></div>
    </div>
</template>
<script>
var Highcharts = require('highcharts');
// 在 Highcharts 加载之后加载功能模块
require('highcharts/modules/exporting')(Highcharts);


export default {
    data() {
        return {}
    },
    methods: {
        generalCharts() {
            var colors = Highcharts.getOptions().colors,
                categories = ['运营中', '非运营'],
                data = [{
                    y: 80,
                    color: colors[0],
                    drilldown: {
                        name: 'IE 版本',
                        categories: ['待出租', '已预定', '已出租', '维护中','寻车中','已丢失','已下线'],
                        data: [10.85, 7.35, 33.06, 2.81,6.32,11.28,16.37],
                        color: colors[0]
                    }
                }, {
                    y: 20,
                    color: colors[1],
                    drilldown: {
                        name: 'Firefox 版本',
                        categories: ['库存中', '待上线', '返修中', '已报废', '已下线'],
                        data: [0.20, 0.83, 1.58, 13.12, 5.43],
                        color: colors[1]
                    }
                }],
                browserData = [],
                versionsData = [],
                i,
                j,
                dataLen = data.length,
                drillDataLen,
                brightness;
            // 构建数据数组
            for (i = 0; i < dataLen; i += 1) {
                // 添加运营状态数据
                browserData.push({
                    name: categories[i],
                    y: data[i].y,
                    color: data[i].color
                });
                // 添加各状态数据
                drillDataLen = data[i].drilldown.data.length;
                for (j = 0; j < drillDataLen; j += 1) {
                    brightness = 0.2 - (j / drillDataLen) / 5;
                    versionsData.push({
                        name: data[i].drilldown.categories[j],
                        y: data[i].drilldown.data[j],
                        color: Highcharts.Color(data[i].color).brighten(brightness).get()
                    });
                }
            }
            // 创建图表
            var options = {
                chart: {
                    type: 'pie'
                },
                credits:{
                    enabled:false
                },
                exporting:{
                    enabled:false
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                yAxis: {
                    title: {
                        text: '总百分比市场份额'
                    }
                },
                plotOptions: {
                    pie: {
                        shadow: false,
                        center: ['50%', '50%']
                    }
                },
                tooltip: {
                    valueSuffix: '%'
                },
                series: [{
                    name: '比例',
                    data: browserData,
                    size: '60%',
                    dataLabels: {
                        formatter: function() {
                            return this.y > 5 ? this.point.name : null;
                        },
                        color: 'white',
                        distance: -50
                    }
                }, {
                    name: '比例',
                    data: versionsData,
                    size: '80%',
                    innerSize: '60%',
                    dataLabels: {
                        formatter: function() {
                            // 大于1则显示
                            return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
                        }
                    }
                }]
            }
            new Highcharts.chart('container', options);
        }
    },
    mounted() {
        this.generalCharts()
    }
}
</script>
<style lang="scss" scoped>
#container {
    width: 100%;
    height: 240px;
}
</style>

