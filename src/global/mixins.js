import Vue from "vue";
import { isEmpty } from "../service/anyService";

// vue 全域 mixin
Vue.mixin({
    data() {
        return {
            isMobile: false,
        };
    },
    methods: {
        $isEmpty(val) {
            return isEmpty(val);
        },
        /**
         * 判斷字元過長就出現...
         * @param { type String(字串) 要過濾的文字 } val
         * @param { type Number(數字) 要過濾的文字長度 } num
         */
        subString(val, num) {
            if (val.length > num) {
                return val.substring(0, num) + "...";
            }
            return val;
        },
        // 判斷介面寬度 是否為手機
        checkMobile() {
            let windowWidth = window.innerWidth;
            if (windowWidth > 768) {
                this.isMobile = false;
            } else {
                this.isMobile = true;
            }
        },
    },
    created() {
        this.checkMobile();
    },
});
