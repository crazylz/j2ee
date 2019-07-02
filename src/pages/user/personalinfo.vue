<template>
<div>
  <!-- 面包屑 -->
  <el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;">
    <el-breadcrumb-item :to="{ path: '/userhome'}">用户</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/userhome/personalinfo' }">个人资料</el-breadcrumb-item>
  </el-breadcrumb>

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
              <el-input v-model='user.phoneNumber' clearable disabled></el-input>
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
      onSubmit() {
        this.$refs.upload.submit();

        var res = post("/api/audit/auditedInformation", {unpaidLoan:this.form.debt, propertyValue: this.form.house,
        isSpouseWork:this.form.spouseValue});
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

      handleSuccess(){
        return 0;
      },

      handleExceed(){
        this.$msgbox({
            title: '提示',
            message: '最大上传个数为1',
            type: 'error'
          });
      },

      submitUpload() {
        this.$refs.upload.submit();
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },

      handlePreview(file) {
        console.log(file);
      }

    },
    
    
  }
</script>

<style scoped>
  .el-form{
    text-align:left;
    width: 60%;
  }
</style>