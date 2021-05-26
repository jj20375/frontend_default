import axios from "../config/httpConfig";
import { apiConfig } from "../../env";


/**
 * 取得簡訊商列表
 * @param { type Object 搜尋過濾參數 } data
 * @example {
 * name: 簡訊商名稱 type String(字串)
 * key: 簡訊商代號 type String(字串)
 * perPage: 一頁呈現幾筆資料 type Number or String(數字或字串)
 * sort: ["sms_id|DESC"] 排序 type Array(陣列) 
 * }
 */
export const SmsListApi = (data) => {
    return axios.post(`${apiConfig}/sms/lists`, data);
};
/**
 * 取得單一簡訊商資料
 * @param { type Object(物件) } data 傳送參數
 * @example {
 *    sms_id: type String or Number(字串或數字) 簡訊商id
 *    operator_id: type String or Number(字串或數字) 經營者id
 * }
 */
 export const SmsDataApi = (data) => {
    return axios.post(`${apiConfig}/sms/getData`, data );
};
/**
 * 取得可選擇簡訊商列表
 * @param { type Number or String(字串或數字) } operatorId 經營者id
 */
 export const SmsSelectListApi = (operatorId) => {
    return axios.post(`${apiConfig}/sms/selectLists`, { operatorId });
}
/**
 * 新增簡訊
 * @param { type Object(物件) } data 新增簡訊商資料
 * @example {
 *   operator_id: type Number or String(字串或數字) 經營者id
 *   status: type Number(數字) 狀態
 *   key: type String(字串) 簡訊商代號
 *   name: type String(字串) 簡訊商名稱
 *   httpType: type String(字串) 判斷使用http 或 https
 *   url: type String(字串) api網址
 *   key_data: 需要傳送的參數
 * }
 */
 export const AddSmsApi = (data) => {
    return axios.put(`${apiConfig}/sms/create`, data);
};
/**
 * 更新簡訊
 * @param { type Object(物件) } data 更新簡訊商資料
 * @example {
 *   sms_id: ype Number or String(字串或數字) 簡訊商id
 *   status: type Number(數字) 狀態
 *   key: type String(字串) 簡訊商代號
 *   name: type String(字串) 簡訊商名稱
 *   httpType: type String(字串) 判斷使用http 或 https
 *   url: type String(字串) api網址
 *   key_data: 需要傳送的參數
 * }
 */
 export const UpdateSmsApi = (data) => {
    return axios.put(`${apiConfig}/sms/update`, data);
};
/**
 * 發送簡訊
 * @param { type Object(物件) } data
 * @example {
 *   operator_id: type Number or String(字串或數字) 經營者id
 *   sms_id: ype Number or String(字串或數字) 簡訊商id
 *   key: type String(字串) 簡訊商代號
 *   mobile: type String or Number(字串或數字) 手機號碼
 *   message: type String(字串) 傳送訊息
 * }
 */
 export const SmsSendMessageApi = (data) => {
    return axios.put(`${apiConfig}/sms/sendMessage`, data);
};
/**
 * 取得簡訊商的代號
 */
export const GetSmsProvidersApi = () => {
    return axios.get(`${apiConfig}/sms/getProviders`);
}
/**
 * 取得新增簡訊商時需要的 api key 欄位資料
 * @param { type String(字串) } key 表單
 */
export const GetKeyDataApi = (key) => {
    return axios.put(`${apiConfig}/sms/keyData`, {key});
}
/**
 * 刪除簡訊商
 * @param { type String or Number(字串或數字) } sms_id
 */
export const DeleteSmsApi = (sms_id) => {
    return axios.delete(`${apiConfig}/sms/delete`, { params: {sms_id} })
}