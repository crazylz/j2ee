<template>
  <div>
    <!-- 需要将元素设置当一个容器里面 -->
    <el-container class="container">
      <!-- 顶栏 -->
      <el-header >
        <span  class="system-name">{{systemName}}</span>
        <span class="guarantee" >你好：{{userName}}担保人</span>
      </el-header>
        
      <el-main>
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
            prop="name"
            label="申请人姓名"
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
            label="还款截止日期"
            sortable>
          </el-table-column>
          <el-table-column
            align="center"
            prop="interest"
            label="利息"
            sortable>
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">同意</el-button>
              <el-button @click="handleClick(scope.row)" type="text" size="small">否决</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
   </el-container>
 
    </div>
</template>



<script>
  export default {
    data(){
      return{
        systemName: '担保人界面',
        userName: 'zyx',
        tableData:[{
          id:1,
          name:'zz',
          loans_date:'2016-05-09',
          money:1000,
          last_date:'2016-08-09',
          interest:'0.1'
        },
        {
          id:2,
          name:'zx',
          loans_date:'2016-07-09',
          money:500,
          last_date:'2016-10-09',
          interest:'0.1'
        },
        ]
      }
    }
    
  }
</script>

<style scoped="scoped">
/* 设置min-height调节最小高度来实现样式统一 */
.el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 30px;
    min-height: 90vh;
  }

  .system-name{
    float:left;
    margin-left:35px;
    font-size:20px;
  }
  
  .el_table{
  width:100%;
  }

  .guarantee{
    float:right;
    margin-right:100px;
    font-size:20px;
  }
  
</style>