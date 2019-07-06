<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb
      separator="/"
      style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;"
    >
      <el-breadcrumb-item :to="{ path: '/userhome' }">用户</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/userhome/repay' }">还款</el-breadcrumb-item>
    </el-breadcrumb>


    <el-dialog :visible.sync="detailVisible">
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

    <!-- 卡片布局 -->
    <div style="margin-right:0px; padding: 10px;background:#fff;text-align:left">
      <img src="../../assets/laba.png" style="width:20px;margin-top:10px;margin-right:10px" />
      <span style="color:gray; font-size:14px">
        诚信借款，按时还款，请及时处理还款记录。想了解逾期还款处理办法请点击
        <a
          href="#"
          style="color:black"
          @click="outOfTimeDialigVisible=true"
        >这里</a> 。
      </span>
    </div>

    <el-dialog :visible.sync="outOfTimeDialigVisible">
      <h2>逾期处理办法</h2>
      <p
        style="text-align:left"
      >本平台为企业内部员工提供24小时在线 p2p 小额贷款服务，所有员工资料均已在财务部备案并审核。若逾期时间不满28天，则该员工的失信记录加1，并由担保人垫付还款金额，用户需尽快处理。逾期28天后，平台将通知担保人进行处理，不排除采用冻结员工工资卡等措施。情节严重、涉及资金数额特别巨大者，不排除采取提起诉讼、上报公安机关等强制措施。
      </p>
      <p style="text-align:left">
      本平台担保人将由企业财务部担任，详细处理办法请在工作时间咨询财务部。
      </p>
    </el-dialog>

    <!-- 菜单 -->
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1" @click="dataType=0">所有还款</el-menu-item>
      <el-menu-item index="2" @click="dataType=2">平台已垫付的还款</el-menu-item>
      <el-menu-item index="3" @click="dataType=1">未还款的还款</el-menu-item>
    </el-menu>

    <!-- 待还款记录表 -->
    <el-table :data="tableData.slice(pageIndex*10-10, pageIndex*10)" border default-expand-all>
      <el-table-column align="center" label="单号" sortable prop="id">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
      align="center"
      prop="loans_date"
      label="借款日期"
      sortable>
      </el-table-column>-->
      <el-table-column align="center" label="还款额" sortable prop="amount">
        <template slot-scope="scope">
          <span>￥{{ scope.row.amount }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="还款截至时间" sortable prop="timeToRepay">
        <template slot-scope="scope">
          <span>{{ scope.row.timeToRepay | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <span v-bind:class="textColor(scope.row.state)">{{object(scope.row.state)}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="detailVisible=true;recordId=scope.row.id" type="text" size="small">还款</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="100*(tableData.length/10)"
    ></el-pagination>
  </div>
</template>


<script>
import { post, get } from "../../request/http.js";
let Base64 = require("js-base64").Base64;

export default {
  data() {
    return {
      all_tableData: [],
      pageIndex: 1,
      dataType: 0,
      activeIndex: "1",
      outOfTimeDialigVisible: false,
      password:'',
      List: [{ val: "" }, { val: "" }, { val: "" }, { val: "" }, { val: "" }, { val: "" }],
      recordId: null,
      detailVisible: false,
    };
  },

  // 必须加上this.tableData=[];才能够不被覆盖
  mounted() {
    this.getRepayData();
  },

  methods: {
    getRepayData() {
      var res = get("/api/borrower/repayRecordsToProcess", {});
      res.then(repay => {
        this.all_tableData = repay.data;
        console.log(repay);
      });
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    handleCurrentChange(val) {
      this.pageIndex = val;
    },

    object(state) {
      if (state == 1) {
        return "未还款";
      } else if (state == 2) {
        return "平台垫付";
      }
    },
    textColor(state) {
      return {
        unpay: state == 1,
        help: state == 2
      };
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

      this.handleRepay();
    },

    handleRepay() {
        var res = get("/api/account/repay", { recordId: this.recordId ,password: Base64.encode(this.password)});
        res.then(data => {
            if (data.code == 0) {
              this.password = '';
              this.List = [{ val: "" }, { val: "" }, { val: "" }, { val: "" }, { val: "" }, { val: "" }];
              this.detailVisible = false;
              this.$msgbox({
                title: "提示",
                message: data.msg,
                type: "success"
              });

              this.getRepayData();
            } else {
              this.$msgbox({
                title: "提示",
                message: data.msg,
                type: "error"
              });
            }
          })
    }
  },
  computed: {
    tableData() {
      if (this.dataType == 0) {
        return this.all_tableData;
      } else {
        var that = this;
        return this.all_tableData.filter(function(element, index, self) {
          // console.log(self[index].state == this.dataType);
          return self[index].state == that.dataType;
        });
      }
    }
  },

  watch: {
    dataType: function(val) {
      this.pageIndex = 1;
    }
  }
};
</script>

<style scoped>
.el_table {
  width: 100%;
}
.help {
  color: #f56c6c;
}
.unpay {
  color: #e6a23c;
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

</style>