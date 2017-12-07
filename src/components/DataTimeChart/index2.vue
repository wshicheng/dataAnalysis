<template>
    <div id="container" style="min-width:400px;height:400px;border-top: 10px solid #fff;">
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
                title: {
                    text: title
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
                exporting: {
                    enabled: false
                },
                credits:{
                   enabled:false
                },
                colors: ['#4472c4', '#ed7d31', '#9999ff', '#ffc000', '#5b9bd5', '#70ad48', '#264478', '#9e480e', '#636363', '#997300'],
                xAxis: {
                    categories:xAxis
                },
                yAxis:{
                            opposite: false,
                            tickPositions: [0, 20, 40, 60, 80,100],
                            title: {
                                text: '',
                                style: {
                                    color: '#9999ff'
                                }
                            },
                            labels: {                        
                                // formatter:function(){
                                //     if (Number(this.value) <= 100) {
                                //         return this.value + '%'
                                //     } else {
                                //         return 100 + '%'
                                //     }
                                // },
                                format: '{value}%',
                                style: {
                                    color: '#9999ff'
                                }
                            }
                        },
                legend: {
                    align: 'right',
                    x: -30,
                    verticalAlign: 'top',
                    y: 25,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                    borderColor: '#CCC',
                    borderWidth: 1,
                    shadow: false
                },
                tooltip: {
                    formatter: function() {
                         return type + ':' + this.x + '<br>' + '占比' + ':' + (this.y) + '%';
                        // if(type=='频次分布'){
                        //     return '<b>' + this.x + '</b><br/>' +
                        //     this.series.name + ': ' + (this.y) + '%' + '<br/>' 
                        // }else{
                        //     return '<b>' + this.x + '</b><br/>' +
                        //     this.series.name + ': ' + (this.y) + '<br/>'
                            
                        // }
                        
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: false,
                            // color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                            style: {
                                // textShadow: '0 0 3px black'
                                color: '#444'
                            }
                        },
                        maxPointWidth: 100
                    }
                },
                series: data
            }

            new Highcharts.chart('container', options);
        },
    },
    props:['toolType','type','title','xAxis','chartData','subtitle'],
    mounted() {
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