<template>
  <div class="Welcome">
    <div class="attend_about">
      <div class="attend_header">
        <h1>赛程相关</h1>
        <el-divider content-position="center">
          <h4>SCHEDULE&#12288;RELATED</h4>
        </el-divider>
      </div>
      <div class="container">
        <div class="c_inner">
          <div class="attend" @click="jumpto('registfor')">
            <div class="test_image">
              <img :src="testPic">
            </div>
            <div>
              <span>报名参赛</span>
            </div>
          </div>
          <div class="attend" @click="jumpto('registfor')">
            <div class="test_image">
              <img :src="testPic">
            </div>
            <div>
              <span>报名参赛</span>
            </div>
          </div>
          <div class="attend" @click="jumpto('process')">
            <div class="test_image">
              <img :src="testPic">
            </div>
            <div>
              <span>参赛流程</span>
            </div>
          </div>
          <div class="attend">
            <div class="test_image">
              <img :src="testPic">
            </div>
            <div>
              <span>参赛指导</span>
            </div>
          </div>
          <div class="attend">
            <div class="test_image">
              <img :src="testPic">
            </div>
            <div>
              <span>问题解答</span>
            </div>
          </div>
          <div class="attend">
            <div class="test_image">
              <img :src="testPic">
            </div>
            <div>
              <span>社区交流</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grada_reivew">
      <div class="attend_header">
        <h1>往届回顾</h1>
        <el-divider content-position="center">
          <h4>GRADA&#12288;REVIEW</h4>
        </el-divider>
      </div>
      <div class="support_container">
        <el-carousel :interval="4000" type="card" height="400px">
          <el-carousel-item v-for="item in 6" :key="item">
            <h3 class="medium">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="competition_about">
      <div class="attend_header">
        <h1>关于大赛</h1>
        <el-divider content-position="center">
          <h4>COMPETITION&#12288;ABOUT</h4>
        </el-divider>
      </div>
      <div class="container">
        <div class="about">
          <div class="test_image">
            <img :src="jiesaoPic">
          </div>
          <div>
            <span>大赛介绍</span>
          </div>
        </div>
        <div class="about">
          <div class="test_image">
            <img :src="jiesaoPic">
          </div>
          <div>
            <span>大赛章程</span>
          </div>
        </div>
        <div class="about">
          <div class="test_image">
            <img :src="jiesaoPic">
          </div>
          <div>
            <span>赛区列表</span>
          </div>
        </div>
        <div class="about">
          <div class="test_image">
            <img :src="jiesaoPic">
          </div>
          <div>
            <span>获奖名单</span>
          </div>
        </div>
        <div class="about">
          <div class="test_image">
            <img :src="jiesaoPic">
          </div>
          <div>
            <span>赛区相关</span>
          </div>
        </div>
      </div>
    </div>
    <div class="works">
      <div class="attend_header">
        <h1>大赛优秀作品</h1>
        <el-divider content-position="center">
          <h4>OUTSTANDING&#12288;WORKS</h4>
        </el-divider>
      </div>
      <div class="news_container"></div>
    </div>
    <div class="news">
      <div class="attend_header">
        <h1>新闻</h1>
        <el-divider content-position="center">
          <h4>NEWS</h4>
        </el-divider>
      </div>
      <div class="news_container"></div>
    </div>
    <div class="support">
      <div class="attend_header">
        <h1>赞助支持单位</h1>
        <el-divider content-position="center">
          <h4>INVEST&#12288;SPONSOR</h4>
        </el-divider>
      </div>
      <div class="support_container"></div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      pictures: [
        require("../assets/image/show3.png"),
        require("../assets/image/show2.png"),
        require("../assets/image/show1.png")
      ],
      testPic: require("../assets/image/icons_1.png"),
      jiesaoPic: require("../assets/image/icons_2.png")
    };
  },
  created() {
    // this.activePath = window.sessionStorage.getItem("activeIndex");
  },
  mounted() {},
  methods: {
    jumpto(e){
         this.$router.push({ path:e})
    }
  }
};
</script>


<style scoped>
.Welcome {
  width: 100%;
  height: auto;
  overflow-y: hidden;
}
.attend_about {
  width: 100%;
  height: 240px;
}
.container {
  width: 100%;
  height: 100%;
  margin-top: 40px;
}
.c_inner {
  width: 97%;
  text-align: center;
  display: inline-block;
  border-radius: 2%;
  /* background-color: blueviolet; */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.attend {
  height: 120px;
  width: 16.3%;
  display: inline-block;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04); */
}


.attend:hover,
:focus {
  background-color: rgb(0, 72, 152);
  color: aliceblue;
}
.about {
  height: 100px;
  width: 250px;
  margin-left: 0;
  display: inline-block;
  border-radius: 1%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.attend span {
  font-size: 17px;
  vertical-align: middle;
}
.about span {
  font-size: 16px;
  vertical-align: middle;
}
.test_image {
  margin-bottom: 5px;
}
.test_image img {
  width: 50px;
  margin-top: 10px;
}
.about:hover,
:focus {
  background-color: rgb(0, 72, 152);
  color: aliceblue;
}
.attend_header h1 {
  color: rgb(0, 72, 152);
  font-size: 24px;
}
.competition_about {
  width: 100%;
  height: 250px;
}

.grada_reivew {
  width: 100%;
  height: 500px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
  border-radius: 2%;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
  border-radius: 2%;
}
.el-carousel-item {
  width: 300px;
}
.works {
  width: 100%;
  height: 500px;
}
.news {
  width: 100%;
  height: 500px;
}

.support {
  width: 100%;
  height: 500px;
}
</style>
