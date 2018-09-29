
<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>

<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
    import api from "./api";

    export default {
        name: 'App',
        async mounted () {

        },
    }
</script>