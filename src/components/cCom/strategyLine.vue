
<!--局部样式-->
<style scoped>
    .chart {
        display: inline-block;
        position: relative;
        width: 100%;
    }

    .chartWarp {

    }
</style>

<!--局部覆盖样式-->
<style>

</style>

<template>
    <div class="chart">
        <div class="chartWarp" :style="autoChartWarpStyle"></div>
        <fcNodeEditWindow v-model="show" :value="value" @submit="handleSubmitNode"/>
    </div>
</template>

<script>
    import api from "../../api";

    export default {
        name: "chart",
        props: {
            height: {
                type: Number,
                default: 320,
            },
            //属性为增幅列表
            incList: {
                type: Array,
                default () { 
                    return [
                        {
                            incVU: 10,
                            keepS: 1,
                        },
                        {
                            incVU: 5,
                            keepS: 100,
                        },
                    ];
                }
            },
        },
        data () {
            return {
                //#region 页面对象
                    chartDom: null,
                    chart: null,
                //#endregion

                //#region 页面内容绑定数据
                    show: true,
                    value: {
                        incVU: "22",
                        keepS: 100,
                    },
                //#endregion

                //#region 页面样式绑定数据
                //#endregion
            };
        },
        watch: {
            autoOption () {

            },
        },
        computed: {
            //#region 图表配置计算属性
                //图表初始化配置
                autoOptionTemplate () {
                    return {
                        tooltip: {
                            show: false,
                            trigger: 'item'
                        },
                        grid: {
                            top: 10,
                            left: 0,
                            bottom: 0,
                            right: 10,
                            containLabel: true,
                        },
                        xAxis: {
                            type: 'value',
                            min: 0,
                            max: value => {
                                if (value.max < 0) {
                                    return 100;
                                }
                                else {
                                    return Math.floor(value.max * 1.2);
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#D7D9E0'
                                },
                            },
                            axisLabel: {
                                color: '#999',
                            },
                            axisTick: {
                                show: false,
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        yAxis: {
                            type: 'value',
                            min: 0,
                            max: value => {
                                if (value.max < 0) {
                                    return 100;
                                }
                                else {
                                    return Math.floor(value.max * 1.2);
                                }
                            },
                            axisLine: {
                                show: false,
                            },
                            axisLabel: {
                                color: '#999',
                            },
                            axisTick: {
                                show: false,
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: '#D7D9E0',
                                }
                            },
                        },
                        series: [
                            {
                                type: 'line',
                                symbol: 'circle',
                                symbolSize: 14,
                                hoverAnimation: false,
                                legendHoverLink: false,
                                itemStyle: {
                                    color: '#2593DD',
                                    borderType: 'solid',
                                    borderWidth: 3,
                                    borderColor: '#A2D9FF',
                                    shadowColor: 'rgba(93, 190, 255, 0.5)',
                                    shadowBlur: 10,
                                    shadowOffsetY: 10,
                                },
                                lineStyle: {
                                    type: 'solid',
                                    color: '#2593DD',
                                    width: 3,
                                    shadowColor: 'rgba(93, 190, 255, 0.5)',
                                    shadowBlur: 10,
                                    shadowOffsetY: 10,
                                },
                                data: this.autoGraphData,
                            },
                        ],
                    };
                },
                //图表动态更新配置
                autoOption () {
                    return {

                    };
                },
            //#endregion

            //#region 常量计算属性
            //#endregion

            //#region 数据转换计算属性
                //根据incList属性自动计算出图表数据
                autoGraphData () {
                    let list = [
                        [-0.000000001, -0.000000001],
                    ];
                    let vu = 0;
                    let s = 0;
                    this.incList.forEach(item => {
                        vu += item.incVU;
                        s += item.keepS;
                        list.push([s, vu]);
                    });
                    return list;
                },
            //#endregion

            //#region 页面样式计算属性
                autoChartWarpStyle () {
                    return {
                        height: `${ this.height }px`,
                    };
                },
            //#endregion
        },
        methods: {
            //#region 页面事件方法
                handleSubmitNode (value) {
                    console.log(value);
                },
            //#endregion

            //#region 业务逻辑方法
                //初始化图表
                b_initChart () {
                    this.chartDom = this.$el.querySelector(".chartWarp");
                    this.chart = ECharts.init(this.chartDom);
                    this.chart.setOption(this.autoOptionTemplate);
                },
                //更新图表
                b_updateChart () {
                    this.chartDom.setOption(this.autoOption);
                },
            //#endregion

            //#region 接口访问方法
            //#endregion

            //#region 数据转换方法
            //#endregion

            //#region 自动样式方法
            //#endregion

            //#region 其他方法
            //#endregion
        },
        created () {
            
        },
        mounted () {
            this.b_initChart();
        },
        components: {

        },
    };
</script>

