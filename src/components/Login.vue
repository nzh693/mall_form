<template>
  <div class="login-container">
    <div class="login_box">
      <!-- 头像区域 -->
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
        <!-- 用户名 -->
        <el-form-item prop="name">
          <el-input
            v-model="formdata.name"
            name="name"
            prefix-icon="iconfont icon-zhanghuffffffpx"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            name="password"
            v-model="formdata.password"
            prefix-icon="iconfont icon-mima "
          ></el-input>
        </el-form-item>
        <!-- 按钮区域  -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetFields">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 数据绑定
      formdata: {
        name: "nzh",
        password: "123456"
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
    resetFields() {
      //  重置表单，拿到this中所有的引用，拿到表单引用，调用自带的重置方法。
      this.$refs.loginRef.resetFields();
    },
    login() {
      //获取验证结果：true or false;
      this.$refs.loginRef.validate(async re => {
        if (!re) {
          return;
        } else {
          //验证成功则发送网络请求
          // axios post传参的问题。
          var data = this.$qs.stringify({
            acount: this.formdata.name,
            password: this.formdata.password
          });

          this.$http.post("/common/load", data).then(
            re => {
              if (re.data.code == 'OK') {
                //将token保存到sessionStorage
                const name = this.userName;
                this.$message.success({
                  showClose: true,
                  message: "欢迎 !"
                });
                window.sessionStorage.setItem("token", re.data.token);
                window.sessionStorage.setItem("acount",re.data.object.aAcount);
                window.sessionStorage.setItem("password",re.data.object.aPassword);
                window.sessionStorage.setItem("power",re.data.object.aPower);
                window.sessionStorage.setItem("menus",JSON.stringify(re.data.data));

                //路由页面到首页
                this.$router.push({
                  path:"/home",
                  query: { 
                    menus: re.data.data
                     }
                }).catch(()=>{});
              } else {
                return this.$message.info({
                  showClose: true,
                  message: "账户或用户名错误【admin:123456】"
                });
              }
            },
            err => {
              this.$message.error({
                showClose: true,
                message: "网络请求错误"
              });
            }
          );
        }
      });
    }
  }
};
</script>


<style   scoped>
.login-container {
  height: 100%;
  top: -20px;
  background-color: cadetblue;
}

.login_box {
  height: 300px;
  width: 450px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.image_box {
  height: 130px;
  width: 130px;
  border: solid 1px #fff;
  border-radius: 50%;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  background-color: #fff;
  transform: translate(-50%, -50%);
}
.image_box img {
  height: 110px;
  width: 110px;
  border-radius: 50%;
  top: 10%;
  transform: translate(0, 10%);
  background-color: #eee;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_info {
  position: absolute;
  padding: 0 10px;
  width: 100%;
  bottom: 0;
  box-sizing: border-box;
}
</style>


