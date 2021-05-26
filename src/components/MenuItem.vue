<template>
    <router-link :to="{ name:item.name }"
                 custom
                 v-if="item.meta.isMenu === 1"
                 v-slot="{ href, route, navigate, isActive, isExactActive }">
        <li class="mt-5 cursor-pointer"
            :class="[isActive && 'text-blue-800 bg-blue-100 p-2 font-semibold border-b-2 border-dashed border-blue-500']">
            <a :href="href"
               @click="activeMenu(item.meta.parent)">{{ item.meta.text }}</a>
        </li>
    </router-link>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    name: "menu-item",
    props: {
        item: {
            type: Object,
            default: []
        }
    },
    computed: {
        // 用來判斷是否呈現按鈕 在手機版時
        ...mapState(["showMenu"])
    },
    methods: {
        // 開關手機版選單事件
        ...mapMutations(["setShowMenu"]),
        /**
         * 選中選單事件
         * @param { type String(字串) } routeParent 上層選單
         */
        activeMenu(routeParent) {
            // 傳遞父組件事件 並將選中的選單上層 route name做回傳
            this.$emit("onActiveMenuParent", routeParent);
            // 手機版時 選單被點擊後 關閉選單事件
            this.setShowMenu(!this.showMenu);
        }
    },
    created() {
        // 判斷路由名稱是否為以下路由
        if (["dashboard", "userUpdate"].indexOf(this.$route.name) !== -1) {
            this.$emit("onActiveMenuParent", this.$route.name);
        } else {
            // this.$route.meta.parent 等於 選單上層 route name
            this.$emit("onActiveMenuParent", this.$route.meta.parent);
        }
    }
};
</script>