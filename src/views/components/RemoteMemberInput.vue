<template>
    <el-select v-model="value"
               filterable
               remote
               reserve-keyword
               placeholder="請輸入店家帳號"
               :remote-method="remoteMethod"
               :loading="loading"
               clearable
               class="w-full"
               @change="onSelect(value)">
        <el-option v-for="(item,index) in options"
                   :key="index"
                   :label="item.name"
                   :value="item.member_id">
        </el-option>
    </el-select>
</template>

<script>
// 模糊搜尋會員 api
import { MemberRemoteListsApi } from "../../api/memberApi";
export default {
    props: {
        name: {
            type: String,
            default: ""
        },
        operatorId: {
            type: [String, Number],
            default: null
        },
        // 搜尋的欄位key
        searchKey: {
            type: String,
            default: null,
        }
    },
    data() {
        return {
            options: [],
            value: null,
            loading: false
        };
    },
    methods: {
        /**
         * 遠程搜尋
         * @param { type String(字串) } query 搜尋字串
         */
        remoteMethod(query) {
            let self = this;
            if (query !== "") {
                self.loading = true;
                setTimeout(() => {
                    self.getData(query);
                }, 1000);
            } else {
                self.options = [];
            }
        },
        /**
         * 取得資料
         * @param { type Object(物件) } params 搜尋參數
         */
        async getData(value) {
            let self = this;
            let params = {};
            params["operator_id"] = self.operatorId;
            params[self.searchKey] = value;
            try {
                let { data } = await MemberRemoteListsApi(params);
                self.loading = false;
                self.options = data.data;
            } catch (err) {
                self.$message({
                    type: "error",
                    message: "查詢失敗"
                });
            }
        },
        /**
         * 選中經營者id
         * @param { type Number(數字) } val 經營者id
         */
        onSelect(val) {
            let self = this;
            self.$emit("update:onSelect", val);
        },
        resetData() {
            let self = this;
            self.value = null;
        }
    },
    mounted() {
        let self = this;
        self.value = self.name;
    }
};
</script>
