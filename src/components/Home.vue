<template>
  <div class="home_container">
    <el-container>
      <el-header>
        <!-- 菜单 -->
        <div class="menu_container">
          <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple-dark"></div>
            </el-col>
            <el-col :span="20">
              <div class="menu">
                <el-menu
                  :default-active="this.$router.path"
                  class="el-menu-demo"
                  mode="horizontal"
                  @select="handleSelect"
                  router
                >
                  <el-submenu :index="item.indexPath+''" v-for="item in menus" :key="item.id">
                    <template slot="title">
                      <span style="font-size:18px;">{{item.name}}</span>
                    </template>
                    <div v-if="item.subMenuList.length>0">
                      <el-menu-item
                        :index="subItem.subIndexPath+''"
                        v-for="subItem in item.subMenuList"
                        :key="subItem.id"
                      >
                        <span style="font-size:16px;">{{subItem.subName}}</span>
                      </el-menu-item>
                    </div>
                  </el-submenu>
                </el-menu>
                <div class="line"></div>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 轮播广告 -->
        <div class="block_image">
          <el-carousel height="270px">
            <el-carousel-item v-for="pic in pictures" :key="pic.index">
              <img style="height:100%;width:100%" :src="pic">
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-header>
      <!-- 主区域 -->
      <el-container>
        <el-container>
          <el-main style="padding:0 300px;margin-top: 235px;">
            <!-- 三级路由  -->
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>


<script>
export default {
  data() {
    return {
      searchContent: "",
      searchType: "",
      activeIndex: "1",
      dialogVisible: false,
      menus: [],
      pictures: [
        require("../assets/image/show3.png"),
        require("../assets/image/show2.png"),
        require("../assets/image/show1.png")
      ],
     
    };
  },
  created() {
    this.getMenu();
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
    async getMenu() {
      // this.menudate = JSON.parse(window.sessionStorage.getItem("menus"));
      this.$http
        .post(
          "http://localhost:8090/restful/api/v1/system/menu/find",
          JSON.stringify({
            id: 0,
            data: 1
          })
        )
        .then(
          re => {
            if (re.data.code == "OK") {
              this.menus = re.data.data;
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

<style  scoped>

.el-header {
  margin-top: 50px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
}
.menu_container {
  width: 100%;
  background-color: #fff;
  padding: 0;
}
.menu {
  margin-left: 240px;
}

.login_info {
  padding: 0 10px;
  width: 100%;
  bottom: 0;
  margin-top: -30px;
  box-sizing: border-box;
  margin-left: 0px;
}
.block_image {
  width: 100%;
  height: 100%;
  padding: 0;
}
</style>

