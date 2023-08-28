# 控件类型列表

1. `type='text'`文本框
2. `type='textarea'`文本域
3. `type='number'`Html5 原生数字框
4. `type='input-number'`ElementUI 数字框
5. `type='select'`下拉框
6. `type='daterange' / 'monthrange' / 'datetimerange'` 日期/时间 区间
7. `type='time-select'`时间选择器 - 固定时间
8. `type='time-picker'`时间选择器 - 任意时间
9. `type='date' / 'week' / 'month' / 'year' / 'datetime' / 'years' / 'dates' / 'months'`
10. `type='radio'`单选框
11. `type='radio-button'/'radio-button-group'`单选框组
12. `type='switch'`开关组件
13. `type='checkbox'`复选框，组件会根据 options 字段自动判断是否使用复选框组
14. `type='cascader'`级联框
15. `type='transfer'`穿梭框
16. `type='upload'`上传框
17. `type='link'`文字链接，类似于a标签
18. `type='button'`按钮组件
19. `type='label'`文本组件
20. `type='table'` 支持表单中内嵌表格组件

### 自定义参数

| 参数         | 说明                     | 类型                        | 可选值   | 默认值 | 适用控件 |
| :----------- | :----------------------- | :-------------------------- | :------- | :-------: | :---------- |
| type         | 支持大部分组件           | String                      | 参考上文 |   无   | 参考上文 |
| label        | 表单项的label文本标签 | String | 无 |无       |   适用于表单项  |
| model        | 表单字段       | String                      | 无       |   无   | 适用于可改变表单数据的控件 |
| change       | 自定义事件               | Function(currentVal,formData,field,json) | 无       |   无   | 适用于可改变表单数据的控件 |
| show         | 是否显示此字段          | Function(formData):Boolean                  | 无       |   无   | 适用于agilityForm组件 |
| asyncOptions | 下拉框独有，可以拉取接口 | Function():Array                        | 无       |   无   | 适用于含有options属性的控件 |

> 每个表单都支持 change 事件，用来处理自定义业务。

## Input 组件

:::demo

```html

  <agilitySearchForm :json="form" :model.sync="queryForm" />

<script>
  export default {
    data() {
      return {
        queryForm: {
          status: 1,
          type: 1,
        },
        form: [
           {
            type: 'textarea',
            model: 'textarea_type',
            label: 'type=textarea',
            placeholder: '文本域',
            rows:1,
            /**
             * 所有组件自定义事件，可做异步操作，修改其它表单值
             * val 当前输入值
             * values 当前表单所有值
             * model 当前表单对象
             */
            change(val, values, model) {
              // 修改其它表单项值
              values.type = 0;
            },
          },
          {
            type: 'input-number',
            model: 'input_number_type',
            label: 'type=input-number',
            placeholder: '计数器',
            /**
             * 所有组件自定义事件，可做异步操作，修改其它表单值
             * val 当前输入值
             * values 当前表单所有值
             * model 当前表单对象
             */
            change(val, values, model) {
              // 修改其它表单项值
              values.type = 0;
            },
          },
          {
            type: 'number',
            model: 'number_type',
            label: 'type=number',
            placeholder: '数字框',
            /**
             * 所有组件自定义事件，可做异步操作，修改其它表单值
             * val 当前输入值
             * values 当前表单所有值
             * model 当前表单对象
             */
            change(val, values, model) {
              // 修改其它表单项值
              values.type = 0;
            },
          },
          {
            type: 'text',
            model: 'user_name',
            label: 'type=text',
            placeholder: '文本框',
            /**
             * 所有组件自定义事件，可做异步操作，修改其它表单值
             * val 当前输入值
             * values 当前表单所有值
             * model 当前表单对象
             */
            change(val, values, model) {
              // 修改其它表单项值
              values.type = 0;
            },
          },
          {
            type: 'text',
            model: 'user_name_slot',
            label: 'type=text',
            placeholder: '文本框-插槽',
            prepend:'prepend',
            append:'append',
            /**
             * 所有组件自定义事件，可做异步操作，修改其它表单值
             * val 当前输入值
             * values 当前表单所有值
             * model 当前表单对象
             */
            change(val, values, model) {
              // 修改其它表单项值
              values.type = 0;
            },
          },
        ],
      };
    },
  };
</script>
```

:::

> prepend 只支持 字符串，不支持配置组件。

## Select 组件

:::demo

```html
<agilitySearchForm :json="form" :model.sync="queryForm" />

<script>
  export default {
    data() {
      return {
        queryForm: {
          userStatus: [1, 2],
        },
        form: [
          {
            type: 'select',
            model: 'userStatus',
            label: '用户状态',
            multiple: true, // 支持多选
            filterable: true, //支持输入过滤
            clearable: true,
            change: this.getSelectList, // 自定义事件，回调接口
            // 字段映射，用来处理接口返回字段，避免前端去循环处理一次。
            field: {
              label: 'name',
              value: 'id',
            },
            options: [
              { name: '全部', id: 5 },
              { name: '已注销', id: 1 },
              { name: '老用户', id: 2 },
              { name: '新用户', id: 3 },
            ],
          },
        ],
      };
    },
    methods: {
      getSelectList(val, values) {
        // 此处可调用接口、修改form对象等
        this.form[0].options.push({
          name: '测试',
          id: Math.floor(Math.random() * 100)+new Date().getTime(),
        });
        // 修改用户名
        values.userName = 'jack';
      },
    },
  };
</script>
```

:::

> field 为字段映射，下拉框默认使用 label 和 value 渲染，如果接口返回的不是 label 和 value，可以使用 field 进行转换，非常便捷。

:::demo

```html
<agilitySearchForm :json.sync="form" :model.sync="queryForm" />

<script>
  export default {
    data() {
      return {
        queryForm: {
          userStatus: 1,
        },
        form: [
          {
            type: 'select',
            model: 'userStatus',
            label: '用户状态',
            filterable: true,
            // 字段映射
            field: {
              label: 'name',
              value: 'id',
            },
            options: [],
            // 如果下拉是动态的，可以使用此方式直接获取
            asyncOptions: async () => {
              return [
                {
                  name: '在职',
                  id: 0,
                },
                {
                  name: '离职',
                  id: 1,
                },
              ];
            },
          },
        ],
      };
    },
  };
</script>
```

:::

> 下拉框动态赋值可以使用 asyncOptions 函数直接调用接口进行返回，或者使用 this.form[0].options 动态赋值，还支持通过$拼接字段的方式快捷赋值。
> 注意：rocket-form跟agilitySearchForm结构不太一致，所以rocket-form中使用this.json.formList.$userStatus.options 的方式赋值或者取值。


| 参数       | 说明     | 类型    | 可选值     |            默认值             |
| :--------- | :------- | :------ | :--------- | :---------------------------: |
| filterable | 是否过滤 | Boolean | true/false |             true              |
| clearable  | 是否清楚 | Boolean | true/false |             true              |
| field      | 结构映射 | Object  | 无         | {label:'label',value:'value'} |
| asyncOptions | 动态加载下拉框数据 | Function | Function:Array | 无

## TimeSelect时间选择器

:::demo

```html
<agilitySearchForm inline="flex" :json="form" :model.sync="queryForm" />

<script>
  export default {
    data() {
      return {
        queryForm: {
          time_part_start: '02:00', //初始化值
          time_part_end: '05:00', //初始化值
        },
        form: [
          {
            type: 'time-select',
            label: '注册时段',
            model: 'time_part_start',
            pickerOptions: {
              start: '00:00',
              step: '01:00',
              end: '23:00',
            },
          },
        ],
      };
    },
  };
</script>
```

:::

## link 组件

:::demo

```html
<agilitySearchForm :json="form"></agilitySearchForm>
<script>
export default {
  data() {
    return {
      form: [
        {
          type: 'link',
          link:{
            href: 'https://www.baidu.com',
            target: '_blank',
          },
          text: '百度一下'
        }
      ]
    };
  },
};
</script>
```
:::

| 参数           | 说明     | 类型   | 可选值   | 默认值 |
| :------------- | :------- | :----- | :------- | :----: | --- |
| type           | 控件类型 | String | link |   无   |
| link           | 与el-link属性相同 | Object | { type:'primary',href:'xxx',target:'_blank' } | 无 |


## Date 组件

:::demo

```html
<agilitySearchForm inline="flex" :json="form" :model.sync="queryForm" />

<script>
  export default {
    data() {
      return {
        queryForm: {
          register_date: '2020-12-12', //初始化值
        },
        form: [
          {
            type: 'years',
            model: 'register_years',
            label: '多个年',
            placeholder:'多个年'
          },
          {
            type: 'months',
            model: 'register_months',
            label: '多个月',
            placeholder:'多个月'
          },
          {
            type: 'dates',
            model: 'register_dates',
            label: '多个日期',
            placeholder:'多个日期'
          },
          {
            type: 'year',
            model: 'register_year',
            label: '年'
          },
          {
            type: 'month',
            model: 'register_month',
            label: '月'
          },
          {
            type: 'week',
            model: 'register_week',
            label: '周',
            format:"yyyy 第 WW 周"
          },
          {
            type: 'date',
            model: 'register_date',
            label: '注册日期',
          },
          {
            type: 'daterange',
            model: 'login_time',
            label: '日期范围',
            // 对于日期范围控件来说，一般接口需要拆分为两个字段，通过export可以很方便的实现字段拆分
            export: ['startTime', 'endTime'],
            // 日期转换为时间戳单位
            valueFormat: 'timestamp', // 支持：yyyy-MM-dd HH:mm:ss
            defaultTime: ['00:00:00', '23:59:59'], //可以设置默认时间，有时候非常有用。后端查询的时候，必须从0点开始才能查到数据。
          },
          {
            type: 'datetime',
            label: '注册时间',
            model: 'register_datetime',
            shortcuts: true,
          },
          {
            type: 'datetimerange',
            label: '时间范围',
            model: 'register_datetime_range',
            // 对于日期范围控件来说，一般接口需要拆分为两个字段，通过export可以很方便的实现字段拆分
            export: ['startTime', 'endTime'],
            shortcuts: true,
          },
        ],
      };
    },
  };
</script>
```

:::

### 参数说明：

| 参数      | 说明       | 类型    | 可选值   |        默认值         | 
| :-------- | :--------- | :------ | :------- | :-------------------: | --- |
| type      | 日期类型   | String  | `date`/`daterange`/`datetime`/`datetimerange`/`year`/`week`/`month`/`dates`/`years`/`weeks`/`months` |          无           |
| shortcuts | 日期快捷键 | Boolean | `true    |        false`         | 无  |
| export    | 导出字段   | Array   | 无       | `[startTime,endTime]` |

> 日期类型（值类型为字符串）：'date', 'week', 'month', 'year', 'years','dates','months', 'datetime'

> 日期区间（值类型为数组）：'daterange', 'monthrange', 'datetimerange'

> 对于范围组件'daterange', 'monthrange', 'datetimerange'，为了方便前端传参，可通过指定 export 来导出字段名称，因为范围组件只有一个 v-model 值，往往后端需要拆解为两个字段，比如 dateTime=['2021-01-01','2021-12-01']，拆解为：startTime='2021-01-01',endTime='2021-12-01';默认为 startTime,endTime，可手动设置。

## Checkbox 组件

:::demo

```html
<agilitySearchForm :json="form" :model.sync="queryForm" />

<script>
  export default {
    data() {
      return {
        queryForm: {
          match: 1, //初始化值
        },
        form: [
          {
            type: 'checkbox',
            model: 'match',
            label: '是否匹配',
            trueLabel: 1, //可设置选中的替换值，不设置会返回true
            falseLabel: 0, //可设置非选中的替换值，不设置会返回false
          },
        ],
      };
    },
  };
</script>
```

:::

### 参数说明：

| 参数           | 说明     | 类型   | 可选值   | 默认值 |
| :------------- | :------- | :----- | :------- | :----: | --- |
| type           | 单选类型 | String | checkbox |   无   |
| options[label] | 显示文本 | String | 无       |   无   |
| options[value] | 表单域值 | String | Number   |   无   | 无  |

## label 组件

:::demo

```html
<agilitySearchForm :json="form" />

<script>
  export default {
    data() {
      return {
        form: [
          {
            type: 'label',
            text: '文本组件',
            style: {
              color:'red'
            }
          },
        ],
      };
    },
  };
</script>
```

:::

### 参数说明：

| 参数           | 说明     | 类型   | 可选值   | 默认值 |
| :------------- | :------- | :----- | :------- | :----: | --- |
| type           | 控件类型 | String | label |   无   |
| style | 自定义样式 | Object | Object       |   无   |
| text | 文本内容 | String | 无   |   无   | 无  |

## Switch 组件

:::demo

```html
<agilitySearchForm :json="form" :model.sync="queryForm" />

<script>
  export default {
    data() {
      return {
        queryForm: {
          isCheck: 0, //初始化值
        },
        form: [
          {
            type: 'switch',
            model: 'isCheck',
            label: '是否校验',
            activeValue: 1, // 打开映射值
            inactiveValue: 0, // 关闭映射值
          },
        ],
      };
    },
  };
</script>
```

:::

## Radio 组件

:::demo

```html
<agilitySearchForm inline="flex" :json="form" :model.sync="queryForm" />

<script>
  export default {
    data() {
      return {
        queryForm: {
          radio: 2, //初始化值
        },
        form: [
          {
            type: 'radio',
            label: '单选框简单用法',
            placeholder: '请选择使用状态',
            model: 'radio-simple',
            options: [
              { label: 'demo1', value: 1 },
              { label: 'demo2', value: 2 },
            ]
          },
          {
            type: 'radio-group',
            label: '单选框组',
            placeholder: '请选择使用状态',
            model: 'radio',
            options: [
              { label: 'demo1', value: 1 },
              { label: 'demo2', value: 2 },
            ]
          },
          {
            type: 'radio-button-group',
            label: '单选框按钮组',
            placeholder: '请选择使用状态',
            model: 'radio-button-group',
            options: [
              { label: 'demo1', value: 1 },
              { label: 'demo2', value: 2 },
            ]
          }
        ],
      };
    },
  };
</script>
```

:::

## Cascader 组件

:::demo

```html
<agilitySearchForm :json="form" :model.sync="queryForm" />

<script>
  export default {
    data() {
      return {
        queryForm: {
          province: ['Hubei', 'Wuhan'], //初始化值
        },
        form: [
          {
            type: 'cascader',
            model: 'province',
            label: '省份',
            disabled: false, //支持整体禁用
            filterable: true, //支持过滤
            props: {
              multiple: true, // 支持多选
            },
            options: [
              {
                value: 'Hubei',
                label: '湖北',
                disabled: true, //支持单项禁用
                children: [
                  {
                    value: 'Wuhan',
                    label: '武汉',
                  },
                  {
                    value: 'Xiangyang',
                    label: '襄阳',
                  },
                ],
              },
              {
                value: 'Beijing',
                label: '北京',
                children: [
                  {
                    value: 'Haidian',
                    label: '海淀区',
                  },
                  {
                    value: 'ChaoYang',
                    label: '朝阳',
                  },
                ],
              },
            ],
          },
        ],
      };
    },
  };
</script>
```