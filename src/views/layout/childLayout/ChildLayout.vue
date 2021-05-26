<template>
    <div>
        <div class="mt-5">
            <Breadcrumb class="breadcrumb" />
            <h6 class="bg-blue-500 text-white py-2 pl-2 text-2xl NotoSansTCFont mb-0">
                {{ $route.meta.text }}
            </h6>
        </div>
        <el-card no-body
                 class="shadow-lg">
            <!-- <h1>{{ langData.leftMenu[this.$route.name].name }}</h1> -->
            <router-view class="mt-2 mb-2"></router-view>
        </el-card>
    </div>
</template>
<script>
import { mapState } from "vuex";
import Breadcrumb from "../../components/Breadcrumb.vue";
export default {
    components: {
        Breadcrumb
    },
    computed: {
        ...mapState("i18nStore", ["langData"])
    },
    beforeRouteLeave(to, from, next) {
        // location.reload();
        return next();
    }
};
</script>
