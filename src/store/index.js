import Vue from "vue";
import Vuex from "vuex";

import userStore from "./userStore";
import designerStore from "./designerStore";
import permissionStore from "./permissionStore";
import breadcrumbStore from "./breadcrumbStore";
import setIntervalStore from "./setIntervalStore";
import operatorStore from "./operatorStore";
import i18nStore from "../store/i18nStore";

Vue.use(Vuex);

export default  new Vuex.Store({
    modules: {
        userStore,
        designerStore,
        permissionStore,
        breadcrumbStore,
        i18nStore,
        setIntervalStore,
        operatorStore
    },
    state: {
        // 判斷是否呈現 黑色系樣式
        showDark: false,
        // 判斷是否呈現手機版選單
        showMenu: false,
    },
    mutations: {
        // 設定黑色系樣式事件
        setShowDark(state, val) {
            state.showDark = val;
        },
        // 設定開關手機版選單事件
        setShowMenu(state, val) {
            state.showMenu = val;
        },
    },
    actions: {},
});
