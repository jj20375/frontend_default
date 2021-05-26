<template>
    <header class="bg-blue-900">
        <div class="flex items-start justify-center h-20 w-full">
            <div class="flex-1 self-center ml-2">
                <label for="toggle"
                       class="flex items-center cursor-pointer">
                    <div class="text-2xl flex-initial flex-grow-0 mr-2"
                         :class="showDark? 'text-gray-400': 'text-yellow-400'"><i class="fas fa-sun"></i></div>
                    <!-- toggle -->
                    <div class="relative">
                        <!-- input -->
                        <input type="checkbox"
                               id="toggle"
                               @click="setShowDark(!showDark)"
                               class="sr-only">
                        <!-- line -->
                        <div class="line block bg-yellow-500 w-12 h-6 rounded-full"></div>
                        <!-- dot -->
                        <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                    </div>
                    <!-- label -->
                    <div class="text-2xl ml-2"
                         :class="showDark? 'text-blue-200': 'text-gray-400'"><i class="fas fa-moon"></i></div>
                </label>
            </div>
            <div class="flex-1 sm:hidden self-center">
                <div class="flex justify-start">
                    <div class="flex-initial">
                        <img class="w-10"
                             src="../img/logo.svg"
                             alt="">
                    </div>
                    <div class="self-center text-white">
                        <h1 class="PattayaFont text-sm">Enjoy The Time</h1>
                        <h1 class="NotoSansTCFont font-normal text-sm">享時光</h1>
                    </div>
                </div>
            </div>
            <div class="sm:mr-5 mr-5  sm:flex-grow-0"
                 :class="portfolioShow ? 'self-start mt-6' : 'self-center'">
                <span class="text-white desktopShow sm:static sm:mr-2">{{user.userable.name}}</span>
                <span @click="clickPortfolio()"
                      class="cursor-pointer bg-white rounded-full text-blue-500 md:p-5 p-2">
                    <i class="text-blue-500 md:text-2xl text-lg fas fa-user"></i>
                </span>
                <div class="absolute top-16 right-4" :class="portfolioShow ? 'translate-x-0 opacity-1': 'translate-x-0 opacity-0 sr-only'">
                    <ul class="bg-white rounded-lg shadow-2xl mt-5 sm:py-5 pb-3 transform transition duration-500 w-40"
                        >
                        <li class="sm:hidden border-b border-blue-900 p-3 text-center text-gray-400">{{user.userable.name}}</li>
                        <li class="mb-2 border-b px-5 py-3 border-blue-900 cursor-pointer hover:text-blue-500 transition duration-100 text-center"
                            @click="$router.push({name:'userUpdate'})"><span class="mr-2 text-blue-500"><i class="fas fa-edit"></i></span>更新資料</li>
                        <li class="bg-red-700 text-center mx-2 text-white px-3 py-2 cursor-pointer rounded-2xl hover:bg-red-900 transition duration-300 text-lg"
                            @click="logOut()">登出 <i class="fas fa-sign-out-alt"></i></li>
                    </ul>
                </div>
            </div>
            <div class="mobileShow self-center">
                <button class="bg-white inline-block p-3 mr-2 text-blue-500 rounded-lg"
                        @click="setShowMenu(!showMenu)">
                    <i class="fas fa-bars fa-2x"></i>
                </button>
            </div>
        </div>
    </header>
</template>

<style scoped lang="scss">
input:checked ~ .dot {
    transform: translateX(140%);
    background-color: theme("colors.white");
}
input:checked ~ .line {
    background-color: theme("colors.gray.900");
}
</style>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
    computed: {
        ...mapState(["showDark", "showMenu"]),
        ...mapState("userStore", ["user"])
    },
    data() {
        return {
            portfolioShow: false
        };
    },
    methods: {
        ...mapActions("userStore", ["logOutUser"]),
        ...mapMutations(["setShowDark", "setShowMenu"]),
        clickPortfolio() {
            this.portfolioShow = !this.portfolioShow;
        },
        logOut() {
            let self = this;
            self.logOutUser();
            self.$router.push({ name: "login" });
            location.reload();
        }
        // clickThemeChange() {
        //     this.setShowDark(!this.showDark);
        // }
    }
};
</script>