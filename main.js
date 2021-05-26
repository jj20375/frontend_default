import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 防止vue 在 console視窗多出現 一條已啟動的警告視窗
Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
