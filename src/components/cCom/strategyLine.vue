
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
        <fcNodeEditWindow
            v-model="editNodeWindowsShow"
            :value="nodeValue"
            :pos="autoEditNodeWindowPos"
            @submit="handleSubmitNode"/>
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
                            keepS: 10,
                        },
                        {
                            incVU: 20,
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
                    nodeValue: {
                        incVU: "",
                        keepS: "",
                    },


                    editMode: "add",
                    editNodeIndex: -1,
                    editNodeWindowsShow: true,
                    editNodeWindowPos: {
                        top: 0,
                        left: 0,
                    },
                //#endregion

                //#region 页面样式绑定数据
                //#endregion
            };
        },
        watch: {
            autoOption (nv) {
                this.chart.setOption(nv);
            },

            autoEditNodeWindowPos (nv) {

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
                        series: [
                            {
                                data: this.autoGraphData,
                            },
                        ],
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

                //根据节点Index自动计算出增幅数组Index
                autoIncIndex () {
                    if (this.editNodeIndex > -1) {
                        return this.editNodeIndex - 1;
                    }
                    else {
                        return -1;
                    }
                },

                //自动计算出节点编辑窗口位置
                autoEditNodeWindowPos () {
                    let top = null;
                    let left = null;
                    let bottom = null;
                    let right = null;
                    if (this.editMode == "add") {
                        top = (this.height - 100) / 2;
                        right = 20;
                    }
                    else if (this.editMode == "edit") {
                        if (this.editNodeIndex > -1) {
                            let data = this.autoGraphData[this.editNodeIndex];
                            let position = this.chart.convertToPixel({ seriesIndex: 0 }, data);
                            top = position[1];
                            left = position[0];
                        }
                    }
                    return {
                        top: top,
                        left: left,
                        bottom: bottom,
                        right: right,
                    };
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
                handleSubmitNode (nodeValue) {
                    if (this.editMode == "add") {
                        this.b_addNode(nodeValue);
                    }
                    else if (this.editMode == "edit") {
                        this.b_updateNode(nodeValue);
                    }
                },

                //策略折线节点点击事件
                handleNodeClick (params) {
                    this.b_editNode(params.dataIndex);
                },
            //#endregion

            //#region 业务逻辑方法
                //初始化图表
                b_initChart () {
                    this.chartDom = this.$el.querySelector(".chartWarp");
                    this.chart = ECharts.init(this.chartDom);
                    this.chart.on("click", params => {
                        if (params.componentType == "series") {
                            this.handleNodeClick(params);
                        }
                    });
                    this.chart.setOption(this.autoOptionTemplate);
                },
                //更新图表
                b_updateChart () {
                    this.chartDom.setOption(this.autoOption);
                },
                //添加节点
                b_addNode (nodeValue) {
                    this.incList.push(nodeValue);
                },
                //编辑节点
                b_editNode (nodeIndex) {
                    this.editMode = "edit";
                    this.editNodeIndex = nodeIndex;
                    this.b_fillEditWindow();
                    this.editNodeWindowsShow = true;
                },
                //更新节点
                b_updateNode (nodeValue) {
                    if (this.autoIncIndex > -1) {
                        this.incList[this.autoIncIndex].incVU = nodeValue.incVU;
                        this.incList[this.autoIncIndex].keepS = nodeValue.keepS;
                        this.b_updateIncList();
                    }
                },
                //强制触发incList更新
                b_updateIncList () {
                    this.incList.push({ });
                    this.incList.pop();
                },
                //填充节点编辑窗体
                b_fillEditWindow () {
                    if (this.autoIncIndex > -1) {
                        let incItem = this.incList[this.autoIncIndex];
                        this.nodeValue.incVU = incItem.incVU;
                        this.nodeValue.keepS = incItem.keepS;
                    }
                    else {
                        this.nodeValue.incVU = "";
                        this.nodeValue.keepS = "";
                    }
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

