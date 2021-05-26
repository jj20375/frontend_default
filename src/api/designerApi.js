import axios from "../config/httpConfig";
import { apiConfig } from "../../env";
/**
 * 取得服務提供者列表
 * @param { type Object(物件) } data 分頁過濾參數
 * @example {
 * account: 帳號 type String(字串)
 * name: 名稱 type String(字串)
 * nickname: 暱稱 type String(字串)
 * status: 狀態值 type Number(數字)
 * sort: ["designer_id|DESC"] 排序 type Array(陣列)
 * perPage: 一頁幾筆資料 type Number(數字)
 * }
 */
 export const DesignerUserListApi = (data) => {
    return axios.post(`${apiConfig}/userDesigner/lists`, data);
};
/**
 * 取得指定id專屬服務提供者列表
 * @param { type Object(物件) } data 分頁過濾參數
 * @example {
 * account: 帳號 type String(字串)
 * name: 名稱 type String(字串)
 * nickname: 暱稱 type String(字串)
 * status: 狀態值 type Number(數字)
 * sort: ["designer_id|DESC"] 排序 type Array(陣列)
 * perPage: 一頁幾筆資料 type Number(數字)
 * operatorId: 經營者id type Number or String(數字或字串)
 * }
 */
export const DesignerUserListByIdApi = (data) => {
    return axios.post(`${apiConfig}/userDesigner/listsById`, data);
};
/**
 * 取得可選擇服務提供者列表
 * @param { type Number or String(字串或數字) } operatorId 經營者id
 */
 export const DesignerSelectListApi = (operatorId) => {
    return axios.post(`${apiConfig}/userDesigner/selectLists`, { operatorId });
}
/**
 * 取得服務提供者單一資料
 * @param { type String } account 服務提供者帳號
 */
export const DesignerUserDataApi = (account) => {
    return axios.post(`${apiConfig}/userDesigner/getData`, { account });
};
/**
 * 新增服務提供者
 * @param { type Objcet } data 新增服務提供者資料
 * @example {
 * operator_id: 經營者id type Number or String(數字或字串)
 * name: 名稱 type String(字串)
 * nickname: 名稱 type String(字串) 非必要值
 * account: 帳號 type String(字串)
 * password: 密碼 type String(字串)
 * group_id: 群組id type Number or String(數字或字串)
 * birthday: 生日 type Date or String(日期格式) 非必要值
 * status: 狀態值 type Number or String(數字或字串)
 * remarks: 備註 type String(數字或字串) 非必要值
 * note: 描述資料 type String(數字或字串) 非必要值
 * }
 */
 export const AddDesignerApi = (data) => {
    return axios.post(`${apiConfig}/userDesigner/create`, data);
};
/**
 * 更新服務提供者
 * @param { type Objcet } data 更新服務提供者資料
 * @example {
 * designer_id: 服務提供者id type Number or String(數字或字串)
 * operator_id: 經營者id type Number or String(數字或字串)
 * user_id: 服務提供者 users表 id type Number or String(數字或字串)
 * name: 名稱 type String(字串) 非必要值
 * nickname: 名稱 type String(字串) 非必要值
 * password: 密碼 type String(字串) 非必要值
 * group_id: 群組id type Number or String(數字或字串) 非必要值
 * birthday: 生日 type Date or String(日期格式) 非必要值
 * status: 狀態值 type Number or String(數字或字串)
 * remarks: 備註 type String(數字或字串) 非必要值
 * note: 描述資料 type String(數字或字串) 非必要值
 * }
 */
export const UpdateDesignerApi = (data) => {
    return axios.post(`${apiConfig}/userDesigner/update`, data);
};
/**
 * 刪除服務提供者圖片
 * @param { type String } imgPath 圖片路徑
 * @param { type String or Number (字串或數字) } designerId 服務提供者id
 * @returns
 */
 export const DeleteDesignerImage = (imgPath, designerId) => {
    return axios.delete(`${apiConfig}/userDesigner/deleteImage`, {
        data: { imgPath, designerId },
    });
};

/**
 * 新增服務提供者技術項目
 * @param { type Object(物件) } data 新增技術項目資料
 * @example {
 * category_id: type Number or String(數字或字串) 分類id
 * designerId: type Number or String(數字或字串) 服務提供者id
 * name: type String(字串) 技術項目 
 * price: type Number(數字) 價位
 * operator_ids type Array(陣列) 經營者id (非必須)
 * }
 */
export const CreateDesignerServiceApi = (data) => {
    return axios.put(`${apiConfig}/userDesigner/createService`, data);
}
/**
 * 更新服務提供者技術項目
 * @param { type Object(物件) } data 更新技術項目資料
 * @example { 
 * type Number or String(數字或字串) 服務id
 * designerId: type Number or String(數字或字串) 服務提供者id
 * category_id: type Number or String(數字或字串) 分類id (非必須)
 * name: type String(字串) 技術項目 (非必須)
 * price: type Number(數字) 價位 (非必須)
 * operator_ids type Array(陣列) 經營者id (非必須) 
 * }
 */
 export const UpdateDesignerServiceApi = (data) => {
    return axios.put(`${apiConfig}/userDesigner/updateService`, data);
}
/**
 * 服務提供者技術項目列表
 * @param { type String or Number(字串或數字) } designerId 服務提供者id
 * @param { type Object(物件) } data 分頁搜尋過濾條件
 */
export const DesignerServiceListsApi = (designerId, data = null) => {
    let sendData = data === null ? {} : data;
    sendData["designerId"] = designerId;
    return axios.put(`${apiConfig}/userDesigner/serviceLists`, sendData);
} 
/**
 * 服務提供者技術項目列表
 * @param { type String or Number(字串或數字) } designerId 服務提供者id
 */
export const DesignerServiceSelectListsApi = (designerId) => {
    return axios.put(`${apiConfig}/userDesigner/serviceSelectLists`, {designerId});
} 