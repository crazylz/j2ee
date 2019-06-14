<template>
  <div>
    <!-- 需要将元素设置当一个容器里面 -->
    <el-container class="container">
      <!-- 顶栏 -->
     <el-header >
        <span  class="system-name">{{systemName}}</span>
        <!-- <span class="bell" @click="bell()"><big><i class="el-icon-message-solid"></i></big></span> -->
        <div class="guarantee">
          <el-dropdown>
            <span>
              <big><i class="el-icon-user-solid"></i></big>
            </span>
            <el-dropdown-menu slot="dropdown">
              <a href="#/login">
              <el-dropdown-item icon="el-icon-unlock">登出</el-dropdown-item>
              </a>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{guarantee}}担保员</span>
        </div>
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
        systemName: '担保员界面',
        guarantee: 'zyx',
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
    margin-left:70px;
    font-size:20px;
  }
  
  .el_table{
  width:100%;
  }

   /* .bell{
    float:right;
    margin-right:70px;
  } */
   
   
   .guarantee{
     font-size:18px;
    float:right;
    margin-right:100px;
  }
  
</style>