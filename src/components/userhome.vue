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
            <span>
              <big><i class="el-icon-user-solid"></i></big>
              {{userName}}
            </span>
            <el-dropdown-menu slot="dropdown">
              <div @click='detailVisible=true'>
                <el-dropdown-item icon="el-icon-user">个人资料</el-dropdown-item>
              </div>
              <div @click='investVisible=true'>
              <el-dropdown-item icon="el-icon-wallet">充值</el-dropdown-item>
              </div>
              <div @click='withdrawVisible=true'>
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
      <el-dialog class="detail"  :visible.sync='detailVisible'>
        <h2 style=" text-align: center;color: #606266; font-size:30px">个人资料</h2>
        <el-form style="  margin-right:120px"  ref='userForm' :model='user' label-width='200px' :rules='detailrules'>
            <el-form-item label='姓名' prop='name' class="input">
              <el-input v-model='user.name' placeholder='请输入姓名' clearable></el-input>
            </el-form-item>
            <el-form-item label='性别' prop='sex' class="input">
              <el-input v-model='user.sex' type='text' placeholder='请输入性别'  clearable></el-input>
            </el-form-item>
            <el-form-item label='电话' prop='phone' class="input">
              <el-input v-model='user.phone' clearable></el-input>
            </el-form-item>
            <el-form-item label='月薪' prop='pay' class="input">
              <el-input v-model='user.pay' clearable></el-input>
            </el-form-item>
            <el-form-item label='第三方支付账号' prop='paymentAccount ' class="input">
              <el-input v-model='user.paymentAccount ' clearable></el-input>
            </el-form-item>
            <el-form-item label='银行卡帐号' prop='bankAccount ' class="input">
              <el-input v-model='user.bankAccount ' clearable></el-input>
            </el-form-item>
            <el-form-item label='身份证号' prop='identity ' class="input">
              <el-input v-model='user.identity ' clearable></el-input>
            </el-form-item>
            <el-form-item style="margin-left:-80px;margin-top:20px">
              <el-button type='primary' @click='handleDetail()'
              >保存</el-button>
            </el-form-item>               
        </el-form>   
      </el-dialog>

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
        <h2 style="margin-top:-30px;text-align: center;color: #606266; font-size:30px">充值</h2>
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
        <el-menu :default-active="$route.path" router unique-opened >
          <!-- <el-menu-item index="/userhome/persondata">
          <i class="el-icon-user"></i>个人资料
          </el-menu-item> -->
          <el-menu-item index="/userhome/loans">
            <i class="el-icon-discount"></i>借款
          </el-menu-item>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-shopping-cart-2"></i>
              <span slot="title">购买产品</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/userhome/newproducts">购买产品</el-menu-item>
              <el-menu-item index="/userhome/producted">已购产品</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- <el-menu-item index="/userhome/newproducts">
            <i class="el-icon-shopping-cart-2"></i>购买产品
          </el-menu-item>            -->
          <!-- <el-menu-item index="/userhome/withdraw">
          <i class="el-icon-bank-card"></i>提现
          </el-menu-item>
          <el-menu-item index="/userhome/invest">
          <i class="el-icon-wallet"></i>充值
          </el-menu-item> -->
          <el-menu-item index="/userhome/repay">
          <i class="el-icon-sold-out"></i>还款
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
    detailVisible:false,
    investVisible:false,
    withdrawVisible:false,
    money_remain:0,
    systemName: '用户界面',
    userName: 'null',
    user:{
      name:null,
      sex:null,
      age: null,
      phone: null,
      identity:null,
      paymentAccount: null,
      bankAccount: null,
    },
    invest:{
      number:0
    },
    withdraw:{
      money:0
    },
    detailrules:{
      name: [
      {required: true,message: '姓名不能为空',trigger: 'blur'}
      ],
      sex: [
      {required:true,message:'性别不能为空',	trigger: 'blur'},
      // {min:5,message:'密码长度必须大于5个字符字符',}
      ],
      phone: [
      {required: true,message: '电话不能为空',trigger: 'blur'}
      ],
      pay: [
      {required: true,message: '月薪不能为空',trigger: 'blur'}
      ],
      paymentAccount: [
      {required: true,message: '第三方支付账号不能为空',trigger: 'blur'}
      ],
      bankAccount: [
      {required: true,message: '银行卡帐号不能为空',trigger: 'blur'}
      ],
      identity: [
      {required: true,message: '身份证号不能为空',trigger: 'blur'}
      ]
    },
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
    var res = get("/api/userProfile/balance", {});
    res.then(data=>{
      this.money_remain = data.data.paymentBalance;
      console.log(data);
    })

    var userres = get("/api/userProfile", {});
    userres.then(user=>{
      this.userName = user.data.name;
      this.user.name = user.data.name;
      if(user.data.gender == 0){
        this.user.sex = '未设置';
      }
      else{
        this.user.sex = user.data.gender == 1 ? '男' : '女';
      }
      this.user.pay = user.data.salary;
      this.user.phone = user.data.phoneNumber;
      this.user.paymentAccount = user.data.paymentAccount;
      this.user.bankAccount = user.data.bankAccount;
      console.log(user.data);
    })

  },
  methods: {
    bell:function(){
        this.$router.push({path:'/userhome/information'});
    },

    handleDetail:function(){

    },

    handleInvest:function(){
      var res = post("/api/account/deposit", {amount: this.invest.number})
      res.then(data => {
        console.log(data);
        if(data.code == 0){
          var remainres = get("/api/userProfile/balance", {});
          remainres.then(remain=>{
          this.money_remain = remain.data.paymentBalance;
          })
        }
        else{
          alert(data.msg);
        }
      })

    },

    handleWithdraw:function(){
      var res = post("/api/account/withdraw", {amount: this.withdraw.money})
      res.then(data => {
        console.log(data);
        if(data.code == 0){
          var remainres = get("/api/userProfile/balance", {});
          remainres.then(remain=>{
          this.money_remain = remain.data.paymentBalance;
          })
        }
        else{
          alert(data.msg);
        }
      })
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
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    min-height: 90vh;
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