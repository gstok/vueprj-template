
import vue_StrategyLine from "../@/components/cCom/strategyLine.vue";
import vue_NodeEditWindow from "../@/components/fCom/nodeEditWindow.vue";
import vue_Button from "../@/components/uiCom/button.vue";

export const StrategyLine = { install: Vue => Vue.component("StrategyLine", vue_StrategyLine) };
export const NodeEditWindow = { install: Vue => Vue.component("NodeEditWindow", vue_NodeEditWindow) };
export const Button = { install: Vue => Vue.component("Button", vue_Button) };

const components = {
    install: Vue => {
        Vue.component("StrategyLine", vue_StrategyLine);
        Vue.component("NodeEditWindow", vue_NodeEditWindow);
        Vue.component("Button", vue_Button);
    }
};

export default components;
