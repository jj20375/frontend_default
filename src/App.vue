<template>
    <div id="app"
    class="w-full"
         :class="showDark? 'dark': ''">
        <router-view></router-view>
    </div>
</template>

<script>
import { mapState } from "vuex";
// vue 全域化 mixins
import "./global/mixins";
// vue 全域化 filters
import "./global/filters";
// vue 全域化 prototypes
import "./global/prototypes";
// vue 全域化 組件
import "./global/components";
// fontawesome icon
import "./plugins/fontawesome";
// element ui
import "./plugins/element-ui";
// 自定義scss
import "./scss/main.scss";
import SideBar from "./layout/SideBar.vue";
import Content from "./layout/Content.vue";
export default {
    components: {
        SideBar,
        Content
    },
    computed: {
        ...mapState(["showDark"])
    },
   
};
</script>
