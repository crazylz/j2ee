<template>
<div>
  <!-- 面包屑 -->
  <el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:20px;">
    <el-breadcrumb-item :to="{ path: '/' }">用户</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">还款</a></el-breadcrumb-item>
  </el-breadcrumb>


  <el-table
    :data="tableData"
    style="width: 100%;margin-bottom: 20px"
    border
    default-expand-all
    >
    <el-table-column
      prop="loans_date"
      label="借款日期"
      sortable
      width="220">
    </el-table-column>
    <el-table-column
      prop="money"
      label="借款额"
      sortable
      width="220">
    </el-table-column>
    <el-table-column
      prop="last_date"
      label="还款截至时间"
      sortable
      width="220">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
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
          loans_date:'2016-05-09',
          money:1000,
          last_date:'2016-08-09',
        },{
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
</style>