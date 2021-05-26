<template>
    <div>
        <el-dialog :visible.sync="showDialog"
                   :close-on-click-modal="true"
                   :show-close="true"
                   :modal-append-to-body="true"
                   :close-on-press-escape="true"
                   :before-close="closeDialog"
                   @open="openDialog"
                   :width="isMobile ? '100%' : '50%'"
                   center>
            <el-select v-model="provider"
                       @change="providerChange(provider)"
                       placeholder="請選擇">
                <el-option v-for="item in providerOptions"
                           :key="item.key"
                           :label="item.name"
                           :value="item">
                </el-option>
            </el-select>
            <el-form :label-position="'left'"
                     ref="form"
                     v-if="provider !== null"
                     label-width="120px"
                     :model="form"
                     :rules="rules">
                <div class="grid grid-cols-12">
                    <div class="md:col-span-6 col-span-12">
                        <el-form-item label="簡訊商名稱"
                                      prop="name">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="簡訊商代碼"
                                      prop="key">
                            <el-input disabled
                                      v-model="form.key"></el-input>
                        </el-form-item>
                        <el-form-item label="店家">
                            <RemoteOperatorInput @onSelect="selectOperator"
                                                 :name="checkEdit ? formData.user_operator.name : ''" />
                        </el-form-item>
                        <el-form-item label="狀態"
                                      prop="status">
                            <el-select v-model="form.status"
                                       placeholder="請選擇狀態">
                                <el-option v-for="item in statusOptions"
                                           :key="item.value"
                                           :label="item.name"
                                           :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="API網址"
                                      prop="url">
                            <el-input v-model="form.url"></el-input>
                        </el-form-item>
                        <el-form-item label="http狀態"
                                      prop="httpType">
                            <el-select v-model="form.httpType"
                                       placeholder="請選擇狀態">
                                <el-option v-for="(item,index) in httpOptions"
                                           :key="index"
                                           :label="item"
                                           :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <h5>API參數</h5>
                        <el-form-item :label="keyData.label"
                                      :prop="`key_data.${key}`"
                                      :rules="[{required: true, trigger: 'blur', message: `請輸入${keyData.label}`}]"
                                      v-for="(keyData, key) in keyDatas"
                                      :key="key">
                            <el-input v-model="form.key_data[key]"
                                      v-if="keyData.type === 'input'"></el-input>
                            <el-select v-model="form.key_data[key]"
                                       v-if="keyData.type === 'select'">
                                <el-option label="請選擇"
                                           :value="null"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
            <div class="w-full"
                 v-if="user.group.group_code === 'SYSTEM' && provider !== null">
                <TreeSelect :treeData="treeData"
                            :defaultCheckedKeys="defaultCheckedKeys"
                            @onSelected="selectedOperators" />
            </div>
            <span slot="footer"
                  class="dialog-footer">
                <el-button type="primary"
                           @click="onSubmit('form')">確定</el-button>
                <el-button @click="closeDialog">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
// 樹狀選取框
import TreeSelect from "../components/MyTreeSelect.vue";
// 樹狀選擇框 設定檔
import treeSelectMixin from "../../service/treeSelectMixin";
/**
 * GetSmsProvidersApi = 取得可選擇簡訊商
 * GetKeyDataApi = api參數欄位key
 * AddSmsApi = 新增簡訊商 api
 * UpdateSmsApi = 更新簡訊商 api
 */
import { GetSmsProvidersApi, GetKeyDataApi, AddSmsApi, UpdateSmsApi } from "../../api/smsApi";
// 模糊比對搜尋經營者
import RemoteOperatorInput from "../components/RemoteOperatorInput.vue";
export default {
    props: {
        showDialog: {
            type: Boolean
        },
        // 取得更新資料
        formData: {
            type: Object
        },
        // 判斷是否為更新
        checkEdit: {
            type: Boolean
        }
    },
    components: {
        TreeSelect,
        RemoteOperatorInput
    },
    mixins: [treeSelectMixin],
    computed: {
        ...mapState("userStore", ["user"]),
        // 取得每個登入身份使用者的經營者id
        ...mapGetters("userStore", ["getOperatorId"])
    },
    data() {
        return {
            form: { key_data: {} },
            // 驗證規則
            rules: {
                name: [
                    {
                        required: true,
                        message: "請輸入名稱",
                        trigger: "blur"
                    }
                ],
                key: [
                    {
                        required: true,
                        message: "請輸入代碼",
                        trigger: "blur"
                    }
                ],
                url: [
                    {
                        required: true,
                        message: "請輸入API網址",
                        trigger: "blur"
                    }
                ],
                status: [
                    {
                        required: true,
                        message: "請選擇狀態",
                        trigger: "change"
                    }
                ],
                httpType: [
                    {
                        required: true,
                        message: "請選擇http狀態",
                        trigger: "change"
                    }
                ]
            },
            // 選擇啟用狀態
            statusOptions: [
                { name: "啟用", value: 5 },
                { name: "禁止", value: 0 }
            ],
            // 選擇http狀態
            httpOptions: ["http", "https"],
            // 可使用的經營者id
            defaultCheckedKeys: [],
            // 可選擇簡訊商
            providerOptions: [],
            // 選中廠商
            provider: null,
            // api key 參數
            keyDatas: {}
        };
    },
    methods: {
        closeDialog() {
            let self = this;
            self.form = { key_data: {} };
            self.$emit("onCloseDialog");
            self.$refs.form.clearValidate(["name", "key", "key_data", "url", "httpType"]);
        },
        // 新增
        async add(form) {
            let self = this;
            try {
                await AddSmsApi(form);
                self.$message({
                    type: "success",
                    message: "新增成功"
                });
                // 關閉彈窗
                self.closeDialog();
                // 重新取得資料
                self.refresh();
            } catch (err) {
                console.log(err);
                self.$message({
                    type: "error",
                    message: "新增失敗"
                });
            }
        },
        // 更新
        async update(form) {
            let self = this;
            try {
                await UpdateSmsApi(form);
                self.$message({
                    type: "success",
                    message: "更新成功"
                });
                // 關閉彈窗
                self.closeDialog();
                // 重新取得資料
                self.refresh();
            } catch (err) {
                self.$message({
                    type: "error",
                    message: "更新失敗"
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
                await self.$refs[formName].validate();
                if (self.form.operator_ids === null) {
                    self.form.operator_ids = JSON.stringify([]);
                }
                self.form.key_data = JSON.stringify(self.form.key_data);
                // 判斷是否為更新
                if (self.checkEdit) {
                    self.update(self.form);
                    return;
                }
                self.add(self.form);
            } catch (err) {
                self.$message({
                    type: "error",
                    message: "表單驗證失敗"
                });
            }
        },
        // 重新取得資料
        refresh() {
            let self = this;
            self.$emit("onRefresh");
        },
        // 取得簡訊商選擇列表
        async getProvider() {
            let self = this;
            try {
                let { data } = await GetSmsProvidersApi();
                self.providerOptions = data.data;
            } catch (err) {
                self.$message({
                    type: "error",
                    message: "取得可選擇簡訊商失敗"
                });
            }
        },
        async getKeyData(key) {
            let self = this;
            try {
                let { data } = await GetKeyDataApi(key);
                // 新增 api 參數 欄位 輸入匡
                Object.keys(data.data).map((objKey) => {
                    self.$set(self.keyDatas, objKey, data.data[objKey]);
                    if (!self.checkEdit) {
                        self.$set(self.form.key_data, objKey, null);
                    }
                });
            } catch (err) {
                self.$message({
                    type: "error",
                    message: "取得簡訊商keyData失敗"
                });
            }
        },
        /**
         * 簡訊商選擇後觸發事件
         * @param { type String(字串) } val 簡訊商資料
         */
        providerChange(val) {
            let self = this;
            self.getKeyData(val.key);
            // self.$set(self.form, "name", val.name);
            self.$set(self.form, "key", val.key);
        },
        // 選擇到的經營者 id
        selectedOperators(val) {
            let self = this;
            self.form.operator_ids = JSON.stringify(val);
        },
        // 取得經營者id
        selectOperator(val) {
            let self = this;
            self.form.operator_id = val;
        },
        openDialog() {
            let self = this;
            // 判斷是否更新
            if (self.checkEdit) {
                // 儲存 api 參數 key 資料變數
                let keyData = {};
                // 判斷此資料是否已解析過 解析過格式為 object
                if (typeof self.formData.key_data === "string") {
                    // 解析json字串
                    keyData = JSON.parse(self.formData.key_data);
                } else {
                    keyData = self.formData.key_data;
                }
                // 表單資料
                self.form = self.formData;
                // 設定key_data 解析後的json 資料
                self.$set(self.form, "key_data", keyData);
                // 預設選中下層經營者
                self.defaultCheckedKeys = self.form.operator_ids === null ? [] : JSON.parse(self.form.operator_ids);
                // 選擇到的簡訊廠商
                self.provider = { key: self.formData.key, name: self.formData.name };
                // 取得api參數key
                self.getKeyData(self.formData.key);
            }
            self.getOperatorTreeLists(self.getOperatorId);
            self.getProvider();
        }
    }
};
</script>
