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
        <div id="container" style="height:400px"></div>
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
                categories = ['IE', 'Firefox', 'Chrome', 'Safari', 'Opera'],
                data = [{
                    y: 55.11,
                    color: colors[0],
                    drilldown: {
                        name: 'IE 版本',
                        categories: ['IE 6.0', 'IE 7.0', 'IE 8.0', 'IE 9.0'],
                        data: [10.85, 7.35, 33.06, 2.81],
                        color: colors[0]
                    }
                }, {
                    y: 21.63,
                    color: colors[1],
                    drilldown: {
                        name: 'Firefox 版本',
                        categories: ['Firefox 2.0', 'Firefox 3.0', 'Firefox 3.5', 'Firefox 3.6', 'Firefox 4.0'],
                        data: [0.20, 0.83, 1.58, 13.12, 5.43],
                        color: colors[1]
                    }
                }, {
                    y: 11.94,
                    color: colors[2],
                    drilldown: {
                        name: 'Chrome 版本',
                        categories: ['Chrome 5.0', 'Chrome 6.0', 'Chrome 7.0', 'Chrome 8.0', 'Chrome 9.0',
                            'Chrome 10.0', 'Chrome 11.0', 'Chrome 12.0'],
                        data: [0.12, 0.19, 0.12, 0.36, 0.32, 9.91, 0.50, 0.22],
                        color: colors[2]
                    }
                }, {
                    y: 7.15,
                    color: colors[3],
                    drilldown: {
                        name: 'Safari 版本',
                        categories: ['Safari 5.0', 'Safari 4.0', 'Safari Win 5.0', 'Safari 4.1', 'Safari/Maxthon',
                            'Safari 3.1', 'Safari 4.1'],
                        data: [4.55, 1.42, 0.23, 0.21, 0.20, 0.19, 0.14],
                        color: colors[3]
                    }
                }, {
                    y: 2.14,
                    color: colors[4],
                    drilldown: {
                        name: 'Opera 版本',
                        categories: ['Opera 9.x', 'Opera 10.x', 'Opera 11.x'],
                        data: [0.12, 0.37, 1.65],
                        color: colors[4]
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
                // 添加浏览器数据
                browserData.push({
                    name: categories[i],
                    y: data[i].y,
                    color: data[i].color
                });
                // 添加版本数据
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
                title: {
                    text: '2011年4月浏览器市场份额'
                },
                subtitle: {
                    text: '内环为浏览器品牌占比，外环为具体的版本'
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
                    name: '运营中',
                    data: browserData,
                    size: '60%',
                    dataLabels: {
                        formatter: function() {
                            return this.y > 5 ? this.point.name : null;
                        },
                        color: 'white',
                        distance: -30
                    }
                }, {
                    name: '车辆状态',
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
    width: 400px;
    height: 300px;
}
</style>

