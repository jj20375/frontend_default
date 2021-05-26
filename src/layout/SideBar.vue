<template>
    <div>
        <button class="blue-btn sm:hidden w-2/3 mt-3 mx-auto block text-2xl"
                @click="setShowMenu(!showMenu)">x</button>
        <div class="flex justify-center desktopShow">
            <div class="flex-initial">
                <img class="2xl:w-32 xl:w-28 lg:w-20 md:w-20 w-20"
                     src="../img/logo.svg"
                     alt="">
            </div>
            <div class="self-center text-blue-700 dark:text-blue-100">
                <h1 class="PattayaFont 2xl:text-3xl xl:text-xl lg:text-lg">Enjoy The Time</h1>
                <h1 class="NotoSansTCFont font-normal 2xl:text-2xl lg:text-lg">享時光</h1>
            </div>
        </div>
        <ul class="list-none ml-3 mt-10">
            <!-- <li class="mt-5">
                <span @click="clickMenu('dashboard')"
                      class="transition duration-500 py-2 px-5 cursor-pointer"
                      :class="currentMenu === 'dashboard' ? 'bg-blue-500 rounded-full text-white': ''">
                    首頁
                </span>
            </li> -->
            <li v-for="(item, index) in menus"
                class="mt-5"
                :key="index">
                <span @click="clickMenu(item.name, true)"
                      class="transition duration-500 py-2 px-5 cursor-pointer"
                      :class="currentMenu === item.name ? 'bg-blue-500 rounded-full text-white': ''">
                    {{ item.meta.text }}
                    <i v-if="!$isEmpty(item.children)" class="ni ni-bold-left transition duration-500 ease-linear align-middle mb-1"
                       :class="activeMenu[item.name]  ? '-rotate-90 transform' : 'rotate-0 transform'"></i>
                </span>
                <ul class="list-none ml-10 border-l-4 border-blue-500 pl-2"
                    v-if="!$isEmpty(item.children)">
                    <MenuItem v-for="(item2,index2) in item.children"
                              :key="index2"
                              :class="activeMenu[item.name] ? 'opacity-1 translate-x-0 transform duration-700 ease-in-out transition' : '-translate-x-1/2 sr-only opacity-0 transition transform duration-700 ease-in-out'"
                              :item="item2"
                              @onActiveMenuParent="activeMenuClass" />
                </ul>
            </li>
        </ul>
    </div>
</template>


<script>
import { mapState, mapMutations } from "vuex";
//子選單樣板
import MenuItem from "../components/MenuItem.vue";
export default {
    props: {
        menus: {
            type: Array,
            default: []
        }
    },
    components: {
        MenuItem
    },
    computed: {
        // 用來判斷是否呈現按鈕 在手機版時
        ...mapState(["showMenu"])
    },
    data() {
        return {
            // 用來判斷是否顯示子選單內容，以及父選單箭頭方向
            activeMenu: {},
            // 判斷當前選中的父選單
            currentMenu: null
        };
    },
    methods: {
        // 開關手機版選單事件
        ...mapMutations(["setShowMenu"]),
        /**
         * 子選單被選中時觸發
         * @param { type String(字串) } val 子選單的上層路由key
         */
        activeMenuClass(val) {
            // 觸發點擊父選單方法
            this.clickMenu(val, false);
            // 更改當前選中的父選單
            this.currentMenu = val;
            // 新增用來判斷父選單是否顯示子選單的key與更改箭頭方向
            this.$set(this.activeMenu, val, true);
        },
        /**
         * 點擊父選單時事件
         * @param { type String(字串) } val 父選單key
         * @param { type Boolean(布林值) } setShowMenuWork 更改是否出現選單的 toggle事件
         */
        clickMenu(val, setShowMenuWork = false) {
            // 判斷選中的父選單key不等於當前父選單 key時 關閉子選單與更改箭頭方向
            if (val !== this.currentMenu) {
                this.$set(this.activeMenu, this.currentMenu, false);
            }
            // 判斷選中父選單是否有選中的key
            if (!this.activeMenu.hasOwnProperty(val)) {
                // 如果沒有 key 則加入 並且給值 true (用來判斷是否呈現子選單與更改箭頭方向)
                this.$set(this.activeMenu, val, true);
            } else {
                // 如果有 key 且被點擊時 則修改當前 boolean值
                this.activeMenu[val] = !this.activeMenu[val];
            }
            // 判斷如果是以下路由 執行對應導頁 以及 當前按鈕更改
            if(val === "dashboard" || val === "userUpdate") {
                this.$router.push({name: val}).catch(err=>err);
                this.currentMenu = val;
                // 因為預設第一次進入網站時 無需觸發此事件 因此做一個判斷
                if(setShowMenuWork) {
                    // 手機版時 選單被點擊後 關閉選單事件
                    this.setShowMenu(!this.showMenu);
                }
            }
        }
    }
};
</script>