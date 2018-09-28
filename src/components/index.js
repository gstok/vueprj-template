
import vue_ccStrategyLine from "@/components/cCom/strategyLine.vue";
import vue_fcNodeEditWindow from "@/components/fCom/nodeEditWindow.vue";

export const ccStrategyLine = { install: Vue => Vue.component("ccStrategyLine", vue_ccStrategyLine) };
export const fcNodeEditWindow = { install: Vue => Vue.component("fcNodeEditWindow", vue_fcNodeEditWindow) };

const components = {
    install: Vue => {
        Vue.component("ccStrategyLine", vue_ccStrategyLine);
        Vue.component("fcNodeEditWindow", vue_fcNodeEditWindow);
    }
};

export default components;
