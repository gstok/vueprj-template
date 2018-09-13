
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
        <fcGushi></fcGushi>
        <dcDialog></dcDialog>
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'App',
    }
</script>