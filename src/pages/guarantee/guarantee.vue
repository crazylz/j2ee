<template>
  <div>

<!-- 面包屑 -->
  <el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;">
    <el-breadcrumb-item :to="{ path: '/guaranteehome' }">担保人</el-breadcrumb-item>
    <el-breadcrumb-item>担保请求</el-breadcrumb-item>
  </el-breadcrumb>

    <!-- 需要将元素设置当一个容器里面 -->
    <el-container class="container">
        
    <el-dialog class="detail"  :visible.sync='detailVisible'>
        <div class="card-div">
      <div
        style="font-weigth:bold; font-size: 20px; float: left; margin-left: 10px; margin-top: 20px">| 基本资料</div>

      <!-- 头像 -->
      <div style="margin-top: 80px; float: left;">
        <img src="../../assets/user.png" />
      </div>

      <el-form ref="base-form" class="base-form" label-position="right" label-width="200px">
        <el-form-item>
          <label style="float:left;margin-left:40px">用户名</label>
          <br/>
          <!-- 这里需要把“没有查询结果”替换为对应的用户名 -->
          <label style="font-size:30px; float:left; margin-top:5px; margin-left:40px; color:#2b3080">
            {{borrower.name}}
          </label>
        </el-form-item>

        <el-form-item label="性别：" label-width="200px">
          <!-- 根据性别动态显示图标 -->
          <img v-if="borrower.gender==0" src="../../assets/hide.png" style="width: 30px; float:left; margin-top:5px" />
          <img v-else-if="borrower.gender==1" src="../../assets/boy.png" style="width: 30px; float:left; margin-top:5px" />
          <img v-else src="../../assets/girl.png" style="width: 30px; float:left; margin-top:5px" />
        </el-form-item>

        <el-form-item label="手机：" style="text-align:left">{{borrower.phoneNumber}}</el-form-item>
        <el-form-item label="工龄：" style="text-align:left">{{borrower.lengthOfService}}年</el-form-item> 
        <el-form-item label="工资：" style="text-align:left">￥{{borrower.salary}}</el-form-item>
        <!-- 中间加条横线 -->
        <div
          style="background:#afaaaa; height:1px; margin-left: 100px; margin-right: 50px; margin-bottom:25px"/>
        <el-form-item label="失信次数：" style="text-align:left">{{borrower.discreditedRecords}}</el-form-item>
        <el-form-item label="信用评级：" style="text-align:left">{{borrower.rank}}</el-form-item>
        </el-form>
        </div>
      </el-dialog>


      <el-main>
        <el-table
        :data="requestData.slice(pageIndex*10-10, pageIndex*10)"
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
            label="申请人id"
            sortable>
            <template slot-scope="scope">
            <!-- <el-popover trigger="click" placement="bottom">
              <p>姓名: {{ borrower.name}}</p>
              <p>性别: {{ getGender(borrower.gender) }}</p>
              <p>电话: {{ borrower.phoneNumber }}</p>
              <p>工龄: {{ borrower.lengthOfService }}</p>
              <p>工资: ￥{{ borrower.salary }}</p>
              <p>失信记录次数: {{ borrower.discreditedRecords }}</p>
              <p>信用评级: {{ borrower.rank }}</p>
            <div slot="reference" class="name-wrapper"> -->
              <el-button
              size="mini" @click="getBorrower(scope.row.userId);detailVisible=true">
              {{scope.row.userId}}
              </el-button>
            <!-- </div>
          </el-popover> -->
          </template>
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
              <span>{{scope.row.payDayOfMonth}}号</span>
            </template>
          </el-table-column>

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

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="100*(requestData.length/10)">
        </el-pagination>

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
        requestData:[],
        borrower: [],
        detailVisible:false,
        pageIndex:1
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

       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },

      handleCurrentChange(val) {
        this.pageIndex = val;
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
        this.getGuaranteeData();
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
      getGuaranteeData(){
        var req = get("/api/guarantor/requestsToHandle", {});
        req.then(rdata=>{
        this.requestData = rdata.data;
        console.log(rdata);
      })
      }
    },
    mounted(){
      this.getGuaranteeData();
    }
    
  }
</script>

<style scoped>
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
  .card-div {
  background-color: #ffffff;
  padding: 5px；;
  padding-bottom: 10px;
}
.base-form {
  /* float: left; */
  padding-top: 120px;
}
  
</style>