
import Pagination from '../packages/pagination/index.js';

const components = [
    Pagination,
];

const install = function(Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

module.exports = {
    install,
    Pagination,
};

module.exports.default = module.exports;
