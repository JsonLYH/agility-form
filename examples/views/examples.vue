<template>
  <div class="home">
    <agilitySearchForm :json="form"
      :model.sync="queryForm"
      @handleQuery="getTableList"></agilitySearchForm>
    <span>我是表单例子</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryForm: {
        use_status: 1,
      },
      form: [
        {
          type: 'slot',
          // tips:'tips'
          tips: {
            align:'bottom',
            text:'tips示例'
          }
        },
      ],
    };
  },
  methods: {
    getTableList() { 
      console.log(this.queryForm);
    }
  }
};
</script>
