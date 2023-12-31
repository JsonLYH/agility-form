# agilitySearchForm组件介绍

基础查询表单组件，可设置为栅格布局或行内布局，支持 ElementUI 上所有表单组件，语法与原生一致。

> agilitySearchForm 只能用于查询表单，支撑两种布局类型：flex 布局和 inline 布局，默认为 flex 模式（左右分布）。

## 基本用法 - 行内表单(inline=inline)

:::demo 通过配置 json 对象，可动态生成 UI 组件，点击查询会更新 model 对象，并通过@search 事件做后续操作；inline 默认为flex布局，更完整用法请参考下文详细组件文档。


```html
<agilitySearchForm inline="inline" :json="form" :model.sync="queryForm" />

<script>
  export default {
    data() {
      return {
        queryForm: {},
        form: [
          {
            type: 'input',
            model: 'user_name',
            label: '用户名称',
            placeholder: '请输入用户名称',
          },
        ],
      };
    },
  };
</script>
```

:::

## 基本用法 - flex表单(inline=flex)

> flex 表单为左右结构，左边依然是行内布局，相比于行内表单，flex 只是把查询和重置按钮放到了右边。

:::demo 通过配置 form 对象，可动态生成 UI 组件，点击查询会更新 model 表单数据对象，并通过@search 事件做后续操作；inline 默认为flex布局，更完整用法请参考下文详细组件文档。

```html
<agilitySearchForm inline="flex" :json="form" :model.sync="queryForm" />

<script>
  export default {
    data() {
      return {
        queryForm: {},
        form: [
          {
            type: 'input',
            model: 'user_name',
            label: '用户',
            placeholder: '请输入用户名称',
          },
          {
            type: 'switch',
            model: 'switch_1',
            label: '状态',
          },
          {
            type: 'input-number',
            model: 'input_number_type',
            label: '数量',
            placeholder: '计数器'
          },
        ],
      };
    },
  };
</script>
```

:::

## 组件属性

| 参数   | 说明               | 类型        | 可选值 | 默认值  |
| :----- | :----------------- | :---------- | :----- | :-----: | ------ |
| inline | 行内表单，默认flex布局 | String      | `flex  | inline` | `flex` |
| json   | 表单JSON配置对象     | Array[item] | 无     |   无    |
| model  | 表单数据对象     | Object      | 无     |   无    |

## json 参数

| 参数         | 说明                           | 类型                              | 可选值   | 默认值 |
| :----------- | :----------------------------- | :-------------------------------- | :------- | :----: |
| type         | 控件类型                       | String                            | 参考控件类型列表 |   无   |
| arrow        | 当type=number类型时有效 | Boolean | true/false | true |
| model        | 表单数据字段属性 | String                            | 无       |   无   |
| options      | 通用配置列表                   | Array                             | 无       |   无   |
| change       | 所有 UI 组件的自定义事件       | Function(currentVal,formData,field,json) 分别对应当前值、表单所有值、当前field字段、当前表单的所有json配置项| 无       |   无   |
| asyncOptions | 动态拉取下拉值                 | Function():Array                          | 无       |   无   |



## 事件

| 参数         | 说明             | 类型       | 可选值 | 默认值 |
| :----------- | :--------------- | :--------- | :----- | :----: |
| @search | 点击查询触发函数 | Function(pageNum) | 无     |   无   |
| @reset | 点击重置触发函数 | Function(pageNum) | 无     |   无   |

