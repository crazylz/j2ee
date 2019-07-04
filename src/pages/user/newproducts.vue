<template>
  <div>
    <el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;">
      <el-breadcrumb-item :to="{ path: '/userhome' }">用户</el-breadcrumb-item>
      <el-breadcrumb-item>产品</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/userhome/newproducts'}">购买产品</el-breadcrumb-item>
      <!-- <el-button type='success' icon='el-icon-plus' round class='button_add' size='small' @click='addVisible = true'>新建购买</el-button> -->
    </el-breadcrumb>

    <el-dialog :visible.sync="investVisible">
        <h2 style="margin-top:-30px;text-align: center;color: #606266; font-size:30px">请输入支付密码</h2>
        <el-form
          ref="investForm"
          label-width="200px"
          label-position="right">

          <el-form-item label="支付密码">
            <span v-for="(item,index) in List" :key="item.id">
              <input type="text" v-model="item.val" class="border-input" 
              @keyup="nextFocus($event,index)" @keydown="changeValue(index)">
            </span>
          </el-form-item>
          
          <el-button type="primary" @click="expiry()">确认</el-button>

        </el-form>
      </el-dialog>

    <el-dialog :visible.sync='detailVisible' top="5vh" width="40%">
        <div class="card-div">
      <div
        style="font-weigth:bold; font-size: 20px; float: left; margin-left: 10px; margin-top: 10px">| 基本资料</div>

      <!-- 头像 -->
      <div style="margin-top: 60px; float: left;">
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

        <el-form-item label="性别：">
          <!-- 根据性别动态显示图标 -->
          <img v-if="borrower.gender==0" src="../../assets/hide.png" style="width: 30px; float:left; margin-top:5px" />
          <img v-else-if="borrower.gender==1" src="../../assets/boy.png" style="width: 30px; float:left; margin-top:5px" />
          <img v-else src="../../assets/girl.png" style="width: 30px; float:left; margin-top:5px" />
        </el-form-item>

        <el-form-item label="手机：" style="text-align:left">{{borrower.phone_number}}</el-form-item>
        <el-form-item label="工龄：" style="text-align:left">{{borrower.length_of_service}}年</el-form-item> 
        <el-form-item label="工资：" style="text-align:left">￥{{borrower.salary}}</el-form-item>
        <!-- 中间加条横线 -->
        <div
          style="background:#afaaaa; height:1px; margin-left: 100px; margin-right: 50px; margin-bottom:25px"/>
        <el-form-item label="失信次数：" style="text-align:left">{{borrower.discredited_records}}</el-form-item>
        <el-form-item label="信用评级：" style="text-align:left">{{borrower.rank}}</el-form-item>
        </el-form>
        </div>
      </el-dialog>

  <el-table
    ref="filterTable"
    :data="all_tableData.slice(pageIndex*10-10, pageIndex*10)"
    border>

    <el-table-column
      align='center'
      label="金额"
      sortable
      prop="amount">
      <template slot-scope="scope">
        <span>￥{{ scope.row.amount }}</span>
      </template>
    </el-table-column>

    <el-table-column
    align='center'
      label="利率"
      sortable
      prop="rate">
      <template slot-scope="scope">
        <span>{{ scope.row.rate }}%</span>
      </template>
    </el-table-column>

    <el-table-column
    align='center'
      label="分期"
      sortable
      prop="installment_number">
      <template slot-scope="scope">
        <span>{{ scope.row.installment_number }}</span>
      </template>
    </el-table-column>

    <el-table-column
    align='center'
      label="每月还款日期"
      sortable
      prop="pay_day_of_month">
      <template slot-scope="scope">
        <span>{{ scope.row.pay_day_of_month }}号</span>
      </template>
    </el-table-column>

    <el-table-column
    align='center'
      label="处理时间"
      sortable
      prop="process_time">
      <template slot-scope="scope">
        <span>{{ scope.row.process_time | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
      </template>
    </el-table-column>


      <el-table-column
      align="center"
        label="借款人">
        <template slot-scope="scope">

              <el-button
              size="mini" @click="detailVisible=true;handleBorrower(scope.row)">
              {{scope.row.name}}
              </el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="investVisible=true;productId=scope.row.id">购买</el-button>
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
</template>



<script>
import {post, get} from '../../request/http.js'
let Base64 = require('js-base64').Base64

  export default {
    data() {
      return {
        all_tableData: [],
        pageIndex:1,
        detailVisible:false,
        borrower: {
          name:null,
          gender:null,
          salary: null,
          phone_number: null,
          length_of_service:null,
          discredited_records:null,
          rank:null,
        },

        investVisible:false,
        List: [{val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}],
        password:'',
        productId:null
      }
    },
    methods: {
      handleInvest() {
          var res = post("/api/investor/invest", {id:this.productId, password:Base64.encode(this.password)});
          res.then(data=>{
          if(data.code == 0){
            this.detailVisible=false;
            this.$msgbox({
            title: '提示',
            message: data.msg,
            type: 'success'
          });

          var res1 = get("/api/investor/productList", {})
          res1.then(tdata => {
            this.all_tableData = tdata.data
            console.log(tdata)

          })

          }
          else{
            this.$msgbox({
            title: '提示',
            message: data.msg,
            type: 'error'
          });
          }
          console.log(data);
        })
  
        
      },

      nextFocus(el,index){
        var dom = document.getElementsByClassName("border-input"),
        currInput = dom[index],
        nextInput = dom[index + 1],
        lastInput = dom[index - 1];

        if (el.keyCode != 8) {
          if (index < (this.List.length - 1)) {
            nextInput.focus();
          } else {
            currInput.blur();
          }
        }else{
          if (index !=0) {
            lastInput.focus();
          }
         }
      },

      changeValue(index) {
        this.List[index].val = "";
      },

      expiry(){
          let Input = document.getElementsByClassName('border-input');
          let reg = /^[0-9]+$/;

          for (let i = 0; i < Input.length; i++) {
            if (Input[i].value === '') {
              this.hintTxt = '请填写完整的密码';
              return;
            }
            if (!reg.test(Input[i].value)){
              this.hintTxt = '请填写数字';
              return;
            }
          }
         
          for (let i = 0; i < Input.length; i++) {
            this.password += Input[i].value;
          }

          this.handleInvest();
          this.password='';
         
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },

      handleCurrentChange(val) {
        this.pageIndex=val;
      },


      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      getGender(state){
        if(state == 0){
          return '未设置';
        }
        else{
          return state == 1 ? '男' : '女';
        }
      },



    handleBorrower(row){
      this.borrower.name = row.name;
      this.borrower.gender = row.gender;
      this.borrower.salary = row.salary;
      this.borrower.phone_number = row.phone_number;
      this.borrower.length_of_service = row.length_of_service;
      this.borrower.rank = row.rank;
      this.borrower.discredited_records = row.discredited_records;
    }


    },

    mounted(){
      var res = get("/api/investor/productList", {})
      res.then(data => {
        this.all_tableData = data.data;
        console.log(data);
      })
    }
  }
</script>

<style scoped>
.el-table{
  /* display:inline-block;
  text-align:center; */
  width: 100%;
  /* width:fit-content;
  margin:auto; */
}

.button_add{
  float:right;
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

.border-input{
  background: #ffffff;
  width: 30px;
  font-size: 30px;
  height: 40px;
  margin-left: 15px;
  margin-right: 15px;
  text-align: center;
  border-bottom: 1px solid #333333;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
}
</style>
