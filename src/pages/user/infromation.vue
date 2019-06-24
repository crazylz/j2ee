<template>
<div>
  <!-- 面包屑 -->
  <el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;">
    <el-breadcrumb-item :to="{ path: '/' }">用户</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">资金流转记录</a></el-breadcrumb-item>
  </el-breadcrumb>


  <el-table
    ref="filterTable"
    :data="tableData"
    border>
    <el-table-column
      align="center"
      label="第三方账户号"
      sortable>
      <template slot-scope="scope">
      <span>{{ scope.row.account }}</span>
      </template>
    </el-table-column>

    <el-table-column
      align="center"
      label="描述"
      sortable>
      <template slot-scope="scope">
      <span>{{ scope.row.desc }}</span>
      </template>
    </el-table-column>

    <el-table-column
      align="center"
      label="金额"
      sortable>
      <template slot-scope="scope">
      <span>￥{{ scope.row.amount }}</span>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      label="时间"
      sortable>
      <template slot-scope="scope">
        <span>{{ scope.row.time | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      label="操作类型">
      <template slot-scope="scope">
        <span v-bind:class="textColor(scope.row.operationType)">{{object(scope.row.operationType)}}</span>
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
    data(){
      return{
        all_tableData: [],
        tableData:[],
      }
    },

// 必须加上this.tableData=[];才能够不被覆盖
    mounted(){
      var res = get("/api/message", {state:1})
      res.then(info=>{
        this.all_tableData = info.data;
        this.getOriginalData();
        console.log(info);
        }
      )
    },

    methods:{
      getDataByPage(pageindex){
        var begin = pageindex * 10;
        if(begin > this.tableData.length){
          this.tableData = this.tableData.slice(begin-10, this.tableData.length);
        }
        else{
          this.tableData = this.tableData.slice(begin-10, begin);
        }
      },
      
      getOriginalData(){
        if(this.all_tableData.length < 10){
          this.tableData = this.all_tableData.slice(0, this.all_tableData.length);
        }
        else{
          this.tableData = this.all_tableData.slice(0, 10);
        }
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },

      handleCurrentChange(val) {
        this.getDataByPage(val);
        console.log(this.all_tableData);
      },

      object(state){
        return state == 0 ? '转入' : '转出';
      },
      textColor(state){
        return{
          in : state == 0,
          out: state == 1,
        }
      },

      handleClick(row){
        this.$confirm('确定要对此产品还款吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
            var res=get("/api/account/repay",{recordId:row.id});
        res.then(data=>{
        if(data.code==0){
          this.$msgbox({
            title: '还款成功',
            message: data.msg,
            type: 'success'
          });

          var res = get("/api/borrower/repayRecordsToProcess", {})
          res.then(repay=>{
          this.all_tableData = repay.data;
          this.getOriginalData();
          console.log(repay);
          })
          
        }
        else{
          this.$msgbox({
            title: '还款失败',
            message: data.msg,
            type: 'error'
          });
        }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消还款'
          });
        });

        })
      }
    }
    
    
  }
</script>

<style scoped>
  .el_table{
  width:100%;
  }
  .in{
    color: #67C23A
  }
  .out{
    color: #F56C6C;
  }
</style>