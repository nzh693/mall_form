<template>
  <div class="Welcome">
    <!-- 基本信息 -->
    <div class="others" id="shop">
      <div class="statistic_p1">
        <div style="padding:8px 0px;font-size: 18px;">
          <span>店铺 SHOP</span>
        </div>
        <div class="text">
          <div class="in">
            <span>入驻商铺 : {{this.shopData.rent}}</span>
          </div>
          <div class="free">
            <span>空置商铺 : {{this.shopData.free}}</span>
          </div>
          <div class="p1">
            <div
              class="total"
            >空置率 : {{parseFloat(this.shopData.free/this.shopData.shop_total).toFixed(3)}}</div>
            <div class="rate">商铺总数 : {{this.shopData.shop_total}}</div>
          </div>
        </div>
      </div>
      <div class="statistic_p2">
        <div style="padding:8px 0px;font-size: 18px;">
          <span>人员 STAFF</span>
        </div>
        <div class="text-mall">
          <div class="in-staff">
            <span>商铺人员 : {{this.staffData.assistant}}</span>
          </div>
          <div class="free-staff">
            <span>管理人员 : {{this.staffData.admin+this.staffData.manager}}</span>
          </div>
        </div>
      </div>
      <div class="statistic_p3">
        <div style="padding:15px 0px;font-size: 18px;">
          <span>租赁户 RENTUSER</span>
        </div>
        <div class="text">
          <div class="in-rentUser">
            <h3>租赁总数 : {{this.rentUserData.rent_user}}</h3>
          </div>
        </div>
      </div>
      <div class="statistic_p4">
        <div style="padding:10px 0px;font-size: 18px;">
          <span>合同 CONTRACT</span>
        </div>
        <div class="text">
          <div class="in">
            <span>生效中 : {{this.contractData.normal}}</span>
          </div>
          <div class="free">
            <span>逾期数 :{{this.contractData.beyond}}</span>
          </div>
          <div class="p1">
            <div class="p1">
              <div class="total">结算中 : {{this.contractData.settle}}</div>
              <div class="rate">有效合同数 : {{this.contractData.contract_total}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 图表 -->
    <div class="dom" id="shop">
      <!-- 员工统计 -->
      <div class="staff_dom" id="staff"></div>
      <div class="contract_dom" id="contract"></div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      contractData: "",
      staffData: "",
      shopData: "",
      rentUserData: "",
      startData: [],
      endData: [],
      beyondData: []
    };
  },
  created() {
    this.activePath = window.sessionStorage.getItem("activeIndex");
  },
  mounted() {
    this.getCharData();
  },
  methods: {
    initEcharts() {
      //初始化dom
      var option1 = {
        title: {
          text: "人员分布图",
          left: "left"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "人员",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: this.staffData.assistant, name: "店员" },
              { value: this.staffData.rent_user, name: "租赁户" },
              { value: this.staffData.manager, name: "运营经理" },
              { value: this.staffData.admin, name: "管理员" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      var option2 = {
        title: {
          text: "合同统计情况",
          left: "left"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ["签订", "到期", "结算"]
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ],
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "个数",
            min: 0,
            max: 20,
            interval: 2,
            axisLabel: {
              formatter: "{value} 个"
            }
          },
          {
            type: "value",
            name: "个数",
            min: 0,
            max: 10,
            interval: 2,
            axisLabel: {
              formatter: "{value} 个"
            }
          }
        ],
        series: [
          {
            name: "签订",
            type: "bar",
            data: this.startData
          },
          {
            name: "到期",
            type: "bar",
            data: this.endData
          },
          {
            name: "结算",
            type: "line",
            yAxisIndex: 1,
            data: this.beyondData
          }
        ]
      };

      var staffChart = this.$echarts.init(document.getElementById("staff"));
      staffChart.setOption(option1);
      var contractChart = this.$echarts.init(
        document.getElementById("contract")
      );
      contractChart.setOption(option2);
    },

    //请求基本数据 和echar图表数据
    getCharData() {
      this.$http
        .get("/common/getStatisticData")
        .then(re => {
          this.staffData = re.data.data.staff;
          this.contractData = re.data.data.contract;
          this.shopData = re.data.data.shop;
          this.rentUserData = re.data.data.rent_user;
          this.$http
            .get("/common/getStatisticEcharData")
            .then(re => {
              this.startData = re.data.data.start_time;
              this.endData = re.data.data.end_time;
              this.beyondData = re.data.data.beyond_time;
              this.initEcharts();
            })
            .catch(err => {
              this.$message.error("请求错误");
            });
        })
        .catch(err => {
          this.$message.error("请求错误");
        });
    }
  }
};
</script>


<style scoped>
.Welcome {
  width: 100%;
  height: 100%;
  background-color: #1c1c1c;
}
.staff_dom {
  color: black;
  background-color: white;
  font-size: 20px;
  width: 50%;
  height: 100%;
  float: left;
}

.contract_dom {
  color: black;
  background-color: white;
  font-size: 20px;
  width: 50%;
  height: 100%;
  float: right;
}
.text-mall {
  width: 100%;
}
.in-staff {
  width: 40%;
  height: auto;
  margin-top: 30px;
  text-align: left;
  margin-left: 10%;
  font-size: 18px;
  float: left;
}
.free-staff {
  width: 50%;
  height: auto;
  margin-top: 30px;
  text-align: left;
  font-size: 18px;
  float: right;
}
.in {
  width: 95%;
  height: 30%;
  text-align: left;
  padding-left: 5%;
}
.free {
  width: 95%;
  height: 30%;
  text-align: left;
  padding-left: 5%;
}
.p1 {
  height: 30%;
  width: 100%;
  height: auto;
}
.total {
  float: left;
  margin-left: 5%;
}
.rate {
  float: right;
  margin-right: 30px;
}
.in-rentUser {
  text-align: center;
}
.rate-contract {
  margin-right: 50px;
}
.others {
  width: 100%;
  height: 22%;
  padding: 20px 0;
  color: aliceblue;
}
.text {
  float: left;
  width: 100%;
  height: 90%;
  font-size: 16px;
  margin-top: 0px;
}

.statistic {
  width: 22%;
  height: 93%;
  background-color: blueviolet;
  margin-left: 2.2%;
  float: left;
}
.statistic_p1 {
  width: 22%;
  height: 95%;
  background-color: #fc3158;
  margin-left: 2.2%;
  float: left;
}

.statistic_p2 {
  width: 22%;
  height: 95%;
  background-color: #53d769;
  margin-left: 2.2%;
  float: left;
}

.statistic_p3 {
  width: 22%;
  height: 95%;
  background-color: #147efb;
  margin-left: 2.2%;
  float: left;
}
.statistic_p4 {
  width: 22%;
  height: 95%;
  background-color: #2a2727;
  margin-left: 2.2%;
  float: left;
}

.dom {
  background-color: green;
  width: 100%;
  height: 75%;
}
</style>
