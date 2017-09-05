<template>
    <div>
        <div>
            <!--车辆运营状态分布（运营中 非运营）-->
        </div>
        <div id="container2" ></div>
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
            console.log(Highcharts)
            // 创建图表
            var options = {
                /*Highcharts 配置*/
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
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
                tooltip: {
                    headerFormat: '{series.name}<br>',
                    pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            distance: -50,
                            style: {
                                fontWeight: 'bold',
                                color: 'white',
                                textShadow: '0px 1px 2px black'
                            },
                            startAngle: 0,
                            endAngle: 90,
                            center: ['50%', '25%'],
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: '车辆运营状态分布',
                    data: [
                        {
                            name: '非运营',
                            y: 4000213,
                            color:'rgb(72, 207, 174)'
                        },
                        {
                            name: '运营中',
                            y: 14000213,
                            color:'rgb(252, 141, 82)'
                        }
                        
                    ]
                }]
            }
            new Highcharts.chart('container2', options);
        }
    },
    mounted(){
        this.generalCharts()
    }
}
</script>
<style lang="scss" scoped>
#container2 {
    width: 100%;
    height: 240px;
}
</style>

