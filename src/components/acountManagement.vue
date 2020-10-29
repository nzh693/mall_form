<template>
  <div class="Welcome">
    
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h4>注册账户</h4>
      </div >
      <div class="container">
          <el-form ref="acountFormRef" :rules="this.acountFormRules" :model="acountForm">
        <el-form-item prop="acount" label="账户名" :label-width="formLabelWidth">
          <el-input
            class="input"
            v-model="acountForm.acount"
            autocomplete="true"
            style="width:250px;"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="账户密码" :label-width="formLabelWidth">
          <el-input
            class="input"
            v-model="acountForm.password"
            autocomplete="true"
            style="width:250px;"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email" label="账户绑定邮箱" :label-width="formLabelWidth">
          <el-input
            class="input"
            v-model="acountForm.email"
            autocomplete="true"
            style="width:250px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="账户类型" :label-width="formLabelWidth">
          <el-select
            class="input"
            v-model="acountForm.type"
            placeholder="请选择类型"
            style="width:250px;"
          >
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="租赁户" value="rentuser"></el-option>
            <el-option label="运营经理" value="manager"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="input" label="账户权限" :label-width="formLabelWidth">
          <el-select v-model="acountForm.power" placeholder="请选择权限 " style="width:250px;">
            <el-option label="一级权限" value="1"></el-option>
            <el-option label="二级权限" value="2"></el-option>
            <el-option label="三级权限" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="warning" @click="reset">重 置</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
      </div>
      
    </el-card>
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


