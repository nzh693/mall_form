<template>
  <div class="Welcome">
    <h3>租赁户管理</h3>
    <!-- 租赁户表格 -->
    <div>
      <el-table
        :data="rentUsers.filter(data => !search || data.rname.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
      >
        <el-table-column label="序号" type="index" width="120"></el-table-column>
        <el-table-column label="姓名" prop="rname"></el-table-column>
        <el-table-column label="电话" prop="rphone"></el-table-column>
        <el-table-column label="邮箱地址" prop="remailAddress"></el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 页脚 -->
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.page.cur"
        :page-sizes="[6, 8, 10, 15]"
        :page-size="this.page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.page.totalCount"
      ></el-pagination>
    </div>
    <!-- 修改弹出框表单 -->
    <div>
      <el-dialog width="500px" height="700px" title="修改租赁户" :visible.sync="showdelForm">
        <el-form ref="rentUserUpdateFormRef" :rules="this.rentUserRule" :model="this.rentUser">
          <el-form-item prop="rname" label="租赁户名称" :label-width="formLabelWidth">
            <el-input
              class="input"
              v-model="rentUser.rname"
              autocomplete="true"
              style="width:250px;"
            ></el-input>
          </el-form-item>
          <el-form-item prop="rphone" label="租赁户电话" :label-width="formLabelWidth">
            <el-input
              class="input"
              v-model="rentUser.rphone"
              autocomplete="true"
              style="width:250px;"
            ></el-input>
          </el-form-item>
          <el-form-item prop="remailAddress" label="租赁户邮箱" :label-width="formLabelWidth">
            <el-input
              class="input"
              v-model="rentUser.remailAddress"
              autocomplete="true"
              style="width:250px;"
            ></el-input>
          </el-form-item>
          <el-form-item class="input" label="租赁户权限等级" :label-width="formLabelWidth">
            <el-select v-model="rentUser.rpower" placeholder="选择权限等级">
              <el-option label="一级权限" value="1"></el-option>
              <el-option label="二级权限" value="2"></el-option>
              <el-option label="三级权限" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click=" showdelForm= false">取 消</el-button>
          <el-button type="warning" @click="reset">重 置</el-button>
          <el-button type="primary" @click="updateRentUser">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    let phone = /^1[34578]\d{9}$/;
    let isPhone = (rule, value, callback) => {
      if (!phone.test(value)) {
        return callback(new Error("非法手机号"));
      } else {
        callback();
      }
    };
    let email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isEmail = (rule, value, callback) => {
      if (!email.test(value)) {
        return callback(new Error("非法邮箱地址"));
      } else {
        callback();
      }
    };
    return {
      rentUsers: "",
      rentUser: "",
      search: "",
      showdelForm: false,
      formLabelWidth: "120px",
      page: {
        cur: 1,
        size: 8,
        totalCount: "",
        totalPage: ""
      },
      rentUserRule: {
        rname: [
          {
            required: true,
            min: 3,
            max: 15,
            message: "名称3-15字符",
            trigger: ["blur", "change"]
          }
        ],
        rphone: [
          { required: true, message: "联系电话", trigger: ["blur", "change"] },
          { validator: isPhone, required: true, trigger: ["blur", "change"] }
        ],
        remailAddress: [
          { required: true, message: "邮箱地址", trigger: ["blur", "change"] }, //鼠标点击
          { validator: isEmail, required: true, trigger: ["blur", "change"] }
        ]
      }
    };
  },
  // html 渲染前
  created() {
    this.getRentUserData(this.page.cur, this.page.size);
  },
  methods: {
    //重置表单
    reset() {
      this.$refs.rentUserUpdateFormRef.resetFields();
    },
    // 按页获取租赁户
    getRentUserData(cur, size) {
      var url = "/rentuser/page";
      var self = this;
      this.$http
        .get(url, {
          params: {
            curPage: cur,
            pageSize: size
          }
        })
        .then(re => {
          if ((re.data.code = "OK")) {
            self.rentUsers = re.data.data.data;
            self.page.cur = re.data.data.curPage;
            self.page.size = re.data.data.pageSize;
            self.page.totalCount = re.data.data.totalCount;
            self.page.totalPage = re.data.data.totalpage;
          }
        })
        .catch(error => {
          self.$message.error("请求数据失败");
        });
    },
    //显示更新表单
    show(index) {
      this.rentUser = this.rentUsers[index];
      this.showdelForm = true;
    },
    //更改页大小
    handleSizeChange(val) {
      this.getRentUserData(this.page.cur, val);
    },
    //更改页码
    handleCurrentChange(val) {
      this.getRentUserData(val, this.page.size);
    },
    //更新租赁户
    updateRentUser() {
      var qs = require("qs");
      this.$refs.rentUserUpdateFormRef.validate(async valid => {
        if (!valid) {
          // 验证未通过
          return;
        } else {
          this.$http
            .post(
              "/rentuser/update",
              this.rentUser
            )
            .then(
              re => {
                if (re.data.code == "OK") {
                  this.$message.success("更新成功!");
                  this.reload();
                }
              },
              err => {
                this.$message.error({
                  message: "请求失败"
                });
              }
            );
        }
      });
    },
    //删除
    del(cid,rid) {
      var qs = require("qs");
      this.$http
        .post(
          "/rentuser/delete",
          qs.stringify({
            cId: cid,
            rId: rid
          })
        )
        .then(
          re => {
            if (re.data.code == "OK") {
              this.$message.success("删除成功!");
              this.reload();
            }else{
              this.$message.success(re.data.msg);
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
    ensureDelelte(id) {
      var self = this;
      this.$confirm("此操作将永久删除该租赁户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          self.del(self.rentUsers[id].cid,self.rentUsers[id].rid,);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //编辑
    handleEdit(index, row) {
      this.show(index);
    },
    //执行删除
    handleDelete(index) {
      this.ensureDelelte(index);
    }
  }
};
</script>


<style scoped>
.Welcome {
  color: black;
  font-size: 20px;
}
.page {
  margin-top: 20px;
}
</style>
