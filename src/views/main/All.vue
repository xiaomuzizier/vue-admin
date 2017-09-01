<template>
    <section class="chart-container">
        <el-row>
            <el-col :span="24">
                <div id="chartPie" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="24">
                <div id="chartLine" style="width:100%; height:800px;"></div>
            </el-col>
            <el-col :span="24">
                <div id="chartBar" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="24">
                <div id="chartBarCompany" style="width:100%; height:400px;"></div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts'
    import axios from 'axios'
    import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
    //    import { addU } from '../../api/api';
    import * as api from './../../api/api';

    export default {
        components: { ElButton },
        data() {
            return {
                chartColumn: null,
                chartBar: null,
                chartBarCompany:null,
                chartLine: null,
                chartPie: null,
                list:null,

            }
        },
        route: {
            canReuse: false,
        },
        created(){
            this.path=this.$route.path;
            console.log('ni',this.$route.path);
            this.getList();
        },
        methods: {
//            genData() {
//                console.log('aaa');
//        var legendData = [];
//        var seriesData = [];
//        var projectLength=this.list.projectName.length;
//                for (var i = 0; i < projectLength-1; i++) {
//                    name = this.list.projectName[i];
//                    legendData.push(name);
//                    seriesData.push({
//                        name: name,
//                        value: this.list.projectNum[i]
//                    });
//                }
//        return {
//            legendData: legendData,
//            seriesData: seriesData
//        };
//    },
            getList(){
                let  para={
                    section:this.path.slice(1),
                };
                api.addU(para).then( (res)=> {
                    this.list = res.data;
                    console.log('1',this.list);
                    this.drawCharts();
                })
                    .catch( (error)=> {
                        console.log(error);
                    })
            },
            drawPieChart() {
                var projectLength=this.list.projectName.length;
                var name=this.list.projectName;
                var value=this.list.projectNum;
                console.log('a',projectLength);
                function genData(){
                    console.log('aaa');
                    var legendData = [];
                    var seriesData = [];
                    for (var i = 0; i < projectLength-1; i++) {
                        let   name1 = name[i];
                        let   value1=value[i];
                        legendData.push(name1);
                        seriesData.push({
                            name: name1,
                            value: value1
                        });
                    }
                    return {
                        legendData: legendData,
                        seriesData: seriesData
                    };
                };
                var dat=genData();
                console.log('aaaa',dat);
                this.chartPie = echarts.init(document.getElementById('chartPie'));
                this.chartPie.setOption({
                    title : {
                        text: '项目 占比图',
                        x:'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        type: 'scroll',
                        orient: 'vertical',
                        x: 'left',
                        data:dat.legendData
                    },
                    series: [
                        {
                            name:'项目：修改条数（占比）',
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '10',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:dat.seriesData
                        }
                    ]
                });
            },

            drawLineChart() {
                this.chartLine = echarts.init(document.getElementById('chartLine'));
                this.chartLine.setOption({title: {
                    text: '增加删除——时间  示意图',
                    x: 'center'
                },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            animation: false
                        }
                    },
                    legend: {
                        data:['增加量','删除量'],
                        x: 'left'
                    },
                    toolbox: {
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    axisPointer: {
                        link: {xAxisIndex: 'all'}
                    },
                    dataZoom: [
                        {
                            show: true,
                            realtime: true,
                            start: 30,
                            end: 70,
                            xAxisIndex: [0, 1]
                        },
                        {
                            type: 'inside',
                            realtime: true,
                            start: 30,
                            end: 70,
                            xAxisIndex: [0, 1]
                        }
                    ],
                    grid: [{
                        left: 70,
                        right: 50,
                        height: '35%'
                    }, {
                        left: 70,
                        right: 50,
                        top: '55%',
                        height: '35%'
                    }],
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            axisLine: {onZero: true},
                            data: this.list.dateList
                        },
                        {
                            gridIndex: 1,
                            type : 'category',
                            boundaryGap : false,
                            axisLine: {onZero: true},
                            data: this.list.dateList,
                            position: 'top'
                        }
                    ],
                    yAxis : [
                        {
                            name : '增加量',
                            type : 'value',
//                            max : 500
                        },
                        {
                            gridIndex: 1,
                            name : '删除量',
                            type : 'value',
                            inverse: true
                        }
                    ],
                    series : [
                        {
                            name:'增加量',
                            type:'line',
                            symbolSize: 8,
                            hoverAnimation: false,
                            data:this.list.insertList
                        },
                        {
                            name:'删除量',
                            type:'line',
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            symbolSize: 8,
                            hoverAnimation: false,
                            data: this.list.deleteList
                        }
                    ]
                });
            },

            drawBarChart() {
                this.chartBar = echarts.init(document.getElementById('chartBar'));
                this.chartBar.setOption({
                    color: ['#3398DB'],
                    title: {
                        text: '用户修改量 示意图',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: this.list.ownerName,
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '代码修改量',
                            type: 'bar',
                            barWidth: '30%',
                            data: this.list.ownerNum
                        }
                    ]
                })
            },
            drawBarCompanyChart() {
                this.chartBarCompany = echarts.init(document.getElementById('chartBarCompany'));
                this.chartBarCompany.setOption({
                    color: ['#3398DB'],
                    title: {
                        text: '公司修改量 示意图',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: this.list.companyName,
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '代码修改量',
                            type: 'bar',
                            barWidth: '30%',
                            data: this.list.companyNum
                        }
                    ]
                })
            },

            drawCharts() {
                this.drawPieChart()
                this.drawLineChart()
                this.drawBarChart()
                this. drawBarCompanyChart()

            },
        },

//        mounted () {
//            console.log('ddd',this.list);
//            this.drawCharts()
//        },
//        updated() {
//            this.drawCharts()
//        }
    }
</script>

<style scoped>
    .chart-container {
        width: 100%;
        float: left;
    }
    /*.chart div {
        height: 400px;
        float: left;
    }*/

    .el-col {
        padding: 30px 20px;
    }
</style>
