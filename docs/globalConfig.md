# 全局配置

| 参数           | 说明     | 类型   | 可选值   | 默认值 |
| :------------- | :------- | :----- | :------- | :----: | --- |
| elementuiGlobalConfig | elementui全局配置 | Object | 参考element-ui全局配置 |   { }   |
| tableSize           | table的尺寸 | `String` | medium / small / mini |   small   |
| formSize           | form的尺寸 | `String` | medium / small / mini |   small   |
| fieldEmptyTxt | table某个字段为空时，展示的内容 | `String` | 无   |   --   |
| tableEmptyText | table无数据时的提示语 | `String` | 无   |   暂无数据   | 
| inline | form表单的布局 | `String` | flex/inline   |   flex   | 
| toolbar | table是否展示工具栏 | `Bollean` | true/false   |   true   |
| align | 表格列中内容的对齐方式 | `String` | left/center/right   |   center   | 
| stripe | table是否显示斑马线 | `Bollean` | true/false   |   true   | 
| border | table是否显示边框 | `Bollean` | true/false   |   true   | 
| showPagination | 是否显示分页器 | `Bollean` |  true/false  |   true   | 
| pageSize | 全局分页的页大小 | `Number` | 无   |   20   | 

## 示例

```js
// 导入包
import agilityForm from 'agility-form';

// 导入样式
import 'agility-form/lib/agility-form.css';
Vue.use(agilityForm,{
    elementuiGlobalConfig:{
        // 这里是elementui的全局配置
    }
    formSize:'small',
    tableSize:'small',
    fieldEmptyTxt:'--',
    tableEmptyText:'暂无数据'
    inline:'flex',
    toolbar:true,
    align:'center',
    stripe:true,
    border:false,
    showPagination:true,
    pageSize:20
});
```