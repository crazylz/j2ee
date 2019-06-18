<template>
  <div>
    <el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;">
    <el-breadcrumb-item :to="{ path: '/' }">用户</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">借款</a></el-breadcrumb-item>
    <el-button type='success' icon='el-icon-plus' round class='button_add' size='small' @click='addVisible = true'>新建贷款</el-button>
    </el-breadcrumb>
  
			<el-dialog style=" font-size: 14px " class="loans" :visible.sync='addVisible'>
				<h2 style="text-align: center;color: #606266; font-size:30px">新建借款</h2>
				<el-form ref='userLoginForm' :model='Loan' label-width='200px' :rules='rules'>
					<el-form-item label='借款额' prop='amount' class="input">
						<el-input v-model='Loan.loans' type='text' placeholder='请输入借款额' autocomplete="off"  clearable></el-input>
					</el-form-item>
					<el-form-item label='利息' prop='rate' class="input">
						<el-input v-model='Loan.interest' autocomplete="off"  placeholder='请输入利息' clearable></el-input>
					</el-form-item> 
          <el-form-item label='分期' prop='installmentNumber' class="input">
						<el-input v-model='Loan.stage' autocomplete="off"  placeholder='请输入分期' clearable></el-input>
					</el-form-item>
          <el-form-item label='还期' prop='payDayOfMonth' class="input">
						<el-input v-model='Loan.id' placeholder='请输入还期' autocomplete="on" clearable></el-input>
					</el-form-item>

					<el-form-item style="margin-right:200px;margin-top:10px">
						<el-button type='primary' @click='handleSave()'
						>贷款</el-button>
					</el-form-item>
				</el-form>   
			</el-dialog>
	
  <el-table
    ref="filterTable"
    :data="tableData"
    border
    >
    <el-table-column
      align='center'
      label="金额">
      <template slot-scope="scope">
        <span>￥{{ scope.row.amount }}</span>
      </template>
    </el-table-column>

    <el-table-column
    align='center'
      label="分期">
      <template slot-scope="scope">
        <span>{{ scope.row.installment }}</span>
      </template>
    </el-table-column>
    
    <el-table-column
    align='center'
      label="利率">
      <template slot-scope="scope">
        <span>{{ scope.row.interest_rate }}%</span>
      </template>
    </el-table-column>

    <el-table-column
    align='center'
      label="每期还款金额">
      <template slot-scope="scope">
        <el-popover 
        trigger="hover"
        placement="top-start"
        title="计算公式: 金额 × (1 + 利率) ÷ 分期数">
        <span>
          ￥{{scope.row.amount}} × (1 + {{scope.row.interest_rate}}%) ÷ {{scope.row.installment}}
        </span>

        <span slot="reference">￥{{ (scope.row.amount * (scope.row.interest_rate / 100 + 1) / scope.row.installment).toFixed(2)  }}</span>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column
    align='center'
      prop = "submit_date"
      label="提交时间"
      sortable
      column-key="submit_date"
      :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
      :filter-method="filterHandler">
    </el-table-column>


    <el-table-column
    align='center'
      label="状态"
      width="100">
      <template slot-scope="scope">
        <span v-bind:class = "classObject(scope.row.state)">{{ scope.row.state}}</span>
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
        addVisible: false,  
        all_tableData: [{
          amount: 1000000,
          submit_date: '2016-05-02',
          interest_rate: 10,
          installment: 12,
          state: '已还清'
        }, {
          amount: 1000000,
          submit_date: '2016-05-04',
          interest_rate: 5,
          installment: 12,
          state: '未还清'
        }, {
          amount: 1000000,
          submit_date: '2016-05-01',
          interest_rate: 6,
          installment: 12,
          state: '未还清'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          interest_rate: 8,
          installment: 12,
          state: '已还清'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          interest_rate: 7,
          installment: 12,
          state: '未还清'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          interest_rate: 3,
          installment: 10,
          state: '已还清'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          interest_rate: 1,
          installment: 8,
          state: '未还清'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          interest_rate: 2,
          installment: 9,
          state: '已还清'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          interest_rate: 8.8,
          installment: 12,
          state: '未还清'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          interest_rate : 5.4,
          installment: 5,
          state: '已还清'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          interest_rate: 6.1,
          installment: 4,
          state: '未还清'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          interest_rate: 7.1,
          installment: 3,
          state: '已还清'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          interest_rate: 8.1,
          installment: 2,
          state: '已还清'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          interest_rate: 2.3,
          installment: 1,
          state: '未还清'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          interest_rate: 1.8,
          installment: 5,
          state: '已还清'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          interest_rate: 2.5,
          installment: 6,
          state: '已还清'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          interest_rate: 9.9,
          installment: 8,
          state: '未还清'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          interest_rate: 11.1,
          installment: 11,
          state: '已还清'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          interest_rate: 9.10,
          installment: 12,
          state: '未还清'
        }],
        tableData: [],
        Loan: {
          amount:0,
          installmentNumber:0,
          rate:0,
          payDayOfMonth:0
				},
				// 校验规则
				rules:{
					amount: [
					{required: true,message: '金额不能为空',trigger: 'blur'}
					],
					rate: [
					{required:true,message:'贷款额不能为空',	trigger: 'blur'},
					// {min:5,message:'密码长度必须大于5个字符字符',}
          ],
          installmentNumber: [
					{required:true,message:'分期不能为空',	trigger: 'blur'},
					// {min:5,message:'密码长度必须大于5个字符字符',}
          ],
          payDayOfMonth: [
					{required:true,message:'还期不能为空',	trigger: 'blur'},
					// {min:5,message:'密码长度必须大于5个字符字符',}
					]
                },
      }
    },

    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },

      classObject(state){
        return{
          'done': state === '已还清',
          'undone': state === '未还清'
        }
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
      
      handleSave() {
      this.addVisible = false;
      // var temp=post("/api/test/login",{})
      var res = post("/api/borrower/request", {amount:this.Loan.amount,installmentNumber:this.Loan.installmentNumber,rate:this.Loan.rate,payDayOfMonth:this.Loan.payDayOfMonth})
      res.then(data => {
        console.log(data)
        if(data.code==0)
        {
          this.$message({
            message: data.msg,
            type: 'success'
          });
        }
        else
        {
          this.$msgbox({
            title: '操作失败',
            message: data.msg,
            type: 'error'
          });
        }
        // this.all_tableData = data.data

        // for(var i=0; i<this.all_tableData.length; i++){
        //   var userRes = get("/api/userProfile/" + this.all_tableData[i].userId, {})
        //   userRes.then(userdata => {

        //     this.user[i] = userdata.data;
        //     console.log(this.user[i])
        //   })
        // }
      })
      },
    },

    mounted(){

    }
  }
</script>

<style scoped>
  .done{
    color: #67C23A
  }

  .undone{
    color: #F56C6C
  }

  .el-table{
    /* display:inline-block;
    text-align:center; */
    width:100%;
  }

  /* .middle{
    width:fit-content;
    margin:auto;
  } */
  .el-table-column{
    width:16.7%;
  }

  .button_add{
    float:right;
  }

  .loans{
    font-size:14px;
    border: 1px solid #999999;
    border-radius: 30px;
    text-align: center;
    width:80%;
    left:10%;
    /* background-color: rgba(255,255,255,0.8);	 */
  }

  .el-form{
    margin-right:120px;
    margin-left: -30px;
  }  

  .repay{
  
  }
  
</style>
