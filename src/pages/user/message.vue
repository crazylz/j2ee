<template>
<div>
  <!-- 面包屑 -->
  <el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;">
    <el-breadcrumb-item :to="{ path: '/' }">用户</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">消息中心</a></el-breadcrumb-item>
  </el-breadcrumb>

<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
  <el-menu-item index="1" @click="dataType=2">全部消息</el-menu-item>
  <el-menu-item index="3" @click="dataType=0">未读消息</el-menu-item>
  <el-menu-item index="2" @click="dataType=1">已读消息</el-menu-item>
</el-menu>

  <el-table
    ref="filterTable"
    :data="all_tableData.slice(pageIndex*10-10, pageIndex*10)"
    border
    tooltip-effect="dark">


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
        <el-button type="text" style="font-size:14px" size="mini" @click="sign(scope.row)">
            <u>{{operate(scope.row.state)}}</u>
        </el-button>
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
        pageIndex:1,
        activeIndex:'1',
        dataType: 2
      }
    },

  
    mounted(){
      var res = get("/api/message", {state: 2})
      res.then(info=>{
        this.all_tableData = info.data;
        // console.log(info);
        }
      )
    },
    watch:{
        dataType:function(val){
            var res = get("/api/message", {state: val})
            res.then(info=>{
            this.all_tableData = info.data;
            // console.log(info);
        }
        )
      }
    },

    methods:{
        sign(row){
            // console.log(row);
            if(row.state == 0){
                var res = post("/api/message/state", {messageId: row.messageId});
                res.then(result=>{
                    // console.log(result);
                    
                    if(result.code == 0)
                    {
                    this.$msgbox({
                    title: '提示',
                    message: result.msg,
                    type: 'success'
                    });

                    this.getData();

                    }
                    else{
                    this.$msgbox({
                    title: '提示',
                    message: result.msg,
                    type: 'error'
                    });
                    }
                })
            }
        },

        getData(){
          var res1 = get("/api/message", {state: this.dataType});
            res1.then(info=>{
            this.all_tableData = info.data;
            // console.log(info);
            });
        },
      
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },

      handleCurrentChange(val) {
        this.pageIndex =val;
      },

      object(state){
        return state == 0 ? '消息未读' : '消息已读';
      },
      operate(state){
          return state == 1 ? '' : '标为已读';
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