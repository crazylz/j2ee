<template>
  <div>
    <el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;">
      <el-breadcrumb-item :to="{ path: '/adminhome' }">管理员</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminhome/produce' }">管理产品</el-breadcrumb-item>
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
            {{user.name}}
          </label>
        </el-form-item>

        <el-form-item label="性别：">
          <!-- 根据性别动态显示图标 -->
          <img v-if="user.gender==0" src="../../assets/hide.png" style="width: 30px; float:left; margin-top:5px" />
          <img v-else-if="user.gender==1" src="../../assets/boy.png" style="width: 30px; float:left; margin-top:5px" />
          <img v-else src="../../assets/girl.png" style="width: 30px; float:left; margin-top:5px" />
        </el-form-item>

        <el-form-item label="手机：" style="text-align:left">{{user.phoneNumber}}</el-form-item>
        <el-form-item label="工龄：" style="text-align:left">{{user.lengthOfService}}年</el-form-item> 
        <el-form-item label="工资：" style="text-align:left">￥{{user.salary}}</el-form-item>
        <!-- 中间加条横线 -->
        <div
          style="background:#afaaaa; height:1px; margin-left: 100px; margin-right: 50px; margin-bottom:25px"/>
        <el-form-item label="失信次数：" style="text-align:left">{{user.discreditedRecords}}</el-form-item>
        <el-form-item label="信用评级：" style="text-align:left">{{user.rank}}</el-form-item>
        </el-form>
        </div>
      </el-dialog>

    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1" @click="dataType=0">所有借款</el-menu-item>
      <el-menu-item index="2" @click="dataType=1">待处理借款</el-menu-item>
      <el-menu-item index="3" @click="dataType=2">担保人已同意借款</el-menu-item>
      <el-menu-item index="4" @click="dataType=3">担保人已拒绝借款</el-menu-item>
      <el-menu-item index="5" @click="dataType=4">已还清借款</el-menu-item>
      <el-menu-item index="6" @click="dataType=5">未还清借款</el-menu-item>
    </el-menu>

    <el-table
    ref="filterTable"
    :data="tableData.slice(pageIndex*10-10, pageIndex*10)"
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
      prop="installment_number">
      <template slot-scope="scope">
        <span>{{ scope.row.installmentNumber }}</span>
      </template>
    </el-table-column>

    <el-table-column
    align='center'
      label="每月还款日期"
      prop="pay_day_of_month">
      <template slot-scope="scope">
        <span>{{ scope.row.payDayOfMonth }}号</span>
      </template>
    </el-table-column>

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
          <el-button size="mini" @click="getUser(scope.row.userId);detailVisible=true;">
            {{scope.row.userId}}
          </el-button>
      </template>
      </el-table-column>


      <el-table-column
      align="center"
      prop="userId"
      label="投资人id"
      sortable>
      <template slot-scope="scope">
          <el-button size="mini"  @click="getUser(scope.row.investorId);detailVisible=true;">
            {{scope.row.investorId}}
          </el-button>
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
          <!-- <el-button
            size="mini"
            type="info"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

            <br/>
            <br/> -->

            <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
          </span>
        </template>
      </el-table-column>

   </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="100*(tableData.length/10)">
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
        user: [],
        dataType: 0,
        activeIndex:'1',
      }
    },
    methods: {
      handleDelete(row) {
        var res = post("/api/admin/deleteRequest", {id: row.id});
        res.then(result=>{
          if(result.code == 0){
            this.$msgbox({
            title: '提示',
            message: result.msg,
            type: 'success'
            });
            var res = get("/api/admin/requests", {});
            res.then(product=>{
              this.all_tableData = product.data;
              console.log(product);
            });
          }
          else{
            this.$msgbox({
            title: '提示',
            message: result.msg,
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

      getUser(id){
        var res = get("/api/userProfile/" + id, {});
        res.then(bdata=>{
          this.user = bdata.data;
          console.log(this.user);
        })
      },

    },

    mounted(){
      var res = get("/api/admin/requests", {});
      res.then(product=>{
        this.all_tableData = product.data;
        console.log(product);
      }
      )
    },

     computed:{
      tableData(){
        if(this.dataType == 0){
          return this.all_tableData;
        }
        else{
          var that = this;
          return this.all_tableData.filter(function (element, index, self){
          // console.log(self[index].state == this.dataType);
          return self[index].state == that.dataType;
        });
        }
      }
    },

    watch:{
      dataType:function(val){
        this.pageIndex = 1;
      }
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