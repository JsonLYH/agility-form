<template>
  <agilityTable
    :json.sync="tableJson"
    @handleCellClick="handleCellClick"
    @handleOperate="handleOperate"
    @handleChange="getTableList"
    @handleAction="handleAction"
  />
</template>

<script>
export default {
  data() {
    return {
      // 保存查询条件
      queryForm: {},
      searchJson: [
        {
          type: 'text',
          model: 'user_name',
          label: '用户',
          placeholder: '请输入用户名称',
        },
      ],
      tableJson: {
        title: 'JSON配置表格',
        actionList: [
          {
            type: 'primary',
            text: '新增',
          },
          {
            type: 'danger',
            text: '删除',
          },
        ],
        columns: [
          {
            prop: 'selection',
            type: 'selection',
            label: '选框',
          },
          {
            prop: 'index',
            type: 'index',
            label: '序号',
          },
          {
            prop: 'uid',
            type: 'click',
            label: '用户ID',
            align: 'left',
          },
          {
            prop: 'cname',
            label: '用户名称',
            align: 'left',
          },
          {
            prop: 'user_img',
            label: '头像',
            showOverflowTooltip: false,
            type: 'image',
            image: {
              type: 'single', // single/list 支持单张图片和批量图片
              width: 60, // 设置图片宽度
              height: 40, // 设置图片高度
            },
          },
          {
            prop: 'user_site',
            label: '网址',
            type: 'url',
            showOverflowTooltip: false,
          },
          {
            prop: 'use_status',
            label: '当前状态',
            type: 'click',
            formatter(row) {
              if (row.use_status > 2) {
                return '--';
              }
              return {
                1: '在线',
                2: '离线',
              }[row.use_status];
            },
          },
          {
            prop: 'user_email',
            label: '邮箱',
          },
          {
            prop: 'user_status_name',
            label: '用户状态',
          },
          {
            prop: 'register_date',
            label: '注册时间',
          },
          {
            prop: '',
            label: '操作',
            type: 'action',
            width: '200px',
            fixed: 'right',
            list: [
              {
                prop: 'status',
                val: {
                  2: '启用',
                  1: {
                    text: '禁用',
                    color: 'danger',
                  },
                },
                permission: true,
              },
              {
                text: '编辑',
                // 支持函数的形式判断是否显示
                permission: (row) => {
                  return row.status == 1;
                },
              },
              {
                text: '删除',
                color: 'danger',
                permission: true,
              },
            ],
          },
        ],
        data: [{ uid: 131 }],
        pagination: {
          pageNum: 1,
          total: 0,
        },
      },
    };
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    // 首页列表查询,page为子组件传递的页码，默认为1
    getTableList(pageNum = 1) {
      this.tableJson.pagination.pageNum = pageNum;
      const data = {
        ...this.queryForm, // 查询表单数据
        ...this.pagination, // 默认分页数据
      };
    },
    /**
     * 列点击
     * 1. 只有其中一列可点击,通常只用row就够了，不需要根据prop做判断
     * 2. 有多列可点击，根据prop判断是哪一列被触发了
     * 3. 某一列有多个点击按钮，点击按钮的时候，会把对应的值回传回来(link)
     */
    handleCellClick({ row, prop, link }) {
      // 如果是多个列都绑定了click事件，可根据prop来区分是哪一列
      if (prop === 'uid') {
        this.$message.success('点击了用户ID');
      }
    },
    handleSelectionChange(rows) {
      this.$message.success('勾选项id为' + rows.map((item) => item.id));
    },
    // 表格上操作按钮
    handleOperate({ text, index }) {
      if (index === 0) {
        this.$message.success('你点击第一个操作按钮');
      } else if (index === 1) {
        this.$message.success('你点击了第二个操作按钮');
      }
    },
    // action为点击的按钮索引，row为当前行的数据
    handleAction({ index, text, row }) {
      // 也可以根据text的按钮文本来判断，因为索引不太可靠，有时候，删除一个按钮以后，索引会发生变化。
      if (index === 0) {
        this.$message.success('你选择了第一个按钮');
      } else if (index === 1) {
        this.$message.success('你选择了第二个按钮');
      } else {
        this.$message.success('你选择了第三个按钮');
      }
      console.log(row);
    },
  },
};
</script>