<template>
  <div class="register_for">
    <!-- 路径条 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>注册报名</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 步骤条 -->
    <div class="steps">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>步骤如下</span>
        </div>
        <el-steps :active="index" align-center finish-status="finish">
          <el-step title="步骤1" description="注册网站"></el-step>
          <el-step title="步骤2" description="填写参赛信息"></el-step>
          <el-step title="步骤3" description="上传材料"></el-step>
          <el-step title="步骤4" description="管理员审核"></el-step>
        </el-steps>
        <div>
          <el-button style="margin-top: 12px;" :disabled="pre_bt" @click="pre">上一步</el-button>
          <el-button style="margin-top: 12px;" :disabled="next_bt" @click="next">下一步</el-button>
        </div>
      </el-card>
    </div>
    <!-- 分割线 -->
    <el-divider content-position="center">
      <span style=" font-size: 25px;"></span>
    </el-divider>
    <!-- 主要信息 -->
    <div class="register_main">
      <router-view></router-view>
    </div>
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
      index: 1,
      pre_bt: true,
      next_bt: false
    };
  },
  methods: {
    //下一步
    
    next() {
      this.index++;
      if (this.index == 4) {
        this.next_bt = true;
        this.pre_bt = false;
      } else {
        this.pre_bt = false;
        this.next_bt = false;
      }
      this.jumpToSteps(this.index);
    },
    //上一步
    pre() {
      this.index--;
      if (this.index == 1) {
        this.pre_bt = true;
        this.next_bt = false;
      } else {
        this.pre_bt = false;
        this.next_bt = false;
      }

      this.jumpToSteps(this.index);
    },
    jumpToSteps(e) {
      if (e == 1) {
        this.$router.push({ path: "step1" });
      } else if (e == 2) {
        this.$router.push({ path: "step2" });
      } else if (e == 3) {
        this.$router.push({ path: "step3" });
      } else {
        this.$router.push({ path: "step4" });
      }
    }
  }
};
</script>

<style scope>
.register_for {
  margin-top: -88px;
  padding-top: 20px;
  background-color: #f0f0f0;
}
.steps {
  width: 70%;
  text-align: center;
  display: inline-block;
}
.el-breadcrumb {
  font-size: 18px;
  color: black;
  margin-left: 25px;
}
.register_main {
  margin-top: -10px;
}
</style>


