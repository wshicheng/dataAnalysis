<template>
    <div id="container" style="min-width:400px;height:400px">
    </div>
</template>
<script>
var Highcharts = require('highcharts');
// 在 Highcharts 加载之后加载功能模块
require('highcharts/modules/exporting')(Highcharts);

export default {
    methods: {
        initChart(title,xAxis,data) {
            var options = {
                chart: {
                    type: 'column'
                },
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                title: {
                    text: title
                },

                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                xAxis: {
                    categories:xAxis ,
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    }
                },
               tooltip: {
                   
                    formatter: function() {  
                      
                       return '时长分布:' + this.x + '<br>' + '单数' + ':' + Highcharts.numberFormat(this.point.y, 0,"",",");
                        
                    }                 
                },
                series: [{
                    name: '东京',
                    data:data
                },
                ],
                 legend: {
                    enabled: false
                },
            }

            new Highcharts.chart('container', options);
        },
    },
    props:['title','xAxis','chartData'],
    mounted(){
        this.initChart(this.title,this.xAxis,this.chartData)
    },
    watch:{
       xAxis:{
           handler:function(n,o){
               this.initChart(this.title,this.xAxis,this.chartData)
           },
           deep:true
       },
        chartData:{
           handler:function(n,o){
               this.initChart(this.title,this.xAxis,this.chartData)
           },
           deep:true
       } 
    }
}
</script>