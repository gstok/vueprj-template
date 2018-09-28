
<!--局部样式-->
<style scoped>
    .nodeEditWindow {
        position: absolute;
        width: 170px;
        height: 100px;
        font-size: 12px;
        padding: 6px 10px 6px 10px;
        border-radius: 3px;
        background-color: rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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
        <div class="inputWarp">
            <div>
                <span>●</span>
                <div>用户(VU)</div>
            </div>
            <input
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
        name: "",
        model: {
            prop: "show",
            event: "change",
        },
        props: {
            show: {
                type: Boolean,
                default: false,
            },
            top: {
                type: Number,
                default: 0,
            },
            left: {
                type: Number,
                default: 0,
            },
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
                    return {
                        top: `${ this.top }px`,
                        left: `${ this.left }px`,
                    };
                },
            //#endregion
        },
        methods: {
            //#region 页面事件方法
                //编辑结果提交事件
                handleSubmit () {
                    this.$emit("submit", {
                        incVU: Number(this.myValue.incVU),
                        keepS: Number(this.myValue.keepS),
                    });
                    this.$emit("change", false);
                },

                handleWindowClick () {

                },
            //#endregion

            //#region 业务逻辑方法
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
            $(document).click(() => {
                this.$emit("change", false);
            });
        },
        components: {

        },
    };
</script>

