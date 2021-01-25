<template>
  <div>
    <!-- 导航栏及以下路由占位符 -->
    <el-header class="header">
      <!-- 顶部网站信息 -->
      <div>
        <el-row>
          <el-col :span="18">
            <div class="logo_div">
              <img src="../assets/image/logo.png" style="height:100%;" alt="重理工大家杯">
            </div>
          </el-col>
          <el-col :span="6">
            <div class="other_div">
              <el-row>
                <el-col :span="12">
                  <div v-show="true" class="grid-content bg-purple">
                    <button @click="openFrom">登录</button>
                    <span>&#12288;&#12288;</span>
                    <button>注册</button>
                  </div>
                  <el-tooltip v-show="false" effect="light" content="退出" placement="bottom">
                    <el-col :span="8">
                      <i class="iconfont icon-Group"></i>
                    </el-col>
                  </el-tooltip>
                </el-col>
                <el-col :span="12">暂时留空</el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-header>
    <!-- 登录框 -->
    <div class="form">
      <el-dialog width="30%" :visible.sync="dialogVisible">
        <div>
          <div class="image_box">
            <img src="../assets/image/test.png" alt="头像">
          </div>
          <!-- 登录表单区域 -->
          <el-form
            ref="loginRef"
            :model="formdata"
            :rules="form_rules"
            label-width="0"
            class="login_info"
          >
            <el-form-item prop="name">
              <el-input
                v-model="formdata.name"
                name="name"
                prefix-icon="iconfont icon-zhanghuffffffpx"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                name="password"
                v-model="formdata.password"
                prefix-icon="iconfont icon-mima "
              ></el-input>
            </el-form-item>
            <el-form-item class="btns">
              <el-button type="primary">登录</el-button>
              <el-button type="info">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 头像区域 -->
      </el-dialog>
    </div>
    <div>
      <!-- 二级路由 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      formdata: {
        name: "",
        password: ""
      },
      //数据验证规则
      form_rules: {
        //账户验证
        name: [
          { required: true, message: "请输入账户", trigger: "blur" },
          { min: 3, max: 16, message: "长度在3-16个字符", trigger: "blur" }
        ],
        //密码验证
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "密码长度在8-16个字符", trigger: "blur" }
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
    },
    openFrom() {
      this.dialogVisible = true;
    }
  }
};
</script>

<style scope>
.header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
}
.el-header {
  background-color: gray;
  padding: 3px;
  font-size: 14px;
}
.form{
  width: 200px;
  height: 150px;
}
.image_box {
  height: 140px;
  width: 140px;
  border: solid 1px #fff;
  border-radius: 50%;
  box-shadow: 0 0 10px #ddd;
  margin-left: 50%;
  margin-top: -40px;
  background-color: #fff;
  transform: translate(-50%, -50%);
}
.image_box img {
  height: 120px;
  width: 120px;
  border-radius: 50%;
  top: 10%;
  transform: translate(0, 10%);
  background-color: #eee;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.logo_div {
  display: flex;
  height: 58px;
  color: #eee;
  margin-left: 50px;
  margin-top: -2px;
}
.other_div {
  padding: 17px;
  font-size: 15px;
  color: aliceblue;
}
</style>