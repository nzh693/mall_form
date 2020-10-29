<template>
  <div class="Welcome">
    <h2>合同管理</h2>
    <div>
      <div class="up-bt">
      <el-button size="small" type="primary" @click="btShow=true">点击上传</el-button>
    </div>
    <div class="create-bt">
      <el-button size="small" type="warning" @click="btCreateShow=true">创建合同</el-button>
    </div>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table :data="tabledata" border="" style="width: 80%">
        <el-table-column type="index" label="编号" width="80"></el-table-column>
        <el-table-column prop="cFileName" label="合同文件名" width="120"></el-table-column>
        <el-table-column prop="cStartTime" label="生效时间" width="150"></el-table-column>
        <el-table-column prop="cSumTime" label="月数" width="120"></el-table-column>
        <el-table-column prop="cMoney" label="租金" width="120"></el-table-column>
        <el-table-column prop="cEndTime" label="失效时间" width="150"></el-table-column>
        <el-table-column prop="cPayType" label="支付类型" width="100"></el-table-column>
        <el-table-column prop="cState" label="状态" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="lookDetail(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 页码 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.cur"
        :page-sizes="[6, 8, 10, 20]"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </div>
    <!-- 创建合同 -->
    <div>
      <el-dialog title="创建线上合同" :visible.sync="btCreateShow">
       <h3>该模块待完成</h3>
      </el-dialog>
    </div>
    <!-- 上传合同 -->
    <el-dialog title="上传合同文件" :visible.sync="btShow">
      <div>
        <el-upload
          class="upload-demo"
          drag
          action="http://localhost:8888/api/v1/common/uploadFile"
          multiple
          :on-success="afterSuccess"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">文件大小不超过100MB</div>
        </el-upload>
        <el-button style="margin-top:20px;" size="small" type="warning" @click="btShow=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      isShow: false,
      btShow: false,
      btCreateShow: false,
      tabledata: [],
      currentTime: "",
      page: {
        cur: 1,
        size: 10,
        total: 0,
        start: 1
      }
    };
  },
  created() {
    //初始化数据
    this.getPageContracts(this.page.cur, this.page.size);
  },

  methods: {
    //按页获取数据
    getPageContracts(cur, size) {
      //校验通过发起网络请求
      var self = this;
      var qs = require("qs");
      this.$http
        .get("/contract/page", {
          params: {
            curPage: cur,
            sizePage: size
          }
        })
        .then(
          re => {
            if (re.data.code == "OK") {
              self.tabledata = re.data.data.data;
              self.page.total = re.data.data.totalCount;
            }
          },
          err => {
            this.$message.error({
              message: "请求失败"
            });
          }
        );
    },
    //文件上传成功调用
    afterSuccess(re, file, fileList) {
      console.log(re);
      this.reload();  
      this.$message.success(re.msg);
    },

    //查看合同详情
    lookDetail(val) {
      this.$router.push({
        //页面跳转
        path: "/contractdetail",
        query: {
          id: val.cId
        }
      });
    },
    //修改页大小
    handleSizeChange(val) {
      this.page.size = val;
      this.getPageContracts(this.page.cur, this.page.size);
    },
    //修改页码
    handleCurrentChange(val) {
      this.page.cur = val;
      this.getPageContracts(this.page.cur, this.page.size);
    }
  }
};
</script>

<style scope>
.Welcome {
  color: black;
  font-size: 20px;
  width: 100%;
}
.upload {
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.up-bt {
  float: left;
  margin-bottom: 10px;
}
.create-bt{
  float: right;
}
.table {
  margin-left: 250px;
  height: auto;
}
.el-form {
  margin-left: 500px;
  text-align: center;
}
.el-pagination {
  margin-top: 15px;
}
</style>


