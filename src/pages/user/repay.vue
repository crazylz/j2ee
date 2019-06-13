<template>
<div>
  <!-- 面包屑 -->
  <el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;">
    <el-breadcrumb-item :to="{ path: '/' }">用户</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">还款</a></el-breadcrumb-item>
  </el-breadcrumb>


  <el-table
    :data="tableData"
    border
    default-expand-all
    >
    <el-table-column
      align="center"
      prop="id"
      label="单号"
      sortable>
    </el-table-column>
    <el-table-column
      align="center"
      prop="loans_date"
      label="借款日期"
      sortable>
    </el-table-column>
    <el-table-column
      align="center"
      prop="money"
      label="借款额"
      sortable>
    </el-table-column>
    <el-table-column
      align="center"
      prop="last_date"
      label="还款截至时间"
      sortable>
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
  :page-size="20"
  :pager-count="11"
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
</div>
</template>
<script>
  export default {
    data(){
      return{
        tableData:[{
          id:1,
          loans_date:'2016-05-09',
          money:1000,
          last_date:'2016-08-09',
        },{
          id:2,
          loans_date:'2016-07-09',
          money:500,
          last_date:'2016-10-09',
        },
        ]
      }
    }
    
  }
</script>

<style scoped>
  .el_table{
  width:100%;
  }
</style>