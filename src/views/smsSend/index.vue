<template>
    <div>
        <div class="grid grid-cols-12 gap-4">
            <div class="md:col-span-3 col-span-12">
                <label>月份</label>
                <el-select class="w-full"
                           clearable
                           v-model="searchMonth"
                           placeholder="請選擇">
                    <el-option v-for="item in 12"
                               :key="item"
                               :label="item"
                               :value="item">
                    </el-option>
                </el-select>
            </div>
            <div class="md:col-span-3 col-span-12">
                <label>日期</label>
                <el-select class="w-full"
                           clearable
                           v-model="searchDay"
                           placeholder="請選擇">
                    <el-option v-for="item in 31"
                               :key="item"
                               :label="item"
                               :value="item">
                    </el-option>
                </el-select>
            </div>
            <div class="md:col-span-3 col-span-12">
                <label>刪除不想接受簡訊客戶</label>
                <el-select class="w-full"
                           clearable
                           v-model="searchSendSmsActive"
                           placeholder="請選擇">
                    <el-option v-for="(item,key) in activeOptions"
                               :key="key"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="md:col-span-3 col-span-12"
                 v-if="user.group.group_code === 'SYSTEM'">
                <label class="block">店家搜尋</label>
                <RemoteOperatorInput @onSelect="selectOperator"
                                     ref="remoteOperatorInput" />
            </div>
            <div class="col-span-12 mt-2 mb-2">
                <button class="blue-btn"
                        @click="filterSearch()">
                    <i class="fas fa-search"></i>搜尋
                </button>
                <button class="blue-btn-outline ml-2"
                        @click="resetData()">
                    <i class="fas fa-redo-alt"></i>重置
                </button>
            </div>
        </div>
        <div class="grid grid-cols-12 gap-4"
             v-if="datas.length > 0">
            <div class="md:col-span-6 col-span-12">
                <el-form :label-position="'left'"
                         ref="form"
                         :model="form"
                         :rules="rules">
                    <el-form-item label="簡訊商"
                                  prop="smsData">
                        <el-select v-model="form.smsData"
                                   placeholder="請選擇">
                            <el-option v-for="(item,index) in smsProvidersOptions"
                                       :key="index"
                                       :label="item.name"
                                       :value="{sms_id: item.sms_id, key: item.key}">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="發送訊息"
                                  prop="message">
                        <el-input type="textarea"
                                  rows="20"
                                  v-model="form.message"></el-input>
                        <strong :class="checkLength >= 70 ? 'text-red-700': 'text-gray-800'">字數：{{checkLength}}<span class="ml-2">(超過70字時需要消耗多一個點數發送)</span></strong>
                        <div class="float-right">
                            <el-button type="primary"
                                       @click="onSubmit('form')">確定</el-button>
                        </div>
                    </el-form-item>
                </el-form>

            </div>
            <div class="md:col-span-6 col-span-12"
                 v-loading="loading">
                <div class="bg-white shadow-xl rounded-lg">
                    <h1 class="text-center mb-2 bg-blue-700 text-white py-2 rounded-tl-lg rounded-tr-lg">發送名單</h1>
                    <div class="py-1 px-3 border-b border-gray-400"
                         v-for="(item,index) in datas"
                         :key="index">
                        <label :for="'checkbox'+index"
                               class="mr-2">
                            <input :id="'checkbox'+index"
                                   type="checkbox"
                                   :value="item.member_id"
                                   v-model="selected" />
                        </label>
                        <h3 class="text-blue-700 text-xl inline-block mb-0 mr-2">{{ item.name }}</h3>
                        <p class="text-md font-normal text-gray-600 inline-block ml-2 mb-0">電話:{{ item.phone }}</p>
                        <p class="text-sm inline-block text-gray-500 ml-2 mb-0">生日:{{ item.birthday }}</p>
                        <span class="text-sm inline-block ml-2 mb-0 text-white p-1 rounded-lg"
                              :class="item.sendSmsActive === 1 ? 'bg-green-700' : 'bg-red-700'">{{ item.sendSmsActive === 1 ? '接收簡訊' : '不想收簡訊' }}</span>
                    </div>
                    <div class="md:text-left text-center">
                        <MyPagination :paginationData="paginationData"
                                      :currentPage="currentPage"
                                      @onGetDatas="paginationAjax" />
                    </div>
                </div>
                <div class="bg-white shadow-xl rounded-lg mt-2">
                    <h1 class="text-center mb-2 bg-blue-700 text-white py-2 rounded-tl-lg rounded-tr-lg">新增名單</h1>
                    <div class="card-body py-1 px-3 borderBottomWidth1 hotBorder"
                         v-for="(item,index) in addMembers"
                         :key="index">
                        <h3 class="text-blue-700 text-xl inline-block mb-0 mr-2">{{ item.name }}</h3>
                        <p class="text-md font-normal text-gray-500 inline-block ml-2 mb-0">電話:{{ item.phone }}</p>
                        <button type="button"
                                class="ml-2 red-btn-outline-700"
                                @click="deleteRow(index)">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                    <div class="py-1 px-3">
                        <el-input v-model="addForm.name"
                                  clearable
                                  placeholder="請輸入名稱"></el-input>
                        <el-input v-model="addForm.phone"
                                  clearable
                                  placeholder="請輸入電話"></el-input>
                        <el-button type="info"
                                   class="mt-2"
                                   @click="addMember()">新增</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
// 取得可選擇簡訊商
import { SmsSelectListApi, SmsSendMessageApi } from "../../api/smsApi";
// 搜尋過濾發送簡訊客戶名單
import { SendSmsMemberListsApi } from "../../api/memberApi";
// 導入搜尋條件判斷式
import { checkHaveSelectData } from "../../service/anyService";
// 導入分頁組件
import MyPagination from "../components/MyPagination.vue";
// 導入經營者模糊比對搜尋組件
import RemoteOperatorInput from "../components/RemoteOperatorInput.vue";
export default {
    components: {
        MyPagination,
        RemoteOperatorInput
    },
    computed: {
        ...mapState("userStore", ["user"]),
        ...mapGetters("userStore", ["getOperatorId"]),
        checkLength() {
            let self = this;
            return self.form.message.replace(/[^\x00-\xff]/gi, "**").length;
        }
    },
    data() {
        return {
            form: { message: "" },
            rules: {
                smsData: [{ required: true, trigger: "change", message: "請選擇簡訊商" }],
                message: [{ required: true, trigger: "blur", message: "請輸入發送訊息" }]
            },
            // 列表資料
            datas: [],
            loading: false,
            // 搜尋月份
            searchMonth: null,
            // 搜尋日期
            searchDay: null,
            // 判斷是否需要過濾不想接受簡訊客戶
            searchSendSmsActive: null,
            // 搜尋經營者id
            searchOperatorId: null,
            // 選擇是否需要過濾不想接受簡訊客戶
            activeOptions: [
                { label: "是", value: 1 },
                { label: "否", value: null }
            ],
            // 搜尋過濾時送出的物件
            filterData: {},
            // 可選擇簡訊商
            smsProvidersOptions: [],
            // 選擇到不發送簡訊人員
            selected: [],
            // 當前分頁頁碼
            currentPage: 1,
            // 分頁機制預設值
            paginationData: {
                perPage: 50,
                total: 0
            },
            // 新增發送簡訊人員
            addForm: {},
            // 新增名單
            addMembers: []
        };
    },
    methods: {
        deleteRow(index) {
            let self = this;
            self.addMembers.splice(index, 1);
        },
        // 新增簡訊發送人員
        addMember() {
            let self = this;
            self.addForm.birthday = null;
            self.addForm.member_id = 0;
            self.addMembers.unshift(self.addForm);
            // 須清空原先值 否則會連動 更新array index的值
            self.addForm = {};
        },
        /**
         * 分頁切換或單頁幾筆資料呈現切換時 會觸發
         * @param { type Number(數字)
         *  如果是分頁切換 該數值 為分頁頁碼
         *  如果是一頁呈現幾筆資料的切換 該數值 為一頁幾筆資料數值 } val
         * @param { type Boolean(true or false) } pageSize 判斷是否有進行分頁切換 或者 一頁幾筆資料呈現的切換
         */
        paginationAjax(val, pageSize) {
            let self = this;
            // 總計筆數
            self.paginationData.total = self.allDatas.length;
            // 如果為 true 時 代表是選擇一頁幾筆的頁數資料
            if (pageSize) {
                self.paginationData.perPage = val;
                self.currentPage = 1;
            } else {
                // 更改當前分頁值
                self.currentPage = val;
            }
            // 分頁計算公式
            self.datas = self.allDatas.slice((self.currentPage - 1) * self.paginationData.perPage, self.currentPage * self.paginationData.perPage);
        },
        // 經營者搜尋結果回傳
        selectOperator(val) {
            let self = this;
            self.searchOperatorId = val;
            self.getSmsProviders(val);
        },
        // 重置資料
        resetData() {
            let self = this;
            // 清空過濾資料
            self.filterData = {};
            // 清空搜尋月份
            self.searchMonth = null;
            // 清空搜尋日期
            self.searchDay = null;
            // 清空搜尋經營者id
            self.searchOperatorId = null;
            // 清空搜尋接受簡訊客戶判斷
            self.searchSendSmsActive = null;
            // 因為只有系統人員才能選擇，因此系統人員操作時才做清空處理
            if (self.user.group.group_code === "SYSTEM") {
                // 清空模糊搜尋經營者資料
                self.$refs.remoteOperatorInput.resetData();
            }
            // 清空列表資料
            self.datas = [];
            self.allDatas = [];
            // 清空新增名單
            self.addMembers = [];
            // 清空選擇到的會員名單
            self.selected = [];
            // 清空表單
            self.form = {
                message: ""
            };
        },
        // 搜尋按鈕
        filterSearch() {
            let self = this;
            if (self.user.group.group_code !== "SYSTEM") {
                self.searchOperatorId = self.getOperatorId;
            }
            checkHaveSelectData([self.searchMonth, self.searchDay, self.searchSendSmsActive, self.searchOperatorId], ["month", "day", "sendSmsActive", "operator_id"], self.filterData);
            self.getLists(self.filterData);
        },

        /**
         * 取得會員帳號列表
         */
        async getLists(sendData) {
            let self = this;
            self.loading = true;
            try {
                let { data } = await SendSmsMemberListsApi(sendData);
                self.allDatas = data.data;
                self.paginationData.total = self.allDatas.length;
                self.datas = self.allDatas.slice(0, self.paginationData.perPage);
                self.loading = false;
                self.selected = [];
            } catch (err) {
                console.log(err);
                self.loading = false;
                self.$message({
                    type: "error",
                    message: "取的會員列表失敗"
                });
            }
        },
        async getSmsProviders(operatorId) {
            let self = this;
            try {
                let { data } = await SmsSelectListApi(operatorId);
                self.smsProvidersOptions = data.data;
            } catch (err) {
                self.smsProvidersOptions = [];
                self.$message({
                    type: "error",
                    message: "取得簡訊商失敗"
                });
            }
        },
        /**
         * 表單發送
         * @param { type String(字串) } formName 傳送表單名稱
         * @example ref="form"
         */
        async onSubmit(formName) {
            let self = this;
            try {
                // 等待表單驗證是否成功 try catch 會自動判斷是 true 或 false 因次不用寫 if 判斷
                await self.$refs[formName].validate();
                self.form.phones = [];
                // 過濾掉以選擇不發送的名單
                self.form.phones = self.allDatas.filter((item) => {
                    return self.selected.indexOf(item.member_id) === -1; 
                }).map(item => item.phone);
                self.form.sms_id = self.form.smsData.sms_id;
                self.form.key = self.form.smsData.key;
                // 新增自定義的發送名單
                self.form.phones.push(...self.addMembers.map((item) => item.phone));
                self.sendSms(self.form);
            } catch (err) {
                self.$message({
                    type: "error",
                    message: "表單驗證失敗"
                });
            }
        },
        /**
         * 簡訊發送
         * @param { type Object(物件) } 簡訊發送資料
         */
        async sendSms(form) {
            let self = this;
            try {
                await SmsSendMessageApi(form);
                self.$message({
                    type: "success",
                    message: "發送成功"
                });
                self.resetData();
            } catch (err) {
                self.$message({
                    type: "error",
                    message: "簡訊發送失敗"
                });
            }
        }
    },
    created() {
        let self = this;
        if (self.user.group.group_code !== "SYSTEM") {
            self.getSmsProviders(self.getOperatorId);
        }
    }
};
</script>
