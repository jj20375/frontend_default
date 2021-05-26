<template>
    <el-select v-model="value"
               filterable
               remote
               reserve-keyword
               placeholder="請輸入店家帳號"
               :remote-method="remoteMethod"
               :loading="loading"
               clearable
               class="w-100"
               @change="onSelect(value)">
        <el-option v-for="(item,index) in options"
                   :key="index"
                   :label="item.name"
                   :value="item.operator_id">
        </el-option>
    </el-select>
</template>

<script>
// 模糊搜尋經營者 api
import { OperatorRemoteListsApi } from "../../api/operatorApi";
export default {
    props: {
        name: {
            type: String,
            default: ""
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
         * @param { type String(字串) } account 帳號
         */
        async getData(account) {
            let self = this;
            try {
                let { data } = await OperatorRemoteListsApi({ account: account });
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
            self.$emit("onSelect", val);
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
