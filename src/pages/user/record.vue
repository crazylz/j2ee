<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb
      separator="/"
      style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;"
    >
      <el-breadcrumb-item :to="{ path: '/userhome' }">用户</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/userhome/record' }">资金流转记录</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table ref="filterTable" :data="all_tableData.slice(pageIndex*10-10, pageIndex*10)">
      <el-table-column align="center" label="第三方账户号">
        <template slot-scope="scope">
          <span>{{ scope.row.account }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="描述">
        <template slot-scope="scope">
          <span>{{ scope.row.desc }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="金额" sortable prop="amount">
        <template slot-scope="scope">
          <span>￥ {{ scope.row.amount }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="时间" sortable prop="time">
        <template slot-scope="scope">
          <span>{{ scope.row.time | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作类型">
        <template slot-scope="scope">
          <img :src="getFundInOut(scope.row.operationType)" height="15px" style="margin-right:5px" />
          <span
            v-bind:class="textColor(scope.row.operationType)"
          >{{object(scope.row.operationType)}}</span>
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
import fundIn from "../../assets/in.png";
import fundOut from "../../assets/out.png";
import { post, get } from "../../request/http.js";

export default {
  data() {
    return {
      all_tableData: [],
      pageIndex: 1
    };
  },

  mounted() {
    this.getRecordData();
  },

  methods: {
    getRecordData() {
      var res = get("/api/account/get_fund_records", {});
      res.then(record => {
        this.all_tableData = record.data;
        console.log(record);
      });
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    handleCurrentChange(val) {
      this.pageIndex = val;
    },

    getFundInOut(state) {
      if (state == 0) return fundIn;
      else return fundOut;
    },
    object(state) {
      return state == 0 ? "转入" : "转出";
    },
    textColor(state) {
      return {
        in: state == 0,
        out: state == 1
      };
    },

    handleClick(row) {
      this.$confirm("确定要对此产品还款吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        var res = get("/api/account/repay", { recordId: row.id });
        res
          .then(data => {
            if (data.code == 0) {
              this.$msgbox({
                title: "提示",
                message: data.msg,
                type: "success"
              });

              var res = get("/api/borrower/repayRecordsToProcess", {});
              res.then(repay => {
                this.all_tableData = repay.data;
                console.log(repay);
              });
            } else {
              this.$msgbox({
                title: "提示",
                message: data.msg,
                type: "error"
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消还款"
            });
          });
      });
    }
  }
};
</script>

<style scoped>
.el_table {
  width: 100%;
}
.in {
  color: #67c23a;
}
.out {
  color: #f56c6c;
}
</style>