
import vue_HelloWorld from "@/components/HelloWorld.vue";
import vue_fcBaba from "@/components/fCom/baba.vue";
import vue_fcGushi from "@/components/fCom/gushi.vue";
import vue_Haha from "@/components/pCom/haha.vue";

export const HelloWorld = { install: Vue => Vue.component("HelloWorld", vue_HelloWorld) };
export const fcBaba = { install: Vue => Vue.component("fcBaba", vue_fcBaba) };
export const fcGushi = { install: Vue => Vue.component("fcGushi", vue_fcGushi) };
export const Haha = { install: Vue => Vue.component("Haha", vue_Haha) };

const components = {
    install: Vue => {
        Vue.component("HelloWorld", vue_HelloWorld);
        Vue.component("fcBaba", vue_fcBaba);
        Vue.component("fcGushi", vue_fcGushi);
        Vue.component("Haha", vue_Haha);
    }
};

export default components;
