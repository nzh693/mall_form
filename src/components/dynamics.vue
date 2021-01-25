<template>
  <div class="Welcome">
      <div class="menu_dynamic">
      <div class="dynamic_header">赛区动态</div>
      <div class="menu">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#ececec"
          text-color="#fff"
          active-text-color="#336dad"
        >
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航栏一</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="news_container">新闻容器</div>
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
              if (re.data.code == "OK") {
                //将token保存到sessionStorage
                const name = this.userName;
                this.$message.success({
                  showClose: true,
                  message: "欢迎 !"
                });
                window.sessionStorage.setItem("token", re.data.token);
                window.sessionStorage.setItem("acount", re.data.object.aAcount);
                window.sessionStorage.setItem(
                  "password",
                  re.data.object.aPassword
                );
                window.sessionStorage.setItem("power", re.data.object.aPower);
                window.sessionStorage.setItem(
                  "menus",
                  JSON.stringify(re.data.data)
                );

                //路由页面到首页
                this.$router
                  .push({
                    path: "/home",
                    query: {
                      menus: re.data.data
                    }
                  })
                  .catch(() => {});
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
.Welcome{
      color: black;
      font-size: 20px;
  }
.menu_dynamic {
  float: left;
  width: 25%;
  height: 100%;
  background-color: brown;
}
.grada_container {
  float: right;
  width: 72%;
  height: 100%;
  background-color: rebeccapurple;
}

.dynamic_header {
  width: 100%;
  height: 30px;
  background-color: #004898;
  color: white;
  font-size: 20px;
  padding: 10px 0;
  font-family: "微软雅黑", "Microsoft YaHei";
}
.menu {
  font-family: "微软雅黑", "Microsoft YaHei";
}  
</style>


