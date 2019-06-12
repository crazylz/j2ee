<template>
    <el-container>
        <!-- 顶栏 -->
        <el-header>Header</el-header>

        <!-- 侧拉栏 -->
        <!-- 设置router使得index能够路由，设置index不同使得各自展开，采用unique-opened实现不重复展开 -->
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu  :default-active="$route.path" router unique-opened>
            <el-menu-item index="/userhome/persondata">
            <i class="el-icon-message"></i>个人资料
            </el-menu-item>
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-menu"></i>借款</template>
                <el-menu-item-group>
                <el-menu-item index="/userhome/existingloans">已有借款</el-menu-item>
                <el-menu-item index="/userhome/newloans">新建借款</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-setting"></i>购买产品</template>
                <el-menu-item-group>
                <el-menu-item index="/userhome/existingproducts">已购产品</el-menu-item>
                <el-menu-item index="/userhome/newproducts">新建购买</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/userhome/withdraw">
            <i class="el-icon-message"></i>提现
            </el-menu-item>
            <el-menu-item index="/userhome/invest">
            <i class="el-icon-message"></i>充值
            </el-menu-item>
            <el-menu-item index="/userhome/repay">
            <i class="el-icon-message"></i>还款
            </el-menu-item>
            </el-menu>
        </el-aside>

        <!-- 主页面 -->
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
  export default {
   
  };
</script>

<style scoped>
  .el-container{
        position: absolute;
		top: 0;
		bottom: 0;
		left:0;
        right:0;
		color: #fff;
  } 
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
    height:100%;
  }

  .el-main{
    position:absolute;
    top:60px;
    left:200px;
  }
</style>