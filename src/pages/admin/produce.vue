<template>
  <div>
    <el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;">
      <el-breadcrumb-item :to="{ path: '/' }">管理员</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">管理产品</a></el-breadcrumb-item>
    </el-breadcrumb>

      <el-table
    ref="filterTable"
    :data="tableData"
    border>

    <el-table-column
      align='center'
      label="产品id"
      sortable
      prop="amount">
      <template slot-scope="scope">
        <span>{{ scope.row.id }}</span>
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
      prop="installment_number">
      <template slot-scope="scope">
        <span>{{ scope.row.installmentNumber }}</span>
      </template>
    </el-table-column>

    <el-table-column
    align='center'
      label="每月还款日期"
      sortable
      prop="pay_day_of_month">
      <template slot-scope="scope">
        <span>{{ scope.row.payDayOfMonth }}号</span>
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
      label="提交时间"
      sortable
      prop="commitTime">
      <template slot-scope="scope">
        <span>{{ scope.row.commitTime | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
      </template>
    </el-table-column>

    <el-table-column
    align='center'
      label="处理时间"
      sortable
      prop="processTime">
      <template slot-scope="scope">
        <span>{{ scope.row.processTime | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
      </template>
    </el-table-column>

    <el-table-column
    align='center'
      label="购买时间"
      sortable
      prop="purchaseTime">
      <template slot-scope="scope">
        <span>{{ scope.row.purchaseTime | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
      </template>
    </el-table-column>


    <el-table-column
      align="center"
      prop="userId"
      label="借款人id"
      sortable>
      <template slot-scope="scope">
      <el-popover trigger="click" placement="bottom">
          <p>姓名: {{ borrower.name}}</p>
          <p>性别: {{ getGender(borrower.gender) }}</p>
          <p>电话: {{ borrower.phoneNumber }}</p>
          <p>工龄: {{ borrower.lengthOfService }}</p>
          <p>工资: ￥{{ borrower.salary }}</p>
          <p>失信记录次数: {{ borrower.discreditedRecords }}</p>
          <p>信用评级: {{ borrower.rank }}</p>
        <div slot="reference" class="name-wrapper">
          <el-button size="mini" @click="getBorrower(scope.row.userId)">
            {{scope.row.userId}}
          </el-button>
        </div>
      </el-popover>
      </template>
      </el-table-column>


      <el-table-column
      align="center"
      prop="userId"
      label="投资人id"
      sortable>
      <template slot-scope="scope">
      <el-popover trigger="click" placement="bottom">
          <p>姓名: {{ borrower.name}}</p>
          <p>性别: {{ getGender(borrower.gender) }}</p>
          <p>电话: {{ borrower.phoneNumber }}</p>
          <p>工龄: {{ borrower.lengthOfService }}</p>
          <p>工资: ￥{{ borrower.salary }}</p>
          <p>失信记录次数: {{ borrower.discreditedRecords }}</p>
          <p>信用评级: {{ borrower.rank }}</p>
        <div slot="reference" class="name-wrapper">
          <el-button size="mini" @click="getBorrower(scope.row.investorId)">
            {{scope.row.investorId}}
          </el-button>
        </div>
      </el-popover>
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

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <span>
          <el-button
            size="mini"
            type="info"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

            <el-button
            size="mini"
            type="danger"
            @click="handleEdit(scope.$index, scope.row)">删除</el-button>
          </span>
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
        borrower: [],
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      getGender(state){
        if(state == 0){
          return '未设置';
        }
        else{
          return state == 1 ? '男' : '女';
        }
      },

      getBorrower(id){
        var res = get("/api/userProfile/" + id, {});
        res.then(bdata=>{
          this.borrower = bdata.data;
          console.log(this.borrower);
        })
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
      }
    },

    mounted(){
      var res = get("/api/admin/requests", {});
      res.then(product=>{
        this.all_tableData = product.data;
        this.getOriginalData();
        console.log(product);
      }
      )
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
</style>
