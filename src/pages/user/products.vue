<template>
  <div>
    <el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;">
      <el-breadcrumb-item :to="{ path: '/' }">用户</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">购买产品</a></el-breadcrumb-item>
      <el-button type='success' icon='el-icon-plus' round class='button_add' size='small' @click='addVisible = true'>新建购买</el-button>
    </el-breadcrumb>

    <el-dialog class="products" :visible.sync='addVisible'>
      <h2 style="text-align: center;color: #606266; font-size:30px">新建购买</h2>
      <el-form ref='userLoginForm' :model='Loan' label-width='200px' :rules='rules'>
        <el-form-item label='账号' prop='id' class="input">
          <el-input v-model='Loan.id' placeholder='请输入账号' autocomplete="on" id='userid' clearable></el-input>
        </el-form-item>
        <el-form-item label='购买额' prop='loans' class="input">
          <el-input v-model='Loan.loans' type='text' placeholder='请输入借款额' autocomplete="off" id='loans' clearable></el-input>
        </el-form-item>
        <el-form-item label='利息' prop='interest' class="input">
          <el-input v-model='Loan.interest' autocomplete="off" id='interest' clearable></el-input>
        </el-form-item>
        <div class="repay">
            <span class="demonstration">取回日期</span>
            <el-date-picker
            v-model="Loan.date"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions">
            </el-date-picker>
        </div>

        <el-form-item style="margin-right:200px;margin-top:10px">
          <el-button type='primary' @click='addVisible = false'
          >购买</el-button>
          <el-button type='primary' @click='set()'
          >保存</el-button>
        </el-form-item>

        </el-form>
    </el-dialog>

  <el-table
    ref="filterTable"
    :data="all_tableData"
    border>

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
        <span>{{ scope.row.installment_number }}</span>
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
        <span>{{ scope.row.pay_day_of_month }}号</span>
      </template>
    </el-table-column>

      <el-table-column
        align="center"
        prop = "process_time"
        label="处理时间"
        sortable
        column-key="submit_date"
        :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
        :filter-method="filterHandler">

      </el-table-column>

      <el-table-column
      align="center"
        label="姓名">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="bottom">
            <p>姓名: {{ scope.row.name}}</p>
            <p>性别: {{ scope.row.gender }}</p>
            <p>电话: {{ scope.row.phone_number }}</p>
            <p>工龄: {{ scope.row.length_of_service }}</p>
            <p>工资: ￥{{ scope.row.salary }}</p>
            <p>失信记录次数: {{ scope.row.discredited_records }}</p>
            <p>信用评级: {{ scope.row.rank }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">购买</el-button>
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

        Loan: {
					id: '',
          loans: '',
          interest:'10%',
          date:'2019-6-12'
				},
				// 校验规则
				rules:{
					id: [
					{required: true,message: '用户名不能为空',trigger: 'blur'}
					],
					loans: [
					{required:true,message:'贷款额不能为空',	trigger: 'blur'},
					// {min:5,message:'密码长度必须大于5个字符字符',}
					]
                },


            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now();
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                    picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                    }
                }]
                }
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
      get:function(){
				var that=this;
				// if(that.loginRole==1){
				// that.$router.push({path:'/userhome'});
				// }else if(that.loginRole==2){
				// that.$router.push({path:'/guaranteehome'});
				// }else if(that.loginRole==3){
				// that.$router.push({path:'/adminhome'});
				// }
			},
			set:function(){
				localStorage.setItem('id',this.Loan.id);
				localStorage.setItem('loans',this.Loan.loans);
			}
    },

    mounted(){
      this.getOriginalData();
      this.Loan.id=localStorage.getItem('id');
      this.Loan.loans=localStorage.getItem('loans');


      var res = get("/api/investor/productList", {})
      res.then(data => {
        this.all_tableData = data.data
        console.log(data)

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
.el-table.column{
  width:14.29%;
}
.button_add{
  float:right;
}
.products{
		border: 1px solid #999999;
		border-radius: 30px;
		text-align: center;
		/* background-color: rgba(255,255,255,0.8); */
	}

    .main{
        display:table;
        width:fit-content;
	}
    .repay{
        margin-right:30px;
    }
    .input{
        margin-left:100px;
        margin-right:268px;
    }
</style>
