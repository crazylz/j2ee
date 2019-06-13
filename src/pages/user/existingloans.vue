<template>
  <div>
    <el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:20px;">
    <el-breadcrumb-item :to="{ path: '/' }">用户</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">借款</a></el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">已有借款</a></el-breadcrumb-item>
    </el-breadcrumb>
    
  <el-table
    ref="filterTable"
    :data="tableData"
    height=631%
    border
    >
    <el-table-column
      label="金额"
      width="180">
      <template slot-scope="scope">
        <span>￥{{ scope.row.amount }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="分期"
      width="100">
      <template slot-scope="scope">
        <span>{{ scope.row.installment }}</span>
      </template>
    </el-table-column>
    
    <el-table-column
      label="利率"
      width="100">
      <template slot-scope="scope">
        <span>{{ scope.row.interest_rate }}%</span>
      </template>
    </el-table-column>

    <el-table-column
      label="每期还款金额"
      width="180">
      <template slot-scope="scope">
        <el-popover 
        trigger="click"
        placement="bottom"
        title="计算公式: 金额 × (1 + 利率) ÷ 分期数">
        <span>
          ￥{{scope.row.amount}} × (1 + {{scope.row.interest_rate}}%) ÷ {{scope.row.installment}}
        </span>
          <el-button size="small" slot="reference">￥{{ scope.row.amount * (scope.row.interest_rate / 100 + 1) / scope.row.installment  }}</el-button>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column
      prop = "submit_date"
      label="提交时间"
      sortable
      width="180"
      column-key="submit_date"
      :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
      :filter-method="filterHandler">
    </el-table-column>


    <el-table-column
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
  export default {
    data() {
      return {
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
        tableData: []
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
      }
    },

    mounted(){
      this.getOriginalData();
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
  width:fit-content;
  margin:auto;
}
</style>
