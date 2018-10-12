
<!--局部样式-->
<style scoped>
    .chart {
        display: inline-block;
        position: relative;
        width: 100%;
    }

    .chartWarp {

    }

    .delPoint {
        position: absolute;
        top: 0px;
        left: 0px;
        cursor: pointer;
    }

    .topWarp {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
    }

    .topWarp > .previewInfo {
        border: 1px solid #D7D9E0;
        border-radius: 4px;
        font-size: 14px;
        font-weight: bold;
        padding: 8px 20px 8px 20px;
    }

    .topWarp > .previewInfo > .mglabel {
        margin-left: 30px;
    }

    .addNodeBtn {
        height: 32px;
        font-size: 14px;
        color: white;
        cursor: pointer;
        background-image: linear-gradient(30deg, #5CBEFF 0%, #2593DD 96%);
        border-radius: 2px;
        padding: 0px 18px 0px 18px;
        display: inline-flex;
        justify-content: space-between;
        align-items: center;
    }

    .addNodeBtn > i {
        margin-right: 10px;
    }

    .tipInfo {
        position: absolute;
        font-size: 12px;
        right: 8px;
        bottom: 22px;
        color: #999999;
    }
</style>

<!--局部覆盖样式-->
<style>

</style>

<template>
    <div>
        <div class="topWarp">
            <div class="previewInfo">
                <label>总并发数：</label>
                <span>{{ `${ autoTotalVU }vu` }}</span>
                <label class="mglabel">压测时长：</label>
                <span>{{ `${ autoTotalTimeS }s` }}</span>
            </div>
            <div
                class="addNodeBtn"
                @click="handleAddNodeBtnClick">
                <i class="icon icon-tianjia-fangkuang-tianchong"></i>
                <span>新增节点</span>
            </div>
        </div>
        <div class="chart">
            <div class="chartWarp" :style="autoChartWarpStyle"></div>
            <fcNodeEditWindow
                v-model="editNodeWindowsShow"
                :value="nodeValue"
                :pos="autoEditNodeWindowPos"
                @submit="handleSubmitNode"/>
            <img
                v-show="delPointShow"
                class="delPoint"
                :style="autoDelPointPos"
                @mouseenter="mouseInDelPoint = true"
                @mouseleave="mouseInDelPoint = false"
                @click="handleDelPointClick"
                src="@/assets/icons/delPoint.svg" />
            <div class="tipInfo">节点可点击修改，暂不支持下降策略</div>
        </div>
    </div>
</template>

<script>
    let windowWidth = 170;
    let windowHeight = 100;

    export default {
        name: "chart",
        props: {
            //图表区域高度
            height: {
                type: Number,
                default: 240,
            },
            //属性为增幅列表
            incList: {
                type: Array,
                default () { 
                    return [];
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
                    //节点编辑窗体模式
                    editMode: "add",
                    //待编辑节点Index
                    editNodeIndex: -1,
                    //节点编辑窗体是否显示
                    editNodeWindowsShow: false,
                    //节点编辑窗体数据绑定值
                    nodeValue: {
                        incVU: "",
                        keepS: "",
                    },

                    //鼠标移动到的节点Index
                    mouseNodeIndex: -1,
                    //是否显示删除图标
                    delPointShow: false,
                    //鼠标是否在删除图标内
                    mouseInDelPoint: false,
                    //删除图标关闭定时器
                    delPointCloseTimer: -1,
                //#endregion

                //#region 页面样式绑定数据
                //#endregion
            };
        },
        watch: {
            autoOption (nv) {
                this.b_updateChart();
            },
        },
        computed: {
            //#region 图表配置计算属性
                //图表初始化配置
                autoOptionTemplate () {
                    return {
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
                //自动计算总并发数
                autoTotalVU () {
                    if (this.autoGraphData.length < 2) {
                        return 0;
                    }
                    else {
                        return this.autoGraphData[this.autoGraphData.length - 1][1];
                    }
                },
                //自动计算出总压测时长（单位秒）
                autoTotalTimeS () {
                    if (this.autoGraphData.length < 2) {
                        return 0;
                    }
                    else {
                        return this.autoGraphData[this.autoGraphData.length - 1][0];
                    }
                },
                //根据节点Index自动计算出增幅数组Index
                autoIncIndex () {
                    if (this.editNodeIndex > 0) {
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
                        top = (this.height - windowHeight) / 2;
                        right = 20;
                    }
                    else if (this.editMode == "edit") {
                        if (this.editNodeIndex > -1 && this.editNodeIndex < this.autoGraphData.length) {
                            let data = this.autoGraphData[this.editNodeIndex];
                            let position = this.chart.convertToPixel({ seriesIndex: 0 }, data);
                            top = position[1] + 14;
                            left = position[0] - windowWidth / 2;
                            //窗口超界处理
                            let $warp = $(this.$el.querySelector(".chart"));
                            let width = $warp.width();
                            let height = $warp.height();
                            if (top < 0) {
                                top = 0;
                            }
                            if (top + windowHeight > height) {
                                top = height - windowHeight;
                            }
                            if (left < 0) {
                                left = 0;
                            }
                            if (left + windowWidth > width) {
                                left = width - windowWidth;
                            }
                        }
                    }
                    return {
                        top: top,
                        left: left,
                        bottom: bottom,
                        right: right,
                    };
                },
                //自动计算出删除图标位置
                autoDelPointPos () {
                    let top = null;
                    let left = null;
                    if (this.mouseNodeIndex > -1 && this.mouseNodeIndex < this.autoGraphData.length) {
                        let data = this.autoGraphData[this.mouseNodeIndex];
                        let position = this.chart.convertToPixel({ seriesIndex: 0 }, data);
                        top = position[1] - 30;
                        left = position[0] - 10;
                    }
                    return {
                        top: MF.ut(top),
                        left: MF.ut(left),
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
                //新增节点按钮点击事件
                handleAddNodeBtnClick () {
                    setTimeout(() => {
                        this.editMode = "add";
                        this.editNodeWindowsShow = true;
                        this.b_clearEditWindow();
                    }, 0);
                },
                //节点编辑窗体提交事件
                handleSubmitNode (node) {
                    if (this.editMode == "add") {
                        this.b_addNode(node);
                    }
                    else if (this.editMode == "edit") {
                        this.b_updateNode(node);
                    }
                },
                //删除图标点击事件
                handleDelPointClick () {
                    this.b_delNode(this.mouseNodeIndex - 1);
                },
                //策略折线节点点击事件
                handleNodeClick (index) {
                    setTimeout(() => {
                        this.editMode = "edit";
                        this.editNodeIndex = index;
                        if (this.autoIncIndex > -1) {
                            let dstNode = this.incList[this.autoIncIndex];
                            this.b_fillEditWindow(dstNode);
                            this.editNodeWindowsShow = true;
                        }
                    }, 0);
                },
                //鼠标移入策略节点事件
                handleNodeMouseEnter (index) {
                    clearTimeout(this.delPointCloseTimer);
                    this.delPointShow = true;
                    this.mouseNodeIndex = index;
                },
                //鼠标移出策略节点事件
                handleNodeMouseLeave (index) {
                    this.delPointCloseTimer = setTimeout(() => {
                        if (this.mouseInDelPoint == false) {
                            this.delPointShow = false;
                        }
                    }, 500);
                },
            //#endregion

            //#region 业务逻辑方法
                //初始化图表
                b_initChart () {
                    this.chartDom = this.$el.querySelector(".chartWarp");
                    this.chart = ECharts.init(this.chartDom);
                    this.chart.on("click", params => {
                        if (params.componentType == "series") {
                            this.handleNodeClick(params.dataIndex);
                        }
                    });
                    this.chart.on("mouseover", params => {
                        if (params.componentType == "series") {
                            this.handleNodeMouseEnter(params.dataIndex);
                        }
                    });
                    this.chart.on("mouseout", params => {
                        if (params.componentType == "series") {
                            this.handleNodeMouseLeave(params.dataIndex);
                        }
                    });
                    this.chart.setOption(this.autoOptionTemplate);
                },
                //更新图表
                b_updateChart () {
                    this.chart.setOption(this.autoOption);
                },
                //添加节点
                b_addNode (node) {
                    this.incList.push(node);
                    this.$emit("change", this.incList);
                },
                //删除节点
                b_delNode (index) {
                    this.incList.splice(index, 1);
                    if (this.incList.length < 1) {
                        this.editNodeWindowsShow = false;
                        this.delPointShow = false;
                    }
                    this.$emit("change", this.incList);
                },
                //更新节点
                b_updateNode (node) {
                    if (this.autoIncIndex > -1) {
                        this.incList[this.autoIncIndex].incVU = node.incVU;
                        this.incList[this.autoIncIndex].keepS = node.keepS;
                        this.b_updateIncList();
                        this.$emit("change", this.incList);
                    }
                },
                //强制触发incList更新
                b_updateIncList () {
                    this.incList.push({ });
                    this.incList.pop();
                },
                //填充节点编辑窗体
                b_fillEditWindow (node) {
                    this.b_clearEditWindow();
                    this.nodeValue.incVU = node.incVU;
                    this.nodeValue.keepS = node.keepS;
                },
                //清空节点编辑窗体
                b_clearEditWindow () {
                    this.nodeValue.incVU = "";
                    this.nodeValue.keepS = "";
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
            document.addEventListener("click", e => {
                if (this.editNodeWindowsShow) {
                    this.editNodeWindowsShow = false;
                }
            });
        },
        components: {

        },
    };
</script>

