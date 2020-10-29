<template>
  <div class="home_container">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <div class="head_image">
          <img src="../assets/image/login.png" alt="">
          <span>商场店铺管理系统</span>
        </div>
        <div>
          <el-row :gutter="40">
            <el-tooltip effect="light" content="退出" placement="bottom">
              <el-col :span="6">
                <i class="iconfont icon-Group" @click="logout"></i>
              </el-col>
            </el-tooltip>
          </el-row>
          <!-- <ul>
            <i class="iconfont icon-shezhi" style="width:50px;height:50px;"></i>
            <i class="iconfont icon-Group"></i>
          </ul>-->
        </div>
      </el-header>
      <!-- 主区域 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px">
          <el-menu
            :default-active="activePath"
            text-color="#fff"
            active-text-color="#2255a4"
            background-color="#1f262d"
            :unique-opened="true"
            :router="true"
          >
            <!-- 一级菜单 -->
            <el-submenu :index="item.path+''" v-for="item in menudate" :key="item.path">
              <template slot="title">
                <i :class="item.iconpath"></i>
                <span>{{item.name}}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item
                style="margin-left:20px;"
                :index="subItem.sPath+''"
                v-for="subItem in item.submenus"
                :key="subItem.sId"
                @click="saveActiveIndex(subItem.subPath)"
              >
                <template slot="title">
                  <i :class="subItem.sIconpath"></i>
                  <span>{{subItem.sName}}</span>
                  <el-badge v-if="subItem.sIconpath=='iconfont icon-shenhe'?true:false"  :value="12" class="item">
                  </el-badge>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <!-- 路由占位符  -->
            <router-view></router-view>
          </el-main>
          <el-footer>地址/NZH_693@193.com</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>


<script>
export default {
  data() {
    return {
      activePath: "",
      menudate: [],
      tableData: {}
    };
  },
  created() {
    this.getMenu();
    this.activePath = window.sessionStorage.getItem("activeIndex");
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
      this.menudate = JSON.parse(window.sessionStorage.getItem("menus"));
    },
    // 保存菜单的活跃项到session本地
    saveActiveIndex(e) {
      window.sessionStorage.setItem("activeIndex", e);
      this.activePath = e;
    }
  }
};
</script>

<style  scoped>
.home_container {
}
.el-header {
  background-color: #1f262d;
  display: flex;
  align-content: center;
  justify-content: space-between;
  padding-left: 0;
  font-size: 14px;
  align-items: center;
  padding-top: 10px;
}

.nav-path {
  color: white;
  font-size: 18px;
}

.head_image {
  display: flex;
  align-items: center;
  border-radius: 50%;
  height: 60px;
  color: #eee;
}
.head_image span {
  margin-left: 20px;
}

#button_logout {
}
.head_image img {
  border-radius: 50%;
  height: 60px;
  width: 60px;
  float: right;
}

.el-footer {
  background-color: #1f262d;
  text-align: center;
  color: #fff;
  line-height: 60px;
}

.el-aside {
  background-color: #2e363f;
  color: #fff;
  text-align: center;
  line-height: 200px;
}
.el-menu {
  border-right: none;
}

.el-main {
  background-color: #eeeeee;
  color: #fff;
  text-align: center;
}
.home_container {
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-row {
  margin-top: 13px;
  height: 50px;
  width: 120px;
}
.el-col {
}
.iconfont {
  font-size: 23px;
}
.bg-purple-dark {
  background: rebeccapurple;
}
.bg-purple {
  background: green;
}
.item {
  margin-left: 2px;
}
.el-badge__content{
    background-color: blueviolet;
    border-radius: 8px;
    color: #FFF;
    display: inline-block;
    font-size: 10px;
    height: 12px;
    line-height: 18px;
    padding: 0 6px;
    text-align: center;
    white-space: nowrap;
    border: 0px solid #FFF;
}
</style>

