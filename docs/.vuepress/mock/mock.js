var Mock = require('mockjs');


// 展开行示例数据
Mock.mock('/api/getExRowData', 'get', function (options) {
    return Mock.mock({
        code: 200,
        data: {
            total: 25,
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'data|5': [{
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                'uid|+1': 1,
                'address': '@county(true)',
                'phone': /^1[385][1-9]\d{8}/,
                'email': '@EMAIL'
            }]
        }
    });
});

// 展开行示例数据
Mock.mock('/api/userList', 'get', function (options) {
    return Mock.mock({
        code: 200,
        data: {
            total: 25,
            'data|5': [{
                'uid|+1': 1,
                'email': '@EMAIL'
            }]
        }
    });
});


