<template>
  <div>
    <el-breadcrumb
      separator="/"
      style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;"
    >
      <el-breadcrumb-item :to="{ path: '/userhome' }">用户</el-breadcrumb-item>
      <el-breadcrumb-item>产品</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/userhome/newproducts'}">购买产品</el-breadcrumb-item>
      <!-- <el-button type='success' icon='el-icon-plus' round class='button_add' size='small' @click='addVisible = true'>新建购买</el-button> -->
    </el-breadcrumb>

    <el-dialog :visible.sync="investVisible">
      <h2 style="margin-top:-30px;text-align: center;color: #606266; font-size:30px">请输入支付密码</h2>
      <el-form ref="investForm" label-width="200px" label-position="right">
        <el-form-item label="支付密码">
          <span v-for="(item,index) in List" :key="item.id">
            <input
              type="password"
              v-model="item.val"
              class="border-input"
              @keyup="nextFocus($event,index)"
              @keydown="changeValue(index)"
            />
          </span>
        </el-form-item>

        <el-button type="primary" @click="expiry()">确认</el-button>
      </el-form>
    </el-dialog>

    <el-dialog :visible.sync="detailVisible" top="5vh" width="40%">
      <div class="card-div">
        <div
          style="font-weigth:bold; font-size: 20px; float: left; margin-left: 10px; margin-top: 10px"
        >| 基本资料</div>

        <!-- 头像 -->
        <div style="margin-top: 60px; float: left;">
          <img src="../../assets/user.png" />
        </div>

        <el-form ref="base-form" class="base-form" label-position="right" label-width="200px">
          <el-form-item>
            <label style="float:left;margin-left:40px">用户名</label>
            <br />
            <!-- 这里需要把“没有查询结果”替换为对应的用户名 -->
            <label
              style="font-size:30px; float:left; margin-top:5px; margin-left:40px; color:#2b3080"
            >{{borrower.name}}</label>
          </el-form-item>

          <el-form-item label="性别：">
            <!-- 根据性别动态显示图标 -->
            <img
              v-if="borrower.gender==0"
              src="../../assets/hide.png"
              style="width: 30px; float:left; margin-top:5px"
            />
            <img
              v-else-if="borrower.gender==1"
              src="../../assets/boy.png"
              style="width: 30px; float:left; margin-top:5px"
            />
            <img v-else src="../../assets/girl.png" style="width: 30px; float:left; margin-top:5px" />
          </el-form-item>

          <el-form-item label="手机：" style="text-align:left">{{borrower.phone_number}}</el-form-item>
          <el-form-item label="工龄：" style="text-align:left">{{borrower.length_of_service}}年</el-form-item>
          <el-form-item label="工资：" style="text-align:left">￥{{borrower.salary}}</el-form-item>
          <!-- 中间加条横线 -->
          <div
            style="background:#afaaaa; height:1px; margin-left: 100px; margin-right: 50px; margin-bottom:25px"
          />
          <el-form-item label="失信次数：" style="text-align:left">{{borrower.discredited_records}}</el-form-item>
          <el-form-item label="信用评级：" style="text-align:left">{{borrower.rank}}</el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <!-- 卡片布局 -->
    <div style="margin-right:0px; padding: 10px;background:#fff;text-align:left">
      <img src="../../assets/laba.png" style="width:20px;margin-top:10px;margin-right:10px" />
      <span style="color:gray; font-size:14px">网贷有风险，出借需谨慎</span>
    </div>

    <!-- 产品列表 -->
    <el-table ref="filterTable" :data="all_tableData.slice(pageIndex*10-10, pageIndex*10)">
      <el-table-column type="expand" width="100px">
        <template slot-scope="props">
          <div style="float:left;padding-left:70px;padding-right:70px">
            <el-form class="table-expand" label-position="left" label-width="150px">
              <el-form-item label="产品 ID">
                <span style="color:black;font-weigth:bold;font-size:15px">{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="分期数">
                <span
                  style="color:black;font-weigth:bold;font-size:15px"
                >{{ props.row.installment_number }} <span style="color:gray;font-size:12px"> 期 </span></span>
              </el-form-item>
              <el-form-item label="每月还款日期">
                <span
                  style="color:black;font-weigth:bold;font-size:15px"
                >{{ props.row.pay_day_of_month }} <span style="color:gray;font-size:12px"> 号 </span></span>
              </el-form-item>
            </el-form>
          </div>

          <div style="float:left;padding-left:70px;padding-right:70px">
            <el-form class="table-expand" label-position="left" label-width="150px">
              <el-form-item label="产品发布人">
                <span style="color:black;font-weigth:bold;font-size:15px">{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="预计收入">
                <span style="color:orange;font-weigth:bold;font-size:15px">
                  <span style="color:gray;font-size:12px">¥</span>
                  {{ getExpectedIncome(props.row.amount, props.row.rate) }}
                  <span
                    style="color:gray;font-size:12px"
                  >(本金 + 利息)</span>
                </span>
              </el-form-item>
              <el-form-item label="投资意见">
                <span
                  style="color:black;font-weigth:bold;font-size:15px"
                >{{ getAdvice(props.row.discredited_records, props.row.rank) }}</span>
                <img
                  :src="getAdviceIcon(props.row.discredited_records, props.row.rank)"
                  style="width:20px;"
                />
              </el-form-item>
            </el-form>
          </div>
        </template>
      </el-table-column>

      <el-table-column width="180" label="金额" prop="amount">
        <template slot-scope="scope">
          <span style="color:green;font-size:25px">
            <span style="font-size:12px;color:gray">¥</span>
            {{ scope.row.amount }}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="180" label="利率" prop="rate">
        <template slot-scope="scope">
          <span style="font-size:18px;color:#ad3618">
            {{ scope.row.rate }}
            <span style="font-size:12px;color:gray">%</span>
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="发布时间" prop="process_time">
        <template slot-scope="scope">
          <i class="el-icon-time" style="color:black"></i>
          <span
            style="font-size:18px"
          >{{ scope.row.process_time | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center">
        <template slot="header">
          <span>借款人</span>
          <el-tooltip effect="dark" placement="top">
            <div slot="content">点击借款人名可以了解借款人的基本信息</div>
            <i class="el-icon-question" style="color:#409eff"></i>
          </el-tooltip>
        </template>
        <template slot-scope="scope">
          <el-button
            type="info"
            size="mini"
            plain
            round
            @click="detailVisible=true;handleBorrower(scope.row)"
          >{{scope.row.name}}</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" align="center" width="200px">
        <template slot-scope="scope">
          <el-button
            type="primary"
            round
            size="mini"
            @click="investVisible=true;productId=scope.row.id"
          >购买</el-button>
          <el-button
            type="info"
            round
            size="mini"
            @click="removeProductFormTable(scope.$index + (pageIndex-1)*10)"
          >不感兴趣</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="100*(all_tableData.length/10)"
    ></el-pagination>
  </div>
</template>



<script>
import { post, get } from "../../request/http.js";
let Base64 = require("js-base64").Base64;
import warningImg from "../../assets/warning.png";
import okImg from "../../assets/ok.png";

export default {
  data() {
    return {
      all_tableData: [],
      pageIndex: 1,
      detailVisible: false,
      borrower: {
        name: null,
        gender: null,
        salary: null,
        phone_number: null,
        length_of_service: null,
        discredited_records: null,
        rank: null
      },

      investVisible: false,
      List: [
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" }
      ],
      password: "",
      productId: null
    };
  },
  methods: {
    handleInvest() {
      var res = post("/api/investor/invest", {
        id: this.productId,
        password: Base64.encode(this.password)
      });
      res.then(data => {
        if (data.code == 0) {
          this.investVisible = false;
          this.List= [
          { val: "" },
          { val: "" },
          { val: "" },
          { val: "" },
          { val: "" },
          { val: "" }];
          this.password = '';

          this.$msgbox({
            title: "提示",
            message: data.msg,
            type: "success"
          });

          var res1 = get("/api/investor/productList", {});
          res1.then(tdata => {
            this.all_tableData = tdata.data;
            console.log(tdata);
          });
        } else {
          this.$msgbox({
            title: "提示",
            message: data.msg,
            type: "error"
          });
        }
        console.log(data);
      });
    },

    nextFocus(el, index) {
      var dom = document.getElementsByClassName("border-input"),
        currInput = dom[index],
        nextInput = dom[index + 1],
        lastInput = dom[index - 1];

      if (el.keyCode != 8) {
        if (index < this.List.length - 1) {
          nextInput.focus();
        } else {
          currInput.blur();
        }
      } else {
        if (index != 0) {
          lastInput.focus();
        }
      }
    },

    changeValue(index) {
      this.List[index].val = "";
    },

    expiry() {
      let Input = document.getElementsByClassName("border-input");
      let reg = /^[0-9]+$/;

      for (let i = 0; i < Input.length; i++) {
        if (Input[i].value === "") {
          this.hintTxt = "请填写完整的密码";
          return;
        }
        if (!reg.test(Input[i].value)) {
          this.hintTxt = "请填写数字";
          return;
        }
      }

      for (let i = 0; i < Input.length; i++) {
        this.password += Input[i].value;
      }

      this.handleInvest();
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    handleCurrentChange(val) {
      this.pageIndex = val;
    },

    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    getGender(state) {
      if (state == 0) {
        return "未设置";
      } else {
        return state == 1 ? "男" : "女";
      }
    },

    handleBorrower(row) {
      this.borrower.name = row.name;
      this.borrower.gender = row.gender;
      this.borrower.salary = row.salary;
      this.borrower.phone_number = row.phone_number;
      this.borrower.length_of_service = row.length_of_service;
      this.borrower.rank = row.rank;
      this.borrower.discredited_records = row.discredited_records;
    },

    removeProductFormTable(index) {
      // 移除元素
      this.all_tableData.splice(index, 1);
    },

    getExpectedIncome(amount, rate) {
      // 获取预期收入
      return Math.round(amount * (1 + rate / 100) * 100) / 100;
    },

    getAdvice(dn, rank) {
      // 获取投资意见
      if (dn >= 3) return "当前用户的失信次数已达 " + dn + " 次，请谨慎投资。";
      if (rank <= 5)
        return "当前用户的信用评级为" + rank + "，处于较低水平，请谨慎投资。";
      return "状况良好，请放心投资。";
    },

    getAdviceIcon(dn, rank) {
      // 获取投资意见对应的图标
      if (dn >= 3 || rank <= 5) return warningImg;
      else return okImg;
    }
  },

  mounted() {
    var res = get("/api/investor/productList", {});
    res.then(data => {
      this.all_tableData = data.data;
      console.log(data);
    });
  }
};
</script>

<style scoped>
.el-table {
  /* display:inline-block;
  text-align:center; */
  width: 100%;
  /* width:fit-content;
  margin:auto; */
}

.button_add {
  float: right;
}
.card-div {
  background-color: #ffffff;
  padding: 5px；;
  padding-bottom: 10px;
}
.base-form {
  /* float: left; */
  padding-top: 120px;
}

.border-input {
  background: #ffffff;
  width: 30px;
  font-size: 30px;
  height: 40px;
  margin-left: 15px;
  margin-right: 15px;
  text-align: center;
  border-bottom: 1px solid #333333;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
}

.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>
