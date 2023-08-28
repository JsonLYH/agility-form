## Document

- 开发文档：https://jsonlyh.github.io/agility-form-doc

# 快速入门

## 安装插件

```shell
yarn add agility-form -S
```

## 组件注册

```js
// 导入包
import agilityForm from 'agility-form';
// 导入样式
import 'agility-form/lib/agility-form.css';
Vue.use(agilityForm);
```

## 示例代码


```html
<template>
  <agilitySearchForm
    :json="form"
    :model.sync="queryForm"
    @search="getTableData"
  />
</template>
<script>
  export default {
    data() {
      return {
        queryForm: {},
        form: [
          {
            type: 'text',
            model: 'user_name',
            label: '用户',
            placeholder: '请输入用户名称',
          },
        ],
      };
    },
  };
</script>
```
> 虽然是基于element-ui进行开发的，但是已经把element-ui相关样式整合在一起了，使用时无需再单独引入element-ui,element-ui官方的组件您也可以直接使用。
> 当然，如果您已经安装了element-ui,那也不影响。