<template>
  <div class="steps_1">
    <!-- 注册基本信息 -->
    <!-- <el-avatar :size="size" :src="circleUrl"></el-avatar> -->
    <div class="container">
      <div class="basic_info">
        <h2>填写基本信息</h2>
        <div class="bi_1">
          <dir class="image">
            <el-avatar :size="160" shape="circle" >
              <img fit="fill" :src="userInfo.headPicture">
            </el-avatar>
            <el-upload
              class="upload-demo"
              action="http://localhost:8090/restful/api/v1/system/file/upload"
              :on-success="success"
              :data="para"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip"></div>
            </el-upload>
          </dir>
          <div class="info">
            <el-form
              :label-position="position"
              :inline="true"
              :model="userInfo"
              class="demo-form-inline"
            >
              <el-form-item label="账户名">
                <el-input v-model="userInfo.account" placeholder="账户名"></el-input>
              </el-form-item>
              <el-form-item label="账户密码">
                <el-input v-model="userInfo.password" placeholder="账户密码" show-password></el-input>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="userInfo.name" placeholder="姓名"></el-input>
              </el-form-item>
              <div style="margin-top: 20px;">
                <el-form-item label="邮箱地址">
                  <el-input v-model="userInfo.email" placeholder="邮箱地址"></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                  <el-input v-model="userInfo.age" placeholder="年龄"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                  <el-select v-model="userInfo.sex" placeholder="性别">
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </div>
        <div class="btns">
          <el-button type="primary" @click="save('1')">立即注册</el-button>
          <el-button size="medium" @click="save('0')">保存草稿</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import oss from "@/js/oss";
export default {
  data() {
    return {
      position: "left",
      userInfo: {
        account: "",
        name: "",
        password: "",
        email: "",
        sex: "",
        age: "",
        headPicture: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png",
        infoStatus: ""
      },
      para: {
        request: {
          dir: "system_images",
          bucketName: "competion-file"
        }
      }
    };
  },
  created() {
      this.getInfoCache();
    },
    mounted: function() {
    },
  methods: {
    //显示邮件表单
    
    reset() {
      this.$refs.acountFormRef.resetFields();
    },
    //保存基本信息
    save(status) {
      var data = JSON.stringify({
        id: "",
        data: this.userInfo
      });
      this.$http
        .post(
          "http://localhost:8093/restful/api/v1/competition/contestants",
          data
        )
        .then(
          re => {
            if (re.data.code == "OK") {
              window.sessionStorage.setItem("userInfo",JSON.stringify(this.userInfo));
              this.$notify({
                title: "成功",
                message: re.data.msg,
                type: "success"
              });
            } else {
              this.$notify.error({
                title: "错误",
                message: re.data.msg
              });
            }
          },
          err => {
            this.$notify.error({
              title: "错误",
              message: re.data.msg
            });
          }
        );
      // this.$refs.acountFormRef.validate(async valid => {
      //   if (valid) {

      //   } else {
      //     //验证(未通过
      //     alert("数据格式未通过验证");
      //     return;
      //   }
      // });
    },
    //头像长传成功钩子
    success(response, file, fileList) {
      this.headerUrl = response.data;
      this.userInfo.headPicture = this.headerUrl;
    },
    //获取缓存信息
    getInfoCache() {
      var info =JSON.parse(window.sessionStorage.getItem("userInfo"));
      console.log(info);
      if (info != null) {
        this.userInfo = info;
        console.log("userinfo"+this.userInfo);
      }
    }
  }
};
</script>

<style scope>
.steps_1 {
  width: 100%;
  height: 550px;
  background-color: #f0f0f0;
}
.container {
  margin: 0px 200px;
}
.basic_info {
  width: 90%;
  height: 450px;
  padding: 1% 5%;
  color: black;
  background-color: #ffffff;
  /* background-color: rebeccapurple; */
}
.bi_1 {
  width: 100%;
  height: 250px;
  margin-top: 60px;
  border: 1px solid #d9d9d9;
}
.info {
  padding: 50px;
  background-color: #ffffff;
}
.image {
  float: left;
  margin-top: 30px;
  margin-left: -10px;
}
.el-form--inline .el-form-item {
  margin-right: 40px;
}

.btns {
  float: right;
  margin-top: 30px;
}
</style>