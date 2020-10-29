<template>
    <div class="Welcome">

       <h2>菜单管理</h2>

    </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      text: "开始体验",
      currentTime: "",
      form: {
        address: "",
        title: "",
        content: "",
        date1: "",
        isCurrentTime:"true"
      },
      emailRules: {
        address: [{ required: true, message: "邮件地址", trigger: "blur" }],
        content: [{ required: true, message: "邮件内容", trigger: "blur" }],
        title: [{ required: false, message: "邮件标题", trigger: "blur" }],
      }
    };
  },
  methods: {
    //显示邮件表单
    showForm() {
      this.isShow = true;
      this.text = "正在创建";
    },
    onSubmit() {
      this.$refs.emailRef.validate(async valid => {
        if (!valid) {
          return; //校验未通过直接返回
        } else {
          //校验通过发起网络请求
          this.$http
            .post("/common/newUserTestEmail",this.form)
            .then(re => {
              console.log(re.data);
              this.$message.success({
                message: "创建成功"
              });
            })
            .catch(err => {
              this.$message.error({
                message: "创建失败"
              });
            });
        }
      });
    },
    //隐藏邮件表单
    cancel() {
      this.isShow = false;
      this.$refs.emailRef.resetFields();
      this.$refs.emailTitleRef.resetField();
      this.$refs.emailTimeRef.resetField();
      this.text = "开始体验";
    }
  }
};
</script>

<style scope>
.Welcome{
      color: black;
      font-size: 20px;
  }
.el-form {
  margin-left: 500px;
  text-align: center;
}
</style>


