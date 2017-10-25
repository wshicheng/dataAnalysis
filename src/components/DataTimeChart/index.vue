<template>
    <div id="container" style="min-width:400px;height:400px; border-top: 10px solid #fff;">
    </div>
</template>
<script>
var Highcharts = require('highcharts');
// 在 Highcharts 加载之后加载功能模块
require('highcharts/modules/exporting')(Highcharts);

export default {
    methods: {
        initChart(toolType,type,title,xAxis,data, subtitle) {
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
                subtitle: {
                    text: subtitle,
                    align: 'right',
                    verticalAlign: 'top',
                    style: {
                        color: '#ccc',
                        fontSize: '12px'
                    }
                },
                title: {
                    text: title
                },
                colors: ['#4472c4', '#ed7d31', '#9999ff', '#ffc000', '#5b9bd5', '#70ad48', '#264478', '#9e480e', '#636363', '#997300'],
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
                      
                       return type + ':' + this.x + '<br>' + toolType + ':' + Highcharts.numberFormat(this.point.y, 0,"",",");
                        
                    }                 
                },
                series: [{
                    name: '东京',
                    data:data,
                    maxPointWidth: 100
                },
                ],
                 legend: {
                    enabled: false
                },
            }

            new Highcharts.chart('container', options);
        },
    },
    props:['toolType','type','title','xAxis','chartData','subtitle'],
    mounted(){
        this.initChart(this.toolType,this.type,this.title,this.xAxis,this.chartData, this.subtitle)
    },
    watch:{
       xAxis:{
           handler:function(n,o){
               this.initChart(this.toolType,this.type,this.title,this.xAxis,this.chartData, this.subtitle)
           },
           deep:true
       },
        chartData:{
           handler:function(n,o){
               this.initChart(this.toolType,this.type,this.title,this.xAxis,this.chartData, this.subtitle)
           },
           deep:true
       } 
    }
}
</script>