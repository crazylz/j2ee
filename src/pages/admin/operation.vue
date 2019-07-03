<template>
  <div>
    <el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;">
      <el-breadcrumb-item :to="{ path: '/adminhome' }">管理员</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminhome/operation' }">查看日志</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table
      ref="filterTable"
      :data="all_tableData.slice(pageIndex*10-10, pageIndex*10)"
      border>
      <el-table-column
        label="操作id"
        align="center"
        sortable
        prop="userId">
        <template slot-scope="scope">
          <span>{{scope.row.opId}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作时间"
        align="center">
        <template slot-scope="scope">
          <span>{{scope.row.opTime | dateformat('YYYY-MM-DD HH:mm:ss')}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作类型"
        align="center">
        <template slot-scope="scope">
          <span>{{scope.row.opType}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作人Id"
        align="center"
        prop="gender">
        <template slot-scope="scope">
          <span>{{scope.row.opCreatorId}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作人账号类型"
        align="center">
        <template slot-scope="scope">
          <span>{{getAccountType(scope.row.opCreatorId, scope.row.opCreatorType)}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作人IP"
        align="center">
        <template slot-scope="scope">
          <span>{{scope.row.opCreatorIp}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作结果"
        align="center"
        prop="discreditedRecords">
        <template slot-scope="scope">
          <span>{{getOpResult(scope.row.opResult)}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="结果描述"
        align="center"
        prop="salary">
        <template slot-scope="scope">
          <span>{{scope.row.opResultDesc}}</span>
        </template>
      </el-table-column>
    
   </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="100*(all_tableData.length/10)">
    </el-pagination>


  </div>
</template>



<script>
import {post, get} from '../../request/http.js'
  export default {
    data() {
      return {
        all_tableData: [],
        pageIndex:1,
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },

      handleCurrentChange(val) {
        this.pageIndex=val;
      },
      
    
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      getAccountType(id, account){
        if(id == 0) {
          return '--'
        }
        if(account == 0){
          return '管理员';
        }
        else if(account == 1) {
          return '担保人'
        }
        else if(account == 2) {
          return '普通用户'
        }
        else{
          return '审核员';
        }
      },
      getOpResult(state) {
        if(state == 0) {
          return '操作成功'
        }
        return '操作失败'
      },
    },

    mounted(){
      var res = get("/api/admin/opLog", {});
      res.then(logs=>{
        this.all_tableData = logs.data;
        console.log(this.tableData);
      }
      )
    }
  }
</script>

<style scoped>
.el-table{
  /* display:inline-block;
  text-align:center; */
  width: 100%;
  /* width:fit-content;
  margin:auto; */
}
.el-table.column{
  width:9.09%;
}
</style>