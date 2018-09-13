
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
    </div>
</template>

<script>
    export default {
        name: "chart",
        props: {
            height: {
                type: Number,
                default: 320,
            },
        },
        data () {
            return {
                //#region 页面对象
                    chartDom: null,
                    chart: null,
                //#endregion

                //#region 页面内容绑定数据
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

