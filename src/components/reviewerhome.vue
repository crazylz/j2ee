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
              审核员
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
        default-expand-all>
          
          <el-table-column
            align="center"
            prop="userId"
            label="申请人id"
            sortable>
            <template slot-scope="scope">
            <el-popover trigger="click" placement="bottom">
              <p>姓名: {{ borrower.name}}</p>
              <p>性别: {{ getGender(borrower.gender) }}</p>
              <p>电话: {{ borrower.phoneNumber }}</p>
              <p>工龄: {{ borrower.lengthOfService }}</p>
              <p>工资: ￥{{ borrower.salary }}</p>
              <p>失信记录次数: {{ borrower.discreditedRecords }}</p>
              <p>信用评级: {{ borrower.rank }}</p>
            <div slot="reference" class="name-wrapper">
              <el-button
              size="mini" @click="getBorrower(scope.row.userId)">
              {{scope.row.userId}}
              </el-button>
            </div>
          </el-popover>
          </template>
          </el-table-column>

          <el-table-column
            align="center"
            prop="commitTime"
            label="提交时间"
            sortable>
            <template slot-scope="scope">
              <span>{{ scope.row.commitTime | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
            </template>
          </el-table-column>

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

          <!-- <el-table-column
            align="center"
            label="审核结果">
            <template slot-scope="scope">
              <span>{{result(scope.row.state)}}</span>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            label="审核评级">
            <template slot-scope="scope">
            <span>{{ scope.row.evaluationRank }}</span>
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
            label="审核时间">
            <template slot-scope="scope">
            <span>{{ scope.row.processTime | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
            </template>
          </el-table-column> -->


          <el-table-column
            align="center"
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="agree(scope.row)" type="text" size="small">同意</el-button>
              <el-button @click="reject(scope.row)" type="text" size="small">否决</el-button>
            </template>
          </el-table-column>

        </el-table>
      </el-main>
   </el-container>
 
    </div>
</template>



<script>
import {post, get} from '../request/http.js'

  export default {
    data(){
      return{
        systemName: '审核员界面',
        requestData:[],
        borrower: [],

      }
    },
    methods:{
      agree(row){
        var res = post("/api/guarantor/handleRequest", {id:row.id, action:1});
        res.then(data=>{
          console.log(data);
          if(data.code == 0){
          this.$msgbox({
            title: '已同意该请求',
            message: data.msg,
            type: 'success'
          });
        var req = get("/api/guarantor/requestsToHandle", {});
        req.then(rdata=>{
          this.requestData = rdata.data;
          console.log(rdata);
        })
        }
        else{
          this.$msgbox({
            title: '操作失败',
            message: data.msg,
            type: 'error'
          });
        }
        })

      },
      reject(row){
        var res = post("/api/guarantor/handleRequest", {id:row.id, action:0});
        res.then(data=>{
          console.log(data);
          if(data.code == 0){
          this.$msgbox({
            title: '已拒绝该请求',
            message: data.msg,
            type: 'success'
          });
        var req = get("/api/guarantor/requestsToHandle", {});
        req.then(rdata=>{
          this.requestData = rdata.data;
          console.log(rdata);
        })
        }
        else{
          this.$msgbox({
            title: '操作失败',
            message: data.msg,
            type: 'error'
          });
        }
        })
      },
      getBorrower(id){
        var res = get("/api/userProfile/" + id, {});
        res.then(bdata=>{
          this.borrower = bdata.data;
          console.log(this.borrower);
        })
      },

      getGender(state){
        if(state == 0){
          return '未设置';
        }
        else{
          return state == 1 ? '男' : '女';
        }
      },
      spouseState(state){
        return state == 0 ? '目前无配偶或配偶无工作' : '配偶有工作';
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
      },
      result(state){
        if(state != null){
          return state == 1 ? '属实' : '不属实';
        }
      },

    },
    mounted(){
      var req = get("/api/audit/allToProcess", {});
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