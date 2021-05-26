<template>
    <div class="flex justify-center items-center h-screen bg-cover"
         style="background-image: url(../img/bg.jpeg)">
        <el-card class="box-card lg:w-2/4 xl:w-1/3 2xl:w-1/4 w-full mx-2 bg-blue-800 shadow-blue-500-md">
            <div slot="header"
                 class="clearfix">
                <strong class="block mx-auto text-center text-blue-700">登入</strong>
            </div>
            <div>
                <el-form :label-position="labelPosition"
                         :model="form"
                         status-icon
                         :rules="rules"
                         ref="form"
                         label-width="100px">
                    <el-form-item label="帳號"
                                  prop="account">
                        <el-input v-model="form.account"
                                  placeholder="請輸入帳號"></el-input>
                    </el-form-item>
                    <el-form-item label="密碼"
                                  prop="password">
                        <el-input type="password"
                                  v-model="form.password"
                                  autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div class="flex items-center">
                    <el-select v-model="lang"
                    class="w-24"
                               placeholder="語系">
                        <el-option v-for="(item, index) in langs"
                                   :key="index"
                                   :label="item.name"
                                   :value="item.lang">
                            <country-flag class="align-middle"
                                          :country="item.icon"
                                          size="normal"></country-flag>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
                        </el-option>
                    </el-select>
                    <button class="green-blue-text-btn w-20 block ml-auto px-3 py-1"
                            type="submit"
                            @click.prevent="onSubmit('form')">登入</button>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>
// 使用 swwetalert2 套件
import Swal from "sweetalert2";
// 導入 vuex
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
// 導入 localStorage 設定值方法
import { setStorage } from "../../service/localStorage";
// 導入 使用者登入api連結
import { LoginApi } from "../../api/userApi";
export default {
    data() {
        return {
            labelPosition: "left",
            form: {
                account: "",
                password: ""
            },
            rules: {
                account: [
                    {
                        required: true,
                        // validator: UserRule.FormUserAccountRule,
                        trigger: "blur",
                        message: "請輸入帳號"
                    }
                ],
                password: [
                    {
                        required: true,
                        // validator: UserRule.FormPasswordRule,
                        trigger: "blur",
                        message: "請輸入密碼"
                    }
                ]
            },
            lang: null
        };
    },
    computed: {
        ...mapState("i18nStore", { locale: "locale" }),
        ...mapGetters("i18nStore", ["langs"]),
        showLang() {
            let self = this;
            switch (self.locale) {
                case "en":
                    return "us";
                    break;

                default:
                    return self.locale;
                    break;
            }
        }
    },
    methods: {
        ...mapActions("userStore", ["getLoginUserInfo"]),
        ...mapActions("i18nStore", ["getLang"]),
        ...mapMutations("userStore", ["setIsAuth"]),
        async onSubmit(formName) {
            let self = this;
            try {
                await self.$refs[formName].validate();
                try {
                    let res = await LoginApi(self.form);
                    await Swal.fire({
                        toast: true,
                        position: "top-end",
                        icon: "success",
                        title: "登入成功",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    self.setIsAuth(true);
                    setStorage("isAuth", true);
                    // ajax 取得token
                    const { token } = res.data.data;
                    let loginTime = parseInt(res.data.data.unixtime) - 60 * 15;
                    // 將token儲存在localStorage
                    setStorage("token", "Bearer " + token);
                    setStorage("loginTime", loginTime);
                    try {
                        self.$router.push({ name: "dashboard" }).catch((e) => {});
                    } catch (err) {
                        self.$message({
                            type: "error",
                            message: "取得使用者資料失敗"
                        });
                    }
                } catch (err) {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "登入失敗",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            } catch (err) {
                self.$message({
                    type: "error",
                    message: "表單驗證失敗"
                });
            }
        }
    }
};
</script>
<style lang="scss" scoped>
/deep/ .el-card__header {
    @apply bg-gradient-to-bl from-blue-300 to-blue-100;
    
}
/deep/ .el-form-item__label {
    color: theme("colors.blue.200");
}
/deep/ .el-card.is-always-shadow {
    box-shadow: 0 0 20px theme("colors.blue.200");
}
</style>