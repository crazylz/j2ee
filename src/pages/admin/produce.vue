<template>
  <div>
    <!-- <el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;">
      <el-breadcrumb-item :to="{ path: '/' }">用户</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">购买产品</a></el-breadcrumb-item>
    </el-breadcrumb> -->

    <!-- <el-table
      ref="filterTable"
      :data="all_tableData"
      border>
      <el-table-column
        label="金额"
        align="center">
        <template slot-scope="scope">
          <span>￥{{scope.row.amount}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        prop = "submit_date"
        label="提交时间"
        sortable
        column-key="submit_date"
        :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
        :filter-method="filterHandler">

      </el-table-column>

      <el-table-column
      align="center"
        label="姓名">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
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
    
   </el-table> -->

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
  width:25%;
}
</style>
