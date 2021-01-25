<template>
  <div class="Welcome">
    <h2>关于大赛</h2>
  </div>
</template>

<script>
export default {
  data() {
    let email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isEmail = (rule, value, callback) => {
      if (!email.test(value)) {
        return callback(new Error("非法邮箱地址"));
      } else {
        callback();
      }
    };
    return {
      formLabelWidth: "120px",
      show: true,
      acountForm: {
        acount: "",
        password: "",
        email: "",
        type: "",
        power: ""
      },
      acountFormRules: {
        email: [
          {
            required: true,
            message: "电子邮件地址",
            trigger: ["blur", "change"]
          },
          { validator: isEmail, required: true, trigger: ["blur", "change"] }
        ],
        acount: [
          { required: true, message: "账户名必填", trigger: "blur" },
          {
            required: true,
            min: 3,
            max: 10,
            message: "账户名称3-15字符",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          { required: false, message: "登录密码必填", trigger: "blur" },
          {
            required: true,
            min: 3,
            max: 10,
            message: "账户名称3-15字符",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
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

.Welcome {
  color: black;
  font-size: 20px;
}
.dialog-footer {
  margin-top: 200px;
  text-align: center;
}
.container{
  text-align: center;
}

/* .el-input{
  margin-left: -300px;
}
.el-select{
  margin-left: -300px;
} */
</style>


