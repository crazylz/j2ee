<template>
  <div>
    <el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;">
      <el-breadcrumb-item :to="{ path: '/userhome' }">用户</el-breadcrumb-item>
      <el-breadcrumb-item>产品</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/userhome/newproducts'}">购买产品</el-breadcrumb-item>
      <!-- <el-button type='success' icon='el-icon-plus' round class='button_add' size='small' @click='addVisible = true'>新建购买</el-button> -->
    </el-breadcrumb>

    <el-dialog class="detail"  :visible.sync='detailVisible'>
        <div class="card-div">
      <div
        style="font-weigth:bold; font-size: 20px; float: left; margin-left: 10px; margin-top: 20px">| 基本资料</div>

      <!-- 头像 -->
      <div style="margin-top: 80px; float: left;">
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

        <el-form-item label="性别：" label-width="200px">
          <!-- 根据性别动态显示图标 -->
          <img v-if="borrower.gender==0" src="../../assets/hide.png" style="width: 30px; float:left; margin-top:5px" />
          <img v-else-if="borrower.gender==1" src="../../assets/boy.png" style="width: 30px; float:left; margin-top:5px" />
          <img v-else src="../../assets/girl.png" style="width: 30px; float:left; margin-top:5px" />
        </el-form-item>

        <el-form-item label="手机：" style="text-align:left">{{borrower.phone_number}}</el-form-item>
        <el-form-item label="工龄：" style="text-align:left">{{borrower.length_of_service}}年</el-form-item> 
        <el-form-item label="工资：" style="text-align:left">￥{{borrower.salary}}</el-form-item>
        <!-- 中间加条横线 -->
        <div
          style="background:#afaaaa; height:1px; margin-left: 100px; margin-right: 50px; margin-bottom:25px"/>
        <el-form-item label="失信次数：" style="text-align:left">{{borrower.discredited_records}}</el-form-item>
        <el-form-item label="信用评级：" style="text-align:left">{{borrower.rank}}</el-form-item>
        </el-form>
        </div>
      </el-dialog>

  <el-table
    ref="filterTable"
    :data="all_tableData.slice(pageIndex*10-10, pageIndex*10)"
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

    <el-table-column
    align='center'
      label="处理时间"
      sortable
      prop="process_time">
      <template slot-scope="scope">
        <span>{{ scope.row.process_time | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
      </template>
    </el-table-column>


      <el-table-column
      align="center"
        label="借款人">
        <template slot-scope="scope">
          <!-- <el-popover trigger="click" placement="bottom">
            <p>姓名: {{ scope.row.name}}</p>
            <p>性别: {{ getGender(scope.row.gender) }}</p>
            <p>电话: {{ scope.row.phone_number }}</p>
            <p>工龄: {{ scope.row.length_of_service }}</p>
            <p>工资: ￥{{ scope.row.salary }}</p>
            <p>失信记录次数: {{ scope.row.discredited_records }}</p>
            <p>信用评级: {{ scope.row.rank }}</p>
            <div slot="reference" class="name-wrapper"> -->
              <el-button
              size="mini" @click="detailVisible=true;handleBorrower(scope.row)">
              {{scope.row.name}}
              </el-button>
            <!-- </div>
          </el-popover> -->
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
        pageIndex:1,
        detailVisible:false,
        borrower: {
          name:null,
          gender:null,
          salary: null,
          phone_number: null,
          length_of_service:null,
          discredited_records:null,
          rank:null,
        }
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
            title: '提示',
            message: data.msg,
            type: 'success'
          });

          var res1 = get("/api/investor/productList", {})
          res1.then(tdata => {
            this.all_tableData = tdata.data
            console.log(tdata)

          })

          }
          else{
            this.$msgbox({
            title: '提示',
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
      getGender(state){
        if(state == 0){
          return '未设置';
        }
        else{
          return state == 1 ? '男' : '女';
        }
      },



    handleBorrower(row){
      this.borrower.name = row.name;
      this.borrower.gender = row.gender;
      this.borrower.salary = row.salary;
      this.borrower.phone_number = row.phone_number;
      this.borrower.length_of_service = row.length_of_service;
      this.borrower.rank = row.rank;
      this.borrower.discredited_records = row.discredited_records;
    }


    },

    mounted(){
      var res = get("/api/investor/productList", {})
      res.then(data => {
        this.all_tableData = data.data;
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
