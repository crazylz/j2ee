<template>
  <div>
    <el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;">
      <el-breadcrumb-item :to="{ path: '/adminhome' }">管理员</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminhome/users' }">管理用户</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table
      ref="filterTable"
      :data="all_tableData.slice(pageIndex*10-10, pageIndex*10)"
      border>
      <el-table-column
        label="用户id"
        align="center"
        sortable
        prop="userId">
        <template slot-scope="scope">
          <span>{{scope.row.userId}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="身份证"
        align="center">
        <template slot-scope="scope">
          <span>{{scope.row.idCardNumber}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="手机号码"
        align="center">
        <template slot-scope="scope">
          <span>{{scope.row.phoneNumber}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="性别"
        align="center"
        sortable
        prop="gender">
        <template slot-scope="scope">
          <span>{{getGender(scope.row.gender)}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="第三方支付帐号"
        align="center">
        <template slot-scope="scope">
          <span>{{scope.row.paymentAccount}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="银行卡帐号"
        align="center">
        <template slot-scope="scope">
          <span>{{scope.row.bankAccount}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="失信次数"
        align="center"
        sortable
        prop="discreditedRecords">
        <template slot-scope="scope">
          <span>{{scope.row.discreditedRecords}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="工资"
        align="center"
        sortable
        prop="salary">
        <template slot-scope="scope">
          <span>{{scope.row.salary}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="信用评级"
        align="center"
        sortable
        prop="rank">
        <template slot-scope="scope">
          <span>{{scope.row.rank}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="姓名"
        align="center">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="工龄"
        align="center"
        sortable
        prop="lengthOfService">
        <template slot-scope="scope">
          <span>{{scope.row.lengthOfService}}</span>
        </template>
      </el-table-column>


      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleEdit(scope.row)">删除用户</el-button>
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
      handleEdit(row) {
        var res = post("/api/admin/deleteAccount", {account:'user001'});
        res.then(result=>{
          if(result.code == 0){
            this.$msgbox({
            title: '提示',
            message: result.msg,
            type: 'success'
            });
            var res1 = get("/api/admin/users", {});
            res1.then(user=>{
              this.all_tableData = user.data;
            }
      )
          }
          else{
            this.$msgbox({
            title: '提示',
            message: result.msg,
            type: 'error'
            });
          }

        })
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
      getGender(state){
        if(state == 0){
          return '未设置';
        }
        else{
          return state == 1 ? '男' : '女';
        }
      },
    },

    mounted(){
      var res = get("/api/admin/users", {});
      res.then(user=>{
        this.all_tableData = user.data;
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