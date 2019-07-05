<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb
      separator="/"
      style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;">
      <el-breadcrumb-item :to="{ path: '/guaranteehome' }">担保人</el-breadcrumb-item>
      <el-breadcrumb-item>处理逾期记录</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索栏 start -->
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" class="input-with-select" v-model="input_select">
        <el-select slot="prepend" placeholder="请选择" @change="change" v-model="selectValue">
          <el-option label="用户ID" value="1"></el-option>
          <el-option label="用户账号" value="2"></el-option>
        </el-select>
        <!-- 这里需要实现点击发送搜索请求 -->
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    <!-- 搜索栏 end -->

    <!-- 资料卡片 start -->
    <div class="card-div">
      <div style="font-weigth:bold; font-size: 20px; float: left; margin-left: 10px; margin-top: 20px">| 基本资料</div>

      <!-- 头像 -->
      <div style="margin-top: 80px; float: left;">
        <img src="../../assets/user.png" />
      </div>

      <el-form ref="base-form" class="base-form" label-position="right" label-width="200px">
        <el-form-item>
          <label style="float:left;margin-left:40px">用户名</label>
          <br/>
          <!-- 这里需要把“没有查询结果”替换为对应的用户名 -->
          <label
            style="font-size:30px; float:left; margin-top:5px; margin-left:40px; color:#2b3080">
            {{user.name}}
            </label>
        </el-form-item>

        <el-form-item label="性别：">
          <!-- 根据性别动态显示图标 -->
          <img v-if="user.gender==0" src="../../assets/hide.png" style="width: 30px; float:left; margin-top:5px" />
          <img v-else-if="user.gender==1" src="../../assets/boy.png" style="width: 30px; float:left; margin-top:5px" />
          <img v-else src="../../assets/girl.png" style="width: 30px; float:left; margin-top:5px" />
        </el-form-item>

        <el-form-item label="手机：" style="text-align:left">{{user.phoneNumber}}</el-form-item>

        <el-form-item label="工龄：" style="text-align:left" v-if="user.userId == null">{{user.lengthOfService}}</el-form-item> 
        <el-form-item label="工龄：" style="text-align:left" v-else>{{user.lengthOfService}}年</el-form-item>

        <el-form-item label="工资：" style="text-align:left" v-if="user.userId == null">{{user.salary}}</el-form-item>
        <el-form-item label="工资：" style="text-align:left" v-else>￥{{user.salary}}</el-form-item>

        <el-form-item label="第三方账户号码：" style="text-align:left">{{user.paymentAccount}}</el-form-item>
        <el-form-item label="身份证号码：" style="text-align:left">{{user.idCardNumber}}</el-form-item>
        <!-- 中间加条横线 -->
        <div
          style="background:#afaaaa; height:1px; margin-left: 100px; margin-right: 50px; margin-bottom:25px"/>
        <el-form-item label="失信次数：" style="text-align:left">{{user.discreditedRecords}}</el-form-item>
        <el-form-item label="信用评级：" style="text-align:left">{{user.rank}}</el-form-item>
        <el-form-item label="银行卡号：">
          <div style="float:left">
          <label style="margin-right:50px">{{user.bankAccount}}</label>
          <el-button type="danger" round @click="freeze(user.userId)">冻结</el-button>
          <el-button type="success" round @click="thaw(user.userId)">解冻</el-button>
          </div>
        </el-form-item>

      </el-form>
    </div>
    <!-- 资料卡片 end -->

    <!-- 还款记录 start -->
    <div class="card-div" style="margin-top: 10px">
      <div
        style="font-weigth:bold; font-size: 20px; float: left; margin-left: 10px; margin-top: 20px; margin-bottom:20px"
      >| 还款记录</div>

      <el-table :data="all_tableData.slice(pageIndex*10-10, pageIndex*10)" border default-expand-all>
        <el-table-column align="center" label="单号" sortable prop="id">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="还款额" sortable prop="amount">
          <template slot-scope="scope">
            <span>￥{{ scope.row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="还款截至时间" sortable prop="timeToRepay">
          <template slot-scope="scope">
            <span>{{ scope.row.timeToRepay | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <span v-bind:class="textColor(scope.row.state)">{{object(scope.row.state)}}</span>
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
    <!-- 还款记录 end -->
  </div>
</template>

<script>
import {post, get} from '../../request/http.js'

export default {
  data() {
    return {
      input_select: "",
      pageIndex:1,
      all_tableData: [],

      user:{
      name:'暂无数据',
      gender:0,
      salary: '暂无数据',
      phoneNumber: '暂无数据',
      paymentAccount: '暂无数据',
      bankAccount: '暂无数据',
      lengthOfService:'暂无数据',
      idCardNumber:'暂无数据',
      discreditedRecords:'暂无数据',
      rank:'暂无数据',
      userId:null
      },

      selectValue:null
    };
  },
  // 获取选择的搜索栏搜索方式
  methods: {
    change(value) {
      // console.log(value);
    },

    search(){
      if(this.selectValue == null){
        this.$msgbox({
            title: '提示',
            message: '请选择搜索类型！',
            type: 'error'
          });
      }
      else if(this.selectValue == 1){
        var res = get("/api/guarantor/" + this.input_select + "/userProfile", {});
        res.then(user=>{
          if(user.code == 0){
            console.log(user.data);
            this.user.name = user.data.name;
            this.user.gender = user.data.gender;
            this.user.salary = user.data.salary;
            this.user.phoneNumber = user.data.phoneNumber;
            this.user.paymentAccount = user.data.paymentAccount;
            this.user.bankAccount = user.data.bankAccount;
            this.user.lengthOfService = user.data.lengthOfService;
            this.user.idCardNumber = user.data.idCardNumber;
            this.user.discreditedRecords = user.data.discreditedRecords;
            this.user.rank = user.data.rank;
            this.user.userId = user.data.userId;

            var res1 = get("/api/guarantor/" + this.user.userId + "/repayRecordsToProcess");
            res1.then(result=>{
              if(result.code == 0){
                this.all_tableData = result.data;
              }
              else{
                this.$msgbox({
                title: '提示',
                message: result.msg,
                type: 'error'
              });
              }
            })
          }
          else{
            this.$msgbox({
            title: '提示',
            message: user.msg,
            type: 'error'
          });
          }

        })
      }
      else{
        var str_res = get("/api/guarantor/userProfile", {account: this.input_select});
        str_res.then(user=>{
          if(user.code == 0){
            console.log(user.data);
            this.user.name = user.data.name;
            this.user.gender = user.data.gender;
            this.user.salary = user.data.salary;
            this.user.phoneNumber = user.data.phoneNumber;
            this.user.paymentAccount = user.data.paymentAccount;
            this.user.bankAccount = user.data.bankAccount;
            this.user.lengthOfService = user.data.lengthOfService;
            this.user.idCardNumber = user.data.idCardNumber;
            this.user.discreditedRecords = user.data.discreditedRecords;
            this.user.rank = user.data.rank;
            this.user.userId = user.data.userId;

            var res1 = get("/api/guarantor/" + this.user.userId + "/repayRecordsToProcess");
            res1.then(result=>{
              if(result.code == 0){
                this.all_tableData = result.data;
              }
              else{
                this.$msgbox({
                title: '提示',
                message: result.msg,
                type: 'error'
              });
              }
            })
          }
          else{
            this.$msgbox({
            title: '提示',
            message: user.msg,
            type: 'error'
          });
          }
        })
      }


       
    },


    getRepayData(){
        var res = get("/api/borrower/repayRecordsToProcess", {})
      res.then(repay=>{
        this.tableData = repay.data;
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

      freeze(id){
        var res = post("/api/guarantor/freeze", {userId:id});
        res.then(result=>{
          console.log(result);
          if(result.code == 0){
            this.$msgbox({
                title: '提示',
                message: result.msg,
                type: 'success'
            });
          }
          else{
            this.$msgbox({
                title: '提示',
                message: result.msg,
                type: 'error'
            });
          }
        })
      },

      thaw(id){
        var res = post("/api/guarantor/unfreeze", {userId:id});
        res.then(result=>{
          if(result.code == 0){
            this.$msgbox({
                title: '提示',
                message: result.msg,
                type: 'success'
            });
          }
          else{
            this.$msgbox({
                title: '提示',
                message: result.msg,
                type: 'error'
            });
          }
          console.log(result);
        })
      }
  }
};
</script>



<style scoped>
.el-select {
  width: 100px;
}
.input-with-select {
  width: 50%;
  float: left;
}
.card-div {
  margin-top: 80px;
  background-color: #ffffff;
  padding: 5px；;
  padding-bottom: 10px;
}
.base-form {
  /* float: left; */
  padding-top: 120px;
}

.help{
    color: #F56C6C;
  }
  .unpay{
    color: #E6A23C;
  }
</style>