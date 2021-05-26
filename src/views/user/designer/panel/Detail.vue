<template>
    <div class="mt-2">
        <Editor v-model="form.note"
                :api-key="tinymceApiKey"
                :init="tinymceInit" />
        <div class="text-right">
            <el-button type="primary"
                       @click="onSubmit()">更新</el-button>
        </div>
    </div>
</template>

<script>
// 導入 tinymce 編輯器
import Editor from "@tinymce/tinymce-vue";
// tinymce 編輯器設定檔
import tinymceEditorMixin from "../../../../service/tinymceEditorMixin";
/**
 * DesignerUserDataApi = 取得服務提供者資料api
 * UpdateDesignerApi = 更新服務提供者api
 */
import {
    DesignerUserDataApi,
    UpdateDesignerApi,
} from "../../../../api/designerApi";
export default {
    components: {
        Editor,
    },
    mixins: [tinymceEditorMixin],
    data() {
        return {
            // 檔案目錄路徑
            folderPath: null,
            // 服務提供者介紹文案
            form: { note: null },
        };
    },
    methods: {
        /**
         * 取得服務提供者資料
         * @param { type String or Number(字串或數字) }account 服務提供者人員id
         */
        async getData(account) {
            let self = this;
            try {
                let { data } = await DesignerUserDataApi(account);
                self.form = {
                    designer_id: data.data.designer_id,
                    operator_id: data.data.user_operator.operator_id,
                    user_id: data.data.user.user_id,
                    note: data.data.note,
                };
            } catch (err) {
                self.$message({
                    type: "error",
                    message: "取的資料失敗",
                });
            }
        },
        /**
         * 表單發送
         */
        async onSubmit() {
            let self = this;
            try {
                await UpdateDesignerApi(self.form);
                self.$message({
                    type: "success",
                    message: "更新服務提供者成功",
                });
                self.getData(self.$route.params.account);
            } catch (err) {
                self.$message({
                    type: "error",
                    message: "更新服務提供者失敗",
                });
            }
        },
    },
    created() {
        let self = this;
        self.getData(self.$route.params.account);
        self.folderPath = `operator/${self.$route.params.operatorId}/designer/${self.$route.params.designerId}/detail`;
    },
};
</script>
