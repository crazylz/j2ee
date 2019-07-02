<template>
  <div>
    <el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;">
      <el-breadcrumb-item :to="{ path: '/userhome' }">用户</el-breadcrumb-item>
      <el-breadcrumb-item>产品</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/userhome/producted'}">已购产品</el-breadcrumb-item>
    </el-breadcrumb>


    <el-dialog class="detail"  :visible.sync='detailVisible'>
        <h2 style=" text-align: center;color: #606266; font-size:30px">个人资料</h2>
        <el-form style="margin-right:120px"  ref='userForm' label-width='200px'>

            <el-form-item label='姓名' prop='name' class="input">
              <el-input v-model='borrower.name' placeholder='请输入姓名' clearable></el-input>
            </el-form-item>

            <el-form-item label="性别" class="input" prop='gender'>
            <el-input v-model='borrower.gender' clearable></el-input>
          </el-form-item>

            <el-form-item label='电话' prop='phoneNumber' class="input">
              <el-input v-model='borrower.phoneNumber' clearable disabled></el-input>
            </el-form-item>

            <el-form-item label='工龄(年)' prop='lengthOfService' class="input">
              <el-input v-model='borrower.lengthOfService' clearable></el-input>
            </el-form-item>

            <el-form-item label='工资(￥)' prop='salary' class="input">
              <el-input v-model='borrower.salary' clearable></el-input>
            </el-form-item>

            <el-form-item label='第三方支付账号' prop='paymentAccount' class="input">
              <el-input v-model='borrower.paymentAccount ' clearable></el-input>
            </el-form-item>

            <el-form-item label='银行卡帐号' prop='bankAccount' class="input">
              <el-input v-model='borrower.bankAccount ' clearable></el-input>
            </el-form-item>

            <el-form-item label='身份证号' prop='idCardNumber' class="input">
              <el-input v-model='borrower.idCardNumber' clearable></el-input>
            </el-form-item>          
        </el-form>   
      </el-dialog>



  <el-table
    ref="filterTable"
    :data="tableData"
    border>

    <el-table-column
      align="center"
      prop="userId"
      label="借款人id"
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
          <el-button size="mini" @click="getBorrower(scope.row.userId);detailVisible=true">
            {{scope.row.userId}}
          </el-button>
      <!-- </div>
      </el-popover> -->
      </template>
      </el-table-column>


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
      prop="installmentNumber">
      <template slot-scope="scope">
        <span>{{ scope.row.installmentNumber }}</span>
      </template>
    </el-table-column>

    <el-table-column
    align='center'
      label="每月还款日期"
      sortable
      prop="payDayOfMonth">
      <template slot-scope="scope">
        <span>{{ scope.row.payDayOfMonth }}号</span>
      </template>
    </el-table-column>

    <el-table-column
    align='center'
      label="购买时间"
      sortable
      prop="purchaseTime | dateformat('YYYY-MM-DD HH:mm:ss')">
      <template slot-scope="scope">
        <span>{{ scope.row.purchaseTime | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
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

  export default {
    data() {
      return {
        detailVisible:false,
        all_tableData: [],
        tableData: [],
        borrower: [],
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },

      getDataByPage(pageindex){
        var begin = pageindex * 10;
        if(begin > this.all_tableData.length){
          this.tableData = this.all_tableData.slice(begin-10, this.all_tableData.length);
        }
        else{
          this.tableData = this.all_tableData.slice(begin-10, begin);
        }
        // console.log(begin);
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },

      handleCurrentChange(val) {
        this.getDataByPage(val);
      },

      getOriginalData(){
        if(this.all_tableData.length < 10){
          this.tableData = this.all_tableData.slice(0, this.all_tableData.length);
        }
        else{
          this.tableData = this.all_tableData.slice(0, 10);
        }
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
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

      getProductData(){
      var res = get("/api/investor/investedProductList", {})
      res.then(data => {
        this.all_tableData = data.data
        this.getOriginalData();
        console.log(data)
      })
      },
    },

    mounted(){
      this.getProductData();
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
</style>