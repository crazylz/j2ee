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
						<el-input v-model='Loan.amount' type='text' placeholder='请输入借款额' autocomplete="off"  clearable></el-input>
					</el-form-item>
					<el-form-item label='利息' prop='rate' class="input">
						<el-input v-model='Loan.rate' autocomplete="off"  placeholder='请输入利息' clearable></el-input>
					</el-form-item> 
          <el-form-item label='每月还款日期' prop='payDayOfMonth' class="input">
						<el-input v-model='Loan.payDayOfMonth' placeholder='请输入还期' autocomplete="on" clearable></el-input>
					</el-form-item>
          <!-- <span style="display:inline-block;text-align:center;">
            分期
          </span> -->
          <el-form-item label="分期" class="input">
            <el-select v-model="Loan.installmentNumber" prop='installmentNumber'  placeholder="请选择分期" label="分期"> 
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
					<el-form-item style="margin-right:130px;margin-top:10px">
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
        <span>{{ scope.row.installmentNumber }}</span>
      </template>
    </el-table-column>
    
    <el-table-column
    align='center'
      label="利率">
      <template slot-scope="scope">
        <span>{{ scope.row.rate }}%</span>
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
          ￥{{scope.row.amount}} × (1 + {{scope.row.rate}}%) ÷ {{scope.row.installmentNumber}}
        </span>

        <span slot="reference">￥{{ (scope.row.amount * (scope.row.rate / 100 + 1) / scope.row.installmentNumber).toFixed(2)  }}</span>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column
    align='center'
      label="购买时间"
      sortable
      prop="purchaseTime">
      <template slot-scope="scope">
        <span>{{ scope.row.purchaseTime | dateformat('YYYY-MM-DD HH:mm:ss')}}</span>
      </template>
    </el-table-column>


    <el-table-column
    align='center'
      label="状态"
      width="100">
      <template slot-scope="scope">
        <span v-bind:class="textColor(scope.row.state)">{{ classObject(scope.row.state)}}</span>
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
        all_tableData: [],
        tableData: [],
        options: [{
          value: 1,
          label: '1'
        }, {
          value: 2,
          label: '2'
        }, {
          value: 3,
          label: '3'
        }, {
          value: 4,
          label: '4'
        }, {
          value: 5,
          label: '5'
        },{
          value: 6,
          label: '6'
        },{
          value: 7,
          label: '7'
        },{
          value: 8,
          label: '8'
        },{
          value: 9,
          label: '9'
        },{
          value: 10,
          label: '10'
        },{
          value:11,
          label: '11'
        },{
          value: 12,
          label: '12'
        },
        ],
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
        if(state==1)return '待处理';
        if(state==2)return '担保人同意';
        if(state==3)return '担保人拒绝';
        if(state==4)return '已还清';
        if(state==5)return '未还清';
      },

      textColor(state){
        return{
          agree : state == 2,
          reject: state == 3,
          payoff : state == 4,
          unpay : state == 5
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
          this.$msgbox({
            title: '申请成功',
            message: data.msg,
            type: 'success'
          });
          var res = get("/api/borrower/allRequests", {});
          res.then(data => {
          this.all_tableData = data.data;
          this.getOriginalData();
          console.log(data);
      })

        }
        else
        {
          this.$msgbox({
            title: '申请失败',
            message: data.msg,
            type: 'error'
          });
        }
      })
      },
    },

    mounted(){
      var res = get("/api/borrower/allRequests", {})
      var limit=get("api/borrower/limit",{})
      limit.then(data =>{
        console.log(data)
      });
      res.then(data => {
        this.all_tableData = data.data;
        this.getOriginalData();
        console.log(data)
      })
    }
  }
</script>

<style scoped>
  .agree{
    color: #E6A23C
  }
  .reject{
    color: #999999
  }
  .payoff{
    color: #67C23A
  }
  .unpay{
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
    /* border: 1px solid #999999; */
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

  .input{
    width:80%;
    left:10%;
  }
  
</style>
