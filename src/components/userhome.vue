<template>
  <div>
    <!-- 需要将元素设置当一个容器里面 -->
    <el-container class="container">
      <!-- 顶栏 -->
      <el-header >
        <span  class="system-name">{{systemName}}</span>
        <span class="bell" @click="bell()"><big><i class="el-icon-message-solid"></i></big></span>
        <div class="users">
          <el-dropdown>
            <span style="color: white">
              <big><i class="el-icon-user-solid"></i></big>
              {{userName}}
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- <div @click='detailVisible=true'>
                <el-dropdown-item icon="el-icon-user">个人资料</el-dropdown-item>
              </div> -->
              <div @click='investVisible=true;getBalance()'>
              <el-dropdown-item icon="el-icon-wallet">充值</el-dropdown-item>
              </div>
              <div @click='withdrawVisible=true;getBalance()'>
              <el-dropdown-item icon="el-icon-wallet">提现</el-dropdown-item>
              </div>
              <a href="#/login">
              <el-dropdown-item icon="el-icon-unlock">登出</el-dropdown-item>
              </a>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
        
      <!-- 个人资料对话框 -->
      <!-- 需要在script的data里面定义所有的变量 -->
       <!--style属性多个属性之间用分号间隔  -->
      <!-- <el-dialog class="detail"  :visible.sync='detailVisible'
      @open="getUser">
        <h2 style=" text-align: center;color: #606266; font-size:30px">个人资料</h2>
        <el-form style="margin-right:120px"  ref='userForm' :model='user' label-width='200px' :rules='detailrules'>

            <el-form-item label='姓名' prop='name' class="input">
              <el-input v-model='user.name' placeholder='请输入姓名' clearable></el-input>
            </el-form-item>

            <el-form-item label="性别" class="input" prop='gender'>
            <el-select v-model="user.gender" placeholder="请选择性别" label="性别" style="width:100%"> 
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>


            <el-form-item label='电话' prop='phoneNumber' class="input">
              <el-input v-model='user.phoneNumber' clearable disabled="true"></el-input>
            </el-form-item>

            <el-form-item label='工龄(年)' prop='lengthOfService' class="input">
              <el-input v-model='user.lengthOfService' clearable></el-input>
            </el-form-item>

            <el-form-item label='工资(￥)' prop='salary' class="input">
              <el-input v-model='user.salary' clearable></el-input>
            </el-form-item>
            <el-form-item label='第三方支付账号' prop='paymentAccount' class="input">
              <el-input v-model='user.paymentAccount ' clearable></el-input>
            </el-form-item>
            <el-form-item label='银行卡帐号' prop='bankAccount' class="input">
              <el-input v-model='user.bankAccount ' clearable></el-input>
            </el-form-item>
            <el-form-item label='身份证号' prop='idCardNumber' class="input">
              <el-input v-model='user.idCardNumber' clearable></el-input>
            </el-form-item>
            <el-form-item style="margin-left:-80px;margin-top:20px">
              <el-button type='primary' @click='handleDetail()'
              >保存</el-button>
            </el-form-item>               
        </el-form>   
      </el-dialog> -->

      <!--充值对话框  -->
      <el-dialog class="invest" :visible.sync='investVisible'>
        <h2 style="margin-top:-30px;text-align: center;color: #606266; font-size:30px">充值</h2>
        <p style="color: #606266; font-size:18px">第三方账户余额：￥{{money_remain}}</p>
        <el-form style="margin-right:120px" ref='investForm' :model='invest' label-width='200px' :rules='investrules'>
          <el-form-item style="margin-left:-44px" label='充值金额' prop='number' class="input">
            <el-input v-model='invest.number' placeholder='请输入充值金额' clearable></el-input>
          </el-form-item>
          <el-form-item style="margin-left:-80px;margin-top:10px">
            <el-button type='primary' @click='handleInvest()'
            >确认</el-button>
          </el-form-item>               
        </el-form>   
      </el-dialog>

      <el-dialog class="withdraw" :visible.sync='withdrawVisible'>
        <h2 style="margin-top:-30px;text-align: center;color: #606266; font-size:30px">提现</h2>
        <p style="color: #606266; font-size:18px">第三方账户余额 {{money_remain}}</p>
        <el-form style="margin-right:120px" ref='withdrawForm' :model='withdraw' label-width='200px' :rules='withdrawrules'>
          <el-form-item style="margin-left:-44px" label='提现金额' prop='money' class="input">
            <el-input v-model='withdraw.money' placeholder='请输入提现金额' clearable></el-input>
          </el-form-item>
          <el-form-item style="margin-left:-80px;margin-top:10px">
            <el-button type='primary' @click='handleWithdraw()'
            >确认</el-button>
          </el-form-item>               
        </el-form>   
      </el-dialog>  

        <!-- 需要将侧栏和主页面设置当一个容器里面 -->
    <el-container>
      <!-- 侧栏 -->
      <el-aside width="200px">
        <el-menu :default-active="$route.path" router unique-opened>

          <el-menu-item index="/userhome/personalinfo" style="text-align:left" class="item">
            <i class="el-icon-user"></i>个人资料
          </el-menu-item>

          <el-menu-item index="/userhome/loans" style="text-align:left" class="item">
            <i class="el-icon-discount"></i>借款
          </el-menu-item>

          <el-submenu index="1" style="text-align:left" class="product">
            <template slot="title" class="title">
              <i class="el-icon-shopping-cart-2"></i><span style="color: white">产品</span>
            </template>
            <el-menu-item-group class="group">
              <el-menu-item index="/userhome/newproducts"  class="item">购买产品</el-menu-item>
              <el-menu-item index="/userhome/producted"  class="item">已购产品</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          
          <el-menu-item index="/userhome/repay" style="text-align:left" class="item">
          <i class="el-icon-sold-out"></i>还款
          </el-menu-item>

          <el-menu-item index="/userhome/record" style="text-align:left" class="item">
          <i class="el-icon-notebook-2"></i>资金流转记录
          </el-menu-item>

          <el-menu-item index="/userhome/credit" style="text-align:left" class="item">
          <i class="el-icon-user"></i>个人征信
          </el-menu-item>


        </el-menu>
      </el-aside>
      
        <el-main>
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
    </div>
</template>



<script>
import {post, get} from '../request/http.js'
// template涉及的所有的变量都要写入data之中，数据传输的时候也是这些数据
export default {
  data(){
    return {
    // detailVisible:false,
    investVisible:false,
    withdrawVisible:false,
    money_remain:0,
    systemName: '用户界面',
    userName: 'null',
    user:{
      name:null,
      gender:null,
      salary: null,
      phoneNumber: null,
      paymentAccount: null,
      bankAccount: null,
      lengthOfService:null,
      idCardNumber:null
    },
    invest:{
      number:0
    },
    withdraw:{
      money:0
    },
    options: [{
          value: 0,
          label: '未设置'
        },{
          value: 1,
          label: '男'
        },{
          value: 2,
          label: '女'
        }],

    // detailrules:{
    //   name: [
    //   {required: true,message: '姓名不能为空',trigger: 'blur'}
    //   ],
    //   gender: [
    //   {required:true,message:'性别不能为空',	trigger: 'blur'},
    //   // {min:5,message:'密码长度必须大于5个字符字符',}
    //   ],
    //   phoneNumber: [
    //   {required: true,message: '电话不能为空',trigger: 'blur'}
    //   ],
    //   salary: [
    //   {required: true,message: '工资不能为空',trigger: 'blur'}
    //   ],
    //   paymentAccount: [
    //   {required: true,message: '第三方支付账号不能为空',trigger: 'blur'}
    //   ],
    //   bankAccount: [
    //   {required: true,message: '银行卡帐号不能为空',trigger: 'blur'}
    //   ],
    //   idCardNumber: [
    //   {required: true,message: '身份证号不能为空',trigger: 'blur'}
    //   ],
    //   lengthOfService: [
    //   {required: true,message: '工龄不能为空',trigger: 'blur'}
    //   ],
    // },
    investrules:{
       number: [
      {required: true,message: '充值额不能为空',trigger: 'blur'}
      ]
    },
    withdrawrules:{
       money: [
      {required: true,message: '提现金额不能为空',trigger: 'blur'}
      ]
    }
  }
  },
  mounted: function() {
    this.getBalance();
    this.getUser();
  },
  methods: {
    bell:function(){
        this.$router.push({path:'/userhome/message'});
    },

    getGender(state){
      if(state == 0){
        return '未设置';
      }
      else{
        return state == 1 ? '男' : '女';
      }
    },


    getUser(){
      var userres = get("/api/userProfile", {});
      userres.then(user=>{
      this.userName = user.data.name;
      this.user.name = user.data.name;
      this.user.gender = user.data.gender;
      this.user.salary = user.data.salary;
      this.user.phoneNumber = user.data.phoneNumber;
      this.user.paymentAccount = user.data.paymentAccount;
      this.user.bankAccount = user.data.bankAccount;
      this.user.lengthOfService = user.data.lengthOfService;
      this.user.idCardNumber = user.data.idCardNumber;
    })
    },


    handleDetail(){
      console.log(this.user)
      var res = post("/api/userProfile", {
        idCardNumber:this.user.idCardNumber,
        phoneNumber:this.user.phoneNumber,
        gender:this.user.gender,
        paymentAccount:this.user.paymentAccount,
        bankAccount:this.user.bankAccount,
        salary:this.user.salary,
        name:this.user.name,
        lengthOfService:this.user.lengthOfService
      });

      res.then(result=>{
        console.log(result);
        if(result.code == 0){
          this.$msgbox({
            title: '提示',
            message: result.msg,
            type: 'success'
          });
          this.detailVisible = false;
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

    getBalance(){
      var remainres = get("/api/userProfile/balance", {});
          remainres.then(remain=>{
          this.money_remain = remain.data.paymentBalance;
      })
    },

    handleInvest:function(){
      var res = post("/api/account/deposit", {amount: this.invest.number})
      res.then(data => {
        console.log(data);
        if(data.code == 0){
          this.getBalance();

          this.$msgbox({
            title: '提示',
            message: data.msg,
            type: 'success'
          });
          this.invest.number = 0;
        }
        else{
            this.$msgbox({
            title: '提示',
            message: data.msg,
            type: 'error'
          });
          this.invest.number = 0;
        }
      })

    },

    handleWithdraw:function(){
      var res = post("/api/account/withdraw", {amount: this.withdraw.money})
      res.then(data => {
        console.log(data);
        if(data.code == 0){
          this.getBalance();

          this.$msgbox({
            title: '提示',
            message: data.msg,
            type: 'success'
          });
          this.withdraw.number = 0;
        }
        else{
          this.$msgbox({
            title: '提示',
            message: data.msg,
            type: 'error'
          });
          this.invest.number = 0;
        }
      })
    }
  }
}
</script>

<style scoped="scoped">
/* 设置min-height调节最小高度来实现样式统一 */
.el-header{
    background-color: #1b2226;
    color: rgb(255, 255, 255);
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #272a2d;
    color: #333;
    text-align: center;
    line-height: 200px;
    min-height: 90vh;
  }
  .item {
    background-color: #272a2d;
    color: white;
  }
  .title {
    margin-top: 0%;
    margin-bottom: 0%;
    background-color: #272a2d;
    color: white;
  }
  .group {
    margin-top: 0%;
    margin-bottom: 0%;
    background-color: #272a2d;
    color: white;
  }
  .product {
    margin-top: 0%;
    margin-bottom: 0%;
    background-color: #272a2d;
    color: white;
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
  
   .bell{
    float:right;
    margin-right:70px;
  }
   
   
   .users{
    font-size:18px;
    float:right;
    margin-right:30px;
  }
  
  .detail{
  width:80% ;
  left:10%;
  height:100%;
  }

  .invest{
    width:60%;
    left:20%;
  }

  .withdraw{
    width:60%;
    left:20%;
  }
</style>