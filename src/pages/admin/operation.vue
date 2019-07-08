<template>
  <div>
    <el-breadcrumb
      separator="/"
      style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;"
    >
      <el-breadcrumb-item :to="{ path: '/adminhome' }">管理员</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminhome/operation' }">查看日志</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 资料卡片 -->
    <el-dialog :visible.sync="detailVisible" top="5vh" width="40%" v-if="user!=null">
      <div class="card-div">
        <div
          style="font-weigth:bold; font-size: 20px; float: left; margin-left: 10px; margin-top: 10px"
        >| 基本资料</div>

        <div style="margin-top: 60px; float: left;">
          <img src="../../assets/user.png" />
        </div>

        <el-form ref="base-form" class="base-form" label-position="right" label-width="200px">
          <el-form-item>
            <label style="float:left;margin-left:40px">用户名</label>
            <br />
            <label
              style="font-size:30px; float:left; margin-top:5px; margin-left:40px; color:#2b3080"
            >{{user.name}}</label>
          </el-form-item>

          <el-form-item label="性别：">
            <img
              v-if="user.gender==0"
              src="../../assets/hide.png"
              style="width: 30px; float:left; margin-top:5px"
            />
            <img
              v-else-if="user.gender==1"
              src="../../assets/boy.png"
              style="width: 30px; float:left; margin-top:5px"
            />
            <img v-else src="../../assets/girl.png" style="width: 30px; float:left; margin-top:5px" />
          </el-form-item>

          <el-form-item label="手机：" style="text-align:left">{{user.phoneNumber}}</el-form-item>
          <el-form-item label="工龄：" style="text-align:left">{{user.lengthOfService}}年</el-form-item>
          <el-form-item label="工资：" style="text-align:left">￥{{user.salary}}</el-form-item>
          <div
            style="background:#afaaaa; height:1px; margin-left: 100px; margin-right: 50px; margin-bottom:25px"
          />
          <el-form-item label="失信次数：" style="text-align:left">{{user.discreditedRecords}}</el-form-item>
          <el-form-item label="信用评级：" style="text-align:left">{{user.rank}}</el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1" @click="dataType=2">所有日志</el-menu-item>
      <el-menu-item index="2" @click="dataType=0">操作成功的日志</el-menu-item>
      <el-menu-item index="3" @click="dataType=1">操作失败的日志</el-menu-item>
    </el-menu>

    <!-- 操作记录表格 -->
    <el-table ref="filterTable" :data="all_tableData" border>
      <el-table-column label="操作id" align="center" sortable prop="userId">
        <template slot-scope="scope">
          <span>{{scope.row.opId}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作时间" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.opTime | dateformat('YYYY-MM-DD HH:mm:ss')}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作类型" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.opType}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作人Id" align="center" prop="gender">
        <template slot-scope="scope">
          <el-button size="mini" @click="getUser(scope.row.opCreatorId)">{{scope.row.opCreatorId}}</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作人账号类型" align="center">
        <template slot-scope="scope">
          <span>{{getAccountType(scope.row.opCreatorId, scope.row.opCreatorType)}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作人IP" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.opCreatorIp}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作结果" align="center" prop="discreditedRecords">
        <template slot-scope="scope">
          <span v-bind:class="textColor(scope.row.opResult)">{{getOpResult(scope.row.opResult)}}</span>
        </template>
      </el-table-column>

      <el-table-column label="结果描述" align="center" prop="salary">
        <template slot-scope="scope">
          <span>{{scope.row.opResultDesc}}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="pagination.pageSize"
      :page-sizes="pagination.pageSizes"
      :current-page="queryParam.pageNo"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
    ></el-pagination>
  </div>
</template>



<script>
import { post, get } from "../../request/http.js";
export default {
  data() {
    return {
      all_tableData: [],
      dataType: 2,
      activeIndex: "1",
      user: [],
      detailVisible: false,

      pagination: {
        // 分页的数据
        total: 0,
        pageSize: 10,
        pageSizes: [10, 20, 30, 50, 100]
      },

      queryParam: {
        pageSize: 10,
        pageNo: 1
      }
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },

    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.queryParam.pageSize = val;
      this.queryParam.pageNo = 1;
      if (this.dataType == 2) this.getOpLogByPage();
      else this.getOpLogByOpResultByPage();
    },

    handleCurrentChange(val) {
      this.queryParam.pageNo = val;
      if (this.dataType == 2) this.getOpLogByPage();
      else this.getOpLogByOpResultByPage();
    },

    textColor(state) {
      return {
        success: state == 0,
        fail: state == 1
      };
    },

    getUser(id) {
      var res = get("/api/userProfile/" + id, {});
      res.then(bdata => {
        this.user = bdata.data;
        console.log(this.user);
        this.user == null
          ? (this.detailVisible = false)
          : (this.detailVisible = true);
      });
    },

    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    getAccountType(id, account) {
      if (id == 0) {
        return "--";
      }
      if (account == 0) {
        return "管理员";
      } else if (account == 1) {
        return "担保人";
      } else if (account == 2) {
        return "普通用户";
      } else {
        return "审核员";
      }
    },
    getOpResult(state) {
      if (state == 0) {
        return "操作成功";
      }
      return "操作失败";
    },

    getOpLogByPage() {
      // 分页获取所有操作日志
      var res = get("/api/admin/getOpLogByPage", {
        pageNo: this.queryParam.pageNo,
        pageSize: this.queryParam.pageSize
      });
      res.then(data => {
        // console.log(data)
        var pageInfo = data.data;
        this.all_tableData = pageInfo.list;
        this.pagination.total = pageInfo.total;
      });
    },

    getOpLogByOpResultByPage() {
      // 根据操作结果获取操作日志
      var res = get("/api/admin/getOpLogByOpResultByPage", {
        opResult: this.dataType,
        pageNo: this.queryParam.pageNo,
        pageSize: this.queryParam.pageSize
      });
      res.then(data => {
        var pageInfo = data.data;
        this.all_tableData = pageInfo.list;
        this.pagination.total = pageInfo.total;
      });
    }
  },

  mounted() {
    this.getOpLogByPage();
  },

  computed: {},

  watch: {
    dataType: function(val) {
      // 修改类型后马上将页数修改到第一页
      this.queryParam.pageNo = 1;
      if (this.dataType == 2) this.getOpLogByPage();
      else this.getOpLogByOpResultByPage();
    }
  }
};
</script>

<style scoped>
.el-table {
  width: 100%;
}
.success {
  color: #67c23a;
}

.fail {
  color: #f56c6c;
}
</style>