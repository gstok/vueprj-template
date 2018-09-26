
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
        <!-- <fcGushi></fcGushi>
        <dcDialog></dcDialog> -->
        <router-view />
    </div>
</template>

<script>
    import api from "./api";

    export default {
        name: 'App',
        async mounted () {
            let result1 = await api.getPlanSceneListL005({
                id: "1058654505664512",
            });
            let result2 = await api.getPlanPageP006({
                condition: {
                    name: ""
                },
                pageNum: 1,
                pageSize: 7,
            });
            let result3 = await api.getPlanMetaByIdO004({
                id: "1058654505664512",
            });
            let result4 = await api.actStopTestO007({
                sceneId: "588406209141489915",
            });
            let result5 = await api.actSaveSceneMetaAO008({
                planId: "1058654505664512",
            });
            console.log(result1);
            console.log(result2);
            console.log(result3);
            console.log(result4);
            console.log(result5);
        },
    }
</script>