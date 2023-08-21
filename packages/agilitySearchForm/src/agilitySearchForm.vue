<template>
    <el-form class="agility-search-form-container" :class="{ dialog: type === 'dialog', 'agility-search-flex': mode == 'flex' }"
        ref="searchForm" :model="value" :inline="true" @submit.native.prevent="search">
        <!-- flex布局-->
        <template v-if="mode == 'flex'">
            <div class="agility-form-item" :style="{
                height: isOpen ? 'auto' : formHeight + 'px',
                overflow: isOpen ? 'auto' : 'hidden',
            }">
                <template v-for="(item, index) in json">
                    <FormItem :key="index" :item="item" v-bind="item" :value="value[item.model]"
                        @input="(val) => handleInput(item, val)" />
                </template>
                <div ref="expandFlag" class="expandFlag"></div>
            </div>
            <div class="agility-action">
                <el-button type="text" v-if="showFoldBtn" @click="isOpen = !isOpen" size="medium">{{ isOpen ? '收起' : '展开'
                }}<i :class="[isOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i></el-button>
                <el-button type="primary" :size="$agility.size" @click="search">查询</el-button>
                <el-button :size="$agility.size" @click="reset">重置</el-button>
            </div>
        </template>
        <!-- 行内布局-->
        <template v-else-if="mode == 'inline'">
            <template v-for="(item, index) in json">
                <FormItem :key="index" :item="item" v-bind="item" :value="value[item.model]"
                    @input="(val) => handleInput(item, val)" />
            </template>
            <el-form-item>
                <el-button type="primary" :size="$agility.size" @click="search">查询</el-button>
                <el-button :size="$agility.size" @click="reset">重置</el-button>
            </el-form-item>
        </template>
    </el-form>
</template>
<script>
import FormItem from '../../components/FormItem';
export default {
    name: 'agilitySearchForm',
    props: {
        inline: String,
        type: String, // 当设置为dialog时，说明QueryForm在dialog中使用，会调整QueryForm背景色
        json: Array, // 表单JSON对象
        model: Object, // 表单数据对象
    },
    components: { FormItem },
    data() {
        return {
            needActiveCalTypes:['cascader', 'select'],//需要激活动态计算高度的控件类型
            timeoutFlag: null,
            sizeMap: {
                medium: 58,
                small: 51,
                mini: 47,
            },//表单控件尺寸映射
            value: { ...this.model }, // 初始化表单值
            isOpen: false, // 当前是否为展开状态
            formHeight: 0,
            showFoldBtn:false,//是否显示展开按钮
        };
    },
    computed: {
        // inline为行内，flex为左右布局
        mode() {
            return this.inline || this.$agility.searchForm.inline;
        },
    },
    created() {
        this.setFastProp();
    },
    mounted() {
        // 根据全局尺寸，计算agilitySearchForm高度
        this.initSize();

        // flex模式下，从新计算展开按钮是否显示
        if (this.mode == 'flex') this.calcHeight();
    },
    methods: {
        initSize() { 
            let formHeight = this.sizeMap[this.$agility.size];
            if (formHeight) {
                this.formHeight = formHeight;
            } else { 
                this.formHeight = 62;
            }
        },
        /**
         * 触发自定义事件
         * @callback(val,values,model)当前值/所有值/当前model
         */
        handleInput(item, val) {
            if (typeof item.change === 'function') {
                item.change(val, this.value, item.model, this.json);
            }
            // 把日期数组拆解为两个字段，方便前端使用
            if (
                ['daterange', 'monthrange', 'datetimerange'].includes(item.type) &&
                item.export
            ) {
                if (!Array.isArray(item.export)) {
                    throw Error('item.export must be a Array');
                }
                this.value = {
                    ...this.value,
                    [item.model]: val || '',
                    [item.export[0] || 'startTime']: val ? val[0] : '',
                    [item.export[1] || 'endTime']: val ? val[1] : '',
                };
            } else {
                this.value = { ...this.value, [item.model]: val };
            }
            // 匹配规则，计算高度
            if (this.needActiveCalTypes.includes(item.type)) {
                clearTimeout(this.timeoutFlag);
                // 处理高度计算异常
                this.timeoutFlag = setTimeout(() => {
                    this.calcHeight();
                }, 200);
                console.log('计算高度');
            }
        },
        /**
         * 表单重置
         * 外部也可通过$refs进行内部API调用
         */
        reset() {
            this.$refs.searchForm.resetFields();
            this.json.map((item) => {
                // 处理日前时间，值为数组类型的情况
                if (
                    ['daterange', 'monthrange', 'datetimerange'].includes(item.type) &&
                    item.export
                ) {
                    let dateRange = this.value[item.model];
                    if (dateRange) {
                        this.value[item.export[0]] = dateRange[0];
                        this.value[item.export[1]] = dateRange[1];
                    } else {
                        delete this.value[item.export[0]];
                        delete this.value[item.export[1]];
                    }
                }
            });
            let form = { ...this.value };
            this.$emit('update:model', form);
            this.$emit('search', 1);
        },
        /**
         * 触发查询按钮，回传数据
         */
        search() {
            let form = { ...this.value };
            this.$emit('update:model', form);
            this.$emit('search', 1);
        },
        setFastProp() {
            this.json.forEach((item) => {
                const fastProp = `$${item.model}`;
                if (item.model && !this.json[fastProp]) {
                    Object.defineProperty(this.json, fastProp, {
                        get() {
                            return item;
                        },
                    });
                }
            });
        },
        // flex 布局模式下，计算是否有展开按钮
        async calcHeight() {
            await this.$nextTick();
            this.showFoldBtn = false;
            // 计算偏移量
            const offsetTop = this.$refs.expandFlag.offsetTop;
            console.log('offsetTop', offsetTop);
            // this.formHeight+1，处理1px问题
            if (offsetTop > (this.formHeight+1)) this.showFoldBtn = true;
        },
    },
    /**
     * 销毁全局事件
     */
    beforeDestroy() {
        clearTimeout(this.timeoutFlag);
        window.onresize = null;
    },
    /**
     * 当父组件修改model时，需要同步修改子组件
     */
    watch: {
        model: {
            // watch结合$emit实现双向绑定
            handler: function (val) {
                this.value = { ...val };
            },
            deep: true,
        },
    },
};
</script>
<style lang="scss" scoped>
// 默认为白色背景，当在弹框中时为灰色背景
.agility-search-form-container {
    background-color: #fff;
    padding: 20px 20px 0;
    border-radius: 4px;
    border: 1px solid #ebeef5;

    &.agility-search-flex {
        display: flex;
        justify-content: space-between;

        .agility-form-item {
            position: relative;
            flex: 1;
        }

        .agility-action {
            min-width: 200px;
            text-align: right;
        }
    }

    .text-right {
        text-align: right;
    }

    &.dialog {
        background-color: #f7f8fa;
        border: none;
    }

    .hidden {
        display: none;
    }

    ::v-deep() .el-row--flex {
        flex-wrap: wrap;

        .el-form-item {
            display: flex;

            .el-form-item__content {
                flex: 1;

                .el-date-editor {
                    width: 100%;
                }
            }
        }
    }
}
</style>
