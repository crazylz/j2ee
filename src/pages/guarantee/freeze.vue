<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb
      separator="/"
      style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;"
    >
      <el-breadcrumb-item :to="{ path: '/guaranteehome' }">担保人</el-breadcrumb-item>
      <el-breadcrumb-item>处理逾期记录</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索栏 start -->
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" class="input-with-select">
        <el-select v-model="input_select" slot="prepend" placeholder="请选择" @change="change">
          <el-option label="用户ID" value="1"></el-option>
          <el-option label="用户账号" value="2"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <!-- 搜索栏 end -->

    <!-- 资料卡片 start -->
    <div class="card-div">
      <div
        style="font-weigth:bold; font-size: 20px; float: left; margin-left: 10px; margin-top: 20px"
      >| 基本资料</div>

      <div style="margin-top: 80px; float: left;">
        <img src="../../assets/user.png" />
      </div>

      <!-- <el-table :data="tableData" style="margin-top:50px;margin-bottom:30px;font-size:20px">
        <el-table-column prop="tableData.name" label="用户名" width="180"></el-table-column>
        <el-table-column prop="tableData.gender" label="性别" width="180"></el-table-column>
        <el-table-column prop="tableData.phoneNumber" label="手机" width="180"></el-table-column>
        <el-table-column prop="tableData.drtimes" label="失信次数" width="180"></el-table-column>
        <el-table-column prop="tableData.los" label="工龄" width="180"></el-table-column>
        <el-table-column prop="tableData.salary" label="工资" width="180"></el-table-column>
        <el-table-column prop="tableData.bankAccount" label="银行卡号"></el-table-column>
      </el-table>-->

      <el-form ref="base-form" model="formData" class="base-form">
        <el-form-item>
          <label style="float:left;margin-left:40px">用户名</label>
          <br/>
          <!-- 这里需要把查询结果替换为对应的用户名 -->
          <label style="font-size:30px; float:left; margin-top:5px; margin-left:40px; color:#2b3080">没有查询结果～</label>
        </el-form-item>
        <el-form-item label="性别：" label-width="200px"> 
          <!-- 根据性别动态显示图标 -->
          <img src="../../assets/boy.png" style="width: 30px; float:left; margin-top:5px"/>
        </el-form-item>
        <el-form-item label="手机：" label-width="200px" />
        <el-form-item label="工龄：" label-width="200px" />
        <el-form-item label="工资：" label-width="200px" />
        <!-- 中间加条横线 -->
        <div style="background:#afaaaa; height:1px; margin-left: 100px; margin-right: 50px; margin-bottom:25px" />
        <el-form-item label="失信次数：" label-width="200px" />
        <el-form-item label="银行卡号：" label-width="200px" />
      </el-form>
    </div>
    <!-- 资料卡片 end -->

    <!-- 还款记录 start -->
    <div class="card-div" style="margin-top: 10px">
      <div
        style="font-weigth:bold; font-size: 20px; float: left; margin-left: 10px; margin-top: 20px; margin-bottom:20px"
      >| 还款记录</div>
      <el-table :data="tableData" border default-expand-all>
        <el-table-column align="center" label="单号" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="还款额" sortable>
          <template slot-scope="scope">
            <span>￥{{ scope.row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="还款截至时间" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.timeToRepay | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <span v-bind:class="textColor(scope.row.state)">{{object(scope.row.state)}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">还款</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 还款记录 end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      input_select: "",
      tableData: null
    };
  },

  methods: {
    change(value) {
      // console.log(value);
    }
  }
};
</script>



<style>
.el-select {
  width: 100px;
}
.input-with-select {
  width: 50%;
  float: left;
}
.card-div {
  margin-top: 80px;
  background-color: #ffffff;
  padding: 5px；;
  padding-bottom: 10px;
}
.base-form {
  /* float: left; */
  padding-top: 120px;
}
</style>