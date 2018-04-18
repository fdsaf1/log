export const navLists = [{
        title: '询价管理',
        url: '',
        name: 'enquire',
        icon: 'icon-enquire',
        checked: true,
        showed: true,
        children: [{
                title: '待分发',
                checked: false,
                url: '/enquire/distribution'
            },
            {
                title: '待选择',
                checked: false,
                url: '/enquire/choose'
            },
            {
                title: '已报价',
                checked: false,
                url: '/enquire/responded'
            },
            {
                title: '已支付',
                checked: false,
                url: '/enquire/payed'
            },
            {
                title: '已完成',
                checked: false,
                url: '/enquire/complete'
            }
        ]
    },
    {
        title: '查询订单',
        name: 'query',
        icon: 'icon-query',
        checked: false,
        showed: true,
        children: [{
            title: '运单查询',
            checked: false,
            url: '/query/carry-order'
        }]
    },
    {
        title: '系统后台管理',
        name: 'manage',
        icon: 'icon-manage',
        checked: false,
        showed: true,
        children: [{
                title: '管理平台账号',
                checked: false,
                url: '/manage/account'
            },
            {
                title: '供应商路线设置',
                checked: false,
                url: '/manage/router'
            },
            {
                title: '物流公司管理',
                checked: false,
                url: '/manage/logistics'
            },
            {
                title: '车辆管理',
                checked: false,
                url: '/manage/cart'
            },
            {
                title: '地址管理',
                checked: false,
                url: '/manage/address'
            }
        ]
    }
];