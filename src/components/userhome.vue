<template>
    <div class="container">
        <!-- 顶栏 -->
        <el-header>Header</el-header>

        <!-- 侧拉栏 -->
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-openeds="[]">
            <el-submenu index="/userhome/persondata">
                <template slot="title" ><i class="el-icon-message"></i>个人资料</template>
            </el-submenu>
            <el-submenu index>
                <template slot="title"><i class="el-icon-menu"></i>借款</template>
                <el-menu-item-group>
                <el-menu-item index="/userhome/existingloans">已有借款</el-menu-item>
                <el-menu-item index="/userhome/newloans">新建借款</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index>
                <template slot="title"><i class="el-icon-setting"></i>购买产品</template>
                <el-menu-item-group>
                <el-menu-item index="/userhome/existingproducts">已购产品</el-menu-item>
                <el-menu-item index="/userhome/newproducts">新建购买</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="/userhome/withdraw">
                <template slot="title"><i class="el-icon-setting"></i>提现</template>
            </el-submenu>
            <el-submenu index="/userhome/invest">
                <template slot="title"><i class="el-icon-setting"></i>充值</template>
            </el-submenu>
            <el-submenu index="/userhome/repay">
                <template slot="title"><i class="el-icon-setting"></i>还款</template>
            </el-submenu>
            </el-menu>
        </el-aside>

        <!-- 主页面 -->
        <el-main>
            <router-view></router-view>
        </el-main>
    </div>
</template>

<script>
  export default {
   
  };
</script>

<style scoped>
  .container{
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
</style>