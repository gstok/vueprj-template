
import vue_HelloWorld from "@/components/HelloWorld.vue";
import vue_gushi from "@/components/fCom/gushi.vue";
import vue_baba from "@/components/pCom/baba.vue";
import vue_haha from "@/components/pCom/haha.vue";

export const HelloWorld = { install: Vue => Vue.component("HelloWorld", vue_HelloWorld) };
export const gushi = { install: Vue => Vue.component("gushi", vue_gushi) };
export const baba = { install: Vue => Vue.component("baba", vue_baba) };
export const haha = { install: Vue => Vue.component("haha", vue_haha) };

const components = {
    install: Vue => {
        Vue.component("HelloWorld", vue_HelloWorld);
        Vue.component("gushi", vue_gushi);
        Vue.component("baba", vue_baba);
        Vue.component("haha", vue_haha);
    }
};

export default components;
