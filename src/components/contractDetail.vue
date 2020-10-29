<template>
  <div class="Welcome">
    <!-- 合同详情 -->
    <div class="show-contract">
      <el-row>
        <el-col :span="15" :v-model="contractDetail">
          <el-card class="detail-card">
            <div class="contract-title">
              <h4>合同详情</h4>
            </div>
            <div class="contract-content">
              <div id="content-p1">
                <div id="p1-money-month">
                  <div class="item">
                    <span>
                      <span style="font-weight: bold;">编 号:</span>
                      <span style="color:#f56c6c">{{contractDetail.cOrder}}</span>
                    </span>
                  </div>
                  <div class="item">
                    <span>
                      <span style="font-weight: bold;">租 金:</span>
                      <span style="color:#f56c6c">{{contractDetail.cMoney}} 元</span>
                    </span>
                  </div>
                  <div class="item">
                    <span>
                      <span style="font-weight: bold;">时 间:</span>
                      <span style="color:#e6a23c">{{contractDetail.cSumTime}} 月</span>
                    </span>
                  </div>
                  <div class="item">
                    <span>
                      <span style="font-weight: bold;">支付类型:</span>
                      <span style="color:#e6a23c">{{contractDetail.cPayType}}</span>
                    </span>
                  </div>
                  <div class="item">
                    <span>
                      <span style="font-weight: bold;">合同金额:</span>
                      <span
                        style="color:#f56c6c"
                        v-text="contractDetail.cMoney*contractDetail.cSumTime"
                      ></span>
                      <span style="color:#f56c6c">元</span>
                    </span>
                  </div>
                  <div class="content-state">
                    <el-button
                      style="margin-left:60px;background-color:#3ac24ea8;color:#eeeeee;"
                      v-text="contractDetail.cState"
                      :disabled="false"
                    >执行中</el-button>
                    <el-button style="margin-left:60px;" :disabled="true">编辑合同</el-button>
                    <el-button
                      style="margin-left:60px;color:#c2443a;"
                      :disabled="power<2?false:true"
                      @click="this.ensureDelelte"
                    >删除合同</el-button>
                  </div>
                </div>
              </div>
              <div id="content-p2">
                <div id="content-time">
                  <span>
                    开始日期:
                    <span style="color:#f56c6c" v-text="contractDetail.cStartTime"></span>
                  </span>
                  <br>
                  <span>
                    结束时间:
                    <span style="color:#f56c6c" v-text="contractDetail.cEndTime"></span>
                  </span>
                  <br>
                </div>
                <div id="content-other">
                  <span>
                    回款金额:
                    <span style="color:#f56c6c" v-text="contractDetail.cFixMoney"></span>
                  </span>
                  <br>
                  <span>
                    备 注:
                    <span style="color:#f56c6c" v-text="contractDetail.cComment"></span>
                  </span>
                  <br>
                  <div id="p1-owner-vendee">
                    <div>
                      <span>
                        <span style="font-weight: bold;">甲 方:</span>
                        <span>xxx商场</span>
                      </span>
                    </div>
                    <el-collapse accordion>
                      <el-collapse-item title="乙 方" name="1">
                        <div class="rentuser" v-if="rentUser!=null?true:false">
                          <span>姓名: {{rentUser.rName}}</span>
                          <br>
                          <span>电话: {{rentUser.rPhone}}</span>
                          <br>
                          <span>邮箱: {{rentUser.rEmailAddress}}</span>
                          <br>
                          <span>
                            <span>权限: {{rentUser.rPower}}</span>
                          </span>
                        </div>
                      </el-collapse-item>
                      <div>
                        <a
                          :href="'http://localhost:8888/api/v1/common/download?id='+contractDetail.cId"
                        >
                          <span>下载合同文件:{{contractDetail.cFileName}}</span>
                        </a>
                      </div>
                    </el-collapse>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </el-card>
          <div></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showdelForm: false,
      power: "",
      formLabelWidth: "120px",
      rentUser: "",
      contractDetail: ""
    };
  },
  created() {
    this.getContractFrist();
    this.activePath = window.sessionStorage.getItem("activeIndex");
    this.power = window.sessionStorage.getItem("power");
  },
  methods: {
    //删除合同
    del(val) {
      var qs = require("qs");
      this.$http
        .post(
          "/contract/del",
          qs.stringify({
            id: val
          })
        )
        .then(
          re => {
            if (re.data.code == "OK") {
              this.$message.success("删除成功!");
              this.$router.push({
                //页面跳转
                path: "/contract"
              });
            } else {
              this.$message.success("无删除权限!");
            }
          },
          err => {
            this.$message.error({
              message: "请求失败"
            });
          }
        );
    },
    //获取合同详情数据
    getContractFrist() {
      var cId = this.$route.query.id;
      var self = this;
      this.$http
        .get("/contract/get", {
          params: {
            id: cId
          }
        })
        .then(
          re => {
            if (re.data.code == "OK") {
              self.contractDetail = re.data.data;
              self.rentUser=self.contractDetail.rentUser;
            }
          },
          err => {
            this.$message.error({
              message: "请求失败"
            });
          }
        );
    },
    
    //确认删除
    ensureDelelte() {
      var self = this;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (self.contractDetail.cState == "结算") {
            self.del(self.contractDetail.cId);
          } else {
            this.$message({
              type: "info",
              message: "未结算，无法删除合同"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scope>
.Welcome {
  color: black;
}
.detail-card {
  width: 650px;
  height: 700px;
  margin-left: 400px;
}

.rentuser {
  text-align: left;
  font-size: 15px;
  line-height: 20px;
  margin-bottom: 5px;
  margin-top: -2px;
}
.item {
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 8px;
  padding-top: 5px;
  font-family: sans-serif;
}

.el-collapse-item__header {
  font-size: 16px;
  color: black;
  height: 30px;
  line-height: 30px;
}
.el-card__body {
  padding: 0px 20px;
}
#p1-money-month {
  text-align: left;
}
.contract-title {
  height: 40px;
  color: #eeeeee;
  width: 100%;
  text-align: center;
  background-color: darkmagenta;
}

.contract-content {
  height: 600px;
  color: #1f262d;
  width: 100%;
  text-align: center;
  margin-top: 10px;
  font-size: 16px;
}
.content-state {
  margin-top: 10px;
}
#content-time {
  border-top: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  width: 100%;
  height: 20%;
  text-align: left;
  line-height: 35px;
}

#content-other {
  border-bottom: 1px solid #ebeef5;
  width: 100%;
  height: 75%;
  line-height: 35px;
  text-align: left;
}

#content-p1 {
  margin-top: 8px;
  width: 100%;
  height: 40%;
}

#content-p2 {
  width: 100%;
  height: 60%;
}

.dialog-footer {
  margin-top: 50px;
}

.but {
  float: left;
  padding: 10px 15px;
}

.look-contract {
  font-size: 16px;
}
</style>


