<template>
  <div>
    <el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;">
      <el-breadcrumb-item :to="{ path: '/' }">用户</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">购买产品</a></el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">新建购买</a></el-breadcrumb-item>
      <!-- <el-button type='success' icon='el-icon-plus' round class='button_add' size='small' @click='addVisible = true'>新建购买</el-button> -->
    </el-breadcrumb>

    <!-- <el-dialog class="products" :visible.sync='addVisible'>
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
    </el-dialog> -->

  <el-table
    ref="filterTable"
    :data="tableData"
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

      <!-- <el-table-column
        align="center"
        prop = "process_time"
        label="处理时间"
        sortable
        column-key="submit_date"
        :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
        :filter-method="filterHandler">
      </el-table-column> -->

    <el-table-column
    align='center'
      label="处理时间"
      sortable
      prop="process_time | dateformat('YYYY-MM-DD HH:mm:ss')">
      <template slot-scope="scope">
        <span>{{ scope.row.process_time | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
      </template>
    </el-table-column>


      <el-table-column
      align="center"
        label="借款人">
        <template slot-scope="scope">
          <el-popover trigger="click" placement="bottom">
            <p>姓名: {{ scope.row.name}}</p>
            <p>性别: {{ getGender(scope.row.gender) }}</p>
            <p>电话: {{ scope.row.phone_number }}</p>
            <p>工龄: {{ scope.row.length_of_service }}</p>
            <p>工资: ￥{{ scope.row.salary }}</p>
            <p>失信记录次数: {{ scope.row.discredited_records }}</p>
            <p>信用评级: {{ scope.row.rank }}</p>
            <div slot="reference" class="name-wrapper">
              <el-button
              size="mini">
              {{scope.row.name}}
              </el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleInvest(scope.$index, scope.row)">购买</el-button>
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
        all_tableData: [],
        tableData: []
      }
    },
    methods: {
      handleInvest(index, row) {
        console.log(row);
        this.$confirm('确定要购买此产品吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
            var res = post("/api/investor/invest", {id: row.id});
          res.then(data=>{
          if(data.code == 0){
            this.$msgbox({
            title: '购买成功',
            message: data.msg,
            type: 'success'
          });

          var res1 = get("/api/investor/productList", {})
          res1.then(tdata => {
            this.all_tableData = tdata.data
            this.getOriginalData();
            console.log(tdata)

          })

          }
          else{
            this.$msgbox({
            title: '购买失败',
            message: data.msg,
            type: 'error'
          });
          }
          console.log(data);
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消购买'
          });
        });
        
        
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
      getGender(state){
        if(state == 0){
          return '未设置';
        }
        else{
          return state == 1 ? '男' : '女';
        }
      }
    },

    mounted(){
      var res = get("/api/investor/productList", {})
      res.then(data => {
        this.all_tableData = data.data;
        this.getOriginalData();
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
/* .products{
		border: 1px solid #999999;
		border-radius: 30px;
		text-align: center; */
		/* background-color: rgba(255,255,255,0.8);


    .main{
        display:table;
        width:fit-content;
	}
    /* .repay{
        margin-right:30px;
    } */
    /* .input{
        margin-left:100px;
        margin-right:268px;
    } */
</style>
