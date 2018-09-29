
<!--局部样式-->
<style scoped>
    .nodeEditWindow {
        position: absolute;
        width: 170px;
        height: 100px;
        font-size: 12px;
        padding: 18px 10px 6px 10px;
        border-radius: 3px;
        background-color: rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .nodeEditWindow > .topBar {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 16px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: #bbb;
    }

    .nodeEditWindow > .topBar > i {
        font-size: 13px;
        cursor: pointer;
        margin-top: 2px;
        margin-right: 2px;
    }

    .nodeEditWindow > .inputWarp {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .nodeEditWindow > .inputWarp > div {
        display: flex;
        align-items: center;
    }

    .nodeEditWindow > .inputWarp > div > span {
        color: red;
    }

    .nodeEditWindow > .inputWarp > div > div {
        margin-left: 3px;
    }

    .nodeEditWindow > .inputWarp > input {
        width: 76px;
    }

    .nodeEditWindow > .submitWarp {
        display: flex;
        justify-content: space-between;
    }
</style>

<!--局部覆盖样式-->
<style>

</style>

<template>
    <div 
        v-show="show"
        class="nodeEditWindow"
        :style="autoNodeEditWindowStyle"
        @click.stop="handleWindowClick">
        <div class="topBar">
            <i @click="handleCloseClick" class="icon icon-closec"></i>
        </div>
        <div class="inputWarp">
            <div>
                <span>●</span>
                <div>用户(VU)</div>
            </div>
            <input
                class="userNum"
                v-model="myValue.incVU"
                type="number"
                placeholder="用户增幅"
                @keyup.13="handleSubmit" />
        </div>
        <div class="inputWarp">
            <div>
                <span>●</span>
                <div>时间(S)</div>
            </div>
            <input
                v-model="myValue.keepS"
                type="number"
                placeholder="持续时间"
                @keyup.13="handleSubmit" />
        </div>
        <div class="submitWarp">
            <input @click="handleSubmit" type="button" value="提交" />
            <span>ENTER提交</span>
        </div>
    </div>
</template>

<script>
    import api from "../../api";

    export default {
        name: "nodeEditWindow",
        model: {
            prop: "show",
            event: "change",
        },
        props: {
            //是否显示
            show: {
                type: Boolean,
                default: false,
            },
            //小窗口位置
            pos: {
                type: Object,
                default () {
                    return {
                        top: 0,
                        left: 0,
                        bottom: null,
                        right: null,
                    };
                },
            },
            //节点值
            value: {
                type: Object,
                default () {
                    return {
                        incVU: "",
                        keepS: "",
                    };
                },
            },
        },
        data () {
            return {
                //#region 页面对象
                //#endregion

                //#region 页面内容绑定数据
                    myShow: this.show,
                    myValue: this.value,
                //#endregion

                //#region 页面样式绑定数据
                //#endregion
            };
        },
        watch: {
            show (nv) {
                this.myShow = nv;
            },
            myShow (nv) {
                if (nv) {
                    this.b_inputFocus();
                }
                this.$emit("change", nv);
            },
        },
        computed: {
            //#region 常量计算属性
            //#endregion

            //#region 数据转换计算属性
            //#endregion

            //#region 样式计算属性
                autoNodeEditWindowStyle () {
                    let posObj = { };
                    if (this.pos.top !== null) {
                        posObj.top = `${ this.pos.top }px`;
                    }
                    if (this.pos.left !== null) {
                        posObj.left = `${ this.pos.left }px`;
                    }
                    if (this.pos.bottom !== null) {
                        posObj.bottom = `${ this.pos.bottom }px`;
                    }
                    if (this.pos.right !== null) {
                        posObj.right = `${ this.pos.right }px`;
                    }
                    return posObj;
                },
            //#endregion
        },
        methods: {
            //#region 页面事件方法
                //编辑结果提交事件
                handleSubmit () {
                    this.b_submit();
                },
                handleWindowClick () {

                },
                handleCloseClick () {
                    this.myShow = false;
                },
            //#endregion

            //#region 业务逻辑方法
                //提交编辑结果
                b_submit () {
                    let incVU = Number(this.myValue.incVU);
                    if (isNaN(incVU)) {
                        this.$message({
                            type: "warning",
                            message: "用户数输入非法！",
                        });
                        return;
                    }
                    if (incVU < 0) {
                        this.$message({
                            type: "warning",
                            message: "用户数增幅暂不可以为负数！",
                        });
                        return;     
                    }
                    if (this.myValue.keepS.toString().trim().length < 1) {
                        this.$message({
                            type: "warning",
                            message: "请输入持续时间！",
                        });
                        return;
                    }
                    let keepS = Number(this.myValue.keepS);
                    if (isNaN(keepS)) {
                        this.$message({
                            type: "warning",
                            message: "持续时间输入非法！",
                        });
                        return;
                    }
                    if (keepS < 0) {
                        this.$message({
                            type: "warning",
                            message: "持续时间不可以为负数！",
                        });
                        return;   
                    }
                    this.$emit("submit", {
                        incVU: incVU,
                        keepS: keepS,
                    });
                    this.$emit("change", false);
                },
                //input获取输入焦点
                b_inputFocus () {
                    setTimeout(() => {
                        $(this.$el).find(".userNum").focus();
                    }, 0);
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

        },
        components: {

        },
    };
</script>

