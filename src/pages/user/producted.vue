<template>
  <div>
    <el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;">
      <el-breadcrumb-item :to="{ path: '/userhome' }">用户</el-breadcrumb-item>
      <el-breadcrumb-item>产品</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/userhome/producted'}">已购产品</el-breadcrumb-item>
    </el-breadcrumb>


    <el-dialog :visible.sync='detailVisible' top="5vh" width="40%">
        <div class="card-div">
      <div
        style="font-weigth:bold; font-size: 20px; float: left; margin-left: 10px; margin-top: 10px">| 基本资料</div>

      <!-- 头像 -->
      <div style="margin-top: 60px; float: left;">
        <img src="../../assets/user.png" />
      </div>

      <el-form ref="base-form" class="base-form" label-position="right" label-width="200px">
        <el-form-item>
          <label style="float:left;margin-left:40px">用户名</label>
          <br/>
          <!-- 这里需要把“没有查询结果”替换为对应的用户名 -->
          <label style="font-size:30px; float:left; margin-top:5px; margin-left:40px; color:#2b3080">
            {{borrower.name}}
          </label>
        </el-form-item>

        <el-form-item label="性别：">
          <!-- 根据性别动态显示图标 -->
          <img v-if="borrower.gender==0" src="../../assets/hide.png" style="width: 30px; float:left; margin-top:5px" />
          <img v-else-if="borrower.gender==1" src="../../assets/boy.png" style="width: 30px; float:left; margin-top:5px" />
          <img v-else src="../../assets/girl.png" style="width: 30px; float:left; margin-top:5px" />
        </el-form-item>

        <el-form-item label="手机：" style="text-align:left">{{borrower.phoneNumber}}</el-form-item>
        <el-form-item label="工龄：" style="text-align:left">{{borrower.lengthOfService}}年</el-form-item> 
        <el-form-item label="工资：" style="text-align:left">￥{{borrower.salary}}</el-form-item>
        <!-- 中间加条横线 -->
        <div
          style="background:#afaaaa; height:1px; margin-left: 100px; margin-right: 50px; margin-bottom:25px"/>
        <el-form-item label="失信次数：" style="text-align:left">{{borrower.discreditedRecords}}</el-form-item>
        <el-form-item label="信用评级：" style="text-align:left">{{borrower.rank}}</el-form-item>
        </el-form>
        </div>
      </el-dialog>



  <el-table
    ref="filterTable"
    :data="all_tableData.slice(pageIndex*10-10, pageIndex*10)"
    >

    <el-table-column
      align="center"
      prop="userId"
      label="借款人id"
      sortable>
      <template slot-scope="scope">
          <el-button size="mini" @click="getBorrower(scope.row.userId);detailVisible=true">
            {{scope.row.userId}}
          </el-button>
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
      prop="purchaseTime">
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
        pageIndex:1,
        borrower: [],
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },


      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },

      handleCurrentChange(val) {
        this.pageIndex=val;
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
  width: 100%;
}

.button_add{
  float:right;
}

.card-div {
  background-color: #ffffff;
  padding: 5px；;
  padding-bottom: 10px;
}
.base-form {
  /* float: left; */
  padding-top: 120px;
}
</style>