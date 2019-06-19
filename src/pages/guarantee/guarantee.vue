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
              {{guaranteeName}}
            </span>
            <el-dropdown-menu slot="dropdown">
              <a href="#/login">
              <el-dropdown-item icon="el-icon-unlock">登出</el-dropdown-item>
              </a>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
        
      <el-main>
        <el-table
        :data="requestData"
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
            prop="userId"
            label="申请人姓名"
            sortable>
          </el-table-column>

          <el-table-column
            align="center"
            prop="commitTime"
            label="借款申请日期"
            sortable>
            <template slot-scope="scope">
              <span>{{ scope.row.commitTime | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            prop="amount"
            label="借款额"
            sortable>
            <template slot-scope="scope">
              <span>￥{{ scope.row.amount }}</span>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            prop="rate"
            label="利率"
            sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.rate }}%</span>
          </template>
          </el-table-column>

          <el-table-column
            align="center"
            prop="installmentNumber"
            label="分期"
            sortable>
            <template slot-scope="scope">
              <span>{{ scope.row.installmentNumber }}</span>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            prop="payDayOfMonth"
            label="每月还款日期"
            sortable>
            <template slot-scope="scope">
              <span>{{ scope.row.payDayOfMonth }}号</span>
            </template>
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
import {post, get} from '../../request/http.js'

  export default {
    data(){
      return{
        systemName: '担保员界面',
        guaranteeName: null,
        requestData:[]
      }
    },
    methods:{

    },
    mounted(){
      var gres = get("/api/userProfile", {});
      gres.then(gdata=>{
      this.guaranteeName = gdata.data.name;
      console.log(gdata);
    })

      var req = get("/api/guarantor/requestsToHandle", {});
      req.then(rdata=>{
        this.requestData = rdata.data;
        console.log(rdata);
      })
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