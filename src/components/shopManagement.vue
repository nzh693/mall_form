<template>
  <div class="Welcome">
    <el-button type="primary" id="but-add" @click="isShow=true">新增商铺</el-button>
    <div class="show-shops">
      <el-row>
        <el-col
          :span="8"
          v-for="item in this.shopList"
          :index="item.sId+''"
          :key="item.sId"
          :offset="0"
        >
          <el-card id="show-card">
            <span style="">{{item.sName}}</span>
            <br>
            <span>
              楼 层:
              <span style="color:#f56c6c;font-size: 16px;" v-text="item.sFloor"></span>
            </span>
            <br>
            <span>
              编 号:
              <span style="color:#f56c6c;font-size: 16px;" v-text="item.sOrder"></span>
            </span>
            <br>
            <span>
              面 积:
              <span style="color:#f56c6c;font-size: 16px;" v-text="item.sSize"></span>
            </span>
            <br>
            <span>
              状 态:
              <span
                style="color:#f56c6c;font-size: 16px;"
                v-text="item.sState==0 ? '空闲': '已签约'"
              ></span>
            </span>
            <br>
            <el-button
              style="font-size: 16px;"
              type="text"
              class="button"
              @click="findDetail(item.sId)"
            >查看详情</el-button>
          </el-card>
          <div></div>
        </el-col>
      </el-row>
    </div>
    <!-- 新增弹出框表单 -->
    <div>
      <el-dialog width="500px" title="新增商铺" :visible.sync="isShow">
        <div class="container">
          <el-form ref="shopFormRef" :rules="this.shopDataFormRules" :model="shopDataForm">
            <el-form-item prop="sName" label="商铺名称" :label-width="formLabelWidth">
              <el-input
                class="input"
                v-model="shopDataForm.sName"
                autocomplete="true"
                style="width:250px;"
              ></el-input>
            </el-form-item>
            <el-form-item prop="sSize" label="商铺大小" :label-width="formLabelWidth">
              <el-input
                class="input"
                v-model="shopDataForm.sSize"
                autocomplete="true"
                style="width:250px;"
              ></el-input>
            </el-form-item>
            <el-form-item prop="sOrder" label="商铺编号" :label-width="formLabelWidth">
              <el-input
                class="input"
                v-model="shopDataForm.sOrder"
                autocomplete="true"
                style="width:250px;"
              ></el-input>
            </el-form-item>
            <el-form-item label="商铺楼层" :label-width="formLabelWidth">
              <el-select class="input" v-model="shopDataForm.sFloor" placeholder="请选择楼层">
                <el-option label="1楼" value="1"></el-option>
                <el-option label="2楼" value="2"></el-option>
                <el-option label="3楼" value="3"></el-option>
                <el-option label="4楼" value="4"></el-option>
                <el-option label="5楼" value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="input" label="主营类型" :label-width="formLabelWidth">
              <el-select v-model="shopDataForm.srCode" placeholder="请选择主营类型">
                <el-option label="餐饮" value="211"></el-option>
                <el-option label="娱乐" value="311"></el-option>
                <el-option label="饰品" value="111"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="isShow = false">取 消</el-button>
            <el-button type="warning" @click="reset">重 置</el-button>
            <el-button type="primary" @click="add">确 定</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
    <!-- 分页脚 -->
    <div class="page-block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.shopPage.curPage"
        :page-sizes="[6, 8, 10, 12]"
        :page-size="100"
        :pager-count="11"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.shopPage.totalCount"
      ></el-pagination>
    </div>
  </div>
</template>




<script>
// 验证表单数据
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
      isShow: false,
      formLabelWidth: "120px",
      shopDataForm: {
        sName: "",
        sFloor: "",
        sSize: "",
        sOrder: "",
        srCode: ""
      },
      shopPage: {
        curPage: 1,
        pageSize: 6,
        totalCount: 0,
        totalpage: 0,
        startIndex: 0
      },
      shopList: "",
      // 数据校验规则
      shopDataFormRules: {
        sName: [
          { required: true, message: "商铺名称", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "密码长度在3-12个字符",
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
        sOrder: [
          { required: true, message: "商铺编号", trigger: ["blur", "change"] }, //鼠标点击
          { min: 3, max: 8, message: "编号3-8位", trigger: ["blur", "change"] } //鼠标点击
        ]
      }
    };
  },
  created() {
    this.getShopByPage(this.shopPage.curPage, this.shopPage.pageSize);
    this.activePath = window.sessionStorage.getItem("activeIndex");
  },
  methods: {
    //新增店铺
    add() {
      this.$refs.shopFormRef.validate(async valid => {
        if (valid) {
          this.$http.post("/shop/addShop", this.shopDataForm).then(
            re => {
              if (re.data.code == "OK") {
                this.$message.success("添加成功!");
                this.reload();
              }
            },
            err => {
              this.$message.error({
                message: "请求失败"
              });
            }
          );
        } else {
          //验证(未通过
          alert("数据格式未通过验证");
          return;
        }
      });
      this.isShow = false;
    },
    //重置表单
    reset() {
      this.$refs.shopFormRef.resetFields();
    },
    //更改页大小
    handleSizeChange(val) {
      this.shopPage.pageSize = val;
      this.getShopByPage(this.shopPage.curPage, this.shopPage.pageSize);
    },
    //更改当前页
    handleCurrentChange(val) {
      this.shopPage.curPage = val;
      this.getShopByPage(this.shopPage.curPage, this.shopPage.pageSize);
    },
    //查看商店详情
    findDetail(val) {
      //传商铺id到详情页再去请求数据
      this.$router.push({
        path: "/shopDetail",
        query: {
          shopId: val
        }
      });
    },
    //获取第一页的商场数据
    getShopByPage(cur, size) {
      //校验通过发起网络请求
      var qs = require("qs");
      this.$http
        .post(
          "/shop/getShopByPage",
          qs.stringify({
            curPage: cur,
            sizePage: size
          })
        )
        .then(re => {
          this.shopPage = re.data.data;
          this.shopList = re.data.data.data;
        })
        .catch(err => {
          this.$message.error({
            message: "网络错误"
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

.dialog-footer {
  margin-top: 50px;
}
.input {
  margin-left: 0;
  float: left;
}
#but-add {
  float: left;
  padding: 5px 10px;
}
.show-shops {
  padding-top: 40px;
  padding-left: 90px;
}
#show-card {
  margin-top: 25px;
  width: 400px;
  height: 200px;
  line-height: 30px;
  color: white;
  background-color: #1f262d;
  padding-bottom: 20px;
}

.page-block {
  margin-top: 15px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
</style>


