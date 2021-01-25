<template>
  <div class="Welcome">
    <div class="menu_news">
      <div class="new_header">大赛新闻</div>
      <div class="menu">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#ececec"
          text-color="#909399"
          active-text-color="#336dad"
        >
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航一</span>
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
export default {};
</script>


<style scoped>
.Welcome {
  color: black;
  font-size: 20px;
  background-color: gray;
  width: 100%;
  height: 800px;
}
.menu_news {
  float: left;
  width: 25%;
  height: 100%;
  background-color: brown;
}
.news_container {
  float: right;
  width: 72%;
  height: 100%;
  background-color: rebeccapurple;
}

.new_header {
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
