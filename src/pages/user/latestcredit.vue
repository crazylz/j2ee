<template>
<div>
  <!-- 面包屑 -->
  <el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;">
    <el-breadcrumb-item :to="{ path: '/' }">用户</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">最新提交的征信资料</a></el-breadcrumb-item>
  </el-breadcrumb>

 
  <el-table
    :data="tableData"
    border>

    <el-table-column
      align="center"
      label="负债金额">
      <template slot-scope="scope">
      <span>￥{{ scope.row.unpaidLoan }}</span>
      </template>
    </el-table-column>

    <el-table-column
      align="center"
      label="名下房产价值">
      <template slot-scope="scope">
      <span>￥{{ scope.row.propertyValue }}</span>
      </template>
    </el-table-column>

    <el-table-column
      align="center"
      label="配偶工作情况">
      <template slot-scope="scope">
      <span>{{ spouseState(scope.row.isSpouseWork) }}</span>
      </template>
    </el-table-column>

    <el-table-column
      align="center"
      label="附件材料">
      <template slot-scope="scope">
      <el-button
      size="mini"
      type=text
      @click="getFile(scope.row.filePath)">
        {{scope.row.filePath}}
      </el-button>
      </template>
    </el-table-column>

    <el-table-column
      align="center"
      label="提交时间">
      <template slot-scope="scope">
        <span>{{ scope.row.commitTime | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
      </template>
    </el-table-column>

    <el-table-column
      align="center"
      label="审核结果">
      <template slot-scope="scope">
        <span>{{result(scope.row.state)}}</span>
      </template>
    </el-table-column>

    <el-table-column
      align="center"
      label="审核评价">
      <template slot-scope="scope">
      <span>{{ scope.row.evaluationDesc }}</span>
      </template>
    </el-table-column>

    <el-table-column
      align="center"
      label="审核评级">
      <template slot-scope="scope">
      <span>{{ scope.row.evaluationRank }}</span>
      </template>
    </el-table-column>

  </el-table>


</div>
</template>


<script>
import {post, get} from '../../request/http.js'

  export default {
    data(){
      return{
        tableData: []
      }
    },

  
    methods:{
      spouseState(state){
        return state == 0 ? '目前无配偶或配偶无工作' : '配偶有工作';
      },

      result(state){
        if(state != null){
          return state == 1 ? '属实' : '不属实';
        }
      },

      getFile(path){
        var res = get("/api/audit/downloadFile", {filePath: path});
        res.then(file=>{
          console.log(file);
          console.log(path);
          if(file.code == 0){
            this.$msgbox({
            title: '提示',
            message: file.msg,
            type: 'success'
          });
          }
          else{
            this.$msgbox({
            title: '提示',
            message: file.msg,
            type: 'error'
          });
          }
        })
      }
    },

    mounted(){
      var res = get("/api/audit/auditedInformation", {});
      res.then(cinfo=>{
        this.tableData.push(cinfo.data);
        console.log(this.tableData);
      })
    }
    
    
  }
</script>

<style scoped>

</style>