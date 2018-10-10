// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import components from "./components";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/fontIcon/iconfont.css";

Vue.use(ElementUI);
Vue.use(components);

Vue.config.productionTip = false;

//Vue全局混入对象，混入对象的名称必须以mix开头
Vue.mixin({
    data () {
        return {
            mixS: S,
            mixMoment: Moment,
            mixUUID: UUID,
            mixDecimal: Decimal,
            mixBigNumber: BigNumber,
            mix$: $,
            mixjQuery: jQuery,
            mixMF: MF,
        }
    },
    methods: {

    },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
