<template>
  <div>
    <el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;">
    <el-breadcrumb-item :to="{ path: '/userhome' }">用户</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/userhome/loans'}">借款</el-breadcrumb-item>
    <el-button type='success' icon='el-icon-plus' round class='button_add' size='small' @click='addVisible = true'>新建贷款</el-button>
    </el-breadcrumb>
  
			<el-dialog style=" font-size: 14px " class="loans" :visible.sync='addVisible'>
				<h2 style="text-align: center;color: #606266; font-size:30px">新建借款</h2>
        <h2 style="color: #F56C6C; font-size:20px">借款额度: ￥{{limit}}</h2>
				<el-form ref='userLoginForm' :model='Loan' label-width='200px' :rules='rules' label-position="right">
					<el-form-item label='借款额(￥)' prop='amount' class="input">
						<el-input v-model='Loan.amount' type='text' placeholder='请输入借款额(￥)' autocomplete="off"  clearable></el-input>
					</el-form-item>
					<el-form-item label='利率(%)' prop='rate' class="input">
						<el-input v-model='Loan.rate' autocomplete="off"  placeholder='请输入利率(%)' clearable></el-input>
					</el-form-item> 
          <el-form-item label='每月还款日期' prop='payDayOfMonth' class="input">
            <el-select v-model="Loan.payDayOfMonth" filterable placeholder="请选择每月还款日期">
              <el-option
                v-for="item in payDate"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
					</el-form-item>
          <!-- <span style="display:inline-block;text-align:center;">
            分期
          </span> -->
          <el-form-item label="分期" class="input" prop='installmentNumber'>
            <el-select v-model="Loan.installmentNumber" placeholder="请选择分期" label="分期"> 
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
    border>

    <el-table-column
      align="center"
      prop="userId"
      label="投资者id"
      sortable>
      <template slot-scope="scope">
      <el-popover trigger="click" placement="bottom">
          <p>姓名: {{ investor.name}}</p>
          <p>性别: {{ getGender(investor.gender) }}</p>
          <p>电话: {{ investor.phoneNumber }}</p>
          <p>工龄: {{ investor.lengthOfService }}</p>
          <p>工资: ￥{{ investor.salary }}</p>
          <p>失信记录次数: {{ investor.discreditedRecords }}</p>
          <p>信用评级: {{ investor.rank }}</p>
        <div slot="reference" class="name-wrapper">
          <el-button size="mini" @click="getInvestor(scope.row.investorId)">
            {{scope.row.investorId}}
          </el-button>
      </div>
      </el-popover>
      </template>
      </el-table-column>


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
      label="每月还款日期">
      <template slot-scope="scope">
        <span>每月{{ scope.row.payDayOfMonth }}号</span>
      </template>
    </el-table-column>

    <!-- <el-table-column
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
    </el-table-column> -->

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
          value: 6,
          label: '6'
        },{
          value: 12,
          label: '12'
        },{
          value: 18,
          label: '18'
        },{
          value: 24,
          label: '24'
        },
        ],

        payDate:[{value:1,lable:'1'},{value:2,lable:'2'},{value:3,lable:'3'},{value:4,lable:'4'},{value:5,lable:'5'},
        {value:6,lable:'6'},{value:7,lable:'7'},{value:8,lable:'8'},{value:9,lable:'9'},{value:10,lable:'10'},
        {value:11,lable:'11'},{value:12,lable:'12'},{value:13,lable:'13'},{value:14,lable:'14'},{value:15,lable:'15'},
        {value:16,lable:'16'},{value:17,lable:'17'},{value:18,lable:'18'},{value:19,lable:'19'},{value:20,lable:'20'},
        {value:21,lable:'21'},{value:22,lable:'22'},{value:23,lable:'23'},{value:24,lable:'24'},{value:25,lable:'25'},
        {value:26,lable:'26'},{value:27,lable:'27'},{value:28,lable:'28'}
        ],


        Loan: {
          amount: null,
          installmentNumber:null,
          rate:null,
          payDayOfMonth:null
        },

        investor:[],
        limit:0,


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

      getInvestor(id){
        var res = get("/api/userProfile/" + id, {});
        res.then(bdata=>{
          this.investor = bdata.data;
          console.log(this.investor);
        })
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
      
      var res = post("/api/borrower/request", {amount:this.Loan.amount,installmentNumber:this.Loan.installmentNumber,rate:this.Loan.rate,payDayOfMonth:this.Loan.payDayOfMonth})
      res.then(data => {
        console.log(data)
        if(data.code==0)
        {
          this.$msgbox({
            title: '提示',
            message: data.msg,
            type: 'success'
          });
          this.getLoanData();
        }
        else{
          this.$msgbox({
            title: '提示',
            message: data.msg,
            type: 'error'
          });
        }
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

      getLoanData(){
        var res = get("/api/borrower/allRequests", {});
        res.then(data => {
        this.all_tableData = data.data;
        this.getOriginalData();
        console.log(data)
      });
      },

      getLimit(){
      var limit=get("api/borrower/limit",{})
      limit.then(data =>{
        console.log(data)
        this.limit = data.data;
      });
    }

    },

    mounted(){
      this.getLoanData();
      this.getLimit();
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

  .input{
    width:80%;
    left:10%;
  }

  .el-select{
    width: 100%
  }
  
</style>
