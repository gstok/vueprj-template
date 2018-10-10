
<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    div {
        box-sizing: border-box;
    }
</style>

<template>
    <div id="app">
        <ccStrategyLine></ccStrategyLine>
    </div>
</template>

<script>
    import api from "./api";

    export default {
        name: 'App',
        methods: {
            toBottomClick () {
                this.toBottom("test");
            },
            toBottom (className) {
                className = className.trim();
                if (!className.startsWith(".")) {
                    className = "." + className;
                }
                setTimeout(() => {
                    let $list = $(this.$el).find(className);
                    $list.scrollTop($list.prop("scrollHeight"));
                }, 0);  
            },
        },
        async mounted () {

        },
    }
</script>