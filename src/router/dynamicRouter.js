const dynamicRoutes = [
    {
        path: "/system",
        name: "system",
        ico: "ni ni-settings",
        component: () => import("../views/layout/childLayout/ChildLayout.vue"),
        meta: {
            name: "system",
            text: "系統管理",
        },
        children: [
            {
                path: "system_permission_list",
                name: "system_permission_list",
                component: () => import("../views/permission/index.vue"),
                meta: {
                    name: "system_permission_list",
                    text: "路由權限",
                    parent: "system",
                },
            },
            {
                path: "system_sms_list/:operatorId?",
                name: "system_sms_list",
                component: () => import("../views/sms/index.vue"),
                meta: {
                    name: "system_sms_list",
                    text: "簡訊商列表",
                    parent: "system",
                },
            },
            {
                path: "system_roles",
                name: "system_roles",
                component: () => import("../views/roleGroups/index.vue"),
                meta: {
                    name: "system_roles",
                    text: "群組列表",
                    parent: "system",
                },
            },
            {
                path: "system_roles/:id/:groupCode",
                name: "system_roles_update",
                component: () =>
                    import("../views/roleGroups/PermissionSet.vue"),
                meta: {
                    name: "system_roles_update",
                    text: "群組權限設定",
                    parent: "system",
                },
            },
        ],
    },
    {
        path: "/webControl",
        name: "webControl",
        ico: "ni ni-world",
        component: () => import("../views/layout/childLayout/ChildLayout.vue"),
        meta: {
            name: "webControl",
            text: "網站管理",
        },
        children: [
            {
                path: "webControl_category",
                name: "webControl_category",
                component: () => import("../views/category/index.vue"),
                meta: {
                    name: "webControl_category",
                    text: "分類",
                    parent: "webControl",
                },
            },
            {
                path: "webControl_storeService/:operatorId?",
                name: "webControl_storeService",
                component: () => import("../views/storeService/index.vue"),
                meta: {
                    name: "webControl_storeService",
                    text: "服務",
                    parent: "webControl",
                },
            },
            {
                path: "webControl_tag",
                name: "webControl_tag",
                component: () => import("../views/tag/index.vue"),
                meta: {
                    name: "webControl_tag",
                    text: "標籤",
                    parent: "webControl",
                },
            },
        ],
    },
    {
        path: "/orderControl",
        name: "orderControl",
        ico: "ni ni-box-2",
        component: () => import("../views/layout/childLayout/ChildLayout.vue"),
        meta: {
            name: "orderControl",
            text: "訂單管理",
        },
        children: [
            {
                path: "orderControl_point_order_list/:operatorId?",
                name: "orderControl_point_order_list",
                component: () => import("../views/order/pointOrder/index.vue"),
                meta: {
                    name: "orderControl_point_order_list",
                    text: "點數訂單",
                    parent: "orderControl",
                },
            },
        ],
    },
    {
        path: "/accountControl",
        name: "accountControl",
        ico: "ni ni-single-02",
        component: () => import("../views/layout/childLayout/ChildLayout.vue"),
        meta: {
            name: "accountControl",
            text: "帳號管理",
        },
        children: [
            {
                path: "accountControl_system",
                name: "accountControl_system",
                component: () => import("../views/user/system/index.vue"),
                meta: {
                    name: "accountControl_system",
                    text: "系統",
                    parent: "accountControl",
                },
            },
            {
                path: "accountControl_operator",
                name: "accountControl_operator",
                component: () => import("../views/user/operator/index.vue"),
                meta: {
                    name: "accountControl_operator",
                    text: "經營者",
                    parent: "accountControl",
                },
            },
            {
                path: "accountControl_designer/:id?",
                name: "accountControl_designer",
                component: () => import("../views/user/designer/index.vue"),
                meta: {
                    name: "accountControl_designer",
                    text: "服務提供者",
                    parent: "accountControl",
                },
            },
            {
                path: "accountControl_designer_panel/:account/:operatorId/:designerId",
                name: "accountControl_designer_panel",
                component: () => import("../views/user/designer/panel/index.vue"),
                meta: {
                    name: "accountControl_designer_panel",
                    text: "服務提供者控制台",
                    parent: "accountControl",
                },
            },
            {
                path: "accountControl_assistant/:id?",
                name: "accountControl_assistant",
                component: () => import("../views/user/assistant/index.vue"),
                meta: {
                    name: "accountControl_assistant",
                    text: "助理",
                    parent: "accountControl",
                },
            },
            {
                path: "accountControl_sub/:type?/:userId?/:operatorId?",
                name: "accountControl_sub",
                component: () => import("../views/user/sub/index.vue"),
                meta: {
                    name: "accountControl_sub",
                    text: "子帳號",
                    parent: "accountControl",
                },
            },
            {
                path: "accountControl_operator_permissionSet/:id/:groupCode/:isSub?",
                name: "accountControl_operator_permissionSet",
                component: () =>
                    import("../views/user/operator/PermissionSet.vue"),
                meta: {
                    name: "accountControl_operator_permissionSet",
                    text: "個人權限設定",
                    parent: "accountControl",
                },
            },
            {
                path: "accountControl_member/:operatorId?/:operatorAccount?",
                name: "accountControl_member",
                component: () => import("../views/user/member/index.vue"),
                meta: {
                    name: "accountControl_member",
                    text: "會員",
                    parent: "accountControl",
                },
            },
        ],
    },
    {
        path: "/otherControl",
        name: "otherControl",
        ico: "ni ni-shop",
        component: () => import("../views/layout/childLayout/ChildLayout.vue"),
        meta: {
            name: "otherControl",
            text: "其它管理",
        },
        children: [
            {
                path: "otherControl_chat/:userId?",
                name: "otherControl_chat",
                component: () => import("../views/chat/index.vue"),
                meta: {
                    name: "otherControl_chat",
                    text: "聊天室",
                    parent: "otherControl",
                },
            },
            {
                path: "otherControl_smsSend/:operatorId?",
                name: "otherControl_smsSend",
                component: () => import("../views/smsSend/index.vue"),
                meta: {
                    name: "otherControl_smsSend",
                    text: "簡訊發送",
                    parent: "otherControl",
                },
            },
        ],
    },
];
export default dynamicRoutes;
