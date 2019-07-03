<template>
<div>
  <!-- 面包屑 -->
  <el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;">
    <el-breadcrumb-item :to="{ path: '/userhome' }">用户</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/userhome/repay' }">还款</el-breadcrumb-item>
  </el-breadcrumb>


  <el-table
    :data="all_tableData.slice(pageIndex*10-10, pageIndex*10)"
    border
    default-expand-all
    >
    <el-table-column
      align="center"
      label="单号"
      sortable
      prop="id">
      <template slot-scope="scope">
      <span>{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <!-- <el-table-column
      align="center"
      prop="loans_date"
      label="借款日期"
      sortable>
    </el-table-column> -->
    <el-table-column
      align="center"
      label="还款额"
      sortable
      prop="amount">
      <template slot-scope="scope">
      <span>￥{{ scope.row.amount }}</span>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      label="还款截至时间"
      sortable
      prop="timeToRepay">
      <template slot-scope="scope">
        <span>{{ scope.row.timeToRepay | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      label="状态">
      <template slot-scope="scope">
        <span v-bind:class="textColor(scope.row.state)">{{object(scope.row.state)}}</span>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">还款</el-button>
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
        pageIndex:1,
      }
    },

// 必须加上this.tableData=[];才能够不被覆盖
    mounted(){
      this.getRepayData();
    },

    methods:{
      getRepayData(){
        var res = get("/api/borrower/repayRecordsToProcess", {})
      res.then(repay=>{
        this.all_tableData = repay.data;
        console.log(repay);
        }
      )
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },

      handleCurrentChange(val) {
        this.pageIndex=val;
      },

      object(state){
        if(state==1){
          return "未还款";
        }
        else if(state==2){
          return "平台垫付";
        }
      },
      textColor(state){
        return{
          unpay : state == 1,
          help: state == 2,
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

          this.getRepayData();
          
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
      },

    }
    
    
  }
</script>

<style scoped>
  .el_table{
  width:100%;
  }
  .help{
    color: #F56C6C;
  }
  .unpay{
    color: #E6A23C;
  }
</style>