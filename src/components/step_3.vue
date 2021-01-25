<template>
  <div class="steps_3">
    <div class="container_4">
      <h1>步骤3</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    //显示邮件表单
    reset() {
      this.$refs.acountFormRef.resetFields();
    },
    //添加
    add() {
      var data = this.$qs.stringify(this.acountForm);
      this.$refs.acountFormRef.validate(async valid => {
        if (valid) {
          this.$http.post("/common/login", data).then(
            re => {
              if (re.data.code == "OK") {
                this.$message.success(re.data.msg);
              }
            },
            err => {
              this.$message.error({
                message: "请求失败"
              });
            }
          );
        } else {
          //验证(未通过
          alert("数据格式未通过验证");
          return;
        }
      });
    }
  }
};
</script>

<style scope>
.steps_3 {
  width: 100%;
  height: 550px;
  background-color: #f0f0f0;
}
.container_3 {
  margin: 0 200px;
  height: 300px;
  background-color: #ffffff;
}
</style>