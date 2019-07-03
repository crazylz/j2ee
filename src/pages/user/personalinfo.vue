<template>
<div>
  <!-- 面包屑 -->
  <el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;">
    <el-breadcrumb-item :to="{ path: '/userhome'}">用户</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/userhome/personalinfo' }">个人资料</el-breadcrumb-item>
  </el-breadcrumb>


  <el-dialog :visible.sync='editpassword'>
    <h2 style="margin-top:-30px;text-align: center;color: #606266; font-size:30px">支付密码</h2>

    <el-form style="margin-right:120px" label-width='200px'>
      <el-form-item style="margin-left:-44px" label='原始密码'>
        <el-input v-model='user.password' placeholder='请输入原始密码' clearable></el-input>
      </el-form-item>

      <el-form-item style="margin-left:-44px" label='支付密码'>
        <el-input v-model='user.password' placeholder='请输入支付密码' clearable></el-input>
      </el-form-item>

      <el-form-item style="margin-left:-80px;margin-top:10px">
        <el-button type='primary'>确认</el-button>
      </el-form-item>
    </el-form>   
  </el-dialog>

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
          <label style="font-size:30px; float:left; margin-top:5px; margin-left:40px; color:#2b3080" v-if="editable == false">
            {{user.name}}
          </label>

          <el-input v-model="user.name" v-else style="float:left;margin-left:40px;"></el-input>
        </el-form-item>

        <el-form-item label="性别：">
          <!-- 根据性别动态显示图标 -->
          <img v-if="user.gender==0 && editable==false" src="../../assets/hide.png" style="width: 30px; float:left; margin-top:5px" />
          <img v-else-if="user.gender==1 && editable==false" src="../../assets/boy.png" style="width: 30px; float:left; margin-top:5px" />
          <img v-else-if="user.gender==2 && editable==false" src="../../assets/girl.png" style="width: 30px; float:left; margin-top:5px" />
          <!-- <el-input v-model="user.gender" v-else-if="editable==true"></el-input> -->
          <el-select v-model="user.gender" placeholder="请选择性别" label="性别" v-else-if="editable==true" style="width:60%;float:left"> 
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="手机：" style="text-align:left">
          <label v-if="editable == false">{{user.phoneNumber}}</label>
          <el-input v-model="user.phoneNumber" v-else disabled></el-input>
        </el-form-item>

        <el-form-item label="工龄：" style="text-align:left">
          <label v-if="editable == false">{{user.lengthOfService}}年</label>
          <el-input v-model="user.lengthOfService" v-else disabled></el-input>
        </el-form-item> 

        <el-form-item label="工资：" style="text-align:left">
          <label v-if="editable == false">￥{{user.salary}}</label>
          <el-input v-model="user.salary" v-else disabled></el-input>
        </el-form-item>

        <el-form-item label="身份证号码：" style="text-align:left">
          <label v-if="editable == false">{{user.idCardNumber}}</label>
          <el-input v-model="user.idCardNumber" v-else disabled></el-input>
        </el-form-item>


        <!-- 中间加条横线 -->
        <div style="background:#afaaaa; height:1px; margin-left: 100px; margin-right: 50px; margin-bottom:25px"/>

        <el-form-item label="失信次数：" style="text-align:left">
          <label v-if="editable == false">{{user.discreditedRecords}}</label>
          <el-input v-model="user.discreditedRecords" v-else disabled></el-input>
        </el-form-item>

        <el-form-item label="信用评级：" style="text-align:left">
          <label v-if="editable == false">{{user.rank}}</label>
          <el-input v-model="user.rank" v-else disabled></el-input>
        </el-form-item>

      

        <el-form-item>
          <el-button type="info" round @click="editable = true" v-if="editable == false">编辑</el-button>
          <div v-else>
          <el-button type="danger" round @click="editable = false;getUser()">取消编辑</el-button>
          <el-button type="success" round @click="handleDetail">保存</el-button>
          </div>
        </el-form-item>

      </el-form>
    </div>


    <div class="card-div" style="margin-top: 10px">
      <div
        style="font-weigth:bold; font-size: 20px; float: left; margin-left: 10px; margin-top: 20px;"
      >| 支付模块</div>

      <el-form ref="base-form" label-position="right" label-width="200px" style="padding-top: 80px;">
      <el-form-item label="银行卡号：" style="text-align:left">
          <label v-if="editable == false">{{user.bankAccount}}</label>
          <el-input v-model="user.bankAccount" v-else disabled></el-input>
      </el-form-item>

      <el-form-item label="第三方账户号码：" style="text-align:left">
          <label v-if="editable == false">{{user.paymentAccount}}</label>
          <el-input v-model="user.paymentAccount" v-else disabled></el-input>
      </el-form-item>


      <el-form-item label="支付密码：" style="text-align:left">
      <el-button type="primary" round @click="editpassword = true">设置支付密码</el-button>
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
        idCardNumber:null,
        discreditedRecords:null,
        rank:null,
        userId:null,
        password:null
        },

        editable: false,
        editpassword: false,

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
      this.user.discreditedRecords = user.data.discreditedRecords;
      this.user.rank = user.data.rank;
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
          this.editable = false;
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

    handlePassword(){

    }

    },

    mounted(){
      this.getUser();
    }
    
  }
</script>

<style scoped>
  /* .el-form{
    text-align:left;
    width: 60%;
  } */
.card-div {
  background-color: #ffffff;
  padding: 5px；;
  padding-bottom: 10px;
}
.base-form {
  /* float: left; */
  padding-top: 120px;
}

.el-input{
width:60%;
}
</style>