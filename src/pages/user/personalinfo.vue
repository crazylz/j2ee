<template>
<div>
  <!-- 面包屑 -->
  <el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;">
    <el-breadcrumb-item :to="{ path: '/userhome'}">用户</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/userhome/personalinfo' }">个人资料</el-breadcrumb-item>
  </el-breadcrumb>

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
          <label
            style="font-size:30px; float:left; margin-top:5px; margin-left:40px; color:#2b3080">
            {{user.name}}
            </label>
        </el-form-item>

        <el-form-item label="性别：" label-width="200px">
          <!-- 根据性别动态显示图标 -->
          <img v-if="user.gender==0" src="../../assets/hide.png" style="width: 30px; float:left; margin-top:5px" />
          <img v-else-if="user.gender==1" src="../../assets/boy.png" style="width: 30px; float:left; margin-top:5px" />
          <img v-else src="../../assets/girl.png" style="width: 30px; float:left; margin-top:5px" />
        </el-form-item>

        <el-form-item label="手机：" style="text-align:left">{{user.phoneNumber}}</el-form-item>
        <el-form-item label="工龄：" style="text-align:left">{{user.lengthOfService}}年</el-form-item> 
        <el-form-item label="工资：" style="text-align:left">￥{{user.salary}}</el-form-item>
        <el-form-item label="第三方账户号码：" style="text-align:left">{{user.bankAccount}}</el-form-item>
        <el-form-item label="身份证号码：" style="text-align:left">{{user.idCardNumber}}</el-form-item>
        <!-- 中间加条横线 -->
        <div
          style="background:#afaaaa; height:1px; margin-left: 100px; margin-right: 50px; margin-bottom:25px"/>
        <el-form-item label="失信次数：" style="text-align:left">{{user.discreditedRecords}}</el-form-item>
        <el-form-item label="信用评级：" style="text-align:left">{{user.rank}}</el-form-item>
        <el-form-item label="银行卡号：" style="text-align:left">{{user.bankAccount}}</el-form-item>

        <el-form-item>
        <el-button type="success" round>保存</el-button>
        </el-form-item>

      </el-form>
    </div>


</div>
</template>


<script>
import {post, get, post2} from '../../request/http.js'

  export default {
    data(){
      return{
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

      detailrules:{
      name: [
      {required: true,message: '姓名不能为空',trigger: 'blur'}
      ],
      gender: [
      {required:true,message:'性别不能为空',	trigger: 'blur'},
      // {min:5,message:'密码长度必须大于5个字符字符',}
      ],
      phoneNumber: [
      {required: true,message: '电话不能为空',trigger: 'blur'}
      ],
      salary: [
      {required: true,message: '工资不能为空',trigger: 'blur'}
      ],
      paymentAccount: [
      {required: true,message: '第三方支付账号不能为空',trigger: 'blur'}
      ],
      bankAccount: [
      {required: true,message: '银行卡帐号不能为空',trigger: 'blur'}
      ],
      idCardNumber: [
      {required: true,message: '身份证号不能为空',trigger: 'blur'}
      ],
      lengthOfService: [
      {required: true,message: '工龄不能为空',trigger: 'blur'}
      ],
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
      }
    },

  
    methods:{
      getUser(){
      var userres = get("/api/userProfile", {});
      userres.then(user=>{
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

    },

    mounted(){
      this.getUser();
    }
    
  }
</script>

<style scoped>
  .el-form{
    text-align:left;
    width: 60%;
  }
.card-div {
  background-color: #ffffff;
  padding: 5px；;
  padding-bottom: 10px;
}
</style>