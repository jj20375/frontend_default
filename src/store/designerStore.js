export default {
    namespaced: true,
    // data
    state: {
        // 服務提供者名稱
        designerName: null,
    },
    // methods
    mutations: {
        // 設定為登入
        setDesignerName(state, val) {
            state.designerName = val;
        },
    },
    // mounted ajax的方法都寫在這
    actions: {
    },
};
