// 獲取樹狀代理資料 api
import { OperatorUserTreeListsApi } from "../api/operatorApi";
import { Message } from "element-ui";
export default {
    data() {
        return {
            // 預設選中經營者id
            defaultCheckedKeys: [],
            // 樹狀資料
            treeData: [],
        }
    },
    methods: {
        /**
         * 取得樹狀代理資料
         * @param { type String or Number(字串或數字) } operatorId 經營者id
         */
        async getOperatorTreeLists(operatorId) {
            let self = this;
            try {
                let { data } = await OperatorUserTreeListsApi(operatorId);
                self.treeData = data.data;
            } catch (err) {
                Message({
                    type: "error",
                    message: "取得經營者樹狀列表失敗",
                });
            }
        },
    },
}