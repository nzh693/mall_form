<template>
  <div class="Welcome">
    <div class="menu_grada">
      <div class="grada_header">往届回顾</div>
      <div class="menu">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#ececec"
          text-color="#303133"
          active-text-color="#336dad"
        >
          <el-menu-item :index="item.id" v-for="item in gradaMenu" :key="item.id">
            <i class="el-icon-menu"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="ad_grada_one">
        <img src="">
        <el-image  :src="pic_ad" :fit="contain"></el-image>
      </div>
    </div>
    <div class="grada_container">
      <div class="proposition">本届命题</div>
      <div class="news">本届新闻</div>
      <div class="excellent">优秀作品</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gradaMenu: [],
      pic_ad:require("../assets/image/ad_grada_one.png"),
    };
  },
  created() {
    this.getGradaMenu();
  },

  methods: {
    // 退出
    logout() {
      const name = window.sessionStorage.getItem("acount");
      var data = {
        params: {
          name: name
        }
      };
      this.$http.delete("/common/logout", data).then(
        re => {
          window.sessionStorage.clear();
          this.$router.push("login");
        },
        err => {
          this.$message.error("请求错误");
        }
      );
    },
    // 获取主页菜单
    async getGradaMenu() {
      // this.menudate = JSON.parse(window.sessionStorage.getItem("menus"));
      this.$http
        .post(
          "http://localhost:8093/restful/api/v1/competition/grade/findRecently"
        )
        .then(
          re => {
            if (re.data.code == "OK") {
              this.gradaMenu = re.data.data;
            }
          },
          err => {
            this.$message.error({
              message: "请求失败"
            });
          }
        );
    },
    // 保存菜单的活跃项到session本地
    saveActiveIndex(e) {
      window.sessionStorage.setItem("activeIndex", e);
      this.activePath = e;
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>


<style scoped>
.Welcome {
  color: black;
  font-size: 20px;
}
.menu_grada {
  float: left;
  width: 20%;
  height: 100%;
  background-color: brown;
}
.grada_container {
  float: right;
  width: 78%;
  height: 100%;
}

.grada_header {
  width: 100%;
  height: 30px;
  background-color: #004898;
  color: white;
  font-size: 20px;
  padding: 10px 0;
  font-family: "微软雅黑", "Microsoft YaHei";
}

.ad_grada_one {
  width: 100%;
  height: 250px;
  background-color: deeppink;
}

.menu {
  font-family: "微软雅黑", "Microsoft YaHei";
}
.proposition {
  width: 96%;
  height: 300px;
  padding: 5% 2%;
  background-color: antiquewhite;
}
.news {
  width: 96%;
  height: 300px;
  padding: 5% 2%;
  background-color: rebeccapurple;
}

.excellent {
  width: 96%;
  height: 300px;
  padding: 5% 2%;
  background-color: gray;
}
</style>
