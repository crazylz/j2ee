<template>
  <div>
    <el-breadcrumb
      separator="/"
      style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;"
    >
      <el-breadcrumb-item :to="{ path: '/adminhome' }">管理员</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminhome/users' }">管理用户</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table ref="filterTable" :data="all_tableData.slice(pageIndex*10-10, pageIndex*10)">
      <el-table-column type="expand" width="100px">
        <template slot-scope="props">
          <div style="float:left;margin-left:70px;margin-right:70px;width:600px;">
            <el-row>
              <el-col span="5">
                <lable>手机号码</lable>
              </el-col>
              <el-col span="7">
                <span>{{ handleNull(props.row.phoneNumber) }}</span>
              </el-col>
              <el-col span="3">
                <lable>QQ</lable>
              </el-col>
              <el-col span="9">
                <span>{{ handleNull(props.row.qq) }}</span>
              </el-col>
              <el-col span="5">
                <lable>身份证</lable>
              </el-col>
              <el-col span="7">
                <span>{{ props.row.idCardNumber }}</span>
              </el-col>
              <el-col span="3">
                <lable>地址</lable>
              </el-col>
              <el-col span="9">
                <span>{{ handleNull(props.row.address) }}</span>
              </el-col>
              <el-col span="5">
                <lable>第三方支付账号</lable>
              </el-col>
              <el-col span="7">
                <span>{{ props.row.paymentAccount }}</span>
              </el-col>
              <el-col span="3">
                <lable>银行卡</lable>
              </el-col>
              <el-col span="9">
                <span>{{ props.row.bankAccount }}</span>
              </el-col>
              <el-col span="5">
                <lable>失信次数</lable>
              </el-col>
              <el-col span="7">
                <span>{{ props.row.discreditedRecords }}</span>
              </el-col>
            </el-row>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="用户id" align="center" sortable prop="userId">
        <template slot-scope="scope">
          <span>{{ handleId(scope.row.bindId, scope.row.userId)}}</span>
        </template>
      </el-table-column>

      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column label="工号" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.employeeId}}</span>
        </template>
      </el-table-column>

      <el-table-column label="性别" align="center" sortable prop="gender">
        <template slot-scope="scope">
          <span>{{getGender(scope.row.gender)}}</span>
        </template>
      </el-table-column>

      <el-table-column label="工资" align="center" sortable prop="salary">
        <template slot-scope="scope">
          <span>{{scope.row.salary}}</span>
        </template>
      </el-table-column>

      <el-table-column label="信用评级" align="center" sortable prop="rank">
        <template slot-scope="scope">
          <span>{{ handleRank(scope.row.rank) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="工龄" align="center" sortable prop="lengthOfService">
        <template slot-scope="scope">
          <span>{{scope.row.lengthOfService}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" fixed="right" width="200px">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleFrozen(scope.row)">冻结用户</el-button>
          <el-button size="mini" type="primary" @click="handleUnfrozen(scope.row)">解冻用户</el-button>
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
export default {
  data() {
    return {
      all_tableData: [],
      pageIndex: 1
    };
  },
  methods: {
    handleFrozen(row) {
      this.$confirm("确认冻结该用户？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        var res = post("/api/admin/frozenAccount", { id: row.userId });
        res.then(result => {
          if (result.code == 0) {
            this.$msgbox({
              title: "提示",
              message: result.msg,
              type: "success"
            });
            var res1 = get("/api/admin/users", {});
            res1.then(user => {
              this.all_tableData = user.data;
            });
          } else {
            this.$msgbox({
              title: "提示",
              message: result.msg,
              type: "error"
            });
          }
        });
      });
    },

    handleUnfrozen(row) {
      this.$confirm("确认解冻该用户？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        var res = post("/api/admin/unfrozenAccount", { id: row.bindId });
        res.then(result => {
          if (result.code == 0) {
            this.$msgbox({
              title: "提示",
              message: result.msg,
              type: "success"
            });
            var res1 = get("/api/admin/users", {});
            res1.then(user => {
              this.all_tableData = user.data;
            });
          } else {
            this.$msgbox({
              title: "提示",
              message: result.msg,
              type: "error"
            });
          }
        });
      });
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

    handleNull(str) {
      if (str == null || str == "") return "-";
      else return str;
    },

    handleRank(rank) {
      if (rank == 0) return "-";
      else return rank;
    },

    handleId(bindId, id) {
      if (bindId == 0) return "该员工未注册";
      else if (id == 0) return "该账号被冻结";
      else return id;
    }
  },

  mounted() {
    var res = get("/api/admin/users", {});
    res.then(user => {
      this.all_tableData = user.data;
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
.el-table.column {
  width: 9.09%;
}
</style>