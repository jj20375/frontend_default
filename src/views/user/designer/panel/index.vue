<template>
    <div>
        <div class="float-left">
            <ul class="p-0">
                <li @click="showComponent(item.value)"
                    :class="currentTab === item.value ? 'green-btn' : 'green-btn-outline'"
                    class="px-2 py-2 ml-1 inline-block shadow-blue-500-md "
                    v-for="(item,index) in tabs"
                    :key="index">
                    {{ item.title }}
                </li>
            </ul>
        </div>
        <h5 class="float-right bg-gray-600 text-white p-2 rounded-lg mb-0">服務提供者:<span class="font-weight-bold ml-2">{{ designerName }}</span></h5>
        <div class="clear-both"></div>
        <transition name="component-fade"
                    mode="out-in">
            <component :is="checkShow">
            </component>
        </transition>
    </div>
</template>

<script>
import { mapState } from "vuex";
// 詳細資料樣板
import Detail from "./Detail.vue";
import Service from "./Service/index.vue";
export default {
    components: {
        Detail,
        Service,
    },
    computed: {
        ...mapState("designerStore", ["designerName"]),
    },
    data() {
        return {
            checkShow: "Detail",
            currentTab: "Detail",
            tabs: [
                {
                    title: "服務提供者介紹",
                    value: "Detail",
                },
                {
                    title: "服務項目",
                    value: "Service",
                },
            ],
        };
    },
    methods: {
        showComponent(val) {
            let self = this;
            self.checkShow = val;
            self.currentTab = val;
        },
    },
};
</script>

<style lang="scss" scoped>
.boxShadow {
    box-shadow: 0 2px 5px #969696;
}
</style>
