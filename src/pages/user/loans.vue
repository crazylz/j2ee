<template>
  <div>
    <el-breadcrumb
      separator="/"
      style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;"
    >
      <el-breadcrumb-item :to="{ path: '/userhome' }">用户</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/userhome/loans'}">借款</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片布局 -->
    <div style="margin-right:0px; padding: 10px;background:#fff;text-align:left">
      <img src="../../assets/laba.png" style="width:20px;margin-top:10px;margin-right:10px" />
      <span style="color:gray; font-size:14px">无抵押，信用贷款，资金快至当天到账，最高可申请10万</span>

      <br />
      <!-- 新建贷款button -->
      <el-button
        type="success"
        icon="el-icon-plus"
        style="float:right;margin-right:20px"
        round
        size="small"
        @click="getLimit();"
      >新建贷款</el-button>

      <br />
    </div>

    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1" @click="dataType=0">所有借款</el-menu-item>
      <el-menu-item index="2" @click="dataType=1">
        <img src="../../assets/black_circle.png" height="25%" />
        待处理
      </el-menu-item>
      <el-menu-item index="3" @click="dataType=2">
        <img src="../../assets/orange_circle.png" height="25%" />
        担保人已同意
      </el-menu-item>
      <el-menu-item index="4" @click="dataType=3">
        <img src="../../assets/gray_circle.png" height="25%" />
        担保人已拒绝
      </el-menu-item>
      <el-menu-item index="5" @click="dataType=4">
        <img src="../../assets/green_circle.png" height="25%" />
        已还清
      </el-menu-item>
      <el-menu-item index="6" @click="dataType=5">
        <img src="../../assets/red_circle.png" height="25%" />
        未还清
      </el-menu-item>
    </el-menu>

    <el-dialog :visible.sync="detailVisible" top="5vh" width="40%" v-if="investor!=null">
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
            >{{investor.name}}</label>
          </el-form-item>

          <el-form-item label="性别：" label-width="200px">
            <!-- 根据性别动态显示图标 -->
            <img
              v-if="investor.gender==0"
              src="../../assets/hide.png"
              style="width: 30px; float:left; margin-top:5px"
            />
            <img
              v-else-if="investor.gender==1"
              src="../../assets/boy.png"
              style="width: 30px; float:left; margin-top:5px"
            />
            <img v-else src="../../assets/girl.png" style="width: 30px; float:left; margin-top:5px" />
          </el-form-item>

          <el-form-item label="手机：" style="text-align:left">{{investor.phoneNumber}}</el-form-item>
          <el-form-item label="工龄：" style="text-align:left">{{investor.lengthOfService}}年</el-form-item>
          <el-form-item label="工资：" style="text-align:left">￥{{investor.salary}}</el-form-item>
          <!-- 中间加条横线 -->
          <div
            style="background:#afaaaa; height:1px; margin-left: 100px; margin-right: 50px; margin-bottom:25px"
          />
          <el-form-item label="失信次数：" style="text-align:left">{{investor.discreditedRecords}}</el-form-item>
          <el-form-item label="信用评级：" style="text-align:left">{{investor.rank}}</el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <el-dialog style=" font-size: 14px " class="loans" :visible.sync="addVisible">
      <h2 style="text-align: center;color: #606266; font-size:30px">新建借款</h2>
      <h2 style="color: #F56C6C; font-size:20px">借款额度: ￥{{limit}}</h2>
      <el-form
        ref="userLoginForm"
        :model="Loan"
        label-width="200px"
        :rules="rules"
        label-position="right"
      >
        <el-form-item label="借款额(￥)" prop="amount" class="input">
          <el-input
            v-model="Loan.amount"
            type="text"
            placeholder="请输入借款额(￥)"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="利率(%)" prop="rate" class="input">
          <el-input v-model="Loan.rate" autocomplete="off" placeholder="请输入利率(%)" clearable></el-input>
        </el-form-item>
        <el-form-item label="每月还款日期" prop="payDayOfMonth" class="input">
          <el-select v-model="Loan.payDayOfMonth" filterable placeholder="请选择每月还款日期">
            <el-option
              v-for="item in payDate"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <span style="display:inline-block;text-align:center;">
            分期
        </span>-->
        <el-form-item label="分期" class="input" prop="installmentNumber">
          <el-select v-model="Loan.installmentNumber" placeholder="请选择分期" label="分期">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="margin-right:130px;margin-top:10px">
          <el-button type="primary" @click="handleSave()">贷款</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 借款申请历史表格 -->
    <el-table ref="filterTable" :data="tableData.slice(pageIndex*10-10, pageIndex*10)" border>
      <el-table-column align="center" prop="userId" label="投资者id" sortable>
        <template slot-scope="scope">
          <el-button
            size="mini"
            plain
            round
            type="info"
            @click="getInvestor(scope.row.investorId);"
          >{{getInvestorId(scope.row.investorId)}}</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="金额" sortable prop="amount">
        <!-- :filters="amountArray"
        :filter-method="filterHandler_range"
        prop="amount"
        column-key="amount"
        :filter-multiple="false"-->

        <template slot-scope="scope">
          <span>
            ￥
            <span style="color:#5190bb;font-size:22px">{{ scope.row.amount }}</span>
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="分期" sortable prop="installmentNumber">
        <!-- :filters="[{text:'6', value:6},{text:'12', value:12},{text:'18', value:18},{text:'24', value:24}]"
        :filter-method="filterHandler"
        prop="installmentNumber"
        column-key="installmentNumber"
        :filter-multiple="false"-->

        <template slot-scope="scope">
          <span>{{ scope.row.installmentNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="利率">
        <template slot-scope="scope">
          <span>{{ scope.row.rate }}%</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="每月还款日期">
        <template slot-scope="scope">
          <span>每月 {{ scope.row.payDayOfMonth }} 号</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="购买时间" sortable prop="purchaseTime">
        <template slot-scope="scope">
          <span>{{ scope.row.purchaseTime | dateformat('YYYY-MM-DD HH:mm:ss')}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" width="150" fixed="right">
        <template slot-scope="scope">
          <!-- 更换为图片状态 -->
          <img :src="imgSrc(scope.row.state)" height="15px" style="margin-right:5px" />
          <span v-bind:class="textColor(scope.row.state)">{{ classObject(scope.row.state)}}</span>
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
import red_circle from "../../assets/red_circle.png";
import green_circle from "../../assets/green_circle.png";
import orange_circle from "../../assets/orange_circle.png";
import gray_circle from "../../assets/gray_circle.png";
import black_circle from "../../assets/black_circle.png";
import { post, get } from "../../request/http.js";
export default {
  data() {
    return {
      addVisible: false,
      detailVisible: false,
      all_tableData: [],
      pageIndex: 1,
      options: [
        { value: 6, label: "6" },
        { value: 12, label: "12" },
        { value: 18, label: "18" },
        { value: 24, label: "24" }
      ],
      amountArray: [
        { text: "10000及10000以上", value: 10000 },
        { text: "50000及50000以上", value: 50000 }
      ],
      dataType: 0,
      activeIndex: "1",

      payDate: [
        { value: 1, lable: "1" },
        { value: 2, lable: "2" },
        { value: 3, lable: "3" },
        { value: 4, lable: "4" },
        { value: 5, lable: "5" },
        { value: 6, lable: "6" },
        { value: 7, lable: "7" },
        { value: 8, lable: "8" },
        { value: 9, lable: "9" },
        { value: 10, lable: "10" },
        { value: 11, lable: "11" },
        { value: 12, lable: "12" },
        { value: 13, lable: "13" },
        { value: 14, lable: "14" },
        { value: 15, lable: "15" },
        { value: 16, lable: "16" },
        { value: 17, lable: "17" },
        { value: 18, lable: "18" },
        { value: 19, lable: "19" },
        { value: 20, lable: "20" },
        { value: 21, lable: "21" },
        { value: 22, lable: "22" },
        { value: 23, lable: "23" },
        { value: 24, lable: "24" },
        { value: 25, lable: "25" },
        { value: 26, lable: "26" },
        { value: 27, lable: "27" },
        { value: 28, lable: "28" }
      ],

      Loan: {
        amount: null,
        installmentNumber: null,
        rate: null,
        payDayOfMonth: null
      },

      investor: [],
      limit: 0,

      // 校验规则
      rules: {
        amount: [{ required: true, message: "金额不能为空", trigger: "blur" }],
        rate: [
          { required: true, message: "贷款额不能为空", trigger: "blur" }
          // {min:5,message:'密码长度必须大于5个字符字符',}
        ],
        installmentNumber: [
          { required: true, message: "分期不能为空", trigger: "blur" }
          // {min:5,message:'密码长度必须大于5个字符字符',}
        ],
        payDayOfMonth: [
          { required: true, message: "还期不能为空", trigger: "blur" }
          // {min:5,message:'密码长度必须大于5个字符字符',}
        ]
      }
    };
  },

  methods: {
    handleEdit(index, row) {
      // console.log(index, row);
    },

    classObject(state) {
      if (state == 1) return "待处理";
      if (state == 2) return "已同意";
      if (state == 3) return "已拒绝";
      if (state == 4) return "已还清";
      if (state == 5) return "未还清";
    },

    // filterHandler(value, row, column) {
    //   // this.tableData = this.tableData.filter(function(element, index, self) {
    //   //     // console.log(self[index].state == this.dataType);
    //   //     return self[index].installmentNumber == value;
    //   // });

    //   // this.$refs.filterTable["data"] = "this.all_tableData";
    //   const property = column["property"];
    //   return row[property] === value;
    // },

    // filterHandler_range(value, row, column) {
    //   const property = column["property"];
    //   return row[property] >= value;
    // },

    imgSrc(state) {
      // console.log(state);
      if (state == 1) return black_circle;
      if (state == 2) return orange_circle;
      if (state == 3) return gray_circle;
      if (state == 4) return green_circle;
      if (state == 5) return red_circle;
    },

    textColor(state) {
      return {
        agree: state == 2,
        reject: state == 3,
        payoff: state == 4,
        unpay: state == 5
      };
    },

    getInvestor(id) {
      var res = get("/api/userProfile/" + id, {});
      res.then(bdata => {
        this.investor = bdata.data;
        // console.log(this.investor);
        this.investor == null || this.investor.userId == 0
          ? (this.detailVisible = false)
          : (this.detailVisible = true);
      });
    },

    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },

    handleCurrentChange(val) {
      this.pageIndex = val;
    },

    handleSave() {
      this.addVisible = false;

      var res = post("/api/borrower/request", {
        amount: this.Loan.amount,
        installmentNumber: this.Loan.installmentNumber,
        rate: this.Loan.rate,
        payDayOfMonth: this.Loan.payDayOfMonth
      });
      res.then(data => {
        // console.log(data);
        if (data.code == 0) {
          this.$msgbox({
            title: "提示",
            message: data.msg,
            type: "success"
          });
          this.getLoanData();
        } else {
          this.$msgbox({
            title: "提示",
            message: data.msg,
            type: "error"
          });
        }
      });
    },

    getInvestorId(id){
      if(id == 0) return '--';
      else return id;
    },

    getGender(state) {
      if (state == 0) {
        return "未设置";
      } else {
        return state == 1 ? "男" : "女";
      }
    },

    getLoanData() {
      var res = get("/api/borrower/allRequests", {});
      res.then(data => {
        this.all_tableData = data.data;
        // console.log(data);
      });
    },

    getLimit() {
      var limit = get("api/borrower/limit", {});
      limit.then(data => {
        // console.log(data);
        if (data.code == 0) {
          this.addVisible = true;
          this.limit = data.data;
        }else if(data.msg == '尚未填写征信资料'){
          this.$msgbox({
            title: "提示",
            message: "尊敬的用户：您好，您必须完成用户征信后才能发布借款产品。",
            type: "error"
          });
        }else{
          this.$msgbox({
            title: "提示",
            message: data.msg,
            type: "error"
          });
        }
      });
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

  mounted() {
    this.getLoanData();
  },

  watch: {
    dataType: function(val) {
      this.pageIndex = 1;
    }
  }
};
</script>

<style scoped>
.agree {
  color: #e6a23c;
}
.reject {
  color: #999999;
}
.payoff {
  color: #67c23a;
}
.unpay {
  color: #f56c6c;
}

.el-table {
  /* display:inline-block;
    text-align:center; */
  width: 100%;
}

.loans {
  font-size: 14px;
  /* border: 1px solid #999999; */
  border-radius: 30px;
  text-align: center;
  width: 80%;
  left: 10%;
  /* background-color: rgba(255,255,255,0.8);	 */
}

.input {
  width: 80%;
  left: 10%;
}

.el-select {
  width: 100%;
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
</style>
