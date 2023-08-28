<template>
  <el-form-item
    :prop="item.model"
    :label="item.label"
    :label-width="item.labelWidth"
    :required="item.required"
    :rules="item.rules"
    :error="item.error"
    :show-message="item.showMessage"
    :inline-message="item.inlineMessage"
    :size="item.size || $agility.formSize"
    :class="['oc-form-item', item.class]"
  >
    <!-- 全局注册自定义form-item -->
    <component
      v-if="include(item.type)"
      :is="item.type"
      :style="item.style || item.width ? `width:${item.width}` : ''"
      v-bind="$attrs"
      v-on="$listeners"
    >
    </component>
    <!-- 自定义组件 -->
    <slot name="slot" v-else-if="item.type==='slot'"></slot>
    <!-- text/textarea/number -->
    <el-input
      v-else-if="['input', 'text', 'textarea', 'number'].includes(item.type)"
      :style="item.style || item.width ? `width:${item.width}` : 'width:100%'"
      :class="[item.arrow === false ? 'disable-arrow' : '']"
      :clearable="typeof item.clearable == 'undefined' ? true : item.clearable"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <!-- 支持文本框添加文本前缀，比如：https -->
      <template slot="prepend" v-if="item.prepend">{{ item.prepend }}</template>
      <!-- 支持文本框后添加文本后缀，比如：邮箱.com -->
      <template slot="append" v-if="item.append">{{ item.append }}</template>
    </el-input>
    <!-- input-number -->
    <el-input-number
      v-else-if="item.type === 'input-number'"
      :style="item.style || item.width ? `width:${item.width}` : 'width:100%'"
      v-bind="$attrs"
      v-on="$listeners"
    ></el-input-number>
    <!-- 下拉控件 -->
    <el-select
      v-else-if="item.type === 'select'"
      :style="item.style || item.width ? `width:${item.width}` : 'width:100%'"
      :clearable="typeof item.clearable == 'undefined' ? true : item.clearable"
      :filterable="
        typeof item.filterable == 'undefined' ? true : item.filterable
      "
      v-bind="$attrs"
      v-on="$listeners"
    >
      <el-option
        v-for="option in item.options"
        :key="option.value"
        :label="option[item.field ? item.field.label : 'label']"
        :value="option[item.field ? item.field.value : 'value']"
        :disabled="option.disabled"
      >
      </el-option>
    </el-select>
    <!-- TimePicker-固定时间 -->
    <el-time-select
      v-else-if="item.type === 'time-select'"
      :style="item.style || item.width ? `width:${item.width}` : ''"
      v-bind="$attrs"
      v-on="$listeners"
    />
    <!-- TimePicker-任意时间 -->
    <el-time-picker
      v-else-if="item.type === 'time-picker'"
      :style="item.style || item.width ? `width:${item.width}` : ''"
      v-bind="$attrs"
      v-on="$listeners"
    />
    <!-- 支持Element所有日期类型 -->
    <el-date-picker
      v-else-if="
        ['date', 'week', 'month', 'year', 'dates','years','months', 'datetime'].includes(
          item.type,
        )
      "
      :style="item.style || item.width ? `width:${item.width}` : ''"
      v-bind="$attrs"
      v-on="$listeners"
      :value-format="item.valueFormat || 'yyyy-MM-dd'"
      :placeholder="item.placeholder || '选择日期'"
      :picker-options="{
        ...item.pickerOptions,
        ...(item.shortcuts ? pickerOptions.date : {}),
      }"
    />
    <!-- 支持Element所有日期范围类型 -->
    <el-date-picker
      v-else-if="
        ['daterange', 'monthrange', 'datetimerange'].includes(item.type)
      "
      :style="item.style || item.width ? `width:${item.width}` : ''"
      v-bind="$attrs"
      v-on="$listeners"
      :value-format="item.valueFormat || 'yyyy-MM-dd'"
      :start-placeholder="item.startPlaceholder || '开始日期'"
      :end-placeholder="item.endPlaceholder || '结束日期'"
      :picker-options="{
        ...item.pickerOptions,
        ...(item.shortcuts
          ? ['monthrange'].includes(item.type)
            ? pickerOptions.monthRange
            : pickerOptions.daterange
          : {}),
      }"
    />
    <!-- 单选按钮组 -->
    <el-radio-group
      v-else-if="
        ['radio-group', 'radio-button-group'].includes(
          item.type,
        )
      "
      :style="item.style || item.width ? `width:${item.width}` : 'width:100%'"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template v-if="item.type === 'radio-group'">
        <!-- 单选框组 -->
        <el-radio
          v-for="radio in item.options"
          :key="radio.value"
          :label="radio.value"
          >
          {{ radio.label }}
        </el-radio>
      </template>
      <!-- 按钮单选框组 -->
      <template v-else>
        <el-radio-button
          v-for="radio in item.options"
          :key="radio.value"
          :label="radio.value"
          >{{ radio.label }}</el-radio-button>
      </template>
    </el-radio-group>
    <!-- 单选框 -->
    <template v-else-if="item.type==='radio'">
      <el-radio
        v-bind="$attrs"
        v-on="$listeners"
        v-for="radio in item.options"
        :key="radio.value"
        :label="radio.value"
        >
        {{ radio.label }}
      </el-radio>
    </template>
    <!-- 开关 -->
    <el-switch
      v-else-if="item.type === 'switch'"
      :style="item.style || item.width ? `width:${item.width}` : 'width:100%'"
      v-bind="$attrs"
      v-on="$listeners"
    ></el-switch>
    <!-- 单个复选，一般可用switch代替 -->
    <el-checkbox
      v-else-if="item.type === 'checkbox' && !item.options"
      :style="item.style || item.width ? `width:${item.width}` : 'width:100%'"
      v-bind="$attrs"
      v-on="$listeners"
      >{{ item.showLabel ? item.label : '' }}</el-checkbox
    >
    <!-- 复选框组，为了便于开发，仅通过options区分 -->
    <el-checkbox-group
      v-else-if="item.type === 'checkbox' && item.options"
      :style="item.style || item.width ? `width:${item.width}` : 'width:100%'"
      :size="item.size"
      :disabled="item.disabled"
      :min="item.min"
      :max="item.max"
      :text-color="item.textColor"
      :fill="item.fill"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template v-if="item.subType === 'button'">
        <el-checkbox-button
          v-for="check in item.options"
          :key="check.label"
          :label="check.value"
          v-bind="check"
          >{{ check.label }}</el-checkbox-button
        >
      </template>
      <template v-else>
        <el-checkbox
          v-for="check in item.options"
          :key="check.label"
          :label="check.value"
          v-bind="check"
          >{{ check.label }}</el-checkbox
        >
      </template>
    </el-checkbox-group>
    <!-- 级联框 -->
    <el-cascader
      v-else-if="item.type === 'cascader'"
      :style="item.style || item.width ? `width:${item.width}` : 'width:100%'"
      :clearable="typeof item.clearable == 'undefined' ? true : item.clearable"
      :filterable="
        typeof item.filterable == 'undefined' ? true : item.filterable
      "
      v-bind="$attrs"
      v-on="$listeners"
    />
    <!-- 穿梭框 -->
    <el-transfer
      v-else-if="item.type === 'transfer'"
      :style="item.style || item.width ? `width:${item.width}` : 'width:100%'"
      v-bind="$attrs"
      v-on="$listeners"
    />
    <!-- 文件上传 -->
    <RUpload
      v-else-if="item.type === 'upload'"
      :item="item"
      v-bind="$attrs"
      v-on="$listeners"
    />
    <!-- link -->
    <el-link
      class="custom-link"
      v-else-if="item.type === 'link'"
      v-bind="item.link"
      v-on="$listeners"
      >{{ item.text }}</el-link
    >
    <!-- 按钮 -->
    <el-button
      v-else-if="item.type === 'button'"
      :style="item.style || item.width ? `width:${item.width}` : 'width:100%'"
      v-bind="item.button"
      v-on="$listeners"
    >
      {{ item.button.text }}
    </el-button>
    <!-- 纯文本 -->
    <div v-else-if="item.type === 'label'" :style="item.style">
      {{ item.text || $attrs.value }}
    </div>
  </el-form-item>
</template>
<script>
import RUpload from './Upload';
let components = { RUpload };
const options = {
  name: 'FormItem',
  props: ['item'],
  components,
  data() {
    return {
      pickerOptions: {
        date: {
          shortcuts: [
            {
              text: '今天',
              onClick(picker) {
                picker.$emit('pick', new Date());
              },
            },
            {
              text: '昨天',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', date);
              },
            },
            {
              text: '一周前',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', date);
              },
            },
          ],
        },
        daterange: {
          shortcuts: [
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              },
            },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              },
            },
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              },
            },
          ],
        },
        monthRange: {
          shortcuts: [
            {
              text: '本月',
              onClick(picker) {
                picker.$emit('pick', [new Date(), new Date()]);
              },
            },
            {
              text: '今年至今',
              onClick(picker) {
                const end = new Date();
                const start = new Date(new Date().getFullYear(), 0);
                picker.$emit('pick', [start, end]);
              },
            },
            {
              text: '最近六个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setMonth(start.getMonth() - 6);
                picker.$emit('pick', [start, end]);
              },
            },
          ],
        },
      },
    };
  },
  created() {
    if (this.item.asyncOptions) {
      this.item.asyncOptions().then((res) => {
        this.item.options = res;
      });
    }
  },
  methods: {
    include(name) {
      return components[name];
    },
  },
};

export function registFormItem(newcomponents) {
  Object.assign(components, newcomponents);
}

export default options;
</script>
