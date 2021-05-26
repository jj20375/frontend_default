//判斷是否為空值或空物件
export const isEmpty = (value) => {
    return value === undefined || value === null || (typeof value === "object" && Object.keys(value).length === 0) || (typeof value === "string" && value.trim().length === 0) || value.length === 0;
};


/**
 * 判斷語系檔 是否存在 不存在則回傳key
 * @param { type Object (物件) 該值為語系檔的值} value
 * @param { type String (字串) 該值為檔案名稱 } langFile
 * @param { type String (字串) 該值為要傳入對應語系檔得key } langKey
 */
 export const checkLang = function(value, langFile, langKey) {
    if (value !== null) {
        if (value[langFile] !== null && value[langFile] !== undefined) {
            if (value[langFile][langKey] === undefined) {
                return langKey;
            } else {
                return value[langFile][langKey].name;
            }
        } else {
            return "連語系檔都還沒有";
        }
    }
};

// 貨幣判斷三位數增加逗號
export let formatCurrency = function(num) {
    let result = Math.floor(num * 100) / 100;
    return result.toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, function(all, pre, groupOf3Digital) {
        return pre + groupOf3Digital.replace(/\d{3}/g, ",$&");
    });
};
/**
 * @param { type = Array  傳入要搜尋條件得陣列值 } val
 * @param { type = Array  傳入要搜尋條件所匹配的key } key
 * @param { type = String 傳入要回傳的物件變數 } objVar
 */
export const checkHaveSelectData = function(val, key, objVar) {
    let self = this;
    val.forEach((item, index) => {
        if (item === null || item === "") {
            delete objVar[key[index]];
        } else {
            objVar[key[index]] = item;
            return objVar;
        }
    });
};