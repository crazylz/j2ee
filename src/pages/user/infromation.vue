<template>
<div>
  <!-- 面包屑 -->
  <el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;">
    <el-breadcrumb-item :to="{ path: '/' }">用户</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">消息记录</a></el-breadcrumb-item>
  </el-breadcrumb>

    <el-select v-model="value" placeholder="消息状态">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>




    <!-- <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button> -->
    <!-- <el-button @click="toggleSelection()">取消选择</el-button> -->


  <el-table
    ref="filterTable"
    :data="tableData"
    border
    tooltip-effect="dark">

<!-- @selection-change="handleSelectionChange" -->


    <!-- <el-table-column
      type="selection">
    </el-table-column> -->

    <el-table-column
      align="center"
      label="消息id"
      sortable
      prop="messageId">
      <template slot-scope="scope">
      <span>{{ scope.row.messageId }}</span>
      </template>
    </el-table-column>

    <el-table-column
      align="center"
      label="内容">
      <template slot-scope="scope">
      <span>{{ scope.row.content }}</span>
      </template>
    </el-table-column>

    <el-table-column
      align="center"
      label="时间"
      sortable
      prop="time">
      <template slot-scope="scope">
        <span>{{ scope.row.time | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
      </template>
    </el-table-column>

    <el-table-column
      align="center"
      label="状态"
      sortable
      prop="state">
      <template slot-scope="scope">
        <span v-bind:class="textColor(scope.row.state)">{{object(scope.row.state)}}</span>
      </template>
    </el-table-column>

    <el-table-column
      align="center"
      label="操作">
      <template slot-scope="scope">
        <span>{{object(scope.row.state)}}</span>
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
    data(){
      return{
        all_tableData: [],
        tableData:[],
        options: [{
          value: 2,
          label: '全部消息'
        }, {
          value: 0,
          label: '未读消息'
        }, {
          value: 1,
          label: '已读消息'
        }],
        value: null
      }
    },

  
    mounted(){
      var res = get("/api/message", {state: 2})
      res.then(info=>{
        this.all_tableData = info.data;
        this.getOriginalData();
        console.log(info);
        }
      )
    },
    watch:{
        value:function(val){
            var res = get("/api/message", {state: val})
            res.then(info=>{
            this.all_tableData = info.data;
            this.getOriginalData();
            console.log(info);
        }
      )
        }
    },

    methods:{
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
      
      getOriginalData(){
        if(this.all_tableData.length < 10){
          this.tableData = this.all_tableData.slice(0, this.all_tableData.length);
        }
        else{
          this.tableData = this.all_tableData.slice(0, 10);
        }
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },

      handleCurrentChange(val) {
        this.getDataByPage(val);
      },

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.filterTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.filterTable.clearSelection();
        }
      },

      object(state){
        return state == 0 ? '未读' : '已读';
      },
      textColor(state){
        return{
          read : state == 1,
          notread: state == 0,
        }
      },

    }
    
    
  }
</script>

<style scoped>
  .el_table{
  width:100%;
  }
  .read{
    color: #67C23A
  }
  .notread{
    color: #F56C6C;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>