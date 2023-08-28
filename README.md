# 快速入门

## 安装插件

```shell
yarn add agility-form -S
```

## 组件注册

```js
// 导入包
import ElementUI from 'element-ui';
import agilityForm from 'agility-form';
// 导入样式
import 'element-ui/lib/theme-chalk/index.css';
import 'agility-form/lib/agility-form.css';
Vue.use(ElementUI);
Vue.use(agilityForm);
```

## 示例代码


```html
<template>
  <search-form
    :json="form"
    :model.sync="queryForm"
    @handleQuery="getTableList"
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
> 由于该插件是基于element-ui组件库进行封装的，而本插件暂时没有把element-ui进行打包整合， 所以在使用时，记得单独导入element-ui组件库哦~