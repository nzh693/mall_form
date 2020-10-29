<template>
  <div class="Welcome">
    <!-- 商铺详情 -->
    <div class="show-shops">
      <el-row>
        <el-col :span="15" :v-model="shopDetail">
          <el-card class="detail-card">
            <span style="">{{shopDetail.sName}}</span>
            <br>
            <div class="item-text">
              <span style="font-size:18px;margin-right:20px;">
                楼 层：
                <span style="color:#e6a23c">{{shopDetail.sFloor}}</span>
              </span>
              <span style="font-size:18px;">
                编 号：
                <span style="color:#e6a23c">{{shopDetail.sOrder}}</span>
              </span>
            </div>
            <div class="item-text">
              <span style="font-size:18px;margin-right:20px;">
                面 积:
                <span style="color:#e6a23c">{{shopDetail.sSize}}</span>
              </span>
              <span style="font-size:18px;">
                状 态：
                <span style="color:#e6a23c" v-text="shopDetail.sState"></span>
              </span>
            </div>
            <div class="item-text">
              <span style="font-size:18px;margin-right:20px;">
                店 员:
                <span style="color:#e6a23c">{{shopDetail.sClerkCount}}</span>
              </span>
              <span style="font-size:18px;">
                预售价：
                <span style="color:#e6a23c" v-text="shopDetail.sPrice"></span>
              </span>
            </div>
            <el-collapse style="margin-top:20px;" v-model="rentUser" accordion>
              <el-collapse-item title="租赁户" style="font-size:18px;" name="1">
                <!-- 租赁户信息 -->
                <div v-if="shopDetail.rId<0">
                  <span>暂无</span>
                </div>
                <div v-if="shopDetail.rId>0">
                  <div class="item-text">
                    <span>姓名: {{shopDetail.rentUser.rName}}</span>
                    <br>
                    <span>电话: {{shopDetail.rentUser.rPhone}}</span>
                    <br>
                    <span>邮箱: {{shopDetail.rentUser.rEmailAddress}}</span>
                    <br>
                    <span>等级权限: {{shopDetail.rentUser.rPower}}</span>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
            <h4>
              主营类型代码：
              <span>{{shopDetail.srCode}}</span>
            </h4>
            <el-button type="warning" @click="showdelForm=true">修改</el-button>
            <el-button type="danger" @click="ensureDelelte">停用店铺</el-button>
            <br>
            <div style="margin-top:20px;" v-if="shopDetail.cId >0 ? true:false">
              <a href="#" v-show="shopDetail" class="look-contract" @click="contractDetail()">查看签约合同</a>
            </div>
          </el-card>
          <div></div>
        </el-col>
      </el-row>
    </div>
    <!-- 修改弹出框表单 -->
    <div>
      <el-dialog width="500px" height="800px" title="修改商铺" :visible.sync="showdelForm">
        <el-form
          ref="shopUpdateFormRef"
          :rules="this.shopUpdateDataFormRules"
          :model="this.shopDetail"
        >
          <el-form-item prop="sName" label="商铺名称" :label-width="formLabelWidth">
            <el-input
              class="input"
              v-model="shopDetail.sName"
              autocomplete="true"
              style="width:250px;"
            ></el-input>
          </el-form-item>
          <el-form-item prop="sSize" label="商铺大小" :label-width="formLabelWidth">
            <el-input
              class="input"
              v-model="shopDetail.sSize"
              autocomplete="true"
              style="width:250px;"
            ></el-input>
          </el-form-item>
          <el-form-item prop="sPrice" label="商铺价格" :label-width="formLabelWidth">
            <el-input
              class="input"
              v-model="shopDetail.sPrice"
              autocomplete="true"
              style="width:250px;"
            ></el-input>
          </el-form-item>
          <el-form-item prop="sOrder" label="商铺编号" :label-width="formLabelWidth">
            <el-input
              class="input"
              v-model="shopDetail.sOrder"
              autocomplete="true"
              style="width:250px;"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item class="input" label="主营类型" :label-width="formLabelWidth">
            <el-select v-model="shopDetail.srCode" placeholder="请选择主营类型">
              <el-option label="餐饮" value="211"></el-option>
              <el-option label="娱乐" value="311"></el-option>
              <el-option label="饰品" value="111"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="input" label="商铺状态" :label-width="formLabelWidth" >
            <el-select v-model="shopDetail.sState" placeholder="请选择状态" :disabled="true">
              <el-option label="空闲" value="0"></el-option>
              <el-option label="签约" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="warning" @click="reset">重 置</el-button>
          <el-button type="primary" @click="updateShop">确 定</el-button>
          <el-button @click=" showdelForm= false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
//验证数据格式
export function chechNum(rules, value, callback) {
  if (!value) {
    return callback(new Error("请填写整数"));
  } else if (value > 300 || value < 30) {
    return callback(new Error("面积在30-300平方"));
  } else {
    callback();
  }
}

export default {
  inject: ["reload"],
  data() {
    return {
      showdelForm: false,
      formLabelWidth: "120px",
      rentUser: "",
      shopDetail: "",
      shopUpdateDataFormRules: {
        sName: [
          {
            required: true,
            min: 3,
            max: 15,
            message: "名称3-15字符",
            trigger: ["blur", "change"]
          }
        ],
        sSize: [
          {
            required: true,
            validator: chechNum,
            message: "面积区间30-300",
            trigger: ["blur", "change"]
          }
        ],
        sPrice:[
          {
            required: true,
            message: "租赁价格",
            trigger: ["blur", "change"]
          }
        ],
        sOrder: [
          { required: true, message: "商铺编号", trigger: ["blur", "change"] }, //鼠标点击
          { min: 3, max: 8, message: "编号3-8位", trigger: ["blur", "change"] } //鼠标点击
        ]
      }
    };
  },
  created() {
    this.getShopDetail();
    this.activePath = window.sessionStorage.getItem("activeIndex");
  },
  methods: {
    //重置表单
    reset() {
      this.$refs.shopUpdateFormRef.resetFields();
    },
    //跳转至合同详情页
    contractDetail() {
      //  this.contractDetail = this.$route.query.contract;获取数据
      var qs = require("qs");
      var self = this;
      this.$router.push({
        //页面跳转
        path: "/contractdetail",
        query: {
          id: self.shopDetail.cId
        }
      });
    },
    //修改店铺新
    updateShop() {
       this.$refs.shopUpdateFormRef.validate(async valid => {
        if (!valid) {
          return;
        } else {
          this.$http.post("/shop/updateShop", this.shopDetail).then(
            re => {
              if (re.data.code == "OK") {
                this.$message.success("修改成功!");
                this.reload();
                this.showdelForm = false;
              }
            },
            err => {
              this.$message.error({
                message: "请求失败"
              });
            }
          );
          this.showdelForm = false;
        }
      });
    },
    //停用店铺
    del(val) {
      var qs = require("qs");
      var isAllow=(this.shopDetail.sState == "空闲")
      console.log(isAllow);
      if (isAllow) {//非空闲状态无法停用
        this.$http
          .post(
            "/shop/delShop",
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
                  path: "/shop"
                });
              }
            },
            err => {
              this.$message.error({
                message: "请求失败"
              });
            }
          );
      }else{
        this.$message.error("失败,无法停用已签约商铺");
      }
    },
    //获取店铺数据
    getShopDetail() {
      var sId = this.$route.query.shopId;
      var qs = require("qs");
      this.$http
        .post(
          "/shop/getShopDetailById",
          qs.stringify({
            id: sId
          })
        )
        .then(re => {
          this.shopDetail = re.data.data;
        })
        .catch(err => {
          this.$message.error({
            message: "网络错误"
          });
        });
    },
    //确认删除
    ensureDelelte() {
      var self = this;
      this.$confirm("此操作将停用该店铺, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          self.del(self.shopDetail.sId);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消停用"
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
  width: 500px;
  height: 600px;
  margin-left: 400px;
}

.dialog-footer {
  margin-top: 100px;
}
.input {
  margin-left: 0;
  float: left;
}
.but {
  float: left;
  padding: 10px 15px;
}
.show-shops {
  padding-top: 20px;
  padding-left: 90px;
}
.look-contract {
  font-size: 16px;
}

.page-block {
  margin-top: 15px;
}
.item-text {
  margin-top: 15px;
  border-top: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  padding: 9px 0px;
}
.el-form{
 width: auto;
 height: auto;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
</style>


