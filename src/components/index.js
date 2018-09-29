
import vue_dcDialog from "@/components/dCom/dialog.vue";
import vue_fcBaba from "@/components/fCom/baba.vue";
import vue_fcGushi from "@/components/fCom/gushi.vue";
import vue_Haha from "@/components/pCom/haha.vue";
import vue_uiScpSend from "@/components/uiCom/scpSend.vue";

export const dcDialog = { install: Vue => Vue.component("dcDialog", vue_dcDialog) };
export const fcBaba = { install: Vue => Vue.component("fcBaba", vue_fcBaba) };
export const fcGushi = { install: Vue => Vue.component("fcGushi", vue_fcGushi) };
export const Haha = { install: Vue => Vue.component("Haha", vue_Haha) };
export const uiScpSend = { install: Vue => Vue.component("uiScpSend", vue_uiScpSend) };

const components = {
    install: Vue => {
        Vue.component("dcDialog", vue_dcDialog);
        Vue.component("fcBaba", vue_fcBaba);
        Vue.component("fcGushi", vue_fcGushi);
        Vue.component("Haha", vue_Haha);
        Vue.component("uiScpSend", vue_uiScpSend);
    }
};

export default components;
