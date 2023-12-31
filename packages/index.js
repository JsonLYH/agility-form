import quickSearchForm from './agilitySearchForm/index.js'
import agilityTable from './agilityTable/index.js'
import { isEmpty } from './utils/commonUtils.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
const install = function (Vue, options = {}) {
    Vue.use(ElementUI,options.elementuiGlobalConfig || {});
    // 表单搜索插件
    Vue.use(quickSearchForm);
    Vue.use(agilityTable);
    console.log(options);
    let config = {
        /**
         * form/table全局尺寸
         * medium / small / mini
         */
        tableSize: options.tableSize || (!isEmpty(Vue.prototype.$ELEMENT) ? Vue.prototype.$ELEMENT.size : 'small'),
        formSize: options.formSize || (!isEmpty(Vue.prototype.$ELEMENT) ? Vue.prototype.$ELEMENT.size : 'small'),
        // table列中字段为空时，默认显示内容
        fieldEmptyTxt: options.fieldEmptyTxt || '--',
        // 搜索表单全局配置
        searchForm: {
            inline: options.inline || 'flex',
        },
        // 表格全局配置
        agilityTable: {
            // 是否展示工具条
            toolbar: !isEmpty(options.toolbar) ? options.toolbar : true,
            // 表格列对齐方式
            align: options.align || 'center',
            // 表格是否显示斑马线
            stripe: !isEmpty(options.stripe) ? options.stripe : true,
            // 表格是否显示边框
            border: !isEmpty(options.border) ? options.border : true,
            // 是否显示分页器
            showPagination: !isEmpty(options.showPagination) ? options.showPagination : true,
            // 全局每页条数
            pageSize: options.pageSize || 20,
            // 表格无数据时展示内容
            tableEmptyText: options.tableEmptyText || '暂无数据',
        },
        agilityDesc: {},
    };
    console.log(config);
    Vue.prototype.$agility = config;
}

export default {
    install
}

export { 
    quickSearchForm
}