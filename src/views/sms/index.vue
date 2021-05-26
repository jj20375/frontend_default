<template>
    <div>
        <button class="blue-btn"
                v-if="$route.meta.params.Create==1"
                @click="clickDialog()">
            新增簡訊商
        </button>
        <el-table :data="datas"
                  header-cell-class-name="theadBg text-white whitespace-nowrap"
                  v-loading="loading"
                  border
                  class="w-full tableBg mt-2">
            <el-table-column label="#"
                             type="index"
                             :index="indexMethod"
                             sortable
                             width="100">
            </el-table-column>
            <el-table-column min-width="150"
                             label="名稱">
                <template v-slot="scope">
                    <div class="font-medium text-blue-700">{{ scope.row.name }}</div>
                    <div class="font-medium text-gray-600">代碼:<span class="ml-2">{{ scope.row.key }}</span></div>
                </template>
            </el-table-column>
            <el-table-column min-width="150"
                             label="簡訊商擁有者">
                <template v-slot="scope">
                    <div class="font-medium text-red-700">帳號:<span class="ml-2">{{ scope.row.user_operator.account }}</span></div>
                    <div class="font-medium text-blue-700">名稱:<span class="ml-2">{{ scope.row.user_operator.name }}</span></div>
                </template>
            </el-table-column>
            <el-table-column label="啟用狀態"
                             width="180">
                <template v-slot="scope">
                    <div class="p-2 bg-indigo-50 rounded-lg inline-block">
                        <el-switch style="display: block;"
                                   v-model="scope.row.status"
                                   :disabled="$route.meta.params.Update == 0"
                                   active-color="#2dce89"
                                   inactive-color="#f5365c"
                                   active-text="啟用"
                                   :active-value="5"
                                   :inactive-value="0"
                                   inactive-text="禁止"
                                   @change="onActive(scope.row, scope.$index)">
                        </el-switch>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作"
                             width="200">
                <template v-slot="scope">
                    <button type="button"
                            class="blue-btn-outline"
                            v-if="$route.meta.params.Update === 1"
                            @click="onEdit(scope.row)">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button type="button"
                            class="red-btn-outline-700 ml-2"
                            v-if="$route.meta.params.Delete === 1"
                            @click="onDelete(scope.row.sms_id, scope.row.name, scope.$index)">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </template>
            </el-table-column>
        </el-table>
        <Form :formData="formData"
              :checkEdit="checkEdit"
              :showDialog="showDialog"
              @onRefresh="resetData"
              @onCloseDialog="closeDialog" />
        <div class="md:text-left text-center">
            <MyPagination :paginationData="paginationData"
                          :currentPage="currentPage"
                          @onGetDatas="paginationAjax" />
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
// sweetalert2 套件
import Swal from "sweetalert2";
// 導入分頁組件
import MyPagination from "../components/MyPagination.vue";
// 新增或更新表單
import Form from "./Form.vue";
/**
 *  SmsListApi = 取得簡訊商列表 api
 *  UpdateSmsApi = 取得簡訊商列表 api
 *  DeleteSmsApi = 刪除簡訊商 api
 */
import { SmsListApi, UpdateSmsApi, DeleteSmsApi } from "../../api/smsApi";
export default {
    components: {
        MyPagination,
        Form
    },
    computed: {
        ...mapState("userStore", ["user"])
    },
    data() {
        return {
            // 列表資料
            datas: [],
            // 判斷是否關閉彈窗
            showDialog: false,
            // 判斷目前是否為更新表單非新增
            checkEdit: false,
            // 搜尋條件
            filterData: {},
            // 分頁機制預設值
            paginationData: {
                perPage: 15,
                total: 0
            },
            // 預設頁數
            currentPage: 1,
            // 取得更新表單資料
            formData: null
        };
    },
    methods: {
        // 自定義索引
        indexMethod(val) {
            let self = this;
            return (self.currentPage - 1) * self.paginationData.perPage + val + 1;
        },
        /**
         * 開關標籤啟用狀態
         * @param { type Object(物件) } data 列表資料
         * @example { sms_id: categories表id, active: 啟用狀態 }
         * @param { type Number(數字) } index 索引值
         */
        async onActive(data, index) {
            let self = this;
            // 表單發送資料
            let sendData = {
                sms_id: data.sms_id,
                operator_id: data.user_operator.operator_id,
                status: data.status,
                key: data.key
            };
            try {
                let { value } = await Swal.fire({
                    title: "請問是否更新狀態?",
                    customClass: {
                        container: "zindex10000"
                    },
                    html: `更新標籤：${data.name}`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "更新!",
                    cancelButtonText: "取消"
                });
                // 判斷是否點擊更新
                if (value) {
                    try {
                        await UpdateSmsApi(sendData);
                        self.$message({
                            type: "success",
                            message: "更新成功"
                        });
                        self.closeDialog();
                        self.datas[index].status = data.status;
                    } catch (err) {
                        self.$message({
                            type: "error",
                            message: "更新失敗"
                        });
                        self.datas[index].status = data.status === 5 ? 0 : 5;
                    }
                } else {
                    self.datas[index].status = data.status === 5 ? 0 : 5;
                }
            } catch (err) {}
        },
        /**
         * 刪除
         * @param { type String or Number (字串或數字) } 服務提供者id
         */
        async onDelete(smsId, name, index) {
            let self = this;
            try {
                let { value } = await Swal.fire({
                    title: "請問是否刪除?",
                    customClass: {
                        container: "zindex10000"
                    },
                    html: `刪除資料：${name}`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "刪除!",
                    cancelButtonText: "取消"
                });
                // 判斷是否點擊刪除
                if (value) {
                    try {
                        await DeleteSmsApi(smsId);
                        self.$message({
                            type: "success",
                            message: "刪除成功"
                        });
                        self.closeDialog();
                        self.datas.splice(index, 1);
                    } catch (err) {
                        self.$message({
                            type: "error",
                            message: "刪除失敗"
                        });
                    }
                }
            } catch (err) {}
        },
        // 搜尋條件
        filterSearch() {
            let self = this;
            // 判斷是否有值 有值就帶入搜尋條件
            checkHaveSelectData(["sms_id|DESC", self.searchName, self.searchKey, self.startTime, self.endTime], ["sort", "name", "key", "startDate", "endDate"], self.filterData);
            // 搜尋完後將分頁改回第一頁
            self.currentPage = 1;
            // 搜尋完後將分頁改回第一頁
            self.filterData.page = 1;
            self.getLists(self.filterData);
        },
        // 重置資料
        resetData() {
            let self = this;
            self.filterData = {};
            // 清空標籤名稱
            self.searchName = null;
            // 清空標籤代碼
            self.searchKey = null;
            // 清空開始時間
            self.startTime = null;
            // 清空結束時間
            self.endTime = null;
            // 清空日期資料
            self.dateValue = null;
            // 清空日期模組資料
            self.getLists({ sort: ["sms_id|DESC"] });
        },
        // 點擊新增時看起的談窗
        clickDialog() {
            let self = this;
            self.showDialog = true;
        },
        // 關閉彈窗
        closeDialog() {
            let self = this;
            self.showDialog = false;
            self.checkEdit = false;
        },
        /**
         * 更新表單事件
         * @param { type Object(物件) } data 選中列表資料
         */
        onEdit(data) {
            let self = this;
            self.showDialog = true;
            self.checkEdit = true;
            // 表單資料取得傳送值
            self.formData = data;
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
            self.datas = [];
            self.currentPage = 1;
            let sendData;
            // 如果有搜尋過後 再切換分頁機制時觸發開判斷式 判斷是否有排序 key為依據
            if (Object.keys(self.filterData).length > 0) {
                sendData = self.filterData;
            } else {
                sendData = {
                    sort: ["sms_id|DESC"]
                };
            }
            // 當pageSize 為 true 時 將一頁呈現幾筆值 改為傳入參數值 false 時 傳入預設的一頁輸出幾筆的值
            sendData.perPage = pageSize ? val : self.paginationData.perPage;
            // 當pageSize 為 true 時 帶入第一頁分頁 false 時 則為傳入分頁頁數值
            sendData.page = pageSize ? 1 : val;
            self.getLists(sendData, pageSize);
        },
        // 取得所標籤列表
        async getLists(sendData, pageSize = false) {
            let self = this;
            self.loading = true;
            try {
                let { data } = await SmsListApi(sendData);
                self.datas = data.data.data;
                self.currentPage = data.data.current_page;
                self.paginationData.total = data.data.total;
                // 當pageSize 為 true 時 將預設一頁呈現幾筆值 改為傳入參數值
                if (pageSize) {
                    self.paginationData.perPage = data.data.per_page;
                }
                self.loading = false;
            } catch (err) {
                console.log(err);
                self.loading = false;
                self.$message({
                    type: "error",
                    message: "取得簡訊商列表失敗"
                });
            }
        }
    },
    created() {
        let self = this;
        self.getLists({ sort: ["sms_id|DESC"] });
    }
};
</script>
