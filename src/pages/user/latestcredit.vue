<template>
<div>
  <!-- 面包屑 -->
  <el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;">
    <el-breadcrumb-item :to="{ path: '/userhome' }">用户</el-breadcrumb-item>
    <el-breadcrumb-item>个人征信</el-breadcrumb-item>
     <el-breadcrumb-item :to="{ path: '/userhome/latestcredit' }">审核结果</el-breadcrumb-item>
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
      <span>{{ rankState(scope.row.evaluationRank) }}</span>
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

      rankState(rank){
        if(rank != null){
          if(rank == 0) return '';
          else return rank;
        }
      },

      result(state){
        if(state != null){
          if(state == 0) return '未审核';
          else if(state == 1) return '属实';
          else return '不属实';
        }
      },

      getFile(path){
        var res = get("/api/audit/downloadFile", {filePath: path});
        res.then(file=>{

          if(file.code != 1){
            const content = file
            const blob = new Blob([content])
            const fileName = path;
            if ('download' in document.createElement('a')) { // 非IE下载
            const elink = document.createElement('a')
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          } else { // IE10+下载
            navigator.msSaveBlob(blob, fileName)
          }

            this.$msgbox({
            title: '提示',
            message: '开始下载',
            type: 'success'
          });
          }
          else{
            this.$msgbox({
            title: '提示',
            message: '下载失败',
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