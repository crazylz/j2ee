<template>
<div>
  <!-- 面包屑 -->
  <el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;">
    <el-breadcrumb-item :to="{ path: '/userhome' }">用户</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/userhome/record' }">资金流转记录</el-breadcrumb-item>
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
      sortable
      prop="amount">
      <template slot-scope="scope">
      <span>￥{{ scope.row.amount }}</span>
      </template>
    </el-table-column>

    <el-table-column
      align="center"
      label="时间"
      sortable
      prop="time">
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

  
    mounted(){
      this.getRecordData();
    },

    methods:{
      getRecordData(){
        var res = get("/api/account/get_fund_records", {})
        res.then(record=>{
        this.all_tableData = record.data;
        this.getOriginalData();
        console.log(record);
        }
      )

      },
      getDataByPage(pageindex){
        var begin = pageindex * 10;
        if(begin > this.all_tableData.length){
          this.tableData = this.all_tableData.slice(begin-10, this.all_tableData.length);
        }
        else{
          this.tableData = this.all_tableData.slice(begin-10, begin);
        }
        // console.log(begin);
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
            title: '提示',
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
            title: '提示',
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