<template>
  <div>
    <el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;">
      <el-breadcrumb-item :to="{ path: '/' }">管理员</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">管理用户</a></el-breadcrumb-item>
    </el-breadcrumb>

    <el-table
      ref="filterTable"
      :data="all_tableData"
      border>
      <el-table-column
        label="用户id"
        align="center">
        <template slot-scope="scope">
          <span>{{scope.row.amount}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="身份证"
        align="center">
        <template slot-scope="scope">
          <span>{{scope.row.amount}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="手机号码"
        align="center">
        <template slot-scope="scope">
          <span>{{scope.row.amount}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="性别"
        align="center">
        <template slot-scope="scope">
          <span>{{scope.row.amount}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="第三方支付帐号"
        align="center">
        <template slot-scope="scope">
          <span>{{scope.row.amount}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="银行卡帐号"
        align="center">
        <template slot-scope="scope">
          <span>{{scope.row.amount}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="失信记录"
        align="center">
        <template slot-scope="scope">
          <span>{{scope.row.amount}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="工资"
        align="center">
        <template slot-scope="scope">
          <span>{{scope.row.amount}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="信用评级"
        align="center">
        <template slot-scope="scope">
          <span>{{scope.row.amount}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="姓名"
        align="center">
        <template slot-scope="scope">
          <span>{{scope.row.amount}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="工龄"
        align="center">
        <template slot-scope="scope">
          <span>{{scope.row.amount}}</span>
        </template>
      </el-table-column>


      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
          name: '王小',
          address: '上海市普陀区金沙江路 1518'
        }, {
          amount: 1000000,
          submit_date: '2016-05-04',
          name: '王中',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          amount: 1000000,
          submit_date: '2016-05-01',
          name: '王大',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          name: '王大大',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          name: '王小小',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          name: '王小狗',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          name: '王小猫',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          amount: 1000000,
          submit_date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        tableData: []
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
      }
    },

    mounted(){
      this.getOriginalData();
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
  width:9.09%;
}
</style>