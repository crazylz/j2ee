<template>
<div>
  <!-- 面包屑 -->
  <el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;">
    <el-breadcrumb-item :to="{ path: '/' }">用户</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">填写征信资料</a></el-breadcrumb-item>
  </el-breadcrumb>

<el-form ref="form" :model="form" label-position="top">
  <el-form-item label="负债金额">
    <el-input v-model="form.debt" placeholder="无负债则填写0" style="width: 25%"></el-input>
  </el-form-item>

  <el-form-item label="房产">
    <el-select v-model="form.hosue" placeholder="请选择房产类型">
      <el-option label="无房产" value="0"></el-option>
      <el-option label="有房产，价值0~30w" value="150000"></el-option>
      <el-option label="有房产，价值30~50w" value="400000"></el-option>
      <el-option label="有房产，价值50~100w" value="750000"></el-option>
      <el-option label="有房产，价值100w以上" value="1150000"></el-option>
    </el-select>
  </el-form-item>

  <!-- <el-form-item label="活动时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
    </el-col>
  </el-form-item> -->

  <!-- <el-form-item label="即时配送">
    <el-switch v-model="form.delivery"></el-switch>
  </el-form-item> -->

  <!-- <el-form-item label="活动性质">
    <el-checkbox-group v-model="form.type">
      <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
      <el-checkbox label="地推活动" name="type"></el-checkbox>
      <el-checkbox label="线下主题活动" name="type"></el-checkbox>
      <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item> -->

  <el-form-item label="配偶是否有工作">
    <el-radio-group v-model="form.spouse">
      <el-radio label="配偶有工作"></el-radio>
      <el-radio label="目前无配偶或配偶无工作"></el-radio>
    </el-radio-group>
  </el-form-item>

  <!-- <el-form-item label="活动形式">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item> -->

<el-form-item label="附件材料">
  <el-upload
  class="upload-demo"
  ref="upload"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  :auto-upload="false">
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
  <div slot="tip" class="el-upload__tip">最大上传10MB大小的文件</div>
  </el-upload>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="onSubmit">提交</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>


</div>
</template>


<script>
import {post, get} from '../../request/http.js'

  export default {
    data(){
      return{
        form: {
          debt: '',
          house: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          spouse: '',
          spouseValue: null,
          desc: ''
        },

        fileList: []
      }
    },

  
    methods:{
      onSubmit() {
        var res = post("/api/audit/auditedInformation", {file: this.fileList, unpaidLoan: this.form.debt, 
        propertyValue: this.form.house, isSpouseWork: this.form.spouseValue});
        res.then(result=>{
          console.log(result);
        })
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

    watch:{
      newValue(val, oldVal){
        if(val == '配偶有工作'){
          this.form.spouseValue = 1;
        }
        else{
          this.form.spouseValue = 0;
        }
        console.log(this.form.spouseValue);
      }
    },

    computed: {
  　　newValue() {
  　　　　return this.form.spouse;
  　　}
  }
    
    
  }
</script>

<style scoped>
  .el-form{
    text-align:left;
    width: 60%;
  }
</style>