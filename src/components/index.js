
import vue_ccStrategyLine from "@/components/cCom/strategyLine.vue";
import vue_fcNodeEditWindow from "@/components/fCom/nodeEditWindow.vue";
import vue_uiButton from "@/components/uiCom/button.vue";

export const ccStrategyLine = { install: Vue => Vue.component("ccStrategyLine", vue_ccStrategyLine) };
export const fcNodeEditWindow = { install: Vue => Vue.component("fcNodeEditWindow", vue_fcNodeEditWindow) };
export const uiButton = { install: Vue => Vue.component("uiButton", vue_uiButton) };

const components = {
    install: Vue => {
        Vue.component("ccStrategyLine", vue_ccStrategyLine);
        Vue.component("fcNodeEditWindow", vue_fcNodeEditWindow);
        Vue.component("uiButton", vue_uiButton);
    }
};

export default components;
