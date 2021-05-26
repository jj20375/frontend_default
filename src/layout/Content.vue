<template>
    <div class="grid grid-cols-12 h-screen">
        <SideBar class="col-span-12 pb-5 bg-white  sm:static sm:not-sr-only w-full sm:col-span-4 md:col-span-4 lg:col-span-3 xl:col-span-2  shadow-md dark:shadow-2xl z-10 NotoSansTCFont h-auto dark:bg-gray-800 text-blue-700 dark:text-blue-200"
                 :class="showMenu ? 'not-sr-only' : 'sr-only'"
                 :menus="sideBarMenu" />
        <div class="col-span-12 w-full sm:col-span-8 md:col-span-8 lg:col-span-9 xl:col-span-10 bg-gray-200 dark:bg-gray-900">
            <Header />
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Header from "./Header.vue";
import SideBar from "./SideBar.vue";

export default {
    components: {
        Header,
        SideBar
    },
    computed: {
        ...mapState(["showMenu"]),
        ...mapState("permissionStore", ["sideBarMenu", "currentMenu"]),
    },
    data() {
        return {
        };
    },
    methods: {
        ...mapActions("setIntervalStore", ["getSetIntervalStart"]),
    },
    created() {
        // this.getSetIntervalStart();
    }
};
</script>